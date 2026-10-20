import assert from'node:assert/strict';
import{create,start,step,bless,visible}from'../collab/strider-wilson/engine.mjs';
assert.equal(visible({x:0,y:0,a:0},{x:100,y:0}),true);
assert.equal(visible({x:0,y:0,a:0},{x:-100,y:0}),false);
assert.equal(visible({x:0,y:0,a:0},{x:180,y:0}),false);
let g=create();step(g,[1,0]);assert.equal(g.p.x,300);start(g);
g.p.x=300;g.p.y=610;for(let i=0;i<60;i++)step(g,[0,-1]);assert.ok(g.p.y>=605,'Velvet rope blocks movement');
g.p.x=300;g.p.y=645;g.suspicion=60;assert.equal(bless(g),true);assert.equal(bless(g),false);assert.ok(g.guards[0].distracted>0);assert.equal(g.suspicion,32);
g.mode='paused';let t=g.t;step(g,[1,0]);assert.equal(g.t,t);
for(const fps of[30,60,120]){g=create();start(g);const route=[[125,814],[125,686],[125,625],[475,625],[475,455],[475,405],[125,405],[125,250],[300,250],[300,120]];for(const[x,y]of route){for(let i=0;i<fps*20&&g.mode==='play';i++){let dx=x-g.p.x,dy=y-g.p.y,d=Math.hypot(dx,dy);if(d<4){for(let j=0;j<fps*.75;j++)step(g,[0,0],1/fps);break;}if(g.seen&&g.cooldown===0)bless(g);step(g,[dx/d,dy/d],1/fps);}}assert.equal(g.mode,'won',`route playable at ${fps}fps`);assert.equal(g.passes,3);assert.ok(g.score>2000);}
g=create();start(g);for(let i=0;i<3000&&g.mode==='play';i++){g.p.x=g.guards[0].x+45;g.p.y=g.guards[0].y;step(g,[0,0]);}assert.equal(g.mode,'lost','Ignoring ushers can end the run');
console.log('Strider engine: sightlines, rope collision, blessing cooldown, pause, failure, and complete routes at 30/60/120fps passed.');
