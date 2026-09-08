function triStep(p,s){
 const g=tprep(p);if(!g)return svg([]);const w=g.world,id=p.id,st=Math.min(s,p.steps.length-1),q=[];
 const A=w.A,B=w.B,C=w.C,M=w.M,N=w.N,P=w.P;
 const finish=()=>q.push(...triEdges(g,'final'));
 if(id==='sss'){q.push(twLine(B,C,'given'),twPt(B,'B'),twPt(C,'C'));if(st>=1)q.push(twCircle(B,tdist(A,B),'help'));if(st>=2)q.push(twCircle(C,tdist(A,C),'help'));if(st>=3)q.push(twPt(A,'A','final'));if(st>=4)finish();return svg(q)}
 if(id==='sus'){q.push(twLine(A,B,'given'),twPt(A,'A'),twPt(B,'B'));if(st>=1)q.push(twRay(A,Math.atan2(C.y-A.y,C.x-A.x),'help'),triAngleArc(A,B,C,'help'));if(st>=2)q.push(twLine(A,C,'given'),twPt(C,'C','final'));if(st>=3)finish();return svg(q)}
 if(id==='usu'){q.push(twLine(B,C,'given'),twPt(B,'B'),twPt(C,'C'));if(st>=1)q.push(twRay(B,Math.atan2(A.y-B.y,A.x-B.x),'help'));if(st>=2)q.push(twRay(C,Math.atan2(A.y-C.y,A.x-C.x),'help'));if(st>=3)q.push(twPt(A,'A','final'));if(st>=4)finish();return svg(q)}
 if(id==='ssu'){q.push(twLine(A,C,'given'),twPt(A,'A'),twPt(C,'C'));if(st>=1)q.push(twRay(A,Math.atan2(B.y-A.y,B.x-A.x),'help'));if(st>=2)q.push(twCircle(C,triVal(p,'a'),'help'));if(st>=3)(w.alts||[]).forEach((z,i)=>q.push(twPt(z,'B'+(w.alts.length>1?'₍'+(i+1)+'₎':''),'final')));if(st>=4){(w.alts||[B]).forEach(z=>q.push(twLine(A,z,'final'),twLine(z,C,'final')))}return svg(q)}
 if(id==='abva'||id==='acva'){q.push(twLine(B,C,'given'),twPt(B,'B'),twPt(C,'C'));if(st>=1)q.push(twHLine(triVal(p,'v_a'),'help'));if(st>=2)q.push(twCircle(id==='abva'?C:B,id==='abva'?triVal(p,'b'):triVal(p,'c'),'help'));if(st>=3)q.push(twPt(A,'A','final'));if(st>=4)finish();return svg(q)}
 if(id==='ab-ta'){q.push(twLine(B,C,'given'),twPt(B,'B'),twPt(C,'C'));if(st>=1)q.push(twPt(M,'M'));if(st>=2)q.push(twCircle(M,triVal(p,'t_a'),'help'));if(st>=3)q.push(twCircle(C,triVal(p,'b'),'help'));if(st>=4){q.push(twPt(A,'A','final'));finish()}return svg(q)}
 if(id==='a-beta-va'){q.push(twLine(B,C,'given'),twPt(B,'B'),twPt(C,'C'));if(st>=1)q.push(twRay(B,Math.atan2(A.y-B.y,A.x-B.x),'help'));if(st>=2)q.push(twHLine(triVal(p,'v_a'),'help'));if(st>=3)q.push(twPt(A,'A','final'));if(st>=4)finish();return svg(q)}
 if(id==='a-alpha-va'){let cc=tcircum(A,B,C);q.push(twLine(B,C,'given'),twPt(B,'B'),twPt(C,'C'));if(st>=1&&cc)q.push(twCircle(cc.O,cc.R,'help',true));if(st>=2)q.push(twHLine(triVal(p,'v_a'),'help'));if(st>=3)q.push(twPt(A,'A','final'));if(st>=4)finish();return svg(q)}
 if(id==='b-alpha-va'||id==='b-beta-va'||id==='b-va-ta'||id==='b-va-tb'||id==='b-va-tc'){
   let H={x:A.x,y:0},S0=tmid(A,C);q.push(twLine(A,C,'given'),twPt(A,'A'),twPt(C,'C'));
   if(st>=1)q.push(twCircle(A,triVal(p,'v_a'),'help',true));
   if(st>=2)q.push(twCircle(S0,tdist(A,C)/2,'help',true),twPt(H,'H'),twLine(C,H,'help'));
   if(id==='b-alpha-va'&&st>=3)q.push(twRay(A,Math.atan2(B.y-A.y,B.x-A.x),'help'));
   if(id==='b-beta-va'&&st>=3)q.push(twLine(A,B,'help'),triAngleArc(B,A,C,'help'));
   if(id==='b-va-ta'&&st>=2)q.push(twCircle(A,triVal(p,'t_a'),'help',true),twPt(M,'M','final'));
   if(id==='b-va-tb'&&st>=2)q.push(twCircle(N,triVal(p,'t_b'),'help',true),twPt(N,'N'));
   if(id==='b-va-tc'&&st>=2)q.push(twLine(N,P,'help',true));if(id==='b-va-tc'&&st>=3)q.push(twCircle(C,triVal(p,'t_c'),'help',true),twPt(P,'P','final'));
   if(st>=p.steps.length-2)q.push(twPt(B,'B','final'));if(st>=p.steps.length-1)finish();return svg(q);
 }
 if(id==='a-beta-ta'){q.push(twLine(B,C,'given'),twPt(B,'B'),twPt(C,'C'),twPt(M,'M'));if(st>=1)q.push(twRay(B,Math.atan2(A.y-B.y,A.x-B.x),'help'));if(st>=2)q.push(twCircle(M,triVal(p,'t_a'),'help'));if(st>=3)q.push(twPt(A,'A','final'));if(st>=4)finish();return svg(q)}
 if(id==='a-alpha-ta'){let cc=tcircum(A,B,C);q.push(twLine(B,C,'given'),twPt(B,'B'),twPt(C,'C'),twPt(M,'M'));if(st>=1&&cc)q.push(twCircle(cc.O,cc.R,'help',true));if(st>=2)q.push(twCircle(M,triVal(p,'t_a'),'help'));if(st>=3)q.push(twPt(A,'A','final'));if(st>=4)finish();return svg(q)}
 if(id==='b-alpha-ta'){q.push(twLine(A,C,'given'),twPt(A,'A'),twPt(C,'C'));if(st>=0)q.push(twRay(A,Math.atan2(B.y-A.y,B.x-A.x),'help'));if(st>=1)q.push(twPt(N,'N'));if(st>=2)q.push(twLine(N,M,'help',true));if(st>=3)q.push(twCircle(A,triVal(p,'t_a'),'help'),twPt(M,'M','final'));if(st>=4){q.push(twPt(B,'B','final'));finish()}return svg(q)}
 if(id==='b-beta-ta'){let cc=tcircum(A,B,C),Cp={x:-triVal(p,'b'),y:0};q.push(twLine(A,C,'given'),twPt(A,'A'),twPt(C,'C'));if(st>=1&&cc)q.push(twCircle(cc.O,cc.R,'help',true));if(st>=2)q.push(twPt(Cp,'C′'),twCircle(Cp,2*triVal(p,'t_a'),'help',true));if(st>=3)q.push(twPt(B,'B','final'));if(st>=4)finish();return svg(q)}
 if(id==='b-gamma-ta'){q.push(twLine(A,C,'given'),twPt(A,'A'),twPt(C,'C'));if(st>=1)q.push(twRay(C,Math.atan2(B.y-C.y,B.x-C.x),'help'));if(st>=2)q.push(twCircle(A,triVal(p,'t_a'),'help'),twPt(M,'M','final'));if(st>=3)q.push(twPt(B,'B','final'));if(st>=4)finish();return svg(q)}
 if(id==='a-va-ta'){q.push(twLine(B,C,'given'),twPt(B,'B'),twPt(C,'C'),twPt(M,'M'));if(st>=1)q.push(twHLine(triVal(p,'v_a'),'help'));if(st>=2)q.push(twCircle(M,triVal(p,'t_a'),'help'));if(st>=3)(w.alts||[A]).forEach((z,i)=>q.push(twPt(z,'A'+((w.alts||[]).length>1?'₍'+(i+1)+'₎':''),'final')));if(st>=4)(w.alts||[A]).forEach(z=>q.push(twLine(z,B,'final'),twLine(z,C,'final')));return svg(q)}
 if(id==='a-va-tb'){q.push(twLine(B,C,'given'),twPt(B,'B'),twPt(C,'C'));if(st>=1)q.push(twHLine(triVal(p,'v_a')/2,'help'));if(st>=2)q.push(twCircle(B,triVal(p,'t_b'),'help'),twPt(N,'N','final'));if(st>=3)q.push(twPt(A,'A','final'));if(st>=4)finish();return svg(q)}
 if(id==='a-tb-tc'){q.push(twLine(B,C,'given'),twPt(B,'B'),twPt(C,'C'));if(st>=1)q.push(twCircle(B,2*triVal(p,'t_b')/3,'help'),twCircle(C,2*triVal(p,'t_c')/3,'help'));if(st>=2)q.push(twPt(w.G,'G','final'));if(st>=3)q.push(twPt(M,'M'));if(st>=4)q.push(twLine(M,A,'help',true),twPt(A,'A','final'));if(st>=5)finish();return svg(q)}
 if(id==='a-ta-tb'){q.push(twLine(B,C,'given'),twPt(B,'B'),twPt(C,'C'),twPt(M,'M'));if(st>=1)q.push(twPt(w.P,'P'));if(st>=2)q.push(twCircle(w.P,triVal(p,'t_a')/2,'help'));if(st>=3)q.push(twCircle(B,triVal(p,'t_b'),'help'),twPt(N,'N','final'));if(st>=4)q.push(twPt(A,'A','final'));if(st>=5)finish();return svg(q)}
 if(id==='3tez'){let S0=tmid(A,B),T0={x:S0.x+(C.x-S0.x)/3,y:S0.y+(C.y-S0.y)/3},Tp0={x:2*S0.x-T0.x,y:2*S0.y-T0.y};q.push(twLine(C,S0,'given'),twPt(C,'C'),twPt(S0,'S'));if(st>=1)q.push(twPt(T0,'T'),twPt(Tp0,'T′'),twLine(C,Tp0,'help',true));if(st>=2)q.push(twCircle(T0,2*triVal(p,'t_b')/3,'help'));if(st>=3)q.push(twCircle(Tp0,2*triVal(p,'t_a')/3,'help'));if(st>=4)q.push(twPt(B,'B','final'),twPt(A,'A','final'));if(st>=5)finish();return svg(q)}
 if(id==='R-ab'||id==='R-angles'||id==='R-a-va'){let cc=tcircum(A,B,C);if(cc)q.push(twCircle(cc.O,cc.R,'given'));if(st>=1){q.push(twLine(B,C,'given'),twPt(B,'B'),twPt(C,'C'))}if(id==='R-ab'&&st>=2)q.push(twCircle(C,triVal(p,'b'),'help'));if(id==='R-angles'&&st>=2&&cc)q.push(twPt(cc.O,'O'),twLine(cc.O,A,'help'),twLine(cc.O,B,'help'),twLine(cc.O,C,'help'));if(id==='R-a-va'&&st>=2)q.push(twHLine(triVal(p,'v_a'),'help'));if(st>=3)q.push(twPt(A,'A','final'));if(st>=p.steps.length-1)finish();return svg(q)}
 if(id==='r-angles'||id==='r-a-beta'){let I=tincenter(A,B,C),rin=triVal(p,'r');q.push(twCircle(I,rin,'given'),twPt(I,'I'));if(st>=1&&id==='r-angles')q.push(txt(80,80,'α = 180° − β − γ'));if(st>=2||id==='r-a-beta')q.push(...triEdges(g,'help'));if(st>=p.steps.length-1)finish();return svg(q)}
 if(id==='bc-va'){let H={x:A.x,y:0};q.push(twPt(A,'A'));if(st>=1)q.push(twHLine(0,'help'));if(st>=2)q.push(twCircle(A,triVal(p,'c'),'help'),twPt(B,'B','final'));if(st>=3)q.push(twCircle(A,triVal(p,'b'),'help'),twPt(C,'C','final'));if(st>=4)finish();return svg(q)}
 if(id==='bc-ta'){let D={x:B.x+C.x-A.x,y:B.y+C.y-A.y};q.push(twLine(A,D,'given'),twPt(A,'A'),twPt(D,'D'));if(st>=1)q.push(twCircle(A,triVal(p,'c'),'help'),twCircle(D,triVal(p,'b'),'help'),twPt(B,'B','final'));if(st>=2)q.push(twPt(M,'M'),twLine(A,M,'help'));if(st>=3)q.push(twPt(C,'C','final'));if(st>=4)finish();return svg(q)}
 q.push(...triEdges(g,'final'),pt(g.A,'A'),pt(g.B,'B'),pt(g.C,'C'));return svg(q);
}
function draw(p,s){return triStep(p,s)}
function drawSketch(p){return triSketch(p)}
