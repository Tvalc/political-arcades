import {KEY,loadCity} from './city-state.mjs?v=launch1';
import {currentGoal,goalProgress} from './arcade-catalog.mjs?v=launch1';
let storage;try{storage=localStorage;}catch{}
function update(){const city=loadCity(storage),g=goalProgress(city,currentGoal(city,storage));for(const n of document.querySelectorAll('[data-city-receipt]')){n.textContent=g.name+' · '+g.text+(g.ready?' · Ready to build.':'');}for(const a of document.querySelectorAll('[data-city-cta]'))a.textContent=g.ready?'Build in my city →':'My city & supplies →';}
update();window.addEventListener('city-rewards-updated',update);window.addEventListener('focus',update);window.addEventListener('storage',e=>{if(e.key===KEY)update();});
