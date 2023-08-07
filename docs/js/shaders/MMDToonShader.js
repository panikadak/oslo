(function(){const t="\nvarying vec3 vViewPosition;\n\nstruct BlinnPhongMaterial {\n\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n\n};\n\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\n\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n\treflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;\n\n}\n\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n\n#define Material_LightProbeLOD( material )\t(0)\n",e="\n#ifdef USE_MATCAP\n\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks\n\tvec4 matcapColor = texture2D( matcap, uv );\n\tmatcapColor = matcapTexelToLinear( matcapColor );\n\n\t#ifdef MATCAP_BLENDING_MULTIPLY\n\n\t\toutgoingLight *= matcapColor.rgb;\n\n\t#elif defined( MATCAP_BLENDING_ADD )\n\n\t\toutgoingLight += matcapColor.rgb;\n\n\t#endif\n\n#endif\n",n={defines:{TOON:!0,MATCAP:!0,MATCAP_BLENDING_ADD:!0},uniforms:THREE.UniformsUtils.merge([THREE.ShaderLib.toon.uniforms,THREE.ShaderLib.phong.uniforms,THREE.ShaderLib.matcap.uniforms]),vertexShader:THREE.ShaderLib.phong.vertexShader,fragmentShader:THREE.ShaderLib.phong.fragmentShader.replace("#include <common>","\n\t\t\t\t\t#ifdef USE_MATCAP\n\t\t\t\t\t\tuniform sampler2D matcap;\n\t\t\t\t\t#endif\n\n\t\t\t\t\t#include <common>\n\t\t\t\t").replace("#include <envmap_common_pars_fragment>","\n\t\t\t\t\t#include <gradientmap_pars_fragment>\n\t\t\t\t\t#include <envmap_common_pars_fragment>\n\t\t\t\t").replace("#include <lights_phong_pars_fragment>",t).replace("#include <envmap_fragment>",`\n\t\t\t\t\t#include <envmap_fragment>\n\t\t\t\t\t${e}\n\t\t\t\t`)};THREE.MMDToonShader=n})();