(function(){const t=new THREE.Vector3;function e(e,s,a,r,n,i){const o=2*Math.PI*n/4,c=Math.max(i-2*n,0),h=Math.PI/4;t.copy(s),t[r]=0,t.normalize();const u=.5*o/(o+c),y=1-t.angleTo(e)/h;if(1===Math.sign(t[a]))return y*u;{const t=c/(o+c);return t+u+u*(1-y)}}class s extends THREE.BoxGeometry{constructor(t=1,s=1,a=1,r=2,n=.1){if(r=2*r+1,n=Math.min(t/2,s/2,a/2,n),super(1,1,1,r,r,r),1===r)return;const i=this.toNonIndexed();this.index=null,this.attributes.position=i.attributes.position,this.attributes.normal=i.attributes.normal,this.attributes.uv=i.attributes.uv;const o=new THREE.Vector3,c=new THREE.Vector3,h=new THREE.Vector3(t,s,a).divideScalar(2).subScalar(n),u=this.attributes.position.array,y=this.attributes.normal.array,x=this.attributes.uv.array,b=u.length/6,z=new THREE.Vector3,l=.5/r;for(let E=0,M=0;E<u.length;E+=3,M+=2){o.fromArray(u,E),c.copy(o),c.x-=Math.sign(c.x)*l,c.y-=Math.sign(c.y)*l,c.z-=Math.sign(c.z)*l,c.normalize(),u[E+0]=h.x*Math.sign(o.x)+c.x*n,u[E+1]=h.y*Math.sign(o.y)+c.y*n,u[E+2]=h.z*Math.sign(o.z)+c.z*n,y[E+0]=c.x,y[E+1]=c.y,y[E+2]=c.z;const r=Math.floor(E/b);switch(r){case 0:z.set(1,0,0),x[M+0]=e(z,c,"z","y",n,a),x[M+1]=1-e(z,c,"y","z",n,s);break;case 1:z.set(-1,0,0),x[M+0]=1-e(z,c,"z","y",n,a),x[M+1]=1-e(z,c,"y","z",n,s);break;case 2:z.set(0,1,0),x[M+0]=1-e(z,c,"x","z",n,t),x[M+1]=e(z,c,"z","x",n,a);break;case 3:z.set(0,-1,0),x[M+0]=1-e(z,c,"x","z",n,t),x[M+1]=1-e(z,c,"z","x",n,a);break;case 4:z.set(0,0,1),x[M+0]=1-e(z,c,"x","y",n,t),x[M+1]=1-e(z,c,"y","x",n,s);break;case 5:z.set(0,0,-1),x[M+0]=e(z,c,"x","y",n,t),x[M+1]=1-e(z,c,"y","x",n,s);break}}}}THREE.RoundedBoxGeometry=s})();