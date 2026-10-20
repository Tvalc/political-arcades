(()=>{
'use strict';const T=window.OrderTrap,$=id=>document.getElementById(id),deckKey='point-of-order-case-deck-v1';
function savedBag(){try{const bag=JSON.parse(localStorage.getItem(deckKey));return bag&&typeof bag==='object'?bag:{};}catch{return{};}}
let state=T.create(Date.now(),savedBag()),changedAt=performance.now();
function nextMeeting(){state=T.create(state.seed+1,{remaining:state.remaining,lastCase:state.lastCase});}
function saveBag(){try{localStorage.setItem(deckKey,JSON.stringify({remaining:state.remaining,lastCase:state.lastCase}));}catch{/* Replay still works when storage is unavailable. */}}
function speech(who,line,kind='chair'){const el=document.createElement('div');el.className='speech '+kind;const words=document.createElement('div');words.className='speech-words';if(kind==='chair'){const portrait=document.createElement('canvas');portrait.width=192;portrait.height=192;portrait.className='objector-portrait';portrait.setAttribute('aria-hidden','true');el.append(portrait);}const label=document.createElement('p');label.className='speaker';label.textContent=who;const text=document.createElement('p');text.className='line';text.textContent=line;words.append(label,text);el.append(words);$('speech').append(el);}
function action(title,subtitle,fn,primary=false){const b=document.createElement('button');b.className='trap-choice'+(primary?' primary':'');const strong=document.createElement('strong');strong.textContent=title;b.append(strong);if(subtitle){const small=document.createElement('small');small.textContent=subtitle;b.append(small);}b.onclick=()=>{fn();changedAt=performance.now();render(true);};$('actions').append(b);return b;}
function reset(){nextMeeting();changedAt=performance.now();render(true);}
function render(focus=false){const current=T.caseFor(state),t=T.topicsFor(state).find(t=>t.id===state.topic),r=T.script(state);saveBag();document.body.dataset.stage=state.stage;document.body.dataset.round=state.round;
 const book=current.defended;
 $('case-title').textContent=state.stage==='won'?'Removal defeated':state.stage==='lost'?'Removal still proposed':'Removal proposed';
 $('book').dataset.theme=book.theme;$('book-title').textContent=book.coverTitle||book.title;$('book-subtitle').textContent=book.subtitle||'';$('book-subtitle').hidden=!book.subtitle;$('book-author').textContent=book.author;$('book-passage').textContent=book.summary;$('book-reference').textContent='About the book ↗';$('book-reference').href=book.source.url;
 $('book-caption').textContent=state.stage==='won'?'The books stay available to readers.':'Keep this book available to readers.';
 $('counterexample').hidden=!['commit','decision','result'].includes(state.stage);$('counter-title').textContent=book.comparison;$('counter-passage').textContent=current.evidence;$('counter-reference').textContent=current.source.title+' ↗';$('counter-reference').href=current.source.url;
 $('case-source').replaceChildren();
 const reviewed=['won','lost'].includes(state.stage)?state.caseIds.map(id=>T.cases.find(c=>c.id===id)):[current];
 for(const item of reviewed){const heading=document.createElement('h3'),about=document.createElement('a'),p=document.createElement('p'),link=document.createElement('a'),context=document.createElement('p');heading.textContent='Defending '+item.defended.title;about.textContent=item.defended.source.title;about.href=item.defended.source.url;about.target='_blank';about.rel='noreferrer';p.textContent='Counterexample from '+item.defended.comparison+': '+item.evidence;link.textContent=item.source.title;link.href=item.source.url;link.target='_blank';link.rel='noreferrer';context.textContent=item.context;$('case-source').append(heading,about,p,link,context);}
 $('hp').textContent=state.hp+' shame';$('shame').value=state.hp;$('round-label').textContent=['won','lost'].includes(state.stage)?'Meeting ended':'Exchange '+state.round+' of '+state.maxRounds;
 $('speech').replaceChildren();$('actions').replaceChildren();$('feedback').textContent='';$('record').replaceChildren();$('record').hidden=true;$('instruction').textContent='';$('response-label').hidden=!['question','commit','decision'].includes(state.stage);$('response-label').textContent=state.stage==='question'?'Your question':'Your response';
 $('burned').textContent=state.history.length?state.history.map(h=>h.result==='big'?'Big contradiction −40':h.result==='small'?'Small win −20':'He retreated −8').join(' · '):'';
 if(state.stage==='question'){
  speech('Chairman Doubledown',current.opening);
  $('instruction').textContent=state.round===1?'Defend the book. Pin down his rule, then expose the double standard. Empty his shame bar in four cases.':'Another book to defend. He gets guarded when you reuse an approach.';
  for(const topic of T.topicsFor(state))action(topic.question,state.used.includes(topic.id)?'He recognizes this approach. Expect a guarded answer.':'',()=>T.select(state,topic.id));
 }else if(state.stage==='commit'){
  speech('You',t.question,'you');speech('Chairman Doubledown',state.repeated?'I know where you’re going with this. '+r.commit:r.commit);
  $('instruction').textContent='He allows '+book.comparison+'. Use it to test the rule he just gave you.';
  action('Compare with '+book.comparison,current.evidence,()=>T.evidence(state),true);
 }else if(state.stage==='decision'){
  $('record').hidden=false;const label=document.createElement('b');label.textContent='Earlier, the chair said';const quote=document.createElement('p');quote.textContent='“'+r.commit+'”';$('record').append(label,quote);
  speech('You',current.challenge,'you');speech('Chairman Doubledown',r.answer);
  $('instruction').textContent='Take the small win, or push. His wording tells you whether he’ll double down or leave himself an escape.';
  action('Call it out · 20 shame','“'+r.call+'”',()=>T.resolve(state,'call'),true);
  action('Push further · 40 or 8 shame','“'+r.push+'”',()=>T.resolve(state,'push'));
  const note=document.createElement('p');note.className='risk-note';note.textContent='40 if he doubles down. Only 8 if he backs away.';$('actions').append(note);
 }else if(state.stage==='result'){
  const h=state.history.at(-1);speech('You',h.choice==='call'?r.call:r.push,'you');speech('Chairman Doubledown',r[state.result==='big'?'big':state.result==='small'?'safe':'retreat']);
  const damage=document.createElement('p');damage.className='damage';damage.textContent=(state.result==='big'?'Caught in his own words':state.result==='small'?'Small win banked':'He backed away')+' · −'+state.damage+' shame';$('speech').append(damage);
  $('instruction').textContent=h.lesson;
  action(state.hp===0?'Call the vote':state.round===state.maxRounds?'End the meeting':'Next case', '',()=>T.advance(state),true);
 }else{
  const won=state.stage==='won';speech('The room',won?'Chairman Doubledown is voted out. His removal proposals fail. The books stay.':'The meeting ends. Doubledown keeps his seat, and his removal proposals remain.','you');
  $('instruction').textContent=won?'You exposed enough contradictions in '+state.round+' exchanges.':'You left him with '+state.hp+' shame. A firm promise is worth pressing; a qualified answer may be worth banking.';
  action('Play another meeting','Unused cases come first. His answers can change.',nextMeeting,true);
  const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent='Review your exchanges';details.append(summary);state.history.forEach((h,i)=>{const p=document.createElement('p');p.textContent=(i+1)+'. '+T.cases.find(c=>c.id===h.caseId).title+': '+h.question+' −'+h.damage+' shame. '+h.lesson;details.append(p);});$('actions').append(details);
 }
 if(focus){$('actions').querySelector('button')?.focus({preventScroll:true});(state.stage==='question'?$('dialogue'):$('conversation-panel')).scrollIntoView({block:'nearest',behavior:'instant'});}
}
$('restart').onclick=reset;
function frame(now){const elapsed=(now-changedAt)/1000;
 window.ActionScene.draw({phase:'ready',last:'',hits:state.history.filter(h=>h.result==='big').length,timer:elapsed,position:1,danger:1,paused:false,duck:0},now);
 for(const portrait of document.querySelectorAll('.objector-portrait')){const c=portrait.getContext('2d');c.clearRect(0,0,192,192);c.drawImage($('arena'),222,67,156,178,0,0,192,192);}
 requestAnimationFrame(frame);
}
render();requestAnimationFrame(frame);
})();
