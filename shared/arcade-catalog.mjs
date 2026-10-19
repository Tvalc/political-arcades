import {PROJECTS,wallet} from './city-state.mjs?v=launch1';
export const LABELS={housing:'building supplies',streets:'street work',recreation:'court points',care:'care',policy:'civic wins'};
export const GAMES=[
 {id:'crashers',name:'Capitol Crashers',href:'/capitol-crashers/',genre:'Street brawler',reward:'Care + civic wins',resources:['care','policy'],description:'Help the neighbors. Take on the bosses.',poster:'/media/cabinets/crashers-v2.webp'},
 {id:'vote',name:'VOTE',href:'/horse/',genre:'Basketball · solo or pass & play',reward:'Court points',resources:['recreation'],description:'Call a shot. Make them match it.',poster:'/media/cabinets/vote-v2.webp'},
 {id:'pothole',name:'Pothole Party',href:'/pothole-party/',genre:'Snake · street repair',reward:'Street work',resources:['streets'],description:'Deliver supplies. Circle back for your crew.',poster:'/media/cabinets/pothole-v2.webp'},
 {id:'housing',name:'Housing Stack',href:'/housing-stack/',genre:'Falling-block puzzle',reward:'Building supplies',resources:['housing'],description:'Fit the floors. Bring building supplies home.',poster:'/city/homes-v12.webp',beta:true},
 {id:'outreach',name:'Every Kid Can See',href:'/outreach-route/',genre:'Snake · community outreach',reward:'Care',resources:['care'],description:'Make your rounds. Bring the crew back.',poster:'/tests/outreach-route/campus-v6.webp',beta:true}
];
export const GOAL_KEY='pa-city-goal-v1';
export const GOALS={...PROJECTS,street:{name:'Restore the street',cost:{streets:6}}};
export function gameFor(resource){return GAMES.find(g=>g.resources.includes(resource)&&g.id!=='crashers')||GAMES.find(g=>g.resources.includes(resource));}
export function currentGoal(city,storage,index=city.blocks.length-1){try{const id=storage?.getItem(GOAL_KEY);if(Object.hasOwn(GOALS,id))return id;}catch{}const b=city.blocks[index]||city.blocks.at(-1);if(b.lots.length>=4&&!b.road)return 'street';return ['homes','court','kitchen','park'].find(id=>!b.lots.includes(id))||'homes';}
export function goalProgress(city,id){const goal=GOALS[id]||GOALS.homes,w=wallet(city),parts=Object.entries(goal.cost).map(([key,cost])=>({key,cost,have:w[key],missing:Math.max(0,cost-w[key])}));return {name:goal.name,id,parts,ready:parts.every(p=>!p.missing),text:parts.map(p=>Math.min(p.have,p.cost)+'/'+p.cost+' '+LABELS[p.key]).join(' · ')};}
export function chooseGoal(storage,id){if(!Object.hasOwn(GOALS,id))return false;try{storage.setItem(GOAL_KEY,id);return true;}catch{return false;}}
export function renderGames(container,{compact=false}={}){container.replaceChildren(...GAMES.map(g=>{const a=document.createElement('a');a.href=g.href;a.className='library-card';if(!compact){const img=document.createElement('img');img.src=g.poster;img.alt='';img.loading='lazy';img.width=320;img.height=180;a.append(img);}const body=document.createElement('div');const genre=document.createElement('small');genre.textContent=g.genre+(g.beta?' · Beta':'');const title=document.createElement('strong');title.textContent=g.name;const reward=document.createElement('span');reward.textContent='Earn '+g.reward.toLowerCase();body.append(genre,title,reward);a.append(body);return a;}));}
