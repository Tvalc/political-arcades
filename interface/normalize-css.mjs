import {readFileSync,writeFileSync} from 'node:fs';
const path=new URL('../shared/interface/arcade-ui.css',import.meta.url);
// Lightning CSS differs at the seventh decimal place across OS builds.
// Normalize only computed OKLab numbers; all selectors and declarations stay checked.
const css=readFileSync(path,'utf8').replace(/oklab\(([^)]+)\)/g,(_,value)=>`oklab(${value.replace(/-?\d*\.\d+/g,n=>String(Number(Number(n).toFixed(5))))})`);
writeFileSync(path,css);
