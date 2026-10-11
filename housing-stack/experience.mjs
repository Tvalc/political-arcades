import {createGame,move,rotate,drop,tick,ghostY,SHAPES,hold,advanceLock} from '/tests/housing-stack/engine.mjs?v=3';
import {loadCity,addFloors,cityProgress,CITY_KEY} from '/tests/housing-stack/city-state.mjs?v=4';
import {apartmentTile,boardBackdrop,onArtReady} from '/tests/housing-stack/art-renderer.mjs?v=4';
import {paintLivingBlock} from '/tests/housing-stack/living-city.mjs?v=11.0';
import {onSpritesReady} from '/tests/housing-stack/makko-sprites.mjs?v=6';
import {ConstructionPlayer} from '/tests/housing-stack/construction-player.mjs?v=ux2';

const $=s=>document.querySelector(s);
const canvas=$('#game'),ctx=canvas.getContext('2d'),next=$('#next').getContext('2d'),reserve=$('#held').getContext('2d');
const names={mamdani:'Mamdani',sayed:'El-Sayed',talarico:'Talarico'};
const colors=['#57bba8','#e6b655','#b999dc','#70a7d0','#d88b76','#91bc7b','#d9a371'];
const shapeNames=['straight','square','T','right zigzag','left zigzag','left corner','right corner'];
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),coarse=matchMedia('(pointer: coarse)');
const PREF_KEY='adstoaid-housing-preferences-v1';
let storage,prefs={};try{storage=localStorage;prefs=JSON.parse(storage.getItem(PREF_KEY))||{};}catch{}
let hasChosen=Object.hasOwn(names,prefs.builder),hero=hasChosen?prefs.builder:'mamdani';
let touchMode=['auto','on','off'].includes(prefs.touch)?prefs.touch:'auto';
let calm=typeof prefs.calm==='boolean'?prefs.calm:reduced.matches;
let g=createGame(),phase='setup',last=0,gravity=0,best=0,sound=false,audio,saveFailed=!storage;
let clearFx=null,toastUntil=0,heroReactionUntil=0,lastCityPaint=0,cityVisible=true,helpReturnFocus=null,boardDirty=true;
let firstMoves=0,choiceMode=false,choiceReturnPhase='setup',lastAnnouncement='',sessionInput=null;
try{best=Number(storage?.getItem('pa-housing-best'))||0;}catch{}
const city=loadCity(storage);
const builder=new ConstructionPlayer($('#builder'),{});
const returningBuilder=new ConstructionPlayer($('#returning-portrait'),{});
const choices=[...document.querySelectorAll('[data-choice]')].map(c=>({id:c.dataset.choice,player:new ConstructionPlayer(c,{})}));
const scene=document.createElement('canvas');scene.width=900;scene.height=470;
const skyline=$('#skyline'),skylineCtx=skyline.getContext('2d');
function still(){return calm||reduced.matches;}
function savePreferences(){try{storage?.setItem(PREF_KEY,JSON.stringify({builder:hasChosen?hero:null,touch:touchMode,calm}));}catch{}}
function announce(message){if(lastAnnouncement===message)return;lastAnnouncement=message;$('#call').textContent=message;}
function playBuilder(state='working'){
 builder.play(hero,still()?'shocked':state,{loop:state==='working'}).catch(()=>{});
}
function selectHero(id,persist=true){
 if(!Object.hasOwn(names,id))return;
 hero=id;$('#builder-name').textContent=names[hero];
 document.querySelectorAll('input[name=builder]').forEach(input=>{input.checked=input.value===hero;});
 $('#returning-name').textContent=names[hero];returningBuilder.play(hero,'shocked').catch(()=>{});
 playBuilder(phase==='playing'?'working':'shocked');if(persist){hasChosen=true;savePreferences();}
}
document.querySelectorAll('input[name=builder]').forEach(input=>input.addEventListener('change',()=>selectHero(input.value)));
for(const choice of choices)choice.player.play(choice.id,'shocked').catch(()=>{});
selectHero(hero,false);
function setPhase(nextPhase){
 phase=nextPhase;document.body.dataset.phase=phase;
 const playing=phase==='playing';
 canvas.tabIndex=playing?0:-1;
 canvas.setAttribute('aria-hidden',String(!playing));
 $('.play-rail').inert=!playing;
 $('.touch-controls').inert=!playing;
 document.querySelectorAll('.touch-controls button').forEach(b=>{b.disabled=!playing;});
 $('#pause').disabled=phase==='setup'||phase==='over';
 $('#pause').textContent=phase==='paused'?'Resume':'Pause';
 $('#hold').disabled=!playing||!g.canHold;
}
function tone(freq){if(!sound)return;try{audio??=new AudioContext();audio.resume();const o=audio.createOscillator(),v=audio.createGain();o.connect(v);v.connect(audio.destination);o.frequency.value=freq;v.gain.setValueAtTime(.035,audio.currentTime);v.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.12);o.start();o.stop(audio.currentTime+.13);}catch{}}
function updateBest(){if(g.score>best){best=g.score;try{storage?.setItem('pa-housing-best',String(best));}catch{}}}
function preview(c,id,w,y,h,size){const m=SHAPES[id],x=(w-m[0].length*size)/2,top=y+(h-m.length*size)/2;m.forEach((row,dy)=>row.forEach((v,dx)=>{if(v)tile(c,x+dx*size,top+dy*size,size,colors[id]);}));}
function hud(){
 boardDirty=true;
 $('#supplies').textContent=g.lines;$('#score').textContent=g.score;$('#level').textContent=1+Math.floor(g.lines/10);
 next.clearRect(0,0,120,216);
 g.queue.slice(0,3).forEach((id,i)=>{next.globalAlpha=i?0.6:1;preview(next,id,120,i*72,72,i?16:20);});next.globalAlpha=1;
 $('#next').setAttribute('aria-label','Next pieces: '+g.queue.slice(0,3).map(id=>shapeNames[id]).join(', '));
 reserve.clearRect(0,0,120,72);if(g.held!==null)preview(reserve,g.held,120,0,72,18);
 $('#hold').disabled=phase!=='playing'||!g.canHold;
 $('#hold-status').textContent=!g.canHold?'Place one first':g.held===null?'Empty':'Swap';
 $('#hold').setAttribute('aria-label',(g.held===null?'Hold current piece':'Swap with held '+shapeNames[g.held]+' piece')+'. C or Shift.');
 $('#neighborhood-label').textContent=city.floors?`${city.floors} ${city.floors===1?'supply':'supplies'} earned here, all time. Choose where to spend them in your city.`:'Clear rows here. Choose what to build in your city.';
 $('#save-status').textContent=saveFailed?'Saving is unavailable. Keep this page open; these supplies may not survive a reload.':'Saved in this browser · Game supplies are separate from real-world giving.';
 $('#save-status').classList.toggle('save-error',saveFailed);
 $('#retry-save').hidden=!saveFailed||city.floors===0;
}
function focusBoard(){canvas.focus({preventScroll:true});}
function revealBoard(){
 requestAnimationFrame(()=>{if(phase!=='playing')return;const r=canvas.getBoundingClientRect();if(r.top<0||r.bottom>innerHeight)window.scrollTo({top:0,behavior:'auto'});focusBoard();});
}
function overlay(kind){
 const setup=kind==='setup',over=kind==='over';
 $('#overlay').hidden=false;$('#builder-picker').hidden=!setup||hasChosen;
 $('#returning-builder').hidden=!setup||!hasChosen;
 $('#result-stats').hidden=!over;$('#result-city').hidden=!over||saveFailed;
 $('#choose-another').hidden=setup&&!hasChosen;
 $('#setup-note').hidden=!setup;
 $('#overline').textContent=setup?'MORE HOMES. LESS BULLSHIT.':over?'SHIFT COMPLETE':'TAKE A BREATHER';
 $('#overlay-title').textContent=setup?(hasChosen?'Back to the block.':'Build your block.'):over?(g.lines?'That’s a good day’s work.':'Every block starts somewhere.'):'Paused.';
 $('#overlay-message').textContent=setup?'Fit the pieces. Fill a row. Earn supplies for your city.':over?(g.lines?'The stack reached the top. Everything you earned is yours to keep.':'The stack reached the top. Fill a complete horizontal row to earn your first supply.'):'Your board is right where you left it.';
 if(over&&saveFailed&&g.lines)$('#overlay-message').textContent='Your supplies could not be saved. Keep this page open and use Retry saving below the board.';
 $('#start').textContent=setup?'Start building →':over?'Play another shift →':'Resume building →';
 if(over){$('#result-supplies').textContent=g.lines;$('#result-score').textContent=g.score;$('#result-best').textContent=`Best score: ${best.toLocaleString()}`;}
 // A navigation menu must retain focus while its automatic pause opens this panel.
 if(!setup&&!$('.arcade-site-menu')?.open)$('#start').focus({preventScroll:true});
}
function start(){
 hasChosen=true;savePreferences();
 release();g=createGame();gravity=0;last=performance.now();firstMoves=0;clearFx=null;toastUntil=0;heroReactionUntil=0;
 choiceMode=false;setPhase('playing');$('#overlay').hidden=true;$('#board-toast').hidden=true;
 playBuilder();hud();focusBoard();revealBoard();announce('Fill a horizontal row. The outline shows where your piece will land.');
}
function pause(reason=''){if(phase!=='playing')return;
 release();setPhase('paused');g.status='paused';builder.stop();overlay('paused');
 if(reason)$('#overlay-message').textContent=reason;
}
function resume(){if(phase!=='paused'||$('#help-dialog').open||$('.arcade-site-menu')?.open)return;
 if(choiceMode){choiceMode=false;$('#builder-picker').hidden=true;}
 g.status='playing';gravity=0;last=performance.now();setPhase('playing');$('#overlay').hidden=true;playBuilder();hud();focusBoard();revealBoard();
}
function togglePause(){if(phase==='playing')pause();else if(phase==='paused')resume();}
function finish(){
 release();updateBest();setPhase('over');playBuilder('shocked');overlay('over');
 announce(`${g.lines} ${g.lines===1?'supply':'supplies'} earned this shift. ${saveFailed?'Saving is unavailable.':'Your supplies stay saved.'}`);
}
function result(event){
 if(!event)return;
 gravity=0;
 if(event.cleared){
  saveFailed=!addFloors(city,event.cleared,storage);window.CityRewards?.syncHousing();
  const now=performance.now();clearFx={rows:event.finishedRows,time:now};toastUntil=now+1700;heroReactionUntil=now+1500;
  const label=`+${event.cleared} ${event.cleared===1?'supply':'supplies'}`;
  $('#board-toast').textContent=label;$('#board-toast').hidden=false;
  announce(`${event.cleared} ${event.cleared===1?'row':'rows'} cleared. ${label}${saveFailed?' earned. Saving unavailable—keep this page open.':' for your city.'}${event.comboBonus?' Combo: +'+event.comboBonus+' points.':''}`);
  playBuilder('celebrate');tone(event.cleared===4?880:660);lastCityPaint=0;
 }else if(!event.held){tone(170);firstMoves++;if(firstMoves===3)announce('Keep filling rows. Hold a piece when you need a better fit.');}
 updateBest();hud();if(event.lost)finish();
}
function action(a){
 if(phase!=='playing'||$('#help-dialog').open||$('.arcade-site-menu')?.open)return;
 if(a==='hold'){const e=hold(g);result(e);if(e&&!e.lost)announce('Piece held. Place the current piece before swapping again.');hud();return;}
 if(a==='left')move(g,-1);if(a==='right')move(g,1);
 if(a==='rotate'&&rotate(g))tone(320);
 if(a==='down'){if(move(g,0,1)){g.score++;updateBest();hud();}}
 if(a==='drop')result(drop(g));
}
$('#start').addEventListener('click',()=>{
 if(choiceMode){choiceMode=false;if(choiceReturnPhase==='paused'){resume();return;}start();return;}
 if(phase==='paused')resume();else start();
});
$('#pause').addEventListener('click',togglePause);
$('#retry-save').addEventListener('click',()=>{
 try{if(!storage)throw new Error('Storage unavailable');storage.setItem(CITY_KEY,JSON.stringify(city));saveFailed=false;window.CityRewards?.syncHousing();announce('Your building supplies are now saved.');}
 catch{saveFailed=true;announce('Saving is still unavailable. Keep this page open to keep your supplies.');}
 hud();if(phase==='over')overlay('over');
});
$('#choose-another').addEventListener('click',()=>{
 choiceMode=true;choiceReturnPhase=phase;$('#builder-picker').hidden=false;$('#choose-another').hidden=true;
 $('#returning-builder').hidden=true;
 $('#result-stats').hidden=true;$('#result-city').hidden=true;$('#overlay-title').textContent='Choose your builder.';
 $('#overlay-message').textContent=phase==='paused'?'Your board and supplies stay exactly as they are.':'Same game. A fresh face for the next shift.';
 $('#start').textContent=phase==='paused'?'Back to building →':'Start building →';
 $(`input[name=builder][value=${hero}]`).focus({preventScroll:true});
});
function openHelp(){
 helpReturnFocus=document.activeElement;
 if(phase==='playing')pause('Controls are open. Resume when you’re ready.');
 $('#keyboard-reference').open=getComputedStyle($('.touch-controls')).display==='none';
 release();$('#help-dialog').showModal();$('#help-close').focus();
}
function closeHelp(){$('#help-dialog').close();}
$('#help-open').addEventListener('click',openHelp);$('#help-close').addEventListener('click',closeHelp);$('#help-done').addEventListener('click',closeHelp);
$('#help-dialog').addEventListener('close',()=>{
 if(phase==='paused'&&!choiceMode)$('#overlay-message').textContent='Your board is right where you left it.';
 (phase==='paused'?$('#start'):helpReturnFocus)?.focus({preventScroll:true});
});
$('#help-dialog').addEventListener('keydown',e=>e.stopPropagation());
$('#sound').addEventListener('click',()=>{sound=!sound;$('#sound').textContent=sound?'Sound on':'Sound off';$('#sound').setAttribute('aria-pressed',String(sound));tone(440);});
function updateInputMode(){document.body.dataset.touch=touchMode;document.body.dataset.input=touchMode==='on'||(touchMode==='auto'&&(sessionInput==='touch'||(!sessionInput&&coarse.matches)))?'touch':'keyboard';$('#touch-mode').value=touchMode;}
coarse.addEventListener('change',updateInputMode);
// Switch after the tap completes, so a hybrid-device layout change cannot move
// the tapped button out from underneath a finger before its click is delivered.
window.addEventListener('pointerup',e=>{if(e.pointerType==='touch'&&sessionInput!=='touch')setTimeout(()=>{sessionInput='touch';updateInputMode();},0);},{passive:true});
$('#touch-mode').addEventListener('change',e=>{touchMode=e.target.value;updateInputMode();savePreferences();});updateInputMode();
$('#calm-mode').checked=calm;$('#calm-mode').addEventListener('change',e=>{calm=e.target.checked;savePreferences();playBuilder(phase==='playing'?'working':'shocked');lastCityPaint=0;});
reduced.addEventListener('change',()=>{playBuilder(phase==='playing'?'working':'shocked');lastCityPaint=0;});

const keys={ArrowLeft:'left',a:'left',ArrowRight:'right',d:'right',ArrowUp:'rotate',w:'rotate',ArrowDown:'down',s:'down',' ':'drop',c:'hold',Shift:'hold'};
window.addEventListener('keydown',e=>{
 if(e.ctrlKey||e.metaKey||e.altKey||$('#help-dialog').open||$('.arcade-site-menu')?.open)return;
 if(e.key==='Escape'&&choiceMode){e.preventDefault();choiceMode=false;overlay(choiceReturnPhase);return;}
 if(e.target.closest?.('input,select,textarea,a,summary'))return;
 if(e.target instanceof HTMLButtonElement&&(e.key===' '||e.key==='Enter'))return;
 if(e.key.toLowerCase()==='p'||e.key==='Escape'){
  if(phase==='playing'||phase==='paused'){e.preventDefault();if(!e.repeat)togglePause();}return;
 }
 const a=keys[e.key]||keys[e.key.toLowerCase()];
 if(a&&phase==='playing'){
  e.preventDefault();if(e.repeat&&['rotate','drop','hold'].includes(a))return;
  if(sessionInput!=='keyboard'){sessionInput='keyboard';updateInputMode();}
  action(a);
 }
});
const heldPointers=new Map();
function releasePointer(id){const p=heldPointers.get(id);if(!p)return;clearTimeout(p.delay);clearInterval(p.repeat);heldPointers.delete(id);if(![...heldPointers.values()].some(other=>other.button===p.button))p.button.classList.remove('pressed');}
function release(){for(const id of heldPointers.keys())releasePointer(id);}
document.querySelectorAll('[data-action]').forEach(b=>{
 b.addEventListener('pointerdown',e=>{
  if(b.disabled||phase!=='playing')return;
  e.preventDefault();releasePointer(e.pointerId);b.setPointerCapture(e.pointerId);
  const a=b.dataset.action,p={button:b,delay:null,repeat:null};heldPointers.set(e.pointerId,p);
  b.classList.add('pressed');action(a);focusBoard();
  // A second thumb can rotate while the first keeps holding a direction.
  if(phase==='playing'&&['left','right','down'].includes(a))p.delay=setTimeout(()=>{p.repeat=setInterval(()=>action(a),90);},220);
 });
 for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,e=>releasePointer(e.pointerId));
 b.addEventListener('click',e=>{if(e.detail===0&&!b.disabled){action(b.dataset.action);focusBoard();}});
});
window.addEventListener('pointerup',e=>releasePointer(e.pointerId));window.addEventListener('pointercancel',e=>releasePointer(e.pointerId));
window.addEventListener('blur',()=>{release();pause('The game paused while you were away.');});
document.addEventListener('visibilitychange',()=>{if(document.hidden){release();pause('The game paused while you were away.');builder.stop();}else if(phase!=='playing')playBuilder('shocked');});
let touch=null;
canvas.addEventListener('pointerdown',e=>{if(phase!=='playing'||e.button!==0)return;touch={x:e.clientX,y:e.clientY,id:e.pointerId};canvas.setPointerCapture(e.pointerId);focusBoard();});
canvas.addEventListener('pointerup',e=>{
 if(!touch||touch.id!==e.pointerId)return;
 const dx=e.clientX-touch.x,dy=e.clientY-touch.y;touch=null;
 if(Math.max(Math.abs(dx),Math.abs(dy))<15)action('rotate');
 else if(Math.abs(dx)>Math.abs(dy))action(dx>0?'right':'left');
 else if(dy<0)action('rotate');else action('down');
});
canvas.addEventListener('pointercancel',()=>{touch=null;});
function tile(c,x,y,s,color,ghost=false){
 if(apartmentTile(c,Math.max(0,colors.indexOf(color)),x,y,s,{ghost}))return;
 c.save();c.globalAlpha=ghost?.20:1;c.fillStyle=color;c.fillRect(x+1,y+1,s-2,s-2);c.fillStyle='#ffffff35';c.fillRect(x+2,y+2,s-4,3);c.fillStyle=ghost?'#ffffff55':'#fff0b3';c.fillRect(x+s*.23,y+s*.29,s*.17,s*.23);c.fillRect(x+s*.60,y+s*.29,s*.17,s*.23);c.restore();
}
function draw(now){
 ctx.fillStyle='#101c29';ctx.fillRect(0,0,320,640);boardBackdrop(ctx,320,640);
 // Keep the backdrop subordinate to the pieces and show the actual 10x20 grid.
 ctx.fillStyle='#0b172433';ctx.fillRect(0,0,320,640);
 ctx.strokeStyle='#bed5e00d';ctx.lineWidth=1;
 for(let x=0;x<=10;x++){ctx.beginPath();ctx.moveTo(x*32,0);ctx.lineTo(x*32,640);ctx.stroke();}
 for(let y=0;y<=20;y++){ctx.beginPath();ctx.moveTo(0,y*32);ctx.lineTo(320,y*32);ctx.stroke();}
 g.board.forEach((row,y)=>row.forEach((id,x)=>{if(id)tile(ctx,x*32,y*32,32,colors[id-1]);}));
 if(phase!=='over'){
  const p=g.piece,y=ghostY(g);
  p.matrix.forEach((row,dy)=>row.forEach((v,dx)=>{if(v){
   tile(ctx,(p.x+dx)*32,(y+dy)*32,32,colors[p.id],true);
   ctx.strokeStyle='#f3e6bf99';ctx.lineWidth=1.5;ctx.strokeRect((p.x+dx)*32+2,(y+dy)*32+2,28,28);
   tile(ctx,(p.x+dx)*32,(p.y+dy)*32,32,colors[p.id]);
  }}));
 }
 if(clearFx){const t=(now-clearFx.time)/400;if(t>=1)clearFx=null;else if(!still()){ctx.save();ctx.globalAlpha=(1-t)*.28;ctx.fillStyle='#a9f1cd';for(const row of clearFx.rows)ctx.fillRect(0,row.y*32,320,32);ctx.restore();}}
}
function paintCity(now){
 if(!cityVisible||phase==='setup')return;
 paintLivingBlock(scene,city.floors,cityProgress(city.floors).activeBlock,now,still(),false);
 skylineCtx.clearRect(0,0,900,250);skylineCtx.drawImage(scene,0,200,900,250,0,0,900,250);
 skyline.setAttribute('aria-label',scene.getAttribute('aria-label')||'Your Housing Stack neighborhood');
}
if('IntersectionObserver'in window){new IntersectionObserver(entries=>{cityVisible=entries[0].isIntersecting;if(cityVisible)lastCityPaint=0;}).observe(skyline);}
function frame(now){
 const dt=Math.min(100,now-(last||now));last=now;
 if(phase==='playing'){
  gravity+=dt;const interval=Math.max(120,820-Math.floor(g.lines/10)*65);
  if(gravity>=interval){gravity-=interval;result(tick(g));}
  result(advanceLock(g,dt));
  if(heroReactionUntil&&now>=heroReactionUntil){heroReactionUntil=0;playBuilder();}
 }
 if(toastUntil&&now>=toastUntil){toastUntil=0;$('#board-toast').hidden=true;}
 if(!document.hidden){
  if(phase==='playing'||boardDirty||clearFx){draw(now);boardDirty=false;}
  if(!lastCityPaint||(!still()&&now-lastCityPaint>200)){paintCity(now);lastCityPaint=now;}
 }
 requestAnimationFrame(frame);
}
setPhase('setup');overlay('setup');hud();
$('#builder-picker').disabled=false;$('#start').disabled=false;$('#help-open').disabled=false;
onArtReady(()=>{hud();lastCityPaint=0;});onSpritesReady(()=>{lastCityPaint=0;});requestAnimationFrame(frame);
