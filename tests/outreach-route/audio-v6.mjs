const KEY='pa-outreach-sound-v1';let ctx,enabled=true;
try{enabled=localStorage.getItem(KEY)!=='off';}catch{}
export function soundEnabled(){return enabled;}
export function unlockSound(){if(!enabled)return;try{ctx??=new (window.AudioContext||window.webkitAudioContext)();if(ctx.state==='suspended')ctx.resume().catch(()=>{});}catch{}}
export function toggleSound(){enabled=!enabled;try{localStorage.setItem(KEY,enabled?'on':'off');}catch{}if(enabled){unlockSound();sound('pickup');}return enabled;}
export function sound(kind){if(!enabled||!ctx||ctx.state!=='running')return;const notes={turn:[[420,.035,0,.012]],drop:[[330,.10,0,.045],[440,.15,.075,.04]],early:[[250,.12,0,.05],[210,.17,.11,.035]],repair:[[523,.13,0,.045],[659,.15,.09,.04],[784,.2,.18,.035]],pickup:[[659,.13,0,.05],[880,.16,.08,.04],[1047,.25,.16,.035]],loss:[[220,.15,0,.05],[165,.18,.12,.04],[110,.3,.26,.04]],start:[[392,.1,0,.04],[523,.2,.09,.035]]}[kind]||[];
for(const[f,d,delay,volume]of notes){const o=ctx.createOscillator(),gain=ctx.createGain(),t=ctx.currentTime+delay;o.type=kind==='loss'?'triangle':'sine';o.frequency.setValueAtTime(f,t);gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(volume,t+.007);gain.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(gain);gain.connect(ctx.destination);o.start(t);o.stop(t+d+.015);}}
