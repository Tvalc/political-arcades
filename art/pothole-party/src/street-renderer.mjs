import {makkoMeta} from './makko-meta.mjs';
import {animationMeta} from './animation-meta.mjs';
import {REPAIR_MS} from './engine.mjs';
const assets={};for(const name of ['walk','dig','street','props']){const im=new Image();im.src='./'+name+'-v9.webp';assets[name]=im;}
const mapAssets={};for(const id of ['nyc','detroit','texas']){const im=new Image();im.src='/art/pothole-party/'+id+'-map-v15.webp';mapAssets[id]=im;}
const wornMaps={};for(const id of ['nyc','detroit','texas']){const im=new Image();im.src='/art/pothole-party/'+id+'-weathered-v18.webp';wornMaps[id]=im;}
const makkoAssets={};for(const name of ['materials','construction','weathered','residents','work']){const im=new Image();im.src='/art/pothole-party/'+(name==='work'?'work-crew':name)+(name==='residents'?'-v18.webp':'-v17.webp');makkoAssets[name]=im;}
const palette=['#60cbb8','#bb9be1','#efa666','#e2cb72'];
const names=['Mamdani','El-Sayed','Talarico','Neighbor'];
const loaded=im=>im.complete&&im.naturalWidth>0;
function actor(ctx,id,kind,frame,x,y,height=46,flip=false){
 const im=assets[kind],m=animationMeta[kind],row=m.rows[id],scale=height/row.height;
 if(!loaded(im)){ctx.fillStyle=palette[id];ctx.fillRect(x-9,y-21,18,22);return;}
 ctx.save();ctx.translate(x,y);if(flip)ctx.scale(-1,1);
 ctx.drawImage(im,frame*m.fw,id*m.fh,m.fw,m.fh,-row.anchor*scale,-m.fh*scale,m.fw*scale,m.fh*scale);ctx.restore();
}
function prop(ctx,id,x,y,width){const im=assets.props;if(!loaded(im))return;const m=animationMeta.props.cells[id],h=width*m.h/m.w;ctx.drawImage(im,m.x,m.y,m.w,m.h,x-width/2,y-h/2,width,h);}
function hole(ctx,p,cell,now,reduced){const x=(p.x+.5)*cell,y=(p.y+.5)*cell;prop(ctx,2,x,y+5,30);ctx.strokeStyle='#ffcf72';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y+2,19+(reduced?0:Math.sin(now/280)),0,Math.PI*2);ctx.stroke();ctx.fillStyle='#ffdb83';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.fillText('DROP',x,y-23);}
export function drawStreet(ctx,g,{previous,blend,leader,repairs,particles,cues=[],now,reduced,flash}){
 const edge=g.level?176:108,road=g.level?416:552,cell=road/g.size;ctx.clearRect(0,0,768,768);
 const ground=g.level?mapAssets[g.level.id]:assets.street;if(loaded(ground))ctx.drawImage(ground,0,0,768,768);else{ctx.fillStyle='#35474c';ctx.fillRect(0,0,768,768);}
 if(g.level)drawWorkdayScene(ctx,g,now,reduced);ctx.save();ctx.translate(edge,edge);
 ctx.strokeStyle='#ead78b77';ctx.lineWidth=2;ctx.setLineDash([12,14]);ctx.strokeRect(1,1,road-2,road-2);ctx.setLineDash([]);
 for(let y=0;y<g.size;y++)for(let x=0;x<g.size;x++){ctx.strokeStyle='#cbe6da09';ctx.lineWidth=1;ctx.strokeRect(x*cell,y*cell,cell,cell);}
 if(!g.level)for(const p of g.patches){const x=(p.x+.5)*cell,y=(p.y+.5)*cell;ctx.fillStyle='#657273';ctx.beginPath();ctx.roundRect(x-16,y-12,32,27,7);ctx.fill();}
 for(const p of repairs){const t=Math.max(0,(now-p.time)/900);if(t<1&&!reduced){ctx.strokeStyle=`rgba(110,240,169,${1-t})`;ctx.lineWidth=3;ctx.beginPath();ctx.arc((p.x+.5)*cell,(p.y+.5)*cell,16+t*23,0,Math.PI*2);ctx.stroke();ctx.fillStyle=`rgba(255,233,153,${1-t})`;ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText('+100',(p.x+.5)*cell,(p.y+.5)*cell-24-t*20);}}
 if(g.food){if(g.level){const x=(g.food.x+.5)*cell,y=(g.food.y+.5)*cell;makkoProp(ctx,'materials',taskArt(g,g.assigned).material,x,y,31);label(ctx,g.level.materials[g.assigned].toUpperCase(),x,y+29,'#ffd23f');}else hole(ctx,g.food,cell,now,reduced);}
 if(g.level&&g.site)workSite(ctx,g,g.site,g.assigned,cell,now,reduced);


 for(const j of g.jobs){
  if(j.open){if(g.level)workSite(ctx,g,j,j.task,cell,now,reduced);else hole(ctx,j,cell,now,reduced);continue;}
  const x=(j.x+.5)*cell,y=(j.y+.5)*cell,progress=j.progress/REPAIR_MS;
  const art=g.level?taskArt(g,j.task):{kind:'pave'};
  if(!j.ready){if(art.kind==='pave')prop(ctx,progress>.5?3:2,x+8,y+7,29);else constructionStage(ctx,art,Math.min(2,Math.floor(progress*3)),x+11,y+7,30);}
  prop(ctx,0,x-17,y+12,11);prop(ctx,0,x+18,y+13,11);if(!j.ready&&art.kind==='pave')prop(ctx,1,x+19,y-2,13);
  ctx.fillStyle='#06101999';ctx.beginPath();ctx.ellipse(x,y+12,13,4,0,0,Math.PI*2);ctx.fill();
  const f=reduced||g.status!=='playing'?0:Math.floor(j.progress/160)%6;
  if(!j.ready&&!reduced&&['pave','court'].includes(art.kind)){const phase=(j.progress%960)/960;if(phase>.48&&phase<.95){ctx.save();ctx.globalAlpha=(.95-phase)*1.2;ctx.fillStyle='#c8b79b';for(let k=0;k<4;k++){ctx.beginPath();ctx.arc(x+8+(k-1.5)*5,y+8-(phase-.48)*22,2+k*.8,0,Math.PI*2);ctx.fill();}ctx.restore();}}

  if(!j.ready&&g.level&&['hammer','plant','install'].includes(art.kind))workActor(ctx,j.worker.id,art.kind,reduced||g.status!=='playing'?0:Math.floor(j.progress/220)%4,x-3,y+16,38);else actor(ctx,j.worker.id,j.ready?'walk':'dig',j.ready?1:f,x-3,y+16,g.level?38:46);
  ctx.fillStyle='#09231d';ctx.beginPath();ctx.roundRect(x-22,y-48,44,14,4);ctx.fill();ctx.fillStyle=j.ready?'#87ffc1':'#ffdf87';ctx.font='bold 9px sans-serif';ctx.textAlign='center';ctx.fillText(j.ready?'PICK UP âœ“':((REPAIR_MS-j.progress)/1000).toFixed(1)+'s',x,y-38);
  if(!j.ready){ctx.fillStyle='#061019';ctx.fillRect(x-19,y-30,38,4);ctx.fillStyle='#ffe391';ctx.fillRect(x-19,y-30,38*progress,4);}else{ctx.strokeStyle='#83f0b0';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y+3,22,0,Math.PI*2);ctx.stroke();}
 }
 const positions=g.body.map((p,i)=>{const before=previous.find(q=>q.uid===p.uid)||p;const dx=p.x-before.x,dy=p.y-before.y;return{x:(before.x+dx*blend+.5)*cell,y:(before.y+dy*blend+.5)*cell,id:p.id,uid:p.uid,flip:dx<0,index:i};});
 ctx.strokeStyle='#9dd5b535';ctx.lineWidth=6;ctx.lineJoin='round';ctx.beginPath();positions.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.stroke();
 positions.toReversed().forEach(p=>{ctx.fillStyle='#050b0d75';ctx.beginPath();ctx.ellipse(p.x,p.y+13,12,4,0,0,Math.PI*2);ctx.fill();if(p.index===0){ctx.strokeStyle='#fff0bb';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(p.x,p.y+9,17,11,0,0,Math.PI*2);ctx.stroke();}const f=reduced||g.status!=='playing'?1:Math.floor(g.elapsed/125+p.uid*.8)%6;actor(ctx,p.id,'walk',f,p.x,p.y+16,g.level?38:46,p.flip);});
 for(const p of cues){const t=Math.min(1,(now-p.time)/1800);ctx.save();ctx.globalAlpha=t>.75?(1-t)*4:1;ctx.font='bold 11px sans-serif';ctx.textAlign='center';const cx=Math.max(60,Math.min(road-60,(p.x+.5)*cell)),cy=(p.y+.5)*cell-54-(reduced?0:t*12),w=ctx.measureText(p.text).width+14;ctx.fillStyle='#07060be8';ctx.beginPath();ctx.roundRect(cx-w/2,cy-12,w,20,5);ctx.fill();ctx.fillStyle=p.color;ctx.fillText(p.text,cx,cy+2);ctx.restore();}
 for(const p of particles){ctx.globalAlpha=Math.max(0,p.life/.6);ctx.fillStyle=p.color||'#ffd35a';ctx.fillRect(p.x*road/640-2,p.y*road/640-2,4,4);}ctx.globalAlpha=1;if(flash>0&&!reduced){ctx.fillStyle=`rgba(140,236,178,${flash*.07})`;ctx.fillRect(0,0,road,road);}ctx.restore();
}

function label(ctx,text,x,y,color){ctx.save();ctx.font='bold 10px sans-serif';ctx.textAlign='center';const w=ctx.measureText(text).width+10;ctx.fillStyle='#07060be8';ctx.beginPath();ctx.roundRect(x-w/2,y-11,w,16,4);ctx.fill();ctx.fillStyle=color;ctx.fillText(text,x,y+1);ctx.restore();}
const TASK_ART={
 nyc:[{kind:'pave',material:0,stage:12,label:'STREET'},{kind:'hammer',material:2,stage:0,label:'ENTRANCE'},{kind:'install',material:3,stage:null,label:'PLAYGROUND'},{kind:'install',material:4,stage:6,label:'BUS SHELTER'},{kind:'plant',material:5,stage:3,label:'STREET TREES'},{kind:'hammer',material:6,stage:0,label:'PLAZA'}],
 detroit:[{kind:'pave',material:1,stage:12,label:'ACCESSIBLE PATH'},{kind:'court',material:7,stage:12,label:'COURT'},{kind:'install',material:8,stage:9,label:'DRINKING WATER'},{kind:'hammer',material:2,stage:0,label:'GARDEN BEDS'},{kind:'plant',material:5,stage:3,label:'SHADE TREES'},{kind:'hammer',material:9,stage:0,label:'REC CENTER'}],
 texas:[{kind:'pave',material:1,stage:12,label:'SCHOOL PATH'},{kind:'court',material:7,stage:12,label:'COURT'},{kind:'install',material:8,stage:9,label:'FOUNTAINS'},{kind:'install',material:10,stage:6,label:'PLAYGROUND SHADE'},{kind:'plant',material:11,stage:3,label:'SCHOOL GARDEN'},{kind:'hammer',material:2,stage:0,label:'SCHOOL ENTRANCE'}]
};
function taskArt(g,task){return TASK_ART[g.level.id][Math.min(5,task)];}
function makkoProp(ctx,name,id,x,y,width,maxHeight=Infinity){const im=makkoAssets[name],m=makkoMeta[name].cells[id];if(!loaded(im))return;const scale=Math.min(width/m.w,maxHeight/m.h);ctx.drawImage(im,m.x,m.y,m.w,m.h,x-m.w*scale/2,y-m.h*scale/2,m.w*scale,m.h*scale);}
function constructionStage(ctx,art,stage,x,y,width,maxHeight=Infinity){if(art.stage===null)makkoProp(ctx,'materials',art.material,x,y,width,maxHeight);else makkoProp(ctx,'construction',art.stage+(art.kind==='hammer'?Math.min(stage,1):stage),x,y,width,maxHeight);}
function atlasActor(ctx,name,row,frame,x,y,height){const im=makkoAssets[name],m=makkoMeta[name],r=m.rows[row];if(!loaded(im))return;const sc=height/r.height;ctx.drawImage(im,frame*m.fw,row*m.fh,m.fw,m.fh,x-r.anchor*sc,y-m.fh*sc,m.fw*sc,m.fh*sc);}
function workActor(ctx,id,kind,frame,x,y,height){const action={hammer:0,plant:1,install:2}[kind];if(loaded(makkoAssets.work))atlasActor(ctx,'work',id*3+action,frame,x,y,height);else actor(ctx,id,'dig',frame%6,x,y,height);}
function workSite(ctx,g,p,task,cell,now,reduced){const art=taskArt(g,task),x=(p.x+.5)*cell,y=(p.y+.5)*cell;if(art.kind==='pave')hole(ctx,p,cell,now,reduced);else{constructionStage(ctx,art,0,x,y+5,28);ctx.strokeStyle='#ffcf72';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y+2,19+(reduced?0:Math.sin(now/280)),0,Math.PI*2);ctx.stroke();label(ctx,'DROP',x,y-23,'#ffdb83');}label(ctx,art.label,x,y-39,'#19e6ff');}
const AMENITY_SPOTS={nyc:[[370,150,70,35],[325,122,90,50],[250,650,270,110],[665,220,85,260],[40,260,70,120],[280,625,180,40]],detroit:[[150,260,35,150],[665,245,100,340],[368,633,40,40],[0,200,110,390],[440,615,105,110],[115,115,65,55]],texas:[[175,200,40,140],[670,235,98,360],[460,642,60,55],[120,625,260,120],[0,230,105,370],[340,125,90,40]]};
function mapRegion(ctx,im,x,y,w,h){if(!loaded(im))return;const sx=im.naturalWidth/768,sy=im.naturalHeight/768;ctx.drawImage(im,x*sx,y*sy,w*sx,h*sy,x,y,w,h);}
function drawWorkdayScene(ctx,g,now,reduced){
 const done=new Set(g.patches.map(p=>p.task)),spots=AMENITY_SPOTS[g.level.id],worn=wornMaps[g.level.id];
 // Each maintenance zone reveals the same coordinates from the clean original.
 // Buildings remain on the approved clean base; no ground tiles are stretched over it.
 for(let task=0;task<6;task++){if(done.has(task))continue;const x=176+(task%3)*416/3,y=176+Math.floor(task/3)*208;mapRegion(ctx,worn,x,y,416/3,208);}
 spots.forEach(([x,y,w,h],task)=>{if(done.has(task))return;const cx=Math.max(6,x),cy=Math.max(6,y),cw=Math.min(762,x+w)-cx,ch=Math.min(762,y+h)-cy;mapRegion(ctx,worn,cx,cy,cw,ch);});
 const f=reduced||g.status==='paused'?0:Math.floor(now/230)%4;
 if(g.level.id==='nyc'){
  if(done.has(2))atlasActor(ctx,'residents',2,f,382,724,36);
  if(done.has(4))atlasActor(ctx,'residents',1,f,97,433,36);
 }else{
  if(done.has(1))atlasActor(ctx,'residents',0,f,713,438,38);
  if(done.has(4))atlasActor(ctx,'residents',1,f,63,g.level.id==='texas'?550:555,37);
  if(g.level.id==='texas'&&done.has(5))atlasActor(ctx,'residents',2,f,400,690,37);
  if(g.level.id==='detroit'&&done.has(5))atlasActor(ctx,'residents',2,f,150,208,34);
 }
 if(g.status==='won')label(ctx,g.level.id==='texas'?'WELCOME BACK, STUDENTS':g.level.id==='detroit'?'THE COURT IS OPEN':'THE BLOCK IS YOURS',384,100,'#37e28a');
}
