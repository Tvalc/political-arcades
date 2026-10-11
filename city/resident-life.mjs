import {drawPerson,peopleReady} from '/tests/outreach-route/people-v7.mjs?v=10.0';
export {peopleReady as residentsReady};
const mix=(a,b,u)=>a+(b-a)*u;
// Each household has a destination, time spent there, and a continuous route home.
// Nothing here awards resources or changes the player's saved city.
export function householdState(group,time,reduced=false){
 const age=reduced?20:((time+group.offset)%56+56)%56;
 const start=group.home, end=group.destination, aisle=group.aisle??382;
 const path=group.route??[start,{x:start.x,y:aisle},{x:end.x,y:aisle},end];
 function route(u){const lengths=path.slice(1).map((p,i)=>Math.hypot(p.x-path[i].x,p.y-path[i].y)),total=lengths.reduce((a,b)=>a+b,0);let d=u*total;for(let i=0;i<lengths.length;i++){if(d<=lengths[i]||i===lengths.length-1){const f=lengths[i]?d/lengths[i]:0;return{x:mix(path[i].x,path[i+1].x,f),y:mix(path[i].y,path[i+1].y,f),flip:path[i+1].x<path[i].x};}d-=lengths[i];}}
 if(age<10)return{...route(age/10),phase:'arrive',moving:true,age};
 if(age<38)return{...end,phase:'activity',moving:false,flip:false,age};
 if(age<48){const p=route(1-(age-38)/10);return{...p,phase:'return',moving:true,flip:!p.flip,age};}
 return{...start,phase:'home',moving:false,flip:false,age};
}
function shadow(c,x,y,r){c.fillStyle='#34453b30';c.beginPath();c.ellipse(x,y,r,2.6,0,0,Math.PI*2);c.fill();}
export function activityDetail(c,kind,x,y,t,h=36){
 c.save();c.translate(x,y);const s=h/36;c.scale(s,s);
 if(kind==='reading'||kind==='park'){c.fillStyle='#29666a';c.fillRect(-8,-h*.43,16,11);c.fillStyle='#fff0cf';c.fillRect(-7,-h*.43+1,6,8);c.fillRect(1,-h*.43+1,6,8);c.strokeStyle='#bca26c';c.beginPath();c.moveTo(0,-h*.43);c.lineTo(0,-h*.43+10);c.stroke();}
 if(kind==='kitchen'||kind==='food'){c.fillStyle='#f2ddae';c.beginPath();c.ellipse(5,-15,8,2.8,0,0,Math.PI*2);c.fill();c.fillStyle='#b97940';c.fillRect(0,-19,7,4);c.fillStyle='#8cad59';c.fillRect(0,-20,7,2);}
 if(kind==='homes'){c.fillStyle='#b9854e';c.fillRect(-7,-20,15,12);c.fillStyle='#e0b784';c.fillRect(-1,-20,3,12);c.strokeStyle='#705437';c.strokeRect(-7,-20,15,12);}
 if(kind==='fountain'){c.fillStyle='#e8bd60';c.beginPath();c.moveTo(-8,-4);c.lineTo(10,-4);c.lineTo(5,1);c.lineTo(-4,1);c.fill();c.fillStyle='#f9e5b8';c.beginPath();c.moveTo(0,-18);c.lineTo(0,-5);c.lineTo(9,-5);c.fill();c.strokeStyle='#83cdd1';for(let i=0;i<3;i++){c.beginPath();c.ellipse(0,4+i*2,13+i*4,2,0,0,Math.PI*2);c.stroke();}}
 if(kind==='court'||kind==='basketball'){const u=((t%5)+5)%5/5;let bx=10,by=-5-Math.abs(Math.sin(t*4))*16;if(u>.6){const p=(u-.6)/.4;bx=10+p*64;by=-12-p*35-Math.sin(p*Math.PI)*28;}c.fillStyle='#de863b';c.strokeStyle='#633d2b';c.lineWidth=1;c.beginPath();c.arc(bx,by,4.5,0,Math.PI*2);c.fill();c.stroke();c.beginPath();c.moveTo(bx-4,by);c.lineTo(bx+4,by);c.moveTo(bx,by-4);c.lineTo(bx,by+4);c.stroke();}
 c.restore();
}
export function paintHousehold(c,group,state,time,reduced=false){
 const {x,y,moving,phase,flip}=state,h=group.height??35,t=reduced?0:time;
 const activity=phase==='activity',kind=group.kind;
 const members=[{name:group.child??'girl',dx:0,dy:0,h},{name:'parent',dx:23,dy:6,h:h*1.28}];
 if(group.sibling)members.push({name:'boy',dx:-18,dy:8,h:h*.9});
 for(const [i,m] of members.entries()){shadow(c,x+m.dx,y+m.dy,7);drawPerson(c,m.name,x+m.dx,y+m.dy,{height:m.h,state:moving?'walk':activity&&kind==='dance'?'activity':'idle',phase:t+group.offset+i*.7,flip,motionKey:group.key+'-'+i});if(activity&&i===0)activityDetail(c,group.activityKind??kind,x,y,t+group.offset,h);}
 if(kind==='clinic'){shadow(c,group.destination.x+39,group.destination.y+2,8);drawPerson(c,'provider',group.destination.x+39,group.destination.y+2,{height:h*1.3,state:activity?'activity':'idle',phase:t+.6});}
}
export function courtSurface(c,x,feet,w=120){
 c.save();c.translate(x,feet);c.fillStyle='#7c9d8a';c.fillRect(-w/2,-32,w,39);c.strokeStyle='#ece0b7';c.lineWidth=1.5;c.strokeRect(-w/2+5,-28,w-10,29);c.beginPath();c.ellipse(0,-12,13,8,0,0,Math.PI*2);c.stroke();c.strokeStyle='#596b66';c.lineWidth=3;c.beginPath();c.moveTo(w/2-8,-2);c.lineTo(w/2-8,-68);c.stroke();c.fillStyle='#e9e5d7';c.fillRect(w/2-28,-70,31,22);c.strokeStyle='#45626c';c.lineWidth=1;c.strokeRect(w/2-20,-64,14,9);c.strokeStyle='#c36935';c.beginPath();c.ellipse(w/2-12,-49,9,3,0,0,Math.PI*2);c.stroke();c.strokeStyle='#f1e5c9';for(let i=0;i<4;i++){c.beginPath();c.moveTo(w/2-20+i*5,-48);c.lineTo(w/2-17+i*3,-36);c.stroke();}c.restore();
}
