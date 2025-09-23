// controls.js
import { camera } from './camera.js';
import { renderer } from './renderer.js';

export const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
controls.minDistance = 150;
controls.maxDistance = 600;
