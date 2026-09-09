(function(){
  if(typeof P==='undefined'||!Array.isArray(P)) return;
  P.forEach((p,i)=>{
    p.number=i+1;
    p.title=String(p.title||'').replace(/^\s*\d+\.\s*/,'');
    p.title=`${i+1}. ${p.title}`;
  });
  if(typeof renderAll==='function') renderAll();
})();
