(function(){class t extends THREE.CompressedTextureLoader{constructor(t){super(t)}parse(t,e){const r=new i(t,1);return{mipmaps:r.mipmaps(e),width:r.pixelWidth,height:r.pixelHeight,format:r.glInternalFormat,isCubemap:6===r.numberOfFaces,mipmapCount:r.numberOfMipmapLevels}}}const e=64,r=0;class i{constructor(t,e){this.arrayBuffer=t;const i=new Uint8Array(this.arrayBuffer,0,12);if(171!==i[0]||75!==i[1]||84!==i[2]||88!==i[3]||32!==i[4]||49!==i[5]||49!==i[6]||187!==i[7]||13!==i[8]||10!==i[9]||26!==i[10]||10!==i[11])return void console.error("texture missing KTX identifier");const s=Uint32Array.BYTES_PER_ELEMENT,n=new DataView(this.arrayBuffer,12,13*s),a=n.getUint32(0,!0),h=67305985===a;this.glType=n.getUint32(1*s,h),this.glTypeSize=n.getUint32(2*s,h),this.glFormat=n.getUint32(3*s,h),this.glInternalFormat=n.getUint32(4*s,h),this.glBaseInternalFormat=n.getUint32(5*s,h),this.pixelWidth=n.getUint32(6*s,h),this.pixelHeight=n.getUint32(7*s,h),this.pixelDepth=n.getUint32(8*s,h),this.numberOfArrayElements=n.getUint32(9*s,h),this.numberOfFaces=n.getUint32(10*s,h),this.numberOfMipmapLevels=n.getUint32(11*s,h),this.bytesOfKeyValueData=n.getUint32(12*s,h),0===this.glType?(this.numberOfMipmapLevels=Math.max(1,this.numberOfMipmapLevels),0!==this.pixelHeight&&0===this.pixelDepth?0===this.numberOfArrayElements?this.numberOfFaces===e?this.loadType=r:console.warn("number of faces expected"+e+", but found "+this.numberOfFaces):console.warn("texture arrays not currently supported"):console.warn("only 2D textures currently supported")):console.warn("only compressed formats currently supported")}mipmaps(t){const r=[];let i=e+this.bytesOfKeyValueData,s=this.pixelWidth,n=this.pixelHeight;const a=t?this.numberOfMipmapLevels:1;for(let e=0;e<a;e++){const t=new Int32Array(this.arrayBuffer,i,1)[0];i+=4;for(let e=0;e<this.numberOfFaces;e++){const e=new Uint8Array(this.arrayBuffer,i,t);r.push({data:e,width:s,height:n}),i+=t,i+=3-(t+3)%4}s=Math.max(1,.5*s),n=Math.max(1,.5*n)}return r}}THREE.KTXLoader=t})();