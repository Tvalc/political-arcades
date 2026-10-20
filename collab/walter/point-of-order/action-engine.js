(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.OrderAction=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
'use strict';
const excuses=[{id:'history',symbol:'◷',name:'History',tell:'POCKET WATCH',line:'The bears were grandfathered in.'},{id:'context',symbol:'▤',name:'Context',tell:'DICTIONARY',line:'You took the bears out of context.'},{id:'jurisdiction',symbol:'⚖',name:'Jurisdiction',tell:'LAWYER’S MAP',line:'The bears live outside our district.'}];
function create(seed=Date.now()){return{phase:'ready',timer:0,duration:0,hp:100,lives:3,lane:1,position:1,danger:1,selected:'history',target:'history',burned:[],round:0,hits:0,dodges:0,event:0,message:'DODGE. READ. COUNTER.',last:'',paused:false,seed:seed>>>0,impactResolved:false,perfect:false};}
function level(s){return s.hits;}
function go(s,phase,duration,message){s.phase=phase;s.timer=0;s.duration=duration;s.message=message;s.event++;}
function begin(s){if(s.phase!=='ready')return false;newRound(s);return true;}
function newRound(s){s.round++;const remaining=excuses.filter(e=>!s.burned.includes(e.id));s.seed=(Math.imul(s.seed,1664525)+1013904223)>>>0;s.target=s.round===1?'history':remaining[s.seed%remaining.length].id;s.impactResolved=false;s.perfect=false;s.danger=s.lane;go(s,'windup',s.round===1?2.6:1.45-level(s)*.2,'RED LANE! MOVE ← OR →');}
function move(s,dir){if(s.paused||['ready','won','lost'].includes(s.phase))return false;s.lane=Math.max(0,Math.min(2,s.lane+Math.sign(dir)));return true;}
function choose(s,id){if(s.paused||!excuses.some(e=>e.id===id)||s.burned.includes(id)||!['tell','counter'].includes(s.phase))return false;s.selected=id;return true;}
function strike(s){if(s.paused||!['tell','counter'].includes(s.phase))return false;
 if(s.phase==='tell'){s.last='early';go(s,'after',1.2,'TOO EARLY · HE STAMPED IT IRRELEVANT');return false;}
 if(s.selected!==s.target){s.last='wrong';go(s,'after',1.2,'WRONG EXCUSE · HE DODGED THE QUESTION');return false;}
 s.perfect=s.timer/s.duration>.35&&s.timer/s.duration<.65;const damage=s.perfect?40:34;s.hp=Math.max(0,s.hp-damage);s.hits++;s.burned.push(s.target);s.last='hit';
 if(s.hp===0){go(s,'won',2,'VOTED OUT!');}else{go(s,'after',1.4,(s.perfect?'PERFECT! ':'')+'−'+damage+' SHAME · EXCUSE BURNED');}return true;}
function pause(s){if(!['ready','won','lost'].includes(s.phase))s.paused=true;}
function resume(s){s.paused=false;}
function tick(s,dt){if(s.paused||['ready','lost'].includes(s.phase)||!Number.isFinite(dt)||dt<0)return;if(s.phase==='won'){s.timer=Math.min(2,s.timer+dt);return;}s.position+=(s.lane-s.position)*Math.min(1,dt*20);s.timer+=dt;
 if(s.phase==='impact'&&!s.impactResolved){s.impactResolved=true;if(Math.abs(s.position-s.danger)<.45){s.lives--;s.last='hurt';s.message='STAMPED! −1 MIC';s.event++;if(s.lives===0){go(s,'lost',0,'MIC CUT. MEETING OVER.');return;}}else{s.dodges++;s.last='dodge';s.message='DODGED!';s.event++;}}
 if(s.timer<s.duration)return;
 if(s.phase==='windup')go(s,'impact',.24,'STAMP!');
 else if(s.phase==='impact')go(s,'recover',.45,s.last==='hurt'?'SHAKE IT OFF':'NICE DODGE');
 else if(s.phase==='recover'){if(s.burned.includes(s.selected))s.selected=excuses.find(e=>!s.burned.includes(e.id)).id;go(s,'tell',s.round===1?2.7:1.9-level(s)*.15,'READ HIS PROP · PICK THE EXCUSE');}
 else if(s.phase==='tell')go(s,'counter',s.round===1?2.3:1.45-level(s)*.15,'GREEN! THROW NOW');
 else if(s.phase==='counter'){s.last='late';go(s,'after',1.1,'TOO LATE · HE HID BEHIND HIS DESK');}
 else if(s.phase==='after')newRound(s);
}
return{excuses,create,begin,move,choose,strike,pause,resume,tick,level};
});
