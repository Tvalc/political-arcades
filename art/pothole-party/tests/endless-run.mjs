import assert from 'node:assert/strict';
import {createGame,step,advanceWork,REPAIR_MS,DISTRICT_SCORE,turn} from '../src/engine.mjs';
import {LEVELS} from '../src/levels.mjs';
function approach(g,p){
 assert(p,'target exists');const h={x:p.x===0?1:p.x-1,y:p.y};g.dir=p.x===0?'left':'right';g.queue=[];
 const cells=[];for(let y=0;y<g.size;y++)for(let x=0;x<g.size;x++)if(!(x===p.x&&y===p.y)&&!(x===h.x&&y===h.y))cells.push({x,y});
 g.body=g.crew.map((w,i)=>({...w,...(i?cells[i-1]:h)}));
}
for(let leader=0;leader<3;leader++){
 const g=createGame(16,()=>.43,leader,LEVELS[0]);
 for(let n=0;n<60;n++){
  const districtBefore=g.levelIndex,scoreBefore=g.score;approach(g,g.site);assert.equal(step(g),'need-supply');
  approach(g,g.food);assert.equal(step(g),'supply');const site={...g.site};approach(g,site);assert.equal(step(g),'drop');
  assert.equal(g.status,'playing');assert(g.food||g.pendingLevel);assert(g.assigned<6);assert(g.site||g.pendingLevel);
  if(n===0){advanceWork(g,500);approach(g,site);assert.equal(step(g),'early');assert.equal(g.score,0);approach(g,site);assert.equal(step(g),'drop');}
  const p=g.jobs.find(j=>!j.open).progress;g.status='paused';advanceWork(g,50000);assert.equal(g.jobs.find(j=>!j.open).progress,p);g.status='playing';advanceWork(g,REPAIR_MS);
  assert.equal(g.score,scoreBefore+100);assert.equal(g.repairs,n+1);assert.equal(g.status,'playing');
  const crossing=(n+1)%15===0;
  if(crossing){assert(g.pendingLevel);assert.equal(g.food,null);assert.equal(g.site,null);assert.equal(g.levelIndex,districtBefore);assert.equal(g.jobs.length,1);}
  const crewIds=g.crew.map(w=>w.uid),elapsed=g.elapsed;approach(g,site);assert.equal(step(g),'pickup');assert.equal(g.status,'playing');assert.equal(g.crew[0].id,leader);
  assert(crewIds.every(uid=>g.crew.some(w=>w.uid===uid)));assert.equal(g.elapsed,elapsed);assert.equal(g.score,(n+1)*100);
  if(crossing){assert.equal(g.levelIndex,((n+1)/15)%3);assert.equal(g.stage,(n+1)/15);assert.equal(g.nextLevelAt,(g.stage+1)*DISTRICT_SCORE);assert(!g.pendingLevel);assert(g.food&&g.site);assert.equal(g.patches.length,0);assert(g.events.some(e=>e.type==='district'));}
  else{assert.equal(g.levelIndex,districtBefore);if(n%15>=5)assert.equal(g.patches.length,6);}
  assert.equal(g.crew.length+g.growth.length,3+n+1);assert.equal(new Set([...g.crew,...g.growth].map(w=>w.uid)).size,4+n);g.events=[];
 }
 assert.equal(g.score,6000);assert.equal(g.stage,4);g.body[0]={...g.body[0],x:15,y:0};g.dir='right';g.queue=[];assert.equal(step(g),'lost');assert.equal(g.score,6000);assert.equal(g.status,'lost');
}
// Crossing a threshold with several outstanding workers never discards them.
const g=createGame(16,()=>.5,0,LEVELS[0]);g.score=1400;g.repairs=14;g.jobs=[{x:10,y:10,task:0,worker:g.crew[1],progress:0,ready:false},{x:12,y:12,task:1,worker:g.crew[2],progress:0,ready:false}];g.crew=[g.crew[0]];g.body=[g.body[0]];
advanceWork(g,REPAIR_MS);assert.equal(g.score,1600);assert(g.pendingLevel);approach(g,g.jobs[0]);assert.equal(step(g),'pickup');assert.equal(g.levelIndex,0);assert(g.pendingLevel);approach(g,g.jobs[0]);assert.equal(step(g),'pickup');assert.equal(g.levelIndex,1);assert.equal(g.score,1600);assert.equal(g.crew.length+g.growth.length,5);assert.equal(g.nextLevelAt,3000);
console.log('Passed: all leaders, 60 repairs, four seamless transitions, continued jobs after six repairs, persistent score/crew/growth/time, threshold waits for every worker, pause and early pickup, death-only run ending.');
