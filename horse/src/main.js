(() => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  const FIGHTERS = {
    mamdani: {
      id: "mamdani",
      name: "Mamdani",
      full: "Zohran Mamdani",
      city: "New York",
      court: "nyc",
      body: "#243e73",
      trim: "#e2b657",
      skin: "#e4b48a",
      pants: "#1c2430",
      smile: true,
    },
    sayed: {
      id: "sayed",
      name: "El-Sayed",
      full: "Abdul El-Sayed",
      city: "Detroit",
      court: "detroit",
      body: "#d6453a",
      trim: "#7ec8e3",
      skin: "#d39a6c",
      pants: "#241c30",
      smile: false,
    },
  };

  const FLAIR_NAME = {
    none: "plain jumper",
    spin: "spin jumper",
    dunk: "dunk",
    fade: "fadeaway",
    hook: "hook",
  };

  const HOOP = { x: 0.5, y: 0.8 };
  const LETTERS = ["H", "O", "R", "S", "E"];
  const keys = new Set();
  const buttons = [];
  const images = {};
  let audioCtx = null;
  let screen = "title";
  let selectIndex = 0;
  let match = null;
  let last = performance.now();
  let pointer = null;
  let paused = false;
  const pausePanel = document.getElementById("pause-panel");
  const controls = document.getElementById("session-controls");
  const status = document.getElementById("game-status");
  function setPaused(value) {
    if (screen !== "play" || !match || match.over) return;
    paused = value; keys.clear(); pointer = null;
    pausePanel.hidden = !paused;
    document.getElementById("pause-toggle").textContent = paused ? "Resume · Esc" : "Pause · Esc";
    if (audioCtx) { const operation = paused ? audioCtx.suspend() : audioCtx.resume(); operation?.catch(() => {}); }
    if (paused) document.getElementById("resume").focus();
    else canvas.focus({ preventScroll: true });
  }
  function startPractice() {
    setPaused(false); keys.clear(); pointer = null;
    match = freshMatch("mamdani"); match.practice = true; screen = "play";
    match.call = "Jumper practice: move with arrows / WASD, then Space to aim and Space to shoot.";
    canvas.focus({ preventScroll: true });
  }
  document.getElementById("practice").addEventListener("click", startPractice);
  function restartMatch() {
    if (!match) return;
    setPaused(false); keys.clear(); pointer = null;
    const practice = match.practice;
    match = freshMatch(match.humanId); match.practice = practice; canvas.focus({ preventScroll: true });
  }
  function chooseAgain() {
    setPaused(false); keys.clear(); pointer = null;
    screen = "select"; match = null; canvas.focus({ preventScroll: true });
  }
  document.getElementById("pause-toggle").addEventListener("click", () => setPaused(!paused));
  document.getElementById("resume").addEventListener("click", () => setPaused(false));
  document.getElementById("rematch").addEventListener("click", restartMatch);
  document.getElementById("pick-again").addEventListener("click", chooseAgain);
  window.addEventListener("blur", () => setPaused(true));
  document.addEventListener("visibilitychange", () => { if (document.hidden) setPaused(true); });

  function loadImage(key, src) {
    const img = new Image();
    img.src = src.startsWith("assets/") ? `${src}?v=32` : src;
    images[key] = img;
  }

  loadImage("nyc", "assets/nyc.webp");
  loadImage("detroit", "assets/detroit.webp");
  loadImage("nyc-future", "assets/nyc-future.webp");
  loadImage("detroit-future", "assets/detroit-future.webp");
  loadImage("face-mamdani", "assets/face-mamdani.webp");
  loadImage("face-sayed", "assets/face-sayed.webp");
  loadImage("ball", "assets/sprites/ball.webp");
  loadImage("hoop", "assets/sprites/hoop.webp");
  loadImage("mamdani-idle", "assets/sprites/mamdani-idle-clean-v1.webp");
  loadImage("mamdani-move", "assets/sprites/mamdani-move-clean-v1.webp");
  loadImage("mamdani-shot", "assets/sprites/mamdani-shot-clean-v1.webp");
  loadImage("mamdani-dunk", "assets/sprites/mamdani-dunk.webp");
  loadImage("mamdani-spin", "assets/sprites/mamdani-spin.webp");
  loadImage("mamdani-fade", "assets/sprites/mamdani-fade.webp");
  loadImage("mamdani-hook", "assets/sprites/mamdani-hook.webp");
  loadImage("mamdani-dribble", "assets/sprites/mamdani-dribble-clean-v1.webp");
  loadImage("sayed-idle", "assets/sprites/sayed-idle.webp");
  loadImage("sayed-shot", "assets/sprites/sayed-shot.webp");
  loadImage("sayed-dunk", "assets/sprites/sayed-dunk.webp");
  loadImage("sayed-spin", "assets/sprites/sayed-spin.webp");
  loadImage("sayed-fade", "assets/sprites/sayed-fade.webp");
  loadImage("sayed-hook", "assets/sprites/sayed-hook.webp");
  loadImage("sayed-dribble", "assets/sprites/sayed-dribble.webp");
  loadImage("sayed-move", "assets/sprites/sayed-stride.webp");
  loadImage("ui-board", "assets/ui/ui-board.webp");
  loadImage("ui-banner", "assets/ui/ui-banner.webp");
  loadImage("ui-button", "assets/ui/ui-button.webp");
  loadImage("ui-hot", "assets/ui/ui-hot.webp");
  loadImage("ui-meter", "assets/ui/ui-meter.webp");
  loadImage("ui-bracket", "assets/ui/ui-bracket.webp");
  loadImage("ui-needle", "assets/ui/ui-needle.webp");

  const CLIPS = {
    mamdani: {
      idle: {
        originX: 0.5542168674698795,
        frames: 22,
        fw: 160,
        fh: 256,
        cols: 8,
        padding: 2,
        body: 262,
        fill: 1.0240963855421688,
        feet: [0.9924698795180723],
        fps: 18,
        sourceFacing: 1,
      },
      shot: {
        originX: 0.3816793893129771,
        frames: 47,
        fw: 96,
        fh: 256,
        cols: 8,
        padding: 2,
        body: 210,
        fill: 0.8189655172413793,
        feet: [0.9971264367816092],
        play: 46,
        releaseFrame: 16,
        releaseHand: [0.87, 0.02],
        duration: 1.05,
        releaseTime: 0.3,
        authoredLift: true,
        emptyHands: true,
        sourceFacing: 1,
        handKeys: [[0, 0.67, 0.575], [4, 0.8, 0.46], [8, 0.78, 0.2], [12, 0.72, 0.085], [15, 0.64, 0.02], [16, 0.87, 0.02]],
      },
      dunk: {
        frames: 8, fw: 391, fh: 836, body: 640, play: 4,
        fills: [0.744, 0.763, 0.99, 0.995, 0.993, 0.993, 0.993, 0.993],
      },
      spin: {
        frames: 8, fw: 415, fh: 917, body: 640, play: 4,
        fills: [0.696, 0.722, 0.99, 0.864, 0.966, 0.68, 0.814, 0.851],
      },
      fade: {
        frames: 8, fw: 438, fh: 922, body: 640, play: 5,
        fills: [0.705, 0.692, 0.993, 0.98, 0.785, 0.668, 0.777, 0.792],
      },
      hook: {
        frames: 8, fw: 417, fh: 914, body: 640, play: 5,
        fills: [0.7, 0.678, 0.91, 0.926, 0.996, 0.768, 0.757, 0.742],
      },
      dribble: {
        originX: 0.5681818181818182,
        frames: 18,
        fw: 205,
        fh: 256,
        cols: 8,
        padding: 2,
        body: 277,
        fill: 1.0833333333333333,
        feet: [0.9924242424242424],
        fps: 24,
        loopStart: 0,
        loopEnd: 17,
        sourceFacing: -1,
        bounceFrames: [6],
        hands: [[0.15, 0.53]],
        bounceCycle: true,
      },
      move: {
        originX: 0.49586776859504134,
        frames: 32,
        fw: 134,
        fh: 256,
        cols: 8,
        padding: 2,
        body: 247,
        fill: 0.9640287769784173,
        feet: [0.9928057553956835],
        fps: 24,
        loopStart: 0,
        loopEnd: 31,
        sourceFacing: 1,
        carried: true,
        hands: [[0.12, 0.57]],
      },
    },
    sayed: {
      idle: { frames: 2, fw: 267, fh: 733, body: 733 },
      shot: {
        frames: 8, fw: 391, fh: 868, body: 640, play: 4,
        releaseFrame: 3, releaseHand: [0.64, 0.045],
        fills: [0.712, 0.737, 0.931, 0.995, 0.956, 0.995, 0.843, 0.843],
      },
      dunk: {
        frames: 8, fw: 419, fh: 848, body: 640, play: 4,
        fills: [0.71, 0.752, 0.976, 0.995, 0.995, 0.995, 0.995, 0.802],
      },
      spin: {
        frames: 8, fw: 399, fh: 881, body: 640, play: 5,
        fills: [0.67, 0.726, 0.985, 0.983, 0.994, 0.747, 0.779, 0.795],
      },
      fade: {
        frames: 8, fw: 455, fh: 912, body: 640, play: 5,
        fills: [0.719, 0.669, 0.7, 0.917, 0.996, 0.882, 0.792, 0.787],
      },
      hook: {
        frames: 8, fw: 350, fh: 883, body: 640, play: 4,
        fills: [0.725, 0.682, 0.947, 0.942, 0.994, 0.879, 0.732, 0.734],
      },
      dribble: {
        frames: 1,
        fw: 384,
        fh: 1024,
        body: 640,
        fps: 8,
        feet: [0.857],
        fill: 0.756,
        pace: 2.4,
        hop: 0.2,
        hands: [[0.452, 0.74]],
      },
      move: {
        frames: 4,
        fw: 384,
        fh: 881,
        body: 640,
        fps: 8,
        feet: [0.991, 0.992, 0.993, 0.993],
        fill: 0.976,
        pace: 2.4,
        hop: 0.3,
        hands: [[0.188, 0.58], [0.198, 0.58], [0.178, 0.58], [0.185, 0.58]],
      },
    },
  };

  let crowdGain = null;

  function tone(freq, dur, type, gain) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const amp = audioCtx.createGain();
    osc.type = type || "square";
    osc.frequency.value = freq;
    amp.gain.value = gain || 0.04;
    osc.connect(amp);
    amp.connect(audioCtx.destination);
    osc.start();
    amp.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    osc.stop(audioCtx.currentTime + dur);
  }

  function noiseBurst(seconds, freq, peak) {
    if (!audioCtx) return;
    const t = audioCtx.currentTime;
    const len = Math.floor(audioCtx.sampleRate * seconds);
    const buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i += 1) data[i] = Math.random() * 2 - 1;
    const src = audioCtx.createBufferSource();
    src.buffer = buf;
    const filter = audioCtx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = freq;
    const amp = audioCtx.createGain();
    amp.gain.setValueAtTime(peak, t);
    amp.gain.exponentialRampToValueAtTime(0.0001, t + seconds);
    src.connect(filter);
    filter.connect(amp);
    amp.connect(audioCtx.destination);
    src.start(t);
    src.stop(t + seconds);
  }

  function ensureMix() {
    if (!audioCtx || crowdGain) return;
    const len = audioCtx.sampleRate * 2;
    const buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i += 1) data[i] = Math.random() * 2 - 1;
    const crowd = audioCtx.createBufferSource();
    crowd.buffer = buf;
    crowd.loop = true;
    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 700;
    filter.Q.value = 0.7;
    crowdGain = audioCtx.createGain();
    crowdGain.gain.value = 0.015;
    crowd.connect(filter);
    filter.connect(crowdGain);
    crowdGain.connect(audioCtx.destination);
    crowd.start();

    const bass = audioCtx.createOscillator();
    const bassFilter = audioCtx.createBiquadFilter();
    const bassGain = audioCtx.createGain();
    bass.type = "sawtooth";
    bass.frequency.value = 49;
    bassFilter.type = "lowpass";
    bassFilter.frequency.value = 200;
    bassGain.gain.value = 0.0001;
    bass.connect(bassFilter);
    bassFilter.connect(bassGain);
    bassGain.connect(audioCtx.destination);
    bass.start();
    const notes = [49, 49, 73, 49, 55, 49, 65, 49];
    let step = 0;
    setInterval(() => {
      // Do not queue new notes at a frozen audio clock while the game is paused.
      if (!audioCtx || audioCtx.state !== "running") return;
      const now = audioCtx.currentTime;
      bass.frequency.setValueAtTime(notes[step % notes.length], now);
      bassGain.gain.cancelScheduledValues(now);
      bassGain.gain.setValueAtTime(0.0001, now);
      bassGain.gain.exponentialRampToValueAtTime(0.07, now + 0.015);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      if (step % 2 === 0) {
        const stab = audioCtx.createOscillator();
        const stabGain = audioCtx.createGain();
        stab.type = "square";
        stab.frequency.value = step % 4 === 0 ? 196 : 247;
        stabGain.gain.setValueAtTime(0.0001, now);
        stabGain.gain.exponentialRampToValueAtTime(0.025, now + 0.01);
        stabGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
        stab.connect(stabGain);
        stabGain.connect(audioCtx.destination);
        stab.start(now);
        stab.stop(now + 0.11);
      }
      step += 1;
    }, 260);
  }

  function roar() {
    if (!audioCtx || !crowdGain) return;
    const t = audioCtx.currentTime;
    crowdGain.gain.cancelScheduledValues(t);
    crowdGain.gain.setValueAtTime(0.07, t);
    crowdGain.gain.exponentialRampToValueAtTime(0.015, t + 1.6);
    if (match) match.roar = 1;
  }

  function swish() {
    noiseBurst(0.22, 1800, 0.16);
    tone(880, 0.08, "sine", 0.03);
  }

  function clank() {
    tone(220, 0.07, "square", 0.06);
    tone(140, 0.16, "triangle", 0.09);
    tone(70, 0.2, "sine", 0.06);
    noiseBurst(0.12, 280, 0.18);
  }

  function dribbleThump() {
    noiseBurst(0.04, 160, 0.16);
    tone(72, 0.045, "sine", 0.07);
  }

  function unlockAudio() {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    if (!audioCtx) audioCtx = new Audio();
    if (audioCtx.state === "suspended") audioCtx.resume();
    ensureMix();
  }

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function project(nx, ny) {
    const depth = 0.96 - ny;
    const y = 436 + depth * 230;
    const span = 260 + depth * 560;
    const x = W * 0.5 + (nx - 0.5) * span;
    const s = 0.62 + depth * 0.75;
    return { x, y, s, span };
  }

  function playerHeight(at) {
    return 110 * at.s;
  }

  function drawnSprite(clip, at, frame) {
    const span = playerHeight(at);
    // Action sheets share a fixed body reference. Raised hands must add height,
    // not shrink the torso from one frame to the next.
    const height = clip.fills ? span * clip.fh / clip.body : span / (clip.fill || 1);
    return { span, height, width: height * (clip.fw / clip.fh) };
  }

  function spriteLayout(clip, frame) {
    const foot = clip.feet ? clip.feet[Math.min(frame, clip.feet.length - 1)] : 1;
    const crop = clip.cropTop || 0;
    const sy = crop * clip.fh;
    const sh = clip.fh * (1 - crop);
    const footInSlice = (foot * clip.fh - sy) / sh;
    return { sy, sh, footInSlice };
  }

  function spriteCell(clip, frame, layout) {
    const padding = clip.padding || 0;
    const cols = clip.cols || clip.frames;
    return {
      x: (frame % cols) * (clip.fw + padding * 2) + padding,
      y: Math.floor(frame / cols) * (clip.fh + padding * 2) + padding + layout.sy,
    };
  }

  function hoopLayout() {
    const nyc = !match || match.court === "nyc";
    // Match the rim painted into each original Makko court background.
    const rim = nyc ? { x: 639, y: 229 } : { x: 637, y: 172 };
    return { x: rim.x, floor: rim.y + 78, rim: rim.y };
  }

  function courtPoint(px, py) {
    if (py < 420 || py > 660) return null;
    let best = null;
    let bestDy = 1e9;
    for (let ny = 0.08; ny <= 0.94; ny += 0.008) {
      const row = project(0.5, ny);
      const dy = Math.abs(row.y - py);
      if (dy < bestDy) {
        bestDy = dy;
        best = { x: clamp(0.5 + (px - W * 0.5) / row.span, 0.08, 0.92), y: ny };
      }
    }
    return bestDy < 28 ? best : null;
  }

  function distToHoop(x, y) {
    return Math.hypot(x - HOOP.x, (y - HOOP.y) * 0.9);
  }

  function requiredPower(x, y) {
    return clamp(0.26 + distToHoop(x, y) * 0.95, 0.28, 0.93);
  }

  function zoneFor(x, y, flair) {
    const hard = flair !== "none";
    const span = hard ? 0.05 : 0.082;
    let need = requiredPower(x, y);
    if (hard) {
      const slide = Math.sin(match.t * 3.1) * 0.22 + Math.sin(match.t * 5.4) * 0.08;
      need = clamp(need + slide, span + 0.04, 1 - span - 0.04);
    }
    return { need, span, hit: Math.abs(match.power - need) <= span, hard };
  }

  function shotNeed() {
    const p = match.pos[match.humanId];
    return zoneFor(p.x, p.y, match.flair);
  }

  function canDunk(x, y) {
    return distToHoop(x, y) < 0.16;
  }

  function otherId(id) {
    return id === "mamdani" ? "sayed" : "mamdani";
  }

  function freshMatch(humanId) {
    const cpuId = otherId(humanId);
    const home = FIGHTERS[humanId];
    return {
      humanId,
      cpuId,
      court: home.court,
      letters: { mamdani: 0, sayed: 0 },
      pos: {
        mamdani: { x: 0.32, y: 0.28 },
        sayed: { x: 0.68, y: 0.28 },
      },
      face: { mamdani: 1, sayed: -1 },
      active: humanId,
      phase: "set",
      challenge: null,
      hold: false,
      power: 0,
      powerDir: 1,
      flair: "none",
      ball: null,
      owner: humanId,
      pass: null,
      pose: { mamdani: "idle", sayed: "idle" },
      jump: { mamdani: 0, sayed: 0 },
      jumpDur: { mamdani: 0, sayed: 0 },
      hoopKick: 0,
      lock: 0.2,
      call: `${home.full} calls the first shot.`,
      over: null,
      cpu: null,
      t: 0,
      shake: 0,
      zoom: 0,
      banner: null,
      trail: [],
      basket: null,
      roar: 0,
      flash: 0,
      dribU: null,
      pop: { mamdani: 0, sayed: 0 },
    };
  }

  function punch(text, hot) {
    match.banner = { text, life: 2.4 };
    if (hot) {
      roar();
      stinger();
    }
  }

  function stinger() {
    [392, 494, 587, 784].forEach((freq, i) => {
      setTimeout(() => tone(freq, 0.16, "square", 0.05), i * 80);
    });
  }

  function ballPoint(b) {
    const t = b.syncRelease && b.phase === "arc"
      ? clamp((b.t - b.show) / (1 - b.show), 0, 1)
      : clamp(b.t, 0, 1);
    const x = b.x0 + (b.x1 - b.x0) * t;
    const arc = Math.sin(t * Math.PI) * (b.arc != null ? b.arc : b.flair === "dunk" ? 40 : 170);
    const y = b.y0 + (b.y1 - b.y0) * t - arc;
    return { x, y, t };
  }

  function holdFor(flair) {
    if (flair === "dunk") return 1.2;
    if (flair === "none") return 0.58;
    return 0.5;
  }

  function dribbleBeat() {
    const bounce = (match.t * 2) % 1;
    return { bounce, dip: Math.sin(bounce * Math.PI) };
  }

  function aimFace(id, vx, vy) {
    if (Math.abs(vx) < 0.18) return;
    if (Math.abs(vx) < Math.abs(vy) * 0.45) return;
    match.face[id] = vx < 0 ? -1 : 1;
  }

  function tickDribbleClock(dt) {
    match.dribbleClock ||= {};
    for (const id of ["mamdani", "sayed"]) {
      const key = match.pose[id] === "move" ? "move" : "dribble";
      const clock = match.dribbleClock[id];
      if (!clock || clock.key !== key) match.dribbleClock[id] = { key, time: 0 };
      else if (match.owner === id && !match.hold && !match.ball) clock.time += dt;
    }
  }

  function dribbleIndex(clip, id = match.owner) {
    const start = clip.loopStart || 0;
    const length = (clip.loopEnd == null ? clip.frames : clip.loopEnd + 1) - start;
    const time = match.dribbleClock?.[id]?.time || 0;
    return start + Math.floor(time * (clip.fps || 8)) % length;
  }

  function tickDribble() {
    if (!match.owner || match.hold || match.ball || match.pass) {
      match.dribU = null;
      return;
    }
    const clip = handClip(match.owner);
    if (clip?.embeddedBall || clip?.bounceCycle) {
      const frame = dribbleIndex(clip);
      if (clip.bounceFrames?.includes(frame) && match.dribU !== frame) dribbleThump();
      match.dribU = frame;
      return;
    }
    if (clip?.carried) { match.dribU = null; return; }
    if (clip && clip.pace) {
      const phase = (match.t * clip.pace) % 1;
      if (match.dribU != null && match.dribU < 0.5 && phase >= 0.5) dribbleThump();
      match.dribU = phase;
      return;
    }
    if (clip && clip.yFree != null) {
      const fps = clip.fps || 8;
      const frame = Math.floor(match.t * fps) % clip.frames;
      if (frame !== clip.yFree) {
        match.dribU = null;
        return;
      }
      const phase = (match.t * fps) % 1;
      if (match.dribU != null && match.dribU < 0.5 && phase >= 0.5) dribbleThump();
      match.dribU = phase;
      return;
    }
    if (clip && clip.hands) {
      const frame = dribbleIndex(clip);
      let low = 0;
      clip.hands.forEach((hand, i) => {
        if (hand[1] > clip.hands[low][1]) low = i;
      });
      if (frame === low && match.dribU !== low) dribbleThump();
      match.dribU = frame;
      return;
    }
    const phase = (match.t * 2) % 1;
    if (match.dribU != null && match.dribU < 0.5 && phase >= 0.5) dribbleThump();
    match.dribU = phase;
  }

  function handClip(id) {
    const set = CLIPS[id];
    if (!set) return null;
    if (match.pose[id] === "move" && set.move && set.move.hands) return set.move;
    if (set.dribble && set.dribble.hands) return set.dribble;
    return null;
  }

  function ownedBall(id) {
    const at = project(match.pos[id].x, match.pos[id].y);
    const span = playerHeight(at);
    const face = match.face[id] || 1;
    const lift = bodyMotion(id).lift * at.s;
    const r = Math.max(8, span * 0.09);
    const clip = handClip(id);
    if (clip) {
      const frame = dribbleIndex(clip, id);
      const layout = spriteLayout(clip, frame);
      const drawn = drawnSprite(clip, at, frame);
      const height = drawn.height;
      const width = drawn.width;
      const hand = clip.hands[Math.min(frame, clip.hands.length - 1)];
      const x = at.x + face * (clip.sourceFacing || 1) * (hand[0] - (clip.originX ?? .5)) * width;
      let y = at.y - lift + (-height * layout.footInSlice) + ((hand[1] * clip.fh - layout.sy) / layout.sh) * height;
      if (clip.bounceCycle) {
        const u = ((match.dribbleClock?.[id]?.time || 0) * clip.fps % clip.frames) / clip.frames;
        // Push, floor contact, return: one bounce per authored hand cycle.
        const low = 6 / clip.frames;
        const travel = u < low ? u / low : (1 - u) / (1 - low);
        const top = at.y - height * .48;
        y = top + (at.y - r - top) * Math.pow(Math.max(0, travel), .8);
      } else if (clip.pace) {
        const u = (match.t * clip.pace) % 1;
        y += Math.sin(u * Math.PI) * height * (clip.hop || 0.12);
      } else {
        const u = (match.t * (clip.fps || 8)) % 1;
        if (clip.bounce) y += Math.sin(u * Math.PI) * height * (clip.hop || 0.12);
        else if (frame === clip.yFree) y += Math.sin(u * Math.PI) * height * (clip.hop || 0.08);
      }
      return { x, y, r, spin: match.t * 7 };
    }
    const beat = dribbleBeat();
    const x = at.x + face * span * 0.12;
    const y = at.y - span * 0.28 + Math.sin(beat.bounce * Math.PI) * span * 0.1;
    return { x, y, r, spin: beat.bounce * 1.1 };
  }

  function beginCatch(from) {
    if (!match || match.over) {
      match.owner = null;
      match.pass = null;
      return;
    }
    const hoop = hoopLayout();
    const to = match.active;
    const dest = ownedBall(to);
    const origin = from || { x: hoop.x, y: hoop.rim + 8 };
    match.owner = null;
    match.pass = {
      x0: origin.x,
      y0: origin.y,
      x1: dest.x,
      y1: dest.y,
      arc: 70,
      t: 0,
      dur: 0.48,
      to,
    };
  }

  function shotLift(t) {
    return Math.sin(clamp(t / 0.78, 0, 1) * Math.PI) * 24;
  }

  function bodyMotion(id) {
    if (match?.ball?.id === id && match.ball.syncRelease && match.ball.phase === "arc") {
      if (CLIPS[id].shot.authoredLift) return { lift: 0, squash: 1 };
      const t = match.ball.t;
      const landing = t > 0.72 && t < 0.98 ? Math.sin((t - 0.72) / 0.26 * Math.PI) : 0;
      return { lift: shotLift(t), squash: 1 - landing * 0.08 };
    }
    return { lift: 0, squash: 1 };
  }

  function say(text) {
    match.call = text;
  }

  function beginCpu() {
    const id = match.active;
    const spot = match.phase === "copy"
      ? { x: match.challenge.x, y: match.challenge.y }
      : pickCpuSpot();
    const flair = match.phase === "copy"
      ? match.challenge.flair
      : pickCpuFlair(spot);
    const need = requiredPower(spot.x, spot.y);
    const makeIt = Math.random() < (flair === "none" ? 0.78 : 0.55);
    // Normal misses must be outside the same tolerance used by the meter.
    const error = makeIt ? (Math.random() - 0.5) * 0.11 :
      (need > 0.5 ? -1 : 1) * (0.11 + Math.random() * 0.07);
    match.cpu = {
      id,
      spot,
      flair,
      aim: clamp(need + error, 0.08, 0.98),
      makeIt,
      stage: "walk",
    };
    match.flair = "none";
    match.hold = false;
  }

  function pickCpuSpot() {
    const dunk = Math.random() < 0.22;
    if (dunk) return { x: HOOP.x + (Math.random() - 0.5) * 0.08, y: HOOP.y - 0.12 };
    return {
      x: 0.18 + Math.random() * 0.64,
      y: 0.12 + Math.random() * 0.42,
    };
  }

  function pickCpuFlair(spot) {
    if (canDunk(spot.x, spot.y) && Math.random() < 0.7) return "dunk";
    const bag = ["none", "none", "spin", "fade", "hook"];
    return bag[Math.floor(Math.random() * bag.length)];
  }

  function release(id) {
    const p = match.pos[id];
    match.face[id] = Math.sign(HOOP.x - p.x) || match.face[id] || 1;
    let flair = id === match.humanId ? match.flair : match.cpu.flair;
    if (flair === "dunk" && !canDunk(p.x, p.y)) {
      flair = "none";
      if (id === match.humanId) say("Too far to dunk. That one stays a jumper.");
    }
    const made = zoneFor(p.x, p.y, flair).hit;
    const hand = ownedBall(id);
    const hoop = hoopLayout();
    const side = Math.sign(hand.x - hoop.x) || 1;
    match.ball = {
      x0: hand.x,
      y0: hand.y,
      x1: made ? hoop.x : hoop.x + side * 24,
      y1: hoop.rim - (made ? 4 : 0),
      t: 0,
      dur: flair === "dunk" ? 0.92 : 0.64,
      show: flair === "dunk" ? 0.46 : 0.26,
      phase: "arc",
      arc: flair === "dunk" ? 36 : 168,
      made,
      flair,
      id,
      sx: p.x,
      sy: p.y,
    };
    const shotClip = CLIPS[id].shot;
    if (flair === "none" && shotClip.duration) {
      match.ball.dur = shotClip.duration;
      match.ball.show = shotClip.releaseTime;
    }
    if (flair === "none" && shotClip.releaseFrame != null) {
      const at = project(p.x, p.y), drawn = drawnSprite(shotClip, at, shotClip.releaseFrame);
      match.ball.syncRelease = true;
      match.ball.x0 = at.x + (match.face[id] || 1) * (shotClip.releaseHand[0] - (shotClip.originX ?? .5)) * drawn.width;
      match.ball.y0 = at.y - drawn.height * ((shotClip.feet?.[0] || 1) - shotClip.releaseHand[1]) - (shotClip.authoredLift ? 0 : shotLift(match.ball.show)) * at.s;
    }
    if (match.practice) say("Mamdani takes the jumper.");
    match.owner = null;
    match.pass = null;
    match.hold = false;
    match.pose[id] = flair === "none" ? "shot" : flair;
    match.jump[id] = 0;
    match.jumpDur[id] = 0;
    match.cpu = null;
    match.trail = [];
    if (flair === "dunk") {
      match.shake = 1.6;
      match.zoom = 1;
      match.flash = 0.35;
    }
    noiseBurst(0.12, 900, 0.05);
  }

  function addLetter(id) {
    match.letters[id] += 1;
    const word = LETTERS.slice(0, match.letters[id]).join("");
    tone(220, 0.18, "sawtooth", 0.05);
    if (match.letters[id] >= 5) {
      const winner = otherId(id);
      match.over = winner;
      say(`${FIGHTERS[id].full} spells HORSE. ${FIGHTERS[winner].full} takes the court.`);
      punch("HORSE", true);
      match.pop[id] = 1;
      return;
    }
    return word;
  }

  function resolveBall() {
    const ball = match.ball;
    const id = ball.id;
    const name = FIGHTERS[id].name;
    const from = { x: ball.x1, y: ball.y1 };
    match.ball = null;
    match.pose[id] = "idle";
    match.basket = { life: 1.4, made: ball.made, dunk: ball.flair === "dunk" };
    if (match.practice) {
      match.active = match.humanId; match.phase = "set"; match.challenge = null;
      match.flair = "none"; match.power = 0; match.lock = 0.35;
      say(ball.made ? "Swish. Move to a new spot and try again." : "Miss. Stop the needle in the gold zone and try again.");
      punch(ball.made ? "SWISH" : "TRY AGAIN", ball.made);
      beginCatch(from);
      return;
    }
    if (match.phase === "set") {
      if (ball.made) {
        match.challenge = { x: ball.sx, y: ball.sy, flair: ball.flair };
        match.phase = "copy";
        match.active = otherId(id);
        const trick = FLAIR_NAME[ball.flair];
        say(`${name} sinks the ${trick}. ${FIGHTERS[match.active].name} has to copy the spot and the flair.`);
        const shouts = { none: "SWISH", spin: "SPIN CYCLE", dunk: "HE GOT UP", fade: "FADEAWAY", hook: "SKY HOOK" };
        punch(shouts[ball.flair] || "SWISH", true);
        if (ball.flair === "dunk") {
          match.shake = 1.8;
          match.zoom = 1;
          match.flash = 1;
        }
      } else {
        match.challenge = null;
        match.phase = "set";
        match.active = otherId(id);
        say(`Off the iron. ${name}'s shot does not count. ${FIGHTERS[match.active].name} calls the next one.`);
        punch("OFF THE IRON");
      }
    } else {
      const spotOk = Math.hypot(ball.sx - match.challenge.x, ball.sy - match.challenge.y) < 0.11;
      const flairOk = ball.flair === match.challenge.flair;
      if (ball.made && spotOk && flairOk) {
        match.phase = "set";
        match.challenge = null;
        match.active = otherId(id);
        say(`Copied. ${FIGHTERS[match.active].name} calls a new shot.`);
        punch("COPIED", true);
      } else {
        const why = !spotOk
          ? "Wrong spot."
          : !flairOk
            ? `That was a ${FLAIR_NAME[ball.flair]}. Copy the ${FLAIR_NAME[match.challenge.flair]}.`
            : "Off the rim.";
        const word = addLetter(id);
        match.pop[id] = 1;
        if (!match.over) {
          match.phase = "set";
          match.challenge = null;
          match.active = otherId(id);
          say(`${why} ${name} picks up ${word}. ${FIGHTERS[match.active].name} calls the next one.`);
          punch(word);
        }
      }
    }
    match.flair = "none";
    match.power = 0;
    match.lock = 1.15;
    if (match.active === match.cpuId && !match.over) {
      match.cpu = null;
    }
    beginCatch(from);
  }

  function advanceBall(ball) {
    const hoop = hoopLayout();
    if (ball.made) {
      swish();
      roar();
      match.shake = Math.max(match.shake || 0, ball.flair === "dunk" ? 2.1 : 0.85);
      match.zoom = Math.max(match.zoom || 0, ball.flair === "dunk" ? 1 : 0.4);
      ball.phase = "net";
      ball.t = 0;
      ball.dur = ball.flair === "dunk" ? 0.18 : 0.26;
      ball.arc = 0;
      ball.x0 = hoop.x;
      ball.y0 = hoop.rim + 2;
      ball.x1 = hoop.x;
      ball.y1 = hoop.rim + (ball.flair === "dunk" ? 74 : 58);
      match.hoopKick = ball.flair === "dunk" ? 1.35 : 0.8;
      return;
    }
    clank();
    match.shake = Math.max(match.shake || 0, 0.45);
    const side = Math.sign(ball.x0 - hoop.x) || 1;
    ball.phase = "brick";
    ball.t = 0;
    ball.dur = 0.3;
    ball.arc = 26;
    ball.x0 = hoop.x + side * 18;
    ball.y0 = hoop.rim - 2;
    ball.x1 = hoop.x + side * 92;
    ball.y1 = hoop.rim + 48;
    match.hoopKick = 0.4;
  }

  function update(dt) {
    if (!match || screen !== "play") return;
    match.t += dt;
    tickDribbleClock(dt);
    if (match.shake > 0) match.shake = Math.max(0, match.shake - dt * 1.4);
    if (match.zoom > 0) match.zoom = Math.max(0, match.zoom - dt * 0.42);
    if (match.flash > 0) match.flash = Math.max(0, match.flash - dt * 1.8);
    if (match.roar > 0) match.roar = Math.max(0, match.roar - dt * 0.55);
    if (match.basket) {
      match.basket.life -= dt;
      if (match.basket.life <= 0) match.basket = null;
    }
    match.pop.mamdani = Math.max(0, match.pop.mamdani - dt * 1.4);
    match.pop.sayed = Math.max(0, match.pop.sayed - dt * 1.4);
    if (match.banner) {
      match.banner.life -= dt;
      if (match.banner.life <= 0) match.banner = null;
    }
    for (const id of ["mamdani", "sayed"]) {
      if (match.jump[id] > 0) {
        match.jump[id] += dt;
        if (match.jump[id] >= (match.jumpDur[id] || 0)) {
          match.jump[id] = 0;
          match.jumpDur[id] = 0;
        }
      }
    }
    if (match.hoopKick > 0) match.hoopKick = Math.max(0, match.hoopKick - dt * 1.15);
    tickDribble();
    if (match.ball) {
      match.trail.push(ballPoint(match.ball));
      if (match.trail.length > 14) match.trail.shift();
    } else if (match.trail.length) {
      match.trail.shift();
    }
    if (match.ball) {
      match.ball.t += dt / (match.ball.dur || 0.72);
      if (match.ball.t >= 1) {
        if (!match.ball.phase || match.ball.phase === "arc") advanceBall(match.ball);
        else resolveBall();
      }
      return;
    }
    if (match.pass) {
      const dest = ownedBall(match.pass.to);
      match.pass.x1 = dest.x;
      match.pass.y1 = dest.y;
      match.pass.t += dt / (match.pass.dur || 0.48);
      if (match.pass.t >= 1) {
        match.owner = match.pass.to;
        match.pass = null;
        tone(540, 0.06, "square", 0.035);
      }
    }
    if (match.over) return;
    if (match.lock > 0) {
      match.lock -= dt;
      return;
    }
    if (match.active === match.cpuId) updateCpu(dt);
    else updateHuman(dt);
  }

  function updateHuman(dt) {
    const id = match.humanId;
    const p = match.pos[id];
    let vx = 0;
    let vy = 0;
    if (keys.has("arrowleft") || keys.has("a")) vx -= 1;
    if (keys.has("arrowright") || keys.has("d")) vx += 1;
    if (keys.has("arrowup") || keys.has("w")) vy += 1;
    if (keys.has("arrowdown") || keys.has("s")) vy -= 1;
    if (pointer && pointer.move) {
      const dx = pointer.move.x - p.x;
      const dy = pointer.move.y - p.y;
      if (Math.hypot(dx, dy) > 0.02) {
        vx = dx;
        vy = dy;
      } else pointer.move = null;
    }
    const mag = Math.hypot(vx, vy) || 1;
    if (match.hold) { vx = 0; vy = 0; }
    if (vx || vy) {
      p.x = clamp(p.x + (vx / mag) * dt * 0.34, 0.08, 0.92);
      p.y = clamp(p.y + (vy / mag) * dt * 0.28, 0.08, 0.94);
      aimFace(id, vx, vy);
      match.pose[id] = "move";
    } else if (!match.hold) {
      match.pose[id] = "idle";
    }
    if (match.hold) {
      match.face[id] = Math.sign(HOOP.x - p.x) || match.face[id] || 1;
      pointer = null;
      match.power += match.powerDir * dt * 0.72;
      if (match.power >= 1) {
        match.power = 1;
        match.powerDir = -1;
      } else if (match.power <= 0) {
        match.power = 0;
        match.powerDir = 1;
      }
      match.pose[id] = match.flair === "none" ? "shot" : match.flair;
      const ready = shotNeed().hit;
      if (ready && !match.zone) tone(740, 0.05, "square", 0.04);
      match.zone = ready;
    } else {
      match.zone = false;
    }
  }

  function updateCpu(dt) {
    if (!match.cpu) beginCpu();
    const cpu = match.cpu;
    const p = match.pos[cpu.id];
    if (cpu.stage === "walk") {
      const dx = cpu.spot.x - p.x;
      const dy = cpu.spot.y - p.y;
      if (Math.hypot(dx, dy) > 0.025) {
        p.x = clamp(p.x + Math.sign(dx) * dt * 0.32, 0.08, 0.92);
        p.y = clamp(p.y + Math.sign(dy) * dt * 0.26, 0.08, 0.94);
        aimFace(cpu.id, dx, dy);
        match.pose[cpu.id] = "move";
      } else {
        p.x = cpu.spot.x;
        p.y = cpu.spot.y;
        cpu.stage = "aim";
        match.hold = true;
        match.power = 0;
        match.powerDir = 1;
        match.flair = "none";
        match.pose[cpu.id] = cpu.flair === "none" ? "shot" : cpu.flair;
      }
      return;
    }
    match.hold = true;
    match.power += dt * 0.72;
    if (match.power > 1) match.power = 1;
    match.pose[cpu.id] = cpu.flair === "none" ? "shot" : cpu.flair;
    if (cpu.flair === "none") {
      if (match.power >= cpu.aim) {
        match.power = cpu.aim;
        release(cpu.id);
      }
      return;
    }
    const zone = zoneFor(p.x, p.y, cpu.flair);
    if (cpu.makeIt && zone.hit) release(cpu.id);
    else if (!cpu.makeIt && match.power >= 0.97) release(cpu.id);
  }

  function humanRelease() {
    if (!match || match.over || match.ball || match.pass || match.lock > 0) return;
    if (match.active !== match.humanId || !match.hold) return;
    release(match.humanId);
  }

  function setFlair(id) {
    if (match?.practice) return;
    if (!match || match.ball || match.pass || match.active !== match.humanId) return;
    if (id === "dunk" && !canDunk(match.pos[match.humanId].x, match.pos[match.humanId].y)) {
      say("Get closer to the rim to dunk.");
      tone(160, 0.08, "square", 0.04);
      return;
    }
    match.flair = match.flair === id ? "none" : id;
    tone(480, 0.05, "square", 0.03);
  }

  function drawCover(img) {
    if (!img || !img.complete || !img.naturalWidth) return false;
    const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
    return true;
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function readyImage(key) {
    const img = images[key];
    return img && img.complete && img.naturalWidth ? img : null;
  }

  function glassPanel(x, y, w, h, hot) {
    ctx.save();
    ctx.shadowColor = hot ? "rgba(255, 246, 216, 0.85)" : "rgba(140, 210, 255, 0.55)";
    ctx.shadowBlur = hot ? 18 : 10;
    ctx.fillStyle = hot ? "rgba(255, 246, 216, 0.14)" : "rgba(2, 8, 16, 0.42)";
    roundRect(x, y, w, h, 4);
    ctx.fill();
    ctx.strokeStyle = hot ? "#fff6d8" : "rgba(186, 226, 255, 0.9)";
    ctx.lineWidth = hot ? 2 : 1.25;
    ctx.stroke();
    ctx.restore();
  }

  function button(x, y, w, h, label, action, hot, shoot) {
    buttons.push({ x, y, w, h, action, shoot: !!shoot });
    glassPanel(x, y, w, h, hot);
    ctx.fillStyle = hot ? "#fff6d8" : "#f4efe4";
    ctx.font = "20px Bungee, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x + w / 2, y + h / 2 + 1);
  }

  function drawTitle() {
    buttons.length = 0;
    if (!drawCover(images.nyc)) {
      ctx.fillStyle = "#10141c";
      ctx.fillRect(0, 0, W, H);
    }
    ctx.fillStyle = "rgba(6, 8, 14, 0.45)";
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";
    ctx.fillStyle = "#9fd4ff";
    ctx.font = "22px Share Tech Mono, monospace";
    ctx.fillText("POLITICAL ARCADES", W / 2, 150);
    ctx.fillStyle = "#f4efe4";
    ctx.strokeStyle = "#061018";
    ctx.lineWidth = 10;
    ctx.font = "120px Bungee, sans-serif";
    ctx.strokeText("HORSE", W / 2, 280);
    ctx.fillText("HORSE", W / 2, 280);
    ctx.fillStyle = "#f6efe4";
    ctx.font = "22px Share Tech Mono, monospace";
    ctx.fillText("Call the spot. Call the flair. Make them copy it.", W / 2, 340);
    button(W / 2 - 160, 420, 320, 64, "PICK A SHOOTER", () => {
      screen = "select";
    }, true);
    ctx.fillStyle = "#f6efe4";
    ctx.font = "16px Share Tech Mono, monospace";
    ctx.fillText("Arrows move. Space starts the meter. Tap again in the box. 1 spin  2 dunk  3 fade  4 hook.", W / 2, 530);
  }

  function drawSelect() {
    buttons.length = 0;
    ctx.fillStyle = "#07080c";
    ctx.fillRect(0, 0, W, H);
    const ids = ["mamdani", "sayed"];
    ids.forEach((id, i) => {
      const x = 40 + i * 620;
      buttons.push({
        x,
        y: 70,
        w: 580,
        h: 420,
        action: () => {
          selectIndex = i;
        },
      });
      const img = images[id === "mamdani" ? "nyc-future" : "detroit-future"];
      if (img && img.complete && img.naturalWidth) {
        ctx.drawImage(img, x, 70, 580, 326);
      }
      ctx.fillStyle = "rgba(7,8,12,0.55)";
      ctx.fillRect(x, 70, 580, 326);
      const portrait = images[`${id}-idle`];
      if (portrait?.complete && portrait.naturalWidth) {
        const clip = CLIPS[id].idle;
        const height = 304, width = height * clip.fw / clip.fh;
        ctx.drawImage(portrait, 0, 0, clip.fw, clip.fh, x + (580 - width) / 2, 82, width, height);
      }
      const on = i === selectIndex;
      ctx.strokeStyle = on ? "#fff6d8" : "rgba(186, 226, 255, 0.35)";
      ctx.lineWidth = on ? 3 : 1;
      ctx.strokeRect(x, 70, 580, 326);
      const f = FIGHTERS[id];
      ctx.fillStyle = on ? "#fff6d8" : "#f6efe4";
      ctx.font = "32px Bungee, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(f.full, x + 8, 450);
      ctx.font = "18px Share Tech Mono, monospace";
      ctx.fillStyle = "#b7aea0";
      ctx.fillText(`${f.city} court. CPU takes the other side.`, x + 8, 486);
    });
    ctx.textAlign = "center";
    ctx.fillStyle = "#9fd4ff";
    ctx.font = "18px Share Tech Mono, monospace";
    ctx.fillText("LEFT AND RIGHT TO CHOOSE", W / 2, 48);
    button(W / 2 - 150, 560, 300, 64, "STEP ON THE COURT", () => startGame(), true);
  }

  function startGame() {
    const id = selectIndex === 0 ? "mamdani" : "sayed";
    match = freshMatch(id);
    screen = "play";
    canvas.focus();
  }

  function quad(p0, p1, p2, p3) {
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
  }

  function drawCourt() {
    const nyc = match.court === "nyc";
    const bg = readyImage(nyc ? "nyc-future" : "detroit-future");
    if (bg) ctx.drawImage(bg, 0, 0, W, H);
    else {
      const sky = ctx.createLinearGradient(0, 0, 0, 280);
      sky.addColorStop(0, nyc ? "#070b18" : "#120818");
      sky.addColorStop(1, nyc ? "#1a2744" : "#2a1830");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);
    }
    if (match.challenge && match.phase === "copy") {
      const g = project(match.challenge.x, match.challenge.y);
      ctx.strokeStyle = "#fff6d8";
      ctx.shadowColor = "#fff6d8";
      ctx.shadowBlur = 12;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(g.x, g.y, 34 + Math.sin(match.t * 5) * 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#fff6d8";
      ctx.font = "14px Bungee, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(FLAIR_NAME[match.challenge.flair].toUpperCase(), g.x, g.y - 46);
    }
  }

  function drawCrowd(nyc) {
    for (let i = 0; i < 42; i += 1) {
      const x = 16 + i * 31;
      const hop = match.roar > 0 ? Math.abs(Math.sin(match.t * 9 + i)) * 16 * match.roar : 0;
      const bob = Math.sin(match.t * 3 + i) * 3 - hop;
      ctx.fillStyle = i % 2 ? (nyc ? "#1c2438" : "#2a1830") : "#3a241c";
      ctx.beginPath();
      ctx.ellipse(x, 168 + bob, 14, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = i % 3 ? "#e4b48a" : "#d39a6c";
      ctx.beginPath();
      ctx.arc(x, 154 + bob, 8, 0, Math.PI * 2);
      ctx.fill();
      if (match.roar > 0.2) {
        ctx.strokeStyle = i % 2 ? "#f6efe4" : "#ffb020";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x - 8, 168 + bob);
        ctx.lineTo(x - 16, 148 + bob - hop);
        ctx.moveTo(x + 8, 168 + bob);
        ctx.lineTo(x + 16, 148 + bob - hop);
        ctx.stroke();
      }
    }
  }

  function drawLights() {
    for (const x of [220, 640, 1060]) {
      const glow = ctx.createRadialGradient(x, 36, 4, x, 80, 180);
      glow.addColorStop(0, "rgba(255, 236, 190, 0.55)");
      glow.addColorStop(1, "rgba(255, 236, 190, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(x - 180, 0, 360, 220);
      ctx.fillStyle = "#f4efe4";
      ctx.fillRect(x - 28, 18, 56, 10);
    }
  }

  function drawBricks() {
    ctx.fillStyle = "#6d2e2a";
    ctx.fillRect(0, 40, W, 150);
    ctx.strokeStyle = "rgba(0,0,0,0.25)";
    ctx.lineWidth = 2;
    for (let y = 48; y < 190; y += 22) {
      for (let x = (y / 22) % 2 ? 0 : -20; x < W; x += 42) {
        ctx.strokeRect(x, y, 40, 20);
      }
    }
    ctx.fillStyle = "#8fd0e8";
    for (let x = 30; x < W; x += 90) ctx.fillRect(x, 70, 28, 36);
  }

  function drawSkyline() {
    ctx.fillStyle = "#1a1030";
    const towers = [[80, 90], [150, 140], [230, 70], [300, 160], [420, 100], [860, 150], [960, 80], [1080, 130], [1160, 60]];
    towers.forEach(([x, h]) => {
      ctx.fillRect(x, 180 - h, 48, h);
      ctx.fillStyle = "#ffb020";
      for (let y = 180 - h + 8; y < 170; y += 14) ctx.fillRect(x + 8, y, 6, 6);
      ctx.fillStyle = "#1a1030";
    });
  }

  function drawFence() {
    ctx.strokeStyle = "rgba(180, 190, 200, 0.35)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 16) {
      ctx.beginPath();
      ctx.moveTo(x, 150);
      ctx.lineTo(x, 230);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(0, 168);
    ctx.lineTo(W, 168);
    ctx.moveTo(0, 196);
    ctx.lineTo(W, 196);
    ctx.stroke();
  }

  function hoopPose() {
    const hoop = hoopLayout();
    const kick = (match.hoopKick || 0) * Math.sin(match.t * 34) * 7;
    return { x: hoop.x + kick, rim: hoop.rim + Math.abs(kick) * 0.2, floor: hoop.floor };
  }

  function hoopSpriteBox() {
    const hoop = hoopPose();
    const img = readyImage("hoop");
    if (!img) return null;
    const crop = 0.42;
    const dw = 176;
    const dh = dw * ((img.height * crop) / img.width);
    const rimFrac = 0.236 / crop;
    return {
      img,
      crop,
      x: hoop.x - dw / 2,
      y: hoop.rim - dh * rimFrac,
      w: dw,
      h: dh,
    };
  }

  function drawHoopBack() {
    const box = hoopSpriteBox();
    if (!box) return;
    const srcH = box.img.height * box.crop;
    ctx.drawImage(box.img, 0, 0, box.img.width, srcH, box.x, box.y, box.w, box.h);
  }

  function drawHoopFront() {
    const through = match.ball && match.ball.phase === "net";
    if (!through) return;
    const box = hoopSpriteBox();
    if (!box) return;
    const y0 = 0.29;
    const y1 = 0.4;
    const srcY = box.img.height * y0;
    const srcH = box.img.height * (y1 - y0);
    const destY = box.y + box.h * (y0 / box.crop);
    const destH = box.h * ((y1 - y0) / box.crop) * (1 + match.ball.t * 0.45);
    ctx.drawImage(box.img, 0, srcY, box.img.width, srcH, box.x, destY, box.w, destH);
  }

  function spriteFor(id, pose) {
    const set = CLIPS[id];
    if (!set) return null;
    let key = null;
    const shooting = match.ball && match.ball.id === id;
    const flairPose = pose === "dunk" || pose === "spin" || pose === "fade" || pose === "hook" || pose === "shot";
    const dribbling = match.owner === id && !match.hold && !match.ball && !match.pass;
    if (flairPose && set[pose]) key = pose;
    else if (shooting && set.shot) key = "shot";
    else if (dribbling && pose === "move" && set.move) key = "move";
    else if (dribbling && set.dribble) key = "dribble";
    else if (set[pose] && pose !== "move") key = pose;
    else if (set.idle) key = "idle";
    if (!key) return null;
    const img = images[`${id}-${key}`];
    if (!img || !img.complete || !img.naturalWidth) return null;
    return { img, clip: set[key], key };
  }

  function drawPlayer(id) {
    const f = FIGHTERS[id];
    const p = match.pos[id];
    const at = project(p.x, p.y);
    const pose = match.pose[id];
    const moving = pose === "move";
    const motion = bodyMotion(id);
    const lift = motion.lift * at.s;
    const sprite = spriteFor(id, pose);
    ctx.save();
    ctx.translate(at.x, at.y);
    const shadow = 1 - Math.min(0.55, Math.max(0, lift) / 130);
    ctx.fillStyle = `rgba(0,0,0,${0.38 * (0.45 + shadow * 0.55)})`;
    ctx.beginPath();
    ctx.ellipse(0, 4, 22 * at.s * shadow, 7 * at.s * shadow, 0, 0, Math.PI * 2);
    ctx.fill();
    if (sprite) {
      const { img, clip, key } = sprite;
      let frame;
      if (match.hold && match.active === id && key !== "idle" && key !== "dribble") {
        // Meter power is not animation progress: keep possession until release.
        frame = 0;
      } else if (match.ball && match.ball.id === id) {
        frame = poseFrame(clip, match.ball);
      } else if (key === "dribble" || key === "move") {
        frame = dribbleIndex(clip, id);
      } else if (key === "idle") {
        frame = Math.floor(match.t * (clip.fps || 8)) % clip.frames;
      } else {
        const air = Math.min(1, (match.jump[id] || 0) / (match.jumpDur[id] || 1));
        frame = Math.min(clip.frames - 1, Math.floor(air * clip.frames));
      }
      const span = playerHeight(at);
      const layout = spriteLayout(clip, frame);
      const drawn = drawnSprite(clip, at, frame);
      const height = drawn.height;
      const width = drawn.width;
      ctx.translate(0, -lift);
      const wide = motion.squash < 1 ? 1 + (1 - motion.squash) * 0.65 : 1;
      ctx.scale((match.face[id] || 1) * (clip.sourceFacing || 1) * wide, motion.squash);
      const top = -height * layout.footInSlice;
      const cell = spriteCell(clip, frame, layout);
      ctx.drawImage(img, cell.x, cell.y, clip.fw, layout.sh, -width * (clip.originX ?? .5), top, width, height);
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.scale(1, -0.28);
      ctx.drawImage(img, cell.x, cell.y, clip.fw, layout.sh, -width * (clip.originX ?? .5), top, width, height);
      ctx.restore();
      ctx.restore();
      return;
    }
    const stride = moving ? Math.sin(match.t * 11) * 10 : 0;
    const face = images[id === "mamdani" ? "face-mamdani" : "face-sayed"];
    ctx.scale(at.s, at.s);
    ctx.translate(0, -lift / Math.max(0.4, at.s));
    if (pose === "spin") ctx.rotate(Math.sin(match.t * 18) * 0.9);
    if (pose === "fade") ctx.rotate(-0.45);
    if (pose === "hook") ctx.rotate(0.35);
    ctx.fillStyle = f.pants;
    ctx.strokeStyle = "#141414";
    ctx.lineWidth = 3;
    roundRect(-14, -40 + stride, 12, 36, 4);
    ctx.fill();
    ctx.stroke();
    roundRect(2, -40 - stride, 12, 36, 4);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = f.body;
    roundRect(-22, -86, 44, 50, 8);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = f.trim;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-22, -76);
    ctx.lineTo(22, -76);
    ctx.moveTo(0, -86);
    ctx.lineTo(0, -36);
    ctx.stroke();
    ctx.fillStyle = f.skin;
    ctx.strokeStyle = "#141414";
    ctx.lineWidth = 3;
    const armY = pose === "dunk" ? -118 : pose === "shot" || pose === "fade" || pose === "spin" || pose === "hook" ? -104 : -62;
    roundRect(-32, -78, 10, 28, 4);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(16, -74);
    ctx.lineTo(28, armY);
    ctx.lineWidth = 6;
    ctx.strokeStyle = f.skin;
    ctx.stroke();
    if (face && face.complete && face.naturalWidth) {
      ctx.save();
      roundRect(-26, -128, 52, 46, 12);
      ctx.clip();
      ctx.drawImage(face, -28, -132, 56, 50);
      ctx.restore();
      ctx.strokeStyle = "#141414";
      ctx.lineWidth = 3;
      roundRect(-26, -128, 52, 46, 12);
      ctx.stroke();
    }
    if ((pose === "idle" || moving) && match.active === id && !match.ball) {
      const bounce = Math.abs(Math.sin(match.t * 9));
      drawBall(18, -4 - bounce * 26, 10);
    }
    ctx.restore();
  }

  function poseFrame(clip, ball) {
    const last = clip.play != null ? clip.play : clip.frames - 1;
    if (ball.phase && ball.phase !== "arc") return last;
    if (ball.syncRelease && clip.releaseFrame != null) {
      if (ball.t < ball.show) return Math.min(clip.releaseFrame - 1, Math.floor(ball.t / ball.show * clip.releaseFrame));
      const recovery = clamp((ball.t - ball.show) / (1 - ball.show), 0, 1);
      return Math.min(last, clip.releaseFrame + Math.floor(recovery * (last - clip.releaseFrame + 1)));
    }
    const u = Math.min(1, ball.t / (ball.show || 0.35));
    if (u >= 1) return last;
    return Math.min(last, Math.floor(u * (last + 1)));
  }

  function drawGatherBall(id, frame) {
    const clip = CLIPS[id].shot;
    if (!clip.emptyHands) return;
    const at = project(match.pos[id].x, match.pos[id].y);
    const drawn = drawnSprite(clip, at, frame);
    const keys = clip.handKeys;
    let a = keys[0], b = keys[keys.length - 1];
    for (let i = 1; i < keys.length; i++) {
      if (frame <= keys[i][0]) { a = keys[i - 1]; b = keys[i]; break; }
    }
    const t = clamp((frame - a[0]) / Math.max(1, b[0] - a[0]), 0, 1);
    const hx = a[1] + (b[1] - a[1]) * t, hy = a[2] + (b[2] - a[2]) * t;
    drawBall(at.x + (match.face[id] || 1) * (hx - (clip.originX ?? .5)) * drawn.width,
      at.y + (hy - clip.feet[0]) * drawn.height, Math.max(8, playerHeight(at) * .09), 0);
  }

  function drawBall(x, y, r, spin) {
    const img = images.ball;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(spin || 0);
    if (img && img.complete && img.naturalWidth) {
      const d = r * 2.2;
      ctx.drawImage(img, -d / 2, -d / 2, d, d);
    } else {
      ctx.fillStyle = "#c86438";
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawFlight() {
    // A motion trail must read as motion, not several extra basketballs.
    ctx.save();
    ctx.strokeStyle = "rgba(255,184,96,0.28)";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    match.trail.forEach((p, i) => i ? ctx.lineTo(p.x,p.y) : ctx.moveTo(p.x,p.y));
    ctx.stroke();
    ctx.restore();
    const b = match.ball;
    const p = ballPoint(b);
    const radius = b.id === "mamdani" && b.syncRelease ? 7 : 11;
    drawBall(p.x, p.y, b.flair === "dunk" && p.t > 0.75 ? 13 : radius, p.t * 1.6);
  }

  function drawLoose(ball, spin) {
    const p = ballPoint(ball);
    drawBall(p.x, p.y, 11, spin);
  }

  function drawBanner() {
    if (!match.banner) return;
    const life = match.banner.life;
    const popIn = Math.min(1, (2.4 - life) * 8);
    ctx.save();
    ctx.globalAlpha = Math.min(1, life * 3);
    ctx.translate(W / 2, 250);
    ctx.scale(0.78 + popIn * 0.28, 0.78 + popIn * 0.28);
    ctx.font = "78px Bungee, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 12;
    ctx.strokeStyle = "#14080c";
    ctx.strokeText(match.banner.text, 0, 0);
    ctx.fillStyle = "#fff6d8";
    ctx.fillText(match.banner.text, 0, 0);
    ctx.restore();
  }

  function drawHud() {
    buttons.length = 0;
    const aiming = match.hold && match.active === match.humanId && !match.ball ? shotNeed() : null;
    glassPanel(16, 8, 1248, 114, false);
    ["mamdani", "sayed"].forEach((id, i) => {
      const right = i === 1;
      const faceX = right ? 1188 : 32;
      const f = FIGHTERS[id];
      const face = images[id === "mamdani" ? "face-mamdani" : "face-sayed"];
      if (face && face.complete && face.naturalWidth) {
        ctx.save();
        roundRect(faceX, 20, 60, 60, 4);
        ctx.clip();
        ctx.drawImage(face, faceX, 20, 60, 60);
        ctx.restore();
        ctx.strokeStyle = "rgba(186, 226, 255, 0.8)";
        ctx.lineWidth = 1;
        ctx.strokeRect(faceX, 20, 60, 60);
      }
      ctx.fillStyle = "#f4efe4";
      ctx.font = "16px Bungee, sans-serif";
      ctx.textAlign = right ? "right" : "left";
      ctx.fillText(f.name.toUpperCase(), right ? faceX - 12 : faceX + 70, 40);
      LETTERS.forEach((letter, n) => {
        const on = n < match.letters[id];
        const fresh = on && n === match.letters[id] - 1 && match.pop[id] > 0;
        const s = fresh ? 1 + match.pop[id] * 0.55 : 1;
        const lx = right ? faceX - 16 - (5 - n) * 26 : faceX + 70 + n * 26;
        ctx.save();
        ctx.translate(lx, 76);
        ctx.scale(s, s);
        ctx.font = "22px Bungee, sans-serif";
        ctx.textAlign = "left";
        ctx.shadowColor = on ? "#fff6d8" : "transparent";
        ctx.shadowBlur = on ? 12 : 0;
        ctx.fillStyle = on ? "#fff6d8" : "rgba(170, 200, 230, 0.28)";
        ctx.fillText(letter, 0, 0);
        ctx.restore();
      });
    });
    const city = match.court === "nyc" ? "NEW YORK" : "DETROIT";
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    if (aiming) {
      ctx.fillStyle = "#fff6d8";
      ctx.font = "20px Bungee, sans-serif";
      ctx.fillText(aiming.hit ? "RELEASE NOW" : "STOP THE NEEDLE IN THE GOLD ZONE", W / 2, 45);
      ctx.fillStyle = "#9fd4ff";
      ctx.font = "16px Share Tech Mono, monospace";
      ctx.fillText("Space or tap the shot button again", W / 2, 76);
      const at = project(match.pos[match.humanId].x, match.pos[match.humanId].y);
      const w = 360;
      const h = 32;
      const x = clamp(at.x - w / 2, 24, W - w - 24);
      const y = clamp(at.y + 20, 360, 610);
      glassPanel(x, y, w, h, aiming.hit);
      ctx.fillStyle = "#10141c";
      ctx.fillRect(x + 3, y + 3, w - 6, h - 6);
      const pad = 8;
      const inner = w - pad * 2;
      const left = x + pad + (aiming.need - aiming.span) * inner;
      const zoneW = Math.max(8, aiming.span * 2 * inner);
      ctx.shadowColor = "#ffb020";
      ctx.shadowBlur = aiming.hit ? 12 : 0;
      ctx.fillStyle = "#ffb020";
      ctx.fillRect(left, y + 5, zoneW, h - 10);
      const nx = x + pad + match.power * inner;
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#05080e";
      ctx.fillRect(nx - 4, y + 1, 8, h - 2);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(nx - 2, y + 1, 4, h - 2);
      ctx.shadowBlur = 0;
    } else {
      ctx.fillStyle = "#9fd4ff";
      ctx.font = "12px Bungee, sans-serif";
      ctx.fillText(city, W / 2, 34);
      wrapCall(match.call, W / 2, 58);
    }

    if (!match.over && match.active === match.humanId && !match.ball && !match.pass) {
      const labels = [
        ["1  SPIN", "spin"],
        ["2  DUNK", "dunk"],
        ["3  FADE", "fade"],
        ["4  HOOK", "hook"],
      ];
      if (match.practice) {
        ctx.fillStyle = "#fff6d8"; ctx.font = "16px Bungee, sans-serif";
        ctx.fillText("JUMPER PRACTICE / MOVE: ARROWS OR WASD", 350, 690);
      }
      (match.practice ? [] : labels).forEach((item, i) => {
        const dunkFar = item[1] === "dunk" && !canDunk(match.pos[match.humanId].x, match.pos[match.humanId].y);
        button(24 + i * 168, 662, 156, 44, dunkFar ? "2  TOO FAR" : item[0], () => setFlair(item[1]), match.flair === item[1]);
      });
      const label = !match.hold ? "AIM: SPACE / TAP" : aiming && aiming.hit ? "SHOOT NOW!" : "SHOOT IN THE GOLD ZONE";
      button(708, 662, 548, 44, label, () => {
        if (!match.hold) {
          match.hold = true;
          match.power = 0;
          match.powerDir = 1;
          match.zone = false;
        } else {
          humanRelease();
        }
      }, !!(aiming && aiming.hit), true);
    }

    if (match.over) {
      button(W / 2 - 320, 600, 280, 58, "RUN IT BACK", () => {
        match = freshMatch(match.humanId);
      }, true);
      button(W / 2 + 40, 600, 280, 58, "PICK AGAIN", () => {
        screen = "select";
        match = null;
      }, false);
    }
  }

  function wrapCall(text, x, y) {
    ctx.font = "18px Share Tech Mono, monospace";
    ctx.fillStyle = "#f6efe4";
    ctx.textAlign = "center";
    const words = text.split(" ");
    let line = "";
    const lines = [];
    words.forEach((word) => {
      const next = line ? `${line} ${word}` : word;
      if (ctx.measureText(next).width > 380) {
        lines.push(line);
        line = word;
      } else line = next;
    });
    if (line) lines.push(line);
    lines.forEach((line, index) => ctx.fillText(line, x, y + index * 19));
  }

  function draw() {
    buttons.length = 0;
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    ctx.save();
    if (screen === "play" && match && match.zoom > 0) {
      const z = 1 + match.zoom * 0.34;
      const hoop = hoopLayout();
      ctx.translate(hoop.x, hoop.rim);
      ctx.scale(z, z);
      ctx.translate(-hoop.x, -hoop.rim);
    }
    if (screen === "play" && match && match.shake > 0) {
      const s = match.shake * 10;
      ctx.translate((Math.random() - 0.5) * s, (Math.random() - 0.5) * s);
    }
    if (screen === "title") drawTitle();
    else if (screen === "select") drawSelect();
    else {
      drawCourt();
      drawHoopBack();
      const order = ["mamdani", "sayed"].sort((a, b) => match.pos[b].y - match.pos[a].y);
      order.forEach(drawPlayer);
      const through = match.ball && match.ball.phase === "net";
      if (!through) drawHoopFront();
      if (match.ball) {
        if (match.ball.phase !== "arc" || match.ball.t >= (match.ball.show || 0)) drawFlight();
        else if (match.ball.flair === "none") drawGatherBall(match.ball.id, poseFrame(CLIPS[match.ball.id].shot, match.ball));
      } else if (match.hold && match.flair === "none") {
        drawGatherBall(match.active, 0);
      } else if (match.pass) {
        drawLoose(match.pass, match.pass.t * 1.4);
      } else if (match.owner && !match.hold && !spriteFor(match.owner, match.pose[match.owner])?.clip.embeddedBall) {
        const held = ownedBall(match.owner);
        const feet = project(match.pos[match.owner].x, match.pos[match.owner].y);
        const rise = Math.max(0, feet.y - held.y);
        const contact = clamp(1 - rise / 150, 0.2, 0.7);
        ctx.save();
        ctx.fillStyle = `rgba(0, 0, 0, ${0.28 + contact * 0.35})`;
        ctx.beginPath();
        ctx.ellipse(held.x, feet.y + 3, held.r * (0.45 + contact * 0.7), held.r * 0.24, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        drawBall(held.x, held.y, held.r, held.spin);
      } else if (match.trail.length) {
        match.trail.forEach((p, i) => {
          ctx.fillStyle = `rgba(200, 100, 56, ${(i + 1) / match.trail.length * 0.25})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
          ctx.fill();
        });
      }
      if (through) drawHoopFront();
      drawBanner();
    }
    ctx.restore();
    if (screen === "play" && match) {
      drawHud();
      if (match.flash > 0) {
        ctx.fillStyle = `rgba(255, 246, 220, ${match.flash * 0.55})`;
        ctx.fillRect(0, 0, W, H);
      }
    }
  }

  function hit(px, py) {
    for (let i = buttons.length - 1; i >= 0; i -= 1) {
      const b = buttons[i];
      if (px >= b.x && px <= b.x + b.w && py >= b.y && py <= b.y + b.h) return b;
    }
    return null;
  }

  function pointerPos(ev) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((ev.clientX - rect.left) * W) / rect.width,
      y: ((ev.clientY - rect.top) * H) / rect.height,
    };
  }

  canvas.addEventListener("pointerdown", (ev) => {
    if (paused) return;
    unlockAudio();
    canvas.focus();
    const p = pointerPos(ev);
    const b = hit(p.x, p.y);
    if (b) {
      b.action();
      pointer = null;
      return;
    }
    if (screen === "play" && match && match.active === match.humanId && !match.ball && !match.pass && !match.over) {
      const spot = courtPoint(p.x, p.y);
      if (spot) pointer = { move: spot };
    }
  });

  canvas.addEventListener("pointerup", () => {
    if (pointer && pointer.shoot) humanRelease();
    if (pointer) pointer.shoot = false;
  });

  window.addEventListener("keydown", (ev) => {
    const k = ev.key.toLowerCase();
    if (k === "escape" && screen === "play") { ev.preventDefault(); if (!ev.repeat) setPaused(!paused); return; }
    if (ev.target?.closest?.("button, a, input, select, textarea, [contenteditable]")) return;
    if ([" ", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(k)) ev.preventDefault();
    if (paused || ev.repeat) return;
    unlockAudio();
    keys.add(k);
    if (k === " " || k === "arrowup" || k === "arrowdown") ev.preventDefault();
    if (screen === "title" && (k === "enter" || k === " ")) {
      screen = "select";
      return;
    }
    if (screen === "select") {
      if (k === "arrowleft" || k === "a") selectIndex = 0;
      if (k === "arrowright" || k === "d") selectIndex = 1;
      if (k === "enter" || k === " ") startGame();
      return;
    }
    if (!match) return;
    if (match.over) { if (k === "enter" || k === " ") restartMatch(); return; }
    if ((k === " " || k === "j") && match.active === match.humanId && !match.ball && !match.pass && match.lock <= 0) {
      if (!match.hold) {
        match.hold = true;
        match.power = 0;
        match.powerDir = 1;
        match.zone = false;
      } else {
        humanRelease();
      }
    }
    if (k === "1" || k === "q") setFlair("spin");
    if (k === "2" || k === "e") setFlair("dunk");
    if (k === "3" || k === "f") setFlair("fade");
    if (k === "4" || k === "r") setFlair("hook");
  });

  window.addEventListener("keyup", (ev) => {
    const k = ev.key.toLowerCase();
    keys.delete(k);
  });

  function frame(now) {
    const dt = Math.min(0.033, (now - last) / 1000);
    last = now;
    if (!paused) update(dt * (match?.practice && document.getElementById("slow-motion").checked ? 0.25 : 1));
    document.getElementById("practice-speed").hidden = !match?.practice;
    draw();
    controls.hidden = screen !== "play";
    document.getElementById("pause-toggle").hidden = !match || match.over;
    const message = screen === "play" && match ? (paused ? "Paused. Resume when ready." : match.call) : "";
    if (status.textContent !== message) status.textContent = message;
    requestAnimationFrame(frame);
  }

  if (window.mountTouchControls) {
    window.mountTouchControls(canvas.parentElement, {
      pad: {
        left: { key: "ArrowLeft", code: "ArrowLeft" },
        right: { key: "ArrowRight", code: "ArrowRight" },
        up: { key: "ArrowUp", code: "ArrowUp" },
        down: { key: "ArrowDown", code: "ArrowDown" },
      },
      buttons: [
        { label: "Spin", key: "1", code: "Digit1", tone: "pink" },
        { label: "Dunk", key: "2", code: "Digit2", tone: "gold" },
        { label: "Fade", key: "3", code: "Digit3", tone: "blue" },
        { label: "Hook", key: "4", code: "Digit4", tone: "cream" },
        { label: "Shoot", key: " ", code: "Space", tone: "gold wide" },
      ],
    });
  }

  if (window.location?.search?.includes("practice=1")) startPractice();
  canvas.focus();
  requestAnimationFrame(frame);
})();
