(function(){function t(t,l,e){const o=e.length-t-1;if(l>=e[o])return o-1;if(l<=e[t])return t;let n=t,c=o,r=Math.floor((n+c)/2);while(l<e[r]||l>=e[r+1])l<e[r]?c=r:n=r,r=Math.floor((n+c)/2);return r}function l(t,l,e,o){const n=[],c=[],r=[];n[0]=1;for(let i=1;i<=e;++i){c[i]=l-o[t+1-i],r[i]=o[t+i]-l;let e=0;for(let t=0;t<i;++t){const l=r[t+1],o=c[i-t],s=n[t]/(l+o);n[t]=e+l*s,e=o*s}n[i]=e}return n}function e(e,o,n,c){const r=t(e,c,o),i=l(r,c,e,o),s=new THREE.Vector4(0,0,0,0);for(let t=0;t<=e;++t){const l=n[r-e+t],o=i[t],c=l.w*o;s.x+=l.x*c,s.y+=l.y*c,s.z+=l.z*c,s.w+=l.w*o}return s}function o(t,l,e,o,n){const c=[];for(let u=0;u<=e;++u)c[u]=0;const r=[];for(let u=0;u<=o;++u)r[u]=c.slice(0);const i=[];for(let u=0;u<=e;++u)i[u]=c.slice(0);i[0][0]=1;const s=c.slice(0),f=c.slice(0);for(let u=1;u<=e;++u){s[u]=l-n[t+1-u],f[u]=n[t+u]-l;let e=0;for(let t=0;t<u;++t){const l=f[t+1],o=s[u-t];i[u][t]=l+o;const n=i[t][u-1]/i[u][t];i[t][u]=e+l*n,e=o*n}i[u][u]=e}for(let u=0;u<=e;++u)r[0][u]=i[u][e];for(let u=0;u<=e;++u){let t=0,l=1;const n=[];for(let o=0;o<=e;++o)n[o]=c.slice(0);n[0][0]=1;for(let c=1;c<=o;++c){let o=0;const s=u-c,f=e-c;u>=c&&(n[l][0]=n[t][0]/i[f+1][s],o=n[l][0]*i[s][f]);const a=s>=-1?1:-s,E=u-1<=f?c-1:e-u;for(let e=a;e<=E;++e)n[l][e]=(n[t][e]-n[t][e-1])/i[f+1][s+e],o+=n[l][e]*i[s+e][f];u<=f&&(n[l][c]=-n[t][c-1]/i[f+1][u],o+=n[l][c]*i[u][f]),r[c][u]=o;const R=t;t=l,l=R}}let a=e;for(let u=1;u<=o;++u){for(let t=0;t<=e;++t)r[u][t]*=a;a*=e-u}return r}function n(l,e,n,c,r){const i=r<l?r:l,s=[],f=t(l,c,e),a=o(f,c,l,i,e),u=[];for(let t=0;t<n.length;++t){const l=n[t].clone(),e=l.w;l.x*=e,l.y*=e,l.z*=e,u[t]=l}for(let t=0;t<=i;++t){const e=u[f-l].clone().multiplyScalar(a[t][0]);for(let o=1;o<=l;++o)e.add(u[f-l+o].clone().multiplyScalar(a[t][o]));s[t]=e}for(let t=i+1;t<=r+1;++t)s[t]=new THREE.Vector4(0,0,0);return s}function c(t,l){let e=1;for(let n=2;n<=t;++n)e*=n;let o=1;for(let n=2;n<=l;++n)o*=n;for(let n=2;n<=t-l;++n)o*=n;return e/o}function r(t){const l=t.length,e=[],o=[];for(let c=0;c<l;++c){const l=t[c];e[c]=new THREE.Vector3(l.x,l.y,l.z),o[c]=l.w}const n=[];for(let r=0;r<l;++r){const t=e[r].clone();for(let l=1;l<=r;++l)t.sub(n[r-l].clone().multiplyScalar(c(r,l)*o[l]));n[r]=t.divideScalar(o[0])}return n}function i(t,l,e,o,c){const i=n(t,l,e,o,c);return r(i)}function s(e,o,n,c,r,i,s,f){const a=t(e,i,n),u=t(o,s,c),E=l(a,i,e,n),R=l(u,s,o,c),S=[];for(let t=0;t<=o;++t){S[t]=new THREE.Vector4(0,0,0,0);for(let l=0;l<=e;++l){const n=r[a-e+l][u-o+t].clone(),c=n.w;n.x*=c,n.y*=c,n.z*=c,S[t].add(n.multiplyScalar(E[l]))}}const U=new THREE.Vector4(0,0,0,0);for(let t=0;t<=o;++t)U.add(S[t].multiplyScalar(R[t]));U.divideScalar(U.w),f.set(U.x,U.y,U.z)}THREE.NURBSUtils={},THREE.NURBSUtils.calcBSplineDerivatives=n,THREE.NURBSUtils.calcBSplinePoint=e,THREE.NURBSUtils.calcBasisFunctionDerivatives=o,THREE.NURBSUtils.calcBasisFunctions=l,THREE.NURBSUtils.calcKoverI=c,THREE.NURBSUtils.calcNURBSDerivatives=i,THREE.NURBSUtils.calcRationalCurveDerivatives=r,THREE.NURBSUtils.calcSurfacePoint=s,THREE.NURBSUtils.findSpan=t})();