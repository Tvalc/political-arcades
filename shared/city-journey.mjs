import {RESOURCES} from './city-state.mjs';
import {LABELS} from './arcade-catalog.mjs';

// Lifetime earnings, rather than spendable balances: building must never erase a receipt.
export function earnedTotals(city){return Object.fromEntries(RESOURCES.map(k=>[k,(city.earned[k]||0)+(k==='recreation'?(city.recreationQuarters||0)/4:0)]));}
export function earnedSince(city,before){const totals=earnedTotals(city);return RESOURCES.map(key=>({key,count:Math.max(0,totals[key]-(Number(before?.[key])||0))})).filter(p=>p.count>0);}
export function rewardText(parts){return parts.map(p=>'+'+p.count+' '+LABELS[p.key]).join(' · ');}
export const PROJECT_ART={homes:'homes',court:'court',park:'park',clinic:'clinic',kitchen:'kitchen',fountain:'fountain',street:'neighborhood-repaired'};
export const OUTCOMES={homes:'Families move in and become your neighbors.',court:'Neighbors take turns playing HORSE, cheer and build a team.',park:'Families read, garden and grow a neighborhood gathering place.',clinic:'Families visit for care and neighbors become volunteers.',kitchen:'Neighbors share meals and learn to cook together.',fountain:'Give neighbors a public place to gather.',street:'Replace the damaged street with a smoother route through your block.'};
