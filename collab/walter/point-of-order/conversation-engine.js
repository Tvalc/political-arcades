(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.OrderConversation=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
'use strict';
const rounds=[
 {id:'history',name:'History',prop:'Pocket watch',hint:'Now, now. The Bible is very old. Surely that counts for something.',clue:'His watch and “very old” point to a history excuse.',prediction:'You’re going to say it’s historical, aren’t you?',reply:'The bears were grandfathered in.',counter:'Old violence is still violence.',reaction:'I’ll ask the bears for their birth certificates.',damage:34},
 {id:'context',name:'Context',prop:'Dictionary',hint:'You have to read the whole chapter before you criticize the bears.',clue:'“Read the whole chapter” means he wants to argue about context.',prediction:'You’re going to say I took it out of context.',reply:'Exactly. Those bears had a rich inner life.',counter:'Context doesn’t erase the attack.',reaction:'Fine. Strike “rich inner life” from the minutes.',damage:34},
 {id:'jurisdiction',name:'District',prop:'District map',hint:'Those bears aren’t even from this school district.',clue:'He’s pointing at a map and talking about the district.',prediction:'You’re going to say it’s outside your district.',reply:'Correct. We have no jurisdiction over foreign bears.',counter:'Your rule is about books, not bears’ addresses.',reaction:'This meeting is adjourned due to excessive consistency.',damage:32}
];
const choices=[{id:'history',label:'It’s historical.'},{id:'context',label:'You need the context.'},{id:'jurisdiction',label:'It’s outside our district.'}];
function create(){return{stage:'rule',round:0,hp:100,burned:[],feedback:'',mistakes:0};}
function advance(s){
 const next={rule:'evidence',evidence:'tell',reveal:'result'}[s.stage];
 if(next){if(next==='result'){const r=rounds[s.round];s.hp=Math.max(0,s.hp-r.damage);s.burned.push(r.id);}s.stage=next;s.feedback='';return true;}
 if(s.stage==='result'){if(s.round<2){s.round++;s.stage='tell';}else s.stage='won';s.feedback='';return true;}return false;
}
function predict(s,id){if(s.stage!=='tell'||!choices.some(c=>c.id===id)||s.burned.includes(id))return false;const r=rounds[s.round];if(id!==r.id){s.mistakes++;s.feedback='Try again. '+r.clue+' Nothing lost. Take your time.';return false;}s.stage='reveal';s.feedback='';return true;}
return{rounds,choices,create,advance,predict};
});
