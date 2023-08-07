(function(){class e extends THREE.Pass{constructor(e,t,s,r){super(),this.scene=e,this.camera=t,this.sampleLevel=4,this.unbiased=!0,this.clearColor=void 0!==s?s:0,this.clearAlpha=void 0!==r?r:0,this._oldClearColor=new THREE.Color,void 0===THREE.CopyShader&&console.error("THREE.SSAARenderPass relies on THREE.CopyShader");const a=THREE.CopyShader;this.copyUniforms=THREE.UniformsUtils.clone(a.uniforms),this.copyMaterial=new THREE.ShaderMaterial({uniforms:this.copyUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,premultipliedAlpha:!0,transparent:!0,blending:THREE.AdditiveBlending,depthTest:!1,depthWrite:!1}),this.fsQuad=new THREE.FullScreenQuad(this.copyMaterial)}dispose(){this.sampleRenderTarget&&(this.sampleRenderTarget.dispose(),this.sampleRenderTarget=null)}setSize(e,t){this.sampleRenderTarget&&this.sampleRenderTarget.setSize(e,t)}render(e,s,r){this.sampleRenderTarget||(this.sampleRenderTarget=new THREE.WebGLRenderTarget(r.width,r.height,{minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,format:THREE.RGBAFormat}),this.sampleRenderTarget.texture.name="SSAARenderPass.sample");const a=t[Math.max(0,Math.min(this.sampleLevel,5))],i=e.autoClear;e.autoClear=!1,e.getClearColor(this._oldClearColor);const l=e.getClearAlpha(),h=1/a.length,n=1/32;this.copyUniforms["tDiffuse"].value=this.sampleRenderTarget.texture;const o={fullWidth:r.width,fullHeight:r.height,offsetX:0,offsetY:0,width:r.width,height:r.height},d=Object.assign({},this.camera.view);d.enabled&&Object.assign(o,d);for(let t=0;t<a.length;t++){const r=a[t];this.camera.setViewOffset&&this.camera.setViewOffset(o.fullWidth,o.fullHeight,o.offsetX+.0625*r[0],o.offsetY+.0625*r[1],o.width,o.height);let i=h;if(this.unbiased){const e=(t+.5)/a.length-.5;i+=n*e}this.copyUniforms["opacity"].value=i,e.setClearColor(this.clearColor,this.clearAlpha),e.setRenderTarget(this.sampleRenderTarget),e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(this.renderToScreen?null:s),0===t&&(e.setClearColor(0,0),e.clear()),this.fsQuad.render(e)}this.camera.setViewOffset&&d.enabled?this.camera.setViewOffset(d.fullWidth,d.fullHeight,d.offsetX,d.offsetY,d.width,d.height):this.camera.clearViewOffset&&this.camera.clearViewOffset(),e.autoClear=i,e.setClearColor(this._oldClearColor,l)}}const t=[[[0,0]],[[4,4],[-4,-4]],[[-2,-6],[6,-2],[-6,2],[2,6]],[[1,-3],[-1,3],[5,1],[-3,-5],[-5,5],[-7,-1],[3,7],[7,-7]],[[1,1],[-1,-3],[-3,2],[4,-1],[-5,-2],[2,5],[5,3],[3,-5],[-2,6],[0,-7],[-4,-6],[-6,4],[-8,0],[7,-4],[6,7],[-7,-8]],[[-4,-7],[-7,-5],[-3,-5],[-5,-4],[-1,-4],[-2,-2],[-6,-1],[-4,0],[-7,1],[-1,2],[-6,3],[-3,3],[-7,6],[-3,6],[-5,7],[-1,7],[5,-7],[1,-6],[6,-5],[4,-4],[2,-3],[7,-2],[1,-1],[4,-1],[2,1],[6,2],[0,4],[4,4],[2,5],[7,5],[5,6],[3,7]]];THREE.SSAARenderPass=e})();