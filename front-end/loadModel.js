// loadModel.js
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const model3D = document.getElementById("3dSpace");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Escena del modelo
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.7);
renderer.shadowMap.enabled = true;
model3D.appendChild(renderer.domElement);

camera.position.set(0, 2, 3);

// Luces
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);

const loader = new GLTFLoader();
let mixer;
let character;
let action;

loader.load(
  "testTalking.glb",
  (gltf) => {
    character = gltf.scene;
    character.scale.set(4, 4.3, 2);
    character.position.set(0, -3.5, 0);
    scene.add(character);

    mixer = new THREE.AnimationMixer(character);

    if (gltf.animations.length > 0) {
      action = mixer.clipAction(gltf.animations[0]);
    }

    // Escuchar el evento personalizado para iniciar la animación
    window.addEventListener("startAnimation", () => {
      if (action) {
        action.reset().play();
      }
    });

    // Escuchar el evento personalizado para detener la animación
    window.addEventListener("stopAnimation", () => {
      if (action) {
        action.stop();
      }
    });
  },
  undefined,
  (error) => {
    console.error("Error loading model:", error);
  }
);

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  if (mixer) {
    mixer.update(clock.getDelta());
  }

  renderer.render(scene, camera);
}
animate();
