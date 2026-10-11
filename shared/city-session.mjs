import {KEY,loadCity} from './city-state.mjs?v=launch1';
import {currentGoal,goalProgress,LABELS} from './arcade-catalog.mjs?v=launch1';
import './arcade-navigation.mjs?v=ux2';
let storage;try{storage=localStorage;}catch{}
const baseline={...loadCity(storage).earned};
function update(){
 const city=loadCity(storage),g=goalProgress(city,currentGoal(city,storage));
 const earned=Object.entries(city.earned).filter(([k,n])=>n>baseline[k]).map(([k,n])=>(n-baseline[k])+' '+LABELS[k]);
 const receipt=(earned.length?'This visit: '+earned.join(' + ')+' saved. ':'')+'Next: '+g.name+' · '+g.text+(g.ready?' · Ready to build.':'');
 for(const n of document.querySelectorAll('[data-city-receipt]'))n.textContent=receipt;
 for(const a of document.querySelectorAll('[data-city-cta]'))a.textContent=g.ready?'Build in your city →':'See your city & supplies →';
}
update();window.addEventListener('city-rewards-updated',update);window.addEventListener('focus',update);window.addEventListener('storage',e=>{if(e.key===KEY)update();});
