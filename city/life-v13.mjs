export const LIFE_KEY='pa-city-life-v1';
export const SLOTS=[{x:318,y:383,lane:393},{x:606,y:383,lane:393},{x:904,y:383,lane:393},{x:285,y:555,lane:574},{x:606,y:555,lane:574},{x:952,y:555,lane:574}];
export const PROGRAMS={
 homes:{verb:'Settling in',result:'households welcomed',programs:['Welcome home','Neighbors’ club','Community anchor'],wish:'A home base for every family.'},
 park:{verb:'Reading together',result:'reading afternoons',programs:['Open garden','Daily reading club','Neighborhood book festival'],wish:'Somewhere the kids can read outside.'},
 court:{verb:'Playing a pickup game',result:'pickup games',programs:['Open court','After-school league','Community tournament'],wish:'A court where everyone gets a turn.'},
 clinic:{verb:'Seeing the care team',result:'care visits',programs:['Drop-in care','Daily care team','Neighborhood health hub'],wish:'Care close to home, without a bill.'},
 kitchen:{verb:'Sharing a meal',result:'shared meals',programs:['Open table','Daily community supper','Neighborhood food festival'],wish:'A proper meal with our neighbors.'},
 fountain:{verb:'Meeting in the plaza',result:'plaza gatherings',programs:['Open plaza','Weekly block party','Neighborhood festival'],wish:'A place for the whole block to meet.'}
};
const families=[['Nia','Amara','Okafor'],['Luis','Mateo','Rivera'],['Avery','June','Brooks'],['Samira','Noor','Hassan'],['Derrick','Miles','Carter'],['Mei','Lily','Chen'],['Renee','Zoe','Williams'],['Eli','Theo','Bennett']];
const integer=(n,max=1e8)=>Number.isSafeInteger(n)&&n>=0&&n<=max;
export function freshLife(){return{version:1,spirit:0,blocks:{},events:[]};}
export function loadLife(storage){try{const s=JSON.parse(storage.getItem(LIFE_KEY));if(s?.version===1&&integer(s.spirit)&&s.blocks&&typeof s.blocks==='object'&&!Array.isArray(s.blocks)&&Array.isArray(s.events))return s;}catch{}return freshLife();}
export function syncBlock(life,block,index){
 let b=life.blocks[index];if(!b||typeof b!=='object'||Array.isArray(b))b=life.blocks[index]={};
 if(!Array.isArray(b.places))b.places=[];
 const used=new Set();b.places=block.lots.map((kind,i)=>{let p=b.places[i];if(!p||p.kind!==kind||!integer(p.slot,5)||used.has(p.slot)){const slot=[0,1,2,3,4,5].find(n=>!used.has(n));p={kind,slot,level:1,completed:0,construction:0};}used.add(p.slot);p.level=integer(p.level,3)&&p.level>0?p.level:1;p.completed=integer(p.completed)?p.completed:0;p.name=typeof p.name==='string'?p.name.slice(0,40):'';p.construction=Number.isFinite(p.construction)?Math.max(0,Math.min(12,p.construction)):0;return p;});
 b.focus=integer(b.focus,5)&&b.places.some(p=>p.slot===b.focus)?b.focus:null;
 b.hero=['sayed','organizer'].includes(b.hero)?b.hero:'organizer';
 if(!Array.isArray(b.residents))b.residents=[];
 // Identities are deterministic and persist. More developed homes welcome more households.
 const roster=[];for(const p of b.places.filter(p=>p.kind==='homes'))for(let n=0;n<p.level;n++)roster.push({id:'home-'+p.slot+'-'+n,homeSlot:p.slot});
 if(!roster.length)roster.push({id:'visitor-0',homeSlot:null},{id:'visitor-1',homeSlot:null});
 for(let n=0;n<2;n++)roster.push({id:'neighbor-'+n,homeSlot:null});
 b.residents=roster.map((def,i)=>{let r=b.residents.find(r=>r?.id===def.id),home=homePoint(def.homeSlot);if(!r||!Number.isFinite(r.x)||!Number.isFinite(r.y)||r.x<0||r.x>1200||r.y<0||r.y>800)r={...def,x:home.x,y:home.y,phase:'home',timer:i*2+1,visits:0,stop:null,route:[],leg:0};const f=families[(index*3+i)%families.length];r.name=f[2]+' household';r.parent=f[0];r.child=f[1];r.childArt=i%2?'boy':'girl';r.homeSlot=def.homeSlot;r.visits=integer(r.visits)?r.visits:0;r.timer=Number.isFinite(r.timer)?Math.max(0,r.timer):0;if(!['home','arrive','activity','return'].includes(r.phase))r.phase='home';if(!Array.isArray(r.route)||r.route.some(p=>!Number.isFinite(p?.x)||!Number.isFinite(p?.y))){r.phase='home';r.route=[];}r.leg=integer(r.leg,30)?r.leg:0;if(r.stop!==null&&!b.places.some(p=>p.slot===r.stop)){r.phase='home';r.stop=null;r.route=[];}return r;});return b;
}
export function homePoint(slot){return slot===null?{x:90,y:590}:{x:SLOTS[slot].x+65,y:SLOTS[slot].y+10};}
export function stopPoint(place,ordinal=0){const s=SLOTS[place.slot];return{x:s.x+(place.kind==='court'?-50:place.kind==='kitchen'?-40:-30)+(ordinal%2)*18,y:s.y-5+(ordinal%2)*8};}
export function makeRoute(start,end){const startLane=start.y<440?393:574,endLane=end.y<440?393:574;return startLane===endLane?[start,{x:start.x,y:startLane},{x:end.x,y:endLane},end]:[start,{x:start.x,y:startLane},{x:startLane<400?125:65,y:startLane},{x:endLane<400?125:65,y:endLane},{x:end.x,y:endLane},end];}
export function chooseStop(b,r){const open=b.places.filter(p=>!p.construction);if(!open.length)return null;const other=open.filter(p=>p.slot!==r.stop),pool=other.length?other:open;return pool.map(p=>({p,score:(p.slot===b.focus?8:0)+(p.kind==='homes'&&r.homeSlot===p.slot?1:2)-p.completed/(p.level*3)-b.residents.filter(a=>a.id!==r.id&&a.stop===p.slot&&a.phase!=='home').length*2+((r.visits+p.slot)%3)*.4})).sort((a,b)=>b.score-a.score)[0].p;}
export function serviceDuration(b,p){return Math.max(8,22-p.level*3-(b.focus===p.slot?(b.hero==='sayed'&&p.kind==='clinic'?7:4):0));}
function event(life,text){life.events.unshift({text});life.events=life.events.slice(0,8);}
export function construct(life,block,index,kind,slot){const b=syncBlock(life,block,index);const p=b.places.at(-1);if(!p||p.kind!==kind)return false;if(b.places.slice(0,-1).some(p=>p.slot===slot))return false;p.slot=slot;p.construction=12;event(life,'Supplies arrived. The crew is building your '+PROGRAMS[kind].programs[0].toLowerCase()+'.');return true;}
export function improve(life,b,slot){const p=b.places.find(p=>p.slot===slot),cost=p?.level*12;if(!p||p.construction||p.level>=3||life.spirit<cost)return false;life.spirit-=cost;p.level++;event(life,PROGRAMS[p.kind].programs[p.level-1]+' opened. More neighbors can take part.');return true;}
export function setFocus(b,slot,hero=b.hero){if(!b.places.some(p=>p.slot===slot&&!p.construction)||!['organizer','sayed'].includes(hero))return false;b.focus=slot;b.hero=hero;return true;}
export function stepLife(life,block,index,dt){
 const b=syncBlock(life,block,index);if(b.delivery)b.delivery.remaining=Math.max(0,(Number(b.delivery.remaining)||0)-dt);dt=Math.max(0,Math.min(dt,.1));let changed=false;
 for(const p of b.places)if(p.construction>0){p.construction=Math.max(0,p.construction-dt);if(!p.construction){changed=true;event(life,PROGRAMS[p.kind].programs[p.level-1]+' is open. The first neighbors are on their way.');}}
 for(const [i,r] of b.residents.entries()){
 if(r.phase==='home'){r.timer-=dt;if(r.timer<=0){const p=chooseStop(b,r);if(p){r.stop=p.slot;r.route=makeRoute({x:r.x,y:r.y},stopPoint(p,i));r.leg=1;r.phase='arrive';}else r.timer=2;}}
 else if(r.phase==='arrive'||r.phase==='return'){let distance=58*dt;while(distance>0&&r.leg<r.route.length){const end=r.route[r.leg],dx=end.x-r.x,dy=end.y-r.y,d=Math.hypot(dx,dy);if(dx!==0)r.flip=dx<0;if(d<=distance){r.x=end.x;r.y=end.y;distance-=d;r.leg++;}else{r.x+=dx/d*distance;r.y+=dy/d*distance;distance=0;}}if(r.leg>=r.route.length){if(r.phase==='arrive'){r.phase='activity';r.timer=0;}else{r.phase='home';r.timer=3;}}}
 else if(r.phase==='activity'){const p=b.places.find(p=>p.slot===r.stop);if(!p){r.phase='home';r.timer=1;continue;}r.timer+=dt;if(r.timer>=serviceDuration(b,p)){p.completed++;r.visits++;life.spirit=Math.min(1e8,life.spirit+1);changed=true;event(life,r.child+' and '+r.parent+' finished '+PROGRAMS[p.kind].verb.toLowerCase()+'. +1 community spirit.');r.route=makeRoute({x:r.x,y:r.y},homePoint(r.homeSlot));r.leg=1;r.phase='return';r.timer=0;}}
 }return changed;
}
export function activeGroups(b){return b.residents.map((r,i)=>{const p=b.places.find(p=>p.slot===r.stop),slot=p?.slot??r.homeSlot??3;return{key:r.id,kind:p?.kind??'homes',slotIndex:slot,offset:i*.7,home:homePoint(r.homeSlot),destination:p?stopPoint(p,i):homePoint(r.homeSlot),height:slot<3?41:46,activityKind:['court','fountain'].includes(p?.kind)?'none':p?.kind??'none',sibling:p?.level>=2,child:r.childArt,state:{x:r.x,y:r.y,moving:r.phase==='arrive'||r.phase==='return',phase:r.phase,flip:!!r.flip,age:r.timer},resident:r};});}
