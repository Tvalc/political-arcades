// Calibration of existing Talarico art. Ball and body share logical frames.
(() => {
  const actor = window.VoteExtraClips.talarico;
  function sequence(key, order) {
    const clip = actor[key], feet = clip.feet;
    clip.frameOrder = order;
    clip.frames = order.length;
    clip.feet = order.map(frame => feet[frame]);
    clip.loopStart = 0;
    clip.loopEnd = order.length - 1;
    return clip;
  }
  const dribble = sequence('dribble', [26, 28, 31, 34, 31, 28]);
  dribble.hands = [[.77,.60],[.79,.60],[.80,.61],[.80,.61],[.80,.61],[.79,.60]];
  dribble.pace = 2;
  dribble.fps = 12;
  const move = sequence('move', [34,35,36,37,38,39,40,41,42,43,44,45,46,47]);
  move.hands = [[.64,.57],[.68,.53],[.73,.47],[.79,.42],[.83,.39],[.84,.38],[.85,.40],[.82,.44],[.76,.51],[.67,.59],[.62,.64],[.64,.65],[.68,.62],[.75,.56]];
  // Stay on the forward-facing run; the old four-second loop turned him around.
  move.strideDistance = .22;
  move.pace = 2;
  function shooting(key, order, release, keys) {
    const clip = sequence(key, order);
    clip.releaseFrame = release;
    clip.releaseHand = keys.find(k => k[0] === release).slice(1);
    clip.emptyHands = true;
    clip.handKeys = keys;
    clip.play = order.length - 1;
    return clip;
  }
  shooting('shot', [14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], 14,
    [[0,.72,.66],[2,.77,.55],[4,.80,.43],[6,.80,.32],[8,.76,.22],[10,.73,.13],[14,.69,.07]]);
  shooting('dunk', [8,7,6,5,4,3,2,1,0,0,1,2,3,4,5,6,7,8], 8,
    [[0,.76,.65],[2,.81,.49],[4,.81,.32],[6,.74,.12],[8,.70,.025]]);
  // Avoid the stray baked-in balls in the latter half of the hook/fade atlases.
  shooting('fade', [18,17,16,15,14,13,11,10,9,8,7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18], 17,
    [[0,.75,.65],[4,.86,.44],[6,.80,.29],[8,.76,.18],[12,.73,.08],[17,.71,.025]]);
  shooting('hook', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 3,
    [[0,.14,.20],[1,.23,.065],[2,.31,.035],[3,.33,.025]]);
  actor.dunk.authoredLift = true;
  actor.dunk.alignReleaseFoot = true;
  actor.fade.authoredLift = true;
  const spin = sequence('spin', [0,5,8,11,14,16,18,19]);
  spin.emptyHands = true;
  spin.handKeys = [[0,.30,.46],[1,.49,.56],[2,.67,.52],[3,.67,.47],[4,.65,.46],[5,.62,.49],[6,.49,.59],[7,.56,.39]];
  spin.releaseFrame = 7;
  spin.turnOnly = true;
})();
