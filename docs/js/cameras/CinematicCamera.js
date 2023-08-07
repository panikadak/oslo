(function(){class e extends THREE.PerspectiveCamera{constructor(e,s,t,i){super(e,s,t,i),this.type="CinematicCamera",this.postprocessing={enabled:!0},this.shaderSettings={rings:3,samples:4};const r=THREE.BokehDepthShader;this.materialDepth=new THREE.ShaderMaterial({uniforms:r.uniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.materialDepth.uniforms["mNear"].value=t,this.materialDepth.uniforms["mFar"].value=i,this.setLens(),this.initPostProcessing()}setLens(e=35,s=35,t=8,i=.019){this.filmGauge=s,this.setFocalLength(e),this.fNumber=t,this.coc=i,this.aperture=e/this.fNumber,this.hyperFocal=e*e/(this.aperture*this.coc)}linearize(e){const s=this.far,t=this.near;return-s*t/(e*(s-t)-s)}smoothstep(e,s,t){const i=this.saturate((t-e)/(s-e));return i*i*(3-2*i)}saturate(e){return Math.max(0,Math.min(1,e))}focusAt(e=20){const s=this.getFocalLength();this.focus=e,this.nearPoint=this.hyperFocal*this.focus/(this.hyperFocal+(this.focus-s)),this.farPoint=this.hyperFocal*this.focus/(this.hyperFocal-(this.focus-s)),this.depthOfField=this.farPoint-this.nearPoint,this.depthOfField<0&&(this.depthOfField=0),this.sdistance=this.smoothstep(this.near,this.far,this.focus),this.ldistance=this.linearize(1-this.sdistance),this.postprocessing.bokeh_uniforms["focalDepth"].value=this.ldistance}initPostProcessing(){if(this.postprocessing.enabled){this.postprocessing.scene=new THREE.Scene,this.postprocessing.camera=new THREE.OrthographicCamera(window.innerWidth/-2,window.innerWidth/2,window.innerHeight/2,window.innerHeight/-2,-1e4,1e4),this.postprocessing.scene.add(this.postprocessing.camera);const e={minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,format:THREE.RGBFormat};this.postprocessing.rtTextureDepth=new THREE.WebGLRenderTarget(window.innerWidth,window.innerHeight,e),this.postprocessing.rtTextureColor=new THREE.WebGLRenderTarget(window.innerWidth,window.innerHeight,e);const s=THREE.BokehShader;this.postprocessing.bokeh_uniforms=THREE.UniformsUtils.clone(s.uniforms),this.postprocessing.bokeh_uniforms["tColor"].value=this.postprocessing.rtTextureColor.texture,this.postprocessing.bokeh_uniforms["tDepth"].value=this.postprocessing.rtTextureDepth.texture,this.postprocessing.bokeh_uniforms["manualdof"].value=0,this.postprocessing.bokeh_uniforms["shaderFocus"].value=0,this.postprocessing.bokeh_uniforms["fstop"].value=2.8,this.postprocessing.bokeh_uniforms["showFocus"].value=1,this.postprocessing.bokeh_uniforms["focalDepth"].value=.1,this.postprocessing.bokeh_uniforms["znear"].value=this.near,this.postprocessing.bokeh_uniforms["zfar"].value=this.near,this.postprocessing.bokeh_uniforms["textureWidth"].value=window.innerWidth,this.postprocessing.bokeh_uniforms["textureHeight"].value=window.innerHeight,this.postprocessing.materialBokeh=new THREE.ShaderMaterial({uniforms:this.postprocessing.bokeh_uniforms,vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,defines:{RINGS:this.shaderSettings.rings,SAMPLES:this.shaderSettings.samples,DEPTH_PACKING:1}}),this.postprocessing.quad=new THREE.Mesh(new THREE.PlaneGeometry(window.innerWidth,window.innerHeight),this.postprocessing.materialBokeh),this.postprocessing.quad.position.z=-500,this.postprocessing.scene.add(this.postprocessing.quad)}}renderCinematic(e,s){if(this.postprocessing.enabled){const t=s.getRenderTarget();s.clear(),e.overrideMaterial=null,s.setRenderTarget(this.postprocessing.rtTextureColor),s.clear(),s.render(e,this),e.overrideMaterial=this.materialDepth,s.setRenderTarget(this.postprocessing.rtTextureDepth),s.clear(),s.render(e,this),s.setRenderTarget(null),s.render(this.postprocessing.scene,this.postprocessing.camera),s.setRenderTarget(t)}}}THREE.CinematicCamera=e})();