import {paintWorld,worldReady} from './world-v12.mjs?v=12.3';
import {KEY,RESOURCES,PROJECTS,loadCity,wallet,award,build,pave,expand,canExpand,canBuild,migrateHousing} from '../shared/city-state.mjs?v=1.1';
const $=s=>document.querySelector(s),labels={housing:'Building supplies',streets:'Street work',recreation:'Court points',care:'Neighbors helped',policy:'Civic wins'},reduced=matchMedia('(prefers-reduced-motion: reduce)');
let storage;try{storage=localStorage;}catch{}
let city=loadCity(storage),selected=city.blocks.length-1,failed=false,last=0,worldTime=0,visible=!document.hidden;
function save(){try{storage.setItem(KEY,JSON.stringify(city));failed=false;return true;}catch{failed=true;return false;}}
if(migrateHousing(city,storage))save();
if(location.hash.startsWith('#rewards=')){try{const events=JSON.parse(decodeURIComponent(location.hash.slice(9)));if(Array.isArray(events)&&events.length<=1000){for(const e of events)if(['crashers:help','crashers:policy'].includes(e?.type))award(city,e);if(save())history.replaceState(null,'',location.pathname+location.search);}}catch{}}
function render(){
 $('#city-name').textContent=city.name;$('#opt-in').hidden=city.optedIn;$('#builder').hidden=!city.optedIn;$('#save-status').textContent=failed?'Saving unavailable. Keep this page open; your latest changes may not survive a reload.':'Saved in this browser · account saving across devices is not available yet.';
 const b=city.blocks[selected],w=wallet(city);$('#block-title').textContent='Block '+(selected+1)+' · '+['Stoop Street','Garden Avenue','Courtyard Row'][selected%3];$('#scale').textContent='Neighborhood '+(Math.floor(selected/3)+1)+' · Borough '+(Math.floor(selected/9)+1)+' · '+city.blocks.length+' blocks opened';$('#previous').disabled=selected===0;$('#next').disabled=selected===city.blocks.length-1;
 $('#wallet').replaceChildren(...RESOURCES.map(k=>{const d=document.createElement('div'),n=document.createElement('strong'),l=document.createElement('span');n.textContent=w[k];l.textContent=labels[k];d.append(n,l);return d;}));
 $('#built').textContent=b.lots.length?b.lots.map((id,i)=>(i+1)+'. '+PROJECTS[id].name).join(' · '):'Empty lots. Bring back supplies and choose what belongs here.';
 $('#capacity').textContent=b.lots.length+'/6 lots built. '+(b.road?'The street is repaired.':'The street still needs work.');
 $('#projects').replaceChildren(...Object.entries(PROJECTS).map(([id,p])=>{const d=document.createElement('article');d.className='project';const h=document.createElement('h4'),desc=document.createElement('p'),cost=document.createElement('small'),button=document.createElement('button');h.textContent=p.name;desc.textContent=p.description;cost.textContent=Object.entries(p.cost).map(([k,n])=>n+' '+labels[k].toLowerCase()).join(' + ');button.textContent='Build →';button.disabled=!canBuild(city,id,selected);button.onclick=()=>{reload();if(build(city,id,selected)){save();$('#feedback').textContent=p.name+' built on Block '+(selected+1)+'.';render();}};d.append(h,desc,cost,button);return d;}));
 $('#pave').disabled=b.road||w.streets<6;$('#pave').textContent=b.road?'Street repaired ✓':'Repair this block’s street · 6 street work';$('#expand').disabled=!canExpand(city);$('#goal').textContent=canExpand(city)?'Your newest block is ready. Open another and keep the city growing.':'To open the next block: build four lots, including homes and a court, and repair its street. Three blocks form a neighborhood; nine form a borough.';
 draw(performance.now());
}
function reload(){if(storage)city=loadCity(storage);if(migrateHousing(city,storage))save();selected=Math.min(selected,city.blocks.length-1);}
$('#join').onclick=()=>{reload();city.name=$('#name').value.trim().slice(0,40)||'Our City';city.optedIn=true;save();render();};
$('#previous').onclick=()=>{selected=Math.max(0,selected-1);render();};$('#next').onclick=()=>{selected=Math.min(city.blocks.length-1,selected+1);render();};
$('#pave').onclick=()=>{reload();if(pave(city,selected)){save();$('#feedback').textContent='Cracks filled. A safer street for the whole block.';render();}};
$('#expand').onclick=()=>{reload();if(expand(city)){selected=city.blocks.length-1;save();$('#feedback').textContent='A new block is yours to build.';render();}};
window.addEventListener('storage',e=>{if([KEY,'pa-housing-city-v1'].includes(e.key)){reload();render();}});window.addEventListener('focus',()=>{reload();render();});document.addEventListener('visibilitychange',()=>{visible=!document.hidden;last=0;if(visible){reload();render();}});
function draw(now){if(!city.optedIn)return;const canvas=$('#city'),b=city.blocks[selected];paintWorld(canvas,b,selected,reduced.matches?0:worldTime,reduced.matches);canvas.setAttribute('aria-label',city.name+', Block '+(selected+1)+': '+(b.lots.map(id=>PROJECTS[id].name).join(', ')||'landscaped open plots')+'. '+(b.road?'Street repaired.':'Street ready for repair.')+' Families visit their homes and neighborhood activities.');}
function frame(now){if(visible&&(!last||now-last>16)){if(last)worldTime+=Math.min((now-last)/1000,.05);draw(now);last=now;}requestAnimationFrame(frame);}
render();worldReady.then(()=>draw(performance.now())).catch(()=>{$('#feedback').textContent='Neighborhood art is still loading. Reload to try again.';});requestAnimationFrame(frame);

const map=$('.city-view');
function setMapMode(detail){map.classList.toggle('detail',detail);map.classList.toggle('fit',!detail);$('#map-fit').setAttribute('aria-pressed',String(!detail));$('#map-detail').setAttribute('aria-pressed',String(detail));$('#map-hint').textContent=detail?'Swipe or use arrow keys to explore.':'Your neighborhood, alive.';map.scrollLeft=detail?Math.max(0,(map.scrollWidth-map.clientWidth)/2):0;}
$('#map-fit').onclick=()=>setMapMode(false);$('#map-detail').onclick=()=>setMapMode(true);map.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();map.scrollBy({left:e.key==='ArrowLeft'?-100:100,behavior:reduced.matches?'instant':'smooth'});}});setMapMode(false);
