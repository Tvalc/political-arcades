export const SHAPES = [
 [[1,1,1,1]], [[1,1],[1,1]], [[0,1,0],[1,1,1]],
 [[0,1,1],[1,1,0]], [[1,1,0],[0,1,1]], [[1,0,0],[1,1,1]], [[0,0,1],[1,1,1]]
];
export function createGame(rng=Math.random){
 const g={rng,board:Array.from({length:20},()=>Array(10).fill(0)),bag:[],next:null,piece:null,lines:0,homes:0,score:0,status:'playing',crew:0};
 g.next=take(g);spawn(g);return g;
}
function take(g){if(!g.bag.length){g.bag=[0,1,2,3,4,5,6];for(let i=6;i>0;i--){const j=Math.floor(g.rng()*(i+1));[g.bag[i],g.bag[j]]=[g.bag[j],g.bag[i]];}}return g.bag.pop();}
function spawn(g){const id=g.next;g.next=take(g);g.piece={id,matrix:SHAPES[id].map(row=>[...row]),x:Math.floor((10-SHAPES[id][0].length)/2),y:0};if(!fits(g,g.piece.matrix,g.piece.x,g.piece.y))g.status='lost';}
export function fits(g,m,x,y){return m.every((row,dy)=>row.every((v,dx)=>!v||(x+dx>=0&&x+dx<10&&y+dy>=0&&y+dy<20&&!g.board[y+dy][x+dx])));}
export function move(g,dx,dy=0){if(g.status!=='playing')return false;const p=g.piece;if(!fits(g,p.matrix,p.x+dx,p.y+dy))return false;p.x+=dx;p.y+=dy;return true;}
export function rotate(g){if(g.status!=='playing')return false;const p=g.piece,m=p.matrix[0].map((_,x)=>p.matrix.map(row=>row[x]).reverse());for(const dx of [0,-1,1,-2,2,-3,3])if(fits(g,m,p.x+dx,p.y)){p.matrix=m;p.x+=dx;return true;}return false;}
export function ghostY(g){let y=g.piece.y;while(fits(g,g.piece.matrix,g.piece.x,y+1))y++;return y;}
export function drop(g){if(g.status!=='playing')return null;const y=ghostY(g);g.score+=(y-g.piece.y)*2;g.piece.y=y;return lock(g);}
export function tick(g){if(g.status!=='playing')return null;return move(g,0,1)?null:lock(g);}
function lock(g){const p=g.piece;for(let y=0;y<p.matrix.length;y++)for(let x=0;x<p.matrix[y].length;x++)if(p.matrix[y][x])g.board[p.y+y][p.x+x]=p.id+1;
 const cleared=g.board.filter(row=>row.every(Boolean)).length;
 if(cleared){g.board=g.board.filter(row=>!row.every(Boolean));while(g.board.length<20)g.board.unshift(Array(10).fill(0));g.lines+=cleared;g.homes+=cleared*10;g.score+=[0,100,300,500,800][cleared]*(1+Math.floor((g.lines-cleared)/10));}
 g.crew=(g.crew+1)%3;spawn(g);return{cleared,crew:g.crew,lost:g.status==='lost'};
}
