function triFit(w,margin=105){
 const pts=[w.A,w.B,w.C,w.M,w.N,w.P,w.G,w.O].filter(Boolean),xs=pts.map(z=>z.x),ys=pts.map(z=>z.y);
 let minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);let dx=Math.max(1e-6,maxX-minX),dy=Math.max(1e-6,maxY-minY);
 const sc=Math.min((W-2*margin)/dx,(H-2*margin)/dy),cx=(minX+maxX)/2,cy=(minY+maxY)/2;
 const map=z=>({x:W/2+(z.x-cx)*sc,y:H/2-(z.y-cy)*sc});
 const z={world:w,scale:sc,map}; ['A','B','C','M','N','P','G','O'].forEach(k=>{if(w[k])z[k]=map(w[k])});
 z.alts=(w.alts||[]).map(map);return z;
}
function tprep(p){const w=triWorld(p);triGeom=w?triFit(w):null;return triGeom}
function twLine(P,Q,cls='help',dash=false){return line(triGeom.map(P),triGeom.map(Q),cls,dash)}
function twCircle(Cc,r,cls='help',dash=false){const c=triGeom.map(Cc);return circle(c,r*triGeom.scale,cls,dash)}
function twPt(P,n,cls='given'){return pt(triGeom.map(P),n,cls)}
function twRay(P,ang,cls='help'){let L=50/Math.max(triGeom.scale,1),Q={x:P.x+L*Math.cos(ang),y:P.y+L*Math.sin(ang)};return twLine(P,Q,cls,true)}
function twHLine(y,cls='help'){let L=50/Math.max(triGeom.scale,1);return twLine({x:triGeom.world.A.x-L,y},{x:triGeom.world.A.x+L,y},cls,true)}
function triAngleArc(P,Q,Rr,cls='final',rad=38){
 const p=triGeom.map(P),q=triGeom.map(Q),r=triGeom.map(Rr);let a1=Math.atan2(q.y-p.y,q.x-p.x),a2=Math.atan2(r.y-p.y,r.x-p.x);while(a2-a1>Math.PI)a2-=2*Math.PI;while(a2-a1<-Math.PI)a2+=2*Math.PI;return arcPath(p.x,p.y,rad,a1,a2,cls);
}
function triEdges(g,cls='final'){return [line(g.A,g.B,cls),line(g.B,g.C,cls),line(g.C,g.A,cls)]}
function triSketch(p){
 const g=tprep(p); if(!g)return svg([]); const w=g.world,q=[]; let knownSides=[];
 const id=p.id;
 if(['sss'].includes(id))knownSides=['AB','BC','CA'];
 else if(id==='sus')knownSides=['AB','CA']; else if(id==='usu')knownSides=['BC']; else if(id==='ssu')knownSides=['BC','CA'];
 else if(id==='abva')knownSides=['BC','CA']; else if(id==='acva')knownSides=['BC','AB']; else if(id==='ab-ta')knownSides=['BC','CA'];
 else if(id.startsWith('a-'))knownSides=['BC']; else if(id.startsWith('b-'))knownSides=['CA'];
 else if(id==='R-ab')knownSides=['BC','CA']; else if(id==='R-angles'||id==='r-angles')knownSides=[]; else if(id==='r-a-beta'||id==='R-a-va')knownSides=['BC'];
 else if(id==='bc-va'||id==='bc-ta')knownSides=['AB','CA'];
 const seg={AB:[g.A,g.B],BC:[g.B,g.C],CA:[g.C,g.A]};Object.keys(seg).forEach(k=>q.push(line(...seg[k],knownSides.includes(k)?'final':'given')));
 q.push(pt(g.A,'A'),pt(g.B,'B'),pt(g.C,'C'));
 if(/va|vₐ|Height|height|bc-va/.test(id+p.diagram)){let H={x:w.A.x,y:0};q.push(twLine(w.A,H,'final'),rightMark(triGeom.map(H),14,'final','ur'));}
 if(/ta|tₐ|MedianA|Median|median|3tez|twoSidesMedian/.test(id+p.diagram) && id!=='a-tb-tc'){q.push(twLine(w.A,w.M,'final'));q.push(twPt(w.M,'M'));}
 if(id==='a-tb-tc'){q.push(twLine(w.B,w.N,'final'),twLine(w.C,w.P,'final'));}
 if(id==='a-ta-tb'){q.push(twLine(w.A,w.M,'final'),twLine(w.B,w.N,'final'));}
 if(id==='3tez'){q.push(twLine(w.A,w.M,'final'),twLine(w.B,w.N,'final'),twLine(w.C,w.P,'final'));}
 if(id==='R-ab'||id==='R-angles'||id==='R-a-va'){let cc=tcircum(w.A,w.B,w.C);if(cc)q.unshift(twCircle(cc.O,cc.R,'help',true));}
 if(id==='r-angles'||id==='r-a-beta'){let I=tincenter(w.A,w.B,w.C),r0=2*Math.abs((w.B.x-w.A.x)*(w.A.y-I.y)-(w.A.x-I.x)*(w.B.y-w.A.y))/Math.max(1e-9,2*tdist(w.A,w.B));q.unshift(twCircle(I,r0,'help',true));}
 return svg(q);
}
