import {courtLayout,courtPosition} from './court-geometry-v15.mjs?v=16.0';
export const OPENING_DURATION=62;
export function openingStatus(b){const a=b.ambition??{},t=Math.max(0,Number(a.playTime)||0);if(a.completed)return{phase:'complete',title:'Your neighborhood has a league.',speaker:'TONY',line:'That is what a block can do. Keep the games going — and invite the next block.',progress:1};if(a.stage!=='opening')return null;
 if(!a.gathered)return{phase:'gathering',title:'The whole block is coming.',speaker:'THE ORGANIZER',line:'The coach is finding the team. Volunteers are opening the drinks cart and reading corner.',progress:0};
 if(t<6)return{phase:'welcome',title:'Welcome to opening day.',speaker:'TONY · WITH EL-SAYED',line:'You brought the court. Your neighbors brought the whole damn party. Everybody gets a turn.',progress:t/62};
 if(t<54)return{phase:'tournament',title:'Four players. One ball. Everybody gets a turn.',speaker:'THE NEIGHBORHOOD COACH',line:'Mamdani sets the shot. El-Sayed and Talarico follow. Then the kid gets their shot — and a politician rebounds.',progress:t/62};
 return{phase:'celebration',title:'That is our team!',speaker:'TONY',line:'A court, a coach, a crew of volunteers — and a block that now knows each other. This league is yours.',progress:Math.min(1,t/62)};
}
export function partyStations(slot){const l=courtLayout(slot),s=slot<3?1:1.15;const y=slot<3?395:558;return {cart:{x:l.x+l.w*.43,y},reading:{x:l.x-l.w*.45,y},welcome:{x:l.x+l.w*.12,y:y+9},coach:{x:l.x-l.w*.16,y:y-7},scale:s};}
export function openingAssignment(b,r,i=0){const a=b.ambition,court=b.places.find(p=>p.kind==='court'&&!p.construction);if(!court)return null;const s=partyStations(court.slot);let role='sideline',p=courtPosition(court.slot,i);
 if(r.id===a.coach){role='coach';p=s.coach;}
 else if(r.id===a.volunteers?.[0]){role='drinks';p={x:s.cart.x-29,y:s.cart.y+4};}
 else if(r.id===a.volunteers?.[1]){role='reading';p={x:s.reading.x-13,y:s.reading.y+4};}
 return {...p,role,slot:court.slot};}
export function finishOpening(b,skipped=false){const a=b.ambition,p=b.places.find(p=>p.kind==='court'&&!p.construction);if(!a||a.stage!=='opening'||!p)return false;a.stage='complete';a.completed=true;a.skipped=skipped;a.afterPartyTime=0;a.phase='complete';if(!a.replaying||!a.receipt)a.receipt={players:[...a.players],volunteers:[...a.volunteers],coach:a.coach,shots:skipped?null:4};a.replaying=false;a.leagueName=a.leagueName||'Neighborhood HORSE Club';p.level=Math.max(2,p.level);p.program='After-school league';const coach=b.residents.find(r=>r.id===a.coach);if(coach)coach.role='Neighborhood coach';for(const id of a.volunteers){const r=b.residents.find(r=>r.id===id);if(r&&r.id!==a.coach)r.role='League volunteer';}for(const r of b.residents){if(r.phase==='activity'&&r.stop===p.slot)r.timer=0;}return true;}
