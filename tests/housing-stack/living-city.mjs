import {drawProp,drawResident,drawCrew} from './makko-sprites.mjs?v=6';
import {apartmentTile} from './art-renderer.mjs?v=4';
import {paintCityDelivery} from './delivery-effects.mjs?v=6';
import {blockName} from './city-state.mjs';
const palette=['#57bba8','#e6b655','#b999dc','#70a7d0','#d88b76','#91bc7b','#d9a371'];
function box(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(x,y,w,h);}
function person(c,x,y,id,t,still=false,height=27){drawResident(c,x,y,id,t,still,height);}
function tree(c,x,y){drawProp(c,0,x,y,88,96);}
export function paintLivingBlock(canvas,floors,index,time=0,reduced=false,close=false,deliveries=[],effectTime=0){
 const c=canvas.getContext('2d');c.clearRect(0,0,canvas.width,canvas.height);c.save();c.scale(canvas.width/900,canvas.height/470);
 const t=reduced?0:time/1000,local=Math.max(0,Math.min(16,floors-index*16)),done=Math.floor(local/4),night=Math.sin(t/100)<-.5;
 if(close){const focus=125+Math.min(3,Math.floor(local/4))*195;c.translate(450,235);c.scale(1.4,1.4);c.translate(-Math.max(322,Math.min(578,focus)), -235);}
 const sky=c.createLinearGradient(0,0,0,470);sky.addColorStop(0,night?'#15243f':'#9bc7cb');sky.addColorStop(1,'#e2cdb0');c.fillStyle=sky;c.fillRect(0,0,900,470);
 box(c,0,315,900,72,'#c6b8a0');box(c,0,387,900,83,'#364250');box(c,0,385,900,4,'#f1dfb8');for(let x=0;x<900;x+=110)box(c,x,431,55,3,'#d2c4a0');
 c.font='bold 16px sans-serif';c.fillStyle='#223440';c.fillText(blockName(index).toUpperCase(),24,28);
 for(let b=0;b<4;b++){
  const count=Math.max(0,Math.min(4,local-b*4)),x=70+b*195,base=333,s=55;
  if(!count){box(c,x,base-4,120,5,'#8b7965');drawProp(c,4,x+50,base,75,52);continue;}
  box(c,x-3,base-count*s-5,116,count*s+5,'#243441');
  for(let f=0;f<count;f++)for(let room=0;room<2;room++)apartmentTile(c,f===0&&room===1?8:(index*4+b)%7,x+room*s,base-(f+1)*s,s);
  if(count===4){for(let room=0;room<2;room++)apartmentTile(c,7,x+room*s,base-4*s-38, s);box(c,x-7,base+2,124,7,'#8c7260');box(c,x+35,base+9,45,5,'#927963');
   for(let f=1;f<4;f++){const wx=x+25+(f%2)*55,wy=base-f*s-26;if(night)box(c,wx-6,wy-9,14,17,'#ffd57c');person(c,wx,wy, b+f,0,true,18);}
   person(c,x+16,base+21,b,t,true);tree(c,x+137,base+24);
   const walkerX=x+20+((t*12+b*29)%130);person(c,walkerX,370,b+3,t);
  }else{drawProp(c,5,x+56,base+3,140,count*55+55);drawCrew(c,x+133,base+15,b,t,'build',35);}
 }
 if(done){const tx=65+((reduced?0:t*15)%700);drawProp(c,3,tx+40,440,96,65);drawProp(c,1,30,377,62,43);tree(c,28,345);drawProp(c,8,190,356,43,33);}
 if(done>=2){drawProp(c,2,416,374,72,74);person(c,460,375,5,t,true);}
 if(done>=3)drawProp(c,7,615,380,59,57);
 if(done===4){box(c,773,314,116,66,'#668c76');drawProp(c,6,827,378,108,80);person(c,800,367,2,t,false,29);for(let x=75;x<750;x+=60){c.fillStyle=palette[(x/15|0)%7];c.beginPath();c.moveTo(x,65);c.lineTo(x+12,85);c.lineTo(x+24,65);c.fill();}c.font='bold 13px sans-serif';c.fillStyle='#243441';c.fillText('BLOCK PARTY · EVERY HOME HAS AN ADDRESS',270,49);}
 if(!reduced)paintCityDelivery(c,deliveries,effectTime,index);
 c.restore();canvas.setAttribute('aria-label',blockName(index)+': '+done+' buildings finished, '+(local%4)+' floors on the next lot. '+(done===4?'Basketball court and block party.':done>=2?'Coffee cart open.':'Construction underway.'));
}
