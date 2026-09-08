function triNorm(s){
 return String(s ?? '')
  .replace(/t<sub>a<\/sub>/g,'t_a').replace(/t<sub>b<\/sub>/g,'t_b').replace(/t<sub>c<\/sub>/g,'t_c')
  .replace(/v<sub>a<\/sub>/g,'v_a').replace(/v<sub>b<\/sub>/g,'v_b').replace(/v<sub>c<\/sub>/g,'v_c')
  .replace(/tₐ/g,'t_a').replace(/tᵦ/g,'t_b').replace(/tᶜ/g,'t_c')
  .replace(/vₐ/g,'v_a').replace(/vᵦ/g,'v_b').replace(/vᶜ/g,'v_c');
}
function triVal(p,key){
 const src=triNorm(p.given);
 const esc=key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const m=src.match(new RegExp('(?:^|[,;]\\s*)'+esc+'\\s*=\\s*([0-9]+(?:,[0-9]+)?)'));
 return m?parseFloat(m[1].replace(',','.')):NaN;
}
function tdist(P,Q){return Math.hypot(P.x-Q.x,P.y-Q.y)}
function tmid(P,Q){return {x:(P.x+Q.x)/2,y:(P.y+Q.y)/2}}
function tints(C0,r0,C1,r1){
 const dx=C1.x-C0.x,dy=C1.y-C0.y,d=Math.hypot(dx,dy);
 if(!isFinite(d)||d<1e-9)return [];
 const aa=(r0*r0-r1*r1+d*d)/(2*d),h2=r0*r0-aa*aa;
 if(h2<-1e-8)return [];
 const h=Math.sqrt(Math.max(0,h2)),xm=C0.x+aa*dx/d,ym=C0.y+aa*dy/d;
 return [{x:xm+h*(-dy)/d,y:ym+h*dx/d},{x:xm-h*(-dy)/d,y:ym-h*dx/d}];
}
function trayCircle(P,ang,C,r){
 const u={x:Math.cos(ang),y:Math.sin(ang)},v={x:P.x-C.x,y:P.y-C.y};
 const bb=2*(v.x*u.x+v.y*u.y),cc=v.x*v.x+v.y*v.y-r*r,disc=bb*bb-4*cc;
 if(disc<-1e-9)return [];
 const sd=Math.sqrt(Math.max(0,disc));
 return [(-bb-sd)/2,(-bb+sd)/2].filter(t=>t>=-1e-9).map(t=>({x:P.x+t*u.x,y:P.y+t*u.y,t}));
}
function trayRay(P,a,Q,b){
 const u={x:Math.cos(a),y:Math.sin(a)},v={x:Math.cos(b),y:Math.sin(b)},den=u.x*v.y-u.y*v.x;
 if(Math.abs(den)<1e-9)return null;
 const t=((Q.x-P.x)*v.y-(Q.y-P.y)*v.x)/den;
 return {x:P.x+t*u.x,y:P.y+t*u.y,t};
}
function tcircum(A,B,C){
 const d=2*(A.x*(B.y-C.y)+B.x*(C.y-A.y)+C.x*(A.y-B.y));
 if(Math.abs(d)<1e-9)return null;
 const ux=((A.x*A.x+A.y*A.y)*(B.y-C.y)+(B.x*B.x+B.y*B.y)*(C.y-A.y)+(C.x*C.x+C.y*C.y)*(A.y-B.y))/d;
 const uy=((A.x*A.x+A.y*A.y)*(C.x-B.x)+(B.x*B.x+B.y*B.y)*(A.x-C.x)+(C.x*C.x+C.y*C.y)*(B.x-A.x))/d;
 const O={x:ux,y:uy};return {O,R:tdist(O,A)};
}
function tincenter(A,B,C){
 const a=tdist(B,C),b=tdist(A,C),c=tdist(A,B),s=a+b+c;
 return {x:(a*A.x+b*B.x+c*C.x)/s,y:(a*A.y+b*B.y+c*C.y)/s};
}
function chooseUpper(arr){return arr.slice().sort((u,v)=>v.y-u.y)[0]||null}
function chooseLeft(arr){return arr.slice().sort((u,v)=>u.x-v.x)[0]||null}
function triWorld(p){
 const id=p.id,pi=Math.PI;
 let a=triVal(p,'a'),b=triVal(p,'b'),c=triVal(p,'c'),va=triVal(p,'v_a'),ta=triVal(p,'t_a'),tb=triVal(p,'t_b'),tc=triVal(p,'t_c'),Rr=triVal(p,'R'),rr=triVal(p,'r');
 let A,B,C,M,N,P,G,S,T,Tp,H,O,alts=[];
 if(id==='sss'){B={x:0,y:0};C={x:a,y:0};let x=(c*c-b*b+a*a)/(2*a),y=Math.sqrt(Math.max(0,c*c-x*x));A={x,y};}
 else if(id==='sus'){let al=triVal(p,'α')*pi/180;A={x:0,y:0};B={x:c,y:0};C={x:b*Math.cos(al),y:b*Math.sin(al)};}
 else if(id==='usu'){let be=triVal(p,'β')*pi/180,ga=triVal(p,'γ')*pi/180;B={x:0,y:0};C={x:a,y:0};let X=trayRay(B,be,C,pi-ga);A=X||{x:a/2,y:a/2};}
 else if(id==='ssu'){let al=triVal(p,'α')*pi/180;A={x:0,y:0};C={x:b,y:0};alts=trayCircle(A,al,C,a);B=alts.slice().sort((u,v)=>v.t-u.t)[0]||alts[0];}
 else if(id==='abva'){B={x:0,y:0};C={x:a,y:0};A={x:a-Math.sqrt(Math.max(0,b*b-va*va)),y:va};}
 else if(id==='acva'){B={x:0,y:0};C={x:a,y:0};A={x:Math.sqrt(Math.max(0,c*c-va*va)),y:va};}
 else if(id==='ab-ta'){B={x:0,y:0};C={x:a,y:0};M=tmid(B,C);A=chooseUpper(tints(M,ta,C,b));}
 else if(id==='a-beta-va'){let be=triVal(p,'β')*pi/180;B={x:0,y:0};C={x:a,y:0};A={x:va/Math.tan(be),y:va};}
 else if(id==='a-alpha-va'){let al=triVal(p,'α')*pi/180;B={x:0,y:0};C={x:a,y:0};let Rc=a/(2*Math.sin(al)),d=a/(2*Math.tan(al));O={x:a/2,y:d};let dx=Math.sqrt(Math.max(0,Rc*Rc-(va-O.y)*(va-O.y)));A={x:a/2-dx,y:va}; if(!isFinite(A.x))A={x:a/2,y:va};}
 else if(id==='b-alpha-va'||id==='b-beta-va'||id==='b-va-ta'||id==='b-va-tb'||id==='b-va-tc'){
   A={x:0,y:va};C={x:Math.sqrt(Math.max(0,b*b-va*va)),y:0};
   if(id==='b-alpha-va'){let al=triVal(p,'α')*pi/180,th=Math.atan2(C.y-A.y,C.x-A.x),cand=[th+al,th-al].flatMap(ang=>{let sy=Math.sin(ang);if(Math.abs(sy)<1e-9)return[];let t=-A.y/sy;return t>0?[{x:A.x+t*Math.cos(ang),y:0,t}]:[]});B=cand.filter(z=>z.x<C.x).sort((u,v)=>u.x-v.x)[0]||cand[0];}
   else if(id==='b-beta-va'){let be=triVal(p,'β')*pi/180;B={x:A.x-va/Math.tan(be),y:0};}
   else if(id==='b-va-ta'){let dx=Math.sqrt(Math.max(0,ta*ta-va*va));let Ms=[{x:dx,y:0},{x:-dx,y:0}];M=Ms.sort((u,v)=>Math.abs((2*u.x-C.x))-Math.abs((2*v.x-C.x)))[0];B={x:2*M.x-C.x,y:0};}
   else if(id==='b-va-tb'){N=tmid(A,C);let dx=Math.sqrt(Math.max(0,tb*tb-N.y*N.y));let Bs=[{x:N.x-dx,y:0},{x:N.x+dx,y:0}];B=Bs.filter(z=>z.x<C.x).sort((u,v)=>u.x-v.x)[0]||Bs[0];}
   else {let py=va/2,dx=Math.sqrt(Math.max(0,tc*tc-py*py));let Ps=[{x:C.x-dx,y:py},{x:C.x+dx,y:py}];P=Ps.sort((u,v)=>(2*u.x)-(2*v.x))[0];B={x:2*P.x-A.x,y:0};}
 }
 else if(id==='a-beta-ta'){let be=triVal(p,'β')*pi/180;B={x:0,y:0};C={x:a,y:0};M=tmid(B,C);let xs=trayCircle(B,be,M,ta);A=xs.slice().sort((u,v)=>v.y-u.y)[0]||xs[0];}
 else if(id==='a-alpha-ta'){let al=triVal(p,'α')*pi/180;B={x:0,y:0};C={x:a,y:0};M=tmid(B,C);let Rc=a/(2*Math.sin(al)),d=a/(2*Math.tan(al)),Oc={x:a/2,y:d};A=chooseUpper(tints(M,ta,Oc,Rc));O=Oc;}
 else if(id==='b-alpha-ta'){let al=triVal(p,'α')*pi/180;A={x:0,y:0};C={x:b,y:0};N=tmid(A,C);let xs=trayCircle(N,al,A,ta);M=xs.slice().sort((u,v)=>v.t-u.t)[0]||xs[0];B={x:2*M.x-C.x,y:2*M.y-C.y};}
 else if(id==='b-beta-ta'){let be=triVal(p,'β')*pi/180;A={x:0,y:0};C={x:b,y:0};let Cp={x:-b,y:0};let Rc=b/(2*Math.sin(be)),d=b/(2*Math.tan(be)),Oc={x:b/2,y:d};let xs=tints(Cp,2*ta,Oc,Rc);B=chooseUpper(xs);O=Oc;}
 else if(id==='b-gamma-ta'){let ga=triVal(p,'γ')*pi/180;A={x:0,y:0};C={x:b,y:0};let xs=trayCircle(C,pi-ga,A,ta);M=xs.slice().sort((u,v)=>v.t-u.t)[0]||xs[0];B={x:2*M.x-C.x,y:2*M.y-C.y};}
 else if(id==='a-va-ta'){B={x:0,y:0};C={x:a,y:0};M=tmid(B,C);let dx=Math.sqrt(Math.max(0,ta*ta-va*va));A={x:M.x-dx,y:va};alts=[A,{x:M.x+dx,y:va}];}
 else if(id==='a-va-tb'){B={x:0,y:0};C={x:a,y:0};let ny=va/2,dx=Math.sqrt(Math.max(0,tb*tb-ny*ny));N={x:dx,y:ny};A={x:2*N.x-C.x,y:2*N.y-C.y};}
 else if(id==='a-tb-tc'){B={x:0,y:0};C={x:a,y:0};G=chooseUpper(tints(B,2*tb/3,C,2*tc/3));A={x:3*G.x-B.x-C.x,y:3*G.y};M=tmid(B,C);}
 else if(id==='a-ta-tb'){B={x:0,y:0};C={x:a,y:0};M=tmid(B,C);P=tmid(M,C);N=chooseUpper(tints(P,ta/2,B,tb));A={x:2*N.x-C.x,y:2*N.y-C.y};}
 else if(id==='3tez'){a=2/3*Math.sqrt(Math.max(0,2*tb*tb+2*tc*tc-ta*ta));b=2/3*Math.sqrt(Math.max(0,2*ta*ta+2*tc*tc-tb*tb));c=2/3*Math.sqrt(Math.max(0,2*ta*ta+2*tb*tb-tc*tc));B={x:0,y:0};C={x:a,y:0};let x=(c*c-b*b+a*a)/(2*a),y=Math.sqrt(Math.max(0,c*c-x*x));A={x,y};}
 else if(id==='R-ab'){let al=Math.asin(Math.min(1,a/(2*Rr))),be=Math.asin(Math.min(1,b/(2*Rr))),ga=pi-al-be;c=2*Rr*Math.sin(ga);B={x:0,y:0};C={x:a,y:0};let x=(c*c-b*b+a*a)/(2*a),y=Math.sqrt(Math.max(0,c*c-x*x));A={x,y};}
 else if(id==='R-angles'){let be=triVal(p,'β')*pi/180,ga=triVal(p,'γ')*pi/180,al=pi-be-ga;a=2*Rr*Math.sin(al);b=2*Rr*Math.sin(be);c=2*Rr*Math.sin(ga);B={x:0,y:0};C={x:a,y:0};let x=(c*c-b*b+a*a)/(2*a),y=Math.sqrt(Math.max(0,c*c-x*x));A={x,y};}
 else if(id==='r-angles'){let be=triVal(p,'β')*pi/180,ga=triVal(p,'γ')*pi/180,al=pi-be-ga;let cot=x=>1/Math.tan(x);a=rr*(cot(be/2)+cot(ga/2));b=rr*(cot(al/2)+cot(ga/2));c=rr*(cot(al/2)+cot(be/2));B={x:0,y:0};C={x:a,y:0};let x=(c*c-b*b+a*a)/(2*a),y=Math.sqrt(Math.max(0,c*c-x*x));A={x,y};}
 else if(id==='r-a-beta'){let be=triVal(p,'β')*pi/180;B={x:0,y:0};C={x:a,y:0};let I={x:rr/Math.tan(be/2),y:rr};let vx=I.x-C.x,vy=I.y-C.y,d=Math.hypot(vx,vy),phi=Math.atan2(vy,vx),delta=Math.acos(Math.min(1,rr/d));let candidates=[phi+delta,phi-delta].map(ang=>trayRay(B,be,C,ang)).filter(Boolean).filter(z=>z.t>0);A=candidates.sort((u,v)=>v.y-u.y)[0]||candidates[0];}
 else if(id==='R-a-va'){B={x:0,y:0};C={x:a,y:0};let d=Math.sqrt(Math.max(0,Rr*Rr-a*a/4)),centers=[{x:a/2,y:d},{x:a/2,y:-d}],cand=[];centers.forEach(oc=>{let dx=Math.sqrt(Math.max(0,Rr*Rr-(va-oc.y)*(va-oc.y))); if(isFinite(dx)){cand.push({A:{x:a/2-dx,y:va},O:oc});cand.push({A:{x:a/2+dx,y:va},O:oc});}});let z=cand.filter(z=>z.A.y>0).sort((u,v)=>Math.abs(u.A.x-a/2)-Math.abs(v.A.x-a/2))[0]||cand[0];A=z.A;O=z.O;}
 else if(id==='bc-va'){A={x:0,y:va};B={x:-Math.sqrt(Math.max(0,c*c-va*va)),y:0};C={x:Math.sqrt(Math.max(0,b*b-va*va)),y:0};}
 else if(id==='bc-ta'){a=Math.sqrt(Math.max(0,2*b*b+2*c*c-4*ta*ta));B={x:0,y:0};C={x:a,y:0};let x=(c*c-b*b+a*a)/(2*a),y=Math.sqrt(Math.max(0,c*c-x*x));A={x,y};}
 if(!A||!B||!C||![A.x,A.y,B.x,B.y,C.x,C.y].every(Number.isFinite))return null;
 M=M||tmid(B,C);N=N||tmid(A,C);P=P||tmid(A,B);
 return {A,B,C,M,N,P,G,S,T,Tp,H,O,alts};
}
let triGeom=null;
