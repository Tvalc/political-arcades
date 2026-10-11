import {drawActor,actorsReady} from './actors-v6.mjs?v=6.4';
import {drawResident,drawProp,onSpritesReady} from '/city/makko-sprites.mjs';
import {REPAIR_MS} from './snake-engine.mjs?v=6.4';
export const BOARD={x:104,y:164,w:560,h:512};
const bg=new Image();bg.src=new URL('./campus-v6.webp',import.meta.url).href;
const station=new Image();station.src=new URL('./station-v6.webp',import.meta.url).href;
const palette={gold:'#f6c454',green:'#3cca9a',dark:'#173b3e',cream:'#fff4d7',red:'#d36555'};
export const point=p=>({x:BOARD.x+(p.x+.5)*BOARD.w/16,y:BOARD.y+(p.y+.5)*BOARD.h/16});
function pill(c,text,x,y,color=palette.cream,size=12){c.save();c.font=`800 ${size}px system-ui`;c.textAlign='center';const w=c.measureText(text).width+18;c.fillStyle='#163334ed';c.beginPath();c.roundRect(x-w/2,y-size,w,size+9,6);c.fill();c.fillStyle=color;c.fillText(text,x,y+2);c.restore();}
function shadow(c,x,y,width=13){c.fillStyle='#4f402c35';c.beginPath();c.ellipse(x,y,width,4,0,0,Math.PI*2);c.fill();}
function glasses(c,x,y,scale=1,color=palette.gold){c.save();c.translate(x,y);c.scale(scale,scale);c.strokeStyle=color;c.lineWidth=3;c.lineJoin='round';c.beginPath();c.roundRect(-14,-6,11,10,3);c.roundRect(3,-6,11,10,3);c.moveTo(-3,-3);c.quadraticCurveTo(0,-5,3,-3);c.moveTo(-14,-3);c.lineTo(-18,-5);c.moveTo(14,-3);c.lineTo(18,-5);c.stroke();c.restore();}
function marker(c,p,state,t,progress=0,labelScale=1){const{x,y}=point(p),ready=state==='ready',working=state==='working',color=ready?palette.green:state==='open'?palette.red:palette.gold;
 shadow(c,x,y+10,18);c.fillStyle=ready?'#3cca9a36':'#ffde783d';c.beginPath();c.ellipse(x,y+7,22,13,0,0,Math.PI*2);c.fill();
 c.strokeStyle=color;c.lineWidth=3;c.beginPath();c.ellipse(x,y+7,21,13,0,0,Math.PI*2);c.stroke();
 if(station.complete&&station.naturalWidth){const h=46,w=h*station.naturalWidth/station.naturalHeight,left=x-w/2,top=y-h+12;c.save();c.beginPath();const pts=[[.055,.29],[.50,.017],[.927,.28],[.959,.94],[.79,.979],[.57,.958],[.26,.923],[.054,.911]];pts.forEach(([a,b],i)=>i?c.lineTo(left+w*a,top+h*b):c.moveTo(left+w*a,top+h*b));c.closePath();c.clip();c.drawImage(station,left,top,w,h);c.restore();}else{c.fillStyle='#187f7d';c.beginPath();c.moveTo(x-20,y-20);c.lineTo(x,y-31);c.lineTo(x+20,y-20);c.closePath();c.fill();c.fillStyle='#fff0c7';c.fillRect(x-15,y-7,30,6);c.fillStyle='#246b65';c.fillRect(x-14,y-5,3,18);c.fillRect(x+11,y-5,3,18);}
 if(working){c.fillStyle='#164c46';c.beginPath();c.roundRect(x-23,y-48,46,12,5);c.fill();c.fillStyle=palette.gold;c.beginPath();c.roundRect(x-20,y-45,40*progress,6,3);c.fill();pill(c,Math.max(0,(REPAIR_MS*(1-progress)/1000)).toFixed(1)+'s',x,y-55,palette.gold,16*labelScale);}
 else{const lift=ready?Math.sin(t*5)*2:Math.sin(t*3)*2;pill(c,ready?'PICK UP':state==='open'?'TRY AGAIN':'DROP OFF',x,y-42-lift,color,16*labelScale);if(ready){c.fillStyle='#174d41';c.beginPath();c.arc(x+17,y-11,9,0,Math.PI*2);c.fill();c.strokeStyle='#9cf6c4';c.lineWidth=2;c.beginPath();c.moveTo(x+12,y-11);c.lineTo(x+16,y-7);c.lineTo(x+22,y-15);c.stroke();}else glasses(c,x,y-13,.48,color);}
}
export function createScene(canvas){const resolution=Math.min(2,window.devicePixelRatio||1);canvas.width=Math.round(768*resolution);canvas.height=Math.round(768*resolution);const c=canvas.getContext('2d');c.setTransform(resolution,0,0,resolution,0,0);const effects=[],particles=[],faces=new Map();let death=0,labelScale=1;const resize=()=>{labelScale=Math.min(1.55,Math.max(1,600/(canvas.clientWidth||600)));};resize();new ResizeObserver(resize).observe(canvas);
 function event(e,time){const p=point(e);effects.push({...p,time,text:e.type==='repair'?'+100':e.type==='pickup'?'+1 CARE':e.type==='early'?'GIVE THEM TIME':'CREW AT WORK',kind:e.type});if(e.type==='repair'||e.type==='pickup')for(let i=0;i<14;i++){const a=i/14*Math.PI*2;particles.push({...p,vx:Math.cos(a)*(30+Math.random()*30),vy:Math.sin(a)*35-20,life:.8,color:i%2?palette.gold:palette.green});}}
 function draw(g,{previous,blend,time,dt,active,reduced,visits}){c.clearRect(0,0,768,768);c.save();if(death>0&&!reduced)c.translate(Math.sin(death*50)*death*3,0);death=Math.max(0,death-dt/500);
 if(bg.complete&&bg.naturalWidth)c.drawImage(bg,0,0,768,768);else{c.fillStyle='#dcccaa';c.fillRect(0,0,768,768);}
 c.fillStyle='#f6e8c30a';c.fillRect(BOARD.x,BOARD.y,BOARD.w,BOARD.h);
 c.strokeStyle='#b69a6970';c.lineWidth=1;for(let i=0;i<=16;i++){const x=BOARD.x+i*BOARD.w/16,y=BOARD.y+i*BOARD.h/16;c.beginPath();c.moveTo(x,BOARD.y);c.lineTo(x,BOARD.y+BOARD.h);c.moveTo(BOARD.x,y);c.lineTo(BOARD.x+BOARD.w,y);c.stroke();}
 c.strokeStyle='#2d6d669e';c.lineWidth=4;c.setLineDash([8,8]);c.strokeRect(BOARD.x,BOARD.y,BOARD.w,BOARD.h);c.setLineDash([]);
 // Ambient residents stay outside the playable route, so decorative people cannot be mistaken for collision targets.
 const life=Math.min(8,visits);for(let i=0;i<life;i++){const phase=(time*.035+i*.19)%1,x=72+(i%2)*628,y=205+phase*400;shadow(c,x,y,8);drawResident(c,x,y,i%3,time,i%3===0,31);}
 if(visits>=3){c.strokeStyle='#745c37';c.lineWidth=2;c.beginPath();c.moveTo(204,130);c.quadraticCurveTo(384,155,564,130);c.stroke();for(let i=0;i<12;i++){const x=214+i*29,y=132+Math.sin(i/11*Math.PI)*12;c.fillStyle=[palette.gold,'#61b8a3','#ee9b78'][i%3];c.beginPath();c.moveTo(x,y);c.lineTo(x+13,y);c.lineTo(x+6,y+14);c.fill();}}
 if(visits>=6){drawProp(c,1,79,650,52,35);drawProp(c,1,691,650,52,35);}if(visits>=12){drawProp(c,8,75,172,44,48);drawProp(c,8,698,172,44,48);}
 for(const p of g.patches.slice(-24)){const q=point(p);c.fillStyle='#42aa8525';c.beginPath();c.ellipse(q.x,q.y+6,12,7,0,0,Math.PI*2);c.fill();}
 if(g.food)marker(c,g.food,'new',reduced?0:time,0,labelScale);
 const actors=[];for(const j of g.jobs){marker(c,j,j.open?'open':j.ready?'ready':'working',reduced?0:time,j.progress/REPAIR_MS,labelScale);if(!j.open){const p=point(j);actors.push({...p,id:j.worker.id,feet:p.y+14,moving:false,flip:false,working:!j.ready,height:46,uid:j.worker.uid});}}
 const positions=g.body.map((p,i)=>{const before=previous.find(q=>q.uid===p.uid)||p,q=point({x:before.x+(p.x-before.x)*blend,y:before.y+(p.y-before.y)*blend});return{...q,feet:q.y+14,id:p.id,uid:p.uid,index:i,flip:(p.x===before.x?faces.get(p.uid):p.x<before.x)||false,height:i===0?54:48,moving:active};});
 c.strokeStyle='#15776b50';c.lineWidth=7;c.lineCap='round';c.lineJoin='round';c.beginPath();positions.forEach((p,i)=>i?c.lineTo(p.x,p.y+8):c.moveTo(p.x,p.y+8));c.stroke();
 const head=positions[0];if(head){c.strokeStyle='#fff6d5';c.lineWidth=3;c.beginPath();c.ellipse(head.x,head.y+12,17,9,0,0,Math.PI*2);c.stroke();if(g.body[0].x<=1||g.body[0].x>=14||g.body[0].y<=1||g.body[0].y>=14){c.strokeStyle='#d77f4790';c.lineWidth=4;c.beginPath();c.ellipse(head.x,head.y+12,21,12,0,0,Math.PI*2);c.stroke();}}
 positions.forEach(p=>faces.set(p.uid,p.flip));actors.push(...positions);actors.sort((a,b)=>a.feet-b.feet).forEach(p=>{shadow(c,p.x,p.feet,12);if(!drawActor(c,p.id,p.x,p.feet,reduced?0:time+p.uid*.11,p)){drawResident(c,p.x,p.feet,p.id,time,!p.moving,p.height);}if(p.working){glasses(c,p.x+10,p.feet-11,.3,'#fff0b9');}});
 for(let i=effects.length-1;i>=0;i--){const e=effects[i],age=time-e.time;if(age>1.3){effects.splice(i,1);continue;}c.save();c.globalAlpha=Math.min(1,(1.3-age)*2);const lift=reduced?0:age*24;pill(c,e.text,Math.max(BOARD.x+55,Math.min(BOARD.x+BOARD.w-55,e.x+(e.kind==='drop'?72:0))),e.y-76-lift,e.kind==='early'?'#ffc0a0':e.kind==='pickup'?'#9df5cd':palette.gold,13);if(!reduced){c.strokeStyle=e.kind==='early'?palette.red:palette.green;c.lineWidth=3;c.globalAlpha*=1-age/1.3;c.beginPath();c.ellipse(e.x,e.y+7,20+age*23,12+age*13,0,0,Math.PI*2);c.stroke();}c.restore();}
 for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.life-=dt/1000;if(p.life<=0){particles.splice(i,1);continue;}if(reduced)continue;p.x+=p.vx*dt/1000;p.y+=p.vy*dt/1000;p.vy+=50*dt/1000;c.globalAlpha=Math.min(1,p.life*2);c.fillStyle=p.color;c.beginPath();c.arc(p.x,p.y,2.3,0,Math.PI*2);c.fill();}c.globalAlpha=1;
 if(!active&&g.score===0){const p=point({x:8,y:8}),q=point(g.body[0]);c.strokeStyle='#21776b99';c.lineWidth=3;c.setLineDash([5,8]);c.beginPath();c.moveTo(q.x+20,q.y+12);c.lineTo(p.x-23,p.y+12);c.stroke();c.setLineDash([]);}
 pill(c,'SCHOOL OUTREACH / ROUTE '+(Math.floor(g.score/500)+1),384,735,palette.cream,13);c.restore();
 }
 const ready=Promise.all([bg.decode(),station.decode(),actorsReady()]);onSpritesReady(()=>{});
 return{draw,event,ready,crash(){death=1;},clear(){effects.length=particles.length=0;faces.clear();death=0;}};
}
