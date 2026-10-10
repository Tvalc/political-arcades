import {apartmentTile} from './art-renderer.mjs?v=4';
import {blockName} from './city-state.mjs';
const palette=['#57bba8','#e6b655','#b999dc','#70a7d0','#d88b76','#91bc7b','#d9a371'];
function box(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(x,y,w,h);}
function person(c,x,y,id,t,still=false){const bob=still?0:Math.sin(t*5+id)*1.3;c.fillStyle=palette[id%7];c.beginPath();c.roundRect(x-4,y-13+bob,8,11,3);c.fill();c.fillStyle=['#eac39f','#aa795b','#d3a57c'][id%3];c.beginPath();c.arc(x,y-16+bob,3.5,0,7);c.fill();box(c,x-3,y-3,2,5,'#182737');box(c,x+1,y-3,2,5,'#182737');}
function tree(c,x,y){box(c,x-3,y-25,6,27,'#92684c');for(const [dx,dy,r]of [[-10,-35,14],[10,-35,14],[0,-49,17]]){c.fillStyle='#498b6b';c.beginPath();c.arc(x+dx,y+dy,r,0,7);c.fill();}}
export function paintLivingBlock(canvas,floors,index,time=0,reduced=false,close=false){
 const c=canvas.getContext('2d');c.clearRect(0,0,canvas.width,canvas.height);c.save();c.scale(canvas.width/900,canvas.height/470);
 const t=reduced?0:time/1000,local=Math.max(0,Math.min(16,floors-index*16)),done=Math.floor(local/4),night=Math.sin(t/100)<-.5;
 if(close){const focus=125+Math.min(3,Math.floor(local/4))*195;c.translate(450,235);c.scale(1.4,1.4);c.translate(-Math.max(322,Math.min(578,focus)), -235);}
 const sky=c.createLinearGradient(0,0,0,470);sky.addColorStop(0,night?'#15243f':'#9bc7cb');sky.addColorStop(1,'#e2cdb0');c.fillStyle=sky;c.fillRect(0,0,900,470);
 box(c,0,315,900,72,'#c6b8a0');box(c,0,387,900,83,'#364250');box(c,0,385,900,4,'#f1dfb8');for(let x=0;x<900;x+=110)box(c,x,431,55,3,'#d2c4a0');
 c.font='bold 16px sans-serif';c.fillStyle='#223440';c.fillText(blockName(index).toUpperCase(),24,28);
 for(let b=0;b<4;b++){
  const count=Math.max(0,Math.min(4,local-b*4)),x=70+b*195,base=333,s=55;
  if(!count){box(c,x,base-4,120,5,'#8b7965');box(c,x+20,base-42,70,35,'#c6ac75');c.fillStyle='#4c463a';c.font='11px sans-serif';c.fillText('NEXT LOT',x+28,base-20);continue;}
  box(c,x-3,base-count*s-5,116,count*s+5,'#243441');
  for(let f=0;f<count;f++)for(let room=0;room<2;room++)apartmentTile(c,f===0&&room===1?8:(index*4+b)%7,x+room*s,base-(f+1)*s,s);
  if(count===4){for(let room=0;room<2;room++)apartmentTile(c,7,x+room*s,base-4*s-38, s);box(c,x-7,base+2,124,7,'#8c7260');box(c,x+35,base+9,45,5,'#927963');
   for(let f=1;f<4;f++){const wx=x+25+(f%2)*55,wy=base-f*s-26;if(night)box(c,wx-6,wy-9,14,17,'#ffd57c');person(c,wx,wy, b+f,0,true);}
   person(c,x+16,base+21,b,t,true);tree(c,x+137,base+24);
   const walkerX=x+20+((t*12+b*29)%130);person(c,walkerX,370,b+3,t);if(b===0){box(c,walkerX+14,368,10,5,'#9b7355');box(c,walkerX+17,372,2,4,'#9b7355');}
  }else{box(c,x-10,base-4*s-25,4,4*s+30,'#dfb252');box(c,x+115,base-4*s-25,4,4*s+30,'#dfb252');for(let y=base-30;y>base-4*s;y-=45)box(c,x-10,y,129,3,'#dfb252');person(c,x+125,base+10,b,t,true);}
 }
 if(done){const tx=65+((reduced?0:t*15)%700);box(c,tx,397,58,27,'#efdbab');box(c,tx+58,405,24,19,'#57bba8');box(c,tx+62,408,13,8,'#23384d');for(const dx of [12,65]){c.fillStyle='#172737';c.beginPath();c.arc(tx+dx,425,6,0,7);c.fill();}c.font='9px sans-serif';c.fillStyle='#253647';c.fillText('MOVE IN',tx+6,414);box(c,17,352,30,8,'#81614b');box(c,20,360,3,12,'#81614b');box(c,41,360,3,12,'#81614b');tree(c,28,345);}
 if(done>=2){box(c,389,356,48,13,'#ebbd65');box(c,396,367,9,9,'#142432');box(c,423,367,9,9,'#142432');c.font='10px sans-serif';c.fillStyle='#273342';c.fillText('COFFEE',392,353);person(c,448,375,5,t,true);}
 if(done===4){box(c,752,395,120,31,'#528b83');c.strokeStyle='#e7dab5';c.strokeRect(758,399,109,23);box(c,811,378,3,23,'#e8d8b7');box(c,802,376,20,4,'#e8d8b7');person(c,786,416,1,t);c.fillStyle='#d8884f';c.beginPath();c.arc(798,408+Math.abs(Math.sin(t*3))*7,4,0,7);c.fill();for(let x=75;x<750;x+=60){c.fillStyle=palette[(x/15|0)%7];c.beginPath();c.moveTo(x,65);c.lineTo(x+12,85);c.lineTo(x+24,65);c.fill();}c.font='bold 13px sans-serif';c.fillStyle='#243441';c.fillText('BLOCK PARTY · EVERY HOME HAS AN ADDRESS',270,49);}
 c.restore();canvas.setAttribute('aria-label',blockName(index)+': '+done+' buildings finished, '+(local%4)+' floors on the next lot. '+(done===4?'Basketball court and block party.':done>=2?'Coffee cart open.':'Construction underway.'));
}
