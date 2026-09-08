const specialSketch={},specialStep={};
function midp(a,b){return{x:(a.x+b.x)/2,y:(a.y+b.y)/2}}
function customPts(q,names=['A','B','C','D']){return [pt(q.A,names[0]),pt(q.B,names[1]),pt(q.C,names[2]),pt(q.D,names[3])]}
function sketchKnown(q,known=[],extra=[],names=['A','B','C','D']){
 const a=[],seg={AB:[q.A,q.B],BC:[q.B,q.C],CD:[q.C,q.D],DA:[q.D,q.A],AC:[q.A,q.C],BD:[q.B,q.D]};
 ['AB','BC','CD','DA'].forEach(s=>a.push(line(...seg[s],known.includes(s)?'known':'unknown')));
 ['AC','BD'].forEach(s=>{if(known.includes(s))a.push(line(...seg[s],'known'))});
 a.push(...customPts(q,names),...extra);return svg(a)
}
specialSketch.paraHeightDiag=()=>{const q=Q.par;return sketchKnown(q,['AB','AC'],[line({x:q.D.x,y:q.D.y},{x:q.D.x,y:q.A.y},'known')])};
specialSketch.rectDiagAngle=()=>{const q=Q.rec,S=midp(q.A,q.C);return sketchKnown(q,['AC','BD'],[pt(S,'S'),arc(S.x,S.y,55,Math.atan2(q.A.y-S.y,q.A.x-S.x),Math.atan2(q.B.y-S.y,q.B.x-S.x),'known')])};
specialSketch.paraSideDiags=()=>sketchKnown(Q.par,['AB','AC','BD']);
specialSketch.rhombDiagHeight=()=>{const q=Q.rho;return sketchKnown(q,['AC'],[line(q.D,{x:q.D.x,y:q.B.y},'known')])};
specialSketch.quad4DiagF=()=>sketchKnown(Q.quad,['AB','BC','CD','DA','BD']);
specialSketch.quadABCAG=()=>{const q=Q.quad;return sketchKnown(q,['AB','BC','CD'],[arc(q.A.x,q.A.y,46,Math.atan2(q.D.y-q.A.y,q.D.x-q.A.x),Math.atan2(q.B.y-q.A.y,q.B.x-q.A.x),'known'),arc(q.C.x,q.C.y,46,Math.atan2(q.B.y-q.C.y,q.B.x-q.C.x),Math.atan2(q.D.y-q.C.y,q.D.x-q.C.x),'known')])};
specialSketch.quadACDEf=()=>sketchKnown(Q.quad,['AB','CD','DA','AC','BD']);
specialSketch.quadBCDGd=()=>{const q=Q.quad;return sketchKnown(q,['BC','CD','DA'],[arc(q.C.x,q.C.y,46,Math.atan2(q.B.y-q.C.y,q.B.x-q.C.x),Math.atan2(q.D.y-q.C.y,q.D.x-q.C.x),'known'),arc(q.D.x,q.D.y,46,Math.atan2(q.C.y-q.D.y,q.C.x-q.D.x),Math.atan2(q.A.y-q.D.y,q.A.x-q.D.x),'known')])};
specialSketch.quadMNOP=()=>{const q=Q.quad;return sketchKnown(q,['CD','DA'],[arc(q.D.x,q.D.y,43,Math.atan2(q.C.y-q.D.y,q.C.x-q.D.x),Math.atan2(q.A.y-q.D.y,q.A.x-q.D.x),'known'),arc(q.A.x,q.A.y,43,Math.atan2(q.D.y-q.A.y,q.D.x-q.A.x),Math.atan2(q.B.y-q.A.y,q.B.x-q.A.x),'known'),arc(q.C.x,q.C.y,43,Math.atan2(q.D.y-q.C.y,q.D.x-q.C.x),Math.atan2(q.B.y-q.C.y,q.B.x-q.C.x),'known')],['M','N','O','P'])};
specialSketch.quadADEGammaDAC=()=>{const q=Q.quad;return sketchKnown(q,['AB','DA','AC'],[arc(q.A.x,q.A.y,45,Math.atan2(q.D.y-q.A.y,q.D.x-q.A.x),Math.atan2(q.C.y-q.A.y,q.C.x-q.A.x),'known'),arc(q.C.x,q.C.y,45,Math.atan2(q.B.y-q.C.y,q.B.x-q.C.x),Math.atan2(q.D.y-q.C.y,q.D.x-q.C.x),'known')])};
specialSketch.quadRightV=()=>{const q=Q.quad;return sketchKnown(q,['AB','BD','DA','AC'],[right(q.C,'known')],['T','U','V','X'])};
specialSketch.quadDEAnglesF=()=>{const q=Q.quad;return sketchKnown(q,['DA','AC','BD'],[arc(q.A.x,q.A.y,42,Math.atan2(q.D.y-q.A.y,q.D.x-q.A.x),Math.atan2(q.C.y-q.A.y,q.C.x-q.A.x),'known'),arc(q.A.x,q.A.y,62,Math.atan2(q.C.y-q.A.y,q.C.x-q.A.x),Math.atan2(q.B.y-q.A.y,q.B.x-q.A.x),'known')])};
specialSketch.trapAngleLegDiag=()=>sketchKnown(Q.trap,['AB','DA','AC'],[]);
specialSketch.rightTrapEFGH=()=>sketchKnown(Q.rtrap,['AB','DA','BD'],[right(Q.rtrap.B,'known')],['E','F','G','H']);
specialSketch.trapHeightDelta=()=>sketchKnown(Q.trap,['AB','CD'],[line({x:Q.trap.D.x,y:Q.trap.D.y},{x:Q.trap.D.x,y:Q.trap.A.y},'known'),arc(Q.trap.D.x,Q.trap.D.y,45,Math.atan2(Q.trap.C.y-Q.trap.D.y,Q.trap.C.x-Q.trap.D.x),Math.atan2(Q.trap.A.y-Q.trap.D.y,Q.trap.A.x-Q.trap.D.x),'known')]);
specialSketch.trapTopHeightDiags=()=>sketchKnown(Q.trap,['CD','AC','BD'],[line({x:Q.trap.D.x,y:Q.trap.D.y},{x:Q.trap.D.x,y:Q.trap.A.y},'known')]);
specialSketch.isoTrapBaseLegBeta=()=>sketchKnown(Q.iso,['AB','BC','DA'],[arc(Q.iso.B.x,Q.iso.B.y,45,Math.PI,Math.atan2(Q.iso.C.y-Q.iso.B.y,Q.iso.C.x-Q.iso.B.x),'known')]);
specialSketch.isoTrapBasesBeta=()=>sketchKnown(Q.iso,['AB','CD'],[arc(Q.iso.B.x,Q.iso.B.y,45,Math.PI,Math.atan2(Q.iso.C.y-Q.iso.B.y,Q.iso.C.x-Q.iso.B.x),'known')]);