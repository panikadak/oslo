(function(){class e{constructor(e={}){this.meshes=[],this.camera=null,this.cameraTarget=new THREE.Object3D,this.cameraTarget.name="target",this.audio=null,this.audioManager=null,this.objects=new WeakMap,this.configuration={sync:void 0===e.sync||e.sync,afterglow:void 0!==e.afterglow?e.afterglow:0,resetPhysicsOnLoop:void 0===e.resetPhysicsOnLoop||e.resetPhysicsOnLoop,pmxAnimation:void 0!==e.pmxAnimation&&e.pmxAnimation},this.enabled={animation:!0,ik:!0,grant:!0,physics:!0,cameraAnimation:!0},this.onBeforePhysics=function(){},this.sharedPhysics=!1,this.masterPhysics=null}add(e,t={}){if(e.isSkinnedMesh)this._addMesh(e,t);else if(e.isCamera)this._setupCamera(e,t);else{if("Audio"!==e.type)throw new Error("THREE.MMDAnimationHelper.add: accepts only THREE.SkinnedMesh or THREE.Camera or THREE.Audio instance.");this._setupAudio(e,t)}return this.configuration.sync&&this._syncDuration(),this}remove(e){if(e.isSkinnedMesh)this._removeMesh(e);else if(e.isCamera)this._clearCamera(e);else{if("Audio"!==e.type)throw new Error("THREE.MMDAnimationHelper.remove: accepts only THREE.SkinnedMesh or THREE.Camera or THREE.Audio instance.");this._clearAudio(e)}return this.configuration.sync&&this._syncDuration(),this}update(e){null!==this.audioManager&&this.audioManager.control(e);for(let t=0;t<this.meshes.length;t++)this._animateMesh(this.meshes[t],e);return this.sharedPhysics&&this._updateSharedPhysics(e),null!==this.camera&&this._animateCamera(this.camera,e),this}pose(e,t,s={}){!1!==s.resetPose&&e.pose();const i=e.skeleton.bones,n=t.bones,a={};for(let h=0,l=i.length;h<l;h++)a[i[h].name]=h;const r=new THREE.Vector3,o=new THREE.Quaternion;for(let h=0,l=n.length;h<l;h++){const e=n[h],t=a[e.name];if(void 0===t)continue;const s=i[t];s.position.add(r.fromArray(e.translation)),s.quaternion.multiply(o.fromArray(e.quaternion))}if(e.updateMatrixWorld(!0),this.configuration.pmxAnimation&&e.geometry.userData.MMD&&"pmx"===e.geometry.userData.MMD.format){const t=this._sortBoneDataArray(e.geometry.userData.MMD.bones.slice()),i=!1!==s.ik?this._createCCDIKSolver(e):null,n=!1!==s.grant?this.createGrantSolver(e):null;this._animatePMXMesh(e,t,i,n)}else!1!==s.ik&&this._createCCDIKSolver(e).update(),!1!==s.grant&&this.createGrantSolver(e).update();return this}enable(e,t){if(void 0===this.enabled[e])throw new Error("THREE.MMDAnimationHelper.enable: unknown key "+e);if(this.enabled[e]=t,"physics"===e)for(let s=0,i=this.meshes.length;s<i;s++)this._optimizeIK(this.meshes[s],t);return this}createGrantSolver(e){return new h(e,e.geometry.userData.MMD.grants)}_addMesh(e,t){if(this.meshes.indexOf(e)>=0)throw new Error("THREE.MMDAnimationHelper._addMesh: SkinnedMesh '"+e.name+"' has already been added.");return this.meshes.push(e),this.objects.set(e,{looped:!1}),this._setupMeshAnimation(e,t.animation),!1!==t.physics&&this._setupMeshPhysics(e,t),this}_setupCamera(e,t){if(this.camera===e)throw new Error("THREE.MMDAnimationHelper._setupCamera: Camera '"+e.name+"' has already been set.");return this.camera&&this.clearCamera(this.camera),this.camera=e,e.add(this.cameraTarget),this.objects.set(e,{}),void 0!==t.animation&&this._setupCameraAnimation(e,t.animation),this}_setupAudio(e,t){if(this.audio===e)throw new Error("THREE.MMDAnimationHelper._setupAudio: Audio '"+e.name+"' has already been set.");return this.audio&&this.clearAudio(this.audio),this.audio=e,this.audioManager=new r(e,t),this.objects.set(this.audioManager,{duration:this.audioManager.duration}),this}_removeMesh(e){let t=!1,s=0;for(let i=0,n=this.meshes.length;i<n;i++)this.meshes[i]!==e?this.meshes[s++]=this.meshes[i]:(this.objects.delete(e),t=!0);if(!t)throw new Error("THREE.MMDAnimationHelper._removeMesh: SkinnedMesh '"+e.name+"' has not been added yet.");return this.meshes.length=s,this}_clearCamera(e){if(e!==this.camera)throw new Error("THREE.MMDAnimationHelper._clearCamera: Camera '"+e.name+"' has not been set yet.");return this.camera.remove(this.cameraTarget),this.objects.delete(this.camera),this.camera=null,this}_clearAudio(e){if(e!==this.audio)throw new Error("THREE.MMDAnimationHelper._clearAudio: Audio '"+e.name+"' has not been set yet.");return this.objects.delete(this.audioManager),this.audio=null,this.audioManager=null,this}_setupMeshAnimation(e,t){const s=this.objects.get(e);if(void 0!==t){const i=Array.isArray(t)?t:[t];s.mixer=new THREE.AnimationMixer(e);for(let e=0,t=i.length;e<t;e++)s.mixer.clipAction(i[e]).play();s.mixer.addEventListener("loop",(function(e){const t=e.action._clip.tracks;t.length>0&&".bones"!==t[0].name.slice(0,6)||(s.looped=!0)}))}return s.ikSolver=this._createCCDIKSolver(e),s.grantSolver=this.createGrantSolver(e),this}_setupCameraAnimation(e,t){const s=Array.isArray(t)?t:[t],i=this.objects.get(e);i.mixer=new THREE.AnimationMixer(e);for(let n=0,a=s.length;n<a;n++)i.mixer.clipAction(s[n]).play()}_setupMeshPhysics(e,t){const s=this.objects.get(e);if(void 0===t.world&&this.sharedPhysics){const e=this._getMasterPhysics();null!==e&&(world=e.world)}s.physics=this._createMMDPhysics(e,t),s.mixer&&!1!==t.animationWarmup&&(this._animateMesh(e,0),s.physics.reset()),s.physics.warmup(void 0!==t.warmup?t.warmup:60),this._optimizeIK(e,!0)}_animateMesh(e,t){const s=this.objects.get(e),i=s.mixer,n=s.ikSolver,a=s.grantSolver,r=s.physics,o=s.looped;i&&this.enabled.animation&&(this._restoreBones(e),i.update(t),this._saveBones(e),this.configuration.pmxAnimation&&e.geometry.userData.MMD&&"pmx"===e.geometry.userData.MMD.format?(s.sortedBonesData||(s.sortedBonesData=this._sortBoneDataArray(e.geometry.userData.MMD.bones.slice())),this._animatePMXMesh(e,s.sortedBonesData,n&&this.enabled.ik?n:null,a&&this.enabled.grant?a:null)):(n&&this.enabled.ik&&(e.updateMatrixWorld(!0),n.update()),a&&this.enabled.grant&&a.update())),!0===o&&this.enabled.physics&&(r&&this.configuration.resetPhysicsOnLoop&&r.reset(),s.looped=!1),r&&this.enabled.physics&&!this.sharedPhysics&&(this.onBeforePhysics(e),r.update(t))}_sortBoneDataArray(e){return e.sort((function(e,t){return e.transformationClass!==t.transformationClass?e.transformationClass-t.transformationClass:e.index-t.index}))}_animatePMXMesh(e,t,i,r){s=0,n.clear();for(let s=0,n=t.length;s<n;s++)a(e,t[s].index,i,r);return e.updateMatrixWorld(!0),this}_animateCamera(e,t){const s=this.objects.get(e).mixer;s&&this.enabled.cameraAnimation&&(s.update(t),e.updateProjectionMatrix(),e.up.set(0,1,0),e.up.applyQuaternion(e.quaternion),e.lookAt(this.cameraTarget.position))}_optimizeIK(e,t){const s=e.geometry.userData.MMD.iks,i=e.geometry.userData.MMD.bones;for(let n=0,a=s.length;n<a;n++){const e=s[n],a=e.links;for(let s=0,n=a.length;s<n;s++){const e=a[s];e.enabled=!0!==t||!(i[e.index].rigidBodyType>0)}}}_createCCDIKSolver(e){if(void 0===THREE.CCDIKSolver)throw new Error("THREE.MMDAnimationHelper: Import THREE.CCDIKSolver.");return new THREE.CCDIKSolver(e,e.geometry.userData.MMD.iks)}_createMMDPhysics(e,t){if(void 0===THREE.MMDPhysics)throw new Error("THREE.MMDPhysics: Import THREE.MMDPhysics.");return new THREE.MMDPhysics(e,e.geometry.userData.MMD.rigidBodies,e.geometry.userData.MMD.constraints,t)}_syncDuration(){let e=0;const t=this.objects,s=this.meshes,i=this.camera,n=this.audioManager;for(let a=0,r=s.length;a<r;a++){const i=this.objects.get(s[a]).mixer;if(void 0!==i)for(let s=0;s<i._actions.length;s++){const n=i._actions[s]._clip;t.has(n)||t.set(n,{duration:n.duration}),e=Math.max(e,t.get(n).duration)}}if(null!==i){const s=this.objects.get(i).mixer;if(void 0!==s)for(let i=0,n=s._actions.length;i<n;i++){const n=s._actions[i]._clip;t.has(n)||t.set(n,{duration:n.duration}),e=Math.max(e,t.get(n).duration)}}null!==n&&(e=Math.max(e,t.get(n).duration)),e+=this.configuration.afterglow;for(let a=0,r=this.meshes.length;a<r;a++){const t=this.objects.get(this.meshes[a]).mixer;if(void 0!==t)for(let s=0,i=t._actions.length;s<i;s++)t._actions[s]._clip.duration=e}if(null!==i){const t=this.objects.get(i).mixer;if(void 0!==t)for(let s=0,i=t._actions.length;s<i;s++)t._actions[s]._clip.duration=e}null!==n&&(n.duration=e)}_updatePropertyMixersBuffer(e){const t=this.objects.get(e).mixer,s=t._bindings,i=t._accuIndex;for(let n=0,a=s.length;n<a;n++){const e=s[n],t=e.buffer,a=e.valueSize,r=(i+1)*a;e.binding.getValue(t,r)}}_saveBones(e){const t=this.objects.get(e),s=e.skeleton.bones;let i=t.backupBones;void 0===i&&(i=new Float32Array(7*s.length),t.backupBones=i);for(let n=0,a=s.length;n<a;n++){const e=s[n];e.position.toArray(i,7*n),e.quaternion.toArray(i,7*n+3)}}_restoreBones(e){const t=this.objects.get(e),s=t.backupBones;if(void 0===s)return;const i=e.skeleton.bones;for(let n=0,a=i.length;n<a;n++){const e=i[n];e.position.fromArray(s,7*n),e.quaternion.fromArray(s,7*n+3)}}_getMasterPhysics(){if(null!==this.masterPhysics)return this.masterPhysics;for(let e=0,t=this.meshes.length;e<t;e++){const t=this.meshes[e].physics;if(void 0!==t&&null!==t)return this.masterPhysics=t,this.masterPhysics}return null}_updateSharedPhysics(e){if(0===this.meshes.length||!this.enabled.physics||!this.sharedPhysics)return;const t=this._getMasterPhysics();if(null!==t){for(let e=0,t=this.meshes.length;e<t;e++){const t=this.meshes[e].physics;null!==t&&void 0!==t&&t.updateRigidBodies()}t.stepSimulation(e);for(let e=0,t=this.meshes.length;e<t;e++){const t=this.meshes[e].physics;null!==t&&void 0!==t&&t.updateBones()}}}}const t=[];let s=0;function i(){return s>=t.length&&t.push(new THREE.Quaternion),t[s++]}const n=new Map;function a(e,t,s,r){const o=e.skeleton.bones,h=e.geometry.userData.MMD.bones,l=h[t],c=o[t];if(n.has(t))return;const u=i();if(n.set(t,u.copy(c.quaternion)),r&&l.grant&&!l.grant.isLocal&&l.grant.affectRotation){const t=l.grant.parentIndex,i=l.grant.ratio;n.has(t)||a(e,t,s,r),r.addGrantRotation(c,n.get(t),i)}if(s&&l.ik){e.updateMatrixWorld(!0),s.updateOne(l.ik);const t=l.ik.links;for(let e=0,s=t.length;e<s;e++){const s=t[e];if(!1===s.enabled)continue;const i=s.index;n.has(i)&&n.set(i,n.get(i).copy(o[i].quaternion))}}u.copy(c.quaternion)}class r{constructor(e,t={}){this.audio=e,this.elapsedTime=0,this.currentTime=0,this.delayTime=void 0!==t.delayTime?t.delayTime:0,this.audioDuration=this.audio.buffer.duration,this.duration=this.audioDuration+this.delayTime}control(e){return this.elapsed+=e,this.currentTime+=e,this._shouldStopAudio()&&this.audio.stop(),this._shouldStartAudio()&&this.audio.play(),this}_shouldStartAudio(){if(this.audio.isPlaying)return!1;while(this.currentTime>=this.duration)this.currentTime-=this.duration;return!(this.currentTime<this.delayTime)&&!(this.currentTime-this.delayTime>this.audioDuration)}_shouldStopAudio(){return this.audio.isPlaying&&this.currentTime>=this.duration}}const o=new THREE.Quaternion;class h{constructor(e,t=[]){this.mesh=e,this.grants=t}update(){const e=this.grants;for(let t=0,s=e.length;t<s;t++)this.updateOne(e[t]);return this}updateOne(e){const t=this.mesh.skeleton.bones,s=t[e.index],i=t[e.parentIndex];return e.isLocal?(e.affectPosition,e.affectRotation):(e.affectPosition,e.affectRotation&&this.addGrantRotation(s,i.quaternion,e.ratio)),this}addGrantRotation(e,t,s){return o.set(0,0,0,1),o.slerp(t,s),e.quaternion.multiply(o),this}}THREE.MMDAnimationHelper=e})();