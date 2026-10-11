export class CastPlayer {
  constructor(canvas, manifest) { this.canvas=canvas; this.ctx=canvas.getContext('2d'); this.manifest=manifest; this.images=new Map(); this.token=0; }
  async play(character,state,{loop=true,onComplete=()=>{}}={}) {
    const token=++this.token, clip=this.manifest.characters[character]?.[state];
    if(!clip) throw new Error(`Missing performance: ${character}/${state}`);
    let image=this.images.get(clip.image);
    if(!image){image=new Image(); image.src=clip.image; await image.decode(); this.images.set(clip.image,image);}
    if(token!==this.token)return;
    const start=performance.now(),ctx=this.ctx,c=this.canvas;
    const tick=now=>{
      if(token!==this.token)return;
      const still=matchMedia('(prefers-reduced-motion: reduce)').matches;const elapsed=still?0:Math.floor((now-start)*clip.fps/1000);
      const index=loop?elapsed%clip.frames:Math.min(elapsed,clip.frames-1);
      const sx=(index%clip.cols)*clip.fw,sy=Math.floor(index/clip.cols)*clip.fh;
      ctx.clearRect(0,0,c.width,c.height);
      const scale=(c.height/340)*(clip.displayBodyHeight||220)/(clip.referenceBodyHeight||clip.fh);
      ctx.drawImage(image,sx,sy,clip.fw,clip.fh,(c.width-clip.fw*scale)/2,c.height*.95-(clip.groundY??clip.fh)*scale,clip.fw*scale,clip.fh*scale);
      if(!loop&&elapsed>=clip.frames){onComplete();return;}
      if(!still)this.frame=requestAnimationFrame(tick);
    };this.frame=requestAnimationFrame(tick);
  }
  stop(){this.token++;cancelAnimationFrame(this.frame);}
}
