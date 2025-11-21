import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import GUI from "lil-gui";

// Goals: Recreate Strib Logomark in 3D. Load some brand specific typeface and bring it into project.

// Debug UI
const gui = new GUI();

// Get canvas
const canvas = document.querySelector("canvas.webgl");

// Get scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();
const starTexture = textureLoader.load("/textures/Star_Symbol_RGB.png");
starTexture.colorSpace = THREE.SRGBColorSpace;

// Font, tktk

// Object
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const plane = new THREE.Mesh(planeGeometry, starTexture);
scene.add(plane);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// Add a resize event listener
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

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Rendererer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animation
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();
