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
    talarico: { id: "talarico", name: "Talarico", full: "James Talarico", city: "Texas", court: "nyc", body: "#d86827", trim: "#fff0cc", skin: "#f0c6a1", pants: "#d86827", smile: true },
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

  const ROSTER = Object.keys(FIGHTERS);
  let opponentIndex = 1;
  let playMode = "solo";
  const selectedFighter = () => ROSTER[selectIndex];
  const selectedOpponent = () => ROSTER.filter(id => id !== selectedFighter())[opponentIndex % 2];

  const FLAIR_NAME = {
    none: "plain jumper",
    spin: "spin jumper",
    dunk: "dunk",
    fade: "fadeaway",
    hook: "hook",
  };

  const HOOP = { x: 0.5, y: 0.8 };
  const LETTERS = ["V", "O", "T", "E"];
  const keys = new Set();
  const buttons = [];
  const images = {};
  const assetStates = new Map();
  let guideSeen = false;
  let guideOpen = false;
  function assetProgress() {
    const states = [...assetStates.values()];
    return { total: states.length, loaded: states.filter(a => a.state === "ready").length,
      failed: states.filter(a => a.state === "failed").length };
  }
  function assetsReady() { const p = assetProgress(); return p.total > 0 && p.loaded === p.total; }
  function retryAssets() {
    for (const [key, asset] of assetStates) if (asset.state === "failed") loadImage(key, asset.src);
  }
  document.getElementById("asset-retry").addEventListener("click", retryAssets);
  document.getElementById("guide-skip").addEventListener("click", () => finishGuide(false));
  document.getElementById("guide-learn").addEventListener("click", () => finishGuide(true));
  function finishGuide(learn) {
    guideOpen = false; guideSeen = true;
    document.getElementById("first-play").hidden = true;
    if (learn) {
      startPractice();
      match.tutorial = { x: match.pos[match.humanId].x, y: match.pos[match.humanId].y, moved: false, shot: false };
    } else startGame();
  }
  let audioCtx = null;
  let muted = true;
  let screen = "title";
  let selectIndex = 0;
  let match = null;

  const COURTS = [{"id": "nyc", "name": "New York Playground", "wins": 0, "src": "assets/nyc-playground.webp", "thumb": "assets/nyc-playground.webp", "rim": [640, 134]}, {"id": "detroit", "name": "Detroit Playground", "wins": 0, "src": "assets/detroit-playground.webp", "thumb": "assets/detroit-playground.webp", "rim": [634, 160]}, {"id": "court-01", "name": "Rent Freeze Schoolyard", "wins": 3, "src": "assets/courts/01.webp", "thumb": "assets/courts/01-thumb.webp", "rim": [636, 117]}, {"id": "court-02", "name": "Motor City Union Hall", "wins": 6, "src": "assets/courts/02.webp", "thumb": "assets/courts/02-thumb.webp", "rim": [640, 149]}, {"id": "court-03", "name": "Free Bus Fast Break", "wins": 9, "src": "assets/courts/03.webp", "thumb": "assets/courts/03-thumb.webp", "rim": [640, 108]}, {"id": "court-04", "name": "Public Health Playground", "wins": 12, "src": "assets/courts/04.webp", "thumb": "assets/courts/04-thumb.webp", "rim": [640, 113]}, {"id": "court-05", "name": "Grocery Co-op Corner", "wins": 15, "src": "assets/courts/05.webp", "thumb": "assets/courts/05-thumb.webp", "rim": [640, 158]}, {"id": "court-06", "name": "Rooftop Housing Boom", "wins": 18, "src": "assets/courts/06.webp", "thumb": "assets/courts/06-thumb.webp", "rim": [639, 176]}, {"id": "court-07", "name": "Library After Dark", "wins": 21, "src": "assets/courts/07.webp", "thumb": "assets/courts/07-thumb.webp", "rim": [634, 133]}, {"id": "court-08", "name": "Great Lakes Green Deal", "wins": 24, "src": "assets/courts/08.webp", "thumb": "assets/courts/08-thumb.webp", "rim": [637, 156]}, {"id": "court-09", "name": "Childcare Block Party", "wins": 27, "src": "assets/courts/09.webp", "thumb": "assets/courts/09-thumb.webp", "rim": [636, 162]}, {"id": "court-10", "name": "Ballot Box Boulevard", "wins": 30, "src": "assets/courts/10.webp", "thumb": "assets/courts/10-thumb.webp", "rim": [639, 128]}, {"id": "court-11", "name": "Trickle Down Country Club", "wins": 33, "src": "assets/courts/11.webp", "thumb": "assets/courts/11-thumb.webp", "rim": [640, 93]}, {"id": "court-12", "name": "Infrastructure Week Forever", "wins": 36, "src": "assets/courts/12.webp", "thumb": "assets/courts/12-thumb.webp", "rim": [640, 119]}, {"id": "court-13", "name": "Emergency Vacation Resort", "wins": 39, "src": "assets/courts/13.webp", "thumb": "assets/courts/13-thumb.webp", "rim": [638, 98]}, {"id": "court-14", "name": "Filibuster Falls", "wins": 42, "src": "assets/courts/14.webp", "thumb": "assets/courts/14-thumb.webp", "rim": [640, 137]}, {"id": "court-15", "name": "Border Wall Gift Shop", "wins": 45, "src": "assets/courts/15.webp", "thumb": "assets/courts/15-thumb.webp", "rim": [640, 158]}, {"id": "court-16", "name": "Stone Age Senate", "wins": 48, "src": "assets/courts/16.webp", "thumb": "assets/courts/16-thumb.webp", "rim": [637, 129]}, {"id": "court-17", "name": "Trickle Down Tar Pit", "wins": 51, "src": "assets/courts/17.webp", "thumb": "assets/courts/17-thumb.webp", "rim": [640, 121]}, {"id": "court-18", "name": "Mammoth Healthcare Maze", "wins": 54, "src": "assets/courts/18.webp", "thumb": "assets/courts/18-thumb.webp", "rim": [631, 130]}, {"id": "court-19", "name": "Fossil Fuel Fan Club", "wins": 57, "src": "assets/courts/19.webp", "thumb": "assets/courts/19-thumb.webp", "rim": [640, 171]}, {"id": "court-20", "name": "Cave Condo Crisis", "wins": 60, "src": "assets/courts/20.webp", "thumb": "assets/courts/20-thumb.webp", "rim": [640, 174]}, {"id": "court-21", "name": "Neon Public Option", "wins": 63, "src": "assets/courts/21.webp", "thumb": "assets/courts/21-thumb.webp", "rim": [640, 98]}, {"id": "court-22", "name": "Robo Landlord 3000", "wins": 66, "src": "assets/courts/22.webp", "thumb": "assets/courts/22-thumb.webp", "rim": [640, 143]}, {"id": "court-23", "name": "Solar Punk Commons", "wins": 69, "src": "assets/courts/23.webp", "thumb": "assets/courts/23-thumb.webp", "rim": [640, 109]}, {"id": "court-24", "name": "Algorithmic Gerrymander", "wins": 72, "src": "assets/courts/24.webp", "thumb": "assets/courts/24-thumb.webp", "rim": [640, 119]}, {"id": "court-25", "name": "Billionaire Bunker League", "wins": 75, "src": "assets/courts/25.webp", "thumb": "assets/courts/25-thumb.webp", "rim": [640, 121]}, {"id": "court-26", "name": "Lunar Tax Haven", "wins": 78, "src": "assets/courts/26.webp", "thumb": "assets/courts/26-thumb.webp", "rim": [640, 191]}, {"id": "court-27", "name": "Mars Infrastructure Week", "wins": 81, "src": "assets/courts/27.webp", "thumb": "assets/courts/27-thumb.webp", "rim": [635, 152]}, {"id": "court-28", "name": "Galactic Public Transit", "wins": 84, "src": "assets/courts/28.webp", "thumb": "assets/courts/28-thumb.webp", "rim": [640, 101]}, {"id": "court-29", "name": "Orbital Lobbyist Lounge", "wins": 87, "src": "assets/courts/29.webp", "thumb": "assets/courts/29-thumb.webp", "rim": [640, 114]}, {"id": "court-30", "name": "Democracy Block Party 2099", "wins": 90, "src": "assets/courts/30.webp", "thumb": "assets/courts/30-thumb.webp", "rim": [640, 93]}];
  let selectedCourt = null, courtOpen = false, pendingCourtStart = false;
  let careerWins = 0, progressSaved = true, marketingUnlock = false;
  try { const saved = JSON.parse(localStorage.getItem('vote-court-progress-v1') || '{}');
    careerWins = Number.isSafeInteger(saved.wins) && saved.wins >= 0 ? Math.min(saved.wins, 1000000) : 0;
  } catch (_) { progressSaved = false; }
  function courtById(id) { return COURTS.find(c => c.id === id) || COURTS[0]; }
  function courtUnlocked(id) { return marketingUnlock || courtById(id).wins <= careerWins; }
  function recordCourtWin() {
    if (!match || match.practice || marketingUnlock || match.marketingSession || match.winRecorded || match.over !== match.humanId) return;
    match.winRecorded = true;
    careerWins++;
    const newSongs = window.VoteSongs?.award(match) || [];
    match.newSongs = newSongs;
    try { localStorage.setItem('vote-court-progress-v1', JSON.stringify({wins:careerWins})); }
    catch (_) { progressSaved = false; }
    const unlocked = COURTS.find(c => c.wins === careerWins);
    match.unlockMessage = unlocked ? `COURT UNLOCKED: ${unlocked.name}` : `${careerWins} career wins`;
    if (newSongs.length) match.unlockMessage += ` · ${newSongs.length} song${newSongs.length===1?"":"s"} unlocked`;
  }
  function renderCourtSongs() {
    const slots = window.VoteSongs?.slots(selectedCourt,marketingUnlock) || [];
    document.getElementById('court-songs-title').textContent = `${courtById(selectedCourt).name} · ${slots.filter(s=>s.unlocked).length}/5 songs`;
    document.getElementById('court-songs-list').innerHTML = slots.map(s=>`<li><strong>${s.unlocked?'Unlocked':'Locked'} · ${s.title}</strong><span>${s.rule}</span></li>`).join('');
    document.getElementById('court-songs-note').textContent = marketingUnlock ? 'Marketing preview: all songs available; no progress earned.' : `Starter track: ${window.VoteSongs?.starter(selectedCourt).title || ''} — available now. Enable sound to listen. Earn five more tracks with winning-match challenges; practice does not count.`;
    if(window.VoteSongs && !window.VoteSongs.persistent()) document.getElementById('court-songs-note').textContent += ' Storage unavailable: unlocks last for this session.';
  }
  function openCourtSelect() {
    courtOpen = true; keys.clear(); pointer = null;
    if (!selectedCourt || !courtUnlocked(selectedCourt)) selectedCourt = FIGHTERS[selectedFighter()].court;
    const panel = document.getElementById('court-select');
    panel.hidden = false;
    document.getElementById('court-progress').textContent = `${careerWins} wins · ${COURTS.filter(c=>courtUnlocked(c.id)).length} / ${COURTS.length} courts unlocked. ` +
      (marketingUnlock ? 'Marketing preview: all courts open; wins do not count. ' : '') + (progressSaved ? 'Progress is saved in this browser. Practice does not count.' : 'Browser storage is unavailable. Progress lasts for this session.');
    document.getElementById('court-grid').innerHTML = COURTS.map(c=>`<button type="button" class="court-card" data-court="${c.id}" aria-pressed="${c.id===selectedCourt}" ${!courtUnlocked(c.id)?'disabled':''}><img loading="lazy" src="${c.thumb}" alt=""><span class="court-copy"><strong>${c.name}</strong><span>${!courtUnlocked(c.id)?`Unlock at ${c.wins} wins · ${c.wins-careerWins} to go`:c.wins===0?'Starter court':marketingUnlock?'Marketing preview':'Unlocked'}</span></span></button>`).join('');
    document.getElementById('court-play').textContent = `Play · ${courtById(selectedCourt).name}`;
    renderCourtSongs();
    document.getElementById('court-play').focus();
  }
  document.getElementById('court-grid').addEventListener('click', ev => {
    const card = ev.target.closest?.('[data-court]');
    if (!card || !courtUnlocked(card.dataset.court)) return;
    selectedCourt = card.dataset.court;
    document.querySelectorAll?.('[data-court]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.court===selectedCourt)));
    document.getElementById('court-play').textContent = `Play · ${courtById(selectedCourt).name}`;
    renderCourtSongs();
  });
  document.getElementById('court-back').addEventListener('click',()=>{
    courtOpen=false; document.getElementById('court-select').hidden=true; chooseAgain();
  });
  document.getElementById('court-play').addEventListener('click',()=>{
    if (!courtUnlocked(selectedCourt)) return;
    const court=courtById(selectedCourt);
    if (court.wins>0) loadImage('selected-court',court.src);
    courtOpen=false; document.getElementById('court-select').hidden=true;
    pendingCourtStart=true;
  });

  let last = performance.now();
  let pointer = null;
  let paused = false;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  const menuMotion = { x: 0, y: 0, targetX: 0, targetY: 0, hover: null, pressUntil: 0, pressKey: "", dt: 0, screen: "title" };
  const buttonMotion = new Map();
  const pausePanel = document.getElementById("pause-panel");
  const controls = document.getElementById("session-controls");
  const status = document.getElementById("game-status");
  function setPaused(value) {
    if (screen !== "play" || !match || match.over) return;
    paused = value; keys.clear(); pointer = null;
    window.VoteMusic?.setCourt?.(screen === "play" && match ? match.court : null, marketingUnlock);
    window.VoteMusic?.setState(!muted, paused);
    pausePanel.hidden = !paused;
    document.getElementById("pause-toggle").textContent = paused ? "Resume · Esc" : "Pause · Esc";
    if (audioCtx) { const operation = paused || muted ? audioCtx.suspend() : audioCtx.resume(); operation?.catch(() => {}); }
    if (paused) document.getElementById("resume").focus();
    else canvas.focus({ preventScroll: true });
  }
  function startPractice() {
    setPaused(false); keys.clear(); pointer = null;
    const id = match?.humanId || selectedFighter();
    match = freshMatch(id); match.practice = true; screen = "play";
    match.call = "Practice: move with arrows / WASD. Choose a shot with 1–4; Space to aim and shoot.";
    canvas.focus({ preventScroll: true });
  }
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
  document.getElementById("pause-restart").addEventListener("click", restartMatch);
  document.getElementById("pause-choose").addEventListener("click", chooseAgain);
  function setMuted(value) {
    muted = value;
    window.VoteMusic?.setCourt?.(screen === "play" && match ? match.court : null, marketingUnlock);
    window.VoteMusic?.setState(!muted, paused);
    const toggle = document.getElementById("sound-toggle");
    toggle.textContent = muted ? "Sound off · Enable" : "Sound on · Mute";
    toggle.setAttribute?.("aria-pressed", String(!muted));
    if (muted) audioCtx?.suspend()?.catch(() => {});
    else if (!paused) unlockAudio();
  }
  document.getElementById("sound-toggle").addEventListener("click", () => setMuted(!muted));
  window.addEventListener("blur", () => setPaused(true));
  document.addEventListener("visibilitychange", () => { if (document.hidden) setPaused(true); });

  function loadImage(key, src) {
    const img = new Image();
    const asset = { src, state: "loading" };
    assetStates.set(key, asset);
    img.onload = () => { asset.state = "ready"; };
    img.onerror = () => { asset.state = "failed"; };
    setTimeout(() => { if (asset.state === "loading") asset.state = "failed"; }, 20000);
    img.src = src.startsWith("assets/") ? `${src}${src.includes("?") ? "&" : "?"}v=talarico-motion-v15` : src;
    images[key] = img;
  }

  loadImage("nyc-future", "assets/nyc-playground.webp");
  loadImage("detroit-future", "assets/detroit-playground.webp");
  loadImage("ball", "assets/sprites/ball-chibi.webp");
  loadImage("hoop", "assets/sprites/hoop.webp");
  loadImage("mamdani-idle", "assets/sprites/chibi/mamdani-idle.webp");
  loadImage("mamdani-move", "assets/sprites/chibi/mamdani-move.webp");
  loadImage("mamdani-shot", "assets/sprites/chibi/mamdani-shot.webp");
  loadImage("mamdani-dunk", "assets/sprites/chibi/mamdani-dunk.webp");
  loadImage("mamdani-spin", "assets/sprites/chibi/mamdani-spin.webp");
  loadImage("mamdani-fade", "assets/sprites/chibi/mamdani-fade.webp");
  loadImage("mamdani-hook", "assets/sprites/chibi/mamdani-hook.webp");
  loadImage("mamdani-dribble", "assets/sprites/chibi/mamdani-dribble.webp");
  loadImage("sayed-idle", "assets/sprites/chibi/sayed-idle.webp");
  loadImage("sayed-shot", "assets/sprites/chibi/sayed-shot.webp");
  loadImage("sayed-dunk", "assets/sprites/chibi/sayed-dunk.webp");
  loadImage("sayed-spin", "assets/sprites/chibi/sayed-spin.webp");
  loadImage("sayed-fade", "assets/sprites/chibi/sayed-fade.webp");
  loadImage("sayed-hook", "assets/sprites/chibi/sayed-hook.webp?v=natural2");
  loadImage("sayed-dribble", "assets/sprites/chibi/sayed-dribble.webp");
  loadImage("sayed-move", "assets/sprites/chibi/sayed-move.webp");
  loadImage("skin-board", "assets/ui/makko/board.webp");
  ["score-left", "score-right", "score-center", "score-mamdani", "score-sayed"].forEach(name => loadImage(`skin-${name}`, `assets/ui/makko/${name}.webp`));
  loadImage("skin-primary", "assets/ui/makko/primary.webp");
  loadImage("skin-secondary", "assets/ui/makko/secondary.webp");
  loadImage("skin-meter", "assets/ui/makko/meter.webp");
  loadImage("skin-title", "assets/ui/makko/title.webp");
  loadImage("skin-select", "assets/ui/makko/select.webp");
  loadImage("skin-portrait-mamdani", "assets/ui/makko/portrait-mamdani.webp");
  loadImage("skin-portrait-sayed", "assets/ui/makko/portrait-sayed.webp");
  loadImage("skin-logo", "assets/ui/makko/logo.webp");
  loadImage("skin-banner", "assets/ui/makko/banner.webp");
  loadImage("skin-needle", "assets/ui/makko/needle.webp");
  loadImage("skin-target", "assets/ui/makko/target.webp");


  const CLIPS = {
  "mamdani": {
    "idle": {
      "frames": 12,
      "fw": 110,
      "fh": 256,
      "cols": 4,
      "body": 255,
      "fill": 0.99609375,
      "feet": [
        0.9921875
      ],
      "originX": 0.5,
      "fps": 6,
      "sourceFacing": 1,
      "sourceFrames": [
        1,
        5,
        9,
        13,
        17,
        25,
        33,
        45,
        57,
        65,
        81,
        89
      ],
      "loopStart": 0,
      "loopEnd": 11,
      "bodyScale": 1.25,
      "characterScale": 0.8
    },
    "dribble": {
      "frames": 12,
      "fw": 166,
      "fh": 256,
      "cols": 4,
      "body": 250,
      "fill": 0.9765625,
      "feet": [
        0.99609375
      ],
      "originX": 0.5,
      "fps": 12,
      "sourceFacing": 1,
      "sourceFrames": [
        45,
        47,
        49,
        51,
        53,
        55,
        33,
        35,
        37,
        39,
        41,
        43
      ],
      "loopStart": 0,
      "loopEnd": 11,
      "bodyScale": 0.9135472370766489,
      "hands": [
        [
          0.9096385542168675,
          0.48828125
        ],
        [
          0.9096385542168675,
          0.46875
        ],
        [
          0.9096385542168675,
          0.48828125
        ],
        [
          0.9337349397590361,
          0.5390625
        ],
        [
          0.9036144578313253,
          0.60546875
        ],
        [
          0.9036144578313253,
          0.64453125
        ],
        [
          0.8373493975903614,
          0.71875
        ],
        [
          0.8373493975903614,
          0.72265625
        ],
        [
          0.8373493975903614,
          0.71484375
        ],
        [
          0.8614457831325302,
          0.6875
        ],
        [
          0.8975903614457831,
          0.625
        ],
        [
          0.9156626506024096,
          0.55078125
        ]
      ],
      "bounceCycle": true,
      "bounceFrames": [
        6
      ],
      "pace": 1.0,
      "ballPath": {
        "hand": [
          0.9096385542168675,
          0.48828125
        ],
        "floorPhase": 0.5,
        "releasePhase": 0.08333333333333333,
        "catchPhase": 0.9166666666666666
      },
      "characterScale": 0.8
    },
    "move": {
      "frames": 12,
      "fw": 151,
      "fh": 256,
      "cols": 4,
      "body": 247,
      "fill": 0.96484375,
      "feet": [
        0.9765625
      ],
      "originX": 0.5033112582781457,
      "fps": 12,
      "sourceFacing": 1,
      "sourceFrames": [
        29,
        31,
        33,
        35,
        37,
        39,
        41,
        43,
        45,
        47,
        49,
        51
      ],
      "loopStart": 0,
      "loopEnd": 11,
      "strideDistance": 0.9,
      "bodyScale": 1.0235496260359813,
      "hands": [
        [
          0.9072847682119205,
          0.52734375
        ],
        [
          0.9072847682119205,
          0.48828125
        ],
        [
          0.9072847682119205,
          0.52734375
        ],
        [
          0.8675496688741722,
          0.60546875
        ],
        [
          0.7152317880794702,
          0.6953125
        ],
        [
          0.6821192052980133,
          0.6796875
        ],
        [
          0.6887417218543046,
          0.66796875
        ],
        [
          0.7152317880794702,
          0.66015625
        ],
        [
          0.7152317880794702,
          0.6640625
        ],
        [
          0.6821192052980133,
          0.68359375
        ],
        [
          0.8609271523178808,
          0.6484375
        ],
        [
          0.9006622516556292,
          0.53125
        ]
      ],
      "bounceCycle": true,
      "bounceFrames": [
        6
      ],
      "pace": 1.0,
      "ballPath": {
        "hand": [
          0.9072847682119205,
          0.52734375
        ],
        "floorPhase": 0.5,
        "releasePhase": 0.08333333333333333,
        "catchPhase": 0.9166666666666666
      },
      "characterScale": 0.8
    },
    "dunk": {
      "frames": 12,
      "fw": 168,
      "fh": 256,
      "cols": 4,
      "body": 189,
      "fill": 0.73828125,
      "feet": [
        0.98828125
      ],
      "originX": 0.5,
      "fps": 18,
      "sourceFacing": 1,
      "sourceFrames": [
        1,
        5,
        9,
        13,
        17,
        25,
        29,
        33,
        37,
        41,
        89,
        96
      ],
      "play": 11,
      "authoredLift": true,
      "emptyHands": true,
      "duration": 1.05,
      "releaseTime": 0.3,
      "releaseFrame": 3,
      "releaseHand": [
        0.23809523809523808,
        0.0390625
      ],
      "handKeys": [
        [
          0,
          0.17261904761904762,
          0.63671875
        ],
        [
          1,
          0.1130952380952381,
          0.515625
        ],
        [
          2,
          0.1488095238095238,
          0.23828125
        ],
        [
          3,
          0.23809523809523808,
          0.0390625
        ]
      ],
      "loopStart": 0,
      "loopEnd": 11,
      "bodyScale": 0.8732251521298174,
      "characterScale": 0.8
    },
    "spin": {
      "frames": 12,
      "fw": 133,
      "fh": 256,
      "cols": 4,
      "body": 253,
      "fill": 0.98828125,
      "feet": [
        0.984375
      ],
      "originX": 0.5037593984962406,
      "fps": 24,
      "sourceFacing": 1,
      "sourceFrames": [
        9,
        17,
        25,
        33,
        41,
        49,
        57,
        65,
        69,
        73,
        77,
        81
      ],
      "play": 11,
      "authoredLift": true,
      "emptyHands": true,
      "duration": 1.45,
      "releaseTime": 0.52,
      "releaseFrame": 11,
      "releaseHand": [
        0.8120300751879699,
        0.6015625
      ],
      "handKeys": [
        [
          0,
          0.8120300751879699,
          0.6015625
        ],
        [
          4,
          0.2706766917293233,
          0.6171875
        ],
        [
          8,
          0.41353383458646614,
          0.63671875
        ],
        [
          11,
          0.8120300751879699,
          0.6015625
        ]
      ],
      "loopStart": 0,
      "loopEnd": 11,
      "bodyScale": 1.0377150860344138,
      "turnOnly": true,
      "characterScale": 0.8
    },
    "fade": {
      "frames": 12,
      "fw": 168,
      "fh": 256,
      "cols": 4,
      "body": 220,
      "fill": 0.859375,
      "feet": [
        0.9921875
      ],
      "originX": 0.5,
      "fps": 18,
      "sourceFacing": 1,
      "sourceFrames": [
        1,
        5,
        9,
        13,
        17,
        25,
        29,
        33,
        61,
        73,
        77,
        85
      ],
      "play": 11,
      "authoredLift": true,
      "emptyHands": true,
      "duration": 1.05,
      "releaseTime": 0.3,
      "releaseFrame": 3,
      "releaseHand": [
        0.75,
        0.01953125
      ],
      "handKeys": [
        [
          0,
          0.6964285714285714,
          0.2578125
        ],
        [
          1,
          0.7261904761904762,
          0.21875
        ],
        [
          2,
          0.7678571428571429,
          0.09375
        ],
        [
          3,
          0.75,
          0.01953125
        ]
      ],
      "loopStart": 0,
      "loopEnd": 11,
      "bodyScale": 1.0784313725490198,
      "characterScale": 0.8
    },
    "hook": {
      "frames": 12,
      "fw": 156,
      "fh": 256,
      "cols": 4,
      "body": 215,
      "fill": 0.83984375,
      "feet": [
        0.99609375
      ],
      "originX": 0.5,
      "fps": 18,
      "sourceFacing": 1,
      "sourceFrames": [
        1,
        5,
        9,
        13,
        25,
        29,
        33,
        57,
        61,
        65,
        73,
        85
      ],
      "play": 11,
      "authoredLift": true,
      "emptyHands": true,
      "duration": 1.05,
      "releaseTime": 0.3,
      "releaseFrame": 3,
      "releaseHand": [
        0.3333333333333333,
        0.03515625
      ],
      "handKeys": [
        [
          0,
          0.3076923076923077,
          0.67578125
        ],
        [
          1,
          0.14743589743589744,
          0.5
        ],
        [
          2,
          0.14102564102564102,
          0.125
        ],
        [
          3,
          0.3333333333333333,
          0.03515625
        ]
      ],
      "loopStart": 0,
      "loopEnd": 11,
      "bodyScale": 0.9602396514161221,
      "characterScale": 0.8
    },
    "shot": {
      "frames": 12,
      "fw": 168,
      "fh": 256,
      "cols": 4,
      "body": 220,
      "fill": 0.859375,
      "feet": [
        0.9921875
      ],
      "originX": 0.5,
      "fps": 18,
      "sourceFacing": 1,
      "sourceFrames": [
        1,
        5,
        9,
        13,
        17,
        25,
        29,
        33,
        61,
        73,
        77,
        85
      ],
      "play": 11,
      "authoredLift": true,
      "emptyHands": true,
      "duration": 1.05,
      "releaseTime": 0.3,
      "releaseFrame": 3,
      "releaseHand": [
        0.75,
        0.01953125
      ],
      "handKeys": [
        [
          0,
          0.6964285714285714,
          0.2578125
        ],
        [
          1,
          0.7261904761904762,
          0.21875
        ],
        [
          2,
          0.7678571428571429,
          0.09375
        ],
        [
          3,
          0.75,
          0.01953125
        ]
      ],
      "loopStart": 0,
      "loopEnd": 11,
      "bodyScale": 1.0784313725490198,
      "characterScale": 0.8
    }
  },
  "sayed": {
    "dribble": {
      "frames": 12,
      "fw": 184,
      "fh": 256,
      "cols": 4,
      "body": 251,
      "fill": 0.98046875,
      "feet": [
        0.99609375
      ],
      "originX": 0.5,
      "fps": 16,
      "sourceFacing": 1,
      "sourceFrames": [
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44
      ],
      "loopStart": 0,
      "loopEnd": 11,
      "bodyScale": 1.03,
      "hands": [
        [
          0.8695652173913043,
          0.4375
        ],
        [
          0.8695652173913043,
          0.40234375
        ],
        [
          0.8695652173913043,
          0.40234375
        ],
        [
          0.8695652173913043,
          0.43359375
        ],
        [
          0.8695652173913043,
          0.4921875
        ],
        [
          0.8641304347826086,
          0.54296875
        ],
        [
          0.8641304347826086,
          0.578125
        ],
        [
          0.875,
          0.60546875
        ],
        [
          0.8586956521739131,
          0.58984375
        ],
        [
          0.8586956521739131,
          0.55859375
        ],
        [
          0.8641304347826086,
          0.48046875
        ],
        [
          0.8695652173913043,
          0.4296875
        ]
      ],
      "bounceCycle": true,
      "bounceFrames": [
        6
      ],
      "pace": 1.3333333333333333,
      "ballPath": {
        "hand": [
          0.8695652173913043,
          0.4375
        ],
        "floorPhase": 0.5,
        "releasePhase": 0.08333333333333333,
        "catchPhase": 0.9166666666666666
      }
    },
    "move": {
      "frames": 10,
      "fw": 159,
      "fh": 256,
      "cols": 4,
      "body": 233,
      "fill": 0.91015625,
      "feet": [
        0.91015625
      ],
      "originX": 0.5031446540880503,
      "fps": 12,
      "sourceFacing": 1,
      "sourceFrames": [
        1,
        3,
        5,
        7,
        9,
        11,
        13,
        15,
        17,
        19
      ],
      "loopStart": 0,
      "loopEnd": 9,
      "strideDistance": 0.9,
      "hands": [
        [
          0.8679245283018868,
          0.55859375
        ],
        [
          0.9119496855345912,
          0.58203125
        ],
        [
          0.8616352201257862,
          0.63671875
        ],
        [
          0.6981132075471698,
          0.66796875
        ],
        [
          0.6729559748427673,
          0.67578125
        ],
        [
          0.6729559748427673,
          0.68359375
        ],
        [
          0.6729559748427673,
          0.6953125
        ],
        [
          0.6981132075471698,
          0.70703125
        ],
        [
          0.7484276729559748,
          0.65625
        ],
        [
          0.8553459119496856,
          0.5625
        ]
      ],
      "bounceCycle": true,
      "bounceFrames": [
        5
      ],
      "pace": 1.2,
      "ballPath": {
        "hand": [
          0.8679245283018868,
          0.55859375
        ],
        "floorPhase": 0.5,
        "releasePhase": 0.1,
        "catchPhase": 0.9
      }
    },
    "idle": {
      "frames": 12,
      "fw": 115,
      "fh": 256,
      "cols": 4,
      "body": 256,
      "fill": 1.0,
      "feet": [
        0.99609375
      ],
      "originX": 0.5043478260869565,
      "fps": 6,
      "sourceFacing": 1,
      "sourceFrames": [
        1,
        5,
        9,
        13,
        17,
        25,
        33,
        45,
        57,
        65,
        81,
        89
      ],
      "loopStart": 0,
      "loopEnd": 11
    },
    "spin": {
      "frames": 12,
      "fw": 131,
      "fh": 256,
      "cols": 4,
      "body": 249,
      "fill": 0.97265625,
      "feet": [
        0.98828125
      ],
      "originX": 0.5038167938931297,
      "fps": 24,
      "sourceFacing": 1,
      "sourceFrames": [
        1,
        9,
        17,
        25,
        33,
        41,
        49,
        57,
        65,
        73,
        85,
        93
      ],
      "play": 11,
      "authoredLift": true,
      "emptyHands": true,
      "duration": 1.45,
      "releaseTime": 0.52,
      "releaseFrame": 11,
      "releaseHand": [
        0.8015267175572519,
        0.57421875
      ],
      "handKeys": [
        [
          0,
          0.8015267175572519,
          0.57421875
        ],
        [
          4,
          0.2900763358778626,
          0.59765625
        ],
        [
          8,
          0.44274809160305345,
          0.609375
        ],
        [
          11,
          0.8015267175572519,
          0.57421875
        ]
      ],
      "loopStart": 0,
      "loopEnd": 11,
      "turnOnly": true
    },
    "fade": {
      "frames": 12,
      "fw": 171,
      "fh": 256,
      "cols": 4,
      "body": 213,
      "fill": 0.83203125,
      "feet": [
        0.9921875
      ],
      "originX": 0.5029239766081871,
      "fps": 18,
      "sourceFacing": 1,
      "sourceFrames": [
        1,
        5,
        9,
        13,
        17,
        21,
        25,
        33,
        49,
        53,
        61,
        65
      ],
      "play": 11,
      "authoredLift": true,
      "emptyHands": true,
      "duration": 1.05,
      "releaseTime": 0.3,
      "releaseFrame": 4,
      "releaseHand": [
        0.6783625730994152,
        0.015625
      ],
      "handKeys": [
        [
          0,
          0.6842105263157895,
          0.28125
        ],
        [
          1,
          0.7192982456140351,
          0.37109375
        ],
        [
          2,
          0.7719298245614035,
          0.265625
        ],
        [
          3,
          0.7192982456140351,
          0.06640625
        ],
        [
          4,
          0.6783625730994152,
          0.015625
        ]
      ],
      "loopStart": 0,
      "loopEnd": 11
    },
    "hook": {
      "frames": 12,
      "fw": 186,
      "fh": 256,
      "cols": 4,
      "body": 216,
      "fill": 0.84375,
      "feet": [
        0.98828125
      ],
      "originX": 0.5,
      "fps": 14,
      "sourceFacing": 1,
      "sourceFrames": [
        1,
        7,
        13,
        19,
        25,
        49,
        55,
        61,
        67,
        73,
        79,
        91
      ],
      "play": 11,
      "authoredLift": true,
      "emptyHands": true,
      "duration": 1.05,
      "releaseTime": 0.3,
      "releaseFrame": 2,
      "releaseHand": [
        0.25806451612903225,
        0.06640625
      ],
      "handKeys": [
        [
          0,
          0.3709677419354839,
          0.62109375
        ],
        [
          1,
          0.23655913978494625,
          0.265625
        ],
        [
          2,
          0.25806451612903225,
          0.06640625
        ]
      ],
      "loopStart": 0,
      "loopEnd": 11
    },
    "shot": {
      "frames": 12,
      "fw": 171,
      "fh": 256,
      "cols": 4,
      "body": 213,
      "fill": 0.83203125,
      "feet": [
        0.9921875
      ],
      "originX": 0.5029239766081871,
      "fps": 18,
      "sourceFacing": 1,
      "sourceFrames": [
        1,
        5,
        9,
        13,
        17,
        21,
        25,
        33,
        49,
        53,
        61,
        65
      ],
      "play": 11,
      "authoredLift": true,
      "emptyHands": true,
      "duration": 1.05,
      "releaseTime": 0.3,
      "releaseFrame": 4,
      "releaseHand": [
        0.6783625730994152,
        0.015625
      ],
      "handKeys": [
        [
          0,
          0.6842105263157895,
          0.28125
        ],
        [
          1,
          0.7192982456140351,
          0.37109375
        ],
        [
          2,
          0.7719298245614035,
          0.265625
        ],
        [
          3,
          0.7192982456140351,
          0.06640625
        ],
        [
          4,
          0.6783625730994152,
          0.015625
        ]
      ],
      "loopStart": 0,
      "loopEnd": 11
    },
    "dunk": {
      "frames": 12,
      "fw": 140,
      "fh": 256,
      "cols": 4,
      "body": 170,
      "fill": 0.6640625,
      "feet": [
        0.99609375
      ],
      "originX": 0.5,
      "fps": 18,
      "sourceFacing": 1,
      "sourceFrames": [
        1,
        5,
        11,
        13,
        17,
        21,
        25,
        29,
        53,
        57,
        61,
        69
      ],
      "play": 11,
      "authoredLift": true,
      "emptyHands": true,
      "duration": 1.05,
      "releaseTime": 0.3,
      "releaseFrame": 3,
      "releaseHand": [
        0.19285714285714287,
        0.0
      ],
      "handKeys": [
        [
          0,
          0.18571428571428572,
          0.671875
        ],
        [
          1,
          0.19285714285714287,
          0.66015625
        ],
        [
          2,
          0.1,
          0.2578125
        ],
        [
          3,
          0.19285714285714287,
          0.0
        ]
      ],
      "loopStart": 0,
      "loopEnd": 11
    }
  }
};
  // Match visible anatomy across the cast; pose height still follows bodyScale.
  // Share the character transform with ball anchors and shot release positions.
  for (const clip of Object.values(CLIPS.mamdani)) clip.characterScale = 0.9;
  for (const clip of Object.values(CLIPS.sayed)) clip.characterScale = 0.8;


  // Makko sprite metadata is kept separate so animation exports remain editable.
  for (const [id, clips] of Object.entries(window.VoteExtraClips || {})) {
    CLIPS[id] ||= {};
    for (const [key, clip] of Object.entries(clips)) {
      CLIPS[id][key] = clip;
      loadImage(`${id}-${key}`, clip.image || `assets/sprites/chibi/${id}-${key}.webp`);
    }
  }

  let crowdGain = null;

  function tone(freq, dur, type, gain) {
    if (!audioCtx || muted || paused) return;
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
    if (!audioCtx || muted || paused) return;
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

  }

  function roar() {
    if (!audioCtx || !crowdGain || muted || paused) return;
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

  function dribbleThump() { /* Dribble audio intentionally disabled. */ }

  function unlockAudio() {
    if (muted || paused) return;
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
    return 152 * at.s;
  }

  function drawnSprite(clip, at, frame) {
    const span = playerHeight(at);
    // Action sheets share a fixed body reference. Raised hands must add height,
    // not shrink the torso from one frame to the next.
    // Cross-clip anatomy calibration: a crouch is shorter, not a larger person.
    // Keep this transform shared by the sprite, ball, release hand and dunk reach.
    const height = (clip.fills ? span * clip.fh / clip.body : span / (clip.fill || 1)) * (clip.bodyScale || 1) * (clip.characterScale || 1);
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
    frame = clip.frameOrder?.[frame] ?? frame;
    return {
      x: (frame % cols) * (clip.fw + padding * 2) + padding,
      y: Math.floor(frame / cols) * (clip.fh + padding * 2) + padding + layout.sy,
    };
  }

  function hoopLayout() {
    const nyc = !match || match.court === "nyc";
    // Match the rim painted into each original Makko court background.
    const coords = courtById(match?.court || "nyc").rim;
    const rim = {x:coords[0], y:coords[1]};
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
    const p = match.pos[match.active];
    return zoneFor(p.x, p.y, match.flair);
  }

  function canDunk(x, y) {
    return distToHoop(x, y) < 0.16;
  }

  function remainingPlayers() { return match.players.filter(id => !match.eliminated.includes(id)); }
  function isHuman(id) { return !!match && (match.practice ? id === match.humanId : match.localPlayers.includes(id)); }
  function nextPlayer(id) {
    const order=match.players,start=order.indexOf(id);
    for(let n=1;n<=order.length;n++){const candidate=order[(start+n)%order.length];if(!match.eliminated.includes(candidate))return candidate;}
    return id;
  }
  function otherId(id) { return match?.players ? nextPlayer(id) : ROSTER.find(other=>other!==id); }
  function sideline(id) { const i=(match?.players||ROSTER).indexOf(id);return {x:.13+Math.max(0,i)*.36,y:.66}; }

  function stageNextTurn(shooter) {
    match.transit ||= {};
    match.transit[shooter] = sideline(shooter);
    const incoming = match.active;
    if (incoming !== shooter) {
      const p = match.pos[incoming];
      if (match.phase === "set") match.transit[incoming] = {x:.32,y:.28};
    }
  }

  function updateTransit(dt) {
    for (const [id, target] of Object.entries(match.transit || {})) {
      const p = match.pos[id], dx = target.x - p.x, dy = target.y - p.y;
      const distance = Math.hypot(dx, dy), step = .62 * dt;
      if (distance <= step) {
        Object.assign(p, target);
        match.pose[id] = "idle";
        match.face[id] = p.x < .5 ? 1 : -1;
        if (match.reactions[id]) { match.reactions[id].start = match.t; match.reactions[id].life = 4.1; }
        delete match.transit[id];
      } else {
        p.x += dx / distance * step; p.y += dy / distance * step;
        match.face[id] = dx < 0 ? -1 : 1;
        match.pose[id] = "move";
      }
    }
  }

  function freshMatch(humanId) {
    const cpuId = ROSTER.filter(id => id !== humanId)[opponentIndex % 2];
    const players=[humanId,...ROSTER.filter(id=>id!==humanId)];
    const spectatorId=null;
    const home = FIGHTERS[humanId];
    return {
      humanId,
      cpuId,
      spectatorId,
      players,
      localPlayers: playMode === "local" ? [...players] : [humanId],
      eliminated: [],
      round: null,
      mode: playMode,
      reactions: {},
      court: selectedCourt || home.court,
      songShots: {},
      marketingSession: marketingUnlock,
      letters: Object.fromEntries(ROSTER.map(id => [id, 0])),
      pos: Object.fromEntries(players.map((id,i)=>[id,id===humanId?{x:.32,y:.28}:{x:.13+i*.36,y:.66}])),
      transit: {},
      face: Object.fromEntries(ROSTER.map(id => [id, id === humanId ? 1 : -1])),
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
      pose: Object.fromEntries(ROSTER.map(id => [id, "idle"])),
      jump: Object.fromEntries(ROSTER.map(id => [id, 0])),
      jumpDur: Object.fromEntries(ROSTER.map(id => [id, 0])),
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
      pop: Object.fromEntries(ROSTER.map(id => [id, 0])),
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
    for (const id of ROSTER) {
      const key = match.pose[id] === "move" ? "move" : "dribble";
      const clock = match.dribbleClock[id];
      if (!clock || clock.key !== key) match.dribbleClock[id] = { key, time: 0 };
      else if (match.transit?.[id] || (match.owner === id && !match.hold && !match.ball)) {
        const clip = CLIPS[id][key];
        if (key === "move" && clip?.strideDistance && clock.pos) {
          const at = project(match.pos[id].x, match.pos[id].y);
          const before = project(clock.pos.x, clock.pos.y);
          const distance = Math.hypot(at.x - before.x, at.y - before.y);
          // Perspective compresses up/down travel. Do not let a real stride
          // become a four-frame-per-second slideshow at the back of the court.
          if (distance > .00001) clock.time += Math.max(
            distance / (playerHeight(at) * clip.strideDistance) * clip.frames / clip.fps,
            dt * .75);
        } else if (key !== "move" || !clip?.strideDistance) clock.time += dt;
      }
      match.dribbleClock[id].pos = { ...match.pos[id] };
    }
  }

  function dribbleFrameClock(clip, id = match.owner) {
    const value = (match.dribbleClock?.[id]?.time || 0) * (clip.fps || 8);
    const nearest = Math.round(value);
    return Math.abs(value - nearest) < 1e-9 ? nearest : value;
  }

  function dribbleIndex(clip, id = match.owner) {
    const start = clip.loopStart || 0;
    const length = (clip.loopEnd == null ? clip.frames : clip.loopEnd + 1) - start;
    return start + Math.floor(dribbleFrameClock(clip, id)) % length;
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
      const phase = ((match.dribbleClock?.[match.owner]?.time || 0) * clip.pace) % 1;
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
      const handA = clip.hands[Math.min(frame, clip.hands.length - 1)];
      const handB = clip.hands[(frame + 1) % clip.hands.length];
      const fraction = dribbleFrameClock(clip, id) % 1;
      const hand = clip.ballPath?.hand || handA.map((v, i) => v + (handB[i] - v) * fraction);
      let x = at.x + face * (clip.sourceFacing || 1) * (hand[0] - (clip.originX ?? .5)) * width;
      let y = at.y - lift + (-height * layout.footInSlice) + ((hand[1] * clip.fh - layout.sy) / layout.sh) * height;
      if (clip.ballPath?.releasePhase) {
        const cycleFrames = clip.ballPath.cycleFrames || clip.frames;
        const clock = dribbleFrameClock(clip, id);
        const cycleStart = Math.floor(clock / cycleFrames) * cycleFrames;
        const u = (clock % cycleFrames) / cycleFrames;
        const release = clip.ballPath.releasePhase, floorPhase = clip.ballPath.floorPhase;
        const catchPhase = clip.ballPath.catchPhase ?? 1;
        const palm = phase => {
          const f = cycleStart + phase * cycleFrames, a = Math.floor(f) % clip.frames, blend = f % 1;
          const h = clip.hands[a].map((v, i) => v + (clip.hands[(a + 1) % clip.frames][i] - v) * blend);
          // Palm samples and foot anchors must use the same authored frame.
          // Using the currently displayed foot for a future catch moves the
          // flight endpoint and produces a jump when the animation loops.
          const footA = clip.feet?.[a] ?? 1;
          const footB = clip.feet?.[(a + 1) % clip.frames] ?? 1;
          const foot = footA + (footB - footA) * blend;
          const footInSlice = (foot * clip.fh - layout.sy) / layout.sh;
          return {
            x: at.x + face * (clip.sourceFacing || 1) * (h[0] - (clip.originX ?? .5)) * width,
            y: Math.min(at.y - r, at.y - lift - height * footInSlice + ((h[1] * clip.fh - layout.sy) / layout.sh) * height + r)
          };
        };
        // Receive and push for one authored frame. The ball's top touches the
        // palm; once released, arm sweeps cannot steer the free-flight ball.
        if (u <= release || u >= catchPhase) ({x, y} = palm(u));
        else {
          const start = palm(release), end = palm(catchPhase), floor = at.y - r;
          const flight = (u - release) / (catchPhase - release);
          const lateral = flight * flight * (3 - 2 * flight);
          x = start.x + (end.x - start.x) * lateral;
          if (Number.isFinite(clip.ballPath.floorX)) {
            const floorX = at.x + face * (clip.sourceFacing || 1) * (clip.ballPath.floorX - (clip.originX ?? .5)) * width;
            const phase = u < floorPhase ? (u - release) / (floorPhase - release) : (u - floorPhase) / (catchPhase - floorPhase);
            const ease = phase * phase * (3 - 2 * phase);
            x = u < floorPhase ? start.x + (floorX - start.x) * ease : floorX + (end.x - floorX) * ease;
          }
          y = u < floorPhase
            ? start.y + (floor - start.y) * Math.pow((u - release) / (floorPhase - release), 2)
            : end.y + (floor - end.y) * Math.pow((catchPhase - u) / (catchPhase - floorPhase), 2);
        }
      } else if (clip.bounceCycle) {
        const u = ((match.dribbleClock?.[id]?.time || 0) * clip.fps % clip.frames) / clip.frames;
        // Push, floor contact, return: one bounce per authored hand cycle.
        const low = clip.ballPath?.floorPhase ?? .5;
        const travel = u < low ? u / low : (1 - u) / (1 - low);
        const top = Math.min(at.y - r, y + r * 0.65);
        y = top + (at.y - r - top) * Math.pow(Math.max(0, travel), 2);
      } else if (clip.pace) {
        const u = ((match.dribbleClock?.[id]?.time || 0) * clip.pace) % 1;
        const travel = u < 0.5 ? u * 2 : (1 - u) * 2;
        const floor = at.y - r;
        const top = Math.min(floor, y + r * 0.65);
        y = top + (floor - top) * travel * travel;
      } else {
        const u = (match.t * (clip.fps || 8)) % 1;
        if (clip.bounce) y += Math.sin(u * Math.PI) * height * (clip.hop || 0.12);
        else if (frame === clip.yFree) y += Math.sin(u * Math.PI) * height * (clip.hop || 0.08);
      }
      const blend = match.ballBlend;
      if (blend?.id === id && blend.t < .10) {
        const u = clamp(blend.t / .10, 0, 1), mix = u * u * (3 - 2 * u);
        return { x: blend.x + (x - blend.x) * mix, y: Math.min(at.y - r, blend.y + (y - blend.y) * mix), r, spin: match.t * 7 };
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

  function shootingLift(ball, t) {
    return shotLift(ball.turnUntil ? clamp((t - ball.turnUntil) / (1 - ball.turnUntil), 0, 1) : t);
  }

  function bodyMotion(id) {
    if (match?.ball?.id === id && match.ball.syncRelease && match.ball.phase === "arc") {
      const offset = shotDisplacement(id, match.ball.t, match.ball.flair, match.ball.show);
      if (offset.lift || offset.x) {
        const at = project(match.pos[id].x, match.pos[id].y);
        return { lift: offset.lift / at.s, shift: offset.x / at.s, squash: 1 };
      }
      if (CLIPS[id][match.ball.flair === "none" || (match.ball.turnUntil && match.ball.t >= match.ball.turnUntil) ? "shot" : match.ball.flair].authoredLift) return { lift: 0, squash: 1 };
      const t = match.ball.t;
      const landing = t > 0.72 && t < 0.98 ? Math.sin((t - 0.72) / 0.26 * Math.PI) : 0;
      return { lift: shootingLift(match.ball, t), squash: 1 - landing * 0.08 };
    }
    return { lift: 0, squash: 1 };
  }

  function shotDisplacement(id, t, flair, show) {
    const at = project(match.pos[id].x, match.pos[id].y);
    if (flair === "fade") return { x: -(match.face[id] || 1) * at.s * 28 * Math.sin(Math.PI * clamp(t, 0, 1)), lift: 0 };
    if (flair !== "dunk") return { x: 0, lift: 0 };
    const clip = CLIPS[id].dunk, drawn = drawnSprite(clip, at, clip.releaseFrame), hoop = hoopLayout();
    const handX = at.x + (match.face[id] || 1) * (clip.releaseHand[0] - clip.originX) * drawn.width;
    const handY = at.y + (clip.releaseHand[1] - clip.feet[clip.alignReleaseFoot ? clip.releaseFrame : 0]) * drawn.height;
    const amount = t <= show ? Math.sin(clamp(t / show, 0, 1) * Math.PI / 2)
      : Math.cos(clamp((t - show) / (.85 - show), 0, 1) * Math.PI / 2);
    return { x: (hoop.x - handX) * amount, lift: Math.max(0, handY - (hoop.rim - 9)) * amount };
  }

  function say(text) {
    match.call = text;
    match.notice = { text, until: match.t + 4.5 };
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
    // A release error, not a chosen outcome. Both players use zoneFor to score.
    const spread = (id === "sayed" ? .13 : .15) + distToHoop(spot.x, spot.y) * .045;
    const error = (Math.random() + Math.random() + Math.random() - 1.5) * spread;
    match.cpu = {
      id,
      spot,
      flair,
      aim: clamp(need + error, 0.08, 0.98),
      error,
      reaction: 0,
      settle: .18,
      stage: "walk",
    };
    match.flair = "none";
    match.hold = false;
  }

  function pickCpuSpot() {
    const dunk = Math.random() < (match.active === "sayed" ? .30 : .16);
    if (dunk) return { x: HOOP.x + (Math.random() - 0.5) * 0.08, y: HOOP.y - 0.12 };
    return {
      x: 0.18 + Math.random() * 0.64,
      y: 0.12 + Math.random() * 0.42,
    };
  }

  function pickCpuFlair(spot) {
    if (canDunk(spot.x, spot.y) && Math.random() < 0.7) return "dunk";
    const bag = match.active === "sayed"
      ? ["none", "none", "spin", "spin", "hook"]
      : ["none", "none", "fade", "fade", "hook"];
    return bag[Math.floor(Math.random() * bag.length)];
  }

  function release(id) {
    const p = match.pos[id];
    match.face[id] = Math.sign(HOOP.x - p.x) || match.face[id] || 1;
    let flair = isHuman(id) ? match.flair : match.cpu.flair;
    if (flair === "dunk" && !canDunk(p.x, p.y)) {
      flair = "none";
      if (isHuman(id)) say("Too far to dunk. That one stays a jumper.");
    }
    const zone = zoneFor(p.x, p.y, flair);
    const error = match.power - zone.need;
    const made = zone.hit;
    const grade = Math.abs(error) <= zone.span * .24 ? "PERFECT" : made ? "GOOD RELEASE" : error < 0 ? "TOO SOFT — MORE POWER" : "TOO STRONG — LESS POWER";
    const hand = ownedBall(id);
    const hoop = hoopLayout();
    const side = Math.sign(hand.x - hoop.x) || 1;
    match.ball = {
      x0: hand.x,
      y0: hand.y,
      releaseRadius: hand.r,
      grade,
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
    const actionClip = CLIPS[id][flair === "none" ? "shot" : flair];
    const shotClip = actionClip.turnOnly ? CLIPS[id].shot : actionClip;
    if (shotClip.duration) {
      match.ball.dur = shotClip.duration;
      match.ball.show = shotClip.releaseTime;
    }
    if (actionClip.turnOnly) {
      match.ball.turnUntil = actionClip.turnTime ?? .30;
      match.ball.dur = actionClip.duration;
      match.ball.show = actionClip.releaseTime;
    }
    if (shotClip.releaseFrame != null) {
      const at = project(p.x, p.y), drawn = drawnSprite(shotClip, at, shotClip.releaseFrame);
      match.ball.syncRelease = true;
      if (id === "talarico") match.ball.releaseRadius = Math.max(8, playerHeight(at) * .09);
      match.ball.x0 = at.x + (match.face[id] || 1) * (shotClip.sourceFacing || 1) * (shotClip.releaseHand[0] - (shotClip.originX ?? .5)) * drawn.width;
      match.ball.y0 = at.y - drawn.height * ((shotClip.feet?.[shotClip.releaseFrame] || 1) - shotClip.releaseHand[1]) - (shotClip.authoredLift ? 0 : shootingLift(match.ball, match.ball.show)) * at.s;
      const offset = shotDisplacement(id, match.ball.show, flair, match.ball.show);
      match.ball.x0 += offset.x; match.ball.y0 -= offset.lift;
      if (flair === "dunk") match.ball.arc = 8;
    }
    if (isHuman(id)) {
      match.releaseFeedback = { text: grade, life: .9, perfect: grade === "PERFECT", made };
      if (grade === "PERFECT") tone(1046, .09, "triangle", .05);
    }
    if (match.practice) say(grade === "PERFECT" ? "Perfect release." : `${FIGHTERS[id].name} takes the ${FLAIR_NAME[flair]}.`);
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
    match.letters[id]+=1;match.pop[id]=1;tone(220,.18,"sawtooth",.05);
    if(match.letters[id]>=LETTERS.length && !match.eliminated.includes(id)) {
      match.eliminated.push(id);const left=remainingPlayers();
      if(left.length===1){match.over=left[0];recordCourtWin();say(`${FIGHTERS[id].name} spells VOTE. ${FIGHTERS[match.over].full} takes the court.${match.unlockMessage?" "+match.unlockMessage:""}`);punch("WINNER",true);}
    }
    return LETTERS.slice(0,match.letters[id]).join("");
  }
  function reactToShot(shooter,made,flair) {
    for(const id of ROSTER){const state=id===shooter?(made?"celebrate":"shocked"):(made?(flair==="dunk"?"shocked":"celebrate"):"mock");match.reactions[id]={state,start:match.t,life:4.1};}
  }

  function resolveBall() {
    const ball = match.ball;
    const id = ball.id;
    const name = FIGHTERS[id].name;
    const signature = id === "sayed"
      ? { none: "DOCTOR'S ORDERS", spin: "SPIN DOCTOR", dunk: "HOUSE CALL", fade: "SMOOTH OPERATOR", hook: "THE REMEDY" }
      : { none: "SWISH", spin: "SPIN CYCLE", dunk: "HE GOT UP", fade: "FADEAWAY", hook: "SKY HOOK" };
    const from = { x: ball.x1, y: ball.y1 };
    match.ball = null;
    match.pose[id] = "idle";
    match.basket = { life: 1.4, made: ball.made, dunk: ball.flair === "dunk" };
    const validCopy = match.phase !== 'copy' || (match.challenge && Math.hypot(ball.sx-match.challenge.x,ball.sy-match.challenge.y)<.11 && ball.flair===match.challenge.flair);
    reactToShot(id, ball.made && validCopy, ball.flair);
    if(id===match.humanId && ball.made && validCopy && !match.practice){
      match.songShots ||= {};match.songShots[ball.flair]=(match.songShots[ball.flair]||0)+1;
    }
    if (match.practice) {
      if (match.tutorial) match.tutorial.shot = true;
      match.active = match.humanId; match.phase = "set"; match.challenge = null;
      match.flair = "none"; match.power = 0; match.lock = 0.35;
      say(ball.made ? "Buckets. Pick a new spot and run it back." : "No good. Hit the gold zone and run it back.");
      punch(ball.made ? signature[ball.flair] || "SWISH" : "TRY AGAIN", ball.made);
      beginCatch(from);
      return;
    }
    if(match.phase === "set") {
      if(ball.made){
        match.challenge={x:ball.sx,y:ball.sy,flair:ball.flair};const pending=[];
        for(let next=nextPlayer(id);next!==id;next=nextPlayer(next))pending.push(next);
        match.round={setter:id,pending,missed:false};match.phase="copy";match.active=pending.shift();
        say(`${name} sinks the ${FLAIR_NAME[ball.flair]}. Everyone must copy it. ${FIGHTERS[match.active].name} is up.`);punch(signature[ball.flair]||"SWISH",true);
      } else {match.active=nextPlayer(id);match.challenge=null;match.round=null;say(`No good. ${FIGHTERS[match.active].name} sets the next shot.`);punch("NO GOOD!");}
    } else {
      const round=match.round,matched=ball.made&&validCopy;let result="Matched it.";
      if(!matched){round.missed=true;const why=Math.hypot(ball.sx-match.challenge.x,ball.sy-match.challenge.y)>=.11?"Wrong spot.":ball.flair!==match.challenge.flair?"Wrong shot.":"No good.";
        const word=addLetter(id);result=match.eliminated.includes(id)?`${name} spells VOTE and is out.`:`${why} ${name} picks up ${word}.`;punch(word);
      } else punch("MATCHED IT",true);
      if(!match.over){
        round.pending=round.pending.filter(player=>!match.eliminated.includes(player));
        if(round.pending.length){match.active=round.pending.shift();say(`${result} ${FIGHTERS[match.active].name} must copy the same shot.`);}
        else {match.active=round.missed&&!match.eliminated.includes(round.setter)?round.setter:nextPlayer(round.setter);match.phase="set";match.challenge=null;match.round=null;say(`${result} ${FIGHTERS[match.active].name} sets the next shot.`);}
      }
    }
    match.flair="none";match.power=0;match.hold=false;match.cpu=null;match.lock=.65;pointer=null;keys.clear();
    if(!match.over)stageNextTurn(id);
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
    window.VoteMusic?.setCourt?.(screen === "play" && match ? match.court : null, marketingUnlock);
    if (!match || screen !== "play") return;
    const owner = match.owner, previousKey = match.dribbleClock?.[owner]?.key;
    const previousBall = owner && !match.hold && !match.ball && !match.pass ? ownedBall(owner) : null;
    if (match.ballBlend) match.ballBlend.t += dt;
    updateWorld(dt);
    // Read the new position and pose together; never render a new gait with the previous clock.
    tickDribbleClock(dt);
    if (previousBall && owner === match.owner && !match.hold && !match.ball && previousKey && previousKey !== match.dribbleClock[owner].key) {
      match.ballBlend = { id: owner, x: previousBall.x, y: previousBall.y, t: 0 };
    }
    tickDribble();
    if (match.tutorial) {
      const p = match.pos[match.humanId], t = match.tutorial;
      if (Math.hypot(p.x - t.x, p.y - t.y) > .035) t.moved = true;
    }
  }

  function updateWorld(dt) {
    if (!match || screen !== "play") return;
    match.t += dt;
    updateTransit(dt);
    if (match.releaseFeedback) match.releaseFeedback.life = Math.max(0, match.releaseFeedback.life - dt);
    if (match.shake > 0) match.shake = Math.max(0, match.shake - dt * 1.4);
    if (match.zoom > 0) match.zoom = Math.max(0, match.zoom - dt * 0.42);
    if (match.flash > 0) match.flash = Math.max(0, match.flash - dt * 1.8);
    if (match.roar > 0) match.roar = Math.max(0, match.roar - dt * 0.55);
    if (match.basket) {
      match.basket.life -= dt;
      if (match.basket.life <= 0) match.basket = null;
    }
    for (const id of ROSTER) match.pop[id] = Math.max(0, match.pop[id] - dt * 1.4);
    for (const [id, reaction] of Object.entries(match.reactions)) {
      if (!match.transit?.[id]) reaction.life -= dt;
      if (reaction.life <= 0) delete match.reactions[id];
    }
    if (match.banner) {
      match.banner.life -= dt;
      if (match.banner.life <= 0) match.banner = null;
    }
    for (const id of ROSTER) {
      if (match.jump[id] > 0) {
        match.jump[id] += dt;
        if (match.jump[id] >= (match.jumpDur[id] || 0)) {
          match.jump[id] = 0;
          match.jumpDur[id] = 0;
        }
      }
    }
    if (match.hoopKick > 0) match.hoopKick = Math.max(0, match.hoopKick - dt * 1.15);
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
    if (match.transit?.[match.active]) { match.lock = Math.max(match.lock, .05); return; }
    if (match.lock > 0) {
      match.lock -= dt;
      return;
    }
    if (!isHuman(match.active)) updateCpu(dt);
    else updateHuman(dt);
  }

  function updateHuman(dt) {
    const id = match.active;
    const p = match.pos[id];
    let vx = 0;
    let vy = 0;
    // The most recently pressed direction wins while opposing keys overlap.
    for (const key of keys) {
      if (key === "arrowleft" || key === "a") vx = -1;
      if (key === "arrowright" || key === "d") vx = 1;
      if (key === "arrowup" || key === "w") vy = 1;
      if (key === "arrowdown" || key === "s") vy = -1;
    }
    // Direct steering takes ownership from an earlier click-to-move target.
    if ((vx || vy) && pointer?.move) pointer.move = null;
    if (pointer && pointer.move) {
      const dx = pointer.move.x - p.x;
      const dy = pointer.move.y - p.y;
      if (Math.hypot(dx, dy) > 0.02) {
        vx = dx;
        vy = dy;
      } else pointer.move = null;
    }
    if ((p.x <= .08 && vx < 0) || (p.x >= .92 && vx > 0)) vx = 0;
    if ((p.y <= .08 && vy < 0) || (p.y >= .94 && vy > 0)) vy = 0;
    const mag = Math.hypot(vx, vy) || 1;
    if (match.hold) { vx = 0; vy = 0; }
    if (vx || vy) {
      let dx = (vx / mag) * dt * .34, dy = (vy / mag) * dt * .28;
      if (pointer?.move) {
        dx = Math.sign(dx) * Math.min(Math.abs(dx), Math.abs(pointer.move.x - p.x));
        dy = Math.sign(dy) * Math.min(Math.abs(dy), Math.abs(pointer.move.y - p.y));
      }
      p.x = clamp(p.x + dx, 0.08, 0.92);
      p.y = clamp(p.y + dy, 0.08, 0.94);
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
        match.power = 2 - match.power;
        match.powerDir = -1;
      } else if (match.power <= 0) {
        match.power = -match.power;
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
        const travel = Math.min(1, dt * .38 / Math.hypot(dx, dy));
        p.x = clamp(p.x + dx * travel, 0.08, 0.92);
        p.y = clamp(p.y + dy * travel, 0.08, 0.94);
        aimFace(cpu.id, dx, dy);
        match.pose[cpu.id] = "move";
      } else {
        p.x = cpu.spot.x;
        p.y = cpu.spot.y;
        cpu.stage = "settle";
        match.hold = false;
        match.power = 0;
        match.powerDir = 1;
        match.flair = "none";
        match.pose[cpu.id] = "idle";
      }
      return;
    }
    if (cpu.stage === "settle") {
      cpu.settle -= dt;
      if (cpu.settle > 0) return;
      cpu.stage = "aim";
    }
    match.hold = true;
    match.face[cpu.id] = Math.sign(HOOP.x - p.x) || match.face[cpu.id] || 1;
    match.power += dt * 0.72;
    if (match.power > 1) match.power = 1;
    match.pose[cpu.id] = cpu.flair === "none" ? "shot" : cpu.flair;
    // Observe the moving target at human-scale intervals, rather than waiting
    // for zone.hit. Tricks can genuinely miss as the target moves after a read.
    cpu.reaction -= dt;
    if (cpu.reaction <= 0) {
      cpu.aim = clamp(zoneFor(p.x, p.y, cpu.flair).need + cpu.error, .08, .96);
      cpu.reaction = .12;
    }
    if (match.power >= cpu.aim || match.power >= .98) release(cpu.id);
  }

  function humanRelease() {
    if (!match || match.over || match.ball || match.pass || match.lock > 0 || match.transit?.[match.active]) return;
    if (!isHuman(match.active) || !match.hold) return;
    release(match.active);
  }

  function setFlair(id) {
    if (!match || match.ball || match.pass || !isHuman(match.active)) return;
    if (id === "dunk" && !canDunk(match.pos[match.active].x, match.pos[match.active].y)) {
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

  // All decorative interface skins are exported Makko artwork. Code only lays them out.
  function skin(name, x, y, w, h) {
    const img = readyImage(`skin-${name}`);
    if (!img) return;
    // Paper controls use nine-slice layout: corners retain their proportions.
    // Portraits, wordmarks and other illustrations always fit without distortion.
    if (["primary", "secondary", "score-left", "score-right", "score-center", "target"].includes(name)) {
      const sw = img.naturalWidth, sh = img.naturalHeight;
      const edge = 40, corner = Math.min(10, w / 4, h / 4);
      const sx = [0, edge, sw - edge, sw], sy = [0, edge, sh - edge, sh];
      const dx = [x, x + corner, x + w - corner, x + w];
      const dy = [y, y + corner, y + h - corner, y + h];
      for (let row = 0; row < 3; row++) for (let col = 0; col < 3; col++) {
        ctx.drawImage(img, sx[col], sy[row], sx[col+1]-sx[col], sy[row+1]-sy[row],
          dx[col], dy[row], dx[col+1]-dx[col], dy[row+1]-dy[row]);
      }
      return;
    }
    const scale = Math.min(w / img.naturalWidth, h / img.naturalHeight);
    const width = img.naturalWidth * scale, height = img.naturalHeight * scale;
    ctx.drawImage(img, x + (w - width) / 2, y + (h - height) / 2, width, height);
  }

  function menuBackdrop(name) {
    const img = readyImage(`skin-${name}`);
    if (!img) return;
    const still = reducedMotion?.matches;
    // Overscan leaves room for a separate background plane without exposing edges.
    const extra = still ? 0 : 20;
    ctx.drawImage(img, -extra + (still ? 0 : menuMotion.x * 12), -extra + (still ? 0 : menuMotion.y * 8), W + extra * 2, H + extra * 2);
  }

  function glassPanel(x, y, w, h, hot) {
    skin(hot ? "primary" : "board", x, y, w, h);
  }

  function button(x, y, w, h, label, action, hot, shoot) {
    buttons.push({ x, y, w, h, action, shoot: !!shoot });
    const key = `${screen}:${x}:${y}`;
    const p = menuMotion.hover;
    const over = !!p && p.x >= x && p.x <= x + w && p.y >= y && p.y <= y + h;
    const previous = buttonMotion.get(key) || 0;
    const hover = reducedMotion?.matches ? Number(over) : previous + (Number(over) - previous) * (1 - Math.exp(-18 * menuMotion.dt));
    buttonMotion.set(key, hover);
    const pressed = menuMotion.pressKey === key && performance.now() < menuMotion.pressUntil;
    ctx.save();
    if (!reducedMotion?.matches) {
      ctx.translate(x + w / 2, y + h / 2 + (pressed ? 2 : -3 * hover));
      const scale = pressed ? 0.97 : 1 + hover * 0.025;
      ctx.scale(scale, scale);
      ctx.translate(-x - w / 2, -y - h / 2);
    }
    ctx.filter = `brightness(${1 + hover * 0.16})`;
    ctx.shadowColor = "rgba(0,0,0,.3)";
    ctx.shadowBlur = hover * 4;
    skin(hot ? "primary" : "secondary", x, y, w, h);
    ctx.shadowBlur = 0;
    ctx.fillStyle = hot ? "#10182b" : "#fff6d8";
    ctx.font = "20px Bungee, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x + w / 2, y + h / 2 + 1);
    ctx.restore();
  }

  function drawTitle() {
    buttons.length = 0;
    menuBackdrop("title");
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#fff6d8";
    ctx.font = "18px Bungee, sans-serif";
    ctx.fillText("NEW YORK  /  DETROIT", W / 2, 126);
    skin("logo", 412, 175, 456, 152);
    skin("banner", 432, 349, 416, 66);
    ctx.font = "18px Bungee, sans-serif";
    ctx.fillText("TWO CITIES. ONE COURT.", W / 2, 389);
    button(465, 464, 350, 76, "RUN THE COURT", () => { screen = "select"; }, true);
    ctx.font = "17px Share Tech Mono, monospace";
    ctx.fillStyle = "#fff6d8";
    ctx.fillText("Make your shot. Make them match it.", W / 2, 584);
    ctx.fillText("PRESS ENTER OR TAP TO START", W / 2, 644);
  }

  function drawSelect() {
    buttons.length = 0;
    ctx.drawImage(images["nyc-future"],0,0,W,H);
    ctx.fillStyle = "rgba(8,17,31,.84)"; ctx.fillRect(0,0,W,H);
    ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#fff6d8"; ctx.font = "28px Bungee, sans-serif";
    ctx.fillText("WHO'S GOT NEXT?", W/2, 56);
    ROSTER.forEach((id,i) => {
      const x=42+i*400, on=i===selectIndex;
      ctx.fillStyle=on?"#31425b":"#15243a"; roundRect(x,90,388,440,18); ctx.fill();
      ctx.strokeStyle=on?"#f5bc51":"#405570"; ctx.lineWidth=on?4:2; ctx.stroke();
      const clip=CLIPS[id]?.idle, img=images[`${id}-idle`];
      if(clip && img?.naturalWidth) {
        const frame=Math.floor(performance.now()/1000*clip.fps)%clip.frames;
        const cell=spriteCell(clip,frame,{sy:0}), height=270, width=height*clip.fw/clip.fh;
        ctx.drawImage(img,cell.x,cell.y,clip.fw,clip.fh,x+194-width/2,117,width,height);
      }
      buttons.push({x,y:90,w:388,h:440,action:()=>{selectIndex=i;}});
      ctx.fillStyle=on?"#f5bc51":"#fff6d8";ctx.font="24px Bungee, sans-serif";
      ctx.fillText(FIGHTERS[id].full,x+194,438);
      ctx.font="17px Share Tech Mono, monospace";
      ctx.fillText(`${FIGHTERS[id].city.toUpperCase()} · ${on?"YOUR PICK":"TAP TO SELECT"}`,x+194,482);
    });
    button(390,545,500,58,playMode === "solo" ? "ALL 3 : SOLO VS 2 CPU" : "ALL 3 : PASS AND PLAY",()=>{playMode=playMode==="solo"?"local":"solo";});
    button(478,618,324,64,"CHOOSE COURT",()=>openCourtSelect(),true);
    ctx.fillStyle="#fff6d8";ctx.font="14px Share Tech Mono, monospace";ctx.textAlign="center";
    ctx.fillText("LEFT / RIGHT TO PICK · ENTER TO CHOOSE COURT",640,708);
  }

  function startGame() {
    if (!assetsReady()) return;
    if (!guideSeen) {
      guideOpen = true;
      document.getElementById("first-play").hidden = false;
      document.getElementById("guide-learn").focus();
      return;
    }
    const id = selectedFighter();
    paused = false; pausePanel.hidden = true; keys.clear(); pointer = null;
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
    const bg = readyImage(match.court.startsWith("court-") ? "selected-court" : nyc ? "nyc-future" : "detroit-future");
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
    if (match.court.startsWith("court-")) return;
    const box = hoopSpriteBox();
    if (!box) return;
    const srcH = box.img.height * box.crop;
    ctx.drawImage(box.img, 0, 0, box.img.width, srcH, box.x, box.y, box.w, box.h);
  }

  function drawHoopFront() {
    if (match.court.startsWith("court-")) return;
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
    else if (pose === "move" && set.move) key = "move";
    else if (dribbling && set.dribble) key = "dribble";
    else if (set[pose] && pose !== "move") key = pose;
    else if (set.idle) key = "idle";
    if (!key) return null;
    if (key === "spin" && set.spin.turnOnly && shooting && match.ball.t >= match.ball.turnUntil) key = "shot";
    const img = images[`${id}-${key}`];
    if (!img || !img.complete || !img.naturalWidth) return null;
    return { img, clip: set[key], key };
  }

  const spriteBlendSurfaces = new Map();

  function blendedDribbleImage(id, key, img, clip, frame) {
    if (!clip.smoothFrames || typeof document.createElement !== "function") return null;
    const blend = dribbleFrameClock(clip, id) % 1;
    if (blend < 1e-6) return null;
    const cacheKey = `${id}-${key}`;
    let surface = spriteBlendSurfaces.get(cacheKey);
    if (!surface) {
      surface = document.createElement("canvas");
      surface.width = clip.fw; surface.height = clip.fh;
      spriteBlendSurfaces.set(cacheKey, surface);
    }
    const buffer = surface.getContext("2d");
    const next = frame >= (clip.loopEnd ?? clip.frames - 1) ? (clip.loopStart || 0) : frame + 1;
    const a = spriteCell(clip, frame, spriteLayout(clip, frame));
    const b = spriteCell(clip, next, spriteLayout(clip, next));
    buffer.clearRect(0, 0, clip.fw, clip.fh);
    buffer.globalCompositeOperation = "source-over";
    buffer.globalAlpha = 1 - blend;
    buffer.drawImage(img, a.x, a.y, clip.fw, clip.fh, 0, 0, clip.fw, clip.fh);
    buffer.globalCompositeOperation = "lighter";
    buffer.globalAlpha = blend;
    buffer.drawImage(img, b.x, b.y, clip.fw, clip.fh, 0, 0, clip.fw, clip.fh);
    buffer.globalCompositeOperation = "source-over";
    buffer.globalAlpha = 1;
    return surface;
  }

  function drawPlayer(id) {
    const f = FIGHTERS[id];
    const p = match.pos[id];
    const at = project(p.x, p.y);
    const reaction = match.reactions[id];
    const onSideline = !match.transit?.[id] && id !== match.owner && id !== match.active && match.ball?.id !== id;
    const pose = onSideline && reaction ? reaction.state : match.pose[id];
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
      } else if (["celebrate", "mock", "shocked"].includes(key)) {
        frame = Math.min(clip.frames - 1, Math.floor((match.t - (reaction?.start ?? match.t)) * clip.fps));
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
      ctx.translate((motion.shift || 0) * at.s, -lift);
      const wide = motion.squash < 1 ? 1 + (1 - motion.squash) * 0.65 : 1;
      ctx.scale((match.face[id] || 1) * (clip.sourceFacing || 1) * wide, motion.squash);
      const top = -height * layout.footInSlice;
      const cell = spriteCell(clip, frame, layout);
      const blended = (key === "dribble" || key === "move") && blendedDribbleImage(id, key, img, clip, frame);
      ctx.drawImage(blended || img, blended ? 0 : cell.x, blended ? 0 : cell.y, clip.fw, layout.sh, -width * (clip.originX ?? .5), top, width, height);
      ctx.restore();
      return;
    }
    const stride = moving ? Math.sin(match.t * 11) * 10 : 0;
    const face = readyImage(`skin-portrait-${id}`);
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
    if (clip.turnOnly) return Math.min(last, Math.floor(ball.t / (ball.turnUntil || .30) * clip.frames));
    if (ball.syncRelease && clip.releaseFrame != null) {
      if (ball.t < ball.show) return Math.min(clip.releaseFrame - 1, Math.floor(Math.max(0, ball.t - (ball.turnUntil || 0)) / (ball.show - (ball.turnUntil || 0)) * clip.releaseFrame));
      const recovery = clamp((ball.t - ball.show) / (1 - ball.show), 0, 1);
      return Math.min(last, clip.releaseFrame + Math.floor(recovery * (last - clip.releaseFrame + 1)));
    }
    const u = Math.min(1, ball.t / (ball.show || 0.35));
    if (u >= 1) return last;
    return Math.min(last, Math.floor(u * (last + 1)));
  }

  function gatheringBall() {
    if (!match) return null;
    let id, action, frame;
    if (match.ball && match.ball.phase === "arc" && match.ball.t < match.ball.show) {
      id = match.ball.id;
      action = match.ball.flair === "none" || (match.ball.turnUntil && match.ball.t >= match.ball.turnUntil) ? "shot" : match.ball.flair;
      frame = poseFrame(CLIPS[id][action], match.ball);
    } else if (!match.ball && match.hold) {
      id = match.active;
      const flair = !isHuman(id) ? match.cpu.flair : match.flair;
      action = flair === "none" ? "shot" : flair;
      frame = 0;
    } else return null;
    return { id, action, frame, behind: !!CLIPS[id][action].ballBehind?.[frame] };
  }

  function drawGatherBall(id, frame, action = "shot") {
    const clip = CLIPS[id][action];
    if (!clip.emptyHands) return;
    const at = project(match.pos[id].x, match.pos[id].y);
    const drawn = drawnSprite(clip, at, frame);
    const keys = clip.handKeys;
    if (clip.turnOnly && frame > (clip.occludeStart ?? 2) && frame < (clip.occludeEnd ?? 7)) return; // Possession passes behind the torso during the turn.
    let a = keys[0], b = keys[keys.length - 1];
    for (let i = 1; i < keys.length; i++) {
      if (frame <= keys[i][0]) { a = keys[i - 1]; b = keys[i]; break; }
    }
    const t = clamp((frame - a[0]) / Math.max(1, b[0] - a[0]), 0, 1);
    const hx = a[1] + (b[1] - a[1]) * t, hy = a[2] + (b[2] - a[2]) * t;
    const motion = bodyMotion(id);
    drawBall(at.x + (motion.shift || 0) * at.s + (match.face[id] || 1) * (clip.sourceFacing || 1) * (hx - (clip.originX ?? .5)) * drawn.width,
      at.y - motion.lift * at.s + (hy - (clip.feet[frame] ?? clip.feet[0])) * drawn.height, Math.max(8, playerHeight(at) * .09), 0);
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
    const radius = (b.releaseRadius || 11) + (7 - (b.releaseRadius || 11)) * clamp(p.t, 0, 1);
    drawBall(p.x, p.y, b.flair === "dunk" && p.t > 0.75 ? 13 : radius, p.t * 1.6);
  }

  function drawLoose(ball, spin) {
    const p = ballPoint(ball);
    drawBall(p.x, p.y, 11, spin);
  }

  function drawReleaseFeedback() {
    const feedback = match.releaseFeedback;
    if (!feedback || feedback.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.min(1, feedback.life * 5);
    ctx.font = "26px Bungee, sans-serif";
    ctx.textAlign = "center";
    ctx.strokeStyle = "#071020"; ctx.lineWidth = 6;
    ctx.fillStyle = feedback.perfect ? "#8cffe0" : feedback.made ? "#ffcf52" : "#ffffff";
    ctx.strokeText(feedback.text, W / 2, 645);
    ctx.fillText(feedback.text, W / 2, 645);
    ctx.restore();
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

  function drawScorePortrait(id,x,y) {
    const clip=CLIPS[id].idle,img=images[`${id}-idle`];
    if(!img?.naturalWidth)return;
    const head=clip.fh*.43;
    ctx.save();ctx.beginPath();ctx.arc(x+48,y+48,43,0,Math.PI*2);ctx.clip();
    ctx.fillStyle=FIGHTERS[id].body;ctx.fillRect(x,y,96,96);
    ctx.drawImage(img,0,0,clip.fw,head,x,y,96,96);ctx.restore();
  }

  function drawHud() {
    buttons.length = 0;
    const aiming = match.hold && isHuman(match.active) && !match.ball ? shotNeed() : null;
    const cardWidth=(W-32)/match.players.length;
    match.players.forEach((id,i)=>{
      const x=16+i*cardWidth,out=match.eliminated.includes(id),active=match.active===id&&!match.over;
      ctx.fillStyle=out?"#18202d":"#182d43";roundRect(x,4,cardWidth-8,58,8);ctx.fill();ctx.strokeStyle=active?"#ffba45":"#62748a";ctx.lineWidth=active?3:1;ctx.stroke();
      if(id!=="talarico")skin(`score-${id}`,x+4,9,48,48);else{ctx.save();ctx.translate(x+4,9);ctx.scale(.5,.5);drawScorePortrait(id,0,0);ctx.restore();}
      ctx.textAlign="center";ctx.fillStyle=out?"#8793a1":"#fff6d8";ctx.font="15px Bungee, sans-serif";ctx.fillText(`${FIGHTERS[id].name.toUpperCase()}${out?" : OUT":""}`,x+cardWidth*.57,20,cardWidth-88);
      LETTERS.forEach((letter,n)=>{ctx.fillStyle=n<match.letters[id]?"#ff9b40":"#667789";ctx.font="23px Bungee, sans-serif";ctx.fillText(letter,x+94+n*(cardWidth-112)/4,49);});
    });
    ctx.fillStyle="rgba(8,17,30,.9)";roundRect(240,64,800,27,6);ctx.fill();
    const city = courtById(match.court).name.toUpperCase();
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    if (aiming) {
      ctx.fillStyle = "#fff6d8";
      ctx.font = "20px Bungee, sans-serif";
      ctx.fillText(aiming.hit ? "RELEASE NOW" : "HIT THE GOLD ZONE", W / 2, 76);
      ctx.fillStyle = "#9fd4ff";
      ctx.font = "16px Share Tech Mono, monospace";
      ctx.fillText("Space or tap the shot button again", W / 2, 90);
      const w = 440, h = 48, x = (W - w) / 2, y = 596;
      skin("meter", x, y, w, h);
      const pad = 32, inner = w - pad * 2;
      const left = x + pad + (aiming.need - aiming.span) * inner;
      const zoneW = Math.max(8, aiming.span * 2 * inner);
      skin("target", left, y + 10, zoneW, h - 20);
      const nx = x + pad + match.power * inner;
      skin("needle", nx - 8, y - 5, 16, h + 10);
    } else {
      ctx.fillStyle = "#9fd4ff";
      ctx.font = "12px Bungee, sans-serif";
      ctx.fillText(match.practice ? "PRACTICE · NO LETTERS" : `${FIGHTERS[match.active].name.toUpperCase()} · ${match.mode === "local" ? "PASS THE DEVICE" : isHuman(match.active) ? "YOUR TURN" : "CPU TURN"}`, W / 2, 75, 780);
      const tutorial = match.tutorial;
      const brief = match.over ? `${FIGHTERS[match.over].name} wins! Run it back?` : tutorial
        ? tutorial.shot ? "Ready? Start a match." : !tutorial.moved ? "Move: arrows / WASD / stick." : "Press Space / Aim to begin."
        : match.practice ? "Move. Aim. Hit the gold zone." : match.phase === "copy" && isHuman(match.active)
        ? copyHint() : "Set a shot. Make them match it.";
      wrapCall(brief, W / 2, 89);
    }

    if (match.notice && match.notice.until > match.t && !aiming) {
      skin("secondary", 230, 564, 820, 62);
      ctx.fillStyle = "#fff6d8"; ctx.font = "17px Share Tech Mono, monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      const words = match.notice.text.split(" "); let lines = [""];
      for (const word of words) {
        const n = lines.length - 1, next = lines[n] ? `${lines[n]} ${word}` : word;
        if (ctx.measureText(next).width > 770) lines.push(word); else lines[n] = next;
      }
      lines.forEach((line, i) => ctx.fillText(line, 640, 595 + (i - (lines.length - 1) / 2) * 20));
      ctx.textBaseline = "alphabetic";
    }
    if (match.tutorial) button(904, 512, 352, 46, match.tutorial.shot ? "START MATCH" : "SKIP LESSON", () => startGame(), true);

    if (!match.over && isHuman(match.active) && !match.ball && !match.pass) {
      const labels = [
        ["1  SPIN", "spin"],
        ["2  DUNK", "dunk"],
        ["3  FADE", "fade"],
        ["4  HOOK", "hook"],
      ];
      labels.forEach((item, i) => {
        const dunkFar = item[1] === "dunk" && !canDunk(match.pos[match.active].x, match.pos[match.active].y);
        button(24 + i * 168, 662, 156, 44, dunkFar ? "2  TOO FAR" : item[0], () => setFlair(item[1]), match.flair === item[1]);
      });
      const label = !match.hold ? "SPACE / TAP TO AIM" : aiming && aiming.hit ? "SHOOT NOW!" : "SPACE / TAP TO SHOOT";
      button(904, 654, 352, 54, label, () => {
        if (!match.hold) {
          match.hold = true;
          match.power = 0;
          match.powerDir = 1;
          match.zone = false;
        } else {
          humanRelease();
        }
      }, !match.hold || !!(aiming && aiming.hit), true);
    }

    if (match.over) {
      if (match.unlockMessage) {
        skin("secondary", 250, 490, 780, 64);
        ctx.textAlign = "center"; ctx.fillStyle = "#fff5da";
        ctx.font = "19px Bungee, sans-serif";
        ctx.fillText(match.unlockMessage, 640, 529);
      }
      button(W / 2 - 320, 600, 280, 58, "RUN IT BACK", () => {
        match = freshMatch(match.humanId);
      }, true);
      button(W / 2 + 40, 600, 280, 58, "CHOOSE COURT", openCourtSelect, false);
    }
  }

  function copyHint() {
    const p = match.pos[match.active], c = match.challenge;
    if (!c) return "Match the spot and shot.";
    const spot = Math.hypot(p.x - c.x, p.y - c.y) < .11;
    const shot = match.flair === c.flair;
    return `${spot ? "Spot OK" : "Move onto the ring"} / ${shot ? "shot OK" : `choose ${FLAIR_NAME[c.flair]}`}`;
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
      const order = [...ROSTER].sort((a, b) => match.pos[b].y - match.pos[a].y);
      const gather = gatheringBall();
      if (gather?.behind) drawGatherBall(gather.id, gather.frame, gather.action);
      order.forEach(drawPlayer);
      drawReleaseFeedback();
      const through = match.ball && match.ball.phase === "net";
      if (!through) drawHoopFront();
      if (match.ball) {
        if (match.ball.phase !== "arc" || match.ball.t >= (match.ball.show || 0)) drawFlight();
        else {
          const action = match.ball.flair === "none" || (match.ball.turnUntil && match.ball.t >= match.ball.turnUntil) ? "shot" : match.ball.flair;
          const clip = CLIPS[match.ball.id][action];
          if (!gather?.behind) drawGatherBall(match.ball.id, poseFrame(clip, match.ball), action);
        }
      } else if (match.hold) {
        const flair = !isHuman(match.active) ? match.cpu.flair : match.flair;
        if (!gather?.behind) drawGatherBall(match.active, 0, flair === "none" ? "shot" : flair);
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

  canvas.addEventListener("pointermove", (ev) => {
    const p = pointerPos(ev);
    menuMotion.hover = p;
    menuMotion.targetX = clamp((p.x / W - 0.5) * 2, -1, 1);
    menuMotion.targetY = clamp((p.y / H - 0.5) * 2, -1, 1);
    if (canvas.style) canvas.style.cursor = hit(p.x, p.y) ? "pointer" : "default";
  });
  canvas.addEventListener("pointerleave", () => {
    menuMotion.hover = null;
    menuMotion.targetX = menuMotion.targetY = 0;
    if (canvas.style) canvas.style.cursor = "default";
  });

  canvas.addEventListener("pointerdown", (ev) => {
    if (paused || guideOpen || !assetsReady()) return;
    unlockAudio();
    canvas.focus();
    const p = pointerPos(ev);
    const b = hit(p.x, p.y);
    if (b) {
      menuMotion.pressKey = `${screen}:${b.x}:${b.y}`;
      menuMotion.pressUntil = performance.now() + 140;
      menuMotion.hover = p;
      b.action();
      pointer = null;
      return;
    }
    if (screen === "play" && match && isHuman(match.active) && !match.ball && !match.pass && !match.over) {
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
    if (k === "u" && ev.ctrlKey && ev.shiftKey && !ev.repeat) {
      ev.preventDefault(); marketingUnlock = !marketingUnlock;
      if (match && marketingUnlock) match.marketingSession = true;
      if (courtOpen || screen === "select") openCourtSelect();
      else status.textContent = marketingUnlock ? "Marketing unlock on. All courts available; wins do not count." : "Marketing unlock off.";
      return;
    }
    if (courtOpen && k === "escape") { ev.preventDefault(); courtOpen=false; document.getElementById('court-select').hidden=true; chooseAgain(); return; }
    if (k === "escape" && screen === "play") { ev.preventDefault(); if (!ev.repeat) setPaused(!paused); return; }
    if (ev.target?.closest?.("button, a, input, select, textarea, [contenteditable]")) return;
    if (guideOpen || courtOpen || !assetsReady()) return;
    if ([" ", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(k)) ev.preventDefault();
    if (paused || ev.repeat) return;
    unlockAudio();
    keys.add(k);
    if (k === " " || k === "arrowup" || k === "arrowdown") ev.preventDefault();
    if (screen === "title" && (k === "enter" || k === " ")) {
      ev.preventDefault();
      screen = "select";
      return;
    }
    if (screen === "select") {
      ev.preventDefault();
      if (k === "arrowleft" || k === "a") selectIndex = (selectIndex + ROSTER.length - 1) % ROSTER.length;
      if (k === "arrowright" || k === "d") selectIndex = (selectIndex + 1) % ROSTER.length;
      if (k === "enter" || k === " ") openCourtSelect();
      return;
    }
    if (!match) return;
    if (match.over) { if (k === "enter" || k === " ") restartMatch(); return; }
    if ((k === " " || k === "j") && isHuman(match.active) && !match.ball && !match.pass && match.lock <= 0 && !match.transit?.[match.active]) {
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
    const dt = Math.max(0, Math.min(0.033, (now - last) / 1000));
    last = now;
    menuMotion.dt = dt;
    const ease = 1 - Math.exp(-5 * dt);
    menuMotion.x += (menuMotion.targetX - menuMotion.x) * ease;
    menuMotion.y += (menuMotion.targetY - menuMotion.y) * ease;
    if (menuMotion.screen !== screen) {
      menuMotion.screen = screen;
      buttonMotion.clear();
      if (!reducedMotion?.matches) canvas.animate?.([{ opacity: .65, transform: "translateY(4px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 220, easing: "ease-out" });
    }
    const ready = assetsReady(), progress = assetProgress();
    document.getElementById("asset-loading").hidden = ready;
    document.getElementById("asset-progress").textContent = progress.failed ? "Some artwork could not load. Check your connection and retry." : `Getting the court ready: ${progress.loaded} / ${progress.total}`;
    document.getElementById("asset-retry").hidden = !progress.failed;
    if (pendingCourtStart && ready) { pendingCourtStart=false; startGame(); }
    if (!paused && !guideOpen && !courtOpen && ready) update(dt * (match?.practice && document.getElementById("slow-motion").checked ? 0.25 : 1));
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
