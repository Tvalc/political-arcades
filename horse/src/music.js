(() => {
  const defaultTracks = [
    '01-freeze-the-rent', '02-shouldnt-be-this-hard', '03-hope-is-alive',
    '04-this-city-belongs-to-you', '05-turn-the-volume-up', '06-town-hall',
    '07-never-taken-a-dime', '08-ive-got-receipts', 'freeze-the-rent-block-party', 'this-city-belongs-to-you-after-hours',
    'shouldnt-be-this-hard-soul-court', '11-expansively', 'keep-the-lights-on-love-everyone', 'keep-the-lights-on-neighbors-not-donors', 'fine-print-receipts', 'fine-print-read-the-bill', 'bill-for-breathing-money-in-your-pocket', 'bill-for-breathing-no-copay', 'bill-for-breathing-people-before-paperwork', 'bill-for-breathing-doctor-on-the-block', 'rent-due-rent-freeze', 'rent-due-landlord-sweating', 'rent-due-keys-to-the-city', 'rent-due-stay-on-the-block'
  ];
  let tracks = defaultTracks, poolKey = '';
  const audio = document.createElement('audio');
  audio.id = 'game-music';
  audio.preload = 'none';
  audio.volume = 0.45;
  document.body.appendChild(audio);
  let enabled = false, paused = false, bag = [], current = null;
  const failed = new Set();
  function next() {
    if (!bag.length) {
      bag = tracks.filter(track => !failed.has(track));
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
      if (bag.length > 1 && bag[bag.length - 1] === current) {
        [bag[0], bag[bag.length - 1]] = [bag[bag.length - 1], bag[0]];
      }
    }
    current = bag.pop();
    if (current) audio.src = `assets/music/${current}.mp3`;
    return Boolean(current);
  }
  function sync() {
    if (!enabled || paused || document.hidden) { audio.pause(); return; }
    if (!current && !next()) return;
    if (audio.paused) audio.play().catch(() => {});
  }
  audio.addEventListener('ended', () => { if (next()) sync(); });
  audio.addEventListener('error', () => {
    if (!current) return;
    failed.add(current);
    bag = bag.filter(track => !failed.has(track));
    if (next()) sync();
  });
  document.addEventListener('visibilitychange', sync);
  window.VoteMusic = { setCourt(court,preview=false) {
    const chosen = court && window.VoteSongs ? [...(window.VoteSongs.starter ? [window.VoteSongs.starter(court).track] : []),...window.VoteSongs.slots(court,preview).filter(s=>s.unlocked).map(s=>s.track)] : defaultTracks;
    if (court) chosen.push(...defaultTracks.filter(track => /^(rent-due-|bill-for-breathing-|fine-print-|keep-the-lights-on-)/.test(track)));
    const key = `${court || 'menu'}:${chosen.join(',')}`;
    if(key===poolKey)return;poolKey=key;tracks=chosen;bag=[];
    if(!tracks.includes(current)){audio.pause();current=null;audio.removeAttribute?.('src');audio.load?.();}
    sync();
  }, setState(on, stopped) { enabled = on; paused = stopped; sync(); } };
})();

