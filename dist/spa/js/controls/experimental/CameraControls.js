(function(){var e=function(e,t){void 0===t&&console.warn('THREE.CameraControls: The second parameter "domElement" is now mandatory.'),t===document&&console.error('THREE.CameraControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=e,this.domElement=t,this.enabled=!0,this.target=new THREE.Vector3,this.trackball=!1,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!1,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.enableKeys=!0,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},this.mouseButtons={LEFT:THREE.MOUSE.ROTATE,MIDDLE:THREE.MOUSE.DOLLY,RIGHT:THREE.MOUSE.PAN},this.touches={ONE:THREE.TOUCH.ROTATE,TWO:THREE.TOUCH.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.quaternion0=this.object.quaternion.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=function(){return u.phi},this.getAzimuthalAngle=function(){return u.theta},this.saveState=function(){o.target0.copy(o.target),o.position0.copy(o.object.position),o.quaternion0.copy(o.object.quaternion),o.zoom0=o.object.zoom},this.reset=function(){o.target.copy(o.target0),o.object.position.copy(o.position0),o.object.quaternion.copy(o.quaternion0),o.object.zoom=o.zoom0,o.object.updateProjectionMatrix(),o.dispatchEvent(n),o.update(),r=c.NONE},this.update=function(){var t=new THREE.Vector3,a=(new THREE.Quaternion).setFromUnitVectors(e.up,new THREE.Vector3(0,1,0)),i=a.clone().invert(),h=new THREE.Vector3,d=new THREE.Quaternion,T=new THREE.Quaternion,b=new THREE.Vector3;return function(){var e=o.object.position;if(t.copy(e).sub(o.target),o.trackball){if(l.theta){b.set(0,1,0).applyQuaternion(o.object.quaternion);var O=o.enableDamping?o.dampingFactor:1;T.setFromAxisAngle(b,l.theta*O),o.object.quaternion.premultiply(T),t.applyQuaternion(T)}if(l.phi){b.set(1,0,0).applyQuaternion(o.object.quaternion);O=o.enableDamping?o.dampingFactor:1;T.setFromAxisAngle(b,l.phi*O),o.object.quaternion.premultiply(T),t.applyQuaternion(T)}t.multiplyScalar(E),t.clampLength(o.minDistance,o.maxDistance)}else t.applyQuaternion(a),o.autoRotate&&r===c.NONE&&A(v()),u.setFromVector3(t),o.enableDamping?(u.theta+=l.theta*o.dampingFactor,u.phi+=l.phi*o.dampingFactor):(u.theta+=l.theta,u.phi+=l.phi),u.theta=Math.max(o.minAzimuthAngle,Math.min(o.maxAzimuthAngle,u.theta)),u.phi=Math.max(o.minPolarAngle,Math.min(o.maxPolarAngle,u.phi)),u.makeSafe(),u.radius*=E,u.radius=Math.max(o.minDistance,Math.min(o.maxDistance,u.radius)),t.setFromSpherical(u),t.applyQuaternion(i);return!0===o.enableDamping?o.target.addScaledVector(m,o.dampingFactor):o.target.add(m),e.copy(o.target).add(t),!1===o.trackball&&o.object.lookAt(o.target),!0===o.enableDamping?(l.theta*=1-o.dampingFactor,l.phi*=1-o.dampingFactor,m.multiplyScalar(1-o.dampingFactor)):(l.set(0,0,0),m.set(0,0,0)),E=1,!!(p||h.distanceToSquared(o.object.position)>s||8*(1-d.dot(o.object.quaternion))>s)&&(o.dispatchEvent(n),h.copy(o.object.position),d.copy(o.object.quaternion),p=!1,!0)}}(),this.dispose=function(){o.domElement.removeEventListener("contextmenu",ce,!1),o.domElement.removeEventListener("mousedown",J,!1),o.domElement.removeEventListener("wheel",te,!1),o.domElement.removeEventListener("touchstart",ne,!1),o.domElement.removeEventListener("touchend",ie,!1),o.domElement.removeEventListener("touchmove",ae,!1),document.removeEventListener("mousemove",$,!1),document.removeEventListener("mouseup",ee,!1),o.domElement.removeEventListener("keydown",oe,!1)};var o=this,n={type:"change"},a={type:"start"},i={type:"end"},c={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},r=c.NONE,s=1e-6,u=new THREE.Spherical,l=new THREE.Spherical,E=1,m=new THREE.Vector3,p=!1,h=new THREE.Vector2,d=new THREE.Vector2,T=new THREE.Vector2,b=new THREE.Vector2,O=new THREE.Vector2,f=new THREE.Vector2,R=new THREE.Vector2,g=new THREE.Vector2,H=new THREE.Vector2;function v(){return 2*Math.PI/60/60*o.autoRotateSpeed}function y(){return Math.pow(.95,o.zoomSpeed)}function A(e){l.theta-=e}function L(e){l.phi-=e}var P=function(){var e=new THREE.Vector3;return function(t,o){e.setFromMatrixColumn(o,0),e.multiplyScalar(-t),m.add(e)}}(),N=function(){var e=new THREE.Vector3;return function(t,n){!0===o.screenSpacePanning?e.setFromMatrixColumn(n,1):(e.setFromMatrixColumn(n,0),e.crossVectors(o.object.up,e)),e.multiplyScalar(t),m.add(e)}}(),j=function(){var e=new THREE.Vector3;return function(t,n){var a=o.domElement;if(o.object.isPerspectiveCamera){var i=o.object.position;e.copy(i).sub(o.target);var c=e.length();c*=Math.tan(o.object.fov/2*Math.PI/180),P(2*t*c/a.clientHeight,o.object.matrix),N(2*n*c/a.clientHeight,o.object.matrix)}else o.object.isOrthographicCamera?(P(t*(o.object.right-o.object.left)/o.object.zoom/a.clientWidth,o.object.matrix),N(n*(o.object.top-o.object.bottom)/o.object.zoom/a.clientHeight,o.object.matrix)):(console.warn("WARNING: CameraControls.js encountered an unknown camera type - pan disabled."),o.enablePan=!1)}}();function w(e){o.object.isPerspectiveCamera?E/=e:o.object.isOrthographicCamera?(o.object.zoom=Math.max(o.minZoom,Math.min(o.maxZoom,o.object.zoom*e)),o.object.updateProjectionMatrix(),p=!0):(console.warn("WARNING: CameraControls.js encountered an unknown camera type - dolly/zoom disabled."),o.enableZoom=!1)}function C(e){o.object.isPerspectiveCamera?E*=e:o.object.isOrthographicCamera?(o.object.zoom=Math.max(o.minZoom,Math.min(o.maxZoom,o.object.zoom/e)),o.object.updateProjectionMatrix(),p=!0):(console.warn("WARNING: CameraControls.js encountered an unknown camera type - dolly/zoom disabled."),o.enableZoom=!1)}function k(e){h.set(e.clientX,e.clientY)}function S(e){R.set(e.clientX,e.clientY)}function M(e){b.set(e.clientX,e.clientY)}function D(e){d.set(e.clientX,e.clientY),T.subVectors(d,h).multiplyScalar(o.rotateSpeed);var t=o.domElement;A(2*Math.PI*T.x/t.clientHeight),L(2*Math.PI*T.y/t.clientHeight),h.copy(d),o.update()}function Y(e){g.set(e.clientX,e.clientY),H.subVectors(g,R),H.y>0?w(y()):H.y<0&&C(y()),R.copy(g),o.update()}function U(e){O.set(e.clientX,e.clientY),f.subVectors(O,b).multiplyScalar(o.panSpeed),j(f.x,f.y),b.copy(O),o.update()}function x(){}function V(e){e.deltaY<0?C(y()):e.deltaY>0&&w(y()),o.update()}function F(e){var t=!1;switch(e.keyCode){case o.keys.UP:j(0,o.keyPanSpeed),t=!0;break;case o.keys.BOTTOM:j(0,-o.keyPanSpeed),t=!0;break;case o.keys.LEFT:j(o.keyPanSpeed,0),t=!0;break;case o.keys.RIGHT:j(-o.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),o.update())}function _(e){if(1==e.touches.length)h.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),o=.5*(e.touches[0].pageY+e.touches[1].pageY);h.set(t,o)}}function z(e){if(1==e.touches.length)b.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),o=.5*(e.touches[0].pageY+e.touches[1].pageY);b.set(t,o)}}function X(e){var t=e.touches[0].pageX-e.touches[1].pageX,o=e.touches[0].pageY-e.touches[1].pageY,n=Math.sqrt(t*t+o*o);R.set(0,n)}function I(e){o.enableZoom&&X(e),o.enablePan&&z(e)}function Z(e){o.enableZoom&&X(e),o.enableRotate&&_(e)}function q(e){if(1==e.touches.length)d.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),n=.5*(e.touches[0].pageY+e.touches[1].pageY);d.set(t,n)}T.subVectors(d,h).multiplyScalar(o.rotateSpeed);var a=o.domElement;A(2*Math.PI*T.x/a.clientHeight),L(2*Math.PI*T.y/a.clientHeight),h.copy(d)}function B(e){if(1==e.touches.length)O.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),n=.5*(e.touches[0].pageY+e.touches[1].pageY);O.set(t,n)}f.subVectors(O,b).multiplyScalar(o.panSpeed),j(f.x,f.y),b.copy(O)}function G(e){var t=e.touches[0].pageX-e.touches[1].pageX,n=e.touches[0].pageY-e.touches[1].pageY,a=Math.sqrt(t*t+n*n);g.set(0,a),H.set(0,Math.pow(g.y/R.y,o.zoomSpeed)),w(H.y),R.copy(g)}function Q(e){o.enableZoom&&G(e),o.enablePan&&B(e)}function W(e){o.enableZoom&&G(e),o.enableRotate&&q(e)}function K(){}function J(e){if(!1!==o.enabled){var t;switch(e.preventDefault(),o.domElement.focus?o.domElement.focus():window.focus(),e.button){case 0:t=o.mouseButtons.LEFT;break;case 1:t=o.mouseButtons.MIDDLE;break;case 2:t=o.mouseButtons.RIGHT;break;default:t=-1}switch(t){case THREE.MOUSE.DOLLY:if(!1===o.enableZoom)return;S(e),r=c.DOLLY;break;case THREE.MOUSE.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===o.enablePan)return;M(e),r=c.PAN}else{if(!1===o.enableRotate)return;k(e),r=c.ROTATE}break;case THREE.MOUSE.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===o.enableRotate)return;k(e),r=c.ROTATE}else{if(!1===o.enablePan)return;M(e),r=c.PAN}break;default:r=c.NONE}r!==c.NONE&&(document.addEventListener("mousemove",$,!1),document.addEventListener("mouseup",ee,!1),o.dispatchEvent(a))}}function $(e){if(!1!==o.enabled)switch(e.preventDefault(),r){case c.ROTATE:if(!1===o.enableRotate)return;D(e);break;case c.DOLLY:if(!1===o.enableZoom)return;Y(e);break;case c.PAN:if(!1===o.enablePan)return;U(e);break}}function ee(e){!1!==o.enabled&&(x(e),document.removeEventListener("mousemove",$,!1),document.removeEventListener("mouseup",ee,!1),o.dispatchEvent(i),r=c.NONE)}function te(e){!1===o.enabled||!1===o.enableZoom||r!==c.NONE&&r!==c.ROTATE||(e.preventDefault(),e.stopPropagation(),o.dispatchEvent(a),V(e),o.dispatchEvent(i))}function oe(e){!1!==o.enabled&&!1!==o.enableKeys&&!1!==o.enablePan&&F(e)}function ne(e){if(!1!==o.enabled){switch(e.preventDefault(),e.touches.length){case 1:switch(o.touches.ONE){case THREE.TOUCH.ROTATE:if(!1===o.enableRotate)return;_(e),r=c.TOUCH_ROTATE;break;case THREE.TOUCH.PAN:if(!1===o.enablePan)return;z(e),r=c.TOUCH_PAN;break;default:r=c.NONE}break;case 2:switch(o.touches.TWO){case THREE.TOUCH.DOLLY_PAN:if(!1===o.enableZoom&&!1===o.enablePan)return;I(e),r=c.TOUCH_DOLLY_PAN;break;case THREE.TOUCH.DOLLY_ROTATE:if(!1===o.enableZoom&&!1===o.enableRotate)return;Z(e),r=c.TOUCH_DOLLY_ROTATE;break;default:r=c.NONE}break;default:r=c.NONE}r!==c.NONE&&o.dispatchEvent(a)}}function ae(e){if(!1!==o.enabled)switch(e.preventDefault(),e.stopPropagation(),r){case c.TOUCH_ROTATE:if(!1===o.enableRotate)return;q(e),o.update();break;case c.TOUCH_PAN:if(!1===o.enablePan)return;B(e),o.update();break;case c.TOUCH_DOLLY_PAN:if(!1===o.enableZoom&&!1===o.enablePan)return;Q(e),o.update();break;case c.TOUCH_DOLLY_ROTATE:if(!1===o.enableZoom&&!1===o.enableRotate)return;W(e),o.update();break;default:r=c.NONE}}function ie(e){!1!==o.enabled&&(K(e),o.dispatchEvent(i),r=c.NONE)}function ce(e){!1!==o.enabled&&e.preventDefault()}o.domElement.addEventListener("contextmenu",ce,!1),o.domElement.addEventListener("mousedown",J,!1),o.domElement.addEventListener("wheel",te,!1),o.domElement.addEventListener("touchstart",ne,!1),o.domElement.addEventListener("touchend",ie,!1),o.domElement.addEventListener("touchmove",ae,!1),o.domElement.addEventListener("keydown",oe,!1),-1===o.domElement.tabIndex&&(o.domElement.tabIndex=0),this.object.lookAt(o.target),this.update(),this.saveState()};e.prototype=Object.create(THREE.EventDispatcher.prototype),e.prototype.constructor=e;var t=function(t,o){e.call(this,t,o),this.mouseButtons.LEFT=THREE.MOUSE.ROTATE,this.mouseButtons.RIGHT=THREE.MOUSE.PAN,this.touches.ONE=THREE.TOUCH.ROTATE,this.touches.TWO=THREE.TOUCH.DOLLY_PAN};t.prototype=Object.create(THREE.EventDispatcher.prototype),t.prototype.constructor=t;var o=function(t,o){e.call(this,t,o),this.mouseButtons.LEFT=THREE.MOUSE.PAN,this.mouseButtons.RIGHT=THREE.MOUSE.ROTATE,this.touches.ONE=THREE.TOUCH.PAN,this.touches.TWO=THREE.TOUCH.DOLLY_ROTATE};o.prototype=Object.create(THREE.EventDispatcher.prototype),o.prototype.constructor=o;var n=function(t,o){e.call(this,t,o),this.trackball=!0,this.screenSpacePanning=!0,this.autoRotate=!1,this.mouseButtons.LEFT=THREE.MOUSE.ROTATE,this.mouseButtons.RIGHT=THREE.MOUSE.PAN,this.touches.ONE=THREE.TOUCH.ROTATE,this.touches.TWO=THREE.TOUCH.DOLLY_PAN};n.prototype=Object.create(THREE.EventDispatcher.prototype),n.prototype.constructor=n,THREE.CameraControls=e,THREE.MapControls=o,THREE.OrbitControls=t,THREE.TrackballControls=n})();