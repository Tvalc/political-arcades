import {LEVELS} from './levels.mjs';
import {renderRealMoment} from './real-moments.mjs';
import {drawStreet} from './street-renderer.mjs';
import {CastPlayer} from './cast-player.mjs';
import {castManifest} from './cast-manifest.mjs';
import{createGame,turn,step,advanceWork}from './engine.mjs';
const $=s=>document.querySelector(s),canvas=$('#game'),ctx=canvas.getContext('2d');let levelIndex=0;let g=createGame(16,Math.random,0,LEVELS[0]),leader=0,started=false,last=0,acc=0,sound=false,audio,flash=0;let best=0;try{best=+localStorage.getItem('a2a-potholes-work-best')||0}catch{}$('#best').textContent=best;
const criticIds=['trump','cruz','greene'],heroIds=['mamdani','sayed','talarico'];
const criticPlayers=[...document.querySelectorAll('.cast-performance')].map(c=>new CastPlayer(c,castManifest));
const heroPlayers=[...document.querySelectorAll('.hero-performance')].map(c=>new CastPlayer(c,castManifest));
let heroTimers=[];let previous=g.body.map(p=>({...p}));let repairSounds=0;let shift={early:0,pickups:0,drops:0};let cues=[];
function heroReact(state='mock',loop=false){heroTimers.forEach(clearTimeout);heroTimers=[];heroPlayers.forEach((p,i)=>p.play(heroIds[i],state,{loop}).catch(console.error));}
function animateCritics(){const n=g.repairs;const states=[n<4?'smug':'defeated',n<4?'angry':'disbelief','angry'];criticPlayers.forEach((p,i)=>p.play(criticIds[i],states[i],{loop:true}).catch(console.error));}
function repairReactions(){heroReact('celebrate');heroTimers.push(setTimeout(()=>heroReact('mock'),4200));}
heroReact();
function beep(f=440){if(!sound)return;try{audio??=new AudioContext();audio.resume();const o=audio.createOscillator(),v=audio.createGain();o.connect(v);v.connect(audio.destination);o.frequency.setValueAtTime(f,audio.currentTime);o.frequency.exponentialRampToValueAtTime(f*1.5,audio.currentTime+.1);v.gain.setValueAtTime(.035,audio.currentTime);v.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.15);o.start();o.stop(audio.currentTime+.16)}catch{}}
function heckle(){const n=g.repairs;const lines=n===0?['Nothing is getting better!']:n<4?['One pothole? Big deal.','I preferred the authentic road texture.','Those shovels look political.']:n<8?['Fine. But the VIBES are worse.','Technically, that was a luxury pothole.','I have a 47-post thread about this.']:n<14?['Okay, the street is smoother. HOWEVER…','Where will my limo double-park?','Can you stop fixing things? I’m typing.']:['I always supported this, actually.','My driver says thank you. Allegedly.','Deleting my thread. Unrelated reasons.'];const localLines={nyc:['Nobody asked for any of this!','That street had character.','A usable entrance? Suspicious.','Children enjoying a playground? Political.','Nobody will use that shelter.','Who authorized all these neighbors?','I always supported this block.'],detroit:['Health is a personal responsibility!','An accessible path? Where does it end?','Nobody will use that court.','Fine. I was thirsty.','Those vegetables look political.','I am standing in this shade ironically.','I was here for the opening. Obviously.'],texas:['We need a press conference about a poster!','Nobody asked for a safe path.','That basketball is distracting from my speech.','A working fountain? What next?','I oppose shade. Move my podium under it.','Those plants are teaching an agenda.','Why did the teacher give me homework?']}[g.level?.id];$('#heckle').textContent='“'+(localLines?localLines[Math.min(6,n)]:lines[n%lines.length])+'”';$('#denial-fill').style.width=Math.max(8,100-n*6)+'%';$('#denial-label').textContent=n<4?'LOUD & WRONG':n<8?'MOVING GOALPOSTS':n<14?'BARELY AUDIBLE':'QUIETLY BACKPEDALING';animateCritics();$('.sidelines').classList.toggle('deflated',n>=8);document.querySelectorAll('.heckler').forEach((el,i)=>{el.classList.toggle('speaking',i===n%3);el.style.opacity=String(Math.max(.55,1-n*.025))})}
function hud(){$('#job-name').textContent=g.site?g.level.jobs[g.assigned]:g.jobs.length?'Collect the remaining workers':'Workday complete';$('#cargo-name').textContent=g.cargo?g.level.materials[g.assigned]+' · deliver to job':g.food?'Collect '+g.level.materials[g.assigned]:'All supplies delivered';const n=g.repairs,goal=g.level?g.level.jobs.length:n<4?4:n<8?8:n<14?14:Math.ceil((n+1)/10)*10;$('#block-label').textContent=g.level?g.level.place+' · '+(n===6?'READY FOR THE NEIGHBORS':'WORKDAY') : n<4?'THE BLOCK: BEFORE THE CREW':n<8?'THE BLOCK: SAFER STREETS':n<14?'THE BLOCK: LOOKING ALIVE':'THE BLOCK: COMPLAINTS DECLINING';$('#block-fill').style.width=Math.min(100,n/goal*100)+'%';$('#block-count').textContent=n+' / '+goal+' repairs';$('#score').textContent=g.score;$('#repairs').textContent=g.repairs;$('#best').textContent=best;$('#crew-count').textContent=g.crew.length;$('#work-count').textContent=g.jobs.filter(j=>!j.open&&!j.ready).length;$('#ready-count').textContent=g.jobs.filter(j=>j.ready).length}
function show(title,message,label){$('#enjoy-level').hidden=true;$('#next-level').hidden=true;$('#shift-report').hidden=true;$('#overlay').classList.remove('shift-ended');$('#overlay').hidden=false;$('#title').innerHTML=title;$('#message').textContent=message;$('#start').textContent=label}
function start(){$('#enjoy-level').hidden=true;$('#next-level').hidden=true;g=createGame(16,Math.random,leader,LEVELS[levelIndex]);previous=g.body.map(p=>({...p}));repairs=[];particles=[];cues=[];shift={early:0,pickups:0,drops:0};$('#shift-report').hidden=true;$('#overlay').classList.remove('shift-ended');$('#overline').textContent='CLOCK IN, CREW.';started=true;acc=0;last=performance.now();$('#overlay').hidden=true;$('#pause').textContent='Pause';$('#quip').textContent='Collect the marked supplies, then deliver it to the marked job.';hud();heckle();heroReact();canvas.focus({preventScroll:true})}
function pause(){if(g.status==='won'){ $('#overlay').hidden=!$('#overlay').hidden;return;}if(!started||['lost','won'].includes(g.status))return;if(g.status==='paused'){g.status='playing';acc=0;last=performance.now();$('#overlay').hidden=true;$('#pause').textContent='Pause';animateCritics();heroReact()}else{g.status='paused';heroTimers.forEach(clearTimeout);[...criticPlayers,...heroPlayers].forEach(p=>p.stop());show('Union break.','Your crew is waiting. Resume when you’re ready.','Back to work →');$('#pause').textContent='Resume'}}
$('#start').onclick=()=>g.status==='paused'?pause():start();$('#pause').onclick=pause;$('#sound').onclick=()=>{sound=!sound;$('#sound').textContent=sound?'FX on':'FX off';$('#sound').setAttribute('aria-pressed',String(sound));beep()};document.querySelectorAll('[data-hero]').forEach(b=>b.onclick=()=>{leader=+b.dataset.hero;if(!started){g=createGame(16,Math.random,leader,LEVELS[levelIndex]);previous=g.body.map(p=>({...p}))}else{$('#quip').textContent='Leader selected for your next shift.'}document.querySelectorAll('[data-hero]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))});
const keys={ArrowUp:'up',w:'up',ArrowRight:'right',d:'right',ArrowDown:'down',s:'down',ArrowLeft:'left',a:'left'};window.addEventListener('keydown',e=>{if(e.target.closest?.('input,select,textarea,audio'))return;if(e.target instanceof HTMLButtonElement&&(e.key===' '||e.key==='Enter'))return;const d=keys[e.key]||keys[e.key.toLowerCase()];if(d){e.preventDefault();if(started)turn(g,d)}else if(e.code==='Space'||e.key==='Escape'){e.preventDefault();pause()}});document.querySelectorAll('[data-dir]').forEach(b=>b.addEventListener('pointerdown',e=>{e.preventDefault();turn(g,b.dataset.dir);canvas.focus({preventScroll:true})}));let touch;canvas.addEventListener('pointerdown',e=>{touch={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId)});canvas.addEventListener('pointermove',e=>{if(!touch)return;const dx=e.clientX-touch.x,dy=e.clientY-touch.y;if(Math.max(Math.abs(dx),Math.abs(dy))<18)return;turn(g,Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up');touch={x:e.clientX,y:e.clientY}});canvas.addEventListener('pointerup',()=>touch=null);canvas.addEventListener('pointercancel',()=>touch=null);document.addEventListener('visibilitychange',()=>{if(document.hidden&&g.status==='playing'&&started)pause()});window.addEventListener('blur',()=>{if(g.status==='playing'&&started)pause()});
let repairs=[],particles=[];const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function cue(p,text,color='#ffd23f'){cues.push({...p,text,color,time:performance.now()});}
function repairFX(p){repairs.push({...p,time:performance.now()});for(let i=0;i<14;i++){const a=i*Math.PI*2/14;particles.push({x:(p.x+.5)*40,y:(p.y+.5)*40,vx:Math.cos(a)*80,vy:Math.sin(a)*80,life:.6,color:i%3===0?'#8aedae':'#b9b0a3'});}}
function moveInterval(){return g.repairs===0&&shift.drops===0?300:Math.max(145,235-g.repairs*3);}
function draw(now){const interval=moveInterval();drawStreet(ctx,g,{previous,blend:reduced||g.status!=='playing'?1:Math.min(1,acc/interval),leader,repairs,particles,cues,now,reduced,flash});flash=Math.max(0,flash-.04)}
function processEvents(){
 for(const event of g.events.splice(0)){
  if(event.type==='repair'){repairFX(event);heckle();repairReactions();flash=1;beep(520);$('#quip').textContent='Repair done! Collect the green worker to grow the crew.';if(g.score>best){best=g.score;try{localStorage.setItem('a2a-potholes-work-best',String(best))}catch{}}}
  if(event.type==='drop'){shift.drops++;cue(event,'ON THE JOB','#19e6ff');$('#quip').textContent=g.level.jobs[event.task]+' underway. Circle back when green.';beep(310);}
  if(event.type==='early'){shift.early++;cue(event,'NOT DONE YET!','#ff4d8d');heroReact('shocked');heroTimers.push(setTimeout(()=>heroReact('mock'),1600));$('#quip').textContent='Too early! Worker collected, pothole still open. Try again.';beep(180);}
  if(event.type==='pickup'){shift.pickups++;cue(event,'BACK IN LINE!','#37e28a');heroReact('celebrate');heroTimers.push(setTimeout(()=>heroReact('mock'),1600));$('#quip').textContent='Worker back! A neighbor joins the crew. Keep it moving.';beep(760);}
  if(event.type==='supply'){cue(event,'SUPPLIES LOADED','#ffd23f');beep(440);$('#quip').textContent='Supplies loaded. Deliver them to '+g.level.jobs[g.assigned]+'.';}
  if(event.type==='need-supply'){$('#quip').textContent='Collect the marked supplies before dropping off a worker.';cue(event,'NEED SUPPLIES','#ff4d8d');}
  if(event.type==='empty'){$('#quip').textContent='Everyone is working. Circle back and collect your crew.';}
 }
 hud();
}
function frame(now){
 const dt=Math.max(0,Math.min(now-last,100));last=now;
 for(const p of particles){p.x+=p.vx*dt/1000;p.y+=p.vy*dt/1000;p.vy+=120*dt/1000;p.life-=dt/1000}particles=particles.filter(p=>p.life>0);
 if(started&&g.status==='playing'){
  advanceWork(g,dt);processEvents();acc+=dt;const interval=moveInterval();
  while(acc>=interval&&g.status==='playing'){
   acc-=interval;previous=g.body.map(p=>({...p}));const event=step(g);processEvents();
   if(event==='lost'||g.status==='won'){
    const h=g.body[0],edge=h.x+({right:1,left:-1}[g.dir]||0)<0||h.x+({right:1,left:-1}[g.dir]||0)>=g.size||h.y+({down:1,up:-1}[g.dir]||0)<0||h.y+({down:1,up:-1}[g.dir]||0)>=g.size;
    $('#quip').textContent=edge?'Street edge. Give the crew room to turn.':'Crew pileup. Leave space for the tail.';
    heroReact(g.status==='won'?'celebrate':'shocked');beep(140);$('#overline').textContent=g.status==='won'?'STREET COMPLETE':'SHIFT COMPLETE';
    show(g.status==='won'?'Ready for<br>the neighbors.':edge?'End of the road.':'Crew pileup.','You repaired '+g.repairs+' potholes. Drop off, circle back, collect.','Another shift →');shiftReport();
   }
  }
 }
 cues=cues.filter(p=>now-p.time<1800);repairs=repairs.filter(p=>now-p.time<1600);draw(now);requestAnimationFrame(frame);
}requestAnimationFrame(frame);

heckle();

$('#restart').onclick=start;
$('#fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('.cabinet').requestFullscreen()}catch{$('#quip').textContent='Full screen is unavailable in this browser.'}};
document.addEventListener('fullscreenchange',()=>{$('#fullscreen').textContent=document.fullscreenElement?'Exit full screen':'Full screen'});
$('#track').onchange=()=>{const music=$('#street-music'),playing=!music.paused;music.src='/horse/assets/music/'+$('#track').value+'.mp3';if(playing)music.play().catch(()=>{})};

const streetMusic=$('#street-music');
function nextTrack(){const choices=$('#track'),playing=!streetMusic.paused;choices.selectedIndex=(choices.selectedIndex+1)%choices.options.length;choices.onchange();if(playing)streetMusic.play().catch(()=>{});}
$('#music-toggle').onclick=()=>{if(streetMusic.paused)streetMusic.play().catch(()=>{$('#quip').textContent='Track unavailable. Try another soundtrack song.'});else streetMusic.pause()};
$('#music-next').onclick=nextTrack;
for(const event of ['play','pause'])streetMusic.addEventListener(event,()=>{$('#music-toggle').textContent=streetMusic.paused?'Music off':'Music on';$('#music-toggle').setAttribute('aria-pressed',String(!streetMusic.paused))});
streetMusic.addEventListener('ended',()=>{nextTrack();streetMusic.play().catch(()=>{})});

function shiftReport(){
 const n=g.repairs,neighbors=g.nextUid-3,seconds=Math.floor(g.elapsed/1000);
 $('#report-repairs').textContent=n;$('#report-neighbors').textContent=neighbors;
 $('#report-time').textContent=Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');
 $('#report-note').textContent=shift.early?shift.early+' early pickup'+(shift.early===1?'':'s')+' · Let the green light do the talking.':n?'No unfinished pickups. Union-approved timing.':'Try a wide lap after dropping off your first worker.';
 $('#report-verdict').textContent=n===0?'“We oppose the concept of a shovel.”':n<4?'“Those repairs are suspiciously repair-shaped.”':n<8?'“Fine. But the potholes had character.”':n<14?'“The road is smoother. Our thread is longer.”':'“We always supported this. Delete the footage.”';
 $('#shift-report').hidden=false;$('#overlay').classList.add('shift-ended');
 $('#message').textContent=g.status==='won'?g.level.end:n?'The work stays done. The complaint department stays employed.':'The next shift is yours. Give the crew room to turn.';
 renderRealMoment($('#real-moment'),g.crew[0].id);$('#next-level').hidden=g.status!=='won';$('#enjoy-level').hidden=g.status!=='won';if(g.status==='won')$('#pause').textContent='Shift report';
}

function chooseLevel(index){
 levelIndex=index;leader=LEVELS[index].hero;started=false;g=createGame(16,Math.random,leader,LEVELS[index]);previous=g.body.map(p=>({...p}));repairs=[];particles=[];cues=[];
 document.querySelectorAll('[data-level]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.level===index)));
 document.querySelectorAll('[data-hero]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.hero===leader)));
 $('#map-title').textContent=LEVELS[index].name;$('#map-place').textContent=LEVELS[index].place;$('#overline').textContent='COMMUNITY WORKDAY';
 show(LEVELS[index].name,LEVELS[index].intro+' Collect supplies, drop off workers, then collect them when green.','Start the workday →');hud();heckle();heroReact();
}
document.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>chooseLevel(+b.dataset.level));
$('#next-level').onclick=()=>{chooseLevel((levelIndex+1)%LEVELS.length);start()};chooseLevel(0);

$('#enjoy-level').onclick=()=>{$('#overlay').hidden=true;canvas.focus({preventScroll:true})};
