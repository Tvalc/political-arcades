import assert from'node:assert/strict';
import{createGame,start,step,distance,LEVELS,PADS,DESKS}from'../collab/sammy-obeid/engine.mjs';
function safe(x,y,s){return x>43&&x<557&&y>152&&y<652&&!DESKS.some(r=>x>r.x-26&&x<r.x+r.w+26&&y>r.y-20&&y<r.y+r.h+20)&&!s.fires.some(f=>f.heat>0&&Math.hypot(x-f.x,y-f.y)<66);}
export function bot(s){const p=s.player,live=s.fires.filter(f=>f.heat>0).sort((a,b)=>distance(p,a)-distance(p,b));let refill=p.water<15||(s._refilling&&p.water<97);s._refilling=refill;if(!refill&&live.some(f=>distance(p,f)<158&&distance(p,f)>67))return{spray:true,burst:s.charge>=5};
 const nx=22,ny=21,point=i=>({x:48+(i%nx)*24,y:156+Math.floor(i/nx)*24}),index=(x,y)=>Math.round((y-156)/24)*nx+Math.round((x-48)/24);let start=index(p.x,p.y),queue=[start],prev=new Map([[start,-1]]),end=null;
 for(let h=0;h<queue.length;h++){const at=queue[h],q=point(at);if(refill?PADS.some(v=>distance(q,v)<30):live.some(f=>distance(q,f)<142&&distance(q,f)>80)){end=at;break;}for(const [dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){let x=at%nx+dx,y=Math.floor(at/nx)+dy;if(x<0||x>=nx||y<0||y>=ny)continue;const j=y*nx+x;if(prev.has(j))continue;const v=point(j);if(!safe(v.x,v.y,s))continue;prev.set(j,at);queue.push(j);}}
 if(end===null)return{};while(prev.get(end)!==start&&prev.get(end)!==-1)end=prev.get(end);const q=point(end),dx=q.x-p.x,dy=q.y-p.y,n=Math.hypot(dx,dy);return{x:n>3?dx/n:0,y:n>3?dy/n:0,spray:!refill,burst:s.charge>=5};}

for(const fps of[30,60,120]){const s=createGame();start(s);for(let i=0;i<fps*280&&s.phase==='play';i++)step(s,1/fps,bot(s));console.log(fps,s.phase,s.stage,s.time.toFixed(2),s.score,s.player.hp,s.totalOut);assert.equal(s.phase,'won','Competent player can clear all lessons');assert.ok(s.totalOut>=15);assert.ok(s.player.water>=0&&s.player.water<=100);}
{const s=createGame();start(s);for(let i=0;i<60*76;i++)step(s,1/60,{});assert.equal(s.phase,'lost','Idle player loses when bell rings');}
{const s=createGame();start(s);s.player.x=300;s.player.y=278;const before=s.fires[1].heat;for(let i=0;i<60;i++)step(s,1/60,{spray:true});assert.ok(s.fires[1].heat<before,'Spray cools in-range fire');assert.ok(s.player.water<100);s.player.x=68;s.player.y=626;const water=s.player.water;for(let i=0;i<30;i++)step(s,1/60,{});assert.ok(s.player.water>water,'Tap replenishes water');}
{const s=createGame();start(s);s.charge=5;step(s,1/60,{burst:true});assert.ok(s.fires[0].heat<20,'Charged burst cools entire board');assert.equal(s.charge,0);}
{const s=createGame();start(s);s.player.x=s.fires[0].x;s.player.y=s.fires[0].y;s.player.inv=0;step(s,1/60,{});assert.equal(s.player.hp,4,'Fire collision damages player');for(let i=0;i<30;i++)step(s,1/60,{});assert.equal(s.player.hp,4,'Invulnerability prevents frame-by-frame damage');}
console.log('Sammy firefighting mechanics PASS');
