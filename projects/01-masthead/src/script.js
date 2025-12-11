import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import GUI from "lil-gui";

// Goals: Recreate Strib headline in 3D. Load some brand specific typeface and bring it into project.

// Debug UI
const gui = new GUI({
  width: 200,
});
const debugObject = {};

window.addEventListener("keydown", (event) => {
  if (event.key == "h") gui.show(gui._hidden)
})

// Get canvas
const canvas = document.querySelector("canvas.webgl");

// Get scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();
const starTexture = textureLoader.load("/textures/Star_Symbol_RGB.png");
starTexture.colorSpace = THREE.SRGBColorSpace;

const matcapTexture = textureLoader.load("/textures/7.png")
matcapTexture.colorSpace = THREE.SRGBColorSpace

// Font, tktk
const fontLoader = new FontLoader();

fontLoader.load("/fonts/Publico-Banner-Black-Regular.json", (font) => {
  const textGeometry = new TextGeometry("Strib", {
    font: font,
    size: 1,
    depth: 0.2,
    curveSegments: 9,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSegments: 3,
  });
  textGeometry.center();
  const material = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture,
  });
  const text = new THREE.Mesh(textGeometry, material)
  scene.add(text)

const planeGeometry = new THREE.PlaneGeometry(1, 1);
const objectMaterial = new THREE.MeshBasicMaterial({
  map: starTexture,
  transparent: true,
});
  
for (let i = 0; i < 1000; i++) {
  const plane = new THREE.Mesh(planeGeometry, objectMaterial)

  plane.position.x = (Math.random() - 0.1) * 100
  plane.position.y = (Math.random() - 0.1) * 100
  plane.position.z = (Math.random() - 0.1) * 100

  scene.add(plane)
}
});

// Object
// const image = "/textures/Star_Symbol_RGB.png"
// const options = ExtrudedImage {
//   thickness: 0.3,
//   size: 3, 
//   alphaThreshold: 128
// }

// const extrudedImage = new ExtrudedImage(image, options)
// scene.add(extrudedImage)

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

// const cameraPos = gui.addFolder("Camera")
// cameraPos.add(camera.position, "z").min(-5).max(7).step(0.01)

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

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
