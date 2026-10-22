/* High score board. Always keeps a board in this browser.
   Fill in a Supabase project URL and its public anon key to switch on the global board
   (table setup: bingo_scores, see the setup notes kept outside the site). */
(function () {
  const GLOBAL = { url: '', key: '' };
  const LOCAL_KEY = 'pa-bingo-scores-v1';
  const MAX_SCORE = 40000;

  const isGlobal = () => Boolean(GLOBAL.url && GLOBAL.key);

  function readLocal() {
    try { return JSON.parse(localStorage.getItem(LOCAL_KEY)) || []; } catch (e) { return []; }
  }
  function writeLocal(rows) {
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(rows)); } catch (e) { /* private mode */ }
  }
  function cleanInitials(s) {
    return String(s || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3);
  }

  async function globalTop(limit) {
    const res = await fetch(GLOBAL.url + '/rest/v1/bingo_scores?select=initials,score,created_at&order=score.desc,created_at.asc&limit=' + limit, {
      headers: { apikey: GLOBAL.key, Authorization: 'Bearer ' + GLOBAL.key }
    });
    if (!res.ok) throw new Error('board ' + res.status);
    return res.json();
  }
  async function globalSubmit(row) {
    const res = await fetch(GLOBAL.url + '/rest/v1/bingo_scores', {
      method: 'POST',
      headers: { apikey: GLOBAL.key, Authorization: 'Bearer ' + GLOBAL.key, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(row)
    });
    if (!res.ok) throw new Error('submit ' + res.status);
  }

  window.PABoard = {
    scope: () => (isGlobal() ? 'everyone' : 'this device'),
    async top(limit = 10) {
      if (isGlobal()) {
        try { return { rows: await globalTop(limit), scope: 'everyone' }; } catch (e) { /* fall back below */ }
      }
      return { rows: readLocal().slice(0, limit), scope: 'this device' };
    },
    async submit(initials, score, lines) {
      const row = { initials: cleanInitials(initials), score: Math.max(0, Math.min(MAX_SCORE, Math.round(score))), lines: lines | 0 };
      if (row.initials.length !== 3) throw new Error('initials');
      const local = readLocal();
      local.push({ ...row, created_at: new Date().toISOString() });
      local.sort((a, b) => b.score - a.score);
      writeLocal(local.slice(0, 25));
      if (isGlobal()) {
        await globalSubmit(row);
        return 'everyone';
      }
      return 'this device';
    }
  };
})();
