(()=>{
'use strict';
const A=window.OrderAction,$=id=>document.getElementById(id),buttons=[...document.querySelectorAll('[data-excuse]')];
let s=A.create(),lastTime=0,acc=0,lastEvent=-1,lastPhase='',sound=false,audio;
function hush(){if('speechSynthesis' in window)window.speechSynthesis.cancel();}
function tone(hz,length=.12){if(!sound)return;try{audio ||= new (window.AudioContext||window.webkitAudioContext)();audio.resume();const o=audio.createOscillator(),g=audio.createGain();o.connect(g);g.connect(audio.destination);o.frequency.value=hz;g.gain.setValueAtTime(.07,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+length);o.start();o.stop(audio.currentTime+length);}catch{}}
function speak(line){if(!sound||!('speechSynthesis' in window))return;hush();const u=new SpeechSynthesisUtterance(line);u.rate=1.2;u.pitch=.85;window.speechSynthesis.speak(u);}
function start(){hush();s=A.create();A.begin(s);lastEvent=-1;lastPhase='';acc=0;$('splash').hidden=true;$('end').hidden=true;$('paused').hidden=true;$('play').blur();$('again').blur();$('restart').blur();sync();}
function togglePause(){if(s.paused){A.resume(s);$('paused').hidden=true;$('resume').blur();lastTime=performance.now();}else{A.pause(s);if(s.paused){hush();$('paused').hidden=false;$('resume').focus();}}sync();}
function sync(){
 const active=!['ready','won','lost'].includes(s.phase),canPick=active&&!s.paused&&['tell','counter'].includes(s.phase);
 document.body.dataset.phase=s.paused?'paused':s.phase;document.body.classList.toggle('counter',s.phase==='counter'&&!s.paused);
 $('hp').textContent=s.hp+' SHAME';$('shame').value=s.hp;$('lives').textContent='MIC '+Array.from({length:3},(_,i)=>i<s.lives?'●':'○').join(' ');
 $('pause').disabled=!active;$('pause').textContent=s.paused?'Resume':'Pause';
 $('left').disabled=$('right').disabled=!active||s.paused;$('throw').disabled=!canPick;
 $('throw').textContent=s.phase==='counter'?'THROW NOW · SPACE':s.phase==='tell'?'WAIT FOR GREEN':'THROW · SPACE';
 $('phase-label').textContent=s.paused?'PAUSED':({windup:'DODGE',impact:'DODGE',recover:'GET READY',tell:'PICK HIS EXCUSE',counter:'THROW!',after:'',won:'VOTED OUT',lost:'MIC CUT',ready:'DODGE → READ → COUNTER'})[s.phase];
 for(const b of buttons){const id=b.dataset.excuse;b.disabled=!canPick||s.burned.includes(id);b.classList.toggle('burned',s.burned.includes(id));b.setAttribute('aria-pressed',String(id===s.selected));b.title=s.burned.includes(id)?'Excuse burned':A.excuses.find(e=>e.id===id).tell;}
 if(lastEvent!==s.event){$('cue').textContent=s.message;lastEvent=s.event;if(s.last==='hit'&&['after','won'].includes(s.phase))tone(700,.23);if(s.last==='hurt'&&s.phase==='impact')tone(110,.3);}
 if(lastPhase!==s.phase){lastPhase=s.phase;if(s.phase==='tell'){$('caption').textContent=A.excuses.find(e=>e.id===s.target).tell+' · Which excuse is coming?';tone(330);}if(s.phase==='counter'){const e=A.excuses.find(e=>e.id===s.target);$('caption').textContent='“'+e.line+'”';tone(520);speak(e.line);}if(s.phase==='windup'){$('caption').textContent='BIBLE: BEAR ATTACK · Full passage under Pause';}if(s.phase==='won'||s.phase==='lost')hush();}
 $('timing-fill').style.width=(['windup','tell','counter'].includes(s.phase)?Math.max(0,100*(1-s.timer/s.duration)):0)+'%';
 if((s.phase==='won'&&s.timer>=1)||s.phase==='lost'){if($('end').hidden){$('end').hidden=false;$('end-title').textContent=s.phase==='won'?'Voted out!':'Mic cut.';$('end-copy').textContent=s.phase==='won'?s.dodges+' stamps dodged. Three excuses burned.':'Get out of the red lane before the stamp lands.';$('again').focus();}}
}
function move(dir){A.move(s,dir);sync();}function strike(){A.strike(s);sync();}
$('play').onclick=$('again').onclick=$('restart').onclick=start;$('pause').onclick=$('resume').onclick=togglePause;
$('left').onclick=()=>move(-1);$('right').onclick=()=>move(1);$('throw').onclick=strike;
for(const b of buttons)b.onclick=()=>{A.choose(s,b.dataset.excuse);sync();};
$('sound').onclick=()=>{sound=!sound;$('sound').textContent=sound?'Sound on':'Sound off';$('sound').setAttribute('aria-pressed',String(sound));if(sound)tone(440);else hush();};
document.addEventListener('keydown',e=>{
 if(e.repeat||e.ctrlKey||e.metaKey||e.altKey)return;
 if(e.key==='Escape'||e.key.toLowerCase()==='p'){e.preventDefault();togglePause();return;}
 if(s.paused||['ready','won','lost'].includes(s.phase))return;
 if(e.target.closest('a,summary,#sound,#pause'))return;
 if(['ArrowLeft','a','A','ArrowRight','d','D','1','2','3',' '].includes(e.key))e.preventDefault();
 if(['ArrowLeft','a','A'].includes(e.key))move(-1);if(['ArrowRight','d','D'].includes(e.key))move(1);
 if(['1','2','3'].includes(e.key)){A.choose(s,A.excuses[Number(e.key)-1].id);sync();}if(e.key===' ')strike();
});
let touch=null;$('arena').addEventListener('pointerdown',e=>{touch={x:e.clientX,y:e.clientY,id:e.pointerId};$('arena').setPointerCapture(e.pointerId);});
$('arena').addEventListener('pointerup',e=>{if(!touch||touch.id!==e.pointerId)return;const dx=e.clientX-touch.x,dy=e.clientY-touch.y;touch=null;if(Math.abs(dx)>25&&Math.abs(dx)>Math.abs(dy))move(Math.sign(dx));});
$('arena').addEventListener('pointercancel',()=>touch=null);
function backgroundPause(){if(!s.paused&&!['ready','won','lost'].includes(s.phase))togglePause();}
document.addEventListener('visibilitychange',()=>{if(document.hidden)backgroundPause();});window.addEventListener('blur',backgroundPause);
function frame(now){const dt=Math.min(.1,Math.max(0,(now-(lastTime||now))/1000));lastTime=now;acc+=dt;while(acc>=1/60){A.tick(s,1/60);acc-=1/60;}sync();if(!s.paused)window.ActionScene.draw(s,now);requestAnimationFrame(frame);}
sync();requestAnimationFrame(frame);
})();
