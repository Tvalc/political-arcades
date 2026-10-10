export const KEY='pa-player-city-v1';
export const RESOURCES=['housing','streets','recreation','care','policy'];
export const PROJECTS={
 homes:{name:'Affordable homes',cost:{housing:4},description:'40 homes, with neighbors moving in.'},
 park:{name:'Neighborhood garden',cost:{streets:8},description:'Trees, benches, and somewhere to breathe.'},
 court:{name:'Community court',cost:{recreation:12},description:'A place to play, meet, and show off.'},
 clinic:{name:'Community clinic',cost:{care:6,policy:1},description:'Care close to home, with no bill.'},
 kitchen:{name:'Community kitchen',cost:{care:4},description:'A meal and a seat at the table.'},
 fountain:{name:'Public plaza',cost:{streets:12,policy:2},description:'A fountain and a space for everyone.'}
};
export function blankCity(){return {version:1,optedIn:false,name:'Our City',earned:Object.fromEntries(RESOURCES.map(k=>[k,0])),blocks:[{lots:[],road:false}],seen:[],imports:{},history:[]};}
export function validCity(s){return s?.version===1&&typeof s.name==='string'&&s.name.length<=40&&RESOURCES.every(k=>Number.isSafeInteger(s.earned?.[k])&&s.earned[k]>=0)&&Array.isArray(s.blocks)&&s.blocks.length>0&&s.blocks.length<=10000&&s.blocks.every(b=>Array.isArray(b.lots)&&b.lots.length<=6&&b.lots.every(k=>PROJECTS[k])&&typeof b.road==='boolean')&&Array.isArray(s.seen)&&Array.isArray(s.history)&&s.imports&&typeof s.imports==='object';}
export function loadCity(storage){try{const s=JSON.parse(storage.getItem(KEY));if(validCity(s))return s;}catch{}return blankCity();}
export function wallet(s){const w={...s.earned};for(const b of s.blocks){if(b.road)w.streets-=6;for(const id of b.lots)for(const [k,n] of Object.entries(PROJECTS[id].cost))w[k]-=n;}return w;}
export function award(s,event){if(!event||typeof event.id!=='string'||event.id.length>100||s.seen.includes(event.id))return false;const map={'housing:floor':'housing','pothole:repair':'streets','vote:basket':'recreation','vote:win':'recreation','crashers:help':'care','crashers:policy':'policy'},resource=map[event.type];if(!resource)return false;const count=event.type==='vote:win'?4:event.count??1;if(!Number.isSafeInteger(count)||count<1||count>4)return false;s.earned[resource]+=count;s.seen.push(event.id);if(s.seen.length>10000)s.seen.splice(0,s.seen.length-10000);s.history.unshift({type:event.type,count,at:Date.now()});s.history=s.history.slice(0,20);return true;}
export function canBuild(s,id,index){const b=s.blocks[index],p=PROJECTS[id],w=wallet(s);return Boolean(s.optedIn&&b&&p&&b.lots.length<6&&Object.entries(p.cost).every(([k,n])=>w[k]>=n));}
export function build(s,id,index){if(!canBuild(s,id,index))return false;s.blocks[index].lots.push(id);return true;}
export function pave(s,index){const b=s.blocks[index];if(!s.optedIn||!b||b.road||wallet(s).streets<6)return false;b.road=true;return true;}
export function canExpand(s){const b=s.blocks.at(-1);return b.road&&b.lots.length>=4&&b.lots.includes('homes')&&b.lots.includes('court');}
export function expand(s){if(!s.optedIn||!canExpand(s)||s.blocks.length>=10000)return false;s.blocks.push({lots:[],road:false});return true;}
export function migrateHousing(s,storage){try{const old=JSON.parse(storage.getItem('pa-housing-city-v1'));if(old?.version!==1||!Number.isSafeInteger(old.floors)||old.floors<0)return false;const imported=s.imports.housing||0;if(old.floors<=imported)return false;s.earned.housing+=old.floors-imported;s.imports.housing=old.floors;return true;}catch{return false;}}
