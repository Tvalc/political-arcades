import assert from 'node:assert/strict';
import {create,choosePersona,ask,topics,recall,pin,challenge,leave,receipts} from '../collab/ben-palmer/interview.mjs';
function ready(persona='carts'){const g=create();assert.equal(ask(g,'pay'),false);assert.ok(choosePersona(g,persona));assert.equal(choosePersona(g,'fish'),false);return g}
function perms(xs){if(!xs.length)return [[]];return xs.flatMap((x,i)=>perms(xs.filter((_,j)=>i!==j)).map(p=>[x,...p]))}
let routes=0;
for(const persona of ['carts','fish'])for(const order of perms(['pay','hours','work','recruits','override','kit'])){const g=ready(persona);for(const id of order){assert.ok(ask(g,id));if(g.phase==='callback'){assert.equal(ask(g,'pay'),false);assert.ok(recall(g,persona))}}assert.equal(topics(g).length,0);assert.equal(new Set(g.evidence).size,g.evidence.length);assert.ok(pin(g,'ad'));assert.ok(pin(g,'pay'));assert.equal(pin(g,'kit'),false);assert.ok(challenge(g));assert.equal(g.saved,1);pin(g,'ad');pin(g,'work');assert.ok(challenge(g));assert.equal(g.saved,2);assert.equal(g.outcome,'exposed');assert.equal(challenge(g),false);assert.equal(leave(g),false);assert.deepEqual(topics(g),[]);routes++}
for(const pair of [['ad','work'],['ad','pay'],['pay','hours'],['recruits','override'],['kit','pay']]){const g=ready();for(const id of new Set(pair.filter(x=>x!=='ad')))assert.ok(ask(g,id));for(const id of pair)pin(g,id);assert.ok(challenge(g));assert.equal(g.saved,1);assert.equal(g.done,false)}
let g=ready();ask(g,'hours');pin(g,'ad');pin(g,'hours');assert.ok(challenge(g));assert.equal(g.done,false);assert.equal(g.cover,1);assert.equal(g.pinned.length,0);
g=ready();for(const id of ['pay','hours','work'])ask(g,id,'bit');assert.equal(g.outcome,'caught');assert.equal(g.saved,0);assert.equal(ask(g,'kit'),false);
g=ready('fish');for(const id of ['pay','hours','work'])ask(g,id);assert.equal(g.phase,'callback');recall(g,'carts');assert.equal(g.cover,2);ask(g,'kit','bit');assert.equal(g.outcome,'caught');
g=ready();for(const id of ['pay','hours','work'])ask(g,id);assert.ok(recall(g,'carts'));assert.equal(g.cover,0);assert.ok(leave(g));assert.equal(g.saved,0);assert.ok(g.history.every(x=>x.text&&x.who));assert.equal(pin(g,'ad'),false);
g=ready();assert.equal(ask(g,'nonexistent'),false);assert.equal(ask(g,'pay','invalid'),false);assert.equal(pin(g,'no'),false);assert.equal(challenge(g),false);ask(g,'pay');assert.equal(ask(g,'pay'),false);
g=ready();ask(g,'pay');pin(g,'ad');pin(g,'pay');challenge(g);assert.equal(g.saved,1);pin(g,'ad');pin(g,'pay');challenge(g);assert.equal(g.saved,1);assert.equal(g.cover,2);assert.ok(leave(g));assert.equal(g.outcome,'leave');
console.log('PASS:',routes,'complete topic orders, all 5 evidence pairs, cover loss, wrong pair, resume callback, invalid actions and exits.');
