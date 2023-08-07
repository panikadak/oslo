(function(){const t={uniforms:{uDirLightPos:{value:new THREE.Vector3},uDirLightColor:{value:new THREE.Color(15658734)},uAmbientLightColor:{value:new THREE.Color(328965)},uBaseColor:{value:new THREE.Color(16777215)}},vertexShader:"\n\n\t\tvarying vec3 vNormal;\n\t\tvarying vec3 vRefract;\n\n\t\tvoid main() {\n\n\t\t\tvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\t\t\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\t\t\tvec3 worldNormal = normalize ( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );\n\n\t\t\tvNormal = normalize( normalMatrix * normal );\n\n\t\t\tvec3 I = worldPosition.xyz - cameraPosition;\n\t\t\tvRefract = refract( normalize( I ), worldNormal, 1.02 );\n\n\t\t\tgl_Position = projectionMatrix * mvPosition;\n\n\t\t}",fragmentShader:"\n\n\t\tuniform vec3 uBaseColor;\n\n\t\tuniform vec3 uDirLightPos;\n\t\tuniform vec3 uDirLightColor;\n\n\t\tuniform vec3 uAmbientLightColor;\n\n\t\tvarying vec3 vNormal;\n\n\t\tvarying vec3 vRefract;\n\n\t\tvoid main() {\n\n\t\t\tfloat directionalLightWeighting = max( dot( normalize( vNormal ), uDirLightPos ), 0.0);\n\t\t\tvec3 lightWeighting = uAmbientLightColor + uDirLightColor * directionalLightWeighting;\n\n\t\t\tfloat intensity = smoothstep( - 0.5, 1.0, pow( length(lightWeighting), 20.0 ) );\n\t\t\tintensity += length(lightWeighting) * 0.2;\n\n\t\t\tfloat cameraWeighting = dot( normalize( vNormal ), vRefract );\n\t\t\tintensity += pow( 1.0 - length( cameraWeighting ), 6.0 );\n\t\t\tintensity = intensity * 0.2 + 0.3;\n\n\t\t\tif ( intensity < 0.50 ) {\n\n\t\t\t\tgl_FragColor = vec4( 2.0 * intensity * uBaseColor, 1.0 );\n\n\t\t\t} else {\n\n\t\t\t\tgl_FragColor = vec4( 1.0 - 2.0 * ( 1.0 - intensity ) * ( 1.0 - uBaseColor ), 1.0 );\n\n\t\t}\n\n\t\t}"},n={uniforms:{uDirLightPos:{value:new THREE.Vector3},uDirLightColor:{value:new THREE.Color(15658734)},uAmbientLightColor:{value:new THREE.Color(328965)},uBaseColor:{value:new THREE.Color(15658734)},uLineColor1:{value:new THREE.Color(8421504)},uLineColor2:{value:new THREE.Color(0)},uLineColor3:{value:new THREE.Color(0)},uLineColor4:{value:new THREE.Color(0)}},vertexShader:"\n\n\t\tvarying vec3 vNormal;\n\n\t\tvoid main() {\n\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\tvNormal = normalize( normalMatrix * normal );\n\n\t\t}",fragmentShader:"\n\n\t\tuniform vec3 uBaseColor;\n\t\tuniform vec3 uLineColor1;\n\t\tuniform vec3 uLineColor2;\n\t\tuniform vec3 uLineColor3;\n\t\tuniform vec3 uLineColor4;\n\n\t\tuniform vec3 uDirLightPos;\n\t\tuniform vec3 uDirLightColor;\n\n\t\tuniform vec3 uAmbientLightColor;\n\n\t\tvarying vec3 vNormal;\n\n\t\tvoid main() {\n\n\t\t\tfloat camera = max( dot( normalize( vNormal ), vec3( 0.0, 0.0, 1.0 ) ), 0.4);\n\t\t\tfloat light = max( dot( normalize( vNormal ), uDirLightPos ), 0.0);\n\n\t\t\tgl_FragColor = vec4( uBaseColor, 1.0 );\n\n\t\t\tif ( length(uAmbientLightColor + uDirLightColor * light) < 1.00 ) {\n\n\t\t\t\tgl_FragColor *= vec4( uLineColor1, 1.0 );\n\n\t\t\t}\n\n\t\t\tif ( length(uAmbientLightColor + uDirLightColor * camera) < 0.50 ) {\n\n\t\t\t\tgl_FragColor *= vec4( uLineColor2, 1.0 );\n\n\t\t\t}\n\n\t\t}"},o={uniforms:{uDirLightPos:{value:new THREE.Vector3},uDirLightColor:{value:new THREE.Color(15658734)},uAmbientLightColor:{value:new THREE.Color(328965)},uBaseColor:{value:new THREE.Color(16777215)},uLineColor1:{value:new THREE.Color(0)},uLineColor2:{value:new THREE.Color(0)},uLineColor3:{value:new THREE.Color(0)},uLineColor4:{value:new THREE.Color(0)}},vertexShader:"\n\n\t\tvarying vec3 vNormal;\n\n\t\tvoid main() {\n\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\tvNormal = normalize( normalMatrix * normal );\n\n\t\t}",fragmentShader:"\n\n\t\tuniform vec3 uBaseColor;\n\t\tuniform vec3 uLineColor1;\n\t\tuniform vec3 uLineColor2;\n\t\tuniform vec3 uLineColor3;\n\t\tuniform vec3 uLineColor4;\n\n\t\tuniform vec3 uDirLightPos;\n\t\tuniform vec3 uDirLightColor;\n\n\t\tuniform vec3 uAmbientLightColor;\n\n\t\tvarying vec3 vNormal;\n\n\t\tvoid main() {\n\n\t\t\tfloat directionalLightWeighting = max( dot( normalize(vNormal), uDirLightPos ), 0.0);\n\t\t\tvec3 lightWeighting = uAmbientLightColor + uDirLightColor * directionalLightWeighting;\n\n\t\t\tgl_FragColor = vec4( uBaseColor, 1.0 );\n\n\t\t\tif ( length(lightWeighting) < 1.00 ) {\n\n\t\t\t\tif ( mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0) {\n\n\t\t\t\t\tgl_FragColor = vec4( uLineColor1, 1.0 );\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t\tif ( length(lightWeighting) < 0.75 ) {\n\n\t\t\t\tif (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0) {\n\n\t\t\t\t\tgl_FragColor = vec4( uLineColor2, 1.0 );\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t\tif ( length(lightWeighting) < 0.50 ) {\n\n\t\t\t\tif (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0) {\n\n\t\t\t\t\tgl_FragColor = vec4( uLineColor3, 1.0 );\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t\tif ( length(lightWeighting) < 0.3465 ) {\n\n\t\t\t\tif (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0) {\n\n\t\t\t\t\tgl_FragColor = vec4( uLineColor4, 1.0 );\n\n\t\t\t}\n\n\t\t\t}\n\n\t\t}"},i={uniforms:{uDirLightPos:{value:new THREE.Vector3},uDirLightColor:{value:new THREE.Color(15658734)},uAmbientLightColor:{value:new THREE.Color(328965)},uBaseColor:{value:new THREE.Color(16777215)},uLineColor1:{value:new THREE.Color(0)}},vertexShader:"\n\n\t\tvarying vec3 vNormal;\n\n\t\tvoid main() {\n\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\tvNormal = normalize( normalMatrix * normal );\n\n\t\t}",fragmentShader:"\n\n\t\tuniform vec3 uBaseColor;\n\t\tuniform vec3 uLineColor1;\n\t\tuniform vec3 uLineColor2;\n\t\tuniform vec3 uLineColor3;\n\t\tuniform vec3 uLineColor4;\n\n\t\tuniform vec3 uDirLightPos;\n\t\tuniform vec3 uDirLightColor;\n\n\t\tuniform vec3 uAmbientLightColor;\n\n\t\tvarying vec3 vNormal;\n\n\t\tvoid main() {\n\n\t\tfloat directionalLightWeighting = max( dot( normalize(vNormal), uDirLightPos ), 0.0);\n\t\tvec3 lightWeighting = uAmbientLightColor + uDirLightColor * directionalLightWeighting;\n\n\t\tgl_FragColor = vec4( uBaseColor, 1.0 );\n\n\t\tif ( length(lightWeighting) < 1.00 ) {\n\n\t\t\t\tif ( ( mod(gl_FragCoord.x, 4.001) + mod(gl_FragCoord.y, 4.0) ) > 6.00 ) {\n\n\t\t\t\t\tgl_FragColor = vec4( uLineColor1, 1.0 );\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t\tif ( length(lightWeighting) < 0.50 ) {\n\n\t\t\t\tif ( ( mod(gl_FragCoord.x + 2.0, 4.001) + mod(gl_FragCoord.y + 2.0, 4.0) ) > 6.00 ) {\n\n\t\t\t\t\tgl_FragColor = vec4( uLineColor1, 1.0 );\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}"};THREE.ToonShader1=t,THREE.ToonShader2=n,THREE.ToonShaderDotted=i,THREE.ToonShaderHatching=o})();