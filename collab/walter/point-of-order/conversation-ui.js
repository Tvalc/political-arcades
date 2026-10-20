(()=>{
'use strict';
const C=window.OrderConversation,$=id=>document.getElementById(id);let state=C.create(),changedAt=performance.now();
function speech(who,line,kind='chair'){const el=document.createElement('div');el.className='speech '+kind;const label=document.createElement('p');label.className='speaker';label.textContent=who;const text=document.createElement('p');text.className='line';text.textContent=line;el.append(label,text);$('speech').append(el);}
function button(text,fn,primary=true){const b=document.createElement('button');b.textContent=text;if(primary)b.className='primary';b.onclick=fn;$('actions').append(b);return b;}
function next(){C.advance(state);changedAt=performance.now();render(true);}
function reset(){state=C.create();changedAt=performance.now();render(true);}
function render(focus=false){
 const r=C.rounds[state.round];document.body.dataset.stage=state.stage;document.body.dataset.round=state.round+1;
 $('hp').textContent=state.hp+' shame';$('shame').value=state.hp;$('round-label').textContent=state.stage==='won'?'Three excuses exposed.':'Excuse '+(state.round+1)+' of 3';
 $('speech').replaceChildren();$('actions').replaceChildren();$('feedback').textContent=state.feedback;
 $('burned').replaceChildren();if(state.burned.length){$('burned').append('Excuses exposed: ');for(const id of state.burned){const el=document.createElement('span');el.textContent=C.rounds.find(x=>x.id===id).name;$('burned').append(el);}}
 $('response-label').hidden=!['rule','tell','reveal'].includes(state.stage);$('instruction').textContent='';
 if(state.stage==='rule'){
  speech('Chairman Doubledown','Any book with violence should be removed from school libraries.');
  $('instruction').textContent='Expose his double standards to get him voted out. Start by showing a book that contradicts his rule.';
  button('You: What about the Bible?',next);
 }else if(state.stage==='evidence'){
  speech('You','What about the Bible? It describes a bear attack in 2 Kings 2:24.','you');
  $('instruction').textContent='He has to explain why his rule doesn’t apply to that book.';
  button('Hear the chair’s answer',next);
 }else if(state.stage==='tell'){
  speech('Chairman Doubledown',r.hint);
  $('instruction').textContent=state.round===0?'Your turn. His watch is a clue. Predict the excuse he’ll use.':'Your turn. Which excuse is he reaching for now?';
  for(const c of C.choices){if(state.burned.includes(c.id))continue;const b=button('“'+c.label+'”',()=>{const correct=C.predict(state,c.id);changedAt=performance.now();render(correct);if(!correct)$('actions').querySelector('[data-excuse="'+c.id+'"]').focus({preventScroll:true});},false);b.className='choice';b.dataset.excuse=c.id;}
 }else if(state.stage==='reveal'){
  speech('You',r.prediction,'you');speech('Chairman Doubledown',r.reply);
  $('instruction').textContent='You called it. Now call out the double standard.';
  button('You: '+r.counter,next);
 }else if(state.stage==='result'){
  speech('You',r.counter,'you');speech('Chairman Doubledown',r.reaction);
  const damage=document.createElement('p');damage.className='damage';damage.textContent='−'+r.damage+' shame';$('speech').append(damage);
  $('instruction').textContent=state.hp===0?'No excuses left. The room is ready to vote.':'He can’t use the '+r.name.toLowerCase()+' excuse again.';
  button(state.hp===0?'See the vote':'Hear his next excuse',next);
 }else if(state.stage==='won'){
  speech('The room','Chairman Doubledown is voted out.','you');
  $('instruction').textContent='You heard the claim, spotted the excuse and exposed the double standard. You can keep playing at your own pace.';
  button('Play again without a timer',reset);
  const details=document.createElement('details');details.id='timed-info';const summary=document.createElement('summary');summary.textContent='Ready to try the timed arcade fight?';const p=document.createElement('p');p.textContent='Same three clues, plus a stamp to dodge. Move out of the red lane, pick his excuse, then throw when he turns green. Arrows or swipes move you. Space or the Throw button counters.';const a=document.createElement('a');a.className='button';a.href='arcade.html?v=conversation1';a.textContent='Try the timed fight';details.append(summary,p,a);$('actions').append(details);
 }
 if(focus){const first=$('actions').querySelector('button');if(first)first.focus({preventScroll:true});$('dialogue').scrollIntoView({block:'nearest',behavior:'instant'});}
}
$('restart').onclick=reset;
function draw(now){const r=C.rounds[state.round],elapsed=(now-changedAt)/1000;const isResult=state.stage==='result',won=state.stage==='won';const pose={phase:won?'won':isResult?'after':['tell','reveal'].includes(state.stage)?'tell':'ready',last:isResult||won?'hit':'',hits:state.burned.length,paused:false,timer:elapsed,target:r.id,position:1,danger:1,perfect:false};window.ActionScene.draw(pose,now);requestAnimationFrame(draw);}
render();requestAnimationFrame(draw);
})();
