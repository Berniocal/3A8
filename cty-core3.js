let geomMeta={};
function prepareGeometry(p){
 const w=worldShape(p);geomMeta={};
 if(!w)return;
 if(p.id==='cyclic-Rabc'){
   const R=nval(p,'R'),sc=220/R,O={x:400,y:300},map=z=>({x:O.x+z.x*sc,y:O.y-z.y*sc});
   Q.cyc={A:map(w.A),B:map(w.B),C:map(w.C),D:map(w.D)};geomMeta.circle={O,R:220,scale:sc};return;
 }
 const z=fitWorld(w);
 if(p.diagram.startsWith('square'))Q.sq=z;
 else if(p.diagram.startsWith('rect'))Q.rec=z;
 else if(p.diagram.startsWith('para'))Q.par=z;
 else if(p.diagram.startsWith('rhomb'))Q.rho=z;
 else if(p.diagram.startsWith('isoTrap'))Q.iso=z;
 else if(p.diagram==='rightTrap'||p.diagram==='rightTrapEFGH')Q.rtrap=z;
 else if(p.diagram.startsWith('trap'))Q.trap=z;
 else if(p.diagram.startsWith('kite'))Q.kite=z;
 else if(p.diagram.startsWith('quad'))Q.quad=z;
}

function edges(q,k){return [line(q.A,q.B,k),line(q.B,q.C,k),line(q.C,q.D,k),line(q.D,q.A,k)]}function points(q){return [pt(q.A,'A'),pt(q.B,'B'),pt(q.C,'C'),pt(q.D,'D')]}
function shape(diagram){if(diagram.startsWith('square'))return Q.sq;if(diagram.startsWith('rect'))return Q.rec;if(diagram.startsWith('para'))return Q.par;if(diagram.startsWith('rhomb'))return Q.rho;if(diagram.startsWith('isoTrap'))return Q.iso;if(diagram==='rightTrap')return Q.rtrap;if(diagram==='cyclic')return Q.cyc;if(diagram.startsWith('trap'))return Q.trap;if(diagram.startsWith('kite'))return Q.kite;if(diagram.startsWith('quad'))return Q.quad;return Q.quad}