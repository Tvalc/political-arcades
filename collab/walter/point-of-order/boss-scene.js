(()=>{'use strict';const canvas=document.getElementById('arena'),c=canvas.getContext('2d');let state=null,eventAt=0,previous=null,started=false;
const ink='#16232e',cream='#fff2ce';
function box(x,y,w,h,color,r=8){c.fillStyle=color;c.strokeStyle=ink;c.lineWidth=4;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();c.stroke();}
function ellipse(x,y,rx,ry,color){c.fillStyle=color;c.strokeStyle=ink;c.lineWidth=4;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();c.stroke();}
function line(x,y,a,b,color=ink,width=5){c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(a,b);c.stroke();}
function text(s,x,y,size=22,color=ink){c.font=`900 ${size}px system-ui`;c.textAlign='center';c.fillStyle=color;c.fillText(s,x,y);}
function prop(type,t){c.save();c.translate(675,215+Math.sin(t*3)*3);c.rotate(Math.sin(t*2)*.04);
 if(type==='clock'){ellipse(0,0,43,43,'#ffd34d');line(0,0,0,-28);line(0,0,22,0);text('1842',0,66,19,cream);}
 if(type==='book'){box(-50,-40,100,84,cream);line(0,-40,0,44);text('CON',-25,-5,14);text('TEXT',25,20,14);}
 if(type==='map'){box(-67,-40,134,95,'#a7e2d8');line(-45,-22,35,30,'#fa7767',6);line(35,30,8,40,'#fa7767',6);text('NOT HERE',0,78,17,cream);}
 if(type==='flag'){line(-40,-58,-40,80);box(-39,-58,95,60,'#f17a79');text('TRADITION',6,-21,12);}
 if(type==='forms'){for(let i=0;i<4;i++)box(-60+i*4,20-i*17,105,25,cream,2);box(-23,-55,48,35,'#f17a79');line(0,-55,0,-76);}
 if(type==='phone'){box(-29,-55,58,105,'#4858a5');box(-20,-40,40,65,'#b4e7e7',3);text('INTERN',0,7,10);}
 c.restore();}
function draw(now){if(!state)return;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const s=state,t=reduced?0:now/1000,age=(now-eventAt)/1000,phase=ShameBoss.stage(s),hit=s.last?.hit&&(s.phase==='result'||s.phase==='won'),lost=s.phase==='lost',won=s.phase==='won';c.clearRect(0,0,1000,450);c.fillStyle='#233d65';c.fillRect(0,0,1000,450);
 for(let x=0;x<1000;x+=50){c.fillStyle=x%100?'#29456e':'#264167';c.fillRect(x,0,25,450);}box(325,18,350,52,'#ffdc62');text('BOARD OF SELECTIVE CONCERN',500,51,19);text('EVERYONE IS WELCOME TO AGREE',500,90,12,'#b5cee1');
 c.fillStyle='#1a2a43';c.fillRect(0,330,1000,120);
 const bounce=reduced?0:Math.sin(t*2.8)*3;const shake=hit&&age<.45&&!reduced?Math.sin(age*80)*12*(1-age/.45):0;
 c.save();c.translate(shake,0);
 // Chair shrinks with shame; the final vote ejects the chair and its occupant.
 c.save();if(won){const p=reduced?1:Math.min(1,age/1.4);c.translate(p*750,-p*p*700);c.rotate(p*2);}c.translate(500,310+bounce);c.scale(1-phase*.08,1-phase*.08);box(-95,-170,190,235,'#b34b69',30);box(-70,-10,140,85,'#cc6f8b',10);line(-60,75,-75,107);line(60,75,75,107);
 box(-92,-105,184,155,'#566797',35);c.fillStyle=cream;c.beginPath();c.moveTo(-40,-95);c.lineTo(0,-10);c.lineTo(40,-95);c.fill();c.fillStyle='#fa6b73';c.beginPath();c.moveTo(0,-75);c.lineTo(15,-15);c.lineTo(0,14);c.lineTo(-15,-15);c.fill();
 c.save();c.translate(0,-145);if(hit&&age<.5&&!reduced)c.rotate(Math.sin(age*40)*.13);ellipse(0,0,70,72,phase===2?'#f49b87':'#efbd94');ellipse(-70,5,12,18,'#efbd94');ellipse(70,5,12,18,'#efbd94');
 c.save();c.translate(phase===2?20:0,phase===2?-24:0);c.rotate(phase===2?.35:0);ellipse(0,-60,65,22,'#d6cec0');c.restore();
 line(-44,-17,-17,phase?-25:-16);line(17,phase?-25:-16,44,-17);ellipse(-28,-5,4,6,ink);ellipse(28,-5,4,6,ink);ellipse(0,15,13,9,'#e6a57c');if(phase===0){line(-25,35,20,40);}else{ellipse(0,40,phase===2?22:15,phase===2?18:9,ink);}if(phase>0){for(let i=0;i<phase+1;i++)ellipse(55+i*9,12+Math.sin(t*4+i)*9,3,7,'#9bdce9');}c.restore();
 line(-75,-64,-130,-30,'#efbd94',20);line(75,-64,130,-90+Math.sin(t*3)*8,'#efbd94',20);ellipse(130,-90+Math.sin(t*3)*8,14,14,'#efbd94');c.restore();
 if(!won&&s.phase==='predict')prop(ShameBoss.excuses[s.encounter.target].prop,t);
 box(180,310,640,80,'#b77d54');box(175,300,650,22,'#e4b57a');box(350,334,300,35,'#ffe8a2');text('CHAIRMAN DOUBLEDOWN',500,358,17);
 for(let i=0;i<s.burned.length;i++){box(205+i*26,280-i*13,70,15,cream,2);text('VOID',239+i*26,291-i*13,10,'#b34752');}
 for(let i=0;i<9;i++){const x=95+i*100,jump=hit&&!reduced?Math.max(0,Math.sin(age*9+i))*10:0;ellipse(x,433-jump,26,31,['#bce5db','#eac49c','#b0b9ed'][i%3]);}
 c.restore();
 if(hit&&age<1.7){c.save();c.translate(500,165-(reduced?0:Math.min(age,1)*55));c.rotate(-.08);text('-'+s.last.damage+' SHAME',0,0,52,'#ffdc62');c.restore();}
 if(won){if(age>.8||reduced){box(260,115,480,102,'#ffdc62',4);text('VOTED OUT',500,181,58);for(let i=0;i<32&&!reduced;i++){c.fillStyle=['#ffdc62','#fa839c','#8ce5c7'][i%3];c.fillRect((i*73+Math.sin(t+i)*25)%1000,(t*100+i*31)%450,8,14);}}}
 if(lost){box(290,140,420,85,'#f78c91');text('MIC CUT',500,197,47);}
 requestAnimationFrame(draw);
 }
 window.ShameScene={update(s){if(previous!==s.phase){eventAt=performance.now();previous=s.phase;}state=s;if(!started){started=true;requestAnimationFrame(draw);}}};
})();
