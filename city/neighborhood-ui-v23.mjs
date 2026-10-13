import {JOBS,ROLES,STOCK_NAMES,STORIES,neighborhood,duration,projectCost,assignCrew,startProject,chooseStory,crewRate} from './neighborhood-v23.mjs';
const make=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;};
const time=s=>s<60?Math.ceil(s)+' sec':s<3600?Math.ceil(s/60)+' min':(s/3600).toFixed(1).replace('.0','')+' hr';
const games={housing:['Housing Stack','/housing-stack/'],care:['Every Kid Can See','/outreach-route/'],recreation:['VOTE','/horse/']};
export function createNeighborhoodUI({get,change,visit,demo}){
  const panel=make('section',undefined,'neighborhood-plans');panel.id='neighborhood-plans';panel.setAttribute('aria-labelledby','plans-title');document.querySelector('.town-shell').after(panel);
  const jump=make('a','Crews & plans');jump.href='#neighborhood-plans';jump.className='neighborhood-jump';document.querySelector('.city-tools').prepend(jump);
  let signature='',report=null;
  const event=(name,props)=>{if(!demo)window.ArcadeAnalytics?.capture(name,props);};
  function action(text,fn){const b=make('button',text);b.type='button';b.onclick=()=>{change(fn);signature='';render(true);};return b;}
  function render(force=false){
    const {life,b,index}=get(),n=neighborhood(b);
    for(const bar of panel.querySelectorAll('[data-clock]')){const id=bar.dataset.clock,p=n.projects[id],rate=n.crews.filter(c=>c.job===id&&c.resident).reduce((sum,c)=>sum+crewRate(b,c),0);bar.value=p.work;const eta=panel.querySelector('[data-eta="'+id+'"]');if(eta)eta.textContent=rate?time((duration(p.level)-p.work)/rate)+' remaining · '+n.crews.filter(c=>c.job===id&&c.resident).length+' crew(s)':'Waiting for a crew. Assign one above.';}
    const supply=panel.querySelector('.plans-summary');if(supply)supply.textContent=life.spirit+' community effort available · Buildings produce every 15 minutes.';
    for(const button of panel.querySelectorAll('[data-cost]'))button.disabled=life.spirit<Number(button.dataset.cost);
    // Do not replace controls under the user's keyboard or open native select menu.
    if(!force&&panel.contains(document.activeElement))return;
    const sig=JSON.stringify([index,Object.values(n.projects).map(p=>[p.level,p.active,p.story,p.choice]),n.crews,n.stock,Object.values(n.residents).map(r=>[r.done,r.work>=1800]),life.deliveryTarget,report,n.journal[0],b.places.map(p=>[p.kind,p.level,!!p.construction])]);if(!force&&sig===signature)return;signature=sig;
    const open=[...panel.querySelectorAll('details[open]')].map(e=>e.dataset.section),focus=document.activeElement?.dataset?.focus;
    panel.replaceChildren();
    const head=make('div',undefined,'plans-heading');const title=make('h2','A neighborhood with plans.');title.id='plans-title';head.append(title,make('p','Two crews per block. Three ideas. You decide what happens next.'));panel.append(head);
    if(report){const box=make('section',undefined,'return-report');box.setAttribute('aria-label','While you were away');box.append(make('h3','Welcome back.'),make('p',report),action('Got it',()=>{report=null;}));panel.append(box);}
    if(!b.places.some(p=>!p.construction)){
      panel.append(make('p','Start with a home or another place on the map. Your neighbors can begin their first project as soon as it opens.'));
      const a=make('a','Choose a place on the map ↑');a.href='#builder';panel.append(a);return;
    }
    const summary=make('p',life.spirit+' community effort available · Buildings produce every 15 minutes.','plans-summary');panel.append(summary);
    const crewGrid=make('div',undefined,'crew-grid');
    for(const [i,c] of n.crews.entries()){
      const card=make('div',undefined,'crew-card');card.append(make('h3','Crew '+(i+1)));
      for(const [field,label] of [['resident','Crew leader'],['job','Assignment']]){
        const wrap=make('label',label),select=make('select');select.dataset.focus='crew-'+i+'-'+field;select.setAttribute('aria-label',label+' for crew '+(i+1));
        const opts=field==='resident'?[[null,'Choose a neighbor'],...b.residents.map(r=>[r.id,r.parent+' · '+JOBS[n.residents[r.id].job].wish])]:[[null,'Resting'],...Object.entries(JOBS).map(([id,j])=>[id,j.name])];
        for(const [value,text]of opts){const o=make('option',text);o.value=value??'';o.selected=c[field]===value;o.disabled=field==='resident'&&n.crews.some((other,j)=>j!==i&&other.resident===value&&value!==null);select.append(o);}
        select.onchange=()=>{const value=select.value||null;change(()=>{const current=get(),crew=neighborhood(current.b).crews[i];assignCrew(current.b,i,field==='resident'?value:crew.resident,field==='job'?value:crew.job);event('city_crew_assigned');});signature='';render(true);};wrap.append(select);card.append(wrap);
      }
      const active=c.job&&n.projects[c.job].active&&c.resident;card.append(make('p',active?'Working at '+crewRate(b,c).toFixed(2)+'× speed.':c.job&&c.resident?n.projects[c.job].story?'Project finished. Choose what happens next below.':'Ready when you start this project.':'Choose a leader and an assignment.'));crewGrid.append(card);
    }panel.append(crewGrid);
    const cards=make('div',undefined,'project-grid');
    for(const [id,j]of Object.entries(JOBS)){
      const p=n.projects[id],card=make('article',undefined,'neighborhood-project');card.dataset.projectId=id;
      const img=make('img');img.src='/city/'+j.kind+'-v12.webp';img.alt='';img.loading='lazy';card.append(img,make('p',p.level?'Program level '+p.level:'First neighborhood project','eyebrow'),make('h3',j.name),make('p',j.detail));
      const roster=n.crews.filter(c=>c.job===id&&c.resident),rate=roster.reduce((s,c)=>s+crewRate(b,c),0);
      if(p.story){card.append(make('p',STORIES[id].text,'project-story'));for(const [choice,option]of STORIES[id].options.entries())card.append(action(option[0]+' · +'+option[2]+' '+STOCK_NAMES[option[1]],()=>{chooseStory(get().b,id,choice);event('city_story_chosen');}));}
      else if(p.active){const bar=make('progress');bar.dataset.clock=id;bar.max=duration(p.level);bar.value=p.work;bar.setAttribute('aria-label',j.name+' progress');const eta=make('p',rate?time((duration(p.level)-p.work)/rate)+' remaining · '+roster.length+' crew'+(roster.length===1?'':'s'):'Waiting for a crew. Assign one above.');eta.dataset.eta=id;card.append(bar,eta);
        const target=life.deliveryTarget?.block===index&&life.deliveryTarget?.job===id;card.append(action(target?'Arcade deliveries go here ✓':'Send arcade deliveries here',()=>{get().life.deliveryTarget={block:get().index,job:id};event('city_delivery_selected');}));
        const [label,href]=games[j.resource],a=make('a','Play '+label+' →');a.href=href;a.onclick=()=>change(()=>{get().life.deliveryTarget={block:get().index,job:id};});card.append(a,make('small','Any game helps. This one gives twice the project boost. Supplies remain available for buildings.'));
      }else {const cost=projectCost(p.level),start=action(p.level?'Start next chapter · '+cost+' effort':'Start first project · free',()=>{const s=get();if(startProject(s.life,s.b,id)){const state=neighborhood(s.b),free=state.crews.findIndex(c=>!c.resident||!c.job),available=s.b.residents.filter(r=>!state.crews.some(c=>c.resident===r.id)),leader=available.find(r=>state.residents[r.id].job===id)||available[0];if(free>=0&&leader&&!state.crews.some(c=>c.job===id&&c.resident))assignCrew(s.b,free,leader.id,id);s.life.deliveryTarget={block:s.index,job:id};event('city_project_started');}});start.dataset.cost=cost;start.disabled=life.spirit<cost;card.append(make('p',time(duration(p.level))+' with one crew before bonuses. Earn '+(12+Math.min(5,p.level+1)*4)+' effort and 4 '+STOCK_NAMES[j.stock]+'.'),start);}
      card.append(make('small',ROLES[j.kind].name+' gives this crew +50% speed. Matching ambition +25%. Experienced leader +25%.'));cards.append(card);
    }panel.append(cards);
    const residents=make('details');residents.dataset.section='neighbors';residents.append(make('summary','Meet your neighbors · ambitions & experience'));
    const residentGrid=make('div',undefined,'resident-grid');for(const r of b.residents){const a=n.residents[r.id],card=make('article');card.append(make('h3',r.parent+' & '+r.child),make('p',JOBS[a.job].wish),make('p',a.done?'Ambition fulfilled '+a.done+' time'+(a.done===1?'':'s')+'.':'Lead a crew through this project to fulfill the ambition.'),make('small',a.work>=1800?'Experienced leader · +25% crew speed':time(1800-a.work)+' of crew work to become an experienced leader.'));card.append(action('Find '+r.parent+' on the map',()=>visit(r.id)));residentGrid.append(card);}residents.append(residentGrid);panel.append(residents);
    const buildings=make('details');buildings.dataset.section='buildings';buildings.append(make('summary','How your buildings work together'));
    buildings.append(make('p','Neighborhood stores: '+Object.entries(n.stock).map(([id,value])=>value+' '+STOCK_NAMES[id]).join(' · ')+'. Stores hold up to 99 each.'));
    buildings.append(make('p','Every 15 minutes, each working crew can use one matching supply, one care pack and one volunteer contact. Each adds 25% speed for that shift.'));
    const list=make('ul');for(const [kind,role]of Object.entries(ROLES)){const li=make('li');const link=action(role.name,()=>visit(null,kind));li.append(link,make('span',role.detail+(kind==='homes'?'':' Makes one per building level every 15 minutes.')));list.append(li);}buildings.append(list);panel.append(buildings);
    if(n.journal.length){const journal=make('details');journal.dataset.section='journal';journal.append(make('summary','Neighborhood journal'));const list=make('ul');for(const item of n.journal)list.append(make('li',item.text));journal.append(list);panel.append(journal);}
    panel.append(make('p','Crews and buildings keep working for up to 8 hours while you are away. Finished projects wait for your decision. Nothing breaks if you take a day off.','plans-footnote'));
    for(const d of panel.querySelectorAll('details'))d.open=open.includes(d.dataset.section);
    if(focus)panel.querySelector('[data-focus="'+focus+'"]')?.focus({preventScroll:true});
  }
  return {render,report(text){report=text;signature='';render();}};
}
