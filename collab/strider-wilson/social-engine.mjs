export const W=600,H=900;
export const ROLES={speaker:{label:'Guest speaker',promise:'A microphone',intro:'THE SURPRISE KEYNOTE'},cousin:{label:"Pastor’s cousin",promise:'Family seats',intro:'A VERY IMPORTANT RELATIVE'},guest:{label:'Special guest',promise:'The VIP lounge',intro:'OUR MYSTERY VIP'}};
export const CREW={nora:{name:'Nora',job:'WELCOME TEAM',x:145,y:700,art:'nora'},martin:{name:'Martin',job:'FLOOR USHER',x:445,y:505,art:'usher'},dana:{name:'Dana',job:'SHOW DIRECTOR',x:155,y:315,art:'dana'},mc:{name:'Leo',job:'STAGE HOST',x:420,y:150,art:'leo'}};
export const ENCOUNTERS=[{who:'nora',ask:'You must be our...?',kind:'role'},{who:'martin',ask:'Nora radioed ahead. You’re the...?',kind:'recall'},{who:'dana',ask:'We’re live in two minutes. Who cleared you?',kind:'referral'},{who:'nora',ask:'Nora on the radio: what did I promise you?',kind:'promise'},{who:'mc',ask:'You’re up. How should I introduce you?',kind:'intro'}];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function create(){return{mode:'ready',paused:false,t:0,stage:0,access:0,mistakes:0,role:null,promise:null,contacts:[],picked:null,cursor:0,beatT:0,window:[.23,.78],reaction:null,score:0,cleanHits:0,blessing:0,escort:false,escortP:{x:445,y:505,moving:false,face:-1,walk:0},p:{x:300,y:815,px:300,py:815,moving:false,face:-1,walk:0},destination:null,notice:'',noticeT:0,finishT:0};}
export function start(g){if(g.mode==='ready'){g.mode='walk';g.notice='Walk up to Nora. Confidence is the disguise.';g.noticeT=4;}}
export function target(g){if(g.stage===3)return{x:305,y:235,name:'THE RADIO IS CALLING'};const a=CREW[ENCOUNTERS[g.stage]?.who||'mc'];return{...a,name:a.name.toUpperCase()};}
export function approach(g){if(g.mode==='walk'&&!g.paused){const a=target(g);g.destination={x:a.x+(a.x<300?65:-65),y:a.y+35};return true;}return false;}
export function options(g){const e=ENCOUNTERS[g.stage];if(!e)return[];
 if(e.kind==='role'||e.kind==='recall')return Object.entries(ROLES).map(([id,r])=>({id,text:r.label+'.'}));
 if(e.kind==='referral')return[{id:'nora',text:'Nora at the entrance.'},{id:'martin',text:'Martin brought me.'},{id:'myself',text:'I cleared myself.'}];
 if(e.kind==='promise')return[{id:'microphone',text:'A microphone.'},{id:'family',text:'Family seats.'},{id:'lounge',text:'The VIP lounge.'}];
 return[{id:'keynote',text:'The surprise keynote.'},{id:'blessed',text:'A very blessed guest.'},{id:'none',text:'No introduction needed.'}];
}
export function consistent(g,id){const k=ENCOUNTERS[g.stage]?.kind;if(k==='role'||k==='intro')return true;if(k==='recall')return id===g.role;if(k==='referral')return g.contacts.includes(id);return id===({speaker:'microphone',cousin:'family',guest:'lounge'})[g.role];}
export function choose(g,id){if(g.mode!=='talk'||g.paused)return false;const o=options(g).find(o=>o.id===id);if(!o)return false;g.picked=o;g.mode='delivery';g.beatT=0;g.cursor=0;g.window=g.stage===0?[.23,.78]:g.stage<3?[.32,.74]:[.4,.7];g.blessing=4;return true;}
export function sell(g){if(g.mode!=='delivery'||g.paused)return false;const solid=g.cursor>=g.window[0]&&g.cursor<=g.window[1];const coherent=consistent(g,g.picked.id);react(g,solid&&coherent,!coherent?'story':'timing');return true;}
function react(g,ok,why){let line;if(ok){g.cleanHits++;if(g.stage===0){g.role=g.picked.id;g.promise=ROLES[g.role].promise;g.contacts.push('nora');line=({speaker:'Guest speaker! We’ll find you a microphone. Martin, he’s expected.',cousin:'Family seats, of course. Martin, the pastor’s cousin is here.',guest:'The VIP lounge is yours. Martin, our special guest has arrived.'})[g.role];}
 else if(g.stage===1){g.contacts.push('martin');g.escort=true;line='Nora knows you. That’s good enough for me. I’ll take you to Dana.';}
 else if(g.stage===2){g.contacts.push('dana');line=({speaker:'A surprise keynote. Perfect. Nobody told me, which is very on brand.',cousin:'Family! Then you must know what’s happening. Please, take the stage.',guest:'If two people vouched for you, you’re practically on the payroll.'})[g.role];}
 else if(g.stage===3)line='Exactly! Dana, he checks out. Make sure he gets a good introduction.';
 else{g.contacts.push('mc');line=({keynote:'A surprise keynote! A surprise to literally everyone.',blessed:'A very blessed guest! Nobody can verify that, so we’re good.',none:'No introduction. Finally, a name I can pronounce.'})[g.picked.id];}
 g.access=g.contacts.length;}
 else{g.mistakes++;line=why==='story'?['That’s not what Nora said. Want to try that again?','Your story just changed. I’m getting my supervisor.','We’ve compared notes. Please come with us.'][g.mistakes-1]:['That greeting came with a lot of elbows. One more time?','You look less sure than your suit. One more chance.','Security has a very confident walk too. Please come with us.'][g.mistakes-1];}
 g.reaction={ok,line,why};g.mode='reaction';g.destination=null;g.p.moving=false;if(g.mistakes>=3)g.score=score(g);
}
export function continueAfter(g){if(g.mode!=='reaction'||g.paused)return false;if(g.mistakes>=3){g.mode='lost';return true;}if(!g.reaction.ok){g.mode='talk';g.picked=null;return true;}
 g.stage++;g.picked=null;g.reaction=null;if(g.stage>=ENCOUNTERS.length){g.mode='finale';g.destination={x:300,y:110};g.finishT=0;return true;}g.mode='walk';g.notice=g.stage===3?'Nora is calling back. Martin’s radio is buzzing.':g.stage===2?'Martin is personally escorting you. This is getting ridiculous.':g.stage===4?'They’re introducing you. Actually go up there.':'Nora radioed ahead. Go meet Martin.';g.noticeT=4;return true;
}
function move(p,dx,dy,dt,speed=145){const d=Math.hypot(dx,dy);if(d>1){dx/=d;dy/=d;}p.moving=d>.025;if(!p.moving)return;p.x=clamp(p.x+dx*speed*dt,72,528);p.y=clamp(p.y+dy*speed*dt,100,835);p.walk+=dt;if(Math.abs(dx)>.04)p.face=dx>0?1:-1;}
export function step(g,input,dt=1/60){if(g.paused||g.mode==='ready'||g.mode==='lost'||g.mode==='won')return;dt=Math.min(dt,.04);g.t+=dt;g.noticeT=Math.max(0,g.noticeT-dt);g.blessing=Math.max(0,g.blessing-dt);g.p.px=g.p.x;g.p.py=g.p.y;
 if(g.mode==='delivery'){g.beatT+=dt;const phase=(g.beatT*.7)%2;g.cursor=phase>1?2-phase:phase;if(g.beatT>7)react(g,false,'timing');}
 if(g.mode==='walk'||g.mode==='finale'){let [dx,dy]=g.mode==='finale'?[0,0]:input||[0,0];if(Math.hypot(dx,dy)>.04)g.destination=null;else if(g.destination){const x=g.destination.x-g.p.x,y=g.destination.y-g.p.y,d=Math.hypot(x,y);if(d<3)g.destination=null;else{dx=x/Math.max(d,145*dt);dy=y/Math.max(d,145*dt);}}move(g.p,dx,dy,dt);
  if(g.mode==='walk'){const a=target(g);if(Math.hypot(g.p.x-a.x,g.p.y-a.y)<83){g.mode='talk';g.destination=null;g.p.moving=false;}}
  else if(Math.hypot(g.p.x-300,g.p.y-110)<8){g.mode='won';g.score=score(g);g.p.moving=false;g.blessing=4;}
 }else g.p.moving=false;
 if(g.escort){g.escortP.px=g.escortP.x;g.escortP.py=g.escortP.y;const x=g.p.x-48,y=g.p.y+42,d=Math.hypot(x-g.escortP.x,y-g.escortP.y);move(g.escortP,(x-g.escortP.x)/Math.max(d,150*dt),(y-g.escortP.y)/Math.max(d,150*dt),dt,150);if(d<8)g.escortP.moving=false;}
}
export function score(g){return Math.max(0,g.cleanHits*400+(g.mode==='won'?1000:0)+(g.mistakes===0?500:0)+Math.round(Math.max(0,180-g.t)*4)-g.mistakes*150);}
export function story(g){return g.role?`${ROLES[g.role].label}. Nora promised ${g.promise.toLowerCase()}. Vouched for by ${g.contacts.map(k=>CREW[k].name).join(', ')}.`:'No cover story yet. Go introduce yourself to Nora.';}
