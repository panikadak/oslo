(function(){class e extends THREE.LineSegmentsGeometry{constructor(){super(),this.type="LineGeometry"}setPositions(e){for(var r=e.length-3,t=new Float32Array(2*r),o=0;o<r;o+=3)t[2*o]=e[o],t[2*o+1]=e[o+1],t[2*o+2]=e[o+2],t[2*o+3]=e[o+3],t[2*o+4]=e[o+4],t[2*o+5]=e[o+5];return super.setPositions(t),this}setColors(e){for(var r=e.length-3,t=new Float32Array(2*r),o=0;o<r;o+=3)t[2*o]=e[o],t[2*o+1]=e[o+1],t[2*o+2]=e[o+2],t[2*o+3]=e[o+3],t[2*o+4]=e[o+4],t[2*o+5]=e[o+5];return super.setColors(t),this}fromLine(e){var r=e.geometry;if(!r.isGeometry)return r.isBufferGeometry&&this.setPositions(r.attributes.position.array),this;console.error("THREE.LineGeometry no longer supports Geometry. Use THREE.BufferGeometry instead.")}}e.prototype.isLineGeometry=!0,THREE.LineGeometry=e})();