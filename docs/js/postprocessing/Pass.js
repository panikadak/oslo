(function(){class e{constructor(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}}const t=new THREE.OrthographicCamera(-1,1,1,-1,0,1),s=new THREE.BufferGeometry;s.setAttribute("position",new THREE.Float32BufferAttribute([-1,3,0,-1,-1,0,3,-1,0],3)),s.setAttribute("uv",new THREE.Float32BufferAttribute([0,2,0,0,2,0],2));class r{constructor(e){this._mesh=new THREE.Mesh(s,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,t)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}THREE.FullScreenQuad=r,THREE.Pass=e})();