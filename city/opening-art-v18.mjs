import {drawPerson,peopleReady} from '/tests/outreach-route/people-v7.mjs?v=10.0';
import {activityDetail} from './resident-life-v14.mjs?v=16.1';
import {partyStations,openingStatus} from './opening-day-v18.mjs?v=18.2';
const props=new Image();props.src='/art/housing-stack/props-v6.webp';
export const partyReady=Promise.all([props.decode(),peopleReady]);
const mix=(a,b,u)=>({x:a.x+(b.x-a.x)*u,y:a.y+(b.y-a.y)*u}),clamp=n=>Math.max(0,Math.min(1,n));
function prop(c,id,x,y,height){const r=id===2?{x:532,y:10,w:215,h:240}:{x:264,y:87,w:240,h:163},w=height*r.w/r.h;if(props.naturalWidth)c.drawImage(props,r.x,r.y,r.w,r.h,x-w/2,y-height,w,height);}
function label(c,text,x,y){c.save();c.font='700 9px system-ui';c.textAlign='center';const w=c.measureText(text).width+14;c.fillStyle='#173c37f0';c.beginPath();c.roundRect(x-w/2,y-11,w,16,5);c.fill();c.fillStyle='#ffe3a0';c.fillText(text,x,y);c.restore();}
export function partyGuest(slot,i,eventTime,depart=0){const s=partyStations(slot),kind=i<2?'reading':i<4?'drinks':'cheer',p=i<2?{x:s.reading.x-34+i*22,y:s.reading.y+3}:i<4?{x:s.cart.x-52+(i-2)*18,y:s.cart.y+5}:{x:s.welcome.x-30+(i-4)*25,y:s.welcome.y};const start={x:Math.max(22,p.x-155),y:p.y},u=clamp((eventTime-1-i*.55)/7),leaving=depart>2,v=clamp((depart-2)/9),pos=leaving?mix(p,start,v):mix(start,p,u);return {...pos,kind,moving:leaving?v<1:u<1,visible:leaving?v<1:eventTime>=1+i*.55,flip:leaving,height:(i%3===0?39:29)*s.scale};}
export function addPartyObjects(add,c,b,court,time,reduced=false){const a=b.ambition;if(!court||!a||(a.stage!=='opening'&&!a.completed))return;const s=partyStations(court.slot),status=openingStatus(b),active=a.stage==='opening';
 add(s.reading.y-1,()=>{prop(c,1,s.reading.x,s.reading.y,27*s.scale);label(c,'BOOK SWAP',s.reading.x,s.reading.y-34*s.scale);});
 add(s.cart.y+1,()=>{prop(c,2,s.cart.x,s.cart.y,58*s.scale);label(c,'NEIGHBORHOOD DRINKS',s.cart.x,s.cart.y-66*s.scale);});
 // Guests stay on the paved perimeter; one shared basketball remains inside the playing area.
 for(let i=0;i<6;i++){const g=partyGuest(court.slot,i,a.eventTime||0,a.afterPartyTime||0);if(!g.visible||!active&&(a.afterPartyTime??20)>=11)continue;add(g.y+2,()=>{drawPerson(c,i%3===0?'parent':i%2?'boy':'girl',g.x,g.y,{height:g.height,state:!reduced&&g.moving?'walk':status.phase==='celebration'?'activity':'idle',phase:reduced?0:time+i,flip:g.flip,motionKey:'party-'+court.slot+'-'+i});if(!g.moving&&g.kind==='reading')activityDetail(c,'reading',g.x,g.y,0,g.height);if(!g.moving&&g.kind==='drinks'){c.fillStyle='#fff2c9';c.fillRect(g.x+5,g.y-g.height*.48,4,6);}});}
 if(active&&status.phase==='celebration'&&!reduced)add(797,()=>{const age=(a.playTime||54)-54;c.save();const colors=['#edc66f','#91d9bf','#ed957a'];for(let i=0;i<28;i++){const x=s.welcome.x-95+(i*29)%190,y=s.welcome.y-70+(i*17+age*22)%100;c.fillStyle=colors[i%3];c.globalAlpha=Math.max(0,1-age/9);c.fillRect(x,y,3,2);}c.restore();});
}
