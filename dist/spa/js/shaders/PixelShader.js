(function(){const t={uniforms:{tDiffuse:{value:null},resolution:{value:null},pixelSize:{value:1}},vertexShader:"\n\n\t\tvarying highp vec2 vUv;\n\n\t\t\tvoid main() {\n\n\t\t\t\tvUv = uv;\n\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\tuniform sampler2D tDiffuse;\n\t\tuniform float pixelSize;\n\t\tuniform vec2 resolution;\n\n\t\tvarying highp vec2 vUv;\n\n\t\tvoid main(){\n\n\t\t\tvec2 dxy = pixelSize / resolution;\n\t\t\tvec2 coord = dxy * floor( vUv / dxy );\n\t\t\tgl_FragColor = texture2D(tDiffuse, coord);\n\n\t\t}"};THREE.PixelShader=t})();