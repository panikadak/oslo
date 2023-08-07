(function(){const e=new THREE.Matrix4;class t{constructor(e){e=e||{},this.vertices={near:[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3],far:[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3]},void 0!==e.projectionMatrix&&this.setFromProjectionMatrix(e.projectionMatrix,e.maxFar||1e4)}setFromProjectionMatrix(t,r){const s=0===t.elements[11];return e.copy(t).invert(),this.vertices.near[0].set(1,1,-1),this.vertices.near[1].set(1,-1,-1),this.vertices.near[2].set(-1,-1,-1),this.vertices.near[3].set(-1,1,-1),this.vertices.near.forEach((function(t){t.applyMatrix4(e)})),this.vertices.far[0].set(1,1,1),this.vertices.far[1].set(1,-1,1),this.vertices.far[2].set(-1,-1,1),this.vertices.far[3].set(-1,1,1),this.vertices.far.forEach((function(t){t.applyMatrix4(e);const i=Math.abs(t.z);s?t.z*=Math.min(r/i,1):t.multiplyScalar(Math.min(r/i,1))})),this.vertices}split(e,r){while(e.length>r.length)r.push(new t);r.length=e.length;for(let t=0;t<e.length;t++){const s=r[t];if(0===t)for(let e=0;e<4;e++)s.vertices.near[e].copy(this.vertices.near[e]);else for(let r=0;r<4;r++)s.vertices.near[r].lerpVectors(this.vertices.near[r],this.vertices.far[r],e[t-1]);if(t===e.length-1)for(let e=0;e<4;e++)s.vertices.far[e].copy(this.vertices.far[e]);else for(let r=0;r<4;r++)s.vertices.far[r].lerpVectors(this.vertices.near[r],this.vertices.far[r],e[t])}}toSpace(e,t){for(var r=0;r<4;r++)t.vertices.near[r].copy(this.vertices.near[r]).applyMatrix4(e),t.vertices.far[r].copy(this.vertices.far[r]).applyMatrix4(e)}}THREE.Frustum=t})();