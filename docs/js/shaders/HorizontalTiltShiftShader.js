(function(){var t={uniforms:{tDiffuse:{value:null},h:{value:1/512},r:{value:.35}},vertexShader:"\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\tuniform sampler2D tDiffuse;\n\t\tuniform float h;\n\t\tuniform float r;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvec4 sum = vec4( 0.0 );\n\n\t\t\tfloat hh = h * abs( r - vUv.y );\n\n\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * hh, vUv.y ) ) * 0.051;\n\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * hh, vUv.y ) ) * 0.0918;\n\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * hh, vUv.y ) ) * 0.12245;\n\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * hh, vUv.y ) ) * 0.1531;\n\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;\n\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * hh, vUv.y ) ) * 0.1531;\n\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * hh, vUv.y ) ) * 0.12245;\n\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * hh, vUv.y ) ) * 0.0918;\n\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * hh, vUv.y ) ) * 0.051;\n\n\t\t\tgl_FragColor = sum;\n\n\t\t}"};THREE.HorizontalTiltShiftShader=t})();