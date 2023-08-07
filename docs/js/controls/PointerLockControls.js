(function(){const e=new THREE.Euler(0,0,0,"YXZ"),n=new THREE.Vector3,o={type:"change"},t={type:"lock"},r={type:"unlock"},i=Math.PI/2;class c extends THREE.EventDispatcher{constructor(c,m){super(),void 0===m&&(console.warn('THREE.PointerLockControls: The second parameter "domElement" is now mandatory.'),m=document.body),this.domElement=m,this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI;const s=this;function u(n){if(!1===s.isLocked)return;const t=n.movementX||n.mozMovementX||n.webkitMovementX||0,r=n.movementY||n.mozMovementY||n.webkitMovementY||0;e.setFromQuaternion(c.quaternion),e.y-=.002*t,e.x-=.002*r,e.x=Math.max(i-s.maxPolarAngle,Math.min(i-s.minPolarAngle,e.x)),c.quaternion.setFromEuler(e),s.dispatchEvent(o)}function a(){s.domElement.ownerDocument.pointerLockElement===s.domElement?(s.dispatchEvent(t),s.isLocked=!0):(s.dispatchEvent(r),s.isLocked=!1)}function l(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}this.connect=function(){s.domElement.ownerDocument.addEventListener("mousemove",u),s.domElement.ownerDocument.addEventListener("pointerlockchange",a),s.domElement.ownerDocument.addEventListener("pointerlockerror",l)},this.disconnect=function(){s.domElement.ownerDocument.removeEventListener("mousemove",u),s.domElement.ownerDocument.removeEventListener("pointerlockchange",a),s.domElement.ownerDocument.removeEventListener("pointerlockerror",l)},this.dispose=function(){this.disconnect()},this.getObject=function(){return c},this.getDirection=function(){const e=new THREE.Vector3(0,0,-1);return function(n){return n.copy(e).applyQuaternion(c.quaternion)}}(),this.moveForward=function(e){n.setFromMatrixColumn(c.matrix,0),n.crossVectors(c.up,n),c.position.addScaledVector(n,e)},this.moveRight=function(e){n.setFromMatrixColumn(c.matrix,0),c.position.addScaledVector(n,e)},this.lock=function(){this.domElement.requestPointerLock()},this.unlock=function(){s.domElement.ownerDocument.exitPointerLock()},this.connect()}}THREE.PointerLockControls=c})();