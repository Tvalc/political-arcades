import assert from'node:assert/strict';
import{create,start,step,bless,visible,SIGHT}from'../collab/strider-wilson/engine.mjs';
assert.equal(visible({x:0,y:0,a:0},{x:100,y:0}),true);
assert.equal(visible({x:0,y:0,a:0},{x:-100,y:0}),false);
assert.equal(visible({x:0,y:0,a:0},{x:130,y:0}),false);
assert.equal(visible({x:0,y:0,a:0},{x:70,y:70}),false,'Narrow cones leave real space');
assert.equal(SIGHT.range,125);
function move(g,x,y,fps=60){for(let i=0;i<fps*15&&g.mode==='play';i++){let dx=x-g.p.x,dy=y-g.p.y,d=Math.hypot(dx,dy);if(d<.1)return;step(g,[dx/Math.max(d,145/fps),dy/Math.max(d,145/fps)],1/fps);}}
function hold(g,seconds,fps=60,spam=false){for(let i=0;i<fps*seconds&&g.mode==='play';i++){if(spam)bless(g);step(g,[0,0],1/fps);}}
let g=create();step(g,[1,0]);assert.equal(g.p.x,300);start(g);
move(g,300,610);hold(g,1);for(let i=0;i<60;i++)step(g,[0,-1]);assert.ok(g.p.y>=605,'Velvet rope blocks movement');
g=create();start(g);g.p.x=300;g.p.y=700;g.suspicion=60;assert.equal(bless(g),true);assert.equal(bless(g),false);assert.ok(g.guards[0].distracted>0);assert.equal(g.suspicion,60,'Blessing never erases heat');assert.equal(g.cooldown,9);
g.mode='paused';let t=g.t;step(g,[1,0]);assert.equal(g.t,t);
const cleanRoute=[[85,814],[85,686],[85,535],[515,535],[515,455],[515,320],[105,320],[105,250],[105,150],[300,150],[300,120]];
for(const fps of[30,60,120]){g=create();start(g);for(const[x,y]of cleanRoute){move(g,x,y,fps);hold(g,.72,fps);}assert.equal(g.mode,'won',`Wall and cross-lane route playable at ${fps}fps`);assert.equal(g.passes,3);assert.equal(g.totalSeen,0,'Entire run possible without touching a cone');assert.equal(g.blessed,0,'Stealth does not require blessing');assert.ok(g.score>3000);console.log(`${fps}fps: clean win, ${g.t.toFixed(2)}s, zero exposure, no blessings.`);
 g=create();start(g);move(g,390,814,fps);move(g,390,645,fps);hold(g,10,fps);assert.equal(g.mode,'lost','Standing in a cone loses naturally');assert.equal(g.cause,'You stayed in sight too long.');assert.ok(g.totalSeen<1.7);
 g=create();start(g);move(g,390,814,fps);move(g,390,645,fps);hold(g,15,fps,true);assert.equal(g.mode,'lost','Spamming blessings cannot grant immunity');
 g=create();start(g);move(g,355,814,fps);move(g,355,645,fps);hold(g,10,fps);assert.equal(g.mode,'lost','Colliding with a patrolling usher ends the run');assert.equal(g.cause,'You walked into an usher.');
}
g=create();start(g);g.suspicion=60;g.lastSeen=2;hold(g,1);assert.equal(g.suspicion,60,'Heat persists while they remember you');hold(g,2);assert.ok(g.suspicion<60&&g.suspicion>=54.8,'Recovery is slow after a delay');
console.log('Stealth v3: real unseen route, exposure and collision losses, blessing limits, heat memory, pause, rope collision passed.');
