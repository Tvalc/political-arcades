export const CITY_KEY='pa-housing-city-v1';
export const FLOORS_PER_BUILDING=4,BUILDINGS_PER_BLOCK=4,BLOCKS_PER_NEIGHBORHOOD=3,NEIGHBORHOODS_PER_BOROUGH=3;
export function loadCity(storage){try{const s=JSON.parse(storage.getItem(CITY_KEY));if(s?.version===1&&Number.isSafeInteger(s.floors)&&s.floors>=0)return s;}catch{}return {version:1,floors:0};}
export function addFloors(city,count,storage){if(!Number.isSafeInteger(count)||count<=0)return false;city.floors+=count;try{storage.setItem(CITY_KEY,JSON.stringify(city));return true;}catch{return false;}}
export function cityProgress(floors){return {homes:floors*10,buildings:Math.floor(floors/4),blocks:Math.floor(floors/16),neighborhoods:Math.floor(floors/48),boroughs:Math.floor(floors/144),activeBlock:Math.floor(floors/16),activeNeighborhood:Math.floor(floors/48)};}
export function blockName(index){return ['Stoop Street','Courtyard Row','Garden Avenue'][index%3]+' · '+(Math.floor(index/3)+1);}
