(function(){class t{parse(t){let e="",o=0,r=0,n=0;const i=new THREE.Vector3,f=new THREE.Color,l=new THREE.Vector3,u=new THREE.Vector2,a=[];function m(t){let f=0,m=0,E=0;const s=t.geometry,c=new THREE.Matrix3;if(!0!==s.isBufferGeometry)throw new Error("THREE.OBJExporter: Geometry is not of type THREE.BufferGeometry.");const y=s.getAttribute("position"),g=s.getAttribute("normal"),x=s.getAttribute("uv"),p=s.getIndex();if(e+="o "+t.name+"\n",t.material&&t.material.name&&(e+="usemtl "+t.material.name+"\n"),void 0!==y)for(let o=0,r=y.count;o<r;o++,f++)i.x=y.getX(o),i.y=y.getY(o),i.z=y.getZ(o),i.applyMatrix4(t.matrixWorld),e+="v "+i.x+" "+i.y+" "+i.z+"\n";if(void 0!==x)for(let o=0,r=x.count;o<r;o++,E++)u.x=x.getX(o),u.y=x.getY(o),e+="vt "+u.x+" "+u.y+"\n";if(void 0!==g){c.getNormalMatrix(t.matrixWorld);for(let t=0,o=g.count;t<o;t++,m++)l.x=g.getX(t),l.y=g.getY(t),l.z=g.getZ(t),l.applyMatrix3(c).normalize(),e+="vn "+l.x+" "+l.y+" "+l.z+"\n"}if(null!==p)for(let i=0,l=p.count;i<l;i+=3){for(let t=0;t<3;t++){const e=p.getX(i+t)+1;a[t]=o+e+(g||x?"/"+(x?r+e:"")+(g?"/"+(n+e):""):"")}e+="f "+a.join(" ")+"\n"}else for(let i=0,l=y.count;i<l;i+=3){for(let t=0;t<3;t++){const e=i+t+1;a[t]=o+e+(g||x?"/"+(x?r+e:"")+(g?"/"+(n+e):""):"")}e+="f "+a.join(" ")+"\n"}o+=f,r+=E,n+=m}function E(t){let r=0;const n=t.geometry,f=t.type;if(!0!==n.isBufferGeometry)throw new Error("THREE.OBJExporter: Geometry is not of type THREE.BufferGeometry.");const l=n.getAttribute("position");if(e+="o "+t.name+"\n",void 0!==l)for(let o=0,u=l.count;o<u;o++,r++)i.x=l.getX(o),i.y=l.getY(o),i.z=l.getZ(o),i.applyMatrix4(t.matrixWorld),e+="v "+i.x+" "+i.y+" "+i.z+"\n";if("Line"===f){e+="l ";for(let t=1,r=l.count;t<=r;t++)e+=o+t+" ";e+="\n"}if("LineSegments"===f)for(let i=1,u=i+1,a=l.count;i<a;i+=2,u=i+1)e+="l "+(o+i)+" "+(o+u)+"\n";o+=r}function s(t){let r=0;const n=t.geometry;if(!0!==n.isBufferGeometry)throw new Error("THREE.OBJExporter: Geometry is not of type THREE.BufferGeometry.");const l=n.getAttribute("position"),u=n.getAttribute("color");if(e+="o "+t.name+"\n",void 0!==l)for(let o=0,a=l.count;o<a;o++,r++)i.fromBufferAttribute(l,o),i.applyMatrix4(t.matrixWorld),e+="v "+i.x+" "+i.y+" "+i.z,void 0!==u&&(f.fromBufferAttribute(u,o),e+=" "+f.r+" "+f.g+" "+f.b),e+="\n";e+="p ";for(let i=1,f=l.count;i<=f;i++)e+=o+i+" ";e+="\n",o+=r}return t.traverse((function(t){!0===t.isMesh&&m(t),!0===t.isLine&&E(t),!0===t.isPoints&&s(t)})),e}}THREE.OBJExporter=t})();