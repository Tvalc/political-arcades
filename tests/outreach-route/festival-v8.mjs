import {drawActor} from './actors-v6.mjs?v=8.1';
import {drawPerson} from './people-v7.mjs?v=7.1';
import {drawProp} from '/city/makko-sprites.mjs';
const colors=['#f6c454','#6bdab3','#ef947d','#98b8ea'];
export function festivalTarget(i,total){
 const groups=[{x:245,y:340,kind:'reading'},{x:542,y:355,kind:'food'},{x:320,y:493,kind:'dance'},{x:554,y:523,kind:'basketball'}],group=groups[i%4],slot=Math.floor(i/4),cols=Math.max(2,Math.ceil(Math.sqrt(total/4)));
 return{x:group.x+(slot%cols-(cols-1)/2)*Math.min(24,150/cols),y:group.y+Math.floor(slot/cols)*Math.min(23,100/cols),kind:group.kind};
}
export function festivalMember(member,i,total,age,reduced=false){
 const target=festivalTarget(i,total),delay=reduced?0:Math.min(1.4,i*.075),u=reduced?1:Math.max(0,Math.min(1,(age-delay)/2.4)),ease=u*u*(3-2*u);
 return{...member,x:member.x+(target.x-member.x)*ease,y:member.y+(target.y-member.y)*ease,moving:u<1,kind:target.kind,phase:Math.max(0,age-delay),flip:target.x<member.x};
}
export function createFestival(members){return{members:members.map(p=>({...p})),age:0};}
export function drawFestival(c,festival,{dt,reduced,background}){
 festival.age+=Math.max(0,dt)/1000;const t=festival.age;c.clearRect(0,0,768,768);if(background.complete)c.drawImage(background,0,0,768,768);
 // The route grid is gone: the same paving becomes a neighborhood festival.
 c.strokeStyle='#685333';c.lineWidth=3;c.beginPath();c.moveTo(132,223);c.quadraticCurveTo(384,273,642,223);c.stroke();
 for(let i=0;i<22;i++){const x=139+i*23,y=226+Math.sin(i/21*Math.PI)*24;c.fillStyle=colors[i%4];c.beginPath();c.moveTo(x,y);c.lineTo(x+17,y);c.lineTo(x+8,y+19);c.fill();}
 drawProp(c,6,591,608,190,165);
 const objects=[];const add=(y,draw)=>objects.push({y,draw});
 add(365,()=>drawProp(c,1,240,365,107,58));add(375,()=>drawProp(c,2,599,375,92,92));add(568,()=>drawProp(c,8,652,568,56,60));
 // Families gather around the crew instead of leaving during the finale.
 for(let i=0;i<26;i++){const target=festivalTarget(i,26),adult=i%3===0,kind=target.kind,name=adult?'parent':kind==='reading'?'girl':'boy',x=target.x+(i%2?34:-35),y=target.y+46;
  add(y,()=>{c.fillStyle='#58452c30';c.beginPath();c.ellipse(x,y,adult?10:7,3,0,0,Math.PI*2);c.fill();drawPerson(c,name,x,y,{height:adult?45:33,state:adult||kind==='reading'?'activity':kind==='basketball'?'activity':'idle',phase:reduced?0:t+i});});
 }
 festival.members.forEach((m,i)=>{const p=festivalMember(m,i,festival.members.length,t,reduced),height=m.height||46;add(p.y,()=>{c.fillStyle='#58452c35';c.beginPath();c.ellipse(p.x,p.y,12,4,0,0,Math.PI*2);c.fill();c.save();c.translate(p.x,p.y);if(!reduced&&!p.moving&&p.kind==='dance')c.rotate(Math.sin(t*3+i)*.045);drawActor(c,m.id,0,0,reduced?0:p.phase,{height,moving:p.moving,flip:p.flip});c.restore();});});
 for(let i=0;i<3;i++){const x=520+i*37,y=578,ballY=y-5-(reduced?10:Math.abs(Math.sin(t*3+i))*26);add(y,()=>{c.fillStyle='#d88438';c.strokeStyle='#623c27';c.lineWidth=1.5;c.beginPath();c.arc(x,ballY,5,0,Math.PI*2);c.fill();c.stroke();c.beginPath();c.moveTo(x-5,ballY);c.lineTo(x+5,ballY);c.stroke();});}
 objects.sort((a,b)=>a.y-b.y).forEach(p=>p.draw());
 if(!reduced){for(let i=0;i<95;i++){const slow=t>8?.32:1,x=(i*67+Math.sin(t*.6+i)*21)%768,y=((i*39+t*55*slow)%610)+170;c.save();c.translate(x,y);c.rotate(t*1.3+i);c.fillStyle=colors[i%4];c.globalAlpha=t>12?.45:.85;c.fillRect(-3,-1,6,3);c.restore();}}
 c.save();c.fillStyle='#173d39e8';c.beginPath();c.roundRect(181,171,406,48,15);c.fill();c.fillStyle='#fff0c6';c.font='800 22px system-ui';c.textAlign='center';c.fillText(t<2.5?'THE CREW IS OFF THE CLOCK!':'THE WHOLE BLOCK IS CELEBRATING!',384,201);c.restore();
}
