(function(){class t extends THREE.Loader{constructor(t){super(t)}load(t,e,s,r){const o=this,n=new THREE.FileLoader(o.manager);n.setPath(o.path),n.setRequestHeader(o.requestHeader),n.setWithCredentials(o.withCredentials),n.load(t,(function(s){try{e(o.parse(s))}catch(n){r?r(n):console.error(n),o.manager.itemError(t)}}),s,r)}parse(t){function e(t){return t.replace(/^\s\s*/,"").replace(/\s\s*$/,"")}function s(t){return t.charAt(0).toUpperCase()+t.substr(1).toLowerCase()}function r(t,e){return"s"+Math.min(t,e)+"e"+Math.max(t,e)}function o(t,e,s,o){const n=parseInt(p[o].substr(t,e));if(n){const t=r(s,n);void 0===i[t]&&(c.push([s-1,n-1,1]),i[t]=c.length-1)}}function n(){const t={geometryAtoms:new THREE.BufferGeometry,geometryBonds:new THREE.BufferGeometry,json:{atoms:a}},e=t.geometryAtoms,s=t.geometryBonds,r=[],o=[],n=[];for(let u=0,c=a.length;u<c;u++){const t=a[u],e=t[0],s=t[1],n=t[2];r.push(e,s,n);const c=t[3][0]/255,i=t[3][1]/255,l=t[3][2]/255;o.push(c,i,l)}for(let u=0,a=c.length;u<a;u++){const t=c[u],e=t[0],s=t[1],r=l[e],o=l[s];let a=r[0],i=r[1],p=r[2];n.push(a,i,p),a=o[0],i=o[1],p=o[2],n.push(a,i,p)}return e.setAttribute("position",new THREE.Float32BufferAttribute(r,3)),e.setAttribute("color",new THREE.Float32BufferAttribute(o,3)),s.setAttribute("position",new THREE.Float32BufferAttribute(n,3)),t}const u={h:[255,255,255],he:[217,255,255],li:[204,128,255],be:[194,255,0],b:[255,181,181],c:[144,144,144],n:[48,80,248],o:[255,13,13],f:[144,224,80],ne:[179,227,245],na:[171,92,242],mg:[138,255,0],al:[191,166,166],si:[240,200,160],p:[255,128,0],s:[255,255,48],cl:[31,240,31],ar:[128,209,227],k:[143,64,212],ca:[61,255,0],sc:[230,230,230],ti:[191,194,199],v:[166,166,171],cr:[138,153,199],mn:[156,122,199],fe:[224,102,51],co:[240,144,160],ni:[80,208,80],cu:[200,128,51],zn:[125,128,176],ga:[194,143,143],ge:[102,143,143],as:[189,128,227],se:[255,161,0],br:[166,41,41],kr:[92,184,209],rb:[112,46,176],sr:[0,255,0],y:[148,255,255],zr:[148,224,224],nb:[115,194,201],mo:[84,181,181],tc:[59,158,158],ru:[36,143,143],rh:[10,125,140],pd:[0,105,133],ag:[192,192,192],cd:[255,217,143],in:[166,117,115],sn:[102,128,128],sb:[158,99,181],te:[212,122,0],i:[148,0,148],xe:[66,158,176],cs:[87,23,143],ba:[0,201,0],la:[112,212,255],ce:[255,255,199],pr:[217,255,199],nd:[199,255,199],pm:[163,255,199],sm:[143,255,199],eu:[97,255,199],gd:[69,255,199],tb:[48,255,199],dy:[31,255,199],ho:[0,255,156],er:[0,230,117],tm:[0,212,82],yb:[0,191,56],lu:[0,171,36],hf:[77,194,255],ta:[77,166,255],w:[33,148,214],re:[38,125,171],os:[38,102,150],ir:[23,84,135],pt:[208,208,224],au:[255,209,35],hg:[184,184,208],tl:[166,84,77],pb:[87,89,97],bi:[158,79,181],po:[171,92,0],at:[117,79,69],rn:[66,130,150],fr:[66,0,102],ra:[0,125,0],ac:[112,171,250],th:[0,186,255],pa:[0,161,255],u:[0,143,255],np:[0,128,255],pu:[0,107,255],am:[84,92,242],cm:[120,92,227],bk:[138,79,227],cf:[161,54,212],es:[179,31,212],fm:[179,31,186],md:[179,13,166],no:[189,13,135],lr:[199,0,102],rf:[204,0,89],db:[209,0,79],sg:[217,0,69],bh:[224,0,56],hs:[230,0,46],mt:[235,0,38],ds:[235,0,38],rg:[235,0,38],cn:[235,0,38],uut:[235,0,38],uuq:[235,0,38],uup:[235,0,38],uuh:[235,0,38],uus:[235,0,38],uuo:[235,0,38]},a=[],c=[],i={},l={},p=t.split("\n");for(let b=0,f=p.length;b<f;b++)if("ATOM"===p[b].substr(0,4)||"HETATM"===p[b].substr(0,6)){const t=parseFloat(p[b].substr(30,7)),r=parseFloat(p[b].substr(38,7)),o=parseFloat(p[b].substr(46,7)),n=parseInt(p[b].substr(6,5))-1;let c=e(p[b].substr(76,2)).toLowerCase();""===c&&(c=e(p[b].substr(12,2)).toLowerCase());const i=[t,r,o,u[c],s(c)];a.push(i),l[n]=i}else if("CONECT"===p[b].substr(0,6)){const t=parseInt(p[b].substr(6,5));o(11,5,t,b),o(16,5,t,b),o(21,5,t,b),o(26,5,t,b)}return n()}}THREE.PDBLoader=t})();