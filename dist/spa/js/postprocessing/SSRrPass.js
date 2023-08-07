(function(){class e extends THREE.Pass{constructor({renderer:e,scene:r,camera:t,width:a,height:s,selects:i}){super(),this.width=void 0!==a?a:512,this.height=void 0!==s?s:512,this.clear=!0,this.renderer=e,this.scene=r,this.camera=t,this.output=0,this.ior=THREE.SSRrShader.uniforms.ior.value,this.maxDistance=THREE.SSRrShader.uniforms.maxDistance.value,this.surfDist=THREE.SSRrShader.uniforms.surfDist.value,this.tempColor=new THREE.Color,this.selects=i,this._specular=THREE.SSRrShader.defines.SPECULAR,Object.defineProperty(this,"specular",{get(){return this._specular},set(e){this._specular!==e&&(this._specular=e,this.ssrrMaterial.defines.SPECULAR=e,this.ssrrMaterial.needsUpdate=!0)}}),this._fillHole=THREE.SSRrShader.defines.FILL_HOLE,Object.defineProperty(this,"fillHole",{get(){return this._fillHole},set(e){this._fillHole!==e&&(this._fillHole=e,this.ssrrMaterial.defines.FILL_HOLE=e,this.ssrrMaterial.needsUpdate=!0)}}),this._infiniteThick=THREE.SSRrShader.defines.INFINITE_THICK,Object.defineProperty(this,"infiniteThick",{get(){return this._infiniteThick},set(e){this._infiniteThick!==e&&(this._infiniteThick=e,this.ssrrMaterial.defines.INFINITE_THICK=e,this.ssrrMaterial.needsUpdate=!0)}});const l=new THREE.DepthTexture;l.type=THREE.UnsignedShortType,l.minFilter=THREE.NearestFilter,l.magFilter=THREE.NearestFilter,this.beautyRenderTarget=new THREE.WebGLRenderTarget(this.width,this.height,{minFilter:THREE.NearestFilter,magFilter:THREE.NearestFilter,format:THREE.RGBAFormat,depthTexture:l,depthBuffer:!0}),this.specularRenderTarget=new THREE.WebGLRenderTarget(this.width,this.height,{minFilter:THREE.NearestFilter,magFilter:THREE.NearestFilter,format:THREE.RGBAFormat});const h=new THREE.DepthTexture;h.type=THREE.UnsignedShortType,h.minFilter=THREE.NearestFilter,h.magFilter=THREE.NearestFilter,this.normalSelectsRenderTarget=new THREE.WebGLRenderTarget(this.width,this.height,{minFilter:THREE.NearestFilter,magFilter:THREE.NearestFilter,format:THREE.RGBAFormat,type:THREE.HalfFloatType,depthTexture:h,depthBuffer:!0}),this.refractiveRenderTarget=new THREE.WebGLRenderTarget(this.width,this.height,{minFilter:THREE.NearestFilter,magFilter:THREE.NearestFilter,format:THREE.RGBAFormat}),this.ssrrRenderTarget=new THREE.WebGLRenderTarget(this.width,this.height,{minFilter:THREE.NearestFilter,magFilter:THREE.NearestFilter,format:THREE.RGBAFormat}),void 0===THREE.SSRrShader&&console.error("THREE.SSRrPass: The pass relies on THREE.SSRrShader."),this.ssrrMaterial=new THREE.ShaderMaterial({defines:Object.assign({},THREE.SSRrShader.defines,{MAX_STEP:Math.sqrt(this.width*this.width+this.height*this.height)}),uniforms:THREE.UniformsUtils.clone(THREE.SSRrShader.uniforms),vertexShader:THREE.SSRrShader.vertexShader,fragmentShader:THREE.SSRrShader.fragmentShader,blending:THREE.NoBlending}),this.ssrrMaterial.uniforms["tDiffuse"].value=this.beautyRenderTarget.texture,this.ssrrMaterial.uniforms["tSpecular"].value=this.specularRenderTarget.texture,this.ssrrMaterial.uniforms["tNormalSelects"].value=this.normalSelectsRenderTarget.texture,this.ssrrMaterial.needsUpdate=!0,this.ssrrMaterial.uniforms["tRefractive"].value=this.refractiveRenderTarget.texture,this.ssrrMaterial.uniforms["tDepth"].value=this.beautyRenderTarget.depthTexture,this.ssrrMaterial.uniforms["tDepthSelects"].value=this.normalSelectsRenderTarget.depthTexture,this.ssrrMaterial.uniforms["cameraNear"].value=this.camera.near,this.ssrrMaterial.uniforms["cameraFar"].value=this.camera.far,this.ssrrMaterial.uniforms["resolution"].value.set(this.width,this.height),this.ssrrMaterial.uniforms["cameraProjectionMatrix"].value.copy(this.camera.projectionMatrix),this.ssrrMaterial.uniforms["cameraInverseProjectionMatrix"].value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new THREE.MeshNormalMaterial,this.normalMaterial.blending=THREE.NoBlending,this.refractiveOnMaterial=new THREE.MeshBasicMaterial({color:"white"}),this.refractiveOffMaterial=new THREE.MeshBasicMaterial({color:"black"}),this.specularMaterial=new THREE.MeshStandardMaterial({color:"black",metalness:0,roughness:.2}),this.depthRenderMaterial=new THREE.ShaderMaterial({defines:Object.assign({},THREE.SSRrDepthShader.defines),uniforms:THREE.UniformsUtils.clone(THREE.SSRrDepthShader.uniforms),vertexShader:THREE.SSRrDepthShader.vertexShader,fragmentShader:THREE.SSRrDepthShader.fragmentShader,blending:THREE.NoBlending}),this.depthRenderMaterial.uniforms["tDepth"].value=this.beautyRenderTarget.depthTexture,this.depthRenderMaterial.uniforms["cameraNear"].value=this.camera.near,this.depthRenderMaterial.uniforms["cameraFar"].value=this.camera.far,this.copyMaterial=new THREE.ShaderMaterial({uniforms:THREE.UniformsUtils.clone(THREE.CopyShader.uniforms),vertexShader:THREE.CopyShader.vertexShader,fragmentShader:THREE.CopyShader.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:THREE.SrcAlphaFactor,blendDst:THREE.OneMinusSrcAlphaFactor,blendEquation:THREE.AddEquation,blendSrcAlpha:THREE.SrcAlphaFactor,blendDstAlpha:THREE.OneMinusSrcAlphaFactor,blendEquationAlpha:THREE.AddEquation}),this.fsQuad=new THREE.FullScreenQuad(null),this.originalClearColor=new THREE.Color}dispose(){this.beautyRenderTarget.dispose(),this.specularRenderTarget.dispose(),this.normalSelectsRenderTarget.dispose(),this.refractiveRenderTarget.dispose(),this.ssrrRenderTarget.dispose(),this.normalMaterial.dispose(),this.refractiveOnMaterial.dispose(),this.refractiveOffMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}render(r,t){switch(r.setRenderTarget(this.beautyRenderTarget),r.clear(),this.scene.children.forEach((e=>{this.selects.includes(e)?e.visible=!1:e.visible=!0})),r.render(this.scene,this.camera),r.setRenderTarget(this.specularRenderTarget),r.clear(),this.scene.children.forEach((e=>{this.selects.includes(e)?(e.visible=!0,e._SSRrPassBackupMaterial=e.material,e.material=this.specularMaterial):e.isLight||(e.visible=!1)})),r.render(this.scene,this.camera),this.scene.children.forEach((e=>{this.selects.includes(e)&&(e.material=e._SSRrPassBackupMaterial)})),this.scene.children.forEach((e=>{this.selects.includes(e)?e.visible=!0:e.visible=!1})),this.renderOverride(r,this.normalMaterial,this.normalSelectsRenderTarget,0,0),this.renderRefractive(r,this.refractiveOnMaterial,this.refractiveRenderTarget,0,0),this.ssrrMaterial.uniforms["ior"].value=this.ior,this.ssrrMaterial.uniforms["maxDistance"].value=this.maxDistance,this.ssrrMaterial.uniforms["surfDist"].value=this.surfDist,this.ssrrMaterial.uniforms["tSpecular"].value=this.specularRenderTarget.texture,this.renderPass(r,this.ssrrMaterial,this.ssrrRenderTarget),this.output){case e.OUTPUT.Default:this.copyMaterial.uniforms["tDiffuse"].value=this.beautyRenderTarget.texture,this.copyMaterial.blending=THREE.NoBlending,this.renderPass(r,this.copyMaterial,this.renderToScreen?null:t),this.copyMaterial.uniforms["tDiffuse"].value=this.ssrrRenderTarget.texture,this.copyMaterial.blending=THREE.NormalBlending,this.renderPass(r,this.copyMaterial,this.renderToScreen?null:t);break;case e.OUTPUT.SSRr:this.copyMaterial.uniforms["tDiffuse"].value=this.ssrrRenderTarget.texture,this.copyMaterial.blending=THREE.NoBlending,this.renderPass(r,this.copyMaterial,this.renderToScreen?null:t);break;case e.OUTPUT.Beauty:this.copyMaterial.uniforms["tDiffuse"].value=this.beautyRenderTarget.texture,this.copyMaterial.blending=THREE.NoBlending,this.renderPass(r,this.copyMaterial,this.renderToScreen?null:t);break;case e.OUTPUT.Depth:this.depthRenderMaterial.uniforms["tDepth"].value=this.beautyRenderTarget.depthTexture,this.renderPass(r,this.depthRenderMaterial,this.renderToScreen?null:t);break;case e.OUTPUT.DepthSelects:this.depthRenderMaterial.uniforms["tDepth"].value=this.normalSelectsRenderTarget.depthTexture,this.renderPass(r,this.depthRenderMaterial,this.renderToScreen?null:t);break;case e.OUTPUT.NormalSelects:this.copyMaterial.uniforms["tDiffuse"].value=this.normalSelectsRenderTarget.texture,this.copyMaterial.blending=THREE.NoBlending,this.renderPass(r,this.copyMaterial,this.renderToScreen?null:t);break;case e.OUTPUT.Refractive:this.copyMaterial.uniforms["tDiffuse"].value=this.refractiveRenderTarget.texture,this.copyMaterial.blending=THREE.NoBlending,this.renderPass(r,this.copyMaterial,this.renderToScreen?null:t);break;case e.OUTPUT.Specular:this.copyMaterial.uniforms["tDiffuse"].value=this.specularRenderTarget.texture,this.copyMaterial.blending=THREE.NoBlending,this.renderPass(r,this.copyMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.SSRrPass: Unknown output type.")}}renderPass(e,r,t,a,s){this.originalClearColor.copy(e.getClearColor(this.tempColor));const i=e.getClearAlpha(this.tempColor),l=e.autoClear;e.setRenderTarget(t),e.autoClear=!1,void 0!==a&&null!==a&&(e.setClearColor(a),e.setClearAlpha(s||0),e.clear()),this.fsQuad.material=r,this.fsQuad.render(e),e.autoClear=l,e.setClearColor(this.originalClearColor),e.setClearAlpha(i)}renderOverride(e,r,t,a,s){this.originalClearColor.copy(e.getClearColor(this.tempColor));const i=e.getClearAlpha(this.tempColor),l=e.autoClear;e.setRenderTarget(t),e.autoClear=!1,a=r.clearColor||a,s=r.clearAlpha||s,void 0!==a&&null!==a&&(e.setClearColor(a),e.setClearAlpha(s||0),e.clear()),this.scene.overrideMaterial=r,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=l,e.setClearColor(this.originalClearColor),e.setClearAlpha(i)}renderRefractive(e,r,t,a,s){this.originalClearColor.copy(e.getClearColor(this.tempColor));const i=e.getClearAlpha(this.tempColor),l=e.autoClear;e.setRenderTarget(t),e.autoClear=!1,a=r.clearColor||a,s=r.clearAlpha||s,void 0!==a&&null!==a&&(e.setClearColor(a),e.setClearAlpha(s||0),e.clear()),this.scene.children.forEach((e=>{e.visible=!0})),this.scene.traverse((e=>{e._SSRrPassBackupMaterial=e.material,this.selects.includes(e)?e.material=this.refractiveOnMaterial:e.material=this.refractiveOffMaterial})),this.scene._SSRrPassBackupBackground=this.scene.background,this.scene.background=null,this.scene._SSRrPassBackupFog=this.scene.fog,this.scene.fog=null,e.render(this.scene,this.camera),this.scene.fog=this.scene._SSRrPassBackupFog,this.scene.background=this.scene._SSRrPassBackupBackground,this.scene.traverse((e=>{e.material=e._SSRrPassBackupMaterial})),e.autoClear=l,e.setClearColor(this.originalClearColor),e.setClearAlpha(i)}setSize(e,r){this.width=e,this.height=r,this.ssrrMaterial.defines.MAX_STEP=Math.sqrt(e*e+r*r),this.ssrrMaterial.needsUpdate=!0,this.beautyRenderTarget.setSize(e,r),this.specularRenderTarget.setSize(e,r),this.ssrrRenderTarget.setSize(e,r),this.normalSelectsRenderTarget.setSize(e,r),this.refractiveRenderTarget.setSize(e,r),this.ssrrMaterial.uniforms["resolution"].value.set(e,r),this.ssrrMaterial.uniforms["cameraProjectionMatrix"].value.copy(this.camera.projectionMatrix),this.ssrrMaterial.uniforms["cameraInverseProjectionMatrix"].value.copy(this.camera.projectionMatrixInverse)}}e.OUTPUT={Default:0,SSRr:1,Beauty:3,Depth:4,DepthSelects:9,NormalSelects:5,Refractive:7,Specular:8},THREE.SSRrPass=e})();