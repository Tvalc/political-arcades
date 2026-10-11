const META={"boy": {"body": 172, "frames": [{"x": 59, "y": 12, "w": 74, "h": 172, "ax": 37.0, "ay": 172}, {"x": 248, "y": 13, "w": 80, "h": 171, "ax": 40.0, "ay": 171}, {"x": 437, "y": 13, "w": 85, "h": 171, "ax": 42.5, "ay": 171}, {"x": 629, "y": 12, "w": 86, "h": 172, "ax": 43.0, "ay": 172}]}, "girl": {"body": 172, "frames": [{"x": 65, "y": 204, "w": 61, "h": 172, "ax": 30.5, "ay": 172}, {"x": 247, "y": 204, "w": 82, "h": 172, "ax": 41.0, "ay": 172}, {"x": 439, "y": 205, "w": 82, "h": 171, "ax": 41.0, "ay": 171}, {"x": 637, "y": 203, "w": 70, "h": 173, "ax": 35.0, "ay": 173}]}, "parent": {"body": 172, "frames": [{"x": 63, "y": 396, "w": 66, "h": 172, "ax": 33.0, "ay": 172}, {"x": 244, "y": 395, "w": 87, "h": 173, "ax": 43.5, "ay": 173}, {"x": 435, "y": 395, "w": 90, "h": 173, "ax": 45.0, "ay": 173}, {"x": 632, "y": 395, "w": 80, "h": 173, "ax": 40.0, "ay": 173}]}, "provider": {"body": 172, "frames": [{"x": 68, "y": 588, "w": 55, "h": 172, "ax": 27.5, "ay": 172}, {"x": 246, "y": 589, "w": 84, "h": 171, "ax": 42.0, "ay": 171}, {"x": 433, "y": 589, "w": 93, "h": 171, "ax": 46.5, "ay": 171}, {"x": 620, "y": 612, "w": 104, "h": 148, "ax": 52.0, "ay": 148}]}};
const atlas=new Image();atlas.src=new URL('./families-v7.webp',import.meta.url).href;
export const peopleReady=atlas.decode();
export function drawPerson(c,name,x,feet,{height=40,state='idle',phase=0,flip=false}={}){
 if(!atlas.complete||!atlas.naturalWidth)return false;
 const m=META[name],cycle=((phase*3.5)%1+1)%1;
 // Neutral pose separates the two Makko stride poses; no scaling or hovering.
 const frame=state==='activity'?3:state==='walk'?(cycle<.25?1:cycle<.5?0:cycle<.75?2:0):0,f=m.frames[frame],s=height/m.body;
 c.save();c.translate(x,feet);if(flip)c.scale(-1,1);c.drawImage(atlas,f.x,f.y,f.w,f.h,-f.ax*s,-f.ay*s,f.w*s,f.h*s);c.restore();return true;
}
