(function(){const t=new THREE.Vector3,e=new THREE.Vector3,n=new THREE.Plane,s=new THREE.Line3,r=new THREE.Line3,i=new THREE.Sphere,o=new THREE.Capsule;class a{constructor(t){this.triangles=[],this.box=t,this.subTrees=[]}addTriangle(t){return this.bounds||(this.bounds=new THREE.Box3),this.bounds.min.x=Math.min(this.bounds.min.x,t.a.x,t.b.x,t.c.x),this.bounds.min.y=Math.min(this.bounds.min.y,t.a.y,t.b.y,t.c.y),this.bounds.min.z=Math.min(this.bounds.min.z,t.a.z,t.b.z,t.c.z),this.bounds.max.x=Math.max(this.bounds.max.x,t.a.x,t.b.x,t.c.x),this.bounds.max.y=Math.max(this.bounds.max.y,t.a.y,t.b.y,t.c.y),this.bounds.max.z=Math.max(this.bounds.max.z,t.a.z,t.b.z,t.c.z),this.triangles.push(t),this}calcBox(){return this.box=this.bounds.clone(),this.box.min.x-=.01,this.box.min.y-=.01,this.box.min.z-=.01,this}split(n){if(!this.box)return;const s=[],r=e.copy(this.box.max).sub(this.box.min).multiplyScalar(.5);for(let e=0;e<2;e++)for(let n=0;n<2;n++)for(let i=0;i<2;i++){const o=new THREE.Box3,l=t.set(e,n,i);o.min.copy(this.box.min).add(l.multiply(r)),o.max.copy(o.min).add(r),s.push(new a(o))}let i;while(i=this.triangles.pop())for(let t=0;t<s.length;t++)s[t].box.intersectsTriangle(i)&&s[t].triangles.push(i);for(let t=0;t<s.length;t++){const e=s[t].triangles.length;e>8&&n<16&&s[t].split(n+1),0!==e&&this.subTrees.push(s[t])}return this}build(){return this.calcBox(),this.split(0),this}getRayTriangles(t,e){for(let n=0;n<this.subTrees.length;n++){const s=this.subTrees[n];if(t.intersectsBox(s.box))if(s.triangles.length>0)for(let t=0;t<s.triangles.length;t++)-1===e.indexOf(s.triangles[t])&&e.push(s.triangles[t]);else s.getRayTriangles(t,e)}return e}triangleCapsuleIntersect(e,i){i.getPlane(n);const o=n.distanceToPoint(e.start)-e.radius,a=n.distanceToPoint(e.end)-e.radius;if(o>0&&a>0||o<-e.radius&&a<-e.radius)return!1;const l=Math.abs(o/(Math.abs(o)+Math.abs(a))),h=t.copy(e.start).lerp(e.end,l);if(i.containsPoint(h))return{normal:n.normal.clone(),point:h.clone(),depth:Math.abs(Math.min(o,a))};const c=e.radius*e.radius,u=s.set(e.start,e.end),g=[[i.a,i.b],[i.b,i.c],[i.c,i.a]];for(let t=0;t<g.length;t++){const n=r.set(g[t][0],g[t][1]),[s,i]=e.lineLineMinimumPoints(u,n);if(s.distanceToSquared(i)<c)return{normal:s.clone().sub(i).normalize(),point:i.clone(),depth:e.radius-s.distanceTo(i)}}return!1}triangleSphereIntersect(r,i){if(i.getPlane(n),!r.intersectsPlane(n))return!1;const o=Math.abs(n.distanceToSphere(r)),a=r.radius*r.radius-o*o,l=n.projectPoint(r.center,t);if(i.containsPoint(r.center))return{normal:n.normal.clone(),point:l.clone(),depth:Math.abs(n.distanceToSphere(r))};const h=[[i.a,i.b],[i.b,i.c],[i.c,i.a]];for(let t=0;t<h.length;t++){s.set(h[t][0],h[t][1]),s.closestPointToPoint(l,!0,e);const n=e.distanceToSquared(r.center);if(n<a)return{normal:r.center.clone().sub(e).normalize(),point:e.clone(),depth:r.radius-Math.sqrt(n)}}return!1}getSphereTriangles(t,e){for(let n=0;n<this.subTrees.length;n++){const s=this.subTrees[n];if(t.intersectsBox(s.box))if(s.triangles.length>0)for(let t=0;t<s.triangles.length;t++)-1===e.indexOf(s.triangles[t])&&e.push(s.triangles[t]);else s.getSphereTriangles(t,e)}}getCapsuleTriangles(t,e){for(let n=0;n<this.subTrees.length;n++){const s=this.subTrees[n];if(t.intersectsBox(s.box))if(s.triangles.length>0)for(let t=0;t<s.triangles.length;t++)-1===e.indexOf(s.triangles[t])&&e.push(s.triangles[t]);else s.getCapsuleTriangles(t,e)}}sphereIntersect(t){i.copy(t);const e=[];let n,s=!1;this.getSphereTriangles(t,e);for(let r=0;r<e.length;r++)(n=this.triangleSphereIntersect(i,e[r]))&&(s=!0,i.center.add(n.normal.multiplyScalar(n.depth)));if(s){const e=i.center.clone().sub(t.center),n=e.length();return{normal:e.normalize(),depth:n}}return!1}capsuleIntersect(e){o.copy(e);const n=[];let s,r=!1;this.getCapsuleTriangles(o,n);for(let t=0;t<n.length;t++)(s=this.triangleCapsuleIntersect(o,n[t]))&&(r=!0,o.translate(s.normal.multiplyScalar(s.depth)));if(r){const n=o.getCenter(new THREE.Vector3).sub(e.getCenter(t)),s=n.length();return{normal:n.normalize(),depth:s}}return!1}rayIntersect(e){if(0===e.direction.length())return;const n=[];let s,r,i=1e100;this.getRayTriangles(e,n);for(let o=0;o<n.length;o++){const a=e.intersectTriangle(n[o].a,n[o].b,n[o].c,!0,t);if(a){const t=a.sub(e.origin).length();i>t&&(r=a.clone().add(e.origin),i=t,s=n[o])}}return i<1e100&&{distance:i,triangle:s,position:r}}fromGraphNode(t){return t.updateWorldMatrix(!0,!0),t.traverse((t=>{if(!0===t.isMesh){let e,n=!1;null!==t.geometry.index?(n=!0,e=t.geometry.toNonIndexed()):e=t.geometry;const s=e.getAttribute("position");for(let r=0;r<s.count;r+=3){const e=(new THREE.Vector3).fromBufferAttribute(s,r),n=(new THREE.Vector3).fromBufferAttribute(s,r+1),i=(new THREE.Vector3).fromBufferAttribute(s,r+2);e.applyMatrix4(t.matrixWorld),n.applyMatrix4(t.matrixWorld),i.applyMatrix4(t.matrixWorld),this.addTriangle(new THREE.Triangle(e,n,i))}n&&e.dispose()}})),this.build(),this}}THREE.Octree=a})();