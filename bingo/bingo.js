(function () {
  const POOL = [
    "THAT'S A LIE", 'FLIP-FLOP', 'CARBON TAX', 'GAS PRICES', 'OPEN BORDERS', 'RADICAL LEFT',
    'SOCIALIST', 'DEFUND THE POLICE', 'BIDEN ECONOMY', 'WOKE', 'CHINA', 'INFLATION',
    'CRIME WAVE', 'EV MANDATE', 'BERNIE', 'TAX HIKE', 'FAKE NEWS', 'TARIFFS ARE GREAT',
    '"NOT WELL THOUGHT THROUGH"', 'SANCTUARY CITIES', 'GREEN NEW DEAL', 'MEDICARE FOR ALL',
    'COMMON SENSE', 'THE SQUAD', 'UNION GUY NOW', 'PROJECT 2025? NEVER HEARD OF IT',
    'BACK THE BLUE', 'DRILL BABY DRILL', 'HE WANTS YOUR GUNS', 'KITCHEN TABLE'
  ];
  const FREE = 'FREE: TRUMP SAID IT';
  const ROUND_SECONDS = 75;
  const LINES = (() => {
    const l = [];
    for (let i = 0; i < 5; i++) {
      l.push([0, 1, 2, 3, 4].map(j => i * 5 + j));
      l.push([0, 1, 2, 3, 4].map(j => j * 5 + i));
    }
    l.push([0, 6, 12, 18, 24], [4, 8, 12, 16, 20]);
    return l;
  })();
  const SPRITES = {
    celebrate: { src: 'assets/sayed-celebrate.webp', fw: 203, fh: 256, cols: 7, frames: 48 },
    shocked: { src: 'assets/sayed-shocked.webp', fw: 218, fh: 256, cols: 7, frames: 48 }
  };

  const $ = id => document.getElementById(id);
  const screens = { title: $('title-screen'), game: $('game'), end: $('end-screen') };
  const cardEl = $('card');
  let state = null;

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function show(name) {
    for (const [k, el] of Object.entries(screens)) {
      el.hidden = k !== name;
      el.classList.toggle('shown', k === name);
    }
  }

  function newCard() {
    const words = shuffle(POOL.slice()).slice(0, 24);
    words.splice(12, 0, FREE);
    return words;
  }

  function renderCard() {
    cardEl.innerHTML = '';
    state.card.forEach((word, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'sq' + (state.dabbed[i] ? ' dab' : '') + (i === 12 ? ' free' : '');
      b.textContent = word;
      b.setAttribute('role', 'gridcell');
      b.setAttribute('aria-pressed', state.dabbed[i] ? 'true' : 'false');
      b.addEventListener('click', () => tap(i, b));
      cardEl.appendChild(b);
    });
  }

  function start(mode) {
    state = {
      mode, card: newCard(), dabbed: Array(25).fill(false), score: 0, combo: 0, bestCombo: 0,
      lines: new Set(), dabs: 0, misses: 0, wrong: 0, ball: null, ballOnCard: false, ballDabbed: false,
      ballStart: 0, ballLen: 2600, endAt: 0, raf: 0, timer: 0, over: false
    };
    state.dabbed[12] = true;
    show('game');
    $('caller').hidden = mode === 'live';
    $('live-note').hidden = mode !== 'live';
    $('new-card').hidden = mode !== 'live';
    document.querySelector('.hud').hidden = mode === 'live';
    renderCard();
    updateHud();
    if (mode === 'arcade') {
      state.endAt = performance.now() + ROUND_SECONDS * 1000;
      $('ball').textContent = 'Get ready';
      state.timer = setTimeout(nextBall, 900);
      state.raf = requestAnimationFrame(tick);
    }
  }

  function nextBall() {
    if (!state || state.over) return;
    if (state.ball && state.ballOnCard && !state.ballDabbed) {
      state.combo = 0;
      state.misses++;
      pop('MISSED', 'bad');
    }
    const open = state.card.map((w, i) => (state.dabbed[i] ? null : w)).filter(Boolean);
    const offCard = POOL.filter(w => !state.card.includes(w));
    const fromCard = open.length && (Math.random() < 0.68 || !offCard.length);
    const word = fromCard ? open[Math.floor(Math.random() * open.length)] : offCard[Math.floor(Math.random() * offCard.length)];
    state.ball = word;
    state.ballOnCard = fromCard;
    state.ballDabbed = false;
    state.ballStart = performance.now();
    const elapsed = ROUND_SECONDS * 1000 - (state.endAt - state.ballStart);
    state.ballLen = Math.max(1300, 2600 - elapsed / 60);
    const ball = $('ball');
    ball.textContent = word;
    ball.classList.remove('drop');
    void ball.offsetWidth;
    ball.classList.add('drop');
    state.timer = setTimeout(nextBall, state.ballLen);
  }

  function tick(now) {
    if (!state || state.over) return;
    const left = Math.max(0, state.endAt - now);
    $('time').textContent = Math.ceil(left / 1000);
    if (state.ball) {
      const f = Math.max(0, 1 - (now - state.ballStart) / state.ballLen);
      $('fuse').style.transform = 'scaleX(' + f.toFixed(3) + ')';
    }
    if (left <= 0) return finish(false);
    state.raf = requestAnimationFrame(tick);
  }

  function tap(i, el) {
    if (!state || state.over || i === 12 || state.dabbed[i]) return;
    if (state.mode === 'live') {
      state.dabbed[i] = true;
      el.classList.add('dab');
      el.setAttribute('aria-pressed', 'true');
      checkLines();
      return;
    }
    if (state.ball && state.card[i] === state.ball && !state.ballDabbed) {
      const speed = Math.max(0, 1 - (performance.now() - state.ballStart) / state.ballLen);
      state.combo++;
      state.bestCombo = Math.max(state.bestCombo, state.combo);
      const mult = Math.min(3, 1 + 0.25 * (state.combo - 1));
      const pts = Math.round((100 + 100 * speed) * mult);
      state.score += pts;
      state.dabs++;
      state.dabbed[i] = true;
      state.ballDabbed = true;
      el.classList.add('dab');
      el.setAttribute('aria-pressed', 'true');
      pop('+' + pts, 'good', el);
      checkLines();
      if (state.dabbed.every(Boolean)) return finish(true);
      clearTimeout(state.timer);
      state.timer = setTimeout(nextBall, 380);
    } else {
      state.score = Math.max(0, state.score - 50);
      state.combo = 0;
      state.wrong++;
      el.classList.remove('shake');
      void el.offsetWidth;
      el.classList.add('shake');
      pop('-50', 'bad', el);
      hero('shocked', 900);
    }
    updateHud();
  }

  function checkLines() {
    let fresh = 0;
    LINES.forEach((line, n) => {
      if (!state.lines.has(n) && line.every(i => state.dabbed[i])) {
        state.lines.add(n);
        fresh++;
      }
    });
    if (fresh) {
      if (state.mode === 'arcade') state.score += 500 * fresh;
      line(fresh);
    }
  }

  function line(count) {
    pop(count > 1 ? 'DOUBLE BINGO!' : 'BINGO!', 'bingo');
    hero('celebrate', 1800);
    updateHud();
  }

  function updateHud() {
    $('score').textContent = state.score.toLocaleString();
    $('combo').textContent = 'x' + Math.min(3, 1 + 0.25 * Math.max(0, state.combo - 1)).toFixed(2).replace(/\.?0+$/, '');
  }

  let popTimer = 0;
  function pop(text, kind, near) {
    const p = $('pop');
    p.textContent = text;
    p.className = 'pop show ' + kind;
    if (near) {
      const r = near.getBoundingClientRect();
      const g = screens.game.getBoundingClientRect();
      p.style.left = (r.left - g.left + r.width / 2) + 'px';
      p.style.top = (r.top - g.top) + 'px';
    } else {
      p.style.left = '50%';
      p.style.top = '45%';
    }
    clearTimeout(popTimer);
    popTimer = setTimeout(() => { p.className = 'pop'; }, kind === 'bingo' ? 1400 : 650);
  }

  let heroAnim = 0;
  function hero(name, ms) {
    const s = SPRITES[name];
    const h = $('hero');
    cancelAnimationFrame(heroAnim);
    h.style.backgroundImage = 'url(' + s.src + ')';
    h.style.width = s.fw * 0.6 + 'px';
    h.style.height = s.fh * 0.6 + 'px';
    h.style.backgroundSize = (s.cols * s.fw * 0.6) + 'px auto';
    h.classList.add('show');
    const t0 = performance.now();
    const step = now => {
      const f = Math.floor((now - t0) / (1000 / 24)) % s.frames;
      h.style.backgroundPosition = -(f % s.cols) * s.fw * 0.6 + 'px ' + -Math.floor(f / s.cols) * s.fh * 0.6 + 'px';
      if (now - t0 < ms) heroAnim = requestAnimationFrame(step);
      else h.classList.remove('show');
    };
    heroAnim = requestAnimationFrame(step);
  }

  function stop() {
    if (!state) return;
    state.over = true;
    clearTimeout(state.timer);
    cancelAnimationFrame(state.raf);
  }

  function finish(blackout) {
    if (state.over) return;
    const left = Math.max(0, Math.ceil((state.endAt - performance.now()) / 1000));
    stop();
    if (blackout) state.score += 2000 + left * 50;
    $('final-score').textContent = state.score.toLocaleString();
    $('final-stats').textContent = (blackout ? 'BLACKOUT! ' : '') + state.lines.size + (state.lines.size === 1 ? ' bingo' : ' bingos') +
      ' · ' + state.dabs + ' dabs · best combo ' + state.bestCombo + ' · ' + state.misses + ' missed';
    $('end-head').textContent = blackout ? 'Blackout!' : state.lines.size ? 'Bingo!' : 'Time!';
    $('board-status').textContent = '';
    $('initials-form').hidden = state.score <= 0;
    show('end');
    renderBoard('board-end', 'board-scope-end');
    setTimeout(() => $('initials').focus(), 50);
  }

  async function renderBoard(listId, scopeId) {
    const ol = $(listId);
    const { rows, scope } = await PABoard.top(10);
    $(scopeId).textContent = scope;
    ol.innerHTML = '';
    if (!rows.length) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.textContent = 'No scores yet. Be the first.';
      ol.appendChild(li);
      return;
    }
    rows.forEach(r => {
      const li = document.createElement('li');
      const a = document.createElement('span');
      a.textContent = r.initials;
      const b = document.createElement('strong');
      b.textContent = Number(r.score).toLocaleString();
      li.append(a, b);
      ol.appendChild(li);
    });
  }

  $('initials-form').addEventListener('submit', async e => {
    e.preventDefault();
    const v = $('initials').value;
    if (!/^[A-Za-z]{3}$/.test(v)) {
      $('board-status').textContent = 'Use three letters.';
      return;
    }
    $('initials-form').hidden = true;
    try {
      const where = await PABoard.submit(v, state.score, state.lines.size);
      $('board-status').textContent = where === 'everyone' ? 'Saved to the global board.' : 'Saved on this device.';
    } catch (err) {
      $('board-status').textContent = "Couldn't reach the global board. Your score is saved on this device.";
    }
    renderBoard('board-end', 'board-scope-end');
  });

  $('share').addEventListener('click', async () => {
    const text = 'I scored ' + state.score.toLocaleString() + ' at MAGA Bingo (' + state.lines.size + ' bingos). Beat me:';
    const url = 'https://politicalarcades.com/bingo/';
    try {
      if (navigator.share) await navigator.share({ title: 'MAGA Bingo', text, url });
      else {
        await navigator.clipboard.writeText(text + ' ' + url);
        $('board-status').textContent = 'Copied. Paste it anywhere.';
      }
    } catch (err) { /* share cancelled */ }
  });

  $('play-arcade').addEventListener('click', () => start('arcade'));
  $('play-live').addEventListener('click', () => start('live'));
  $('again').addEventListener('click', () => start(state ? state.mode : 'arcade'));
  $('new-card').addEventListener('click', () => start('live'));
  $('quit').addEventListener('click', () => { stop(); show('title'); renderBoard('board-title', 'board-scope'); });
  $('to-title').addEventListener('click', () => { show('title'); renderBoard('board-title', 'board-scope'); });
  $('initials').addEventListener('input', e => { e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, ''); });

  renderBoard('board-title', 'board-scope');
})();
