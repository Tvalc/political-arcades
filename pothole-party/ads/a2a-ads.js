// Ads to Aid ad module for Pothole Party. Read CONTRACT.md before touching any ad call.
//
// This is the only file in the game that talks to Google (adsbygoogle / adBreak)
// or to the Playgama Bridge SDK. Game code makes five calls on window.A2A.ads:
//   init({ game, pause, resume, flags })
//   preroll(cb)
//   break(kind, resume)
//   reward(kind, onGranted, onDismissed)
//   surface(name)
// plus two on window.A2A.store (progress goes through Bridge storage):
//   load(keys) -> Promise<values[]>
//   save(keys, values) -> Promise
// and never references adsbygoogle or bridge directly.
//
// Config: window.A2A_ADS = { enabled: false, stub: true } (the default, "dark").
//   enabled  real ads may run. On a real Playgama platform they go through Bridge;
//            anywhere else the AdSense H5 tag is loaded and adBreak() is used.
//   stub     when no real ad ran (dark, blocked, no fill, local), every call
//            resolves at once and rewards are granted so the game stays playable.
//            stub:false denies a reward that no ad paid for.
//   google   false never loads the Google tag (the Playgama build sets this).
// Production on our own site: { enabled: true, stub: false }.
(() => {
  const VERSION = "1.0.0";
  const DEFAULTS = {
    enabled: false,
    stub: true,
    google: true,
    client: "ca-pub-4762698707947194",
    frequencyHint: "180s",
    sponsors: "ads/sponsors.json",
    rotateSeconds: 20,
    bridge: true,
  };
  const GOOGLE_SRC = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
  const GOOGLE_TYPES = { preroll: "preroll", shift_end: "next", pause: "pause" };
  const WATCHDOG_MS = 8000;
  const STORE_WATCHDOG_MS = 5000;

  const cfg = Object.assign({}, DEFAULTS, window.A2A_ADS || {});
  const hooks = { game: "pothole-party", pause() {}, resume() {} };
  let initialised = false;
  let busy = null;          // the ad currently in flight, or null
  let held = false;         // true between beforeAd and afterAd
  let gameReadyWanted = false, gameReadySent = false;

  // ---------------------------------------------------------------- events
  function emit(type, surface, outcome) {
    try {
      window.dispatchEvent(new CustomEvent("a2a:ad", { detail: { type, surface, outcome } }));
    } catch (_) { /* events are best effort */ }
  }

  // --------------------------------------------------------- pause / resume
  function holdGame() {
    if (held) return;
    held = true;
    try { hooks.pause(); } catch (err) { console.warn("[a2a-ads] pause hook failed", err); }
  }
  function releaseGame() {
    if (!held) return;
    held = false;
    try { hooks.resume(); } catch (err) { console.warn("[a2a-ads] resume hook failed", err); }
  }

  // ---------------------------------------------------------------- bridge
  // Playgama Bridge SDK JS Core, loaded here from the Playgama CDN in every mode
  // (it is the platform SDK, not an ad creative; bridge:false skips it). Locally
  // Bridge runs its mock platform, which keeps the game playable but must never
  // be asked to show an ad (its mock ad calls open a failure popup).
  const BRIDGE_SRC = "https://bridge.playgama.com/v2/stable/playgama-bridge.js";
  const bridgeState = { sdk: null, ready: false, platform: "none", real: false, failed: false };
  let bridgeBoot = null;
  function loadBridgeScript() {
    return new Promise(resolve => {
      if (window.bridge) return resolve(true);
      const tag = document.createElement("script");
      tag.src = BRIDGE_SRC;
      tag.onload = () => resolve(true);
      tag.onerror = () => resolve(false);
      document.head.appendChild(tag);
    });
  }
  function bridgeInit() {
    if (bridgeBoot) return bridgeBoot;
    bridgeBoot = new Promise(resolve => {
      if (cfg.bridge === false) { emit("init", "bridge", "off"); return resolve(false); }
      const attempt = () => {
        const sdk = window.bridge;
        if (!sdk || typeof sdk.initialize !== "function") {
          bridgeState.failed = true;
          emit("init", "bridge", "missing");
          return resolve(false);
        }
        bridgeState.sdk = sdk;
        sdk.initialize().then(() => {
          bridgeState.ready = true;
          bridgeState.platform = sdk.platform?.id || "unknown";
          bridgeState.real = bridgeState.platform !== (sdk.PLATFORM_ID?.MOCK || "mock");
          try {
            // One universal handler: platform pause, platform mute, and every ad overlay.
            sdk.platform.on(sdk.EVENT_NAME.PAUSE_STATE_CHANGED, isPaused => { if (isPaused) holdGame(); else releaseGame(); });
            sdk.platform.on(sdk.EVENT_NAME.AUDIO_STATE_CHANGED, isEnabled => { if (!isEnabled) holdGame(); else releaseGame(); });
            if (sdk.platform.isAudioEnabled === false) holdGame();
            if (sdk.advertisement.interstitialState === "opened") holdGame();
            sdk.advertisement.on(sdk.EVENT_NAME.INTERSTITIAL_STATE_CHANGED, onBridgeInterstitial);
            sdk.advertisement.on(sdk.EVENT_NAME.REWARDED_STATE_CHANGED, onBridgeRewarded);
            sdk.advertisement.setMinimumDelayBetweenInterstitial?.(parseInt(cfg.frequencyHint, 10) || 180);
            sdk.platform.sendMessage(sdk.PLATFORM_MESSAGE?.IN_GAME_LOADING_STARTED || "in_game_loading_started");
            // Belt and braces on a real platform: a hidden tab holds play and sound
            // even if the host never relays a pause event.
            if (bridgeState.real) document.addEventListener("visibilitychange", () => { if (document.hidden) holdGame(); else if (!busy) releaseGame(); });
          } catch (err) { console.warn("[a2a-ads] bridge wiring failed", err); }
          emit("init", "bridge", bridgeState.platform);
          flushGameReady();
          resolve(true);
        }).catch(err => {
          bridgeState.failed = true;
          console.warn("[a2a-ads] bridge.initialize failed", err);
          emit("init", "bridge", "failed");
          resolve(false);
        });
      };
      loadBridgeScript().then(attempt);
    });
    return bridgeBoot;
  }
  // game_ready goes out once, after Bridge is up and the first playable screen is on.
  function flushGameReady() {
    if (!gameReadyWanted || gameReadySent || !bridgeState.ready) return;
    gameReadySent = true;
    const sdk = bridgeState.sdk, M = sdk.PLATFORM_MESSAGE || {};
    try {
      sdk.platform.sendMessage(M.IN_GAME_LOADING_STOPPED || "in_game_loading_stopped");
      sdk.platform.sendMessage(M.GAME_READY || "game_ready");
      emit("init", "bridge", "game_ready");
    } catch (err) { console.warn("[a2a-ads] game_ready failed", err); }
  }
  function useBridgeAds() { return cfg.enabled && bridgeState.ready && bridgeState.real; }

  function onBridgeInterstitial(state) {
    if (!busy || busy.provider !== "bridge" || busy.type !== "interstitial") return;
    if (state === "opened") { clearTimeout(busy.watchdog); busy.opened = true; holdGame(); }
    else if (state === "closed") finish("viewed");
    else if (state === "failed") finish(busy.opened ? "error" : "unfilled");
  }
  function onBridgeRewarded(state) {
    if (!busy || busy.provider !== "bridge" || busy.type !== "rewarded") return;
    if (state === "opened") { clearTimeout(busy.watchdog); busy.opened = true; holdGame(); }
    else if (state === "rewarded") busy.granted = true;
    else if (state === "closed") finish(busy.granted ? "viewed" : "dismissed");
    else if (state === "failed") finish(busy.opened ? "error" : "unfilled");
  }

  // ---------------------------------------------------------------- storage
  // Progress goes through Bridge storage (cloud saves where the platform has
  // them). Without Bridge, or when it is slow or fails, the same keys live in
  // localStorage so a local page never loses its best score.
  function localGet(keys) {
    return keys.map(key => { try { return window.localStorage.getItem(key); } catch (_) { return null; } });
  }
  function localSet(keys, values) {
    keys.forEach((key, i) => { try { window.localStorage.setItem(key, String(values[i])); } catch (_) { /* private mode */ } });
  }
  function withWatchdog(promise, fallback) {
    return new Promise(resolve => {
      let done = false;
      const settle = value => { if (!done) { done = true; resolve(value); } };
      const timer = setTimeout(() => settle(fallback()), STORE_WATCHDOG_MS);
      promise.then(value => { clearTimeout(timer); settle(value); }, () => { clearTimeout(timer); settle(fallback()); });
    });
  }
  const store = {
    load(keys) {
      keys = Array.isArray(keys) ? keys.map(String) : [String(keys)];
      const fallback = () => { emit("store", "load", "local"); return localGet(keys); };
      return withWatchdog(bridgeInit().then(ok => {
        if (!ok || !bridgeState.ready) return fallback();
        return bridgeState.sdk.storage.get(keys).then(values => {
          values = Array.isArray(values) ? values : [values];
          // A fresh Bridge store on this site keeps the best score a player already had.
          if (!bridgeState.real && values.every(v => v === null || v === undefined)) {
            const legacy = localGet(keys);
            if (legacy.some(v => v !== null)) { emit("store", "load", "migrated"); return legacy; }
          }
          emit("store", "load", bridgeState.platform);
          return values;
        });
      }), fallback);
    },
    save(keys, values) {
      keys = Array.isArray(keys) ? keys.map(String) : [String(keys)];
      values = Array.isArray(values) ? values : [values];
      if (!bridgeState.real) localSet(keys, values);
      const fallback = () => { emit("store", "save", "local"); return true; };
      return withWatchdog(bridgeInit().then(ok => {
        if (!ok || !bridgeState.ready) return fallback();
        return bridgeState.sdk.storage.set(keys, values).then(() => { emit("store", "save", bridgeState.platform); return true; });
      }), fallback);
    },
  };

  // ---------------------------------------------------------------- google
  // AdSense H5 Games Ads. Loaded only when enabled, google is not false, and
  // not on a real Bridge platform; never in stub-only mode.
  const google = { requested: false, loaded: false, failed: false, ready: false };
  function loadGoogle() {
    if (google.requested) return;
    google.requested = true;
    if (!GOOGLE_SRC) { google.failed = true; emit("init", "google", "off"); return; }
    window.adsbygoogle = window.adsbygoogle || [];
    if (typeof window.adBreak !== "function") {
      window.adBreak = window.adConfig = function (o) { window.adsbygoogle.push(o); };
    }
    const tag = document.createElement("script");
    tag.async = true;
    tag.crossOrigin = "anonymous";
    tag.setAttribute("data-ad-frequency-hint", cfg.frequencyHint);
    tag.src = `${GOOGLE_SRC}?client=${encodeURIComponent(cfg.client)}`;
    tag.onload = () => { google.loaded = true; emit("init", "google", "loaded"); };
    tag.onerror = () => { google.failed = true; emit("init", "google", "blocked"); if (busy && busy.provider === "google") finish("blocked"); };
    document.head.appendChild(tag);
    window.adConfig({ preloadAdBreaks: "on", sound: "on", onReady: () => { google.ready = true; } });
  }
  function useGoogleAds() { return cfg.enabled && cfg.google !== false && !!GOOGLE_SRC && !useBridgeAds() && !google.failed; }

  // ------------------------------------------------------------ one at a time
  function finish(outcome) {
    const job = busy;
    if (!job) return;
    busy = null;
    clearTimeout(job.watchdog);
    releaseGame();
    if (job.type !== "rewarded") emit(job.kind === "preroll" ? "preroll" : "break", job.kind, outcome);
    try { job.done(outcome); } catch (err) { console.error("[a2a-ads] callback failed", err); }
  }
  function start(job) {
    if (!initialised) console.warn("[a2a-ads] A2A.ads.init was not called; running as stub");
    if (busy) { // never stack ads; the second request just continues the game
      emit(job.type === "rewarded" ? "reward" : "break", job.kind, "busy");
      job.done("busy");
      return;
    }
    busy = job;
    job.watchdog = setTimeout(() => finish("timeout"), WATCHDOG_MS);
    try {
      if (job.provider === "bridge") job.run();
      else if (job.provider === "google") job.run();
      else finish("stub");
    } catch (err) {
      console.warn("[a2a-ads] provider call failed", err);
      finish("error");
    }
  }
  function pickProvider() {
    if (useBridgeAds()) return "bridge";
    if (useGoogleAds()) { loadGoogle(); return google.failed ? "stub" : "google"; }
    return "stub";
  }

  // ------------------------------------------------------------- sponsors
  // House and sponsor creatives for in-world surfaces, from sponsors.json.
  let sponsors = [];
  let sponsorsBoot = null;
  function loadSponsors() {
    if (sponsorsBoot) return sponsorsBoot;
    sponsorsBoot = (typeof fetch === "function" ? fetch(cfg.sponsors, { cache: "no-cache" }).then(r => r.ok ? r.json() : []) : Promise.resolve([]))
      .then(rows => { sponsors = Array.isArray(rows) ? rows : Array.isArray(rows?.rows) ? rows.rows : []; emit("init", "sponsors", String(sponsors.length)); })
      .catch(() => { sponsors = []; emit("init", "sponsors", "failed"); });
    return sponsorsBoot;
  }
  function activeRows(surface) {
    const now = Date.now();
    return sponsors.filter(row => row && row.surface === surface && row.src
      && (!row.start || Date.parse(row.start) <= now) && (!row.end || Date.parse(row.end) >= now));
  }

  // ------------------------------------------------------------- the API
  const ads = {
    version: VERSION,
    config: cfg,

    // Once, on load. pause() and resume() are the game's own functions; the
    // module calls them around every full-screen ad (and on platform pause).
    init(opts) {
      opts = opts || {};
      if (opts.flags && typeof opts.flags === "object") Object.assign(cfg, opts.flags);
      if (opts.game) hooks.game = String(opts.game);
      if (typeof opts.pause === "function") hooks.pause = opts.pause;
      if (typeof opts.resume === "function") hooks.resume = opts.resume;
      initialised = true;
      bridgeInit();
      loadSponsors();
      emit("init", hooks.game, cfg.enabled ? (cfg.stub ? "enabled+stub" : "enabled") : "dark");
      return ads;
    },

    // Before the title screen. cb runs either way; afterwards Bridge is told the game is ready.
    preroll(cb) {
      const done = () => { gameReadyWanted = true; flushGameReady(); if (typeof cb === "function") cb(); };
      const go = () => {
        const provider = pickProvider();
        start({ kind: "preroll", type: "interstitial", provider, done, run() {
          if (provider === "google") {
            window.adBreak({ type: "preroll", name: "preroll",
              beforeAd: () => { clearTimeout(busy && busy.watchdog); holdGame(); },
              afterAd: () => releaseGame(),
              adBreakDone: info => finish(info && info.breakStatus ? info.breakStatus : "done") });
          } else {
            bridgeState.sdk.advertisement.showInterstitial("preroll");
          }
        } });
      };
      if (cfg.enabled) bridgeInit().then(go, go); else go();
    },

    // 'shift_end' or 'pause'. resume runs either way.
    break(kind, resume) {
      kind = String(kind || "shift_end");
      const done = () => { if (typeof resume === "function") resume(); };
      let provider = pickProvider();
      // Bridge paces its own interstitials, so the pause menu never asks it for one.
      if (provider === "bridge" && kind === "pause") provider = "stub";
      start({ kind, type: "interstitial", provider, done, run() {
        if (provider === "google") {
          window.adBreak({ type: GOOGLE_TYPES[kind] || "next", name: kind,
            beforeAd: () => { clearTimeout(busy && busy.watchdog); holdGame(); },
            afterAd: () => releaseGame(),
            adBreakDone: info => finish(info && info.breakStatus ? info.breakStatus : "done") });
        } else {
          bridgeState.sdk.advertisement.showInterstitial(kind);
        }
      } });
    },

    // Player-initiated. onGranted only after the ad was watched (or in stub mode).
    reward(kind, onGranted, onDismissed) {
      kind = String(kind || "reward");
      const done = outcome => {
        const granted = outcome === "viewed" || (cfg.stub && outcome !== "dismissed");
        emit("reward", kind, granted ? "granted" : `denied:${outcome}`);
        if (granted) { if (typeof onGranted === "function") onGranted(); }
        else if (typeof onDismissed === "function") onDismissed();
      };
      const provider = pickProvider();
      if (provider === "bridge" && !bridgeState.sdk.advertisement.isRewardedSupported) { start({ kind, type: "rewarded", provider: "stub", done, run() {} }); return; }
      start({ kind, type: "rewarded", provider, done, run() {
        if (provider === "google") {
          window.adBreak({ type: "reward", name: kind,
            beforeAd: () => { clearTimeout(busy && busy.watchdog); holdGame(); },
            afterAd: () => releaseGame(),
            beforeReward: showAdFn => { clearTimeout(busy && busy.watchdog); busy.watchdog = setTimeout(() => finish("timeout"), WATCHDOG_MS); showAdFn(); },
            adDismissed: () => { if (busy) busy.result = "dismissed"; },
            adViewed: () => { if (busy) busy.result = "viewed"; },
            adBreakDone: info => finish(busy && busy.result ? busy.result : (info && info.breakStatus) || "unfilled") });
        } else {
          bridgeState.sdk.advertisement.showRewarded(kind);
        }
      } });
    },

    // In-world creative for a commercial surface the game already draws.
    // Returns { kind: 'image' | 'video' | 'none', src, href, label, sponsor }.
    surface(name) {
      const rows = activeRows(String(name || ""));
      if (!rows.length) { emit("surface", String(name || ""), "none"); return { kind: "none", src: null, href: null, label: "", sponsor: "" }; }
      const slot = Math.floor(Date.now() / (1000 * (cfg.rotateSeconds || 20))) % rows.length;
      const row = rows[slot];
      emit("surface", row.surface, row.sponsor === "house" ? "house" : "sponsor");
      return { kind: row.kind === "video" ? "video" : "image", src: row.src, href: row.href || null, label: row.label || "", sponsor: row.sponsor || "" };
    },
  };

  window.A2A = window.A2A || {};
  window.A2A.ads = ads;
  window.A2A.store = store;
})();
