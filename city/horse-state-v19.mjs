import {courtPoint,courtBasketFloor,courtRim} from './court-geometry-v15.mjs?v=16.0';
export const HEROES=['mamdani','sayed','talarico'];
export const HERO_NAMES={mamdani:'Mamdani',sayed:'El-Sayed',talarico:'Talarico',kid:'The neighborhood kid'};
const PLAYERS=[...HEROES,'kid'],clamp=n=>Math.max(0,Math.min(1,n)),mix=(a,b,u)=>({x:a.x+(b.x-a.x)*u,y:a.y+(b.y-a.y)*u});
function roles(turn){turn=Math.max(0,turn);const round=Math.floor(turn/4),rest=HEROES[round%3],order=[...HEROES,'kid'];return {active:order[turn%4],rebounder:turn%4===3?rest:'kid'};}
function positions(slot,turn){const r=roles(turn),spot=courtPoint(slot,...[[.38,.56],[.44,.69],[.36,.40]][Math.floor(Math.max(0,turn)/4)%3]),floor=courtBasketFloor(slot);let queue=0;return PLAYERS.map(id=>({id,p:id===r.active?spot:id===r.rebounder?{x:floor.x-5,y:floor.y+4}:courtPoint(slot,.13,queue++===0?.85:.38)}));}
export function horseState(slot,clock=0,reduced=false,citizen=null){
 clock=Math.max(0,Number(clock)||0);const turn=Math.floor(clock/12),age=clock-turn*12,r=roles(turn),next=roles(turn+1).active,made=turn%11!==5&&turn%13!==7;
 const targets=positions(slot,turn),following=positions(slot,turn+1),u=reduced?0:clamp((age-9)/2),cheer=!reduced&&made&&age>=4.65&&age<6;
 const floor=courtBasketFloor(slot),rim=courtRim(slot),drop={x:rim.x+(made?0:14),y:floor.y-3};
 const actors=targets.map(a=>{const end=following.find(b=>b.id===a.id).p;const start=a.id===r.rebounder?{x:drop.x-5,y:floor.y+4}:a.p;let p=age>=9?mix(start,end,u):a.p,moving=u>0&&u<1&&Math.hypot(end.x-a.p.x,end.y-a.p.y)>1;
 if(a.id===r.rebounder&&age>=4.8&&age<9&&!reduced){const pickup={x:drop.x-5,y:floor.y+4};p=mix(a.p,pickup,clamp((age-4.8)/1.2));moving=age<6&&Math.hypot(a.p.x-pickup.x,a.p.y-pickup.y)>1;}
 let action=moving?'move':'idle',actionAge=clock;
 if(a.id===r.active&&!reduced&&age<9){if(age<3){action='dribble';actionAge=age;}else if(age<4.4){action='shot';actionAge=age-3;}else if(cheer){action='celebrate';actionAge=age-4.65;}}
 else if(cheer&&a.id!==r.rebounder){action='celebrate';actionAge=age-4.65;}
 return {id:a.id,...p,action,age:Math.max(0,actionAge),height:a.id==='kid'?(slot<3?29:33):(slot<3?43:49),face:moving&&end.x<a.p.x?-1:1};});
 if(citizen){for(const a of actors)if(a.id==='kid'){a.childArt=citizen.art;a.name=citizen.name;}}
 return {slot,clock,turn,age,citizen,...r,next,made,cheer,actors,drop,shooter:targets.find(a=>a.id===r.active).p,label:(r.active==='kid'&&citizen?citizen.name:HERO_NAMES[r.active])+(turn%4===0?' sets the shot':' follows the same shot')};
}
