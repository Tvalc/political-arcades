import{body,motion,burst,separation,W,H,K,DT}from'./fwoosh-motion.mjs';
export{DT,W,H};
const recipients=['trump','rogers','vance','cruz','greene'];
const remarks=['I was told this was a ribbon cutting.','That award has no jurisdiction here.','Can we take the photo without the trophy?','My team will circle back to your question.','This is clearly a major endorsement.','I accept, pending a recount.'];
export function create(seed=Date.now()){let state=seed>>>0;const rand=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296};const g={rand,mode:'ready',time:0,p:body(),jason:{x:130,y:1030},targets:[],nextCast:0,aides:[],nextAideCast:0,pending:[],banked:0,score:0,delivered:0,attention:0,filmHeld:false,filmProgress:0,filmTimer:0,nextAide:8,spawn:0,handoff:0,notice:'Find a recipient. Get the trophy in the shot.',noticeT:4,effects:[],result:null};for(let i=0;i<4;i++)addTarget(g,i);return g}
function addTarget(g,i){g.targets.push({cast:recipients[g.nextCast++%recipients.length],id:g.delivered+'-'+i+'-'+g.time,x:130+g.rand()*460,y:230+g.rand()*530,dir:g.rand()*Math.PI*2,speed:78+g.rand()*26,t:0,awarded:false,exitT:0,remark:remarks[Math.floor(g.rand()*remarks.length)]})}
export function start(g){if(g.mode==='ready')g.mode='play'}
export function message(g,s){g.notice=s;g.noticeT=3}
export function pause(g){if(g.mode==='play')g.mode='paused';else if(g.mode==='paused')g.mode='play';g.filmHeld=false}
export function dash(g,x,y){if(g.mode!=='play')return false;g.filmHeld=false;if(g.handoff>0){g.pendingDash=[x,y];return false}return burst(g.p,x,y)}
export function film(g,v){if(g.mode!=='play')return;g.filmHeld=v;if(v&&separation(g.p,g.jason)>160)message(g,'Get close to Jason, then hold FILM.');}
function finish(g,won,cause){if(g.mode!=='play')return;g.mode=won?'won':'lost';g.filmHeld=false;g.p.venting=false;g.result={won,cause,score:g.score,clips:g.banked,delivered:g.delivered,unbanked:g.pending.length,time:g.time}}
export function step(g,steer=null,dt=DT){if(g.mode!=='play')return;g.time+=dt;g.handoff=Math.max(0,g.handoff-dt);if(g.handoff===0&&g.pendingDash){burst(g.p,...g.pendingDash);g.pendingDash=null;}g.noticeT=Math.max(0,g.noticeT-dt);const p=g.p;
 const nearCamera=separation(p,g.jason)<=160;const committing=p.ventUnit>0;
 if(!committing&&g.filmHeld&&nearCamera){if(g.pending.length||p.hp<1){p.ventUnit=g.pending.length?K.VENT_PURGE:.6;g.filmTimer=p.ventUnit;p.venting=true;g.filmProgress=0}else{g.filmHeld=false;message(g,'Nothing to bank yet. Catch another recipient.')}}
 p.venting=p.ventUnit>0||g.handoff>0;
 let candidates=g.targets.filter(q=>!q.awarded);const aim=g.attention>=4?g.jason:candidates.sort((a,b)=>separation(p,a)-separation(p,b))[0]||g.jason;
 motion(p,dt,steer,aim);
 if(p.ventUnit>0){p.ventUnit=Math.max(0,p.ventUnit-dt);g.filmProgress=1-p.ventUnit/g.filmTimer;if(p.ventUnit===0){if(g.pending.length){const reward=g.pending.shift();g.score+=reward;g.banked++;g.attention=Math.max(0,g.attention-1);p.hp=Math.min(1,p.hp+.16);message(g,'CLIP SAVED +'+reward+' · '+g.banked+'/8');g.effects.push({x:p.x,y:p.y,text:'CLIP SAVED',t:1.1})}else p.hp=Math.min(1,p.hp+.2);p.venting=false;if(p.ventDash){const d=p.ventDash;p.ventDash=null;burst(p,...d)}if(g.banked>=8){finish(g,true,'Eight trophies. Eight very awkward clips.');return}}}
 if(!p.venting){p.hp=Math.min(1,p.hp+dt*(g.attention?-g.attention*K.HP_DRAIN:K.HP_REGEN));if(p.hp<=0){p.hp=0;finish(g,false,'Too much attention. The press pass got pulled.');return}}
 for(const q of g.targets){q.t+=dt;if(q.awarded){q.exitT+=dt;if(q.exitT>1.2)q.y-=dt*95;continue}const close=separation(p,q)<170;let a=q.dir+Math.sin(q.t*.8)*.4;if(close){a=Math.atan2(q.y-p.y,q.x-p.x);q.dir=a}q.x+=Math.cos(a)*q.speed*dt;q.y+=Math.sin(a)*q.speed*dt;if(q.x<110||q.x>W-110){q.x=Math.max(110,Math.min(W-110,q.x));q.dir=Math.PI-q.dir}if(q.y<240||q.y>H-150){q.y=Math.max(240,Math.min(H-150,q.y));q.dir=-q.dir}
  if(separation(p,q)<60&&g.attention<6){q.awarded=true;g.delivered++;g.attention++;g.pending.push(Math.round(120*(1+(g.attention-1)*.5)));g.handoff=1.2;message(g,'AWARD DELIVERED! “'+q.remark+'”');g.effects.push({x:q.x,y:q.y,text:'AWARDED!',t:1.5});if(g.delivered===1)g.nextAide=Math.min(g.nextAide,g.time+3)}}
 g.targets=g.targets.filter(q=>!q.awarded||q.exitT<2.2);g.spawn-=dt;if(g.spawn<=0&&g.targets.filter(q=>!q.awarded).length<4){addTarget(g,Math.floor(g.time));g.spawn=2.8}
 if(g.time>=g.nextAide){if(g.aides.length<5){const left=g.rand()<.5;g.aides.push({cast:g.nextAideCast++%2?'ice':'bongino',x:left?105:615,y:220+g.rand()*850,warn:.75,stun:0})}g.nextAide=g.time+Math.max(6,12-g.delivered*.4)}
 for(const a of g.aides){a.warn=Math.max(0,a.warn-dt);a.stun=Math.max(0,a.stun-dt);if(a.warn>0||a.stun>0)continue;const d=separation(a,p),ux=(p.x-a.x)/(d||1),uy=(p.y-a.y)/(d||1);a.x+=ux*dt*(95+g.attention*6);a.y+=uy*dt*(95+g.attention*6);if(d<52){if(p.lunge>0){a.stun=1.5;a.x-=ux*80;a.y-=uy*80;g.effects.push({x:a.x,y:a.y,text:'WRONG WAY!',t:.8})}else if(p.hurtCd<=0){p.hp=Math.max(0,p.hp-.17);p.hurtCd=.8;p.ventUnit=0;p.ventDash=null;p.venting=false;g.filmHeld=false;p.knockT=.14;p.hx=ux;p.hy=uy;message(g,'AIDE INTERRUPTED THE SHOT. Burst clear!');if(p.hp<=0){finish(g,false,'Escorted out. At least they noticed.');return}}}}
 for(const e of g.effects)e.t-=dt;g.effects=g.effects.filter(e=>e.t>0);
}
