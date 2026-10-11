import {validCity} from './city-state.mjs?v=launch1';
export function parseBackup(text){
 if(typeof text!=='string'||text.length>2_000_000)throw Error('Choose an AdsToAid city backup smaller than 2 MB.');
 const data=JSON.parse(text);if(data?.format!=='adstoaid-city'||data.version!==1||!validCity(data.city))throw Error('This is not a valid AdsToAid city backup.');
 const life=data.life;if(life!==null&&life!==undefined&&(life.version!==1||!Number.isSafeInteger(life.spirit)||life.spirit<0||life.spirit>1e8||!life.blocks||typeof life.blocks!=='object'||Array.isArray(life.blocks)||!Array.isArray(life.events)||life.events.some(e=>!e||typeof e.text!=='string')))throw Error('This backup has invalid neighborhood activity.');
 const h=data.housing;if(h!==null&&h!==undefined&&(h.version!==1||!Number.isSafeInteger(h.floors)||h.floors<0))throw Error('This backup has invalid building supplies.');
 return data;
}
