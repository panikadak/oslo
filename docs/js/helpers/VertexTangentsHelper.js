(function(){const t=new THREE.Vector3,e=new THREE.Vector3;class r extends THREE.LineSegments{constructor(t,e=1,r=65535){const o=t.geometry;if(!o||!o.isBufferGeometry)return void console.error("THREE.VertexTangentsHelper: geometry not an instance of THREE.BufferGeometry.",o);const s=o.attributes.tangent.count,n=new THREE.BufferGeometry,i=new THREE.Float32BufferAttribute(2*s*3,3);n.setAttribute("position",i),super(n,new THREE.LineBasicMaterial({color:r,toneMapped:!1})),this.object=t,this.size=e,this.type="VertexTangentsHelper",this.matrixAutoUpdate=!1,this.update()}update(){this.object.updateMatrixWorld(!0);const r=this.object.matrixWorld,o=this.geometry.attributes.position,s=this.object.geometry,n=s.attributes.position,i=s.attributes.tangent;let a=0;for(let c=0,u=n.count;c<u;c++)t.set(n.getX(c),n.getY(c),n.getZ(c)).applyMatrix4(r),e.set(i.getX(c),i.getY(c),i.getZ(c)),e.transformDirection(r).multiplyScalar(this.size).add(t),o.setXYZ(a,t.x,t.y,t.z),a+=1,o.setXYZ(a,e.x,e.y,e.z),a+=1;o.needsUpdate=!0}}THREE.VertexTangentsHelper=r})();