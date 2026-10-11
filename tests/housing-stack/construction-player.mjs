import {CastPlayer} from './cast-player.mjs';
import {workMeta} from './construction-meta.mjs';
// Resolve against this module, including when the game is embedded in a preview.
const workImage=new Image();
workImage.src=new URL('../../art/pothole-party/work-crew-v17.webp',import.meta.url).href;
export class ConstructionPlayer extends CastPlayer{
 async play(character,state,options={}){
  if(!['working','celebrate','shocked'].includes(state))return super.play(character,state,options);
  this.stop();
  const token=this.token;
  try{await workImage.decode();}catch(error){
   // A missing construction sheet must never substitute basketball performances.
   console.warn('Construction crew art unavailable',error);
   return;
  }
  if(token!==this.token)return;
  const hero=['mamdani','sayed','talarico'].indexOf(character);
  if(hero<0)return;
  const row=hero*3,m=workMeta,r=m.rows[row],c=this.canvas,ctx=this.ctx,start=performance.now();
  const draw=now=>{
   if(token!==this.token)return;
   const elapsed=now-start,still=matchMedia('(prefers-reduced-motion: reduce)').matches||state==='shocked';
   const frame=still?0:Math.floor(elapsed/180)%m.frames;
   const lift=state==='celebrate'&&!still?Math.max(0,Math.sin(elapsed/140))*7:0;
   ctx.clearRect(0,0,c.width,c.height);
   const scale=c.height*.77/r.height;
   ctx.drawImage(workImage,frame*m.fw,row*m.fh,m.fw,m.fh,c.width/2-r.anchor*scale,c.height*.94-244*scale-lift,m.fw*scale,m.fh*scale);
   if(!still&&(state==='working'||elapsed<1500))this.frame=requestAnimationFrame(draw);
  };
  this.frame=requestAnimationFrame(draw);
 }
}
