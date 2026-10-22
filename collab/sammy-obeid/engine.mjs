export const W=600,H=720;
export const LEVELS=[
 {name:"A'S FIRE",subtitle:'This was supposed to be a math lesson.',fires:4,embers:2,interval:10,growth:1.8,limit:75},
 {name:"B'S FIRE",subtitle:'The problem has multiplied.',fires:5,embers:4,interval:8,growth:2.3,limit:85},
 {name:'CEASE-FIRE',subtitle:'Put every last argument out.',fires:6,embers:5,interval:6.5,growth:2.7,limit:95}
];
export const PADS=[{x:68,y:626},{x:532,y:626}];
export const DESKS=[{x:192,y:286,w:72,h:38},{x:336,y:446,w:72,h:38}];
const SPOTS=[{x:110,y:186},{x:300,y:178},{x:490,y:186},{x:110,y:380},{x:300,y:366},{x:490,y:380},{x:174,y:536},{x:426,y:536}];
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export function createGame(seed=31415){return {seed,phase:'intro',stage:0,time:0,stageTime:0,player:{x:300,y:620,vx:0,vy:0,hp:5,water:100,inv:0,face:1,action:'idle',anim:0},fires:[],score:0,totalOut:0,combo:0,lastOut:-99,charge:0,burstCd:0,spawn:0,embers:0,eventId:0,events:[],target:null,spraying:false,refilling:false,transition:0,hot:0};}
function rnd(s){s.seed=(Math.imul(s.seed,1664525)+1013904223)>>>0;return s.seed/4294967296;}
function event(s,type,x,y,text=''){s.events.push({id:++s.eventId,type,x,y,text,time:s.time});if(s.events.length>45)s.events.shift();}
function loadStage(s){const l=LEVELS[s.stage];s.stageTime=0;s.spawn=l.interval;s.embers=l.embers;s.target=null;s.spraying=false;s.fires=SPOTS.map((p,i)=>({...p,id:i,heat:i<l.fires?48+i*6:0,seal:0,warning:0,letter:i%2?'B':'A',flash:0}));Object.assign(s.player,{x:300,y:620,vx:0,vy:0,water:100,inv:1,action:'idle',anim:0});event(s,'stage',300,120,l.name);}
export function start(s){s.phase='play';loadStage(s);}
function out(s,f){f.heat=0;f.seal=13;s.totalOut++;s.combo=s.time-s.lastOut<6?s.combo+1:1;s.lastOut=s.time;const pts=100+Math.min(s.combo-1,4)*25;s.score+=pts;s.charge=Math.min(5,s.charge+1);event(s,'out',f.x,f.y,`+${pts}`);}
function move(s,dt,input){const p=s.player;let x=input.x||0,y=input.y||0,n=Math.hypot(x,y);if(n>1){x/=n;y/=n;}const speed=s.spraying?154:215;const a=1-Math.exp(-17*dt);p.vx+=(x*speed-p.vx)*a;p.vy+=(y*speed-p.vy)*a;let nx=clamp(p.x+p.vx*dt,43,557),ny=clamp(p.y+p.vy*dt,152,652);for(const r of DESKS){if(nx>r.x-21&&nx<r.x+r.w+21&&p.y>r.y-14&&p.y<r.y+r.h+15){nx=p.x;p.vx=0;}if(nx>r.x-21&&nx<r.x+r.w+21&&ny>r.y-14&&ny<r.y+r.h+15){ny=p.y;p.vy=0;}}p.x=nx;p.y=ny;}
export function step(s,dt,input={}){if(s.phase!=='play')return;dt=Math.min(dt,.04);s.time+=dt;s.stageTime+=dt;const p=s.player;p.inv=Math.max(0,p.inv-dt);s.burstCd=Math.max(0,s.burstCd-dt);
 if(s.transition>0){s.transition-=dt;p.action='victory';p.anim+=dt;if(s.transition<=0){s.stage++;if(s.stage>=LEVELS.length){s.phase='won';event(s,'win',300,300,'CLASS DISMISSED');}else loadStage(s);}return;}
 const l=LEVELS[s.stage];if(s.stageTime>=l.limit){s.phase='lost';event(s,'lose',p.x,p.y,'THE BELL RANG');return;}s.refilling=PADS.some(v=>distance(p,v)<49);if(s.refilling)p.water=Math.min(100,p.water+58*dt);
 for(const f of s.fires){f.seal=Math.max(0,f.seal-dt);f.flash=Math.max(0,f.flash-dt);if(f.warning>0){f.warning-=dt;if(f.warning<=0&&f.heat===0){f.heat=44;event(s,'ignite',f.x,f.y,'NEW FIRE');}}if(f.heat>0)f.heat=clamp(f.heat+l.growth*dt,0,100);}
 const candidates=s.fires.filter(f=>f.heat>0&&distance(p,f)<172).sort((a,b)=>distance(p,a)-distance(p,b));s.target=candidates[0]?.id??null;s.spraying=!!input.spray&&s.target!==null&&p.water>0;
 if(input.burst&&s.charge>=5&&s.burstCd<=0){s.charge=0;s.burstCd=1;event(s,'burst',p.x,p.y,'CEASE-FIRE!');for(const f of s.fires){if(f.heat>0){f.heat-=38;if(f.heat<=0)out(s,f);}f.warning=0;f.seal=Math.max(f.seal,4);}}
 if(s.spraying){const f=s.fires[s.target];if(f&&f.heat>0){p.face=f.x>=p.x?1:-1;f.heat-=43*dt;p.water=Math.max(0,p.water-13*dt);f.flash=.1;if(f.heat<=0)out(s,f);}}
 else if(Math.abs(input.x||0)>.07)p.face=input.x>0?1:-1;
 move(s,dt,input);
 let hurt=false;for(const f of s.fires){if(f.heat<=0)continue;const radius=23+f.heat*.17;if(distance(p,f)<radius+11&&p.inv<=0){p.hp--;p.inv=1.4;p.vx+=(p.x-f.x)*4;p.vy+=(p.y-f.y)*4;s.combo=0;event(s,'hurt',p.x,p.y,'OUCH');hurt=true;if(p.hp<=0){s.phase='lost';event(s,'lose',p.x,p.y,'BACK TO THE DRAWING BOARD');}}}
 const action=p.inv>.85?'hurt':Math.hypot(p.vx,p.vy)>18?'walk':s.spraying?'spray':'idle';if(action!==p.action){p.action=action;p.anim=0;}else p.anim+=dt;
 s.spawn-=dt;if(s.spawn<=0&&s.embers>0){const cold=s.fires.filter(f=>f.heat<=0&&f.warning<=0&&f.seal<=0);if(cold.length){const f=cold[Math.floor(rnd(s)*cold.length)];f.warning=2;s.embers--;s.spawn=l.interval;event(s,'warning',f.x,f.y,'SPARK INCOMING');}else s.spawn=1;}
 s.hot=s.fires.filter(f=>f.heat>0).length;
 if(!s.hot&&!s.fires.some(f=>f.warning>0)&&s.phase==='play'){s.score+=Math.round(p.water)*2+300;s.embers=0;s.transition=2.6;p.anim=0;p.action='victory';event(s,'clear',300,320,'THE MATH CHECKS OUT');}
}
