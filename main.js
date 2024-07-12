import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";

/**
 * Base
 */

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("./src/textures/matcaps/1.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;

const fontLoader = new FontLoader();
fontLoader.load("./src/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Sip & Play", {
    font: font,
    size: 1,
    depth: 0.2,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  textGeometry.center();

  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  const text = new THREE.Mesh(textGeometry, material);
  text.position.y = 1.6;
  text.position.z = -1.6;
  text.rotation.y = Math.PI * 0.04;
  scene.add(text);
});

/**
 * Models
 */

const gltfLoader = new GLTFLoader();

gltfLoader.load("./3d_models/boba_tea_cup/scene.gltf", (gltf1) => {
  gltf1.scene.scale.set(0.15, 0.15, 0.15);
  gltf1.scene.position.x = 2;
  scene.add(gltf1.scene);
});
gltfLoader.load("./3d_models/bubble_tea_and_cookies/scene.gltf", (gltf2) => {
  gltf2.scene.scale.set(0.15, 0.15, 0.15);
  gltf2.scene.position.x = 3;

  scene.add(gltf2.scene);
});
gltfLoader.load("./3d_models/cafe_latte_with_art/scene.gltf", (gltf3) => {
  gltf3.scene.scale.set(0.4, 0.4, 0.4);
  gltf3.scene.position.x = 4;

  scene.add(gltf3.scene);
});
gltfLoader.load("./3d_models/coffee_shop_cup/scene.gltf", (gltf4) => {
  gltf4.scene.scale.set(0.55, 0.55, 0.55);
  gltf4.scene.position.x = -2;
  scene.add(gltf4.scene);
});
gltfLoader.load("./3d_models/desserts/scene.gltf", (gltf5) => {
  gltf5.scene.scale.set(0.3, 0.3, 0.3);
  gltf5.scene.position.x = -3;
  scene.add(gltf5.scene);
});
gltfLoader.load("./3d_models/iced_coffee/scene.gltf", (gltf6) => {
  gltf6.scene.rotation.x = -Math.PI / 2;
  gltf6.scene.scale.set(0.045, 0.045, 0.045);
  gltf6.scene.position.x = -4;
  scene.add(gltf6.scene);
  let loadedModel;
});

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0.5, 2, 4);
camera.position.set(2, 2, 2);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 0);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;
console.log();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  //animate
  // document.addEventListener("mousemove", () => {
  //   loadedModel.position = 1;
  // });

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
