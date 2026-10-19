export const N=12,WORK=5000;
export const STOPS=[{x:4,y:8,label:'School outreach',name:'Reading room'},{x:8,y:5,label:'School outreach',name:'Library corner'},{x:4,y:3,label:'School outreach',name:'After-school room'}];
export const DIR={up:[0,-1],right:[1,0],down:[0,1],left:[-1,0]};
export const same=(a,b)=>a.x===b.x&&a.y===b.y;
export function fresh(){return {version:1,body:[{x:2,y:8},{x:1,y:8},{x:0,y:8}],jobs:STOPS.map(s=>({...s,phase:'waiting',work:0})),moves:0};}
export function valid(s){return s?.version===1&&Number.isSafeInteger(s.moves)&&s.moves>=0&&Array.isArray(s.body)&&s.body.length>=1&&s.body.length<=3&&s.body.every(p=>Number.isInteger(p.x)&&Number.isInteger(p.y)&&p.x>=0&&p.x<N&&p.y>=0&&p.y<N)&&new Set(s.body.map(p=>p.x+','+p.y)).size===s.body.length&&Array.isArray(s.jobs)&&s.jobs.length===3&&s.jobs.every((j,i)=>same(j,STOPS[i])&&['waiting','working','ready','done'].includes(j.phase)&&Number.isFinite(j.work)&&j.work>=0&&j.work<=WORK)&&s.body.length+s.jobs.filter(j=>['working','ready'].includes(j.phase)).length===3;}
export function work(s,dt){const events=[];for(const [i,j]of s.jobs.entries())if(j.phase==='working'){j.work=Math.min(WORK,j.work+Math.max(0,Math.min(dt,1000)));if(j.work===WORK){j.phase='ready';events.push({type:'ready',index:i});}}return events;}
export function move(s,d){if(!DIR[d])return {type:'idle'};const [dx,dy]=DIR[d],head={x:s.body[0].x+dx,y:s.body[0].y+dy};if(head.x<0||head.y<0||head.x>=N||head.y>=N||s.body.slice(0,-1).some(p=>same(p,head)))return {type:'bump'};
 const tail={...s.body.at(-1)};s.body.unshift(head);s.body.pop();s.moves++;
 const index=s.jobs.findIndex(j=>same(j,head)),j=s.jobs[index];if(!j)return {type:'move'};
 if(j.phase==='waiting'&&s.body.length>1){s.body.pop();j.phase='working';j.work=0;return {type:'drop',index};}
 if(j.phase==='working'||j.phase==='ready'){s.body.push(tail);if(j.phase==='ready'){j.phase='done';return {type:'complete',index};}j.phase='waiting';j.work=0;return {type:'early',index};}
 return {type:j.phase==='waiting'?'needcrew':'move',index};
}
