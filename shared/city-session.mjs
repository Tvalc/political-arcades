import {KEY,loadCity} from './city-state.mjs?v=launch1';
import {currentGoal,goalProgress,LABELS,GOALS,chooseGoal,GAMES} from './arcade-catalog.mjs?v=launch1';
import {earnedTotals,earnedSince,rewardText,PROJECT_ART,OUTCOMES} from './city-journey.mjs';
import './arcade-navigation.mjs?v=ux2';
let storage;try{storage=localStorage;}catch{}
const params=new URLSearchParams(location.search),requested=params.get('cityGoal');
if(Object.hasOwn(GOALS,requested))chooseGoal(storage,requested);
const baseline=earnedTotals(loadCity(storage));
const game=GAMES.find(g=>location.pathname===g.href);
const plan=document.createElement('section');plan.className='city-run-plan';plan.setAttribute('aria-label','What this game builds in your city');
const art=document.createElement('img');art.alt='';art.width=68;art.height=68;
const copy=document.createElement('div'),title=document.createElement('strong'),detail=document.createElement('p'),earnedLine=document.createElement('p'),progress=document.createElement('progress'),link=document.createElement('a');
progress.max=1;earnedLine.className='city-run-earned';earnedLine.setAttribute('role','status');copy.append(title,detail,progress,earnedLine);link.dataset.cityCta='';plan.append(art,copy,link);
const main=document.querySelector('main')||document.querySelector('iframe');if(main?.matches('iframe'))main.after(plan);else if(main)main.before(plan);else document.body.append(plan);
// The result screen gets the same receipt as the page, including Housing Stack.
for(const host of document.querySelectorAll('#overlay .overlay-card,.mobile-result'))if(!host.querySelector('[data-city-receipt]')){const receipt=document.createElement('div');receipt.className='city-receipt';const text=document.createElement('p'),back=document.createElement('a');text.dataset.cityReceipt='';back.dataset.cityCta='';receipt.append(text,back);host.append(receipt);}

function update(){
 const city=loadCity(storage),g=goalProgress(city,currentGoal(city,storage));
 const earned=earnedSince(city,baseline),gameResources=game?.resources||[];
 art.src='/city/'+PROJECT_ART[g.id]+'-v12.webp';title.textContent='Build next: '+g.name;
 const useful=g.parts.some(p=>p.missing&&gameResources.includes(p.key));
 detail.textContent=g.text+' · '+(g.ready?'Supplies ready. Choose a plot in your city.':useful?OUTCOMES[g.id]:(game?'This game earns '+game.reward.toLowerCase()+'. Stockpile them or choose another build.':OUTCOMES[g.id]));
 progress.value=g.parts.reduce((n,p)=>n+Math.min(1,p.have/p.cost),0)/g.parts.length;progress.setAttribute('aria-label',g.name+' supplies');
 earnedLine.textContent=earned.length?'Earned this visit: '+rewardText(earned)+' · saved on this device.':'Rewards carry across runs. No account required.';
 const receipt=(earned.length?'This visit: '+rewardText(earned)+' saved. ':'')+'Next: '+g.name+' · '+g.text+(g.ready?' · Ready to build.':'');
 for(const n of document.querySelectorAll('[data-city-receipt]'))n.textContent=receipt;
 const block=params.get('cityBlock'),returnPath='/city/'+(block!==null&&/^\d+$/.test(block)?'?cityBlock='+encodeURIComponent(block):'');
 for(const a of document.querySelectorAll('[data-city-cta]')){a.textContent=g.ready?'Build in your city →':'Your city & supplies →';a.href=returnPath;}
 if(!storage)earnedLine.textContent='Saving is unavailable in this browser. Enable site storage to keep rewards.';
}
update();window.addEventListener('pageshow',update);window.addEventListener('city-rewards-updated',update);window.addEventListener('focus',update);window.addEventListener('storage',e=>{if(e.key===KEY||e.key==='pa-city-goal-v1')update();});
