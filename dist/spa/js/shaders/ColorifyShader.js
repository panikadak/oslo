(function(){const t={uniforms:{tDiffuse:{value:null},color:{value:new THREE.Color(16777215)}},vertexShader:"\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\tuniform vec3 color;\n\t\tuniform sampler2D tDiffuse;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\n\n\t\t\tvec3 luma = vec3( 0.299, 0.587, 0.114 );\n\t\t\tfloat v = dot( texel.xyz, luma );\n\n\t\t\tgl_FragColor = vec4( v * color, texel.w );\n\n\t\t}"};THREE.ColorifyShader=t})();