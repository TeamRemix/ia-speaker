import * as THREE from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";

const model3D = document.getElementById("3dSpace");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
model3D.appendChild(renderer.domElement);

camera.position.set(0, 1, 5); // Ajusta la posición de la cámara

// Luz direccional para iluminar el modelo desde un lado
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Luz ambiental para suavizar sombras y asegurar que todos los lados del modelo tengan algo de luz
const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Color suave
scene.add(ambientLight);

// Luces puntuales (opcional) para iluminar desde varios ángulos
const pointLight1 = new THREE.PointLight(0xffffff, 1, 50);
pointLight1.position.set(10, 10, 10);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 0.5, 50);
pointLight2.position.set(-10, -10, -10);
scene.add(pointLight2);

const loader = new FBXLoader();
let mixer;
let character;

// 1. Cargar el modelo principal sin animaciones
loader.load(
  "Bot.fbx",
  (fbx) => {
    console.log("Modelo cargado:", fbx); // Verifica en consola
    character = fbx;
    character.scale.set(0.01, 0.01, 0.01); // Ajusta el valor según sea necesario
    scene.add(character);

    // Crear un mixer para manejar animaciones del personaje
    mixer = new THREE.AnimationMixer(character);

    loader.load("idleTest.fbx", (anim) => {
      console.log("Animación cargada:", anim); // Verifica en consola
      const idleAction = mixer.clipAction(anim.animations[0]);
      idleAction.play();
    });
  },
  undefined,
  (error) => {
    console.error("Error loading model or animation:", error);
  }
);

camera.position.z = 3;

// Reloj para actualizar la animación
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  // Actualizar el mixer si hay animación cargada
  if (mixer) {
    mixer.update(clock.getDelta());
  }

  renderer.render(scene, camera);
}
