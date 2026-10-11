import {openingStatus,finishOpening,OPENING_DURATION} from './opening-day-v18.mjs?v=18.2';
export const KITCHEN_PROGRAMS=['Community supper','Neighborhood pantry','Cooking club','Game-day catering'];
export function ambition(b){
 if(!b.ambition||b.ambition.version!==1)b.ambition={version:1,mode:null,stage:'invitation',players:[],volunteers:[],coach:null,practice:0,eventTime:0,completed:false};
 const a=b.ambition;a.players=Array.isArray(a.players)?a.players:[];a.volunteers=Array.isArray(a.volunteers)?a.volunteers:[];
 let n=0;for(const p of b.places)if(p.kind==='kitchen'){if(!KITCHEN_PROGRAMS.includes(p.program))p.program=KITCHEN_PROGRAMS[n%4];n++;}
 return a;
}
export function leagueNeeds(b){const a=ambition(b),court=b.places.find(p=>p.kind==='court'&&!p.construction),target=a.mode==='youth'?4:3;return{court,target,players:Math.min(target,a.players.length),volunteers:Math.min(2,a.volunteers.length),coach:a.coach,ready:!!court&&a.players.length>=target&&a.volunteers.length>=2&&!!a.coach};}
export function beginLeague(b,mode){if(!['open','youth'].includes(mode)||ambition(b).mode)return false;const a=ambition(b);a.mode=mode;a.stage='preparing';const p=b.places.find(p=>p.kind==='court'&&!p.construction);if(p)b.focus=p.slot;return true;}
export function recordContribution(b,r,p){if(p.kind==='kitchen'){r.kitchenVisits=(r.kitchenVisits||0)+1;if(p.program==='Neighborhood pantry')r.mealsPacked=(r.mealsPacked||0)+1;if(p.program==='Cooking club'&&(r.programProgress?.['Cooking club']||0)>=3&&(r.programProgress?.['Cooking club']||0)<6)r.skill='Community cook';if(p.program==='Game-day catering')r.role='Opening-day cook';}const a=ambition(b);if(!a.mode||a.completed||a.stage!=='preparing')return null;
 if(p.kind==='court'){if(a.players.includes(r.id)&&a.coach&&!b.places.some(q=>['homes','kitchen','park'].includes(q.kind))&&!a.volunteers.includes(r.id)){a.volunteers.push(r.id);return r.parent+' volunteered to help run opening day.';}if(!a.players.includes(r.id)){a.players.push(r.id);return r.child+' joined the '+(a.mode==='youth'?'youth team':'pickup roster')+'.';}a.practice++;if(!a.coach){a.coach=r.id;r.role='Volunteer coach';return r.parent+' finished practice and volunteered to coach.';}}
 if(['homes','kitchen','park'].includes(p.kind)&&!a.volunteers.includes(r.id)){a.volunteers.push(r.id);r.role=r.role||'League volunteer';return r.parent+' signed up to help on opening day.';}
 return null;
}
export function startOpening(b,replay=false){const a=ambition(b);if(replay){if(!a.completed||!leagueNeeds(b).ready)return false;a.replaying=true;a.completed=false;}else if(a.stage!=='preparing'||!leagueNeeds(b).ready)return false;a.stage='opening';a.eventTime=0;a.afterPartyTime=0;a.playTime=0;a.gathered=false;a.phase='gathering';a.leagueName=a.leagueName||'Neighborhood HORSE Club';a.partyVersion=18;for(const r of b.residents)r.partyVersion=0;return true;}
export function stepAmbition(b,dt){const a=ambition(b);if(a.stage==='preparing'){const g=b.guides?.organizer;if(b.hero==='organizer'&&b.focus!==null&&!g?.moving&&g?.targetSlot===b.focus){a.recruitTime=(a.recruitTime||0)+dt;if(a.recruitTime>=24&&a.volunteers.length<2){const r=b.residents.find(r=>!a.volunteers.includes(r.id));if(r){a.volunteers.push(r.id);r.role=r.role||'League volunteer';a.recruitTime=0;return true;}}}return false;}if(a.stage!=='opening')return false;a.eventTime+=dt;
 // The party clock begins after the actual households arrive. Arrival routes stay continuous.
 const p=leagueNeeds(b).court,players=b.residents.filter(r=>a.players.includes(r.id));const oldPhase=a.phase;
 if(!a.gathered&&p&&players.length&&b.residents.every(r=>r.phase==='activity'&&r.stop===p.slot)){a.gathered=true;a.playTime=0;}
 if(a.gathered){a.playTime=(a.playTime||0)+dt;const status=openingStatus(b);a.phase=status.phase;if(a.phase==='tournament'&&oldPhase!=='tournament'&&b.courtSessions?.[p.slot])b.courtSessions[p.slot].clock=0;if(a.playTime>=OPENING_DURATION)return finishOpening(b);}
 return oldPhase!==a.phase;
}

export function projectDestination(b,r){if(b.goalWish&&!b.wishDelivered){const p=b.places.find(p=>p.kind===b.goalWish&&!p.construction);if(p)return p;}const a=ambition(b);if(!a.mode||a.completed)return null;const open=b.places.filter(p=>!p.construction),court=open.find(p=>p.kind==='court');if(!court)return null;
 if(a.stage==='opening')return court;
 if(!a.players.includes(r.id)||!a.coach)return court;
 if(!a.volunteers.includes(r.id))return open.find(p=>p.kind==='kitchen')||open.find(p=>p.kind==='homes')||open.find(p=>p.kind==='park')||court;
 return null;
}
