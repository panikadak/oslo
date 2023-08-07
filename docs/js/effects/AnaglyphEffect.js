(function(){class e{constructor(e,t=512,r=512){this.colorMatrixLeft=(new THREE.Matrix3).fromArray([.4561,-.0400822,-.0152161,.500484,-.0378246,-.0205971,.176381,-.0157589,-.00546856]),this.colorMatrixRight=(new THREE.Matrix3).fromArray([-.0434706,.378476,-.0721527,-.0879388,.73364,-.112961,-.00155529,-.0184503,1.2264]);const o=new THREE.OrthographicCamera(-1,1,1,-1,0,1),a=new THREE.Scene,i=new THREE.StereoCamera,n={minFilter:THREE.LinearFilter,magFilter:THREE.NearestFilter,format:THREE.RGBAFormat},c=new THREE.WebGLRenderTarget(t,r,n),l=new THREE.WebGLRenderTarget(t,r,n),s=new THREE.ShaderMaterial({uniforms:{mapLeft:{value:c.texture},mapRight:{value:l.texture},colorMatrixLeft:{value:this.colorMatrixLeft},colorMatrixRight:{value:this.colorMatrixRight}},vertexShader:["varying vec2 vUv;","void main() {","\tvUv = vec2( uv.x, uv.y );","\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform sampler2D mapLeft;","uniform sampler2D mapRight;","varying vec2 vUv;","uniform mat3 colorMatrixLeft;","uniform mat3 colorMatrixRight;","float lin( float c ) {","\treturn c <= 0.04045 ? c * 0.0773993808 :","\t\t\tpow( c * 0.9478672986 + 0.0521327014, 2.4 );","}","vec4 lin( vec4 c ) {","\treturn vec4( lin( c.r ), lin( c.g ), lin( c.b ), c.a );","}","float dev( float c ) {","\treturn c <= 0.0031308 ? c * 12.92","\t\t\t: pow( c, 0.41666 ) * 1.055 - 0.055;","}","void main() {","\tvec2 uv = vUv;","\tvec4 colorL = lin( texture2D( mapLeft, uv ) );","\tvec4 colorR = lin( texture2D( mapRight, uv ) );","\tvec3 color = clamp(","\t\t\tcolorMatrixLeft * colorL.rgb +","\t\t\tcolorMatrixRight * colorR.rgb, 0., 1. );","\tgl_FragColor = vec4(","\t\t\tdev( color.r ), dev( color.g ), dev( color.b ),","\t\t\tmax( colorL.a, colorR.a ) );","}"].join("\n")}),v=new THREE.Mesh(new THREE.PlaneGeometry(2,2),s);a.add(v),this.setSize=function(t,r){e.setSize(t,r);const o=e.getPixelRatio();c.setSize(t*o,r*o),l.setSize(t*o,r*o)},this.render=function(t,r){const n=e.getRenderTarget();t.updateMatrixWorld(),null===r.parent&&r.updateMatrixWorld(),i.update(r),e.setRenderTarget(c),e.clear(),e.render(t,i.cameraL),e.setRenderTarget(l),e.clear(),e.render(t,i.cameraR),e.setRenderTarget(null),e.render(a,o),e.setRenderTarget(n)},this.dispose=function(){c&&c.dispose(),l&&l.dispose(),v&&v.geometry.dispose(),s&&s.dispose()}}}THREE.AnaglyphEffect=e})();