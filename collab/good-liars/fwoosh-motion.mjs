/* Adapted from Tvalc/fwoosh 86740a7f0189b9686789e8d03b12ac914c335f70.
 * js/constants.js, js/input.js:lungeDir, js/sim.js:step player movement.
 * Original fixed step, heading, three rechargeable bursts, burst deceleration,
 * commitment queue and boundary bounce. Isolated from Fwoosh's saves and canon.
 */
export const W=720,H=1280,DT=1/120;
export const K={RUN:170,FRANTIC_SPD:.55,AUTO_TURN:3.2,LUNGE_SPD:640,LUNGE_T:.18,DASH_CD:.12,CHARGES:3,CHARGE_REFILL:.9,EDGE:100,HP_DRAIN:.035,HP_REGEN:.04,VENT_PURGE:.4};
export function body(x=360,y=970){return{x,y,hx:0,hy:-1,spd:K.RUN,lunge:0,dashCd:0,charges:3,chargeT:0,hp:1,ventUnit:0,ventDash:null,venting:false,knockT:0,hurtCd:0,prevX:x,prevY:y}}
export function burst(p,dx,dy){const m=Math.hypot(dx,dy);if(m<.0001||p.charges<=0||p.dashCd>0)return false;if(p.ventUnit>0){p.ventDash=[dx/m,dy/m];return false}p.hx=dx/m;p.hy=dy/m;p.lunge=K.LUNGE_T;p.charges--;p.dashCd=K.DASH_CD;p.venting=false;return true}
export function motion(p,dt,steer,aim){p.prevX=p.x;p.prevY=p.y;p.dashCd=Math.max(0,p.dashCd-dt);p.hurtCd=Math.max(0,p.hurtCd-dt);p.knockT=Math.max(0,p.knockT-dt);if(p.charges<K.CHARGES){p.chargeT+=dt;while(p.chargeT>=K.CHARGE_REFILL&&p.charges<K.CHARGES){p.chargeT-=K.CHARGE_REFILL;p.charges++}}else p.chargeT=0;
 if(p.lunge<=0&&p.knockT<=0){if(steer){p.hx=steer[0];p.hy=steer[1]}else if(aim){const a=Math.atan2(p.hy,p.hx),b=Math.atan2(aim.y-p.y,aim.x-p.x);let diff=Math.atan2(Math.sin(b-a),Math.cos(b-a));diff=Math.max(-K.AUTO_TURN*dt,Math.min(K.AUTO_TURN*dt,diff));p.hx=Math.cos(a+diff);p.hy=Math.sin(a+diff)}}
 if(p.knockT>0)p.spd=520;else if(p.lunge>0){p.lunge=Math.max(0,p.lunge-dt);p.spd=K.LUNGE_SPD}else{const run=K.RUN*(1+(1-p.hp)*K.FRANTIC_SPD);p.spd=p.spd>run?Math.max(run,p.spd-1600*dt):run}if(p.venting)p.spd=0;
 p.x+=p.hx*p.spd*dt;p.y+=p.hy*p.spd*dt;if(p.x<K.EDGE){p.x=K.EDGE;p.hx=Math.abs(p.hx);p.knockT=0}if(p.x>W-K.EDGE){p.x=W-K.EDGE;p.hx=-Math.abs(p.hx);p.knockT=0}if(p.y<220){p.y=220;p.hy=Math.abs(p.hy);p.knockT=0}if(p.y>H-120){p.y=H-120;p.hy=-Math.abs(p.hy);p.knockT=0}}
export function separation(a,b){return Math.hypot(a.x-b.x,a.y-b.y)}
