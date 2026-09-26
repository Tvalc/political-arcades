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
      body: "#3d5a80",
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
      body: "#c4493a",
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
    img.src = src;
    images[key] = img;
  }

  loadImage("nyc", "assets/nyc.webp");
  loadImage("detroit", "assets/detroit.webp");
  loadImage("face-mamdani", "assets/face-mamdani.webp");
  loadImage("face-sayed", "assets/face-sayed.webp");

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

  function unlockAudio() {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === "suspended") audioCtx.resume();
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
      pose: { mamdani: "idle", sayed: "idle" },
      jump: { mamdani: 0, sayed: 0 },
      lock: 0.2,
      call: `${home.full} calls the first shot.`,
      over: null,
      cpu: null,
      t: 0,
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
    const from = project(p.x, p.y);
    const to = project(HOOP.x, HOOP.y);
    match.ball = {
      x0: from.x,
      y0: from.y - 80,
      x1: to.x,
      y1: to.y - 46,
      t: 0,
      made,
      flair,
      id,
      sx: p.x,
      sy: p.y,
    };
    match.hold = false;
    match.pose[id] = flair === "none" ? "shot" : flair;
    match.jump[id] = 1;
    match.cpu = null;
    tone(made ? 620 : 180, 0.12, "square", 0.05);
  }

  function addLetter(id) {
    match.letters[id] += 1;
    const word = LETTERS.slice(0, match.letters[id]).join("");
    tone(220, 0.18, "sawtooth", 0.05);
    if (match.letters[id] >= 5) {
      const winner = otherId(id);
      match.over = winner;
      say(`${FIGHTERS[id].full} spells HORSE. ${FIGHTERS[winner].full} takes the court.`);
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
    if (match.phase === "set") {
      if (ball.made) {
        match.challenge = { x: ball.sx, y: ball.sy, flair: ball.flair };
        match.phase = "copy";
        match.active = otherId(id);
        const trick = FLAIR_NAME[ball.flair];
        say(`${name} sinks the ${trick}. ${FIGHTERS[match.active].name} has to copy the spot and the flair.`);
        tone(740, 0.08, "square", 0.04);
        setTimeout(() => tone(880, 0.1, "square", 0.04), 90);
      } else {
        match.challenge = null;
        match.phase = "set";
        match.active = otherId(id);
        say(`Off the iron. ${name}'s shot does not count. ${FIGHTERS[match.active].name} calls the next one.`);
        tone(140, 0.16, "triangle", 0.05);
      }
    } else {
      const spotOk = Math.hypot(ball.sx - match.challenge.x, ball.sy - match.challenge.y) < 0.11;
      const flairOk = ball.flair === match.challenge.flair;
      if (ball.made && spotOk && flairOk) {
        match.phase = "set";
        match.challenge = null;
        match.active = otherId(id);
        say(`Copied. ${FIGHTERS[match.active].name} calls a new shot.`);
        tone(760, 0.1, "square", 0.045);
      } else {
        const why = !spotOk
          ? "Wrong spot."
          : !flairOk
            ? `That was a ${FLAIR_NAME[ball.flair]}. Copy the ${FLAIR_NAME[match.challenge.flair]}.`
            : "Off the rim.";
        const word = addLetter(id);
        if (!match.over) {
          match.phase = "set";
          match.challenge = null;
          match.active = otherId(id);
          say(`${why} ${name} picks up ${word}. ${FIGHTERS[match.active].name} calls the next one.`);
        }
      }
    }
    match.flair = "none";
    match.power = 0;
    match.lock = 1.15;
    if (match.active === match.cpuId && !match.over) {
      match.cpu = null;
    }
  }

  function update(dt) {
    if (!match || screen !== "play") return;
    match.t += dt;
    for (const id of ["mamdani", "sayed"]) {
      if (match.jump[id] > 0) match.jump[id] = Math.max(0, match.jump[id] - dt * 0.85);
    }
    if (match.ball) {
      match.ball.t += dt / 0.72;
      if (match.ball.t >= 1) resolveBall();
      return;
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
      match.pose[id] = "shot";
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
      }
      return;
    }
    match.hold = true;
    match.power += dt * 0.72;
    match.pose[cpu.id] = "shot";
    if (match.power >= cpu.aim) {
      match.power = cpu.aim;
      release(cpu.id);
    }
  }

  function humanRelease() {
    if (!match || match.over || match.ball || match.lock > 0) return;
    if (match.active !== match.humanId || !match.hold) return;
    release(match.humanId);
  }

  function setFlair(id) {
    if (!match || match.ball || match.active !== match.humanId) return;
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
    button(W / 2 - 160, 420, 320, 64, "PICK A FIGHTER", () => {
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

  function drawCourt() {
    const nyc = match.court === "nyc";
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    if (nyc) {
      sky.addColorStop(0, "#1b2456");
      sky.addColorStop(0.45, "#c46a3a");
      sky.addColorStop(1, "#2a2118");
    } else {
      sky.addColorStop(0, "#2a1848");
      sky.addColorStop(0.42, "#e07a3a");
      sky.addColorStop(1, "#241810");
    }
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);
    if (nyc) drawBricks();
    else drawSkyline();
    drawFence();
    const near = project(0.5, 0.02);
    const far = project(0.5, 0.78);
    ctx.beginPath();
    const a = project(0.08, 0.74);
    const b = project(0.92, 0.74);
    const c = project(0.78, 0.08);
    const d = project(0.22, 0.08);
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(c.x, c.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(a.x, a.y);
    ctx.closePath();
    ctx.fillStyle = "#c4552a";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(project(0.5, 0.08).x, project(0.5, 0.08).y);
    ctx.lineTo(project(0.5, 0.74).x, project(0.5, 0.74).y);
    ctx.stroke();
    const key = [project(0.38, 0.74), project(0.62, 0.74), project(0.58, 0.5), project(0.42, 0.5)];
    ctx.beginPath();
    ctx.moveTo(key[0].x, key[0].y);
    key.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.stroke();
    void near;
    void far;
    drawHoop();
    if (match.challenge && match.phase === "copy") {
      const g = project(match.challenge.x, match.challenge.y);
      ctx.strokeStyle = "#ffb020";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(g.x, g.y, 28 + Math.sin(match.t * 5) * 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#ffb020";
      ctx.font = "14px Bungee, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(FLAIR_NAME[match.challenge.flair].toUpperCase(), g.x, g.y - 36);
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
    const h = project(HOOP.x, HOOP.y);
    ctx.fillStyle = "#d7d2c8";
    ctx.fillRect(h.x - 36, h.y - 78, 72, 48);
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 4;
    ctx.strokeRect(h.x - 36, h.y - 78, 72, 48);
    ctx.fillStyle = "#f08a24";
    ctx.fillRect(h.x - 4, h.y - 30, 8, 28);
    ctx.strokeStyle = "#e23b3b";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(h.x, h.y - 8, 26, 8, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.lineWidth = 1;
    for (let i = -2; i <= 2; i += 1) {
      ctx.beginPath();
      ctx.moveTo(h.x + i * 8, h.y - 6);
      ctx.lineTo(h.x + i * 5, h.y + 22);
      ctx.stroke();
    }
  }

  function drawPlayer(id) {
    const f = FIGHTERS[id];
    const p = match.pos[id];
    const at = project(p.x, p.y);
    const pose = match.pose[id];
    const jumping = match.jump[id];
    const moving = pose === "move";
    const bob = pose === "idle" || moving ? Math.abs(Math.sin(match.t * (moving ? 11 : 7))) * 5 : 0;
    const stride = moving ? Math.sin(match.t * 11) * 10 : 0;
    const lift = jumping * 54 * at.s;
    const face = images[id === "mamdani" ? "face-mamdani" : "face-sayed"];
    ctx.save();
    ctx.translate(at.x, at.y);
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath();
    ctx.ellipse(0, 4, 28 * at.s, 8 * at.s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.scale(at.s, at.s);
    ctx.translate(0, -lift + bob);
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

  function drawBall(x, y, r) {
    ctx.fillStyle = "#e07a2f";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#1a120c";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - r, y);
    ctx.lineTo(x + r, y);
    ctx.moveTo(x, y - r);
    ctx.lineTo(x, y + r);
    ctx.stroke();
  }

  function drawFlight() {
    const b = match.ball;
    const t = clamp(b.t, 0, 1);
    const x = b.x0 + (b.x1 - b.x0) * t;
    const arc = Math.sin(t * Math.PI) * (b.flair === "dunk" ? 40 : 160);
    const y = b.y0 + (b.y1 - b.y0) * t - arc;
    drawBall(x, y, b.flair === "dunk" && t > 0.75 ? 12 : 14);
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
        ctx.fillStyle = on ? "#ff4d8d" : "#efe6da";
        ctx.font = "28px Bungee, sans-serif";
        ctx.fillText(letter, x + 76 + n * 36, 86);
      });
    });
    ctx.fillStyle = "#f6efe4";
    ctx.font = "16px Share Tech Mono, monospace";
    ctx.textAlign = "center";
    const city = match.court === "nyc" ? "New York playground" : "Detroit playground";
    ctx.fillStyle = "rgba(8, 10, 16, 0.88)";
    roundRect(240, 128, 800, 52, 10);
    ctx.fill();
    ctx.fillStyle = "#ffb020";
    ctx.font = "15px Bungee, sans-serif";
    ctx.fillText(city.toUpperCase(), W / 2, 148);
    wrapCall(match.call, W / 2, 168);

    if (!match.over && match.active === match.humanId && !match.ball) {
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
    lines.slice(0, 2).forEach((row, i) => ctx.fillText(row, x, y + i * 22));
  }

  function draw() {
    buttons.length = 0;
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    if (screen === "title") drawTitle();
    else if (screen === "select") drawSelect();
    else {
      drawCourt();
      const order = ["mamdani", "sayed"].sort((a, b) => match.pos[b].y - match.pos[a].y);
      order.forEach(drawPlayer);
      if (match.ball) drawFlight();
      drawHud();
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
    if (screen === "play" && match && match.active === match.humanId && !match.ball && !match.over) {
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
    if ((k === " " || k === "j") && match.active === match.humanId && !match.ball && match.lock <= 0 && !match.hold) {
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

  canvas.focus();
  requestAnimationFrame(frame);
})();
