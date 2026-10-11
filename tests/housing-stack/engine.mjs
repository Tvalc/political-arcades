export const SHAPES = [
 [[1,1,1,1]], [[1,1],[1,1]], [[0,1,0],[1,1,1]],
 [[0,1,1],[1,1,0]], [[1,1,0],[0,1,1]], [[1,0,0],[1,1,1]], [[0,0,1],[1,1,1]]
];
export function createGame(rng=Math.random){
 const g={rng,board:Array.from({length:20},()=>Array(10).fill(0)),bag:[],next:null,piece:null,lines:0,homes:0,score:0,status:'playing',crew:0,queue:[],held:null,canHold:true,lockMs:0,lockResets:0,combo:-1};
 g.queue=Array.from({length:4},()=>take(g));spawn(g);return g;
}
function take(g){if(!g.bag.length){g.bag=[0,1,2,3,4,5,6];for(let i=6;i>0;i--){const j=Math.floor(g.rng()*(i+1));[g.bag[i],g.bag[j]]=[g.bag[j],g.bag[i]];}}return g.bag.pop();}
function spawn(g,id=null){
 if(id===null){id=g.queue.shift();g.queue.push(take(g));}g.next=g.queue[0];
 g.piece={id,matrix:SHAPES[id].map(row=>[...row]),x:Math.floor((10-SHAPES[id][0].length)/2),y:0};
 g.lockMs=0;g.lockResets=0;
 if(!fits(g,g.piece.matrix,g.piece.x,g.piece.y))g.status='lost';
}
export function hold(g){
 if(g.status!=='playing'||!g.canHold)return null;
 const previous=g.held;g.held=g.piece.id;g.canHold=false;spawn(g,previous);
 return {held:true,lost:g.status==='lost'};
}
function resetLock(g){if(g.lockResets<12){g.lockMs=0;g.lockResets++;}}
export function grounded(g){const p=g.piece;return !fits(g,p.matrix,p.x,p.y+1);}
export function advanceLock(g,dt){
 if(g.status!=='playing')return null;
 if(!grounded(g)){g.lockMs=0;return null;}
 g.lockMs+=dt;return g.lockMs>=450?lock(g):null;
}
export function fits(g,m,x,y){return m.every((row,dy)=>row.every((v,dx)=>!v||(x+dx>=0&&x+dx<10&&y+dy>=0&&y+dy<20&&!g.board[y+dy][x+dx])));}
export function move(g,dx,dy=0){if(g.status!=='playing')return false;const p=g.piece;if(!fits(g,p.matrix,p.x+dx,p.y+dy))return false;const wasGrounded=grounded(g);p.x+=dx;p.y+=dy;if(dx&&wasGrounded)resetLock(g);return true;}
export function rotate(g){if(g.status!=='playing')return false;const p=g.piece,m=p.matrix[0].map((_,x)=>p.matrix.map(row=>row[x]).reverse());for(const dx of [0,-1,1,-2,2,-3,3])if(fits(g,m,p.x+dx,p.y)){const wasGrounded=grounded(g);p.matrix=m;p.x+=dx;if(wasGrounded)resetLock(g);return true;}return false;}
export function ghostY(g){let y=g.piece.y;while(fits(g,g.piece.matrix,g.piece.x,y+1))y++;return y;}
export function drop(g){if(g.status!=='playing')return null;const y=ghostY(g);g.score+=(y-g.piece.y)*2;g.piece.y=y;return lock(g);}
export function tick(g){if(g.status!=='playing')return null;move(g,0,1);return null;}
function lock(g){const p=g.piece;for(let y=0;y<p.matrix.length;y++)for(let x=0;x<p.matrix[y].length;x++)if(p.matrix[y][x])g.board[p.y+y][p.x+x]=p.id+1;
 const finishedRows=g.board.map((cells,y)=>({y,cells:[...cells]})).filter(row=>row.cells.every(Boolean));const cleared=finishedRows.length;
 if(cleared){g.board=g.board.filter(row=>!row.every(Boolean));while(g.board.length<20)g.board.unshift(Array(10).fill(0));g.lines+=cleared;g.homes+=cleared*10;g.score+=[0,100,300,500,800][cleared]*(1+Math.floor((g.lines-cleared)/10));}
 g.combo=cleared?g.combo+1:-1;const comboBonus=cleared?Math.max(0,g.combo)*50*(1+Math.floor(g.lines/10)):0;g.score+=comboBonus;g.canHold=true;g.crew=(g.crew+1)%3;spawn(g);return{cleared,finishedRows,combo:g.combo,comboBonus,crew:g.crew,lost:g.status==='lost'};
}
