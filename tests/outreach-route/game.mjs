import './neighborhood.mjs?v=5';
import {outreachCount} from './neighborhood-state.mjs';
import {createGame,turn,step,advanceWork,REPAIR_MS} from './snake-engine.mjs';
import {drawCrew,drawResident,drawProp,onSpritesReady} from '/city/makko-sprites.mjs';
import {loadCity,award,KEY} from '/shared/city-state.mjs?v=outreach1';
const $=id=>document.getElementById(id),c=$('map').getContext('2d'),SIZE=16,T=45,BEST='pa-outreach-snake-best-v1';
let g,started=false,paused=false,storyPaused=false,last=performance.now(),acc=0,time=0,best=0,runId,care=0,flash=0,previous=[],saveFailure=false;
try{best=Number(localStorage.getItem(BEST))||0;}catch{}
const hero=new Image();hero.src='/horse/assets/sprites/chibi/sayed-move.webp';
const areas=['School outreach','Library outreach','Community outreach'];
function say(who,line){$('speaker').textContent=who;$('line').textContent=line;}
function interval(){return Math.max(145,300-g.repairs*5);}
function init(){g=createGame(SIZE,Math.random,1,null);g.food={x:8,y:8};runId=crypto.randomUUID();care=0;previous=g.body.map(p=>({...p}));acc=0;}
function status(){$('save').textContent=saveFailure?'City saving unavailable in this browser.':'Best: '+best+' points / City care earned this run: '+care;}
function hud(){try{document.querySelector('outreach-neighborhood')?.setCount(outreachCount(loadCity(localStorage)));}catch{}const district=Math.floor(g.score/500);$('count').textContent=g.score;$('score-label').textContent='POINTS / '+areas[district%3];$('progress').replaceChildren(...['Crew: '+g.body.length,'Working: '+g.jobs.filter(j=>!j.open&&!j.ready).length,'Ready: '+g.jobs.filter(j=>j.ready).length].map(s=>{const e=document.createElement('span');e.textContent=s;return e;}));status();}
function show(title,label){$('paused').hidden=false;$('overlay-title').textContent=title;$('resume').textContent=label;}
function start(){init();started=true;paused=false;last=performance.now();$('paused').hidden=true;$('pause').textContent='Pause';$('tip').textContent='Steer to the gold stop. Drop a worker, circle back, collect when green.';say('EL-SAYED / WITH THE CREW','Keep moving. Get the provider crew to the outreach stops, then bring them back.');hud();$('map').focus({preventScroll:true});}
function setPause(value){if(!started||g.status==='lost')return;paused=value;acc=0;last=performance.now();$('pause').textContent=value?'Resume':'Pause';if(value)show('Crew break.','Resume run');else $('paused').hidden=true;}
function steer(d){if(!started||g.status==='lost'){start();}if(!paused&&!storyPaused)turn(g,d);}
function reward(event){try{const city=loadCity(localStorage);const visits=outreachCount(city);if(award(city,{id:'outreach-run-'+runId+'-'+event.worker.uid+'-'+g.repairs,type:'outreach:stop',count:1})){city.imports.outreach=visits+1;localStorage.setItem(KEY,JSON.stringify(city));care++;}saveFailure=false;}catch{saveFailure=true;}}
function events(){if(!g.events.length)return;for(const e of g.events.splice(0)){
 if(e.type==='drop'){$('tip').textContent='Crew dropped off. Keep moving; collect when the ring turns green.';say('BLOCK CAPTAIN / ORGANIZER','The provider crew does the eye care. Give them time to finish.');}
 if(e.type==='early'){$('tip').textContent='Too early! The stop remains unfinished. Loop back and drop a worker again.';say('YOUNGER ORGANIZER','They need a little more time. Keep the route open.');}
 if(e.type==='repair'){flash=1;$('tip').textContent='Outreach finished! Collect the green worker to grow your crew.';if(g.score>best){best=g.score;try{localStorage.setItem(BEST,String(best));}catch{}}}
 if(e.type==='pickup'){reward(e);$('tip').textContent='Worker collected. A neighbor joins your line. Keep going!';say('TONY / WITH THE CREW','More people helped. More people in the crew. Watch that tail.');}
 if(e.type==='empty')$('tip').textContent='Your crew is working. Collect a green worker before starting another stop.';
}hud();}
function lost(){started=true;paused=false;$('pause').textContent='Pause';show('Crew pileup. '+g.score+' points.','Try again');$('tip').textContent='Run over. Your earned city care stays. Beat your best: '+best+' points.';say('TONY / END OF THE RUN','That is a wrap. Take another run - the city keeps what you earned.');hud();}
$('resume').onclick=()=>g.status==='lost'||!started?start():setPause(false);$('again').onclick=start;$('pause').onclick=()=>setPause(!paused);
$('story').onclick=()=>{storyPaused=true;$('history').showModal();};for(const id of ['close','continue'])$(id).onclick=()=>$('history').close();$('history').addEventListener('close',()=>{storyPaused=false;last=performance.now();acc=0;});
const keys={ArrowUp:'up',ArrowRight:'right',ArrowDown:'down',ArrowLeft:'left',w:'up',d:'right',s:'down',a:'left'};
window.addEventListener('keydown',e=>{if(storyPaused||e.target.closest('input,textarea,select'))return;const d=keys[e.key]||keys[e.key.toLowerCase()];if(d){e.preventDefault();if(!e.repeat)steer(d);}else if(e.key===' '&&!e.target.closest('button,a')){e.preventDefault();if(!started||g.status==='lost')start();else setPause(!paused);}});
window.addEventListener('blur',()=>setPause(true));document.addEventListener('visibilitychange',()=>{if(document.hidden)setPause(true);});
const stick=$('stick'),knob=$('knob');let pointer=null,stickDir=null;
function point(e){const r=stick.getBoundingClientRect(),dx=e.clientX-r.left-r.width/2,dy=e.clientY-r.top-r.height/2,mag=Math.hypot(dx,dy),scale=Math.min(1,23/Math.max(1,mag));knob.style.transform=`translate(${dx*scale}px,${dy*scale}px)`;const d=mag<13?null:Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up';if(d&&d!==stickDir)steer(d);stickDir=d;}
stick.addEventListener('pointerdown',e=>{if(pointer!==null||storyPaused)return;e.preventDefault();pointer=e.pointerId;stick.setPointerCapture(pointer);point(e);});stick.addEventListener('pointermove',e=>{if(pointer===e.pointerId)point(e);});function release(e){if(e.pointerId!==pointer)return;pointer=null;stickDir=null;knob.style.transform='';}for(const n of ['pointerup','pointercancel','lostpointercapture'])stick.addEventListener(n,release);
for(const b of stick.querySelectorAll('button'))b.addEventListener('click',e=>{if(e.detail===0)steer(b.dataset.dir);});
let swipe=null;$('map').addEventListener('pointerdown',e=>{swipe={x:e.clientX,y:e.clientY};$('map').setPointerCapture(e.pointerId);});$('map').addEventListener('pointermove',e=>{if(!swipe)return;const dx=e.clientX-swipe.x,dy=e.clientY-swipe.y;if(Math.max(Math.abs(dx),Math.abs(dy))>18){steer(Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up');swipe={x:e.clientX,y:e.clientY};}});for(const n of ['pointerup','pointercancel'])$('map').addEventListener(n,()=>swipe=null);
function label(s,x,y,color='#fff3dd',size=15){c.fillStyle=color;c.font='800 '+size+'px system-ui';c.textAlign='center';c.fillText(s,x,y);}
function stop(x,y,color){c.fillStyle='#142c38';c.beginPath();c.roundRect(x*T+3,y*T+3,T-6,T-6,8);c.fill();c.strokeStyle=color;c.lineWidth=3;c.stroke();c.strokeStyle=color;c.lineWidth=3;c.strokeRect(x*T+11,y*T+17,9,7);c.strokeRect(x*T+25,y*T+17,9,7);c.beginPath();c.moveTo(x*T+20,y*T+20);c.lineTo(x*T+25,y*T+20);c.stroke();}
function render(){const district=Math.floor(g.score/500),palette=[['#263e49','#294752'],['#334855','#365360'],['#3b4d43','#41564b']][district%3];c.clearRect(0,0,720,720);for(let y=0;y<SIZE;y++)for(let x=0;x<SIZE;x++){c.fillStyle=palette[(x+y)%2];c.fillRect(x*T,y*T,T,T);c.strokeStyle='#ffffff05';c.strokeRect(x*T,y*T,T,T);}c.fillStyle='#0c1b2988';c.fillRect(0,0,720,T);c.fillRect(0,675,720,T);c.fillRect(0,0,T,720);c.fillRect(675,0,T,720);
for(const p of g.patches.slice(-18)){c.fillStyle='#69cfa51a';c.fillRect(p.x*T+3,p.y*T+3,39,39);drawResident(c,p.x*T+22,p.y*T+42,p.task%3,time,true,30);}
if(g.food)stop(g.food.x,g.food.y,'#ffcf62');
for(const j of g.jobs){if(j.open){stop(j.x,j.y,'#ef7f80');continue;}const x=(j.x+.5)*T,y=(j.y+.5)*T;c.strokeStyle=j.ready?'#95ffc0':'#ffcf62';c.lineWidth=4;c.beginPath();c.arc(x,y,20,-Math.PI/2,-Math.PI/2+Math.PI*2*j.progress/REPAIR_MS);c.stroke();drawCrew(c,x,y+18,j.worker.id%3,time,j.ready?'carry':'build',35);}
const blend=!started||paused||g.status!=='playing'?1:Math.min(1,acc/interval());for(let i=g.body.length-1;i>=0;i--){const p=g.body[i],old=previous[i]||p,x=(old.x+(p.x-old.x)*blend+.5)*T,y=(old.y+(p.y-old.y)*blend+1)*T-3;if(i===0&&hero.complete&&hero.naturalWidth){const f=started&&!paused&&g.status==='playing'?Math.floor(time*9)%10:0;c.save();c.translate(x,y);if(g.dir==='left')c.scale(-1,1);c.drawImage(hero,f%4*159,Math.floor(f/4)*256,159,256,-13,-42,26,42);c.restore();}else drawCrew(c,x,y,p.id%3,time,'carry',39);}
if(flash>0){c.fillStyle='rgba(129,255,194,'+(flash*.09)+')';c.fillRect(0,0,720,720);}
label(areas[district%3].toUpperCase()+' / KEEP THE CREW MOVING',360,30,'#afd9dd',17);label('NEXT AREA AT '+((district+1)*500)+' POINTS',360,701,'#b8d8d1',14);}
function frame(now){const dt=Math.max(0,Math.min(100,now-last));last=now;time+=dt/1000;flash=Math.max(0,flash-dt/500);if(started&&!paused&&!storyPaused&&g.status==='playing'){advanceWork(g,dt);events();acc+=dt;while(acc>=interval()&&g.status==='playing'){acc-=interval();previous=g.body.map(p=>({...p}));if(step(g)==='lost')lost();events();hud();}}render();requestAnimationFrame(frame);}
init();hud();show('Keep the crew moving.','Start run');$('tip').textContent='Snake rules: keep moving, avoid walls and your crew. Gold stop = dropoff.';say('EL-SAYED / READY TO GO','Drop a worker at the gold stop. Loop back for green. Each pickup grows your crew.');onSpritesReady(render);requestAnimationFrame(frame);
