(function(){function e(e,t,n={}){const o=new THREE.Vector3,i=new THREE.Quaternion,a=new THREE.Vector3,l=new THREE.Matrix4,p=new THREE.Matrix4,c=new THREE.Matrix4;n.preserveMatrix=void 0===n.preserveMatrix||n.preserveMatrix,n.preservePosition=void 0===n.preservePosition||n.preservePosition,n.preserveHipPosition=void 0!==n.preserveHipPosition&&n.preserveHipPosition,n.useTargetMatrix=void 0!==n.useTargetMatrix&&n.useTargetMatrix,n.hip=void 0!==n.hip?n.hip:"hip",n.names=n.names||{};const m=t.isObject3D?t.skeleton.bones:r(t),u=e.isObject3D?e.skeleton.bones:r(e);let E,x,d,f,T;if(e.isObject3D?e.skeleton.pose():(n.useTargetMatrix=!0,n.preserveMatrix=!1),n.preservePosition){T=[];for(let e=0;e<u.length;e++)T.push(u[e].position.clone())}if(n.preserveMatrix){e.updateMatrixWorld(),e.matrixWorld.identity();for(let t=0;t<e.children.length;++t)e.children[t].updateMatrixWorld(!0)}if(n.offsets){E=[];for(let e=0;e<u.length;++e)x=u[e],d=n.names[x.name]||x.name,n.offsets&&n.offsets[d]&&(x.matrix.multiply(n.offsets[d]),x.matrix.decompose(x.position,x.quaternion,x.scale),x.updateMatrixWorld()),E.push(x.matrixWorld.clone())}for(let r=0;r<u.length;++r){if(x=u[r],d=n.names[x.name]||x.name,f=s(d,m),c.copy(x.matrixWorld),f){if(f.updateMatrixWorld(),n.useTargetMatrix?p.copy(f.matrixWorld):(p.copy(e.matrixWorld).invert(),p.multiply(f.matrixWorld)),a.setFromMatrixScale(p),p.scale(a.set(1/a.x,1/a.y,1/a.z)),c.makeRotationFromQuaternion(i.setFromRotationMatrix(p)),e.isObject3D){const t=u.indexOf(x),n=E?E[t]:l.copy(e.skeleton.boneInverses[t]).invert();c.multiply(n)}c.copyPosition(p)}x.parent&&x.parent.isBone?(x.matrix.copy(x.parent.matrixWorld).invert(),x.matrix.multiply(c)):x.matrix.copy(c),n.preserveHipPosition&&d===n.hip&&x.matrix.setPosition(o.set(0,x.position.y,0)),x.matrix.decompose(x.position,x.quaternion,x.scale),x.updateMatrixWorld()}if(n.preservePosition)for(let r=0;r<u.length;++r)x=u[r],d=n.names[x.name]||x.name,d!==n.hip&&x.position.copy(T[r]);n.preserveMatrix&&e.updateMatrixWorld(!0)}function t(t,o,i,a={}){a.useFirstFramePosition=void 0!==a.useFirstFramePosition&&a.useFirstFramePosition,a.fps=void 0!==a.fps?a.fps:30,a.names=a.names||[],o.isObject3D||(o=n(o));const l=Math.round(i.duration*(a.fps/1e3)*1e3),p=1/a.fps,c=[],m=new THREE.AnimationMixer(o),u=r(t.skeleton),E=[];let x,d,f,T,h;m.clipAction(i).play(),m.update(0),o.updateMatrixWorld();for(let n=0;n<l;++n){const i=n*p;e(t,o,a);for(let e=0;e<u.length;++e)h=a.names[u[e].name]||u[e].name,f=s(h,o.skeleton),f&&(d=u[e],T=E[e]=E[e]||{bone:d},a.hip===h&&(T.pos||(T.pos={times:new Float32Array(l),values:new Float32Array(3*l)}),a.useFirstFramePosition&&(0===n&&(x=d.position.clone()),d.position.sub(x)),T.pos.times[n]=i,d.position.toArray(T.pos.values,3*n)),T.quat||(T.quat={times:new Float32Array(l),values:new Float32Array(4*l)}),T.quat.times[n]=i,d.quaternion.toArray(T.quat.values,4*n));m.update(p),o.updateMatrixWorld()}for(let e=0;e<E.length;++e)T=E[e],T&&(T.pos&&c.push(new THREE.VectorKeyframeTrack(".bones["+T.bone.name+"].position",T.pos.times,T.pos.values)),c.push(new THREE.QuaternionKeyframeTrack(".bones["+T.bone.name+"].quaternion",T.quat.times,T.quat.values)));return m.uncacheAction(i),new THREE.AnimationClip(i.name,-1,c)}function n(e){const t=new THREE.SkeletonHelper(e.bones[0]);return t.skeleton=e,t}function o(e,t,o={}){const i=new THREE.Vector3,l=new THREE.Vector3,p=new THREE.Vector3,c=new THREE.Vector3,m=new THREE.Vector2,u=new THREE.Vector2;o.hip=void 0!==o.hip?o.hip:"hip",o.names=o.names||{},t.isObject3D||(t=n(t));const E=Object.keys(o.names),x=Object.values(o.names),d=t.isObject3D?t.skeleton.bones:r(t),f=e.isObject3D?e.skeleton.bones:r(e),T=[];let h,H,M,R;for(e.skeleton.pose(),R=0;R<f.length;++R)if(h=f[R],M=o.names[h.name]||h.name,H=s(M,d),H&&M!==o.hip){const e=a(h.parent,E),t=a(H.parent,x);e.updateMatrixWorld(),t.updateMatrixWorld(),i.setFromMatrixPosition(e.matrixWorld),l.setFromMatrixPosition(h.matrixWorld),p.setFromMatrixPosition(t.matrixWorld),c.setFromMatrixPosition(H.matrixWorld),m.subVectors(new THREE.Vector2(l.x,l.y),new THREE.Vector2(i.x,i.y)).normalize(),u.subVectors(new THREE.Vector2(c.x,c.y),new THREE.Vector2(p.x,p.y)).normalize();const n=m.angle()-u.angle(),o=(new THREE.Matrix4).makeRotationFromEuler(new THREE.Euler(0,0,n));h.matrix.multiply(o),h.matrix.decompose(h.position,h.quaternion,h.scale),h.updateMatrixWorld(),T[M]=o}return T}function i(e,t){const n=r(e);for(let o=0;o<n.length;++o){const e=n[o];t[e.name]&&(e.name=t[e.name])}return this}function r(e){return Array.isArray(e)?e:e.bones}function s(e,t){for(let n=0,o=r(t);n<o.length;n++)if(e===o[n].name)return o[n]}function a(e,t){while(e.isBone){if(-1!==t.indexOf(e.name))return e;e=e.parent}}function l(e,t){const n=/\[(.*)\]\.(.*)/,o={name:e};for(let i=0;i<t.length;++i){const r=n.exec(t[i].name);r&&e===r[1]&&(o[r[2]]=i)}return o}function p(e,t){const n=r(e),o=r(t),i=[];e:for(let r=0;r<n.length;r++){const e=n[r].name;for(let t=0;t<o.length;t++)if(e===o[t].name){i.push(e);continue e}}return i}function c(e){const t=new Map,n=new Map,o=e.clone();return m(e,o,(function(e,o){t.set(o,e),n.set(e,o)})),o.traverse((function(e){if(!e.isSkinnedMesh)return;const o=e,i=t.get(e),r=i.skeleton.bones;o.skeleton=i.skeleton.clone(),o.bindMatrix.copy(i.bindMatrix),o.skeleton.bones=r.map((function(e){return n.get(e)})),o.bind(o.skeleton,o.bindMatrix)})),o}function m(e,t,n){n(e,t);for(let o=0;o<e.children.length;o++)m(e.children[o],t.children[o],n)}THREE.SkeletonUtils={},THREE.SkeletonUtils.clone=c,THREE.SkeletonUtils.findBoneTrackData=l,THREE.SkeletonUtils.getBoneByName=s,THREE.SkeletonUtils.getBones=r,THREE.SkeletonUtils.getEqualsBonesNames=p,THREE.SkeletonUtils.getHelperFromSkeleton=n,THREE.SkeletonUtils.getNearestBone=a,THREE.SkeletonUtils.getSkeletonOffsets=o,THREE.SkeletonUtils.renameBones=i,THREE.SkeletonUtils.retarget=e,THREE.SkeletonUtils.retargetClip=t})();