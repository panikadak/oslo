(function(){class e{parse(t,o={decodeSpeed:5,encodeSpeed:5,encoderMethod:e.MESH_EDGEBREAKER_ENCODING,quantization:[16,8,8,8,8],exportUvs:!0,exportNormals:!0,exportColor:!1}){if(!0===t.isBufferGeometry)throw new Error("DRACOExporter: The first parameter of parse() is now an instance of Mesh or Points.");if(void 0===DracoEncoderModule)throw new Error("THREE.DRACOExporter: required the draco_encoder to work.");const r=t.geometry,n=DracoEncoderModule(),i=new n.Encoder;let d,a;if(!0!==r.isBufferGeometry)throw new Error("THREE.DRACOExporter.parse(geometry, options): geometry is not a THREE.BufferGeometry instance.");if(!0===t.isMesh){d=new n.MeshBuilder,a=new n.Mesh;const e=r.getAttribute("position");d.AddFloatAttributeToMesh(a,n.POSITION,e.count,e.itemSize,e.array);const t=r.getIndex();if(null!==t)d.AddFacesToMesh(a,t.count/3,t.array);else{const t=new(e.count>65535?Uint32Array:Uint16Array)(e.count);for(let e=0;e<t.length;e++)t[e]=e;d.AddFacesToMesh(a,e.count,t)}if(!0===o.exportNormals){const e=r.getAttribute("normal");void 0!==e&&d.AddFloatAttributeToMesh(a,n.NORMAL,e.count,e.itemSize,e.array)}if(!0===o.exportUvs){const e=r.getAttribute("uv");void 0!==e&&d.AddFloatAttributeToMesh(a,n.TEX_COORD,e.count,e.itemSize,e.array)}if(!0===o.exportColor){const e=r.getAttribute("color");void 0!==e&&d.AddFloatAttributeToMesh(a,n.COLOR,e.count,e.itemSize,e.array)}}else{if(!0!==t.isPoints)throw new Error("DRACOExporter: Unsupported object type.");{d=new n.PointCloudBuilder,a=new n.PointCloud;const e=r.getAttribute("position");if(d.AddFloatAttribute(a,n.POSITION,e.count,e.itemSize,e.array),!0===o.exportColor){const e=r.getAttribute("color");void 0!==e&&d.AddFloatAttribute(a,n.COLOR,e.count,e.itemSize,e.array)}}}const s=new n.DracoInt8Array,c=void 0!==o.encodeSpeed?o.encodeSpeed:5,u=void 0!==o.decodeSpeed?o.decodeSpeed:5;if(i.SetSpeedOptions(c,u),void 0!==o.encoderMethod&&i.SetEncodingMethod(o.encoderMethod),void 0!==o.quantization)for(let e=0;e<5;e++)void 0!==o.quantization[e]&&i.SetAttributeQuantization(e,o.quantization[e]);let E;if(E=!0===t.isMesh?i.EncodeMeshToDracoBuffer(a,s):i.EncodePointCloudToDracoBuffer(a,!0,s),n.destroy(a),0===E)throw new Error("THREE.DRACOExporter: Draco encoding failed.");const A=new Int8Array(new ArrayBuffer(E));for(let e=0;e<E;e++)A[e]=s.GetValue(e);return n.destroy(s),n.destroy(i),n.destroy(d),A}}e.MESH_EDGEBREAKER_ENCODING=1,e.MESH_SEQUENTIAL_ENCODING=0,e.POINT_CLOUD=0,e.TRIANGULAR_MESH=1,e.INVALID=-1,e.POSITION=0,e.NORMAL=1,e.COLOR=2,e.TEX_COORD=3,e.GENERIC=4,THREE.DRACOExporter=e})();