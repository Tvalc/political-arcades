const art=new Image();art.src='/art/housing-stack/props-v6.webp';export const upgradeArtReady=art.decode();
const meta={bench:{x:264,y:87,w:240,h:163},garden:{x:520,y:539,w:240,h:223}};
function prop(c,id,x,y,h){const r=meta[id];if(!art.naturalWidth)return;const w=h*r.w/r.h;c.drawImage(art,r.x,r.y,r.w,r.h,x-w/2,y-h,w,h);}
export function addUpgradeArt(add,c,p,layout,partyHasBench=false){if(p.construction||p.level<2)return;const y=p.slot<3?396:558,s=p.slot<3?1:1.15;const x=layout.x;
 if(p.kind==='homes'||p.kind==='fountain'){add(y,()=>prop(c,'garden',x-layout.w*.27,y,29*s));if(p.level>=3)add(y+1,()=>prop(c,'bench',x+layout.w*.25,y,27*s));}
 else if(p.kind==='court'){if(!partyHasBench)add(y,()=>prop(c,'bench',x-layout.w*.43,y,27*s));if(p.level>=3)add(y+2,()=>prop(c,'bench',x+layout.w*.18,y+3,27*s));}
 else{add(y,()=>prop(c,'bench',x-layout.w*.28,y,27*s));if(p.level>=3)add(y+1,()=>prop(c,'garden',x+layout.w*.28,y,29*s));}
}
