(function(){class t{constructor(t,s,o,n,i){this.degree1=t,this.degree2=s,this.knots1=o,this.knots2=n,this.controlPoints=[];const h=o.length-t-1,e=n.length-s-1;for(let c=0;c<h;++c){this.controlPoints[c]=[];for(let t=0;t<e;++t){const s=i[c][t];this.controlPoints[c][t]=new THREE.Vector4(s.x,s.y,s.z,s.w)}}}getPoint(t,s,o){const n=this.knots1[0]+t*(this.knots1[this.knots1.length-1]-this.knots1[0]),i=this.knots2[0]+s*(this.knots2[this.knots2.length-1]-this.knots2[0]);THREE.NURBSUtils.calcSurfacePoint(this.degree1,this.degree2,this.knots1,this.knots2,this.controlPoints,n,i,o)}}THREE.NURBSSurface=t})();