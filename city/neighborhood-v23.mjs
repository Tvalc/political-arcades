// The neighborhood economy uses elapsed time, independently of the renderer.
// Saved inside pa-city-life-v1, so existing file and cloud backups include it.
export const MAX_AWAY = 8 * 60 * 60;
export const JOBS = {
  supper: {name:'A seat at the table', kind:'kitchen', resource:'care', stock:'meals', wish:'Host a neighborhood supper', detail:'Prepare meals and get neighbors cooking together.'},
  reading: {name:'The after-school club', kind:'park', resource:'housing', stock:'books', wish:'Start an after-school club', detail:'Give kids a place to read and adults a place to share what they know.'},
  league: {name:'A league of our own', kind:'court', resource:'recreation', stock:'confidence', wish:'Organize a neighborhood team', detail:'Train a team and make room for first-time players.'}
};
export const ROLES = {
  homes: {name:'Homes', stock:'effort', detail:'Neighbors contribute 2 community effort every 15 minutes per level.'},
  park: {name:'Garden', stock:'books', detail:'Produces learning kits. These help the after-school crew.'},
  court: {name:'Court', stock:'confidence', detail:'Produces team practice. This helps the league crew.'},
  clinic: {name:'Clinic', stock:'care', detail:'Produces care packs. One supports each crew for 15 minutes.'},
  kitchen: {name:'Kitchen', stock:'meals', detail:'Produces meals. These help the supper crew.'},
  fountain: {name:'Plaza', stock:'connections', detail:'Produces volunteer contacts. One helps each crew for 15 minutes.'}
};
export const STOCK_NAMES = {meals:'meals',books:'learning kits',confidence:'team practices',care:'care packs',connections:'volunteer contacts'};
export const STORIES = {
  supper: {text:'The supper filled every chair. Some neighbors want to deliver food to people who cannot come out. Others want to teach more people to cook. Which should the crew try next?', options:[['Take meals to neighbors','meals',6],['Start a cooking workshop','books',6]]},
  reading: {text:'The club has more children than books. A neighbor offers a collection of stories; another offers to teach a garden class. What should the club make room for?', options:[['Make a lending library','books',6],['Grow food together','meals',6]]},
  league: {text:'Your team is ready to play. The regulars want a tournament, but several neighbors have never picked up a ball. What kind of afternoon should the crew organize?', options:[['Run a beginners’ clinic','confidence',6],['Invite the whole block','connections',6]]}
};
const keys=Object.keys(JOBS), stocks=Object.keys(STOCK_NAMES);
const finite=(n,fallback=0)=>Number.isFinite(n)&&n>=0?n:fallback;
const count=n=>Math.min(1e8,Math.floor(finite(n)));
export function duration(level){return [90,1800,7200,14400][Math.min(3,count(level))];}
export function projectCost(level){return Math.min(5,count(level))*8;}
export function neighborhood(b,now=Date.now()) {
  if(!b.neighborhood || b.neighborhood.version!==1) b.neighborhood={version:1,lastAt:now,cycle:0,stock:{},projects:{},crews:[{resident:null,job:null},{resident:null,job:null}],journal:[],residents:{},deliveries:{}};
  const n=b.neighborhood;
  n.lastAt=finite(n.lastAt,now);n.cycle=Math.min(900,finite(n.cycle));
  n.stock??={};for(const k of stocks)n.stock[k]=Math.min(99,count(n.stock[k]));
  n.projects??={};for(const id of keys){const p=n.projects[id]??={};p.level=count(p.level);p.work=Math.min(duration(p.level),finite(p.work));p.active=p.active===true;p.choice=[0,1].includes(p.choice)?p.choice:null;p.story=p.story===true;}
  if(!Array.isArray(n.crews)||n.crews.length!==2)n.crews=[{resident:null,job:null},{resident:null,job:null}];
  const used=new Set();for(const c of n.crews){if(!b.residents.some(r=>r.id===c.resident)||used.has(c.resident))c.resident=null;if(c.resident)used.add(c.resident);if(!keys.includes(c.job))c.job=null;}
  n.residents??={};b.residents.forEach((r,i)=>{const a=n.residents[r.id]??={job:keys[i%3],done:0,work:0};if(!keys.includes(a.job))a.job=keys[i%3];a.done=count(a.done);a.work=finite(a.work);});
  n.journal=Array.isArray(n.journal)?n.journal.slice(0,12):[];n.deliveries??={};return n;
}
function log(n,text){n.journal.unshift({text});n.journal=n.journal.slice(0,12);}
export function assignCrew(b,index,resident,job){
  const n=neighborhood(b);if(![0,1].includes(index)||!(resident===null||b.residents.some(r=>r.id===resident))||(resident!==null&&n.crews.some((c,i)=>i!==index&&c.resident===resident))||!(job===null||keys.includes(job)))return false;
  n.crews[index]={resident,job};return true;
}
export function startProject(life,b,id){
  if(!Object.hasOwn(JOBS,id))return false;const n=neighborhood(b),p=n.projects[id],cost=projectCost(p.level);
  if(p.active||p.story||life.spirit<cost||!b.places.some(p=>!p.construction))return false;
  life.spirit-=cost;p.active=true;p.work=0;log(n,JOBS[id].name+' is underway.');return true;
}
export function chooseStory(b,id,choice){
  if(!Object.hasOwn(JOBS,id)||![0,1].includes(choice))return false;const n=neighborhood(b),p=n.projects[id];if(!p.story)return false;
  const [label,stock,amount]=STORIES[id].options[choice];n.stock[stock]=Math.min(99,n.stock[stock]+amount);p.story=false;p.choice=choice;log(n,label+'. The neighbors contributed '+amount+' '+STOCK_NAMES[stock]+'.');return true;
}
export function crewRate(b,c){
  const n=neighborhood(b),a=n.residents[c.resident];if(!c.resident||!c.job||!a)return 0;
  // A matching venue gives +50%, an experienced leader +25%, their ambition +25%.
  return 1+(b.places.some(p=>p.kind===JOBS[c.job].kind&&!p.construction)?.5:0)+(a.work>=1800?.25:0)+(a.job===c.job?.25:0)+(c.support||0);
}
function complete(life,b,n,id){
  const p=n.projects[id];p.active=false;p.work=0;p.level++;p.story=true;
  const reward=12+Math.min(5,p.level)*4;life.spirit=Math.min(1e8,life.spirit+reward);
  n.stock[JOBS[id].stock]=Math.min(99,n.stock[JOBS[id].stock]+4);
  for(const c of n.crews.filter(c=>c.job===id&&c.resident)){const a=n.residents[c.resident];if(a.job===id)a.done++;}
  const text=JOBS[id].name+' completed. +'+reward+' community effort and 4 '+STOCK_NAMES[JOBS[id].stock]+'.';log(n,text);life.events.unshift({text});life.events=life.events.slice(0,8);
}
function production(life,b,n){
  for(const p of b.places.filter(p=>!p.construction)){
    const stock=ROLES[p.kind]?.stock;if(stock==='effort')life.spirit=Math.min(1e8,life.spirit+2*p.level);
    else if(stock)n.stock[stock]=Math.min(99,n.stock[stock]+p.level);
  }
  for(const c of n.crews){c.support=0;if(!c.job||!c.resident||!n.projects[c.job].active)continue;
    for(const k of [JOBS[c.job].stock,'care','connections'])if(n.stock[k]>0){n.stock[k]--;c.support+=.25;}
  }
}
// Each project finishes once and waits for a player decision. No auto-repeating rewards.
export function advanceNeighborhood(life,b,now=Date.now()){
  const n=neighborhood(b,now);if(now<=n.lastAt)return {seconds:0,completed:0,worked:0};
  let seconds=Math.min(MAX_AWAY,(now-n.lastAt)/1000),remaining=seconds,completed=0,worked=0;n.lastAt=now;
  while(remaining>0){
    const training=n.crews.filter(c=>c.resident&&c.job&&n.projects[c.job].active).map(c=>n.residents[c.resident].work).filter(work=>work<1800).map(work=>1800-work);
    const dt=Math.min(remaining,900-n.cycle,...training);n.cycle+=dt;remaining-=dt;
    for(const id of keys){const p=n.projects[id];if(!p.active)continue;
      const assigned=n.crews.filter(c=>c.job===id&&c.resident);const rate=assigned.reduce((s,c)=>s+crewRate(b,c),0);
      const working=rate?Math.min(dt,(duration(p.level)-p.work)/rate):0;
      p.work+=working*rate;worked+=working*rate;for(const c of assigned)n.residents[c.resident].work+=working;
      if(p.work+1e-7>=duration(p.level)){complete(life,b,n,id);completed++;}
    }
    if(n.cycle>=900){n.cycle=0;production(life,b,n);}
  }
  return {seconds,completed,worked};
}
// Deliveries speed up the selected project, never consume or replace arcade supplies.
// A lifetime watermark prevents reloads, restores and tab switches from counting twice.
export function applyDeliveries(life,city){
  const totals={...city.earned,recreation:city.earned.recreation+(city.recreationQuarters||0)/4};
  if(!life.deliveryWatermark){life.deliveryWatermark={...totals};return 0;}
  let delivered=0;
  for(const [resource,value] of Object.entries(totals)){
    const delta=Math.max(0,value-(life.deliveryWatermark[resource]??value));life.deliveryWatermark[resource]=Math.max(value,life.deliveryWatermark[resource]||0);if(!delta)continue;
    const target=life.deliveryTarget;if(!target||!Object.hasOwn(JOBS,target.job))continue;
    const b=life.blocks[target.block];if(!b)continue;const n=neighborhood(b),p=n.projects[target.job];if(!p.active)continue;
    const seconds=delta*(JOBS[target.job].resource===resource?30:15);
    // Deliveries can do up to 75%; a crew still does the final work.
    const added=Math.max(0,Math.min(seconds,duration(p.level)*.75-p.work));p.work+=added;delivered+=added;
    if(added)log(n,'Arcade delivery: '+Math.round(added)+' seconds of work prepared for '+JOBS[target.job].name.toLowerCase()+'. Your building supplies stay in the stockpile.');
  }return delivered;
}

export function validNeighborhood(n){
  const object=o=>!!o&&typeof o==='object'&&!Array.isArray(o);
  const number=(v,max=1e8)=>Number.isFinite(v)&&v>=0&&v<=max;
  const integer=(v,max=1e8)=>Number.isSafeInteger(v)&&number(v,max);
  return object(n)&&n.version===1&&number(n.lastAt,1e15)&&number(n.cycle,900)&&
    object(n.stock)&&stocks.every(k=>integer(n.stock[k],99))&&
    object(n.projects)&&keys.every(id=>{const p=n.projects[id];return object(p)&&integer(p.level)&&number(p.work,14400)&&typeof p.active==='boolean'&&typeof p.story==='boolean'&&(p.choice===null||[0,1].includes(p.choice));})&&
    Array.isArray(n.crews)&&n.crews.length===2&&n.crews.every(c=>object(c)&&(c.resident===null||typeof c.resident==='string'&&c.resident.length<=100)&&(c.job===null||keys.includes(c.job))&&(c.support===undefined||number(c.support,.75)))&&
    object(n.residents)&&Object.keys(n.residents).length<=100&&Object.values(n.residents).every(r=>object(r)&&keys.includes(r.job)&&integer(r.done)&&number(r.work,1e15))&&
    Array.isArray(n.journal)&&n.journal.length<=12&&n.journal.every(e=>object(e)&&typeof e.text==='string'&&e.text.length<=1000);
}
