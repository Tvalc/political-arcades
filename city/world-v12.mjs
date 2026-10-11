import {householdState,paintHousehold,residentsReady} from './resident-life.mjs?v=12.0';
import {drawActor,actorsReady} from '/tests/outreach-route/actors-v6.mjs?v=10.0';
const names=['homes','park','court','clinic','kitchen','fountain'];
const images={};for(const name of ['neighborhood-base','neighborhood-repaired',...names]){const im=new Image();im.src=new URL(name+'-v12.webp',import.meta.url).href;images[name]=im;}
export const worldReady=Promise.all([...Object.values(images).map(im=>im.decode()),residentsReady,actorsReady()]);
export const SLOTS=[{x:318,y:383,lane:393},{x:606,y:383,lane:393},{x:904,y:383,lane:393},{x:285,y:555,lane:574},{x:606,y:555,lane:574},{x:952,y:555,lane:574}];
const good=im=>im.complete&&im.naturalWidth;
function place(c,name,x,feet,width){const im=images[name];if(!good(im))return;const height=width*im.naturalHeight/im.naturalWidth;c.drawImage(im,x-width/2,feet-height,width,height);}
function shadow(c,x,y,r=13){c.fillStyle='#263a3438';c.beginPath();c.ellipse(x,y,r,3.5,0,0,Math.PI*2);c.fill();}
export function neighborhoodGroups(block,index){
 const homeIndex=block.lots.indexOf('homes'),homeSlot=homeIndex<0?{x:80,y:593,lane:574}:SLOTS[homeIndex];
 return block.lots.map((kind,i)=>{const slot=SLOTS[i],home={x:homeSlot.x+65,y:homeSlot.y+10},destination={x:slot.x+(kind==='court'?-50:kind==='kitchen'?-40:-30),y:slot.y-5};
 const route=homeSlot.lane===slot.lane?[home,{x:home.x,y:slot.lane},{x:destination.x,y:slot.lane},destination]:[home,{x:home.x,y:homeSlot.lane},{x:90,y:homeSlot.lane},{x:90,y:slot.lane},{x:destination.x,y:slot.lane},destination];
 return{key:'city-'+index+'-'+i,kind,slotIndex:i,offset:8+i*9,home,destination,route,height:i<3?41:46,activityKind:kind==='court'?'none':kind,sibling:kind==='park'||kind==='court',child:kind==='court'?'boy':'girl'};});
}
export function paintWorld(canvas,block,index,time,reduced=false){
 const c=canvas.getContext('2d'),t=reduced?0:time;c.clearRect(0,0,canvas.width,canvas.height);c.save();c.scale(canvas.width/1200,canvas.height/800);
 const world=images[block.road?'neighborhood-repaired':'neighborhood-base'];if(good(world))c.drawImage(world,0,0,1200,800);else{c.fillStyle='#16323a';c.fillRect(0,0,1200,800);c.fillStyle='#f3dca7';c.font='600 24px system-ui';c.textAlign='center';c.fillText('Preparing your neighborhood…',600,400);c.restore();return;}
 const objects=[],add=(depth,draw)=>objects.push({depth,draw});
 for(let i=0;i<block.lots.length;i++){const kind=block.lots[i],slot=SLOTS[i];add(slot.y,()=>place(c,kind,slot.x,slot.y,i<3?245:292));}
 // One real animated organizer plans the next open lot. No vibrating hardhat cutout.
 const empty=block.lots.length;if(empty<6){const slot=SLOTS[empty];add(slot.lane,()=>{shadow(c,slot.x+42,slot.lane);drawActor(c,3,slot.x+42,slot.lane,t,{height:empty<3?47:53,moving:false});});}
 for(const group of neighborhoodGroups(block,index)){const state=householdState(group,t,reduced);add(state.y+8,()=>{paintHousehold(c,group,state,t,reduced);if(group.kind==='court'&&state.phase==='activity'){const slot=SLOTS[group.slotIndex],w=slot.y<400?245:292,u=reduced?.2:((t+group.offset)%6)/6,target={x:slot.x+w*.173,y:slot.y-w*.666};let x=state.x+12,y=state.y-6-Math.abs(Math.sin(t*4))*19;if(u>.55&&u<.85){const f=(u-.55)/.3;x+=(target.x-x)*f;y+=(target.y-y)*f-Math.sin(f*Math.PI)*75;}else if(u>=.85){const f=(u-.85)/.15;x=target.x+(state.x+12-target.x)*f;y=target.y+(state.y-6-target.y)*f;}c.fillStyle='#d88436';c.strokeStyle='#513824';c.lineWidth=1.1;c.beginPath();c.arc(x,y,5.5,0,Math.PI*2);c.fill();c.stroke();c.beginPath();c.moveTo(x-5,y);c.lineTo(x+5,y);c.stroke();}});}
 // El-Sayed greets the provider team at a built clinic, as a fictional game visitor.
 const clinic=block.lots.indexOf('clinic');if(clinic>=0){const slot=SLOTS[clinic];add(slot.y+10,()=>{shadow(c,slot.x+75,slot.y+10);drawActor(c,1,slot.x+75,slot.y+10,t,{height:clinic<3?47:53,moving:false,flip:true});});}
 objects.sort((a,b)=>a.depth-b.depth).forEach(o=>o.draw());
 // Small water glints stay inside the painted fountain bowl.
 if(!reduced)for(let i=0;i<block.lots.length;i++)if(block.lots[i]==='fountain'){const s=SLOTS[i],width=i<3?245:292;c.strokeStyle='#e3f7ed80';c.lineWidth=1.2;for(let k=0;k<3;k++){c.beginPath();c.ellipse(s.x-width*.02,s.y-width*.454,18+k*9+Math.sin(t+k)*2,3+k,0,0,Math.PI*2);c.stroke();}}
 c.restore();
}
