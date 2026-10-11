// Feet coordinates follow the paved courtyard and its right-hand sidewalk.
// This scene tells a fictional family story; visits are game progress, not patients treated.
export const CLINIC={x:568,y:331};
export const ACTIVITIES=[{x:205,y:323,kind:'basketball'},{x:388,y:326,kind:'reading'},{x:669,y:326,kind:'family'},{x:300,y:336,kind:'basketball'},{x:442,y:365,kind:'reading'},{x:695,y:368,kind:'family'}];
export function routePoint(points,u){
 const lengths=points.slice(1).map((p,i)=>Math.hypot(p.x-points[i].x,p.y-points[i].y));
 let distance=Math.max(0,Math.min(1,u))*lengths.reduce((a,b)=>a+b,0);
 for(let i=0;i<lengths.length;i++){if(distance<=lengths[i]||i===lengths.length-1){const a=points[i],b=points[i+1],f=lengths[i]?distance/lengths[i]:0;return{x:a.x+(b.x-a.x)*f,y:a.y+(b.y-a.y)*f,flip:b.x<a.x};}distance-=lengths[i];}
 return{...points[0],flip:false};
}
export function familyState(index,time,arrivalAt=null){
 const age=arrivalAt===null?((time+index*8+18)%68):Math.max(0,time-arrivalAt)%68;
 const activity=ACTIVITIES[index%ACTIVITIES.length],queue={x:CLINIC.x+34+(index%3)*25,y:CLINIC.y-2+(index%3)*5};
 let phase,u,position;
 if(age<8){phase='arrive';u=age/8;position=routePoint([{x:925,y:486},{x:422,y:477},{x:422,y:387},queue],u);}
 else if(age<14){phase='glasses';u=(age-8)/6;position={...queue,flip:true};}
 else if(age<22){phase='join';u=(age-14)/8;position=routePoint([queue,{x:488,y:330},activity],u);}
 else if(age<50){phase='activity';u=(age-22)/28;position={x:activity.x,y:activity.y,flip:false};}
 else if(age<63){phase='leave';u=(age-50)/13;position=routePoint([activity,{x:activity.x,y:330},{x:422,y:330},{x:422,y:387},{x:422,y:477},{x:925,y:486}],u);}
 else{phase='away';u=(age-63)/5;position={x:925,y:486,flip:false};}
 const opacity=phase==='away'?0:Math.max(0,Math.min(1,(925-position.x)/40));
 return{...position,phase,u,opacity,activity,hasGlasses:age>=12,moving:['arrive','join','leave'].includes(phase),age};
}
