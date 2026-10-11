(() => {
  const defaultTracks = [
    'freeze-the-rent-full-spectrum',
    'never-taken-a-dime-full-spectrum',
    'freeze-the-rent-robot-disco',
    'never-taken-a-dime-robot-disco',
    'freeze-the-rent-neon-synth',
    'never-taken-a-dime-neon-synth',
    'freeze-the-rent-sunset-house',
    'never-taken-a-dime-sunset-house',
    'freeze-the-rent-robot-sunset',
    'never-taken-a-dime-robot-sunset',
    'freeze-the-rent-neon-disco',
    'never-taken-a-dime-neon-disco'
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

