(function(){class e extends THREE.Pass{constructor(e,r,s){super(),void 0===THREE.HalftoneShader&&console.error("THREE.HalftonePass requires THREE.HalftoneShader"),this.uniforms=THREE.UniformsUtils.clone(THREE.HalftoneShader.uniforms),this.material=new THREE.ShaderMaterial({uniforms:this.uniforms,fragmentShader:THREE.HalftoneShader.fragmentShader,vertexShader:THREE.HalftoneShader.vertexShader}),this.uniforms.width.value=e,this.uniforms.height.value=r;for(const t in s)s.hasOwnProperty(t)&&this.uniforms.hasOwnProperty(t)&&(this.uniforms[t].value=s[t]);this.fsQuad=new THREE.FullScreenQuad(this.material)}render(e,r,s){this.material.uniforms["tDiffuse"].value=s.texture,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(r),this.clear&&e.clear(),this.fsQuad.render(e))}setSize(e,r){this.uniforms.width.value=e,this.uniforms.height.value=r}}THREE.HalftonePass=e})();