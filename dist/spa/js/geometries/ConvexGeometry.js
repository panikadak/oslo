(function(){class e extends THREE.BufferGeometry{constructor(e){super();const t=[],o=[];void 0===THREE.ConvexHull&&console.error("THREE.ConvexBufferGeometry: ConvexBufferGeometry relies on THREE.ConvexHull");const n=(new THREE.ConvexHull).setFromPoints(e),r=n.faces;for(let s=0;s<r.length;s++){const e=r[s];let n=e.edge;do{const r=n.head().point;t.push(r.x,r.y,r.z),o.push(e.normal.x,e.normal.y,e.normal.z),n=n.next}while(n!==e.edge)}this.setAttribute("position",new THREE.Float32BufferAttribute(t,3)),this.setAttribute("normal",new THREE.Float32BufferAttribute(o,3))}}THREE.ConvexGeometry=e})();