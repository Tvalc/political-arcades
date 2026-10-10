import {SITE_POINTS,LEVELS} from '/art/pothole-party/src/levels.mjs';
export const DIRS={up:[0,-1],right:[1,0],down:[0,1],left:[-1,0]};
export const REPAIR_MS=4200;
export const DISTRICT_SCORE=1500;
const same=(a,b)=>a.x===b.x&&a.y===b.y;
function stamp(g){g.body.forEach((p,i)=>Object.assign(p,g.crew[i]));}
export function createGame(size=16,rng=Math.random,leader=0,level=null){
 const mid=Math.floor(size/2),x=Math.min(5,size-1);
 const g={size,rng,body:[{x,y:mid},{x:x-1,y:mid},{x:x-2,y:mid}],crew:[0,1,2].map(n=>({id:(leader+n)%3,uid:n})),nextUid:3,dir:'right',queue:[],score:0,repairs:0,status:'playing',food:null,jobs:[],patches:[],events:[],growth:[],elapsed:0};
 g.level=level;g.levelIndex=level?LEVELS.findIndex(l=>l.id===level.id):0;g.stage=0;g.nextLevelAt=DISTRICT_SCORE;g.pendingLevel=false;g.districtRepairs=0;g.districtDeliveries=0;g.cargo=0;g.assigned=0;g.delivered=0;g.site=level?{...SITE_POINTS[0]}:null;stamp(g);spawn(g);if(level&&size===16)g.food={x:7,y:8};if(!level&&size===16)g.food={x:8,y:8};return g;
}
export function spawn(g){
 if(g.level&&g.pendingLevel){g.food=null;return;}

 const free=[];for(let y=1;y<g.size-1;y++)for(let x=1;x<g.size-1;x++){const p={x,y};if(!g.body.some(b=>same(b,p))&&!g.jobs.some(j=>same(j,p))&&(!g.site||!same(g.site,p)))free.push(p);}
 g.food=free.length?free[Math.floor(g.rng()*free.length)]:null;
 if(!g.level&&!g.food&&!g.jobs.length)g.status='won';
}
function nextSite(g){
 const free=[];for(let y=1;y<g.size-1;y++)for(let x=1;x<g.size-1;x++){const p={x,y};if(!g.body.some(b=>same(b,p))&&!g.jobs.some(j=>same(j,p))&&(!g.food||!same(g.food,p)))free.push(p);}
 const preferred=g.districtDeliveries<SITE_POINTS.length?SITE_POINTS[g.assigned]:null;
 return preferred&&free.some(p=>same(p,preferred))?{...preferred}:free.length?free[Math.floor(g.rng()*free.length)]:null;
}
function travel(g){
 if(!g.level||!g.pendingLevel||g.jobs.length)return;
 g.levelIndex=(g.levelIndex+1)%LEVELS.length;g.level=LEVELS[g.levelIndex];g.stage++;g.nextLevelAt+=DISTRICT_SCORE;g.pendingLevel=false;g.districtRepairs=0;g.districtDeliveries=0;g.assigned=0;g.cargo=0;g.patches=[];g.food=null;g.site=nextSite(g);spawn(g);
 g.events.push({type:'district',levelIndex:g.levelIndex,stage:g.stage,x:g.body[0].x,y:g.body[0].y});
}
export function turn(g,d){if(!DIRS[d]||g.status!=='playing'||g.queue.length>=2)return false;const previous=g.queue.at(-1)||g.dir;const a=DIRS[previous],b=DIRS[d];if(previous===d||a[0]+b[0]===0&&a[1]+b[1]===0)return false;g.queue.push(d);return true;}
export function advanceWork(g,dt){
 if(g.status!=='playing')return;g.elapsed+=Math.max(0,dt);
 for(const j of g.jobs){if(j.ready||j.open)continue;j.progress=Math.min(REPAIR_MS,j.progress+Math.max(0,dt));if(j.progress>=REPAIR_MS){j.ready=true;g.repairs++;g.districtRepairs++;g.score+=100;if(!g.patches.some(p=>p.task===j.task))g.patches.push({x:j.x,y:j.y,task:j.task});g.events.push({type:'repair',x:j.x,y:j.y,worker:j.worker,task:j.task});if(g.level&&!g.pendingLevel&&g.score>=g.nextLevelAt){g.pendingLevel=true;g.site=null;g.food=null;g.cargo=0;g.events.push({type:'unlock',levelIndex:(g.levelIndex+1)%LEVELS.length,x:j.x,y:j.y});}}}
 travel(g);
}
export function step(g){
 if(g.status!=='playing')return 'idle';g.dir=g.queue.shift()||g.dir;
 const[dx,dy]=DIRS[g.dir],h={x:g.body[0].x+dx,y:g.body[0].y+dy};
 const job=g.jobs.find(j=>!j.open&&same(j,h)),grow=g.growth.length>0;
 const occupied=grow||job?g.body:g.body.slice(0,-1);
 if(h.x<0||h.y<0||h.x>=g.size||h.y>=g.size||occupied.some(p=>same(p,h))){g.status='lost';return 'lost';}
 const oldTail={...g.body.at(-1)};g.body.unshift(h);g.body.pop();let event='move';
 if(grow){g.crew.push(g.growth.shift());g.body.push(oldTail);}
 if(job){
  if(grow){g.growth.unshift(g.crew.pop());g.body.pop();}
  g.crew.push(job.worker);g.body.push(oldTail);g.jobs.splice(g.jobs.indexOf(job),1);
  if(job.ready){g.growth.push({id:3,uid:g.nextUid++});event='pickup';}
  else{g.jobs.push({x:job.x,y:job.y,open:true,progress:0,worker:null,task:job.task});event='early';}
  g.events.push({type:event,x:h.x,y:h.y,worker:job.worker,task:job.task});
 }else{
  const open=g.jobs.find(j=>j.open&&same(j,h));
  if(g.level&&g.food&&same(g.food,h)){g.cargo=1;g.food=null;event='supply';g.events.push({type:'supply',x:h.x,y:h.y});}
  const atSite=g.level&&g.site&&same(g.site,h);
  if((!g.level&&g.food&&same(g.food,h))||open||atSite){
   if(atSite&&!g.cargo&&!open){event='need-supply';g.events.push({type:event,x:h.x,y:h.y});}
   else 
   if(g.crew.length>1){const worker=g.crew.splice(1,1)[0];g.body.pop();if(open)g.jobs.splice(g.jobs.indexOf(open),1);const task=open?open.task:g.assigned;g.jobs.push({x:h.x,y:h.y,worker,progress:0,ready:false,task});if(g.level&&!open){g.cargo=0;g.delivered++;g.districtDeliveries++;g.assigned=(g.assigned+1)%g.level.jobs.length;g.site=nextSite(g);spawn(g);}else if(g.food&&same(g.food,h))spawn(g);event='drop';g.events.push({type:event,x:h.x,y:h.y,worker,task});}
   else{event='empty';g.events.push({type:event,x:h.x,y:h.y});}
  }
 }
 stamp(g);if(g.level){if(!g.pendingLevel&&!g.site){g.site=nextSite(g);if(!g.food&&!g.cargo)spawn(g);}travel(g);}else if(!g.food&&!g.jobs.length)spawn(g);return event;
}

