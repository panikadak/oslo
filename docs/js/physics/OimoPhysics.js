(function(){async function e(){const e=60,t=new OIMO.World(2,new OIMO.Vec3(0,-9.8,0));function o(e){const n=e.parameters;if("BoxGeometry"===e.type){const e=void 0!==n.width?n.width/2:.5,t=void 0!==n.height?n.height/2:.5,o=void 0!==n.depth?n.depth/2:.5;return new OIMO.OBoxGeometry(new OIMO.Vec3(e,t,o))}if("SphereGeometry"===e.type||"IcosahedronGeometry"===e.type){const e=void 0!==n.radius?n.radius:1;return new OIMO.OSphereGeometry(e)}return null}const i=[],s=new WeakMap;function c(e,n=0){const t=o(e.geometry);null!==t&&(e.isInstancedMesh?O(e,n,t):e.isMesh&&d(e,n,t))}function d(e,n,o){const c=new OIMO.ShapeConfig;c.geometry=o;const d=new OIMO.RigidBodyConfig;d.type=0===n?OIMO.RigidBodyType.STATIC:OIMO.RigidBodyType.DYNAMIC,d.position=new OIMO.Vec3(e.position.x,e.position.y,e.position.z);const O=new OIMO.RigidBody(d);O.addShape(new OIMO.Shape(c)),t.addRigidBody(O),n>0&&(i.push(e),s.set(e,O))}function O(e,n,o){const c=e.instanceMatrix.array,d=[];for(let i=0;i<e.count;i++){const e=16*i,s=new OIMO.ShapeConfig;s.geometry=o;const O=new OIMO.RigidBodyConfig;O.type=0===n?OIMO.RigidBodyType.STATIC:OIMO.RigidBodyType.DYNAMIC,O.position=new OIMO.Vec3(c[e+12],c[e+13],c[e+14]);const r=new OIMO.RigidBody(O);r.addShape(new OIMO.Shape(s)),t.addRigidBody(r),d.push(r)}n>0&&(i.push(e),s.set(e,d))}function r(e,n,t=0){if(e.isInstancedMesh){const o=s.get(e),i=o[t];i.setPosition(new OIMO.Vec3(n.x,n.y,n.z))}else if(e.isMesh){const t=s.get(e);t.setPosition(new OIMO.Vec3(n.x,n.y,n.z))}}let a=0;function y(){const o=performance.now();a>0&&t.step(1/e),a=o;for(let e=0,t=i.length;e<t;e++){const t=i[e];if(t.isInstancedMesh){const e=t.instanceMatrix.array,o=s.get(t);for(let t=0;t<o.length;t++){const i=o[t];n(i.getPosition(),i.getOrientation(),e,16*t)}t.instanceMatrix.needsUpdate=!0}else if(t.isMesh){const e=s.get(t);t.position.copy(e.getPosition()),t.quaternion.copy(e.getOrientation())}}}return setInterval(y,1e3/e),{addMesh:c,setMeshPosition:r}}function n(e,n,t,o){const i=n.x,s=n.y,c=n.z,d=n.w,O=i+i,r=s+s,a=c+c,y=i*O,p=i*r,M=i*a,h=s*r,I=s*a,g=c*a,f=d*O,u=d*r,w=d*a;t[o+0]=1-(h+g),t[o+1]=p+w,t[o+2]=M-u,t[o+3]=0,t[o+4]=p-w,t[o+5]=1-(y+g),t[o+6]=I+f,t[o+7]=0,t[o+8]=M+u,t[o+9]=I-f,t[o+10]=1-(y+h),t[o+11]=0,t[o+12]=e.x,t[o+13]=e.y,t[o+14]=e.z,t[o+15]=1}THREE.OimoPhysics=e})();