import {drawPerson,peopleReady} from './people-v7.mjs?v=7.0';
import {drawActor} from './actors-v6.mjs?v=6.9';
const labels={drop:['A family is welcomed','The crew sets up. Qualified providers handle the eye care.'],repair:['New glasses. New possibilities.','A fitting, a smile, and a whole afternoon ahead.'],pickup:['Back to the block','The family heads to the courtyard. Your worker rejoins the crew.'],early:['Give the provider time','This stop is unfinished. Bring the worker back to try again.']};
export function createService(canvas,title,caption){
 const c=canvas.getContext('2d'),reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;let moment=null,age=0;
 const dpr=Math.min(2,devicePixelRatio||1);canvas.width=768*dpr;canvas.height=138*dpr;c.setTransform(dpr,0,0,dpr,0,0);
 function person(name,x,feet,options){c.fillStyle='#354e3a25';c.beginPath();c.ellipse(x,feet,options.height*.2,3.5,0,0,Math.PI*2);c.fill();drawPerson(c,name,x,feet,options);}
 function draw(dt,active){if(active&&!reduced)age+=dt/1000;c.clearRect(0,0,768,138);const grad=c.createLinearGradient(0,0,768,138);grad.addColorStop(0,'#f5e3bc');grad.addColorStop(1,'#b7d3b4');c.fillStyle=grad;c.fillRect(0,0,768,138);c.fillStyle='#ddcca7';c.fillRect(0,111,768,27);c.strokeStyle='#b5a987';c.beginPath();c.moveTo(0,125);c.lineTo(768,125);c.stroke();
  const kind=moment?.type||'idle',move=Math.min(1,age/1.3),leave=kind==='pickup',welcoming=kind==='drop';
  // Large grounded poses make the handoff readable without interrupting Snake.
  const kidX=leave?420+Math.min(age,3)*65:welcoming?482-move*62:420;
  const parentX=kidX+43,walking=leave||welcoming&&move<1;
  person('provider',355,116,{height:90,state:kind==='repair'||welcoming&&move===1?'activity':'idle',phase:age});
  person(moment?.task%2?'girl':'boy',kidX,116,{height:70,state:walking?'walk':kind==='repair'?'activity':'idle',phase:age,flip:welcoming});
  person('parent',parentX,119,{height:88,state:walking?'walk':kind==='repair'?'activity':'idle',phase:age+.4,flip:welcoming});
  const workerX=leave?245-Math.min(age,2)*55:welcoming?120+move*120:240;c.fillStyle='#354e3a25';c.beginPath();c.ellipse(workerX,119,14,4,0,0,Math.PI*2);c.fill();drawActor(c,moment?.worker?.id??3,workerX,119,age,{height:82,moving:walking,flip:leave});
  if(kind==='repair'){const pulse=reduced?1:.6+Math.sin(age*5)*.3;c.strokeStyle=`rgba(255,255,225,${pulse})`;c.lineWidth=2.5;for(let i=0;i<5;i++){const a=i/5*Math.PI*2;c.beginPath();c.moveTo(kidX+Math.cos(a)*21,63+Math.sin(a)*20);c.lineTo(kidX+Math.cos(a)*29,63+Math.sin(a)*28);c.stroke();}}
 }
 peopleReady.then(()=>draw(0,false)).catch(()=>{});
 return{draw,event(e){if(!labels[e.type])return;moment=e;age=0;title.textContent=labels[e.type][0];caption.textContent=labels[e.type][1];canvas.setAttribute('aria-label',labels[e.type].join('. '));},clear(){moment=null;age=0;title.textContent='Every stop has a story';caption.textContent='Welcome a family. Give the provider time. Bring the crew back.';}};
}
