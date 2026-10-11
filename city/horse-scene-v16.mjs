import {drawPerson,peopleReady} from '/tests/outreach-route/people-v7.mjs?v=10.0';
import {horseState,HEROES} from './horse-state-v16.mjs?v=17.0';
import {courtRim,courtBasketFloor} from './court-geometry-v15.mjs?v=16.0';
let clips={},images={};export const horseReady=fetch(new URL('./horse-clips-v16.json?v=16.0',import.meta.url)).then(r=>{if(!r.ok)throw Error('Basketball animation metadata unavailable');return r.json();}).then(async data=>{clips=data;await peopleReady;await Promise.all(HEROES.flatMap(id=>Object.entries(clips[id]).map(async([action,clip])=>{const im=new Image();im.src=clip.src;images[id+'-'+action]=im;await im.decode();})));});
const clamp=n=>Math.max(0,Math.min(1,n));
function factor(clip){return(clip.fills?clip.fh/clip.body:1/(clip.fill||1))*(clip.bodyScale||1)*(clip.characterScale||1);}
function frameOf(clip,action,age){if(action==='shot'){const release=clip.releaseTime||.3,rf=clip.releaseFrame||3,last=clip.play??clip.frames-1;return Math.min(last,Math.floor(age<release?age/release*rf:rf+(age-release)/Math.max(.01,(clip.duration||1.05)-release)*(last-rf)));}if(action==='celebrate')return Math.min(clip.frames-1,Math.floor(age*(clip.fps||12)));return Math.floor(age*(clip.fps||8))%clip.frames;}
function anatomy(actor,action=actor.action,frame=null){const clip=clips[actor.id]?.[action];if(!clip)return null;frame=frame??frameOf(clip,action,actor.age);const height=actor.height*factor(clip)/factor(clips[actor.id].idle),width=height*clip.fw/clip.fh,foot=clip.feet?.[Math.min(frame,clip.feet.length-1)]??1,origin=clip.originX??.5,crop=clip.cropTop||0,face=(actor.face||1)*(clip.sourceFacing||1);return{clip,frame,height,width,foot,origin,crop,face};}
function hand(actor,action=actor.action,frame=null,release=false){if(actor.id==='kid')return {x:actor.x+5,y:actor.y-actor.height*(action==='shot'?.78:.46)};const a=anatomy(actor,action,frame);if(!a)return{x:actor.x+8,y:actor.y-20};let h=a.clip.hands?.[a.frame]??a.clip.releaseHand??[.8,.55];if(action==='shot'&&!release){const keys=a.clip.handKeys||[];let first=keys[0],last=keys.at(-1);for(let i=1;i<keys.length;i++)if(a.frame<=keys[i][0]){first=keys[i-1];last=keys[i];break;}if(first&&last){const u=clamp((a.frame-first[0])/Math.max(1,last[0]-first[0]));h=[first[1]+(last[1]-first[1])*u,first[2]+(last[2]-first[2])*u];}}return{x:actor.x+a.face*(h[0]-a.origin)*a.width,y:actor.y-a.height*a.foot+h[1]*a.height};}
export function paintHorseActor(c,actor){if(actor.id==='kid'){drawPerson(c,'boy',actor.x,actor.y,{height:actor.height,state:actor.action==='move'?'walk':'idle',phase:actor.age,flip:actor.face<0,motionKey:'court-kid'});return;}const a=anatomy(actor),im=images[actor.id+'-'+actor.action];if(!a||!im?.naturalWidth)return;c.save();c.fillStyle='#203c3a48';c.beginPath();c.ellipse(actor.x,actor.y+2,actor.height*.18,2.4,0,0,Math.PI*2);c.fill();c.translate(actor.x,actor.y);c.scale(a.face,1);const source=a.clip.frameOrder?.[a.frame]??a.frame,padding=a.clip.padding||0,sx=source%(a.clip.cols||a.clip.frames)*(a.clip.fw+padding*2)+padding,sy=Math.floor(source/(a.clip.cols||a.clip.frames))*(a.clip.fh+padding*2)+padding+a.crop*a.clip.fh;c.drawImage(im,sx,sy,a.clip.fw,a.clip.fh*(1-a.crop),-a.width*a.origin,-a.height*(a.foot-a.crop),a.width,a.height*(1-a.crop));c.restore();}
export function horseBall(slot,clock,reduced=false){
 const s=horseState(slot,clock,reduced),actor=s.actors.find(a=>a.id===s.active),clip=clips[s.active]?.shot??{releaseTime:.3,releaseFrame:3};
 if(reduced)return hand({...actor,action:'idle',age:0});
 if(s.age<3){const p=hand(actor);if(actor.action==='dribble'){const d=clips[actor.id]?.dribble,u=d?(actor.age*(d.fps||12)/d.frames)%1:(actor.age%1),phase=d?.ballPath||{},start=phase.releasePhase??.1,end=phase.catchPhase??.9;if(u>=start&&u<=end)p.y+=(actor.y-3-p.y)*Math.sin((u-start)/(end-start)*Math.PI);}return p;}
 const release=3+(clip.releaseTime||.3),from=hand({...actor,...s.shooter,face:1},'shot',clip.releaseFrame||3,true),rim=courtRim(slot),target=s.made?rim:{x:rim.x+14,y:rim.y+7},flight=.9;
 if(s.age<release)return hand(actor);
 if(s.age<release+flight){const u=clamp((s.age-release)/flight);return{x:from.x+(target.x-from.x)*u,y:from.y+(target.y-from.y)*u-Math.sin(u*Math.PI)*actor.height*.8};}
 const floor=s.drop,fall=clamp((s.age-release-flight)/.45);
 if(s.age<6.15)return {x:target.x,y:target.y+(floor.y-target.y)*fall*fall};
 const rebounder=s.actors.find(a=>a.id===s.rebounder),held=hand({...rebounder,action:'idle',age:0});
 // The ball rises only once the rebounder has arrived, then stays in their possession.
 if(s.age<6.65){const u=clamp((s.age-6.15)/.5);return{x:floor.x+(held.x-floor.x)*u,y:floor.y+(held.y-floor.y)*u};}
 if(s.age<11)return held;
 const receiver=hand({...s.actors.find(a=>a.id===s.next),action:'idle',age:0}),u=clamp(s.age-11);
 return{x:held.x+(receiver.x-held.x)*u,y:held.y+(receiver.y-held.y)*u-Math.sin(u*Math.PI)*10};
}
export function paintHorseBall(c,slot,clock,reduced=false){const p=horseBall(slot,clock,reduced);if(!p)return;c.save();c.fillStyle='#e1943c';c.strokeStyle='#59391f';c.lineWidth=.8;c.beginPath();c.arc(p.x,p.y,slot<3?3.1:3.6,0,Math.PI*2);c.fill();c.stroke();c.beginPath();c.moveTo(p.x-3,p.y);c.lineTo(p.x+3,p.y);c.stroke();c.restore();}
