import {fresh,valid,move,work,STOPS,N,WORK} from './engine.mjs';
import {drawCrew,drawResident,drawProp,onSpritesReady} from '/city/makko-sprites.mjs';
import {loadCity,award,KEY} from '/shared/city-state.mjs?v=outreach1';
const $=id=>document.getElementById(id),canvas=$('map'),c=canvas.getContext('2d'),ROUTE='pa-outreach-route-v1',BOX='pa-outreach-rewards-v1';
let storage;try{storage=localStorage;}catch{}let state=fresh();try{const s=JSON.parse(storage?.getItem(ROUTE));if(valid(s))state=s;}catch{}
let pending=[];try{const p=JSON.parse(storage?.getItem(BOX));if(Array.isArray(p))pending=p.filter(i=>Number.isInteger(i)&&i>=0&&i<3);}catch{}
let direction=null,clock=0,last=performance.now(),time=0,paused=false,storyPaused=false,moving=false,saveFailure=false,doneBefore=state.jobs.every(j=>j.phase==='done');
const hero=new Image(),facades=new Image();hero.src='/horse/assets/sprites/chibi/sayed-move.webp';facades.src='/art/housing-stack/facades-v3.webp';
function sync(){for(let i=0;i<3;i++)if(state.jobs[i].phase==='done'&&!pending.includes(i))pending.push(i);try{if(!storage)throw Error('storage');storage.setItem(BOX,JSON.stringify(pending));const city=loadCity(storage);for(const i of pending)award(city,{id:'outreach-intro-v1-stop-'+i,type:'outreach:stop',count:1});storage.setItem(KEY,JSON.stringify(city));storage.setItem(BOX,'[]');pending=[];saveFailure=false;}catch{saveFailure=true;}status();}
function save(){try{if(!storage)throw Error('storage');storage.setItem(ROUTE,JSON.stringify(state));}catch{saveFailure=true;}status();}
function status(){$('save').textContent=saveFailure?'Saving unavailable. Keep this tab open; weâ€™ll retry after the next stop.':'Saved on this device Â· first completion of each stop earns 1 care for your city.';}
function say(who,text){$('speaker').textContent=who;$('line').textContent=text;}
function update(){const done=state.jobs.filter(j=>j.phase==='done').length;$('count').textContent=done+' / 3';$('progress').replaceChildren(...state.jobs.map((j,i)=>{const el=document.createElement('span');el.className=j.phase==='done'?'done':'';el.textContent=['Reading room','Library corner','After-school room'][i]+' Â· '+({waiting:'visit',working:Math.round(j.work/WORK*100)+'%',ready:'pick up',done:'complete'}[j.phase]);return el;}));
if(done===3){$('tip').textContent='Three stops complete. The students are back to their day. Visit your city or keep practicing.';if(!doneBefore){doneBefore=true;say('TONY Â· WITH THE CREW','A clearer view. More reading. And nobody had to sit through my slideshow.');}}}
function action(d){if(paused||storyPaused||!d)return;const event=move(state,d);moving=event.type!=='bump';if(event.type==='bump'){$('tip').textContent='Give the crew some roomâ€”turn another way. Nothing is lost.';direction=null;return;}
if(event.type==='drop'){$('tip').textContent='Crew is working. Loop around and collect them when the ring turns green.';say('BLOCK CAPTAIN Â· ORGANIZER','The provider crew handles the eye care. We keep the route moving.');}
if(event.type==='early'){$('tip').textContent='Picked up early. Return to this stop to finish the outreach.';say('YOUNGER ORGANIZER','They werenâ€™t finished yet. We can come backâ€”everybody still gets their turn.');}
if(event.type==='needcrew'){$('tip').textContent='Collect a finished crew member before starting another stop.';}
if(event.type==='complete'){say('EL-SAYED Â· WITH THE CREW','That stop is complete. Letâ€™s bring the team to the next one.');$('tip').textContent='Outreach complete. +1 care on your first completion. Find the next glowing stop.';sync();}
save();update();}
function pause(value){paused=value;direction=null;moving=false;$('paused').hidden=!value;$('pause').textContent=value?'Resume':'Pause';last=performance.now();}
$('pause').onclick=()=>pause(!paused);$('resume').onclick=()=>pause(false);
function history(){direction=null;storyPaused=true;$('history').showModal();}function close(){$('history').close();}
$('story').onclick=history;$('close').onclick=close;$('continue').onclick=close;$('history').addEventListener('close',()=>{storyPaused=false;last=performance.now();});
$('again').onclick=()=>{sync();state=fresh();doneBefore=false;direction=null;save();update();$('tip').textContent='Practice route ready. Head right to the first stop. Earned city care stays yours.';say('TONY Â· BACK ON THE ROUTE','Same crew. Another practice shift.');};
const keydir={ArrowUp:'up',ArrowRight:'right',ArrowDown:'down',ArrowLeft:'left',w:'up',d:'right',s:'down',a:'left'};
function choose(d){if(paused||storyPaused)return;direction=d;clock=0;action(d);}
window.addEventListener('keydown',e=>{if(e.target.matches('button,a,summary')&&e.key===' ')return;const d=keydir[e.key]||keydir[e.key.toLowerCase()];if(d){e.preventDefault();if(!e.repeat)choose(d);}else if(e.key===' '&&!storyPaused){e.preventDefault();pause(!paused);}});
window.addEventListener('keyup',e=>{if((keydir[e.key]||keydir[e.key.toLowerCase()])===direction){direction=null;moving=false;}});
window.addEventListener('blur',()=>{if(!storyPaused)pause(true);});document.addEventListener('visibilitychange',()=>{if(document.hidden)pause(true);});
const stick=$('stick'),knob=$('knob');let pointer=null;
function point(e){const box=stick.getBoundingClientRect(),dx=e.clientX-box.left-box.width/2,dy=e.clientY-box.top-box.height/2,mag=Math.hypot(dx,dy),scale=Math.min(1,23/Math.max(1,mag));knob.style.transform=`translate(${dx*scale}px,${dy*scale}px)`;const d=mag<13?null:Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up';if(d!==direction){if(d)choose(d);else direction=null;}}
stick.addEventListener('pointerdown',e=>{if(pointer!==null)return;e.preventDefault();pointer=e.pointerId;stick.setPointerCapture(pointer);point(e);});stick.addEventListener('pointermove',e=>{if(e.pointerId===pointer)point(e);});
function release(e){if(e.pointerId!==pointer)return;pointer=null;direction=null;moving=false;knob.style.transform='';}for(const name of ['pointerup','pointercancel','lostpointercapture'])stick.addEventListener(name,release);
  for(const button of stick.querySelectorAll('button'))button.addEventListener('click',e=>{if(e.detail===0){choose(button.dataset.dir);direction=null;moving=false;}});
function text(s,x,y,color='#f9f0d7',size=14){c.fillStyle=color;c.font=`700 ${size}px system-ui`;c.textAlign='center';c.fillText(s,x,y);}
function tile(image,id,x,y,w,h){if(!image.complete||!image.naturalWidth)return;c.drawImage(image,id%3*256,Math.floor(id/3)*256,256,256,x,y,w,h);}
function person(p,id,active=true,height=54){const x=p.x*60+30,y=p.y*60+56;if(id===0&&hero.complete&&hero.naturalWidth){const f=moving?Math.floor(time*9)%10:0;c.save();c.translate(x,y);if(direction==='left')c.scale(-1,1);c.drawImage(hero,f%4*159,Math.floor(f/4)*256,159,256,-height*159/256/2,-height,height*159/256,height);c.restore();}else drawCrew(c,x,y,id-1,time,active?'carry':'build',height);}
function render(){c.clearRect(0,0,720,720);c.fillStyle='#446e58';c.fillRect(0,0,720,720);
for(let y=0;y<N;y++)for(let x=0;x<N;x++){c.fillStyle=(x+y)%2?'#c6c7b6':'#d1d0bd';c.fillRect(x*60+1,y*60+1,58,58);}c.fillStyle='#273e4d';c.fillRect(0,0,720,65);text('SCHOOL OUTREACH  /  COMMUNITY CREW',360,42,'#bce8d5',17);
for(const [i,j]of state.jobs.entries()){const x=j.x*60+30,y=j.y*60+30;const col=j.phase==='done'?'#76e7b2':j.phase==='ready'?'#aaffad':'#ffcf62';
c.fillStyle='#385f57';c.fillRect(x-90,y-128,180,95);tile(facades,8,x-78,y-117,72,72);tile(facades,2,x-6,y-117,72,72);text(STOPS[i].name,x,y-35,'#fff0d4',12);
c.fillStyle=j.phase==='done'?'#2c6357':'#405664';c.fillRect(x-28,y-27,56,54);c.strokeStyle=col;c.lineWidth=3;c.strokeRect(x-26,y-25,52,50);text(j.phase==='done'?'âœ“':j.phase==='ready'?'â†‘':String(i+1),x,y+6,col,23);
if(j.phase==='working'||j.phase==='ready'){drawCrew(c,x+29,y+23,i,time,'build',43);c.strokeStyle=col;c.lineWidth=5;c.beginPath();c.arc(x,y,33,-Math.PI/2,-Math.PI/2+Math.PI*2*j.work/WORK);c.stroke();}
if(j.phase==='ready')text('PICK UP',x,y+48,col,11);
if(j.phase==='done'){for(let r=0;r<3;r++){const rx=x-56+r*52;drawResident(c,rx,y-52,r,time,true,35);if(r===2){c.strokeStyle='#253148';c.lineWidth=2;c.strokeRect(rx-7,y-78,6,4);c.strokeRect(rx+1,y-78,6,4);c.beginPath();c.moveTo(rx-1,y-76);c.lineTo(rx+1,y-76);c.stroke();}}}}
drawProp(c,0,34,195,58,90);drawProp(c,0,681,480,58,90);drawProp(c,1,666,665,84,60);
for(let i=state.body.length-1;i>=0;i--)person(state.body[i],i,true);text('EL-SAYED',state.body[0].x*60+30,state.body[0].y*60+4,'#122d36',10);
if(state.jobs.every(j=>j.phase==='done')){c.fillStyle='#123944ed';c.fillRect(125,635,470,45);text('CREW TOGETHER. THREE STOPS COMPLETE.',360,663,'#b9f7d3',16);}}
function frame(now){const dt=Math.min(now-last,200);last=now;if(!paused&&!storyPaused){time+=dt/1000;const events=work(state,dt);if(events.length){$('tip').textContent='Green ring: crew is ready. Return to collect them.';save();update();}if(direction){clock+=dt;if(clock>=240){clock-=240;action(direction);}}}render();requestAnimationFrame(frame);}
onSpritesReady(()=>render());sync();save();update();requestAnimationFrame(frame);window.addEventListener('pagehide',save);
