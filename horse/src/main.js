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

  function loadImage(key, src) {
    const img = new Image();
    img.src = src.includes("sprites/") ? `${src}?v=6` : src;
    images[key] = img;
  }

  loadImage("nyc", "assets/nyc.webp");
  loadImage("detroit", "assets/detroit.webp");
  loadImage("face-mamdani", "assets/face-mamdani.webp");
  loadImage("face-sayed", "assets/face-sayed.webp");
  loadImage("ball", "assets/sprites/ball.webp");
  loadImage("mamdani-idle", "assets/sprites/mamdani-idle.webp");
  loadImage("mamdani-move", "assets/sprites/mamdani-move.webp");
  loadImage("mamdani-shot", "assets/sprites/mamdani-shot.webp");
  loadImage("mamdani-dunk", "assets/sprites/mamdani-dunk.webp");
  loadImage("mamdani-spin", "assets/sprites/mamdani-spin.webp");
  loadImage("mamdani-fade", "assets/sprites/mamdani-fade.webp");
  loadImage("mamdani-hook", "assets/sprites/mamdani-hook.webp");
  loadImage("sayed-idle", "assets/sprites/sayed-idle.webp");
  loadImage("sayed-shot", "assets/sprites/sayed-shot.webp");
  loadImage("sayed-dunk", "assets/sprites/sayed-dunk.webp");
  loadImage("sayed-spin", "assets/sprites/sayed-spin.webp");
  loadImage("sayed-fade", "assets/sprites/sayed-fade.webp");
  loadImage("sayed-hook", "assets/sprites/sayed-hook.webp");

  const CLIPS = {
    mamdani: {
      idle: { frames: 2, fw: 366, fh: 706, body: 706 },
      shot: { frames: 8, fw: 295, fh: 864, body: 640, play: 4 },
      dunk: { frames: 8, fw: 391, fh: 836, body: 640, play: 4 },
      spin: { frames: 8, fw: 415, fh: 917, body: 640, play: 4 },
      fade: { frames: 8, fw: 438, fh: 922, body: 640, play: 5 },
      hook: { frames: 8, fw: 417, fh: 914, body: 640, play: 5 },
    },
    sayed: {
      idle: { frames: 2, fw: 267, fh: 733, body: 733 },
      shot: { frames: 8, fw: 391, fh: 868, body: 640, play: 4 },
      dunk: { frames: 8, fw: 419, fh: 848, body: 640, play: 4 },
      spin: { frames: 8, fw: 399, fh: 881, body: 640, play: 5 },
      fade: { frames: 8, fw: 455, fh: 912, body: 640, play: 5 },
      hook: { frames: 8, fw: 350, fh: 883, body: 640, play: 4 },
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
      if (!audioCtx) return;
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
    tone(160, 0.14, "triangle", 0.07);
    tone(96, 0.22, "sine", 0.05);
    noiseBurst(0.08, 400, 0.08);
  }

  function unlockAudio() {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === "suspended") audioCtx.resume();
    ensureMix();
  }

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function project(nx, ny) {
    const y = 210 + (1 - ny) * 390;
    const span = 340 + (1 - ny) * 560;
    const x = W * 0.5 + (nx - 0.5) * span;
    const s = 0.95 + (1 - ny) * 0.4;
    return { x, y, s };
  }

  function playerHeight(at) {
    return 110 * at.s;
  }

  function hoopLayout() {
    const h = project(HOOP.x, HOOP.y);
    return { x: h.x, floor: h.y, rim: h.y - 84 };
  }

  function courtPoint(px, py) {
    if (py < 200 || py > 620) return null;
    let best = null;
    let bestDy = 1e9;
    for (let ny = 0.08; ny <= 0.7; ny += 0.008) {
      const row = project(0.5, ny);
      const dy = Math.abs(row.y - py);
      if (dy < bestDy) {
        const span = 280 + (1 - ny) * 520;
        bestDy = dy;
        best = { x: clamp(0.5 + (px - W * 0.5) / span, 0.08, 0.92), y: ny };
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
    const t = clamp(b.t, 0, 1);
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
    const bounce = (match.t * 1.65) % 1;
    return { bounce, dip: Math.sin(bounce * Math.PI) };
  }

  function ownedBall(id) {
    const at = project(match.pos[id].x, match.pos[id].y);
    const span = playerHeight(at);
    const face = match.face[id] || 1;
    const lift = match.jump[id] * 46 * at.s;
    const r = Math.max(8, span * 0.09);
    const beat = dribbleBeat();
    const x = at.x + face * span * 0.2;
    const hand = at.y - lift - span * 0.4;
    const y = hand + Math.sin(beat.bounce * Math.PI) * span * 0.28;
    return { x, y, r, spin: beat.bounce * 1.1 };
  }

  function beginCatch() {
    if (!match || match.over) {
      match.owner = null;
      match.pass = null;
      return;
    }
    const hoop = hoopLayout();
    const to = match.active;
    const dest = ownedBall(to);
    match.owner = null;
    match.pass = {
      x0: hoop.x,
      y0: hoop.rim + 8,
      x1: dest.x,
      y1: dest.y,
      arc: 70,
      t: 0,
      to,
    };
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
    const error = (Math.random() - 0.5) * 0.11;
    match.cpu = {
      id,
      spot,
      flair,
      aim: clamp(need + error, 0.08, 0.98),
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
    let flair = id === match.humanId ? match.flair : match.cpu.flair;
    if (flair === "dunk" && !canDunk(p.x, p.y)) {
      flair = "none";
      if (id === match.humanId) say("Too far to dunk. That one stays a jumper.");
    }
    const need = requiredPower(p.x, p.y);
    const window = flair === "none" ? 0.082 : 0.046;
    const made = Math.abs(match.power - need) <= window;
    const hand = ownedBall(id);
    const hoop = hoopLayout();
    match.ball = {
      x0: hand.x,
      y0: hand.y,
      x1: hoop.x,
      y1: hoop.rim + 8,
      t: 0,
      made,
      flair,
      id,
      sx: p.x,
      sy: p.y,
    };
    match.owner = null;
    match.pass = null;
    match.hold = false;
    match.pose[id] = flair === "none" ? "shot" : flair;
    match.jump[id] = 1;
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
    match.ball = null;
    match.pose[id] = "idle";
    match.basket = { life: 1.4, made: ball.made, dunk: ball.flair === "dunk" };
    if (ball.made) swish();
    else clank();
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
    beginCatch();
  }

  function update(dt) {
    if (!match || screen !== "play") return;
    match.t += dt;
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
      if (match.jump[id] > 0) match.jump[id] = Math.max(0, match.jump[id] - dt * 0.85);
    }
    if (match.ball) {
      match.trail.push(ballPoint(match.ball));
      if (match.trail.length > 14) match.trail.shift();
    } else if (match.trail.length) {
      match.trail.shift();
    }
    if (match.ball) {
      match.ball.t += dt / 0.72;
      if (match.ball.t >= 1) resolveBall();
      return;
    }
    if (match.pass) {
      const dest = ownedBall(match.pass.to);
      match.pass.x1 = dest.x;
      match.pass.y1 = dest.y;
      match.pass.t += dt / 0.48;
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
    if (vx || vy) {
      p.x = clamp(p.x + (vx / mag) * dt * 0.34, 0.08, 0.92);
      p.y = clamp(p.y + (vy / mag) * dt * 0.28, 0.08, 0.7);
      match.face[id] = vx < -0.05 ? -1 : vx > 0.05 ? 1 : match.face[id];
      match.pose[id] = "move";
    } else if (!match.hold) {
      match.pose[id] = "idle";
    }
    if (match.hold) {
      match.power += match.powerDir * dt * 0.72;
      if (match.power >= 1) {
        match.power = 1;
        match.powerDir = -1;
      } else if (match.power <= 0) {
        match.power = 0;
        match.powerDir = 1;
      }
      match.pose[id] = match.flair === "none" ? "shot" : match.flair;
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
        p.y = clamp(p.y + Math.sign(dy) * dt * 0.26, 0.08, 0.7);
        match.face[cpu.id] = dx < 0 ? -1 : 1;
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
    match.pose[cpu.id] = cpu.flair === "none" ? "shot" : cpu.flair;
    if (match.power >= cpu.aim) {
      match.power = cpu.aim;
      release(cpu.id);
    }
  }

  function humanRelease() {
    if (!match || match.over || match.ball || match.pass || match.lock > 0) return;
    if (match.active !== match.humanId || !match.hold) return;
    release(match.humanId);
  }

  function setFlair(id) {
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

  function button(x, y, w, h, label, action, hot, shoot) {
    buttons.push({ x, y, w, h, action, shoot: !!shoot });
    ctx.fillStyle = hot ? "#ffb020" : "#1a120c";
    ctx.strokeStyle = hot ? "#ffe1a0" : "#ff4d8d";
    ctx.lineWidth = 3;
    roundRect(x, y, w, h, 10);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = hot ? "#1a120c" : "#f6efe4";
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
    ctx.fillStyle = "#ff4d8d";
    ctx.font = "22px Share Tech Mono, monospace";
    ctx.fillText("POLITICAL ARCADES", W / 2, 150);
    ctx.fillStyle = "#ffb020";
    ctx.strokeStyle = "#1a0a10";
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
    ctx.fillText("Arrows move. Hold Space to set power. 1 spin  2 dunk  3 fade  4 hook.", W / 2, 530);
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
      const img = images[id === "mamdani" ? "nyc" : "detroit"];
      if (img && img.complete && img.naturalWidth) {
        ctx.drawImage(img, x, 70, 580, 326);
      }
      const on = i === selectIndex;
      ctx.strokeStyle = on ? "#ffb020" : "rgba(255,255,255,0.2)";
      ctx.lineWidth = on ? 6 : 2;
      ctx.strokeRect(x, 70, 580, 326);
      const f = FIGHTERS[id];
      ctx.fillStyle = on ? "#ffb020" : "#f6efe4";
      ctx.font = "32px Bungee, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(f.full, x + 8, 450);
      ctx.font = "18px Share Tech Mono, monospace";
      ctx.fillStyle = "#b7aea0";
      ctx.fillText(`${f.city} court. CPU takes the other side.`, x + 8, 486);
    });
    ctx.textAlign = "center";
    ctx.fillStyle = "#ff4d8d";
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
    const sky = ctx.createLinearGradient(0, 0, 0, 280);
    sky.addColorStop(0, nyc ? "#141a38" : "#1a1030");
    sky.addColorStop(0.55, nyc ? "#c45a32" : "#d86a28");
    sky.addColorStop(1, nyc ? "#f0b56a" : "#e8924a");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);
    drawLights();
    if (nyc) drawBricks();
    else drawSkyline();
    drawCrowd(nyc);
    drawFence();
    for (let ny = 0.76; ny > 0.06; ny -= 0.028) {
      const a = project(0.06, ny);
      const b = project(0.94, ny);
      const c = project(0.94, Math.max(0.05, ny - 0.028));
      const d = project(0.06, Math.max(0.05, ny - 0.028));
      const stripe = Math.floor(ny * 36) % 2;
      const grain = 0.5 + 0.5 * Math.sin(ny * 90);
      ctx.fillStyle = stripe
        ? `rgb(${214 + grain * 18}, ${146 + grain * 10}, ${72})`
        : `rgb(${168 + grain * 8}, ${98}, ${46})`;
      quad(d, c, b, a);
      ctx.fill();
    }
    const paint = nyc ? "rgba(36, 62, 115, 0.72)" : "rgba(214, 69, 58, 0.72)";
    const key = [project(0.36, 0.76), project(0.64, 0.76), project(0.58, 0.48), project(0.42, 0.48)];
    quad(key[0], key[1], key[2], key[3]);
    ctx.fillStyle = paint;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.92)";
    ctx.lineWidth = 4;
    ctx.lineJoin = "round";
    const edge = [project(0.08, 0.74), project(0.92, 0.74), project(0.78, 0.08), project(0.22, 0.08)];
    quad(edge[3], edge[2], edge[1], edge[0]);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(project(0.5, 0.08).x, project(0.5, 0.08).y);
    ctx.lineTo(project(0.5, 0.74).x, project(0.5, 0.74).y);
    ctx.stroke();
    quad(key[0], key[1], key[2], key[3]);
    ctx.stroke();
    ctx.beginPath();
    for (let i = 0; i <= 16; i += 1) {
      const a = (Math.PI * i) / 16;
      const nx = 0.5 + Math.cos(a) * 0.2;
      const ny = 0.5 + Math.sin(a) * 0.16;
      const p = project(nx, ny);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    const gloss = ctx.createLinearGradient(0, 220, 0, 640);
    gloss.addColorStop(0, "rgba(255,255,255,0.16)");
    gloss.addColorStop(0.4, "rgba(255,255,255,0)");
    ctx.fillStyle = gloss;
    quad(edge[3], edge[2], edge[1], edge[0]);
    ctx.fill();
    const mid = project(0.5, 0.4);
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(mid.x, mid.y, 78, 28, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "rgba(255, 176, 32, 0.9)";
    ctx.font = "22px Bungee, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("HORSE", mid.x, mid.y + 8);
    drawHoop();
    if (match.challenge && match.phase === "copy") {
      const g = project(match.challenge.x, match.challenge.y);
      ctx.strokeStyle = "#ffb020";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(g.x, g.y, 34 + Math.sin(match.t * 5) * 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#1a120c";
      ctx.fillRect(g.x - 70, g.y - 58, 140, 22);
      ctx.fillStyle = "#ffb020";
      ctx.font = "14px Bungee, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(FLAIR_NAME[match.challenge.flair].toUpperCase(), g.x, g.y - 42);
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

  function drawHoop() {
    const hoop = hoopLayout();
    const hit = match.basket && match.basket.life > 0 ? match.basket : null;
    const incoming = match.ball && match.ball.t > 0.78;
    const sway = hit ? Math.sin(match.t * 30) * hit.life * 14 : incoming ? 6 : Math.sin(match.t * 2) * 1.4;
    const rim = hoop.rim;
    const bw = 136;
    const bh = 78;
    const top = rim - 16 - bh;
    ctx.save();
    ctx.translate(sway * 0.35, 0);
    ctx.fillStyle = "#5c5348";
    ctx.fillRect(hoop.x - 9, top + bh - 8, 18, hoop.floor - (top + bh - 8));
    ctx.fillStyle = hit && hit.made ? "rgba(255, 246, 214, 0.82)" : "rgba(214, 232, 242, 0.55)";
    roundRect(hoop.x - bw / 2, top, bw, bh, 6);
    ctx.fill();
    ctx.strokeStyle = "#f4efe4";
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.strokeStyle = "rgba(20, 16, 12, 0.55)";
    ctx.lineWidth = 3;
    ctx.strokeRect(hoop.x - 28, top + 22, 56, 40);
    if (hit && hit.dunk && hit.made) {
      ctx.strokeStyle = `rgba(255,255,255,${0.35 + hit.life * 0.5})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(hoop.x - 18, top + 16);
      ctx.lineTo(hoop.x + 8, top + 48);
      ctx.lineTo(hoop.x - 24, top + 78);
      ctx.moveTo(hoop.x + 16, top + 28);
      ctx.lineTo(hoop.x + 42, top + 62);
      ctx.stroke();
    }
    ctx.restore();
    ctx.fillStyle = "#f08a24";
    ctx.fillRect(hoop.x - 6 + sway * 0.2, rim - 34, 12, 28);
    ctx.strokeStyle = hit && !hit.made ? "#fff1c9" : "#ff4a2a";
    ctx.lineWidth = hit ? 12 : 10;
    ctx.beginPath();
    ctx.ellipse(hoop.x + sway * 0.15, rim, 48, 15, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 2;
    for (let i = -4; i <= 4; i += 1) {
      ctx.beginPath();
      ctx.moveTo(hoop.x + i * 10, rim + 2);
      ctx.quadraticCurveTo(hoop.x + i * 7 + sway, rim + 28, hoop.x + i * 4 + sway * 0.4, rim + 52);
      ctx.stroke();
    }
  }

  function spriteFor(id, pose) {
    const set = CLIPS[id];
    if (!set) return null;
    let key = null;
    const shooting = match.ball && match.ball.id === id;
    const flairPose = pose === "dunk" || pose === "spin" || pose === "fade" || pose === "hook" || pose === "shot";
    if (flairPose && set[pose]) key = pose;
    else if (shooting && set.shot) key = "shot";
    else if (set[pose]) key = pose;
    else if (pose === "move" && set.move) key = "move";
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
    const jumping = match.jump[id];
    const moving = pose === "move";
    const lift = jumping * 46 * at.s;
    const sprite = spriteFor(id, pose);
    ctx.save();
    ctx.translate(at.x, at.y);
    ctx.fillStyle = "rgba(0,0,0,0.38)";
    ctx.beginPath();
    ctx.ellipse(0, 4, 22 * at.s, 7 * at.s, 0, 0, Math.PI * 2);
    ctx.fill();
    if (sprite) {
      const { img, clip, key } = sprite;
      let frame;
      const dribbling = key === "idle" && match.owner === id && !match.hold && !match.pass;
      const beat = dribbling ? dribbleBeat() : null;
      if (match.hold && match.active === id && key !== "idle") {
        frame = Math.min(2, Math.floor(match.power * 3));
      } else if (match.ball && match.ball.id === id) {
        frame = poseFrame(clip, match.ball);
      } else if (key === "idle") {
        frame = 0;
      } else if (key === "move") {
        frame = Math.floor(match.t * 8) % clip.frames;
      } else {
        frame = Math.min(clip.frames - 1, Math.floor((1 - jumping) * clip.frames));
      }
      const span = playerHeight(at);
      const height = span * (clip.fh / (clip.body || clip.fh));
      const width = height * (clip.fw / clip.fh);
      ctx.translate(0, -lift + (beat ? beat.dip * span * 0.015 : 0));
      ctx.scale(match.face[id] || 1, 1);
      ctx.drawImage(img, frame * clip.fw, 0, clip.fw, clip.fh, -width / 2, -height, width, height);
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.scale(1, -0.28);
      ctx.drawImage(img, frame * clip.fw, 0, clip.fw, clip.fh, -width / 2, -height, width, height);
      ctx.restore();
      ctx.restore();
      return;
    }
    const stride = moving ? Math.sin(match.t * 11) * 10 : 0;
    const face = images[id === "mamdani" ? "face-mamdani" : "face-sayed"];
    ctx.scale(at.s, at.s);
    ctx.translate(0, -lift);
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
    const u = Math.min(1, ball.t / 0.78);
    if (u >= 1) return last;
    return Math.min(last, Math.floor(u * (last + 1)));
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
    match.trail.forEach((p, i) => {
      const a = (i + 1) / match.trail.length;
      ctx.save();
      ctx.globalAlpha = a * 0.28;
      drawBall(p.x, p.y, 7 + a * 3, 0);
      ctx.restore();
    });
    const b = match.ball;
    const p = ballPoint(b);
    drawBall(p.x, p.y, b.flair === "dunk" && p.t > 0.75 ? 13 : 11, p.t * 1.6);
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
    ctx.fillStyle = "#ffb020";
    ctx.fillText(match.banner.text, 0, 0);
    ctx.restore();
  }

  function drawHud() {
    buttons.length = 0;
    ctx.fillStyle = "rgba(8, 10, 16, 0.82)";
    roundRect(24, 16, 1232, 92, 12);
    ctx.fill();
    ["mamdani", "sayed"].forEach((id, i) => {
      const x = 48 + i * 640;
      const f = FIGHTERS[id];
      const face = images[id === "mamdani" ? "face-mamdani" : "face-sayed"];
      if (face && face.complete && face.naturalWidth) {
        ctx.save();
        roundRect(x, 28, 64, 64, 8);
        ctx.clip();
        ctx.drawImage(face, x, 28, 64, 64);
        ctx.restore();
      }
      ctx.fillStyle = f.trim;
      ctx.font = "20px Bungee, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(f.name.toUpperCase(), x + 76, 48);
      LETTERS.forEach((letter, n) => {
        const on = n < match.letters[id];
        const fresh = on && n === match.letters[id] - 1 && match.pop[id] > 0;
        const s = fresh ? 1 + match.pop[id] * 0.55 : 1;
        ctx.save();
        ctx.translate(x + 76 + n * 36, 86);
        ctx.scale(s, s);
        ctx.font = "28px Bungee, sans-serif";
        ctx.textAlign = "left";
        if (on) {
          ctx.shadowColor = "#ff4d8d";
          ctx.shadowBlur = 18;
          ctx.fillStyle = "#fff1a8";
        } else {
          ctx.fillStyle = "#3a2418";
        }
        ctx.fillText(letter, 0, 0);
        ctx.shadowBlur = 0;
        ctx.fillStyle = on ? "#ffe14a" : "#6a4030";
        ctx.fillText(letter, 0, 0);
        ctx.restore();
      });
    });
    ctx.fillStyle = "#f6efe4";
    ctx.font = "16px Share Tech Mono, monospace";
    ctx.textAlign = "center";
    const city = match.court === "nyc" ? "New York playground" : "Detroit playground";
    ctx.fillStyle = "rgba(8, 10, 16, 0.88)";
    roundRect(160, 578, 960, 52, 10);
    ctx.fill();
    ctx.fillStyle = "#ffb020";
    ctx.font = "13px Bungee, sans-serif";
    ctx.fillText(city.toUpperCase(), W / 2, 598);
    wrapCall(match.call, W / 2, 618);

    if (!match.over && match.active === match.humanId && !match.ball && !match.pass) {
      const labels = [
        ["1  SPIN", "spin"],
        ["2  DUNK", "dunk"],
        ["3  FADE", "fade"],
        ["4  HOOK", "hook"],
      ];
      labels.forEach((item, i) => {
        const dunkFar = item[1] === "dunk" && !canDunk(match.pos[match.humanId].x, match.pos[match.humanId].y);
        button(40 + i * 180, 640, 168, 52, dunkFar ? "2  TOO FAR" : item[0], () => setFlair(item[1]), match.flair === item[1]);
      });
      button(780, 640, 460, 52, match.hold ? "RELEASE TO SHOOT" : "HOLD TO SET POWER", () => {
        if (!match.hold) {
          match.hold = true;
          match.power = 0;
          match.powerDir = 1;
        }
      }, match.hold, true);
    }

    if (match.hold) {
      ctx.fillStyle = "#1a120c";
      roundRect(1010, 180, 36, 280, 8);
      ctx.fill();
      const fill = match.power * 268;
      ctx.fillStyle = match.flair === "none" ? "#ffb020" : "#ff4d8d";
      ctx.fillRect(1016, 454 - fill, 24, fill);
      ctx.fillStyle = "#f6efe4";
      ctx.font = "14px Bungee, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("POWER", 1028, 486);
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
      if (ctx.measureText(next).width > 760) {
        lines.push(line);
        line = word;
      } else line = next;
    });
    if (line) lines.push(line);
    if (lines[0]) ctx.fillText(lines[0], x, y);
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
      const order = ["mamdani", "sayed"].sort((a, b) => match.pos[b].y - match.pos[a].y);
      order.forEach(drawPlayer);
      if (match.ball) {
        if (match.ball.t >= holdFor(match.ball.flair)) drawFlight();
      } else if (match.pass) {
        drawLoose(match.pass, match.pass.t * 1.4);
      } else if (match.owner && !match.hold) {
        const held = ownedBall(match.owner);
        drawBall(held.x, held.y, held.r, held.spin);
      } else if (match.trail.length) {
        match.trail.forEach((p, i) => {
          ctx.fillStyle = `rgba(200, 100, 56, ${(i + 1) / match.trail.length * 0.25})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
          ctx.fill();
        });
      }
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
    unlockAudio();
    canvas.focus();
    const p = pointerPos(ev);
    const b = hit(p.x, p.y);
    if (b) {
      b.action();
      pointer = { shoot: !!b.shoot };
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
    unlockAudio();
    if (ev.repeat) return;
    const k = ev.key.toLowerCase();
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
    if (!match || match.over) return;
    if ((k === " " || k === "j") && match.active === match.humanId && !match.ball && !match.pass && match.lock <= 0 && !match.hold) {
      match.hold = true;
      match.power = 0;
      match.powerDir = 1;
    }
    if (k === "1" || k === "q") setFlair("spin");
    if (k === "2" || k === "e") setFlair("dunk");
    if (k === "3" || k === "f") setFlair("fade");
    if (k === "4" || k === "r") setFlair("hook");
  });

  window.addEventListener("keyup", (ev) => {
    const k = ev.key.toLowerCase();
    keys.delete(k);
    if ((k === " " || k === "j") && match && match.hold) humanRelease();
  });

  function frame(now) {
    const dt = Math.min(0.033, (now - last) / 1000);
    last = now;
    update(dt);
    draw();
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
        { label: "Hold to shoot", key: " ", code: "Space", tone: "gold wide" },
      ],
    });
  }

  canvas.focus();
  requestAnimationFrame(frame);
})();
