import{W,H,LEVELS,PADS,DESKS,createGame,start,step,distance}from'./engine.mjs';

const $=id=>document.getElementById(id),canvas=$('game'),c=canvas.getContext('2d');

let state=createGame(),paused=false,loaded=false,assets={},last=0,acc=0,seen=0,particles=[],texts=[],noticeUntil=0,shake=0,keys=new Set(),joy={x:0,y:0,id:null},sprayHeld=false,burstPressed=false,sound=false,audio=null,best=0;

try{best=Number(localStorage.getItem('sammy-fire-best')||0);if(!Number.isFinite(best))best=0;}catch{}

const image=src=>new Promise((res,rej)=>{const i=new Image;i.onload=()=>res(i);i.onerror=rej;i.src=src;});

async function load(){try{const [bg,master,motion,meta,eraser,tap,bell,fire]=await Promise.all([image('theater.webp'),image('sammy-poster.webp'),image('sammy-motion.webp'),fetch('sammy-motion.json').then(r=>{if(!r.ok)throw Error('motion metadata');return r.json();}),image('eraser.webp'),image('tap.webp'),image('bell.webp'),image('flame-motion.webp')]);assets={bg,master,motion,meta,eraser,tap,bell,fire};loaded=true;$('start').disabled=false;$('start').textContent='PUT THE FIRES OUT';}catch(e){$('start').textContent='ART LOAD FAILED';$('load-error').hidden=false;console.error(e);}}

function tone(hz=400,d=.1,type='sine',volume=.06){if(!sound)return;try{audio??=new AudioContext;audio.resume();const o=audio.createOscillator(),g=audio.createGain();o.type=type;o.frequency.value=hz;g.gain.setValueAtTime(volume,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+d);o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+d);}catch{}}

function announce(t,d=2){$('notice').textContent=t;$('notice').classList.add('on');noticeUntil=state.time+d;}

function restart(){state=createGame();start(state);paused=false;seen=0;particles=[];texts=[];acc=0;keys.clear();sprayHeld=false;burstPressed=false;joy.x=joy.y=0;$('intro').hidden=$('result').hidden=$('paused').hidden=true;$('pause').textContent='PAUSE';tone(370,.1);canvas.focus();}

function pause(){if(state.phase!=='play')return;paused=!paused;$('paused').hidden=!paused;keys.clear();sprayHeld=false;$('spray').classList.remove('held');joy.x=joy.y=0;setKnob(0,0);}

$('start').onclick=restart;$('again').onclick=restart;$('pause').onclick=pause;$('resume').onclick=pause;$('sound').onclick=()=>{sound=!sound;$('sound').textContent=sound?'SOUND ON':'SOUND OFF';$('sound').setAttribute('aria-label',sound?'Disable sound':'Enable sound');tone();};

for(const [id,down,up]of[['spray',()=>{sprayHeld=true;$('spray').classList.add('held');tone(230,.04);},()=>{sprayHeld=false;$('spray').classList.remove('held');}],['burst',()=>{burstPressed=true;},()=>{}]]){const el=$(id);el.addEventListener('pointerdown',e=>{e.preventDefault();el.setPointerCapture(e.pointerId);down();});for(const ev of['pointerup','pointercancel','lostpointercapture'])el.addEventListener(ev,up);el.addEventListener('contextmenu',e=>e.preventDefault());}

function setKnob(x,y){$('knob').style.transform=`translate(${x*22}px,${y*19}px)`;}

const stick=$('stick');function readJoy(e){const r=stick.getBoundingClientRect();let x=(e.clientX-r.left-r.width/2)/(r.width*.37),y=(e.clientY-r.top-r.height*.44)/(r.height*.4),n=Math.hypot(x,y);if(n<.12)x=y=0;else if(n>1){x/=n;y/=n;}joy.x=x;joy.y=y;setKnob(x,y);}

stick.addEventListener('pointerdown',e=>{if(joy.id!==null)return;e.preventDefault();joy.id=e.pointerId;stick.setPointerCapture(e.pointerId);readJoy(e);});stick.addEventListener('pointermove',e=>{if(e.pointerId===joy.id)readJoy(e);});for(const ev of['pointerup','pointercancel','lostpointercapture'])stick.addEventListener(ev,e=>{if(e.pointerId===joy.id){joy.id=null;joy.x=joy.y=0;setKnob(0,0);}});

addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ','w','a','s','d','e','Escape'].includes(e.key)){if(state.phase==='play')e.preventDefault();if(e.key==='Escape'&&!e.repeat)pause();keys.add(e.key.toLowerCase());}});addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));addEventListener('blur',()=>{if(!paused&&state.phase==='play')pause();});document.addEventListener('visibilitychange',()=>{if(document.hidden&&!paused&&state.phase==='play')pause();});

function inputs(){return{x:joy.x+(keys.has('arrowright')||keys.has('d')?1:0)-(keys.has('arrowleft')||keys.has('a')?1:0),y:joy.y+(keys.has('arrowdown')||keys.has('s')?1:0)-(keys.has('arrowup')||keys.has('w')?1:0),spray:sprayHeld||keys.has(' '),burst:burstPressed||keys.has('e')};}

function pLost(){state.player.action='defeat';state.player.anim=0;}

function fx(){for(const e of state.events){if(e.id<=seen)continue;seen=e.id;if(e.type==='out'){for(let n=0;n<23;n++)particles.push({x:e.x,y:e.y,vx:Math.cos(n)*85,vy:Math.sin(n)*85-35,t:.6,max:.6,color:n%2?'#a7edc9':'#fff0b6',r:2+n%3});texts.push({x:e.x,y:e.y-50,t:1.2,text:e.text});tone(500+state.combo*100,.15);}

 if(e.type==='lose'){pLost();}

 if(e.type==='hurt'){shake=7;tone(130,.18,'triangle');}

 if(e.type==='burst'){shake=4;announce('CEASE-FIRE! Every equation cools down.',2);tone(700,.3);for(let i=0;i<70;i++)particles.push({x:e.x,y:e.y,vx:Math.cos(i)*280,vy:Math.sin(i)*280,t:.8,max:.8,color:'#9aebe2',r:4});}

 if(e.type==='stage')announce(`${LEVELS[state.stage].name} · ${LEVELS[state.stage].subtitle}`,2.7);

 if(e.type==='warning'){texts.push({x:e.x,y:e.y-45,t:1.8,text:'INCOMING!'});tone(250,.08,'triangle');}

 if(e.type==='clear'){announce(state.stage===2?'THE MATH CHECKS OUT. Class dismissed!':'THE MATH CHECKS OUT. Next lesson...',2.4);tone(880,.4);}

 }

 if((state.phase==='won'||state.phase==='lost'&&state.player.anim>=2.2)&&$('result').hidden){const win=state.phase==='won',timedOut=!win&&state.player.hp>0;best=Math.max(best,state.score);try{localStorage.setItem('sammy-fire-best',String(best));}catch{}$('result-kicker').textContent=win?'ALL THREE LESSONS CLEARED':timedOut?'THE BELL BEAT YOU':'THE ALPHABET GOT OUT OF HAND';$('result-title').innerHTML=win?'CLASS<br>DISMISSED.':'MATH IS<br>STILL HARD.';$('result-copy').textContent=win?`${state.totalOut} fires out. Finally, a lesson without heated arguments.`:timedOut?`${state.totalOut} fires out. Clear every fire before the bell. Spray while moving and save Cease-fire for a crowded board.`:`${state.totalOut} fires out. Keep some distance, and top up at the blue taps.`;$('result-score').textContent=state.score.toLocaleString();$('best').textContent=`PERSONAL BEST ${best.toLocaleString()}`;$('result').hidden=false;tone(win?880:150,.4);}}

function rounded(x,y,w,h,r,fill,stroke){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.stroke();}}

function text(t,x,y,size=16,color='#f1ecd5',align='center'){c.textAlign=align;c.font=`800 ${size}px system-ui`;c.fillStyle=color;c.fillText(t,x,y);}

function sprite(action,time,x,y,face=1,height=114){if(!assets.motion)return;const m=assets.meta,a=m.actions[action]||m.actions.idle;const n=a.hi-a.lo+1;let f=a.lo+(a.loop?Math.floor(time*n/a.duration)%n:Math.min(n-1,Math.floor(time*n/a.duration)));const tw=m.width||m.size;c.save();c.translate(x,y);c.scale(face,1);c.drawImage(assets.motion,(f%m.cols)*tw,Math.floor(f/m.cols)*m.size,tw,m.size,-height*tw/m.size/2,-height*m.baseline/m.size,height*tw/m.size,height);c.restore();}

function flame(f,t){const hot=f.heat/100,size=94+hot*18;const g=c.createRadialGradient(f.x,f.y-25,2,f.x,f.y-25,83);g.addColorStop(0,'#ffb34545');g.addColorStop(1,'#ff8c0000');c.fillStyle=g;c.fillRect(f.x-83,f.y-108,166,166);if(assets.fire){const n=Math.floor(t*24+f.id*13)%96;c.drawImage(assets.fire,(n%10)*128,Math.floor(n/10)*128,128,128,f.x-size/2,f.y+8-size*120/128,size,size);}}

function draw(dt){const s=state,p=s.player,t=s.time;c.clearRect(0,0,W,H);c.save();if(shake>0&&!paused)c.translate(Math.sin(t*87)*shake,Math.cos(t*71)*shake);if(assets.bg)c.drawImage(assets.bg,0,0,W,H);else{c.fillStyle='#21413d';c.fillRect(0,0,W,H);}

 c.save();c.globalCompositeOperation='screen';for(let i=0;i<4;i++){const x=103+i*130,g=c.createRadialGradient(x,40,4,x,80,84);g.addColorStop(0,'#ffd58c'+Math.round(14+Math.sin(t*.7+i)*3).toString(16).padStart(2,'0'));g.addColorStop(1,'#ffd58c00');c.fillStyle=g;c.fillRect(x-84,0,168,165);}c.restore();for(let i=0;i<17;i++){c.fillStyle='#d9dfb51c';c.beginPath();c.arc(50+(i*73+t*4)%500,140+(i*47+t*2)%510,1,0,Math.PI*2);c.fill();}
 // All lettering stays in code, so generated art cannot corrupt it.

 rounded(63,56,474,72,12,'#122d2cbf','#83a18a');text('A² + B² = C²',300,91,27,'#e8e8cb');text(s.transition>0?'LESSON COMPLETE':LEVELS[Math.min(s.stage,2)].name+'  /  '+(Math.min(s.stage,2)+1)+' OF 3',300,113,10,'#a8d4bb');

 c.strokeStyle='#89b09b18';c.lineWidth=1;for(let x=72;x<540;x+=38){c.beginPath();c.moveTo(x,148);c.lineTo(x,660);c.stroke();}for(let y=151;y<665;y+=38){c.beginPath();c.moveTo(46,y);c.lineTo(554,y);c.stroke();}

 for(const r of DESKS){rounded(r.x+3,r.y+7,r.w,r.h,7,'#09282480');if(assets.eraser)c.drawImage(assets.eraser,r.x-5,r.y-8,r.w+10,r.h+12);}

 for(const pad of PADS){const near=distance(p,pad)<49;const glow=c.createRadialGradient(pad.x,pad.y,3,pad.x,pad.y,46);glow.addColorStop(0,near?'#90f4ed77':'#4dcadd33');glow.addColorStop(1,'#5fd6df00');c.fillStyle=glow;c.fillRect(pad.x-46,pad.y-46,92,92);c.beginPath();c.arc(pad.x,pad.y,32,0,Math.PI*2);c.fillStyle='#123c48';c.fill();c.strokeStyle='#8ee3e3';c.lineWidth=2;c.stroke();if(assets.tap)c.drawImage(assets.tap,pad.x-27,pad.y-38,54,64);text('REFILL',pad.x,pad.y+24,9,'#b8eee9');}

 // Equations live on clearly marked tiles, not on the scenery.

 for(const f of s.fires){rounded(f.x-35,f.y-26,70,49,7,f.heat>0?'#522c23':'#2e5649',f.heat>0?'#d68a5b':'#73987c');text(f.letter+'²',f.x,f.y+7,28,f.heat>0?'#ffefd0':'#b6dfbe');if(f.heat>0){flame(f,t);text(f.letter+'²',f.x,f.y+56,24,'#ffe5ba');rounded(f.x-28,f.y+30,56,4,2,'#12241e');rounded(f.x-28,f.y+30,56*f.heat/100,4,2,'#ffd18c');}else if(f.seal>0){text('✓',f.x+27,f.y-26,18,'#bcf1b9');}if(f.warning>0){c.beginPath();c.arc(f.x,f.y,43+Math.sin(t*14)*4,0,Math.PI*2);c.strokeStyle='#ffdf99';c.lineWidth=3;c.stroke();text('!',f.x,f.y-48,27,'#ffe4ae');}}

 if(s.phase==='intro')sprite('idle',performance.now()/1000,300,580,1,145);else{

 c.fillStyle='#071f2166';c.beginPath();c.ellipse(p.x,p.y+2,23,8,0,0,Math.PI*2);c.fill();

 if(p.inv<=0||Math.floor(t*12)%3!==0)sprite(p.action,p.anim,p.x,p.y,p.face,135);

 if(s.target!==null&&s.fires[s.target]?.heat>0){const f=s.fires[s.target];c.strokeStyle=s.spraying?'#d8fbf0':'#d7ebbd77';c.lineWidth=2;c.setLineDash([3,6]);c.beginPath();c.arc(f.x,f.y-7,39,0,Math.PI*2);c.stroke();c.setLineDash([]);if(s.spraying){const ox=p.x+p.face*29,oy=p.y-58;for(let j=0;j<3;j++){c.beginPath();c.moveTo(ox,oy);c.quadraticCurveTo((ox+f.x)/2,(oy+f.y)/2-17+Math.sin(t*26+j)*8,f.x+(j-1)*6,f.y-8);c.strokeStyle=['#3b9fcf99','#7cdeeadd','#e1ffedcc'][j];c.lineWidth=8-j*2;c.stroke();}for(let j=0;j<6;j++){const u=((t*2+j/6)%1);c.fillStyle='#dcfff4';c.beginPath();c.arc(ox+(f.x-ox)*u,oy+(f.y-8-oy)*u-Math.sin(u*Math.PI)*13,1.8,0,Math.PI*2);c.fill();}}}

 if(s.refilling&&p.water<100){text('REFILLING',p.x,p.y-120,10,'#bcf4e4');}}

 for(const q of particles){c.globalAlpha=Math.max(0,q.t/q.max);c.fillStyle=q.color;c.beginPath();c.arc(q.x,q.y,q.r,0,Math.PI*2);c.fill();}c.globalAlpha=1;for(const q of texts){text(q.text,q.x,q.y,19,'#fff0b9');}if(s.transition>0){rounded(107,309,386,81,12,'#173a31ef','#c6d5a1');text('THE MATH CHECKS OUT.',300,343,23);text('A cooler head prevails.',300,370,13,'#b9e6c4');}c.restore();

 if(!paused&&s.phase==='play'){for(const q of particles){q.t-=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;q.vy+=65*dt;}particles=particles.filter(q=>q.t>0);for(const q of texts){q.t-=dt;q.y-=25*dt;}texts=texts.filter(q=>q.t>0);shake=Math.max(0,shake-dt*24);} }

function hud(){const s=state,p=s.player;$('clock').textContent=`BELL ${Math.max(0,Math.ceil(LEVELS[Math.min(s.stage,2)].limit-s.stageTime))}s`;$('stage').textContent=`LESSON ${Math.min(s.stage+1,3)} / 3`;$('fires').textContent=s.phase==='intro'?'READY TO START':s.transition>0?'ALL FIRES OUT':`${s.fires.filter(f=>f.heat>0).length} FIRES LEFT`;$('score').textContent=s.score.toLocaleString();$('water').style.width=p.water+'%';$('water-text').textContent=Math.ceil(p.water)+'%';$('water').style.background=p.water<20?'#ffae83':'#7fe0e7';$('hearts').textContent='♥ '.repeat(Math.max(0,p.hp))+'♡ '.repeat(Math.max(0,5-p.hp));$('hearts').setAttribute('aria-label',p.hp+' hearts');$('burst').disabled=s.charge<5||s.phase!=='play'||paused;$('charge').textContent=s.charge>=5?'READY!':`${s.charge} / 5`;$('hint').textContent=s.refilling&&p.water<99?'Refilling. Stay on the blue tap.':p.water<20?'LOW WATER! Head to a blue tap.':s.target!==null?'Hold SPRAY. Keep out of the flames.':'Get close enough to aim at a fire.';if(s.time>noticeUntil)$('notice').classList.remove('on');}

function frame(now){const dt=Math.min(.1,(now-last)/1000||0);last=now;if(!paused&&state.phase==='play'){acc+=dt;while(acc>=1/60){step(state,1/60,inputs());burstPressed=false;acc-=1/60;}}if(!paused){if(state.phase==='lost')state.player.anim+=dt;fx();}draw(dt);hud();requestAnimationFrame(frame);}load();requestAnimationFrame(frame);
