(function(root,factory){const api=factory(root.OrderCases);if(typeof module==='object'&&module.exports)module.exports=api;else root.OrderTrap=api;})(typeof globalThis!=='undefined'?globalThis:this,(cases)=>{
'use strict';
const ids=cases.map(c=>c.id);
function random(s){s.seed=(Math.imul(s.seed,1664525)+1013904223)>>>0;return s.seed;}
function draw(s){
 if(!s.remaining.length){
  const deck=[...ids];for(let i=deck.length-1;i>0;i--){const j=random(s)%(i+1);[deck[i],deck[j]]=[deck[j],deck[i]];}
  s.remaining=deck.filter(id=>!s.caseIds.includes(id)&&id!==s.lastCase).concat(deck.filter(id=>s.caseIds.includes(id)||id===s.lastCase));
 }
 const id=s.remaining.shift();s.caseIds.push(id);s.lastCase=id;
}
function create(seed=Date.now(),bag={}){
 const remaining=Array.isArray(bag.remaining)?[...new Set(bag.remaining.filter(id=>ids.includes(id)))]:[];
 const s={stage:'question',hp:100,round:1,maxRounds:4,seed:seed>>>0,used:[],topic:null,stance:null,repeated:false,history:[],damage:0,result:null,remaining,caseIds:[],lastCase:ids.includes(bag.lastCase)?bag.lastCase:null};draw(s);return s;
}
function caseFor(s){return cases.find(c=>c.id===s.caseIds.at(-1));}
function topicsFor(s){return caseFor(s).topics;}
function select(s,id){if(s.stage!=='question')return false;const t=topicsFor(s).find(t=>t.id===id);if(!t)return false;random(s);s.repeated=s.used.includes(id);s.stance=s.repeated?'loose':s.round===1?'firm':s.seed%3===0?'loose':'firm';s.topic=id;s.used.push(id);s.stage='commit';return true;}
function script(s){return topicsFor(s).find(t=>t.id===s.topic)?.[s.stance];}
function evidence(s){if(s.stage!=='commit')return false;s.stage='decision';return true;}
function resolve(s,choice){if(s.stage!=='decision'||!['call','push'].includes(choice))return false;const lines=script(s),big=choice==='push'&&s.stance==='firm';s.result=choice==='call'?'small':big?'big':'retreat';s.damage=choice==='call'?20:big?40:8;s.hp=Math.max(0,s.hp-s.damage);s.history.push({caseId:caseFor(s).id,question:topicsFor(s).find(t=>t.id===s.topic).question,topic:s.topic,choice,result:s.result,damage:s.damage,commit:lines.commit,lesson:choice==='call'?'You banked the contradiction already on the record.':lines.lesson});s.stage='result';return true;}
function advance(s){if(s.stage!=='result')return false;if(s.hp===0)s.stage='won';else if(s.round===s.maxRounds)s.stage='lost';else{s.round++;s.stage='question';s.topic=null;s.stance=null;s.result=null;s.damage=0;s.repeated=false;draw(s);}return true;}
return{cases,topics:cases[0].topics,caseFor,topicsFor,create,select,script,evidence,resolve,advance};
});
