(function(){const e=new THREE.Vector3,t=new THREE.Vector3,r=new THREE.Matrix3;class o extends THREE.LineSegments{constructor(e,t=1,r=16711680){let o=0;const s=e.geometry;if(s&&s.isGeometry)return void console.error("THREE.VertexNormalsHelper no longer supports Geometry. Use THREE.BufferGeometry instead.");s&&s.isBufferGeometry&&(o=s.attributes.normal.count);const i=new THREE.BufferGeometry,a=new THREE.Float32BufferAttribute(2*o*3,3);i.setAttribute("position",a),super(i,new THREE.LineBasicMaterial({color:r,toneMapped:!1})),this.object=e,this.size=t,this.type="VertexNormalsHelper",this.matrixAutoUpdate=!1,this.update()}update(){this.object.updateMatrixWorld(!0),r.getNormalMatrix(this.object.matrixWorld);const o=this.object.matrixWorld,s=this.geometry.attributes.position,i=this.object.geometry;if(i&&i.isGeometry)console.error("THREE.VertexNormalsHelper no longer supports Geometry. Use THREE.BufferGeometry instead.");else{if(i&&i.isBufferGeometry){const a=i.attributes.position,n=i.attributes.normal;let l=0;for(let i=0,m=a.count;i<m;i++)e.set(a.getX(i),a.getY(i),a.getZ(i)).applyMatrix4(o),t.set(n.getX(i),n.getY(i),n.getZ(i)),t.applyMatrix3(r).normalize().multiplyScalar(this.size).add(e),s.setXYZ(l,e.x,e.y,e.z),l+=1,s.setXYZ(l,t.x,t.y,t.z),l+=1}s.needsUpdate=!0}}}THREE.VertexNormalsHelper=o})();