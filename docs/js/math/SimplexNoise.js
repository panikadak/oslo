(function(){class t{constructor(t=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let s=0;s<256;s++)this.p[s]=Math.floor(256*t.random());this.perm=[];for(let s=0;s<512;s++)this.perm[s]=this.p[255&s];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(t,s,h){return t[0]*s+t[1]*h}dot3(t,s,h,r){return t[0]*s+t[1]*h+t[2]*r}dot4(t,s,h,r,i){return t[0]*s+t[1]*h+t[2]*r+t[3]*i}noise(t,s){let h,r,i;const e=.5*(Math.sqrt(3)-1),o=(t+s)*e,l=Math.floor(t+o),d=Math.floor(s+o),a=(3-Math.sqrt(3))/6,p=(l+d)*a,m=l-p,n=d-p,M=t-m,f=s-n;let c,g;M>f?(c=1,g=0):(c=0,g=1);const u=M-c+a,q=f-g+a,x=M-1+2*a,E=f-1+2*a,H=255&l,N=255&d,R=this.perm[H+this.perm[N]]%12,S=this.perm[H+c+this.perm[N+g]]%12,T=this.perm[H+1+this.perm[N+1]]%12;let b=.5-M*M-f*f;b<0?h=0:(b*=b,h=b*b*this.dot(this.grad3[R],M,f));let j=.5-u*u-q*q;j<0?r=0:(j*=j,r=j*j*this.dot(this.grad3[S],u,q));let k=.5-x*x-E*E;return k<0?i=0:(k*=k,i=k*k*this.dot(this.grad3[T],x,E)),70*(h+r+i)}noise3d(t,s,h){let r,i,e,o;const l=1/3,d=(t+s+h)*l,a=Math.floor(t+d),p=Math.floor(s+d),m=Math.floor(h+d),n=1/6,M=(a+p+m)*n,f=a-M,c=p-M,g=m-M,u=t-f,q=s-c,x=h-g;let E,H,N,R,S,T;u>=q?q>=x?(E=1,H=0,N=0,R=1,S=1,T=0):u>=x?(E=1,H=0,N=0,R=1,S=0,T=1):(E=0,H=0,N=1,R=1,S=0,T=1):q<x?(E=0,H=0,N=1,R=0,S=1,T=1):u<x?(E=0,H=1,N=0,R=0,S=1,T=1):(E=0,H=1,N=0,R=1,S=1,T=0);const b=u-E+n,j=q-H+n,k=x-N+n,v=u-R+2*n,w=q-S+2*n,y=x-T+2*n,z=u-1+3*n,A=q-1+3*n,B=x-1+3*n,C=255&a,D=255&p,F=255&m,G=this.perm[C+this.perm[D+this.perm[F]]]%12,I=this.perm[C+E+this.perm[D+H+this.perm[F+N]]]%12,J=this.perm[C+R+this.perm[D+S+this.perm[F+T]]]%12,K=this.perm[C+1+this.perm[D+1+this.perm[F+1]]]%12;let L=.6-u*u-q*q-x*x;L<0?r=0:(L*=L,r=L*L*this.dot3(this.grad3[G],u,q,x));let O=.6-b*b-j*j-k*k;O<0?i=0:(O*=O,i=O*O*this.dot3(this.grad3[I],b,j,k));let P=.6-v*v-w*w-y*y;P<0?e=0:(P*=P,e=P*P*this.dot3(this.grad3[J],v,w,y));let Q=.6-z*z-A*A-B*B;return Q<0?o=0:(Q*=Q,o=Q*Q*this.dot3(this.grad3[K],z,A,B)),32*(r+i+e+o)}noise4d(t,s,h,r){const i=this.grad4,e=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,d=(5-Math.sqrt(5))/20;let a,p,m,n,M;const f=(t+s+h+r)*l,c=Math.floor(t+f),g=Math.floor(s+f),u=Math.floor(h+f),q=Math.floor(r+f),x=(c+g+u+q)*d,E=c-x,H=g-x,N=u-x,R=q-x,S=t-E,T=s-H,b=h-N,j=r-R,k=S>T?32:0,v=S>b?16:0,w=T>b?8:0,y=S>j?4:0,z=T>j?2:0,A=b>j?1:0,B=k+v+w+y+z+A,C=e[B][0]>=3?1:0,D=e[B][1]>=3?1:0,F=e[B][2]>=3?1:0,G=e[B][3]>=3?1:0,I=e[B][0]>=2?1:0,J=e[B][1]>=2?1:0,K=e[B][2]>=2?1:0,L=e[B][3]>=2?1:0,O=e[B][0]>=1?1:0,P=e[B][1]>=1?1:0,Q=e[B][2]>=1?1:0,U=e[B][3]>=1?1:0,V=S-C+d,W=T-D+d,X=b-F+d,Y=j-G+d,Z=S-I+2*d,$=T-J+2*d,_=b-K+2*d,tt=j-L+2*d,st=S-O+3*d,ht=T-P+3*d,rt=b-Q+3*d,it=j-U+3*d,et=S-1+4*d,ot=T-1+4*d,lt=b-1+4*d,dt=j-1+4*d,at=255&c,pt=255&g,mt=255&u,nt=255&q,Mt=o[at+o[pt+o[mt+o[nt]]]]%32,ft=o[at+C+o[pt+D+o[mt+F+o[nt+G]]]]%32,ct=o[at+I+o[pt+J+o[mt+K+o[nt+L]]]]%32,gt=o[at+O+o[pt+P+o[mt+Q+o[nt+U]]]]%32,ut=o[at+1+o[pt+1+o[mt+1+o[nt+1]]]]%32;let qt=.6-S*S-T*T-b*b-j*j;qt<0?a=0:(qt*=qt,a=qt*qt*this.dot4(i[Mt],S,T,b,j));let xt=.6-V*V-W*W-X*X-Y*Y;xt<0?p=0:(xt*=xt,p=xt*xt*this.dot4(i[ft],V,W,X,Y));let Et=.6-Z*Z-$*$-_*_-tt*tt;Et<0?m=0:(Et*=Et,m=Et*Et*this.dot4(i[ct],Z,$,_,tt));let Ht=.6-st*st-ht*ht-rt*rt-it*it;Ht<0?n=0:(Ht*=Ht,n=Ht*Ht*this.dot4(i[gt],st,ht,rt,it));let Nt=.6-et*et-ot*ot-lt*lt-dt*dt;return Nt<0?M=0:(Nt*=Nt,M=Nt*Nt*this.dot4(i[ut],et,ot,lt,dt)),27*(a+p+m+n+M)}}THREE.SimplexNoise=t})();