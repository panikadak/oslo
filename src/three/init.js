import * as THREE from 'three';
import { DRACOLoader } from './jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

let camera;
let scene;
let renderer;
let geometry;
let material;
let mesh;
let model;

let canvas = null;

function onWindowResize(event) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  camera.aspect = width / height;

  // adjust the FOV
  camera.fov = 75;

  camera.updateProjectionMatrix();
  camera.lookAt(scene.position);

  renderer.setSize(width, height);
  renderer.render(scene, camera);
}

const resizeObserver = new ResizeObserver((entries) => {
  onWindowResize();
});

function animation(time) {
  time *= 0.001;

  mesh.rotation.x = time / 1;
  mesh.rotation.y = time / 1;

  if (model) {
    model.rotation.x += 0.0002;
    model.rotation.y += 0.0005;
  }

  // if (model.rotation) {
  //   // model.rotation.x = time / 1;
  //   // model.rotation.y = time / 1;
  // }

  // if (resizeRendererToDisplaySize()) {
  //   // const canvas = renderer.domElement;
  //   camera.aspect = canvas.clientWidth / canvas.clientHeight;
  //   camera.updateProjectionMatrix();
  // }

  renderer.render(scene, camera);
}

export function init(m_canvas) {
  canvas = m_canvas;
  resizeObserver.observe(m_canvas);

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  camera = new THREE.PerspectiveCamera(70, width / height, 0.0001, 100);
  camera.position.z = 3;

  scene = new THREE.Scene();
  // renderer.setClearColor(0xffffff, 0);
  // renderer.setClearColorHex(0xffffff, 1);

  // renderer.setClearColorHex( 0x000000, 1 );
  scene.background = new THREE.WebGLRenderer({ alpha: true });
  // renderer.setClearColor(0x0000, "#ce3914"); // the default
  // scene.background = new THREE.Color("#ce3914");
  // scene.background = null;

  // scene.background.setClearColor(0xffffff, 1);

  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);

  const light = new THREE.PointLight(0xffffff, 1, 100000);
  light.position.set(-40, -30, 30);
  scene.add(light);

  const light2 = new THREE.DirectionalLight('white', 8);
  light2.position.set(-90, -90, 90);
  scene.add(light2);

  const ambientLight = new THREE.AmbientLight(0x404040, 20000);
  scene.add(ambientLight);

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('js/libs/draco/gltf/');

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  loader.load('models/gltf/oslo.glb', (gltf) => {
    model = gltf.scene;
    model.position.set(0, 0, -0.9);
    model.scale.set(5, 5, 5);

    // model.traverse((child) => {
    //   if (child instanceof THREE.Mesh) {
    //     child.material = material;
    //   }
    // });

    scene.add(model);

    // mixer = new THREE.AnimationMixer(model);
    // mixer.clipAction(gltf.animations[0]).play();

    // animate();
  }, // called while loading is progressing
    (xhr) => {
      console.log(`${xhr.loaded / xhr.total * 100}% loaded`);
    },
    // called when loading has errors
    (error) => {
      console.log('An error happened');
    });

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor( 0xffffff, 0);
  // renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setAnimationLoop(animation);
  canvas.appendChild(renderer.domElement);
}
