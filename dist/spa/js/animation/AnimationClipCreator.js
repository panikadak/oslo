(function(){class t{static CreateRotationAnimation(t,n="x"){const e=[0,t],a=[0,360],i=".rotation["+n+"]",r=new THREE.NumberKeyframeTrack(i,e,a);return new THREE.AnimationClip(null,t,[r])}static CreateScaleAxisAnimation(t,n="x"){const e=[0,t],a=[0,1],i=".scale["+n+"]",r=new THREE.NumberKeyframeTrack(i,e,a);return new THREE.AnimationClip(null,t,[r])}static CreateShakeAnimation(t,n){const e=[],a=[],i=new THREE.Vector3;for(let l=0;l<10*t;l++)e.push(l/10),i.set(2*Math.random()-1,2*Math.random()-1,2*Math.random()-1).multiply(n).toArray(a,a.length);const r=".position",o=new THREE.VectorKeyframeTrack(r,e,a);return new THREE.AnimationClip(null,t,[o])}static CreatePulsationAnimation(t,n){const e=[],a=[],i=new THREE.Vector3;for(let l=0;l<10*t;l++){e.push(l/10);const t=Math.random()*n;i.set(t,t,t).toArray(a,a.length)}const r=".scale",o=new THREE.VectorKeyframeTrack(r,e,a);return new THREE.AnimationClip(null,t,[o])}static CreateVisibilityAnimation(t){const n=[0,t/2,t],e=[!0,!1,!0],a=".visible",i=new THREE.BooleanKeyframeTrack(a,n,e);return new THREE.AnimationClip(null,t,[i])}static CreateMaterialColorAnimation(t,n){const e=[],a=[],i=t/n.length;for(let l=0;l<=n.length;l++)e.push(l*i),a.push(n[l%n.length]);const r=".material[0].color",o=new THREE.ColorKeyframeTrack(r,e,a);return new THREE.AnimationClip(null,t,[o])}}THREE.AnimationClipCreator=t})();