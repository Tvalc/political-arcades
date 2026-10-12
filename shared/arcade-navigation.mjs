// A small shared menu supplements each game's existing controls, without intercepting them.
export function mountArcadeNavigation(){
 const host=document.querySelector('header');if(!host||document.querySelector('.arcade-site-menu'))return;
 const details=document.createElement('details');details.className='arcade-site-menu';
 const summary=document.createElement('summary');summary.textContent='Arcade menu';
 const nav=document.createElement('nav');nav.setAttribute('aria-label','AdsToAid navigation');
 for(const [name,href] of [['All games','/#library'],['My city','/city/'],['How giving works','/#how'],['Greatest Hits','/greatest-hits/'],['Watch, listen & read','/#more'],['Community Pot','/community-pot/']]){const a=document.createElement('a');a.textContent=name;a.href=href;nav.append(a);}
 details.append(summary,nav);host.classList.add('has-arcade-menu');host.append(details);
 // Menu keyboard input must not also shoot, drop a block, or move a player.
 details.addEventListener('keydown',e=>{if(['Enter',' ','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(e.key))e.stopPropagation();});
 details.addEventListener('toggle',()=>{if(!details.open)return;const pause=document.getElementById('pause-toggle')||document.getElementById('pause');if(pause&&!pause.disabled&&pause.getClientRects().length&&/^Pause\b/i.test(pause.textContent.trim()))pause.click();});
 const style=document.createElement('style');style.textContent='.has-arcade-menu{flex-wrap:wrap;gap:8px!important}.arcade-site-menu{position:relative;flex:none;margin:0 0 0 auto!important;z-index:100;font:600 14px/1.4 system-ui!important;color:#fff0d4}.arcade-site-menu>summary{display:flex;align-items:center;justify-content:center;min-height:44px;min-width:44px;padding:8px 12px;list-style:none;cursor:pointer;border:1px solid #8c7c9e;border-radius:8px;background:#211929;color:#fff0d4;white-space:nowrap}.arcade-site-menu>summary::-webkit-details-marker{display:none}.arcade-site-menu>summary:after{content:"⌄";margin-left:8px}.arcade-site-menu>nav{position:absolute;right:0;top:calc(100% + 6px);display:grid;gap:0;width:230px;max-width:calc(100vw - 32px);padding:8px;background:#17121f;border:1px solid #685876;border-radius:10px;box-shadow:0 14px 24px #0009;text-align:left}.arcade-site-menu>nav>a{display:flex;align-items:center;min-height:44px;padding:10px!important;border-radius:6px;font:600 14px/1.4 system-ui!important;text-decoration:none;color:#fff0d4!important;background:none!important;white-space:normal}.arcade-site-menu>nav>a:hover{background:#30243e!important}.arcade-site-menu :focus-visible{outline:3px solid #ffdb74;outline-offset:2px}';document.head.append(style);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&details.open){e.stopPropagation();details.open=false;summary.focus();}},true);
 document.addEventListener('click',e=>{if(e.isTrusted&&!details.contains(e.target))details.open=false;});
 details.addEventListener('focusout',e=>{if(e.relatedTarget&&!details.contains(e.relatedTarget))details.open=false;});
}
mountArcadeNavigation();
