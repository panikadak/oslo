(function(){const t={uniforms:{},vertexShader:"\n\n\t\tvoid main() {\n\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\tvoid main() {\n\n\t\t\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 0.5 );\n\n\t\t}"};THREE.BasicShader=t})();