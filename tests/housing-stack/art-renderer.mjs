import {housingArt} from './housing-art-meta.mjs';
const atlas=new Image(),scene=new Image();atlas.src='/art/housing-stack/facades-v3.webp';scene.src='/art/housing-stack/neighborhood-v3.webp';
const ready=im=>im.complete&&im.naturalWidth>0;
export function apartmentTile(c,id,x,y,size,{ghost=false}={}){
 if(!ready(atlas))return false;const cell=housingArt.cells[id];if(!cell)return false;
 c.save();if(ghost){c.globalAlpha=.20;}c.drawImage(atlas,cell.x,cell.y,cell.w,cell.h,x+1,y+1,size-2,size-2);if(ghost){c.globalAlpha=.65;c.strokeStyle='#fff1ba';c.lineWidth=1;c.strokeRect(x+1.5,y+1.5,size-3,size-3);}c.restore();return true;
}
export function boardBackdrop(c,w,h){
 if(!ready(scene))return false;c.drawImage(scene,0,h-w,w,w);c.fillStyle='#071224b8';c.fillRect(0,0,w,h);return true;
}
export function paintNeighborhood(canvas,lines){
 const c=canvas.getContext('2d'),w=canvas.width,h=canvas.height;c.clearRect(0,0,w,h);
 const sky=c.createLinearGradient(0,0,0,h);sky.addColorStop(0,'#152740');sky.addColorStop(1,'#4c4658');c.fillStyle=sky;c.fillRect(0,0,w,h);if(ready(scene)){const cropH=scene.naturalWidth*h/w;c.drawImage(scene,0,scene.naturalHeight*.52,scene.naturalWidth,cropH,0,0,w,h);}
 if(!ready(atlas))return;
 const base=h*.80,size=23,gap=9,start=w*.24,first=Math.max(0,Math.ceil(lines/4)-6);
 for(let b=0;b<6;b++){const index=first+b,floors=Math.max(0,Math.min(4,lines-index*4));if(!floors)continue;const x=start+b*(size*3+gap),color=index%7;
  for(let floor=0;floor<floors;floor++)for(let room=0;room<3;room++)apartmentTile(c,floor===0&&room===1?8:color,x+room*size,base-(floor+1)*size,size);
  for(let room=0;room<3;room++)apartmentTile(c,7,x+room*size,base-(floors+1)*size,size);
 }

}
