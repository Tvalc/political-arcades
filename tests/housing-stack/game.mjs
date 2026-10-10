import {createGame,move,rotate,drop,tick,ghostY,SHAPES} from './engine.mjs';
import {CastPlayer} from './cast-player.mjs';
import {castManifest} from './cast-manifest.mjs';
const $=s=>document.querySelector(s),canvas=$('#game'),ctx=canvas.getContext('2d'),next=$('#next').getContext('2d');
const names=['Mamdani','El-Sayed','Talarico'],ids=['mamdani','sayed','talarico'],colors=['#57bba8','#e6b655','#b999dc','#70a7d0','#d88b76','#91bc7b','#d9a371'];
const actors=[...document.querySelectorAll('[data-actor]')].map(c=>new CastPlayer(c,castManifest)),critic=new CastPlayer($('#critic'),castManifest);
let g=createGame(),started=false,last=0,gravity=0,best=0,sound=false,audio,shine=0,reactionTimer;
try{best=Number(localStorage.getItem('pa-housing-best'))||0;}catch{}
function actorState(state,loop=true){actors.forEach((p,i)=>p.play(ids[i],state,{loop}).catch(()=>{}));}
function criticState(){critic.play('cruz',g.homes>=40?'disbelief':'angry',{loop:true}).catch(()=>{});}
actorState('mock');criticState();
function tone(freq){if(!sound)return;try{audio??=new AudioContext();audio.resume();const o=audio.createOscillator(),v=audio.createGain();o.connect(v);v.connect(audio.destination);o.frequency.value=freq;v.gain.setValueAtTime(.035,audio.currentTime);v.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.12);o.start();o.stop(audio.currentTime+.13);}catch{}}
function hud(){
 $('#homes').textContent=g.homes;$('#score').textContent=g.score;$('#best').textContent=best;$('#lines').textContent=g.lines;$('#level').textContent=1+Math.floor(g.lines/10);
 $('#crew-label').textContent=`${names[g.crew]} is on the crane. The whole crew is building.`;
 const comments=['But have you considered doing nothing?','Okay, but those homes are politically motivated.','Where will the luxury empty lot go?','I was pro-housing before the homes existed.'];
 $('#heckle').textContent='“'+comments[Math.min(3,Math.floor(g.homes/40))]+'”';
 $('#neighborhood-label').textContent=g.homes?`${g.homes} homes completed. ${g.lines} floors that used to be an argument.`:"An empty lot. Let's change that.";
 const skyline=$('#skyline');skyline.replaceChildren();for(let i=0;i<Math.min(10,Math.ceil(g.lines/4));i++){const floors=Math.min(4,g.lines-i*4),b=document.createElement('div');b.className='building';b.style.height=(18+floors*20)+'px';for(let j=0;j<floors*4;j++)b.append(document.createElement('i'));skyline.append(b);}
 next.clearRect(0,0,120,100);const m=SHAPES[g.next],size=22,x=(120-m[0].length*size)/2,y=(100-m.length*size)/2;m.forEach((row,dy)=>row.forEach((v,dx)=>{if(v)tile(next,x+dx*size,y+dy*size,size,colors[g.next]);}));
}
function overlay(title,message,label){$('#title').textContent=title;$('#message').textContent=message;$('#start').textContent=label;$('#overlay').hidden=false;}
function start(){clearTimeout(reactionTimer);g=createGame();started=true;gravity=0;last=performance.now();$('#overlay').hidden=true;$('#pause').textContent='Pause';$('#call').textContent='New shift. All three are on the job.';actorState('mock');criticState();hud();canvas.focus();}
function pause(){if(!started||g.status==='lost')return;clearTimeout(reactionTimer);if(g.status==='paused'){g.status='playing';last=performance.now();gravity=0;$('#overlay').hidden=true;$('#pause').textContent='Pause';actorState('mock');criticState();canvas.focus();}else{g.status='paused';actors.forEach(p=>p.stop());critic.stop();$('#pause').textContent='Resume';overlay('Union break.','The crane is parked. Resume when ready.','Back to building →');}}
function result(event){if(!event)return;gravity=0;if(event.cleared){shine=.4;tone(event.cleared===4?880:660);$('#call').textContent=event.cleared===4?'FOUR FLOORS. Forty homes. Zero excuses.':`${event.cleared*10} homes finished. Get the next delivery up here.`;actorState('celebrate',false);clearTimeout(reactionTimer);reactionTimer=setTimeout(()=>{if(g.status==='playing')actorState('mock');},3800);criticState();}else tone(170);
 if(g.score>best){best=g.score;try{localStorage.setItem('pa-housing-best',String(best));}catch{}}
 hud();if(event.lost){clearTimeout(reactionTimer);actorState('shocked',false);$('#overline').textContent='SHIFT COMPLETE';overlay('Crane needs room.',`${g.homes} homes finished. ${g.lines} floors cleared. Ready for another shift?`,'Build another block →');$('#call').textContent='Completed homes stay on the scorecard. Give the next stack more room.';}
}
function action(a){if(!started||g.status!=='playing')return;if(a==='left')move(g,-1);if(a==='right')move(g,1);if(a==='rotate'){if(rotate(g))tone(320);}if(a==='down'){if(move(g,0,1)){g.score++;hud();}else result(tick(g));}if(a==='drop')result(drop(g));}
$('#start').onclick=()=>g.status==='paused'?pause():start();$('#pause').onclick=pause;$('#sound').onclick=()=>{sound=!sound;$('#sound').textContent=sound?'Sound on':'Sound off';$('#sound').setAttribute('aria-pressed',String(sound));tone(440);};
const keys={ArrowLeft:'left',a:'left',ArrowRight:'right',d:'right',ArrowUp:'rotate',w:'rotate',ArrowDown:'down',s:'down',' ':'drop'};
window.addEventListener('keydown',e=>{if(e.target instanceof HTMLButtonElement)return;if(e.key.toLowerCase()==='p'||e.key==='Escape'){e.preventDefault();pause();return;}const a=keys[e.key];if(a){e.preventDefault();if(e.repeat&&['rotate','drop'].includes(a))return;action(a);}});
let held,repeat;function release(){clearTimeout(held);clearInterval(repeat);held=repeat=null;}
document.querySelectorAll('[data-action]').forEach(b=>{b.addEventListener('pointerdown',e=>{e.preventDefault();release();const a=b.dataset.action;action(a);if(['left','right','down'].includes(a))held=setTimeout(()=>{repeat=setInterval(()=>action(a),90);},220);});});window.addEventListener('pointerup',release);window.addEventListener('pointercancel',release);
window.addEventListener('blur',()=>{release();if(started&&g.status==='playing')pause();});document.addEventListener('visibilitychange',()=>{if(document.hidden){release();if(started&&g.status==='playing')pause();}});
let touch;canvas.addEventListener('pointerdown',e=>{touch={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});canvas.addEventListener('pointerup',e=>{if(!touch)return;const dx=e.clientX-touch.x,dy=e.clientY-touch.y;if(Math.max(Math.abs(dx),Math.abs(dy))<15)action('rotate');else if(Math.abs(dy)>Math.abs(dx))action(dy>0?'drop':'rotate');else action(dx>0?'right':'left');touch=null;});canvas.addEventListener('pointercancel',()=>touch=null);
function tile(c,x,y,s,color,ghost=false){c.save();c.globalAlpha=ghost?.24:1;c.fillStyle=color;c.fillRect(x+1,y+1,s-2,s-2);c.fillStyle='#ffffff35';c.fillRect(x+2,y+2,s-4,3);c.fillStyle='#152833';c.fillRect(x+s*.2,y+s*.26,s*.23,s*.32);c.fillRect(x+s*.57,y+s*.26,s*.23,s*.32);c.fillStyle=ghost?'#ffffff55':'#fff0b3';c.fillRect(x+s*.23,y+s*.29,s*.17,s*.23);c.fillRect(x+s*.60,y+s*.29,s*.17,s*.23);c.fillStyle='#0004';c.fillRect(x+2,y+s-6,s-4,4);c.restore();}
function draw(){ctx.fillStyle='#0d1821';ctx.fillRect(0,0,320,640);ctx.strokeStyle='#ffffff06';ctx.lineWidth=1;for(let x=0;x<=10;x++){ctx.beginPath();ctx.moveTo(x*32,0);ctx.lineTo(x*32,640);ctx.stroke();}for(let y=0;y<=20;y++){ctx.beginPath();ctx.moveTo(0,y*32);ctx.lineTo(320,y*32);ctx.stroke();}
 g.board.forEach((row,y)=>row.forEach((id,x)=>{if(id)tile(ctx,x*32,y*32,32,colors[id-1]);}));if(g.status!=='lost'){const p=g.piece,y=ghostY(g);p.matrix.forEach((row,dy)=>row.forEach((v,dx)=>{if(v){tile(ctx,(p.x+dx)*32,(y+dy)*32,32,colors[p.id],true);tile(ctx,(p.x+dx)*32,(p.y+dy)*32,32,colors[p.id]);}}));}
 if(shine>0&&!matchMedia('(prefers-reduced-motion: reduce)').matches){ctx.fillStyle=`rgba(96,210,187,${shine*.4})`;ctx.fillRect(0,0,320,640);}
}
function frame(now){const dt=Math.min(100,now-last);last=now;shine=Math.max(0,shine-dt/1000);if(started&&g.status==='playing'){gravity+=dt;const interval=Math.max(120,820-Math.floor(g.lines/10)*65);if(gravity>=interval){gravity-=interval;result(tick(g));}}draw();requestAnimationFrame(frame);}hud();requestAnimationFrame(frame);
