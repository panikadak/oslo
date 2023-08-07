(function(){const t={defines:{USE_3DTEXTURE:1},uniforms:{lut3d:{value:null},lut:{value:null},lutSize:{value:0},tDiffuse:{value:null},intensity:{value:1}},vertexShader:"\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}\n\n\t",fragmentShader:"\n\n\t\tuniform float lutSize;\n\t\t#if USE_3DTEXTURE\n\t\tprecision highp sampler3D;\n\t\tuniform sampler3D lut3d;\n\t\t#else\n\t\tuniform sampler2D lut;\n\n\t\tvec3 lutLookup( sampler2D tex, float size, vec3 rgb ) {\n\n\t\t\tfloat sliceHeight = 1.0 / size;\n\t\t\tfloat yPixelHeight = 1.0 / ( size * size );\n\n\t\t\t// Get the slices on either side of the sample\n\t\t\tfloat slice = rgb.b * size;\n\t\t\tfloat interp = fract( slice );\n\t\t\tfloat slice0 = slice - interp;\n\t\t\tfloat centeredInterp = interp - 0.5;\n\n\t\t\tfloat slice1 = slice0 + sign( centeredInterp );\n\n\t\t\t// Pull y sample in by half a pixel in each direction to avoid color\n\t\t\t// bleeding from adjacent slices.\n\t\t\tfloat greenOffset = clamp( rgb.g * sliceHeight, yPixelHeight * 0.5, sliceHeight - yPixelHeight * 0.5 );\n\n\t\t\tvec2 uv0 = vec2(\n\t\t\t\trgb.r,\n\t\t\t\tslice0 * sliceHeight + greenOffset\n\t\t\t);\n\t\t\tvec2 uv1 = vec2(\n\t\t\t\trgb.r,\n\t\t\t\tslice1 * sliceHeight + greenOffset\n\t\t\t);\n\n\t\t\tvec3 sample0 = texture2D( tex, uv0 ).rgb;\n\t\t\tvec3 sample1 = texture2D( tex, uv1 ).rgb;\n\n\t\t\treturn mix( sample0, sample1, abs( centeredInterp ) );\n\n\t\t}\n\t\t#endif\n\n\t\tvarying vec2 vUv;\n\t\tuniform float intensity;\n\t\tuniform sampler2D tDiffuse;\n\t\tvoid main() {\n\n\t\t\tvec4 val = texture2D( tDiffuse, vUv );\n\t\t\tvec4 lutVal;\n\n\t\t\t// pull the sample in by half a pixel so the sample begins\n\t\t\t// at the center of the edge pixels.\n\t\t\tfloat pixelWidth = 1.0 / lutSize;\n\t\t\tfloat halfPixelWidth = 0.5 / lutSize;\n\t\t\tvec3 uvw = vec3( halfPixelWidth ) + val.rgb * ( 1.0 - pixelWidth );\n\n\t\t\t#if USE_3DTEXTURE\n\n\t\t\tlutVal = vec4( texture( lut3d, uvw ).rgb, val.a );\n\n\t\t\t#else\n\n\t\t\tlutVal = vec4( lutLookup( lut, lutSize, uvw ), val.a );\n\n\t\t\t#endif\n\n\t\t\tgl_FragColor = vec4( mix( val, lutVal, intensity ) );\n\n\t\t}\n\n\t"};class e extends THREE.ShaderPass{set lut(t){const e=this.material;if(t!==this.lut&&(e.uniforms.lut3d.value=null,e.uniforms.lut.value=null,t)){const n=t.isDataTexture3D?1:0;n!==e.defines.USE_3DTEXTURE&&(e.defines.USE_3DTEXTURE=n,e.needsUpdate=!0),e.uniforms.lutSize.value=t.image.width,t.isDataTexture3D?e.uniforms.lut3d.value=t:e.uniforms.lut.value=t}}get lut(){return this.material.uniforms.lut.value||this.material.uniforms.lut3d.value}set intensity(t){this.material.uniforms.intensity.value=t}get intensity(){return this.material.uniforms.intensity.value}constructor(e={}){super(t),this.lut=e.lut||null,this.intensity="intensity"in e?e.intensity:1}}THREE.LUTPass=e})();