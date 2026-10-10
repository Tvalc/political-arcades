export const OUTREACH_STAGES=[{at:0,title:'The crew is on its way',next:1},{at:1,title:'A clearer school day',next:3},{at:3,title:'Families on the block',next:6},{at:6,title:'A neighborhood in motion',next:12},{at:12,title:'Keep the good going',next:null}];
export function outreachStage(count){return [...OUTREACH_STAGES].reverse().find(s=>count>=s.at)||OUTREACH_STAGES[0];}
export function outreachCount(city){const n=city?.imports?.outreach;return Number.isSafeInteger(n)&&n>=0?n:(city?.seen||[]).filter(id=>id.startsWith('outreach-')).length;}
