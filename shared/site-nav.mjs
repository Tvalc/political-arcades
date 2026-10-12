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

