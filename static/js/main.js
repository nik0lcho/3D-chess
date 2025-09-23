import { renderer } from './renderer.js';
import { camera, setupResize } from './camera.js';
import { addLights } from './lights.js';
import { addEnvironment } from './environment.js';
import { loadChessModel } from './modelLoader.js';
import { startAnimation } from './animate.js';

// Set initial camera position
camera.position.z = 300;

// Handle window resize
setupResize(renderer);

// Add lights and environment
addLights();
addEnvironment();

// Load chess model and start animation
loadChessModel((model) => {
    startAnimation(model);
});
