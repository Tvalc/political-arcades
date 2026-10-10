export function padDirection(dx,dy,deadZone=14){
 if(Math.hypot(dx,dy)<deadZone)return null;
 return Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up';
}
export function mountDpad(pad,{onTurn,enabled,focus}){
 let pointer=null,lastDirection=null;
 const buttons=[...pad.querySelectorAll('[data-dir]')];
 function highlight(dir){buttons.forEach(b=>b.classList.toggle('pressed',b.dataset.dir===dir));}
 function steer(dir){highlight(dir);if(dir&&dir!==lastDirection&&enabled()){onTurn(dir);focus();}lastDirection=dir;}
 function direction(e){const r=pad.getBoundingClientRect();return padDirection(e.clientX-r.left-r.width/2,e.clientY-r.top-r.height/2);}
 function release(){pointer=null;lastDirection=null;highlight(null);}
 pad.addEventListener('pointerdown',e=>{if(pointer!==null||!enabled()||e.button!==0)return;e.preventDefault();pointer=e.pointerId;pad.setPointerCapture(pointer);steer(e.target.closest('[data-dir]')?.dataset.dir||direction(e));});
 pad.addEventListener('pointermove',e=>{if(e.pointerId!==pointer)return;e.preventDefault();steer(direction(e));});
 pad.addEventListener('pointerup',e=>{if(e.pointerId===pointer){if(pad.hasPointerCapture(pointer))pad.releasePointerCapture(pointer);release();}});
 pad.addEventListener('pointercancel',release);pad.addEventListener('lostpointercapture',release);
 buttons.forEach(b=>b.addEventListener('click',e=>{if(e.detail===0&&enabled()){onTurn(b.dataset.dir);focus();}}));
 window.addEventListener('blur',release);document.addEventListener('visibilitychange',()=>{if(document.hidden)release();});
}
