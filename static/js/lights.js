// lights.js
import { scene } from './scene.js';

export function addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(100, 100, 100);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1);
    dirLight2.position.set(-100, 50, -100);
    scene.add(dirLight2);
}
