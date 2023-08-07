(function(){const t=0,e=1,n=new THREE.Vector3,s=new THREE.Line3,i=new THREE.Plane,r=new THREE.Vector3,o=new THREE.Triangle;class a{constructor(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new u,this.unassigned=new u,this.vertices=[]}setFromPoints(t){!0!==Array.isArray(t)&&console.error("THREE.ConvexHull: Points parameter is not an array."),t.length<4&&console.error("THREE.ConvexHull: The algorithm needs at least four points."),this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.vertices.push(new c(t[e]));return this.compute(),this}setFromObject(t){const e=[];return t.updateMatrixWorld(!0),t.traverse((function(t){const n=t.geometry;if(void 0!==n){if(n.isGeometry)return void console.error("THREE.ConvexHull no longer supports Geometry. Use THREE.BufferGeometry instead.");if(n.isBufferGeometry){const s=n.attributes.position;if(void 0!==s)for(let n=0,i=s.count;n<i;n++){const i=new THREE.Vector3;i.fromBufferAttribute(s,n).applyMatrix4(t.matrixWorld),e.push(i)}}}})),this.setFromPoints(e)}containsPoint(t){const e=this.faces;for(let n=0,s=e.length;n<s;n++){const s=e[n];if(s.distanceToPoint(t)>this.tolerance)return!1}return!0}intersectRay(t,e){const n=this.faces;let s=-1/0,i=1/0;for(let r=0,o=n.length;r<o;r++){const e=n[r],o=e.distanceToPoint(t.origin),a=e.normal.dot(t.direction);if(o>0&&a>=0)return null;const l=0!==a?-o/a:0;if(!(l<=0)&&(a>0?i=Math.min(l,i):s=Math.max(l,s),s>i))return null}return s!==-1/0?t.at(s,e):t.at(i,e),e}intersectsRay(t){return null!==this.intersectRay(t,n)}makeEmpty(){return this.faces=[],this.vertices=[],this}addVertexToFace(t,e){return t.face=e,null===e.outside?this.assigned.append(t):this.assigned.insertBefore(e.outside,t),e.outside=t,this}removeVertexFromFace(t,e){return t===e.outside&&(null!==t.next&&t.next.face===e?e.outside=t.next:e.outside=null),this.assigned.remove(t),this}removeAllVerticesFromFace(t){if(null!==t.outside){const e=t.outside;let n=t.outside;while(null!==n.next&&n.next.face===t)n=n.next;return this.assigned.removeSubList(e,n),e.prev=n.next=null,t.outside=null,e}}deleteFaceVertices(t,e){const n=this.removeAllVerticesFromFace(t);if(void 0!==n)if(void 0===e)this.unassigned.appendChain(n);else{let t=n;do{const n=t.next,s=e.distanceToPoint(t.point);s>this.tolerance?this.addVertexToFace(t,e):this.unassigned.append(t),t=n}while(null!==t)}return this}resolveUnassignedPoints(e){if(!1===this.unassigned.isEmpty()){let n=this.unassigned.first();do{const s=n.next;let i=this.tolerance,r=null;for(let o=0;o<e.length;o++){const s=e[o];if(s.mark===t){const t=s.distanceToPoint(n.point);if(t>i&&(i=t,r=s),i>1e3*this.tolerance)break}}null!==r&&this.addVertexToFace(n,r),n=s}while(null!==n)}return this}computeExtremes(){const t=new THREE.Vector3,e=new THREE.Vector3,n=[],s=[];for(let i=0;i<3;i++)n[i]=s[i]=this.vertices[0];t.copy(this.vertices[0].point),e.copy(this.vertices[0].point);for(let i=0,r=this.vertices.length;i<r;i++){const r=this.vertices[i],o=r.point;for(let e=0;e<3;e++)o.getComponent(e)<t.getComponent(e)&&(t.setComponent(e,o.getComponent(e)),n[e]=r);for(let t=0;t<3;t++)o.getComponent(t)>e.getComponent(t)&&(e.setComponent(t,o.getComponent(t)),s[t]=r)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(t.x),Math.abs(e.x))+Math.max(Math.abs(t.y),Math.abs(e.y))+Math.max(Math.abs(t.z),Math.abs(e.z))),{min:n,max:s}}computeInitialHull(){const t=this.vertices,e=this.computeExtremes(),n=e.min,o=e.max;let a=0,h=0;for(let s=0;s<3;s++){const t=o[s].point.getComponent(s)-n[s].point.getComponent(s);t>a&&(a=t,h=s)}const c=n[h],u=o[h];let d,p;a=0,s.set(c.point,u.point);for(let i=0,l=this.vertices.length;i<l;i++){const e=t[i];if(e!==c&&e!==u){s.closestPointToPoint(e.point,!0,r);const t=r.distanceToSquared(e.point);t>a&&(a=t,d=e)}}a=-1,i.setFromCoplanarPoints(c.point,u.point,d.point);for(let s=0,r=this.vertices.length;s<r;s++){const e=t[s];if(e!==c&&e!==u&&e!==d){const t=Math.abs(i.distanceToPoint(e.point));t>a&&(a=t,p=e)}}const m=[];if(i.distanceToPoint(p.point)<0){m.push(l.create(c,u,d),l.create(p,u,c),l.create(p,d,u),l.create(p,c,d));for(let t=0;t<3;t++){const e=(t+1)%3;m[t+1].getEdge(2).setTwin(m[0].getEdge(e)),m[t+1].getEdge(1).setTwin(m[e+1].getEdge(0))}}else{m.push(l.create(c,d,u),l.create(p,c,u),l.create(p,u,d),l.create(p,d,c));for(let t=0;t<3;t++){const e=(t+1)%3;m[t+1].getEdge(2).setTwin(m[0].getEdge((3-t)%3)),m[t+1].getEdge(0).setTwin(m[e+1].getEdge(1))}}for(let s=0;s<4;s++)this.faces.push(m[s]);for(let s=0,i=t.length;s<i;s++){const e=t[s];if(e!==c&&e!==u&&e!==d&&e!==p){a=this.tolerance;let t=null;for(let n=0;n<4;n++){const s=this.faces[n].distanceToPoint(e.point);s>a&&(a=s,t=this.faces[n])}null!==t&&this.addVertexToFace(e,t)}}return this}reindexFaces(){const e=[];for(let n=0;n<this.faces.length;n++){const s=this.faces[n];s.mark===t&&e.push(s)}return this.faces=e,this}nextVertexToAdd(){if(!1===this.assigned.isEmpty()){let t,e=0;const n=this.assigned.first().face;let s=n.outside;do{const i=n.distanceToPoint(s.point);i>e&&(e=i,t=s),s=s.next}while(null!==s&&s.face===n);return t}}computeHorizon(n,s,i,r){let o;this.deleteFaceVertices(i),i.mark=e,o=null===s?s=i.getEdge(0):s.next;do{const e=o.twin,s=e.face;s.mark===t&&(s.distanceToPoint(n)>this.tolerance?this.computeHorizon(n,e,s,r):r.push(o)),o=o.next}while(o!==s);return this}addAdjoiningFace(t,e){const n=l.create(t,e.tail(),e.head());return this.faces.push(n),n.getEdge(-1).setTwin(e.twin),n.getEdge(0)}addNewFaces(t,e){this.newFaces=[];let n=null,s=null;for(let i=0;i<e.length;i++){const r=e[i],o=this.addAdjoiningFace(t,r);null===n?n=o:o.next.setTwin(s),this.newFaces.push(o.face),s=o}return n.next.setTwin(s),this}addVertexToHull(t){const e=[];return this.unassigned.clear(),this.removeVertexFromFace(t,t.face),this.computeHorizon(t.point,null,t.face,e),this.addNewFaces(t,e),this.resolveUnassignedPoints(this.newFaces),this}cleanup(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this}compute(){let t;this.computeInitialHull();while(void 0!==(t=this.nextVertexToAdd()))this.addVertexToHull(t);return this.reindexFaces(),this.cleanup(),this}}class l{constructor(){this.normal=new THREE.Vector3,this.midpoint=new THREE.Vector3,this.area=0,this.constant=0,this.outside=null,this.mark=t,this.edge=null}static create(t,e,n){const s=new l,i=new h(t,s),r=new h(e,s),o=new h(n,s);return i.next=o.prev=r,r.next=i.prev=o,o.next=r.prev=i,s.edge=i,s.compute()}getEdge(t){let e=this.edge;while(t>0)e=e.next,t--;while(t<0)e=e.prev,t++;return e}compute(){const t=this.edge.tail(),e=this.edge.head(),n=this.edge.next.head();return o.set(t.point,e.point,n.point),o.getNormal(this.normal),o.getMidpoint(this.midpoint),this.area=o.getArea(),this.constant=this.normal.dot(this.midpoint),this}distanceToPoint(t){return this.normal.dot(t)-this.constant}}class h{constructor(t,e){this.vertex=t,this.prev=null,this.next=null,this.twin=null,this.face=e}head(){return this.vertex}tail(){return this.prev?this.prev.vertex:null}length(){const t=this.head(),e=this.tail();return null!==e?e.point.distanceTo(t.point):-1}lengthSquared(){const t=this.head(),e=this.tail();return null!==e?e.point.distanceToSquared(t.point):-1}setTwin(t){return this.twin=t,t.twin=this,this}}class c{constructor(t){this.point=t,this.prev=null,this.next=null,this.face=null}}class u{constructor(){this.head=null,this.tail=null}first(){return this.head}last(){return this.tail}clear(){return this.head=this.tail=null,this}insertBefore(t,e){return e.prev=t.prev,e.next=t,null===e.prev?this.head=e:e.prev.next=e,t.prev=e,this}insertAfter(t,e){return e.prev=t,e.next=t.next,null===e.next?this.tail=e:e.next.prev=e,t.next=e,this}append(t){return null===this.head?this.head=t:this.tail.next=t,t.prev=this.tail,t.next=null,this.tail=t,this}appendChain(t){null===this.head?this.head=t:this.tail.next=t,t.prev=this.tail;while(null!==t.next)t=t.next;return this.tail=t,this}remove(t){return null===t.prev?this.head=t.next:t.prev.next=t.next,null===t.next?this.tail=t.prev:t.next.prev=t.prev,this}removeSubList(t,e){return null===t.prev?this.head=e.next:t.prev.next=e.next,null===e.next?this.tail=t.prev:e.next.prev=t.prev,this}isEmpty(){return null===this.head}}THREE.ConvexHull=a})();