const difficultyOrder=['sq-a','sq-e','rec-ab','rtrap-acv','itrap-acv','rec-ae','rho-ae','rho-ef','par-abalpha','rho-aalpha','par-ave','rec-ew','par-efw','par-aef','par-abe','itrap-adbeta','itrap-acbeta','itrap-abalpha','itrap-acb','trap-acvb','trap-acvdelta','trap-acba','trap-abcd','rtrap-efehfh','trap-aad-e','trap-cvef','kite-abe','kite-abf','quad-bcdgd','quad-mnop','quad-4se','quad-4sf','quad-acdeef','quad-3s2d','quad-adeg-dac','quad-de-angles-f','quad-rightv','quad-abcag','rho-ev','cyclic-Rabc'];
const difficultyRank=new Map(difficultyOrder.map((id,i)=>[id,i]));
P.sort((a,b)=>(difficultyRank.get(a.id)??999)-(difficultyRank.get(b.id)??999));
const cats=["Vše",...new Set(P.map(p=>p.cat))];let current=0,filter="Vše",query="",stepIndex=0,openSolution=false,mobileDetail=false,mobilePanels={sketch:false,steps:false,construction:false};
const $=s=>document.querySelector(s);const E=(n,a={})=>{const x=document.createElement(n);Object.entries(a).forEach(([k,v])=>x.setAttribute(k,v));return x};
function isMobile(){return matchMedia('(max-width:700px)').matches}function syncBody(){document.body.classList.toggle('mobile-detail',isMobile()&&mobileDetail)}function resetPanels(){mobilePanels={sketch:false,steps:false,construction:false}}
function filtered(){return P.map((p,i)=>({...p,_i:i})).filter(p=>(filter==='Vše'||p.cat===filter)&&(p.title+' '+p.cat+' '+p.tags.join(' ')+' '+p.given).toLowerCase().includes(query.toLowerCase()))}
function renderFilters(){const w=$('#filters');w.innerHTML='';cats.forEach(c=>{const b=E('button');b.textContent=c;if(c===filter)b.classList.add('active');b.onclick=()=>{filter=c;renderFilters();renderList()};w.appendChild(b)})}
function renderList(){const w=$('#problemList');w.innerHTML='';const a=filtered();a.forEach(p=>{const b=E('button',{class:'problem-item'+(p._i===current&&!isMobile()?' active':'')});b.innerHTML=`<b>${p.title}</b><span>${p.cat}</span>`;b.onclick=()=>{current=p._i;stepIndex=0;openSolution=false;if(isMobile()){mobileDetail=true;resetPanels()}syncBody();renderAll();scrollTo({top:0,behavior:'smooth'})};w.appendChild(b)});if(!a.length)w.innerHTML='<div style="color:#94a3b8;padding:10px">Nic nenalezeno.</div>'}
const W=800,H=600,col={known:'#138a4b',unknown:'#172033',help:'#e99800',base:'#172033',final:'#138a4b'};
function svg(a){return `<svg viewBox="0 0 ${W} ${H}">${a.join('')}</svg>`}function line(a,b,k='base',dash=false,w=3){return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${col[k]||col.base}" stroke-width="${w}" ${dash?'stroke-dasharray="9 8"':''} stroke-linecap="round"/>`}function circ(c,r,k='help',dash=false){return `<circle cx="${c.x}" cy="${c.y}" r="${r}" fill="none" stroke="${col[k]||col.help}" stroke-width="3" ${dash?'stroke-dasharray="9 8"':''}/>`}function pt(p,n,k='unknown'){return `<circle cx="${p.x}" cy="${p.y}" r="6" fill="${col[k]||col.unknown}"/><text x="${p.x+10}" y="${p.y-10}" font-size="21" font-weight="800" fill="#172033">${n}</text>`}function txt(x,y,t,a='start'){return `<text x="${x}" y="${y}" text-anchor="${a}" font-size="18" fill="#64748b">${t}</text>`}function arc(cx,cy,r,a1,a2,k='help'){let p1={x:cx+r*Math.cos(a1),y:cy+r*Math.sin(a1)},p2={x:cx+r*Math.cos(a2),y:cy+r*Math.sin(a2)};return `<path d="M ${p1.x} ${p1.y} A ${r} ${r} 0 0 1 ${p2.x} ${p2.y}" fill="none" stroke="${col[k]}" stroke-width="3"/>`}function right(p,k='help'){return `<polyline points="${p.x},${p.y} ${p.x+18},${p.y} ${p.x+18},${p.y-18} ${p.x},${p.y-18}" fill="none" stroke="${col[k]}" stroke-width="3"/>`}
const Q={sq:{A:{x:190,y:430},B:{x:520,y:430},C:{x:520,y:100},D:{x:190,y:100},S:{x:355,y:265}},rec:{A:{x:150,y:430},B:{x:650,y:430},C:{x:650,y:160},D:{x:150,y:160}},par:{A:{x:150,y:430},B:{x:610,y:430},C:{x:750,y:160},D:{x:290,y:160}},rho:{A:{x:120,y:330},B:{x:380,y:500},C:{x:670,y:330},D:{x:380,y:160},S:{x:380,y:330}},trap:{A:{x:120,y:450},B:{x:690,y:450},C:{x:570,y:170},D:{x:260,y:170}},iso:{A:{x:120,y:450},B:{x:690,y:450},C:{x:560,y:170},D:{x:250,y:170}},kite:{A:{x:380,y:80},B:{x:600,y:300},C:{x:380,y:520},D:{x:160,y:300}},rtrap:{A:{x:160,y:450},B:{x:680,y:450},C:{x:500,y:160},D:{x:160,y:160}},cyc:{A:{x:170,y:340},B:{x:285,y:510},C:{x:520,y:490},D:{x:630,y:270}},quad:{A:{x:150,y:430},B:{x:600,y:470},C:{x:660,y:140},D:{x:250,y:100}}};

function nval(p,key){
 const esc=key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const m=p.given.match(new RegExp(esc+'\\s*=\\s*(?:\\|[A-Z]{2}\\|\\s*=\\s*)?([0-9]+(?:,[0-9]+)?)'));
 return m?parseFloat(m[1].replace(',','.')):NaN;
}
function wi(c0,r0,c1,r1){
 const dx=c1.x-c0.x,dy=c1.y-c0.y,d=Math.hypot(dx,dy);
 if(!isFinite(d)||d===0)return [];
 const aa=(r0*r0-r1*r1+d*d)/(2*d),h2=r0*r0-aa*aa,h=Math.sqrt(Math.max(0,h2));
 const xm=c0.x+aa*dx/d,ym=c0.y+aa*dy/d;
 return [{x:xm+h*(-dy)/d,y:ym+h*dx/d},{x:xm-h*(-dy)/d,y:ym-h*dx/d}];
}
function rayCircleWorld(P,ang,Cc,r){
 const ux=Math.cos(ang),uy=Math.sin(ang),vx=P.x-Cc.x,vy=P.y-Cc.y;
 const bb=2*(vx*ux+vy*uy),cc=vx*vx+vy*vy-r*r,disc=bb*bb-4*cc;
 if(disc<0)return [];
 return [(-bb-Math.sqrt(disc))/2,(-bb+Math.sqrt(disc))/2].filter(t=>t>=-1e-9).map(t=>({x:P.x+t*ux,y:P.y+t*uy,t}));
}
function rayRayWorld(P,a,Qq,b){
 const ux=Math.cos(a),uy=Math.sin(a),vx=Math.cos(b),vy=Math.sin(b),den=ux*vy-uy*vx;
 if(Math.abs(den)<1e-9)return null;
 const t=((Qq.x-P.x)*vy-(Qq.y-P.y)*vx)/den;
 return {x:P.x+t*ux,y:P.y+t*uy,t};
}
function fitWorld(q,margin=95){
 const pts=[q.A,q.B,q.C,q.D].filter(Boolean),xs=pts.map(p=>p.x),ys=pts.map(p=>p.y);
 const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
 const dx=Math.max(1e-6,maxX-minX),dy=Math.max(1e-6,maxY-minY);
 const sc=Math.min((W-2*margin)/dx,(H-2*margin)/dy),cx=(minX+maxX)/2,cy=(minY+maxY)/2;
 const f=p=>({x:W/2+(p.x-cx)*sc,y:H/2-(p.y-cy)*sc});
 const z={A:f(q.A),B:f(q.B),C:f(q.C),D:f(q.D),_scale:sc};
 if(q.S)z.S=f(q.S);
 return z;
}