function worldShape(p){
 const id=p.id,pi=Math.PI;
 let a=nval(p,'a'),b=nval(p,'b'),c=nval(p,'c'),d=nval(p,'d'),e=nval(p,'e'),f=nval(p,'f'),v=nval(p,'v'),va=nval(p,'vₐ');
 let A={x:0,y:0},B,C,D,S,ang,h,x,t,pts;
 if(id==='sq-a'){B={x:a,y:0};C={x:a,y:a};D={x:0,y:a};return {A,B,C,D};}
 if(id==='sq-e'){const s=e/Math.sqrt(2);B={x:s,y:0};C={x:s,y:s};D={x:0,y:s};return {A,B,C,D};}
 if(id==='rec-ab'){B={x:a,y:0};C={x:a,y:b};D={x:0,y:b};return {A,B,C,D};}
 if(id==='rec-ae'){h=Math.sqrt(Math.max(0,e*e-a*a));B={x:a,y:0};C={x:a,y:h};D={x:0,y:h};return {A,B,C,D};}
 if(id==='par-abalpha'){ang=nval(p,'α')*pi/180;B={x:a,y:0};D={x:b*Math.cos(ang),y:b*Math.sin(ang)};C={x:B.x+D.x,y:D.y};return {A,B,C,D};}
 if(id==='par-abe'){ang=Math.acos(Math.max(-1,Math.min(1,(e*e-a*a-b*b)/(2*a*b))));B={x:a,y:0};D={x:b*Math.cos(ang),y:b*Math.sin(ang)};C={x:B.x+D.x,y:D.y};return {A,B,C,D};}
 if(id==='par-efw'||id==='rec-ew'){const ww=nval(p,'ω')*pi/180,ff=id==='rec-ew'?e:f;A={x:-e/2,y:0};C={x:e/2,y:0};B={x:-ff*Math.cos(ww)/2,y:-ff*Math.sin(ww)/2};D={x:ff*Math.cos(ww)/2,y:ff*Math.sin(ww)/2};return {A,B,C,D};}
 if(id==='par-aef'){const ww=Math.acos(Math.max(-1,Math.min(1,(e*e+f*f-4*a*a)/(2*e*f))));A={x:-e/2,y:0};C={x:e/2,y:0};B={x:-f*Math.cos(ww)/2,y:-f*Math.sin(ww)/2};D={x:f*Math.cos(ww)/2,y:f*Math.sin(ww)/2};return {A,B,C,D};}
 if(id==='par-ave'){h=va;x=Math.sqrt(Math.max(0,e*e-h*h));B={x:a,y:0};C={x:x,y:h};D={x:x-a,y:h};return {A,B,C,D};}
 if(id==='rho-aalpha'){ang=nval(p,'α')*pi/180;B={x:a,y:0};D={x:a*Math.cos(ang),y:a*Math.sin(ang)};C={x:B.x+D.x,y:D.y};return {A,B,C,D};}
 if(id==='rho-ef'){A={x:-e/2,y:0};C={x:e/2,y:0};B={x:0,y:-f/2};D={x:0,y:f/2};return {A,B,C,D};}
 if(id==='rho-ae'){h=Math.sqrt(Math.max(0,a*a-e*e/4));A={x:-e/2,y:0};C={x:e/2,y:0};B={x:0,y:-h};D={x:0,y:h};return {A,B,C,D};}
 if(id==='rho-ev'){h=e*v/(2*Math.sqrt(Math.max(1e-9,e*e-v*v)));A={x:-e/2,y:0};C={x:e/2,y:0};B={x:0,y:-h};D={x:0,y:h};return {A,B,C,D};}
 if(id==='trap-abcd'){const q=a-c;x=(q*q+d*d-b*b)/(2*q);h=Math.sqrt(Math.max(0,d*d-x*x));B={x:a,y:0};D={x:x,y:h};C={x:x+c,y:h};return {A,B,C,D};}
 if(id==='trap-acba'){ang=nval(p,'α')*pi/180;const q=a-c,disc=4*q*q*Math.cos(ang)**2-4*(q*q-b*b);t=(2*q*Math.cos(ang)+Math.sqrt(Math.max(0,disc)))/2;B={x:a,y:0};D={x:t*Math.cos(ang),y:t*Math.sin(ang)};C={x:D.x+c,y:D.y};return {A,B,C,D};}
 if(id==='trap-acvb'){h=v;x=a-Math.sqrt(Math.max(0,b*b-h*h));B={x:a,y:0};C={x:x,y:h};D={x:x-c,y:h};return {A,B,C,D};}
 if(id==='rtrap-acv'){B={x:a,y:0};D={x:0,y:v};C={x:c,y:v};return {A,B,C,D};}
 if(id==='itrap-acb'){x=(a-c)/2;h=Math.sqrt(Math.max(0,b*b-x*x));B={x:a,y:0};D={x:x,y:h};C={x:a-x,y:h};return {A,B,C,D};}
 if(id==='itrap-acv'){x=(a-c)/2;B={x:a,y:0};D={x:x,y:v};C={x:a-x,y:v};return {A,B,C,D};}
 if(id==='itrap-abalpha'){ang=nval(p,'α')*pi/180;B={x:a,y:0};D={x:b*Math.cos(ang),y:b*Math.sin(ang)};C={x:a-b*Math.cos(ang),y:D.y};return {A,B,C,D};}
 if(id==='itrap-adbeta'){ang=nval(p,'β')*pi/180;B={x:a,y:0};D={x:d*Math.cos(ang),y:d*Math.sin(ang)};C={x:a-d*Math.cos(ang),y:D.y};return {A,B,C,D};}
 if(id==='itrap-acbeta'){ang=nval(p,'β')*pi/180;x=(a-c)/2;h=x*Math.tan(ang);B={x:a,y:0};D={x:x,y:h};C={x:a-x,y:h};return {A,B,C,D};}
 if(id==='kite-abe'){x=(a*a-b*b+e*e)/(2*e);h=Math.sqrt(Math.max(0,a*a-x*x));A={x:0,y:0};C={x:e,y:0};B={x:x,y:-h};D={x:x,y:h};return {A,B,C,D};}
 if(id==='kite-abf'){h=f/2;A={x:Math.sqrt(Math.max(0,a*a-h*h)),y:0};C={x:-Math.sqrt(Math.max(0,b*b-h*h)),y:0};B={x:0,y:-h};D={x:0,y:h};return {A,B,C,D};}
 if(id==='quad-4se'){A={x:0,y:0};C={x:e,y:0};pts=wi(A,a,C,b);B=pts[0].y<pts[1].y?pts[0]:pts[1];pts=wi(A,d,C,c);D=pts[0].y>pts[1].y?pts[0]:pts[1];return {A,B,C,D};}
 if(id==='quad-3s2d'){const aa=5,bb=4,cc=5,ee=7,ff=6;A={x:0,y:0};C={x:ee,y:0};pts=wi(A,aa,C,bb);B=pts[0].y<pts[1].y?pts[0]:pts[1];pts=wi(B,ff,C,cc);D=pts.sort((u,w)=>w.y-u.y)[0];return {A,B,C,D};}
 if(id==='cyclic-Rabc'){const R=nval(p,'R'),ta=2*Math.asin(a/(2*R)),tb=2*Math.asin(b/(2*R)),tc=2*Math.asin(c/(2*R));A={x:R,y:0};B={x:R*Math.cos(ta),y:R*Math.sin(ta)};C={x:R*Math.cos(ta+tb),y:R*Math.sin(ta+tb)};D={x:R*Math.cos(ta+tb+tc),y:R*Math.sin(ta+tb+tc)};return {A,B,C,D,_circle:{O:{x:0,y:0},R}};}
 if(id==='quad-4sf'){const ff=nval(p,'f');B={x:0,y:0};D={x:ff,y:0};pts=wi(B,a,D,d);A=pts.sort((u,w)=>w.y-u.y)[0];pts=wi(B,b,D,c);C=pts.sort((u,w)=>u.y-w.y)[0];return {A,B,C,D};}
 if(id==='quad-abcag'){const ga=nval(p,'γ')*pi/180;C={x:0,y:0};B={x:-b,y:0};D={x:c*Math.cos(pi-ga),y:c*Math.sin(pi-ga)};S={x:(B.x+D.x)/2,y:(B.y+D.y)/2};pts=wi(B,a,S,Math.hypot(B.x-D.x,B.y-D.y)/2);A=pts.sort((u,w)=>u.x-w.x)[0];return {A,B,C,D};}
 if(id==='quad-acdeef'){A={x:0,y:0};C={x:e,y:0};pts=wi(A,d,C,c);D=pts.sort((u,w)=>w.y-u.y)[0];pts=wi(A,a,D,f);B=pts.sort((u,w)=>u.y-w.y)[0];return {A,B,C,D};}
 if(id==='quad-bcdgd'){const ga=nval(p,'γ')*pi/180,de=nval(p,'δ')*pi/180;C={x:0,y:0};D={x:c,y:0};B={x:b*Math.cos(ga),y:b*Math.sin(ga)};A={x:D.x+d*Math.cos(pi-de),y:d*Math.sin(de)};return {A,B,C,D};}
 if(id==='quad-mnop'){const MP=6,PO=4,opm=95*pi/180,pmn=45*pi/180,pon=66*pi/180;D={x:0,y:0};A={x:MP,y:0};C={x:PO*Math.cos(opm),y:PO*Math.sin(opm)};const a1=pi-pmn,base=Math.atan2(D.y-C.y,D.x-C.x),rr=rayRayWorld(A,a1,C,base+pon);B={x:rr.x,y:rr.y};return {A,B,C,D};}
 if(id==='quad-adeg-dac'){const ga=nval(p,'γ')*pi/180,dac=60*pi/180;A={x:0,y:0};C={x:e,y:0};D={x:d*Math.cos(dac),y:d*Math.sin(dac)};const cd=Math.atan2(D.y-C.y,D.x-C.x),rs=rayCircleWorld(C,cd+ga,A,a);B=rs[0];return {A,B,C,D};}
 if(id==='quad-rightv'){const U={x:0,y:0},X={x:8,y:0};pts=wi(U,6.5,X,2);A=pts.sort((u,w)=>w.y-u.y)[0];B=U;D=X;S={x:4,y:0};pts=wi(A,4,S,4);C=pts.filter(z=>z.y<0).sort((u,w)=>u.y-w.y)[0]||pts[0];return {A,B,C,D};}
 if(id==='quad-de-angles-f'){const dac=35*pi/180,cab=23*pi/180;A={x:0,y:0};C={x:e,y:0};D={x:d*Math.cos(dac),y:d*Math.sin(dac)};pts=rayCircleWorld(A,-cab,D,f);B=pts.sort((u,w)=>w.t-u.t)[0];return {A,B,C,D};}
 if(id==='trap-aad-e'){ang=nval(p,'α')*pi/180;B={x:a,y:0};D={x:d*Math.cos(ang),y:d*Math.sin(ang)};x=Math.sqrt(Math.max(0,e*e-D.y*D.y));C={x:x,y:D.y};return {A,B,C,D};}
 if(id==='rtrap-efehfh'){const EF=7.3,EH=2.5,FH=6.8;A={x:0,y:0};B={x:EF,y:0};pts=wi(A,EH,B,FH);D=pts.sort((u,w)=>w.y-u.y)[0];C={x:B.x,y:D.y};return {A,B,C,D};}
 if(id==='trap-acvdelta'){const de=nval(p,'δ')*pi/180,al=pi-de;B={x:a,y:0};x=v/Math.tan(al);D={x:x,y:v};C={x:x+c,y:v};return {A,B,C,D};}
 if(id==='trap-cvef'){C={x:c,y:v};D={x:0,y:v};A={x:c-Math.sqrt(Math.max(0,e*e-v*v)),y:0};B={x:Math.sqrt(Math.max(0,f*f-v*v)),y:0};return {A,B,C,D};}
 return null;
}