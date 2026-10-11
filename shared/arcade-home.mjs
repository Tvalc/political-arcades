import {GAMES,GOAL_KEY,currentGoal,goalProgress,LABELS} from './arcade-catalog.mjs?v=launch1';
import {KEY,loadCity,wallet} from './city-state.mjs?v=launch1';

// Ordinary disclosure navigation: same destinations at every screen size.
const toggle=document.getElementById('menu-toggle'), nav=document.getElementById('site-nav'), more=nav.querySelector('details');
const phone=matchMedia('(max-width:799px)');
toggle.hidden=false;
function closeMenu(returnFocus=false){toggle.setAttribute('aria-expanded','false');nav.hidden=phone.matches;more.open=false;if(returnFocus)toggle.focus();}
closeMenu();phone.addEventListener('change',()=>closeMenu());
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.hidden=!open;});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&(more.open||toggle.getAttribute('aria-expanded')==='true')){const focus=phone.matches?toggle:more.querySelector('summary');closeMenu();focus.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.topbar'))closeMenu();});
nav.addEventListener('focusout',e=>{if(e.relatedTarget&&!nav.contains(e.relatedTarget)&&e.relatedTarget!==toggle)closeMenu();});

const settings={
 crashers:{art:'crashers',video:'crashers-v2.mp4',quad:[[159,250],[409,245],[388,492],[125,485]]},
 vote:{art:'vote',video:'vote-v2.mp4',quad:[[159,250],[410,245],[387,492],[124,483]]},
 pothole:{art:'pothole',video:'pothole-v2.mp4',quad:[[160,250],[410,246],[387,490],[126,483]]},
 housing:{art:'pothole',title:['HOUSING','STACK'],accent:'#ffd46b',capture:'housing-gameplay.jpg',viewBox:'632 38 324 642'},
 outreach:{art:'pothole',title:['EVERY KID','CAN SEE'],accent:'#82eee4',capture:'outreach-gameplay.jpg',viewBox:'47.5 11.6875 697.015625 697.015625'}
};
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n;};
const grid=document.querySelector('[data-cabinets]');
const planes=[];
GAMES.forEach((g,i)=>{
 const cfg=settings[g.id]||{art:'pothole',title:[g.name],accent:'#ffd46b'};
 const card=el('article','machine'),a=el('a','machine-link');card.dataset.game=g.id;card.id='game-'+g.id;a.href=g.href;a.setAttribute('aria-label','Play '+g.name+(g.beta?' (Beta)':''));
 const art=el('span','cab-art'),wrap=el('span','screenwrap'),img=el('img');img.src='/art/cabinets/'+cfg.art+'.webp';img.alt='';img.width=600;img.height=900;img.decoding='async';if(i>1)img.loading='lazy';
 const screen=el('span','cab-screen');screen.setAttribute('aria-hidden','true');
 if(cfg.video){const v=el('video','screenvid');v.muted=true;v.playsInline=true;v.loop=true;v.preload='none';v.poster=g.poster;v.dataset.src='/media/cabinets/'+cfg.video;screen.append(v);}
 else if(cfg.capture){const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg'),shot=document.createElementNS(ns,'image');svg.setAttribute('viewBox',cfg.viewBox);svg.setAttribute('preserveAspectRatio','xMidYMid meet');shot.setAttribute('href','/media/cabinets/'+cfg.capture);shot.setAttribute('width','1280');shot.setAttribute('height','720');svg.append(shot);screen.append(svg);}
 else {const p=el('img','screenvid-static');p.src=g.poster;p.alt='';screen.append(p);}
 wrap.append(img,screen);
 if(cfg.title){
  // Reuse the existing illustrated cabinet shell. New labels are native SVG,
  // with both original Pothole Party marquees covered (front and side).
  const overlay=document.createElementNS('http://www.w3.org/2000/svg','svg');overlay.setAttribute('viewBox','0 0 600 900');overlay.setAttribute('class','cab-brand');overlay.setAttribute('aria-hidden','true');
  overlay.innerHTML='<defs><linearGradient id="marquee-'+g.id+'" x2="0" y2="1"><stop stop-color="#30315c"/><stop offset="1" stop-color="#121c32"/></linearGradient></defs><path d="M107 75 L389 47 L395 171 L96 191Z" fill="url(#marquee-'+g.id+')" stroke="'+cfg.accent+'" stroke-width="3"/><g transform="translate(112 88) skewY(-5)"><text x="132" y="34" text-anchor="middle" font-size="32" fill="'+cfg.accent+'">'+cfg.title[0]+'</text><text x="132" y="78" text-anchor="middle" font-size="38" fill="#fff5d9">'+(cfg.title[1]||'')+'</text></g><path d="M413 719 L555 654 L558 761 L409 832Z" fill="#12273c" stroke="'+cfg.accent+'" stroke-width="3"/><g transform="translate(422 730) skewY(-25)"><text x="0" y="7" font-size="17" fill="'+cfg.accent+'">'+cfg.title[0]+'</text><text x="0" y="33" font-size="20" fill="#fff5d9">'+(cfg.title[1]||'')+'</text></g>';
  wrap.append(overlay);
 }
 art.append(wrap);
 const caption=el('div','placard'),heading=el('div','placard-top'),title=el('h3','',g.name);heading.append(title);if(g.beta)heading.append(el('span','beta','Beta'));
 const genre=g.id==='vote'?'Basketball · solo or local multiplayer':g.genre;
 caption.append(heading,el('p','genre',genre),el('p','reward','Earn '+g.reward.toLowerCase()));
 const play=el('span','play-label','Play free');play.setAttribute('aria-hidden','true');play.append(el('span','','→'));caption.append(play);a.append(art,caption);card.append(a);grid.append(card);
 planes.push({img,screen,quad:cfg.quad||settings.pothole.quad});
});

// Match the already approved perspective of the illustrated cabinet screens.
function homography(src,dst){
 const adj=m=>[m[4]*m[8]-m[5]*m[7],m[2]*m[7]-m[1]*m[8],m[1]*m[5]-m[2]*m[4],m[5]*m[6]-m[3]*m[8],m[0]*m[8]-m[2]*m[6],m[2]*m[3]-m[0]*m[5],m[3]*m[7]-m[4]*m[6],m[1]*m[6]-m[0]*m[7],m[0]*m[4]-m[1]*m[3]];
 const mul=(a,b)=>Array.from({length:9},(_,n)=>[0,1,2].reduce((v,k)=>v+a[3*Math.floor(n/3)+k]*b[k*3+n%3],0));
 const basis=p=>{const m=[p[0][0],p[1][0],p[2][0],p[0][1],p[1][1],p[2][1],1,1,1],a=adj(m),v=[0,1,2].map(i=>a[i*3]*p[3][0]+a[i*3+1]*p[3][1]+a[i*3+2]);return mul(m,[v[0],0,0,0,v[1],0,0,0,v[2]]);};
 const h=mul(basis(dst),adj(basis(src))),d=h[8];for(let i=0;i<9;i++)h[i]/=d;
 return 'matrix3d('+[h[0],h[3],0,h[6],h[1],h[4],0,h[7],0,0,1,0,h[2],h[5],0,h[8]].join(',')+')';
}
function fit(){for(const {img,screen,quad} of planes){if(!img.clientWidth)continue;const k=img.clientWidth/600;screen.style.transform=homography([[0,0],[480,0],[480,480],[0,480]],quad.map(([x,y])=>[img.offsetLeft+x*k,img.offsetTop+y*k]));}}
planes.forEach(p=>p.img.addEventListener('load',fit));new ResizeObserver(fit).observe(grid);fit();

// Only visible previews load, never autoplay audio, and respect reduced motion.
const reduced=matchMedia('(prefers-reduced-motion:reduce)'),previewButton=document.getElementById('preview-toggle');
let paused=reduced.matches;
const previews=[...document.querySelectorAll('video.screenvid')].map(video=>({video,visible:false}));
const allowed=p=>p.visible&&!paused&&!document.hidden;
function sync(){previewButton.textContent=paused?'Motion previews: off':'Motion previews: on';previewButton.setAttribute('aria-pressed',String(!paused));for(const p of previews){if(!allowed(p))p.video.pause();else {if(!p.video.getAttribute('src'))p.video.src=p.video.dataset.src;p.video.play().then(()=>{if(!allowed(p))p.video.pause();}).catch(()=>{});}}}
previewButton.hidden=false;previewButton.addEventListener('click',()=>{paused=!paused;sync();});
reduced.addEventListener('change',e=>{paused=e.matches;sync();});document.addEventListener('visibilitychange',sync);
const observer=new IntersectionObserver(entries=>{for(const e of entries){const p=previews.find(p=>p.video===e.target);p.visible=e.isIntersecting&&e.intersectionRatio>=.25;}sync();},{threshold:.25});previews.forEach(p=>observer.observe(p.video));sync();

let storage;try{storage=localStorage;}catch{}
function refreshCity(){
 const city=loadCity(storage),bar=document.querySelector('[data-city-return]'),intro=document.querySelector('[data-city-intro]');
 bar.hidden=!city.optedIn;intro.hidden=city.optedIn;
 if(!city.optedIn)return;
 const g=goalProgress(city,currentGoal(city,storage)),supplies=Object.values(wallet(city)).reduce((a,b)=>a+b,0);
 document.querySelector('[data-hub-title]').textContent=city.name+' · '+supplies+' supplies';
 document.querySelector('[data-hub-copy]').textContent='Next: '+g.name+' · '+g.text+(g.ready?' · Ready to build':'');
 document.querySelector('[data-hub-cta]').textContent=g.ready?'Build in your city →':'Continue city →';
}
refreshCity();window.addEventListener('pageshow',refreshCity);window.addEventListener('focus',refreshCity);window.addEventListener('storage',e=>{if([KEY,GOAL_KEY].includes(e.key))refreshCity();});
// Keep existing shared links working after consolidating the old two launchers.
if(['#arcade','#play'].includes(location.hash)){document.getElementById('library').scrollIntoView({behavior:'instant'});}
else if(location.hash.startsWith('#game-'))document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'instant'});
