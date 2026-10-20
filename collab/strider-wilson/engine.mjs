export const W=600,H=900;
export const PASSES=[{x:125,y:686,name:'WELCOME TEAM'},{x:474,y:455,name:'VIP LOUNGE'},{x:145,y:250,name:'BACKSTAGE'}];
export const BLOCKS=[{x:210,y:565,w:180,h:26},{x:210,y:345,w:180,h:26}];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function create(){return {mode:'ready',t:0,p:{x:300,y:814,px:300,py:814,face:1,walk:0,moving:false},suspicion:0,passes:0,stamp:0,cooldown:0,blessing:0,blessed:0,notice:'',noticeT:0,guards:[{x:300,y:645,a:0,phase:0},{x:310,y:450,a:Math.PI,phase:2},{x:300,y:230,a:0,phase:4}],effects:[],score:0};}
export function start(g){if(g.mode==='ready')g.mode='play';}
export function bless(g){if(g.mode!=='play'||g.cooldown>0)return false;g.blessing=4;g.cooldown=5.5;g.blessed++;g.effects.push({x:g.p.x,y:g.p.y,t:1.2,text:'YOU LOOK BLESSED.'});let hit=0;for(const a of g.guards)if(Math.hypot(a.x-g.p.x,a.y-g.p.y)<190){a.distracted=3.4;hit++;}g.suspicion=Math.max(0,g.suspicion-(hit?28:8));g.notice=hit?'They’re busy receiving. Keep moving.':'Confidence restored. No one asked.';g.noticeT=2.4;return true;}
export function visible(a,p){const dx=p.x-a.x,dy=p.y-a.y,d=Math.hypot(dx,dy);return d<168&&(d<27||Math.cos(Math.atan2(dy,dx)-a.a)>.68);}
function valid(x,y){return x>=66&&x<=534&&y>=110&&y<=840&&!BLOCKS.some(b=>x>b.x-15&&x<b.x+b.w+15&&y>b.y-12&&y<b.y+b.h+15);}
export function step(g,input,dt=1/60){if(g.mode!=='play')return;dt=Math.min(dt,.04);g.t+=dt;g.cooldown=Math.max(0,g.cooldown-dt);g.blessing=Math.max(0,g.blessing-dt);g.noticeT=Math.max(0,g.noticeT-dt);g.p.px=g.p.x;g.p.py=g.p.y;let [dx,dy]=input||[0,0];const len=Math.hypot(dx,dy);if(len>1){dx/=len;dy/=len;}g.p.moving=len>.05;if(g.p.moving){const speed=145;let nx=g.p.x+dx*speed*dt,ny=g.p.y+dy*speed*dt;if(valid(nx,g.p.y))g.p.x=nx;if(valid(g.p.x,ny))g.p.y=ny;g.p.walk+=dt;if(Math.abs(dx)>.05)g.p.face=dx>0?1:-1;}
 let seen=0;g.guards.forEach((a,i)=>{a.distracted=Math.max(0,(a.distracted||0)-dt);const tx=300+Math.sin(g.t*.58+a.phase)*155;const vx=(tx-a.x);a.x+=clamp(vx,-75*dt,75*dt);if(Math.abs(vx)>1)a.a=vx>0?0:Math.PI;if(!a.distracted&&visible(a,g.p))seen++;});
 g.seen=seen>0;g.suspicion=clamp(g.suspicion+(seen?24*seen:-12)*dt,0,100);if(g.suspicion>=100){g.mode='lost';g.score=score(g);return;}
 const target=PASSES[g.passes];if(target&&Math.hypot(g.p.x-target.x,g.p.y-target.y)<43){g.stamp+=dt;if(g.stamp>=.65){g.passes++;g.stamp=0;g.suspicion=Math.max(0,g.suspicion-15);g.effects.push({x:target.x,y:target.y,t:1.6,text:['OF COURSE YOU’RE EXPECTED.','VIP? OBVIOUSLY.','THE SUIT CHECKS OUT.'][g.passes-1]});g.notice=g.passes===3?'All access. Take the stage.':'Next checkpoint is lit up.';g.noticeT=2.4;}}else g.stamp=0;
 if(g.passes===3&&Math.hypot(g.p.x-300,g.p.y-120)<30){g.mode='won';g.score=score(g);}
 for(const e of g.effects)e.t-=dt;g.effects=g.effects.filter(e=>e.t>0);
}
export function score(g){return Math.max(0,g.passes*400+(g.mode==='won'?1200:0)+Math.round(Math.max(0,100-g.t)*10)-g.blessed*25);}
