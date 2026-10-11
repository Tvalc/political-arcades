import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import vm from 'node:vm';
import {blankCity,validCity,build,pave,expand,canExpand,wallet,welcomeSupplies,award,migrateHousing} from '../../shared/city-state.mjs';
import {GAMES,goalProgress,currentGoal} from '../../shared/arcade-catalog.mjs';
import {parseBackup} from '../../shared/city-backup.mjs';
const make=()=>{const s=blankCity();s.optedIn=true;s.earned={housing:100,streets:100,recreation:100,care:100,policy:100};return s;};
let checked=0;const kinds=['homes','park','court','clinic','kitchen','fountain'];
for(let code=0;code<6**6;code++){const s=make();let n=code;for(let i=0;i<6;i++){assert(build(s,kinds[n%6],0));n=Math.floor(n/6);}assert(validCity(s));assert(!canExpand(s));assert(pave(s,0));assert(canExpand(s));const earned={...s.earned};assert(expand(s));assert.deepEqual(s.earned,earned);assert.equal(s.blocks[0].lots.length,6);assert.equal(s.blocks.length,2);checked++;}
const s=blankCity();assert(!welcomeSupplies(s));s.optedIn=true;assert(welcomeSupplies(s));assert.equal(wallet(s).housing,4);assert(!welcomeSupplies(s));assert(build(s,'homes',0));assert.equal(wallet(s).housing,0);assert(!welcomeSupplies(s));assert(validCity(s));
const old=make();build(old,'homes',0);const before=JSON.stringify(old);assert(!welcomeSupplies(old));assert.equal(JSON.stringify(old),before);
const earned=blankCity();assert(award(earned,{id:'vote1',type:'vote:win',count:4}));assert(!award(earned,{id:'vote1',type:'vote:win',count:4}));assert(!award(earned,{id:'bad',type:'vote:basket',count:-1}));assert.equal(wallet(earned).recreation,4);
const storage={getItem:k=>k==='pa-housing-city-v1'?JSON.stringify({version:1,floors:9}):null};assert(migrateHousing(earned,storage));assert(!migrateHousing(earned,storage));assert.equal(wallet(earned).housing,9);
assert.equal(GAMES.length,5);assert.equal(new Set(GAMES.map(g=>g.id)).size,5);assert.equal(goalProgress(earned,'homes').ready,true);assert.equal(currentGoal(blankCity()),'homes');
const payload={format:'adstoaid-city',version:1,city:earned,life:{version:1,spirit:3,blocks:{},events:[]},housing:{version:1,floors:9}};assert.deepEqual(parseBackup(JSON.stringify(payload)).city,earned);assert.throws(()=>parseBackup('{}'));assert.throws(()=>parseBackup(JSON.stringify({...payload,city:{...earned,earned:{...earned.earned,housing:-1}}})));assert.throws(()=>parseBackup(JSON.stringify({...payload,life:{version:1,spirit:-1}})));
for(const path of ['index.html','mockups/adstoaid.html']){const html=readFileSync(new URL('../../'+path,import.meta.url),'utf8');for(const m of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)){if(!m[1].includes('module'))new vm.Script(m[2]);}assert(html.includes('data-arcade-library'));assert(html.includes('mobile-city'));assert(html.includes("I'm getting a boat!"));assert.equal((html.match(/My grandkids get a house/g)||[]).length,1);}
console.log(JSON.stringify({cityLayoutsChecked:checked,checks:'PASS: progression recovery, no resource loss, one-time welcome supplies, event deduplication, Housing migration, backup validation, five-game catalog, inline script syntax and preserved milestone explanations'}));
