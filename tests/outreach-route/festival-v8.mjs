import {drawActor} from './actors-v6.mjs?v=10.0';
import {drawPerson} from './people-v7.mjs?v=10.0';
const festivalArt=new Image();festivalArt.src=new URL('./festival-courtyard-v9.webp',import.meta.url).href;
export const festivalReady=festivalArt.decode();
const colors=['#f6c454','#6bdab3','#ef947d','#98b8ea'];
export function festivalTarget(i,total){
 const groups=[{x:225,y:275,kind:'reading'},{x:550,y:275,kind:'food'},{x:310,y:452,kind:'dance'},{x:555,y:548,kind:'basketball'}],group=groups[i%4],slot=Math.floor(i/4),cols=Math.max(2,Math.ceil(Math.sqrt(total/4)));
 return{x:group.x+(slot%cols-(cols-1)/2)*Math.min(24,150/cols),y:group.y+Math.floor(slot/cols)*Math.min(23,100/cols),kind:group.kind};
}
export function festivalMember(member,i,total,age,reduced=false){
 const target=festivalTarget(i,total),delay=reduced?0:Math.min(1.4,i*.075),u=reduced?1:Math.max(0,Math.min(1,(age-delay)/2.4)),ease=u*u*(3-2*u);
 return{...member,x:member.x+(target.x-member.x)*ease,y:member.y+(target.y-member.y)*ease,moving:u<1,kind:target.kind,phase:Math.max(0,age-delay),flip:target.x<member.x};
}
export function createFestival(members){return{members:members.map(p=>({...p})),age:0};}
export function drawFestival(c,festival,{dt,reduced,background}){
 festival.age+=Math.max(0,dt)/1000;const t=festival.age;c.clearRect(0,0,768,768);if(background.complete)c.drawImage(background,0,0,768,768);
 // Crossfade the SAME campus into its dressed festival scene; props share its camera and sunlight.
 if(festivalArt.complete&&festivalArt.naturalWidth){c.save();c.globalAlpha=reduced?1:Math.min(1,t/1.6);c.drawImage(festivalArt,0,0,768,768);c.restore();}
 const objects=[];const add=(y,draw)=>objects.push({y,draw});
 // Families gather around the crew instead of leaving during the finale.
 for(let i=0;i<26;i++){const target=festivalTarget(i,26),adult=i%3===0,kind=target.kind,name=adult?'parent':kind==='reading'?'girl':'boy',u=reduced?1:Math.max(0,Math.min(1,(t-.35-i*.045)/3.4)),e=u*u*(3-2*u),tx=target.x+Math.sin(i*2.4)*42,ty=target.y+17+Math.cos(i*1.7)*20,x=384+(tx-384)*e,y=700+(ty-700)*e;
  add(y,()=>{c.save();c.globalAlpha=reduced?1:Math.min(1,Math.max(0,(t-i*.045)*2));c.fillStyle='#58452c30';c.beginPath();c.ellipse(x,y,adult?10:7,3,0,0,Math.PI*2);c.fill();drawPerson(c,name,x,y,{height:adult?49:41,state:u<1?'walk':kind==='dance'?'activity':'idle',phase:reduced?0:t+i,flip:tx<384,motionKey:'festival-family-'+i});if(u===1&&kind==='reading'){c.fillStyle='#f5dfad';c.strokeStyle='#285b67';c.lineWidth=2;c.beginPath();c.moveTo(x-8,y-22);c.lineTo(x,y-19);c.lineTo(x+8,y-22);c.lineTo(x+8,y-11);c.lineTo(x,y-8);c.lineTo(x-8,y-11);c.closePath();c.fill();c.stroke();}c.restore();});
 }
 festival.members.forEach((m,i)=>{const p=festivalMember(m,i,festival.members.length,t,reduced),height=m.height||46;add(p.y,()=>{c.fillStyle='#58452c35';c.beginPath();c.ellipse(p.x,p.y,12,4,0,0,Math.PI*2);c.fill();c.save();c.translate(p.x,p.y);drawActor(c,m.id,0,0,reduced?0:p.phase,{height,moving:p.moving,flip:p.flip});if(!p.moving&&p.kind==='reading'){c.fillStyle='#28666c';c.strokeStyle='#f3dfb2';c.lineWidth=1;c.beginPath();c.moveTo(-9,-height*.48);c.lineTo(0,-height*.43);c.lineTo(9,-height*.48);c.lineTo(9,-height*.28);c.lineTo(0,-height*.24);c.lineTo(-9,-height*.28);c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(0,-height*.43);c.lineTo(0,-height*.24);c.stroke();}if(!p.moving&&p.kind==='food'){c.fillStyle='#fff0c8';c.fillRect(8,-height*.48,6,8);c.strokeStyle='#285a52';c.lineWidth=1.5;c.beginPath();c.moveTo(10,-height*.48);c.lineTo(13,-height*.62);c.stroke();}c.restore();});});
 // A single ball belongs to the player nearest the court, then arcs to the real rim.
 const shot=reduced?0:t%4;let bx=567,by=555;
 if(shot<1.7)by-=8+Math.abs(Math.sin(shot*7))*20;
 else if(shot<2.7){const u=shot-1.7;bx=567+(634-567)*u;by=527+(464-527)*u-Math.sin(u*Math.PI)*72;}
 else {const u=(shot-2.7)/1.3;bx=634+(567-634)*u;by=464+(555-464)*u-Math.sin(u*Math.PI)*22;}
 add(590,()=>{c.fillStyle='#d88438';c.strokeStyle='#623c27';c.lineWidth=1.4;c.beginPath();c.arc(bx,by,5,0,Math.PI*2);c.fill();c.stroke();c.beginPath();c.moveTo(bx-5,by);c.lineTo(bx+5,by);c.stroke();});
 objects.sort((a,b)=>a.y-b.y).forEach(p=>p.draw());
 if(!reduced){for(let i=0;i<95;i++){const slow=t>8?.32:1,x=(i*67+Math.sin(t*.6+i)*21)%768,y=((i*39+t*55*slow)%610)+170;c.save();c.translate(x,y);c.rotate(t*1.3+i);c.fillStyle=colors[i%4];c.globalAlpha=t>12?.45:.85;c.fillRect(-3,-1,6,3);c.restore();}}
 c.save();c.fillStyle='#173d39e8';c.beginPath();c.roundRect(181,171,406,48,15);c.fill();c.fillStyle='#fff0c6';c.font='800 22px system-ui';c.textAlign='center';c.fillText(t<2.5?'THE CREW IS OFF THE CLOCK!':'THE WHOLE BLOCK IS CELEBRATING!',384,201);c.restore();
}
