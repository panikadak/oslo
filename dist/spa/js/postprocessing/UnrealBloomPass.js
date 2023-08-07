(function(){class t extends THREE.Pass{constructor(t,e,r,i){super(),this.strength=void 0!==e?e:1,this.radius=r,this.threshold=i,this.resolution=void 0!==t?new THREE.Vector2(t.x,t.y):new THREE.Vector2(256,256),this.clearColor=new THREE.Color(0,0,0);const o={minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,format:THREE.RGBAFormat};this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new THREE.WebGLRenderTarget(a,s,o),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let m=0;m<this.nMips;m++){const t=new THREE.WebGLRenderTarget(a,s,o);t.texture.name="UnrealBloomPass.h"+m,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);const e=new THREE.WebGLRenderTarget(a,s,o);e.texture.name="UnrealBloomPass.v"+m,e.texture.generateMipmaps=!1,this.renderTargetsVertical.push(e),a=Math.round(a/2),s=Math.round(s/2)}void 0===THREE.LuminosityHighPassShader&&console.error("THREE.UnrealBloomPass relies on THREE.LuminosityHighPassShader");const l=THREE.LuminosityHighPassShader;this.highPassUniforms=THREE.UniformsUtils.clone(l.uniforms),this.highPassUniforms["luminosityThreshold"].value=i,this.highPassUniforms["smoothWidth"].value=.01,this.materialHighPassFilter=new THREE.ShaderMaterial({uniforms:this.highPassUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader,defines:{}}),this.separableBlurMaterials=[];const n=[3,5,7,9,11];a=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let m=0;m<this.nMips;m++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(n[m])),this.separableBlurMaterials[m].uniforms["texSize"].value=new THREE.Vector2(a,s),a=Math.round(a/2),s=Math.round(s/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms["blurTexture1"].value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms["blurTexture2"].value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms["blurTexture3"].value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms["blurTexture4"].value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms["blurTexture5"].value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms["bloomStrength"].value=e,this.compositeMaterial.uniforms["bloomRadius"].value=.1,this.compositeMaterial.needsUpdate=!0;const u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms["bloomFactors"].value=u,this.bloomTintColors=[new THREE.Vector3(1,1,1),new THREE.Vector3(1,1,1),new THREE.Vector3(1,1,1),new THREE.Vector3(1,1,1),new THREE.Vector3(1,1,1)],this.compositeMaterial.uniforms["bloomTintColors"].value=this.bloomTintColors,void 0===THREE.CopyShader&&console.error("THREE.UnrealBloomPass relies on THREE.CopyShader");const h=THREE.CopyShader;this.copyUniforms=THREE.UniformsUtils.clone(h.uniforms),this.copyUniforms["opacity"].value=1,this.materialCopy=new THREE.ShaderMaterial({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:THREE.AdditiveBlending,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new THREE.Color,this.oldClearAlpha=1,this.basic=new THREE.MeshBasicMaterial,this.fsQuad=new THREE.FullScreenQuad(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose()}setSize(t,e){let r=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(r,i);for(let o=0;o<this.nMips;o++)this.renderTargetsHorizontal[o].setSize(r,i),this.renderTargetsVertical[o].setSize(r,i),this.separableBlurMaterials[o].uniforms["texSize"].value=new THREE.Vector2(r,i),r=Math.round(r/2),i=Math.round(i/2)}render(e,r,i,o,a){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),a&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms["tDiffuse"].value=i.texture,this.highPassUniforms["luminosityThreshold"].value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let l=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this.fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms["colorTexture"].value=l.texture,this.separableBlurMaterials[n].uniforms["direction"].value=t.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[n]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[n].uniforms["colorTexture"].value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms["direction"].value=t.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[n]),e.clear(),this.fsQuad.render(e),l=this.renderTargetsVertical[n];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms["bloomStrength"].value=this.strength,this.compositeMaterial.uniforms["bloomRadius"].value=this.radius,this.compositeMaterial.uniforms["bloomTintColors"].value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.materialCopy,this.copyUniforms["tDiffuse"].value=this.renderTargetsHorizontal[0].texture,a&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=s}getSeperableBlurMaterial(t){return new THREE.ShaderMaterial({defines:{KERNEL_RADIUS:t,SIGMA:t},uniforms:{colorTexture:{value:null},texSize:{value:new THREE.Vector2(.5,.5)},direction:{value:new THREE.Vector2(.5,.5)}},vertexShader:"varying vec2 vUv;\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",fragmentShader:"#include <common>\n\t\t\t\tvarying vec2 vUv;\n\t\t\t\tuniform sampler2D colorTexture;\n\t\t\t\tuniform vec2 texSize;\n\t\t\t\tuniform vec2 direction;\n\n\t\t\t\tfloat gaussianPdf(in float x, in float sigma) {\n\t\t\t\t\treturn 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;\n\t\t\t\t}\n\t\t\t\tvoid main() {\n\t\t\t\t\tvec2 invSize = 1.0 / texSize;\n\t\t\t\t\tfloat fSigma = float(SIGMA);\n\t\t\t\t\tfloat weightSum = gaussianPdf(0.0, fSigma);\n\t\t\t\t\tvec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;\n\t\t\t\t\tfor( int i = 1; i < KERNEL_RADIUS; i ++ ) {\n\t\t\t\t\t\tfloat x = float(i);\n\t\t\t\t\t\tfloat w = gaussianPdf(x, fSigma);\n\t\t\t\t\t\tvec2 uvOffset = direction * invSize * x;\n\t\t\t\t\t\tvec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;\n\t\t\t\t\t\tvec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;\n\t\t\t\t\t\tdiffuseSum += (sample1 + sample2) * w;\n\t\t\t\t\t\tweightSum += 2.0 * w;\n\t\t\t\t\t}\n\t\t\t\t\tgl_FragColor = vec4(diffuseSum/weightSum, 1.0);\n\t\t\t\t}"})}getCompositeMaterial(t){return new THREE.ShaderMaterial({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},dirtTexture:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:"varying vec2 vUv;\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",fragmentShader:"varying vec2 vUv;\n\t\t\t\tuniform sampler2D blurTexture1;\n\t\t\t\tuniform sampler2D blurTexture2;\n\t\t\t\tuniform sampler2D blurTexture3;\n\t\t\t\tuniform sampler2D blurTexture4;\n\t\t\t\tuniform sampler2D blurTexture5;\n\t\t\t\tuniform sampler2D dirtTexture;\n\t\t\t\tuniform float bloomStrength;\n\t\t\t\tuniform float bloomRadius;\n\t\t\t\tuniform float bloomFactors[NUM_MIPS];\n\t\t\t\tuniform vec3 bloomTintColors[NUM_MIPS];\n\n\t\t\t\tfloat lerpBloomFactor(const in float factor) {\n\t\t\t\t\tfloat mirrorFactor = 1.2 - factor;\n\t\t\t\t\treturn mix(factor, mirrorFactor, bloomRadius);\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tgl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );\n\t\t\t\t}"})}}t.BlurDirectionX=new THREE.Vector2(1,0),t.BlurDirectionY=new THREE.Vector2(0,1),THREE.UnrealBloomPass=t})();