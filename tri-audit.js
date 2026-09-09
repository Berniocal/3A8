(function(){
const get=id=>P.find(p=>p.id===id);
const set=(id,construction,steps)=>{const p=get(id);if(!p)return;if(construction)p.construction=construction;if(steps)p.steps=steps};
let p=get('a-alpha-va');if(p)p.given=p.given.replace('vₐ = 4 cm','vₐ = 3,5 cm');
arcPath=function(cx,cy,r,a1,a2,cls='help'){
 let d=a2-a1;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;
 const a=a1+d,p1={x:cx+r*Math.cos(a1),y:cy+r*Math.sin(a1)},p2={x:cx+r*Math.cos(a),y:cy+r*Math.sin(a)};
 const sweep=d>=0?1:0,col=cls==='final'?'#137a43':cls==='given'?'#172033':'#e99800';
 return `<path d="M ${p1.x} ${p1.y} A ${r} ${r} 0 0 ${sweep} ${p2.x} ${p2.y}" fill="none" stroke="${col}" stroke-width="3"/>`;
};
const oldTriWorld=triWorld;
triWorld=function(p){
 const pi=Math.PI,id=p.id;
 if(id==='a-alpha-va'){
   const a=triVal(p,'a'),al=triVal(p,'α')*pi/180,va=triVal(p,'v_a');
   const B={x:0,y:0},C={x:a,y:0},R0=a/(2*Math.sin(al)),d=Math.sqrt(Math.max(0,R0*R0-a*a/4)),O={x:a/2,y:d};
   const h2=R0*R0-(va-O.y)*(va-O.y); if(h2<0)return null; const dx=Math.sqrt(h2),A={x:a/2-dx,y:va};
   return {A,B,C,M:tmid(B,C),N:tmid(A,C),P:tmid(A,B),O,alts:[A,{x:a/2+dx,y:va}]};
 }
 if(id==='r-a-beta'){
   const a=triVal(p,'a'),r=triVal(p,'r'),be=triVal(p,'β')*pi/180,B={x:0,y:0},C={x:a,y:0};
   const I={x:r/Math.tan(be/2),y:r},vx=I.x-C.x,vy=I.y-C.y,d=Math.hypot(vx,vy),phi=Math.atan2(vy,vx),delta=Math.asin(Math.min(1,r/d));
   const candidates=[phi+delta,phi-delta].map(ang=>trayRay(B,be,C,ang)).filter(Boolean).filter(z=>z.t>1e-9);
   const A=candidates.sort((u,v)=>v.y-u.y)[0]; if(!A)return null;
   return {A,B,C,M:tmid(B,C),N:tmid(A,C),P:tmid(A,B),alts:[]};
 }
 if(id==='R-a-va'){
   const a=triVal(p,'a'),R0=triVal(p,'R'),va=triVal(p,'v_a'),B={x:0,y:0},C={x:a,y:0},d=Math.sqrt(Math.max(0,R0*R0-a*a/4));
   const cand=[];for(const O of [{x:a/2,y:d},{x:a/2,y:-d}]){const h2=R0*R0-(va-O.y)*(va-O.y);if(h2>=-1e-9){const dx=Math.sqrt(Math.max(0,h2));cand.push({A:{x:a/2-dx,y:va},O},{A:{x:a/2+dx,y:va},O});}}
   const z=cand.filter(z=>z.A.y>0).sort((u,v)=>Math.abs(u.A.x-a/2)-Math.abs(v.A.x-a/2))[0]||cand[0];if(!z)return null;
   const A=z.A;return {A,B,C,M:tmid(B,C),N:tmid(A,C),P:tmid(A,B),O:z.O,alts:cand.map(z=>z.A)};
 }
 return oldTriWorld(p);
};
const C={
sss:['BC; |BC| = 6 cm','k₁; k₁(B; 4,5 cm)','k₂; k₂(C; 5 cm)','A; A ∈ k₁ ∩ k₂','△ABC'],
sus:['AB; |AB| = 4 cm','→AX; ∠BAX = 70°','k; k(A; 5 cm)','C; C ∈ →AX ∩ k','△ABC'],
usu:['BC; |BC| = 6 cm','→BX; ∠CBX = 55°','→CY; ∠BCY = 65°','A; A ∈ →BX ∩ →CY','△ABC'],
ssu:['AC; |AC| = 7 cm','→AX; ∠CAX = 35°','k; k(C; 5 cm)','B₁, B₂; B₁, B₂ ∈ →AX ∩ k','△AB₁C, △AB₂C'],
abva:['BC; |BC| = 6 cm','p; p ∥ BC; d(p, BC) = 4 cm','k; k(C; 5 cm)','A; A ∈ p ∩ k','△ABC'],
acva:['BC; |BC| = 6 cm','p; p ∥ BC; d(p, BC) = 4 cm','k; k(B; 5 cm)','A; A ∈ p ∩ k','△ABC'],
'ab-ta':['BC; |BC| = 6 cm','M; M = střed BC','k₁; k₁(M; 4,5 cm)','k₂; k₂(C; 5 cm)','A; A ∈ k₁ ∩ k₂','△ABC'],
'a-beta-va':['BC; |BC| = 6 cm','→BX; ∠CBX = 50°','p; p ∥ BC; d(p, BC) = 4 cm','A; A ∈ →BX ∩ p','△ABC'],
'a-alpha-va':['BC; |BC| = 6 cm','l; l = {X; ∠BXC = 74°}','p; p ∥ BC; d(p, BC) = 3,5 cm','A; A ∈ l ∩ p','△ABC'],
'b-alpha-va':['AC; |AC| = 5 cm','→AX; ∠CAX = 69°','k; k(A; 3,3 cm)','t; t je Thaletova kružnice nad AC','H; H ∈ k ∩ t','p; C,H ∈ p; p je tečna ke k','B; B ∈ →AX ∩ p','△ABC'],
'b-beta-va':['AC; |AC| = 5 cm','k; k(A; 3,3 cm)','t; t je Thaletova kružnice nad AC','H; H ∈ k ∩ t','p; C,H ∈ p','q; A ∈ q; ∠(q,p) = 69°','B; B ∈ p ∩ q','△ABC'],
'a-beta-ta':['BC; |BC| = 6 cm','→BX; ∠CBX = 50°','M; M = střed BC','k; k(M; 4,5 cm)','A; A ∈ →BX ∩ k','△ABC'],
'a-alpha-ta':['BC; |BC| = 6 cm','M; M = střed BC','l; l = {X; ∠BXC = 74°}','k; k(M; 3,5 cm)','A; A ∈ l ∩ k','△ABC'],
'b-alpha-ta':['AC; |AC| = 5 cm','→AX; ∠CAX = 69°','N; N = střed AC','p; N ∈ p; p ∥ AX','k; k(A; 3,6 cm)','M; M ∈ p ∩ k','B; M = střed BC','△ABC'],
'b-beta-ta':['AC; |AC| = 5 cm','l; l = {X; ∠AXC = 69°}','C′; A = střed CC′','k; k(C′; 7,2 cm)','B; B ∈ l ∩ k','△ABC'],
'b-gamma-ta':['AC; |AC| = 5 cm','→CX; ∠ACX = 40°','k; k(A; 3,6 cm)','M; M ∈ →CX ∩ k','B; M = střed BC','△ABC'],
'a-va-ta':['BC; |BC| = 6 cm','M; M = střed BC','p; p ∥ BC; d(p, BC) = 4 cm','k; k(M; 5 cm)','A₁, A₂; A₁, A₂ ∈ p ∩ k','△A₁BC, △A₂BC'],
'a-va-tb':['BC; |BC| = 6 cm','p; p ∥ BC; d(p, BC) = 2 cm','k; k(B; 5 cm)','N; N ∈ p ∩ k','A; N = střed AC','△ABC'],
'b-va-ta':['AC; |AC| = 5 cm','k₁; k₁(A; 3,3 cm)','t; t je Thaletova kružnice nad AC','H; H ∈ k₁ ∩ t','p; C,H ∈ p','k₂; k₂(A; 3,6 cm)','M; M ∈ p ∩ k₂','B; M = střed BC','△ABC'],
'b-va-tb':['AC; |AC| = 5 cm','N; N = střed AC','k₁; k₁(A; 3,3 cm)','t; t je Thaletova kružnice nad AC','H; H ∈ k₁ ∩ t','p; C,H ∈ p','k₂; k₂(N; 5 cm)','B; B ∈ p ∩ k₂','△ABC'],
'b-va-tc':['AC; |AC| = 5 cm','N; N = střed AC','k₁; k₁(A; 3,3 cm)','t; t je Thaletova kružnice nad AC','H; H ∈ k₁ ∩ t','p; C,H ∈ p','p′; N ∈ p′; p′ ∥ p','k₂; k₂(C; 5,2 cm)','P; P ∈ p′ ∩ k₂','B; P = střed AB','△ABC'],
'a-tb-tc':['BC; |BC| = 6 cm','k₁; k₁(B; 3,33 cm)','k₂; k₂(C; 3,2 cm)','G; G ∈ k₁ ∩ k₂','M; M = střed BC','A; A,G,M jsou kolineární; |GA| = 2|GM|','△ABC'],
'a-ta-tb':['BC; |BC| = 6 cm','M; M = střed BC','P; P = střed MC','k₁; k₁(P; 2,1 cm)','k₂; k₂(B; 4,8 cm)','N; N ∈ k₁ ∩ k₂','A; N = střed AC','△ABC'],
'3tez':['CS; |CS| = 5 cm','T; T ∈ CS; |ST| = 1,67 cm','T′; T′ ∈ ↔CS; S leží mezi T a T′; |ST′| = 1,67 cm','k₁; k₁(T; 3,13 cm)','k₂; k₂(T′; 2,73 cm)','B; B ∈ k₁ ∩ k₂','A; S = střed AB','△ABC'],
'R-ab':['k; k(O; 4 cm)','B; B ∈ k','l; l(B; 6 cm)','C; C ∈ k ∩ l','m; m(C; 5 cm)','A; A ∈ k ∩ m; A ≠ B','△ABC'],
'R-angles':['k; k(O; 4 cm)','α = 60°','A; A ∈ k','→OX; ∠AOX = 130°','B; B ∈ →OX ∩ k','→OY; ∠BOY = 120°','C; C ∈ →OY ∩ k','△ABC'],
'r-angles':['k; k(I; 1,5 cm)','α = 60°','E; E ∈ k','→IF; ∠EIF = 120°','F; F ∈ →IF ∩ k','→IG; ∠FIG = 125°','G; G ∈ →IG ∩ k','p; p je tečna ke k v E','q; q je tečna ke k v F','s; s je tečna ke k v G','A; A ∈ p ∩ q','B; B ∈ q ∩ s','C; C ∈ s ∩ p','△ABC'],
'r-a-beta':['BC; |BC| = 6 cm','→BX; ∠CBX = 50°','→BY; ∠CBY = 25°','p; p ∥ BC; d(p, BC) = 1,4 cm','I; I ∈ →BY ∩ p','k; k(I; 1,4 cm)','t; t je tečna z C ke k, t ≠ BC','A; A ∈ →BX ∩ t','△ABC'],
'R-a-va':['k; k(O; 4 cm)','B; B ∈ k','l; l(B; 6 cm)','C; C ∈ k ∩ l','p; p ∥ BC; d(p, BC) = 3,5 cm','A; A ∈ p ∩ k','△ABC'],
'bc-va':['A','p; d(A,p) = 3,5 cm','k₁; k₁(A; 4,5 cm)','B; B ∈ p ∩ k₁','k₂; k₂(A; 5 cm)','C; C ∈ p ∩ k₂','△ABC'],
'bc-ta':['AD; |AD| = 8 cm','k₁; k₁(A; 4,5 cm)','k₂; k₂(D; 5 cm)','B; B ∈ k₁ ∩ k₂','M; M = střed AD','C; M = střed BC','△ABC']
};
for(const [id,c] of Object.entries(C)){const p=get(id);if(p)p.construction=c;}
set('sus',null,[['Strana','Narýsuj |AB| = 4 cm.'],['Úhel','V bodě A sestroj polopřímku AX tak, aby ∠BAX = 70°.'],['Kružnice','Narýsuj k(A; 5 cm).'],['Vrchol C','C je průsečík polopřímky AX a kružnice k.'],['Dokonči','Spoj B s C.']]);
set('usu',null,[['Strana','Narýsuj |BC| = 6 cm.'],['Úhel β','V B sestroj polopřímku BX, ∠CBX = 55°.'],['Úhel γ','V C sestroj polopřímku CY, ∠BCY = 65°.'],['Vrchol A','A = →BX ∩ →CY.'],['Dokonči','Zvýrazni △ABC.']]);
set('a-beta-ta',null,[['Strana','Narýsuj |BC| = 6 cm.'],['Úhel β','V B sestroj polopřímku BX, ∠CBX = 50°.'],['Střed','Sestroj střed M úsečky BC.'],['Těžnice','Narýsuj k(M; 4,5 cm).'],['Vrchol A','A = →BX ∩ k.']]);
set('b-gamma-ta',null,[['Strana','Narýsuj |AC| = 5 cm.'],['Úhel γ','V C sestroj polopřímku CX, ∠ACX = 40°.'],['Těžnice','Narýsuj k(A; 3,6 cm).'],['Střed M','M = →CX ∩ k.'],['Vrchol B','Sestroj B tak, aby M byl střed BC.']]);
set('b-alpha-va',null,[['Strana','Narýsuj |AC| = 5 cm.'],['Úhel α','V A sestroj polopřímku AX, ∠CAX = 69°.'],['Kružnice výšky','Narýsuj k(A; 3,3 cm).'],['Tečna z C','Nad AC sestroj Thaletovu kružnici t; její průsečík H s k určí tečnu CH.'],['Vrchol B','B = →AX ∩ CH.'],['Dokonči','Spoj A, B, C.']]);
set('b-alpha-ta',null,[['Strana','Narýsuj |AC| = 5 cm.'],['Úhel α','V A sestroj polopřímku AX, ∠CAX = 69°.'],['Střed N','Sestroj střed N úsečky AC.'],['Pomocná rovnoběžka','Přes N veď p ∥ AX.'],['Těžnice','Narýsuj k(A; 3,6 cm); M = p ∩ k.'],['Vrchol B','Sestroj B tak, aby M byl střed BC.']]);
set('r-a-beta',null,[['Strana','Narýsuj |BC| = 6 cm.'],['Úhel β','V B sestroj polopřímku BX, ∠CBX = 50°.'],['Osa úhlu','Sestroj polopřímku BY, ∠CBY = 25°.'],['Střed vepsané kružnice','Sestroj p ∥ BC ve vzdálenosti 1,4 cm; I = →BY ∩ p.'],['Vepsaná kružnice','Narýsuj k(I; 1,4 cm).'],['Druhá tečna z C','Sestroj tečnu t z C ke k, t ≠ BC.'],['Vrchol A','A = →BX ∩ t.']]);
const oldDraw=draw;
const T={};
T.sus=(p,s)=>{const g=tprep(p),w=g.world,A=w.A,B=w.B,Cc=w.C,q=[twLine(A,B,'given'),twPt(A,'A'),twPt(B,'B')];if(s>=1)q.push(twRay(A,Math.atan2(Cc.y-A.y,Cc.x-A.x),'help'),triAngleArc(A,B,Cc,'help'));if(s>=2)q.push(twCircle(A,5,'help'));if(s>=3)q.push(twPt(Cc,'C','final'));if(s>=4)q.push(...triEdges(g,'final'));return svg(q)};
T.usu=(p,s)=>{const g=tprep(p),w=g.world,q=[twLine(w.B,w.C,'given'),twPt(w.B,'B'),twPt(w.C,'C')];if(s>=1)q.push(twRay(w.B,Math.atan2(w.A.y-w.B.y,w.A.x-w.B.x),'help'),triAngleArc(w.B,w.C,w.A,'help'));if(s>=2)q.push(twRay(w.C,Math.atan2(w.A.y-w.C.y,w.A.x-w.C.x),'help'),triAngleArc(w.C,w.B,w.A,'help'));if(s>=3)q.push(twPt(w.A,'A','final'));if(s>=4)q.push(...triEdges(g,'final'));return svg(q)};
T['a-beta-ta']=(p,s)=>{const g=tprep(p),w=g.world,q=[twLine(w.B,w.C,'given'),twPt(w.B,'B'),twPt(w.C,'C')];if(s>=1)q.push(twRay(w.B,Math.atan2(w.A.y-w.B.y,w.A.x-w.B.x),'help'),triAngleArc(w.B,w.C,w.A,'help'));if(s>=2)q.push(twPt(w.M,'M'));if(s>=3)q.push(twCircle(w.M,4.5,'help'));if(s>=4)q.push(twPt(w.A,'A','final'),...triEdges(g,'final'));return svg(q)};
T['b-gamma-ta']=(p,s)=>{const g=tprep(p),w=g.world,q=[twLine(w.A,w.C,'given'),twPt(w.A,'A'),twPt(w.C,'C')];if(s>=1)q.push(twRay(w.C,Math.atan2(w.B.y-w.C.y,w.B.x-w.C.x),'help'),triAngleArc(w.C,w.A,w.B,'help'));if(s>=2)q.push(twCircle(w.A,3.6,'help'));if(s>=3)q.push(twPt(w.M,'M','final'));if(s>=4)q.push(twPt(w.B,'B','final'),...triEdges(g,'final'));return svg(q)};
T['b-alpha-va']=(p,s)=>{const g=tprep(p),w=g.world,q=[twLine(w.A,w.C,'given'),twPt(w.A,'A'),twPt(w.C,'C')],H={x:w.A.x,y:0},S0=tmid(w.A,w.C);if(s>=1)q.push(twRay(w.A,Math.atan2(w.B.y-w.A.y,w.B.x-w.A.x),'help'),triAngleArc(w.A,w.C,w.B,'help'));if(s>=2)q.push(twCircle(w.A,3.3,'help',true));if(s>=3)q.push(twCircle(S0,tdist(w.A,w.C)/2,'help',true),twPt(H,'H'),twLine(w.C,H,'help'));if(s>=4)q.push(twPt(w.B,'B','final'));if(s>=5)q.push(...triEdges(g,'final'));return svg(q)};
T['b-alpha-ta']=(p,s)=>{const g=tprep(p),w=g.world,q=[twLine(w.A,w.C,'given'),twPt(w.A,'A'),twPt(w.C,'C')];if(s>=1)q.push(twRay(w.A,Math.atan2(w.B.y-w.A.y,w.B.x-w.A.x),'help'),triAngleArc(w.A,w.C,w.B,'help'));if(s>=2)q.push(twPt(w.N,'N'));if(s>=3)q.push(twLine(w.N,w.M,'help',true));if(s>=4)q.push(twCircle(w.A,3.6,'help'),twPt(w.M,'M','final'));if(s>=5)q.push(twPt(w.B,'B','final'),...triEdges(g,'final'));return svg(q)};
T['r-a-beta']=(p,s)=>{const g=tprep(p),w=g.world,I=tincenter(w.A,w.B,w.C),q=[twLine(w.B,w.C,'given'),twPt(w.B,'B'),twPt(w.C,'C')];const be=Math.atan2(w.A.y-w.B.y,w.A.x-w.B.x),bi=Math.atan2(I.y-w.B.y,I.x-w.B.x);if(s>=1)q.push(twRay(w.B,be,'help'),triAngleArc(w.B,w.C,w.A,'help'));if(s>=2)q.push(twRay(w.B,bi,'help'));if(s>=3){q.push(twHLine(1.4,'help'),twPt(I,'I','final'));}if(s>=4)q.push(twCircle(I,1.4,'help'));if(s>=5)q.push(twLine(w.C,w.A,'help',true));if(s>=6)q.push(twPt(w.A,'A','final'),...triEdges(g,'final'));return svg(q)};
draw=function(p,s){return T[p.id]?T[p.id](p,s):oldDraw(p,s)};
if(typeof renderAll==='function')renderAll();
})();
