// modelLoader.js
import { scene } from './scene.js';

export function loadChessModel(onLoaded) {
    let model = null;
    const loader = new THREE.GLTFLoader();

    loader.load(
        '/static/models/chess_set.glb',
        function (gltf) {
            model = gltf.scene;
            model.scale.set(1000, 1000, 1000);

            // Center model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);

            scene.add(model);

            if (onLoaded) onLoaded(model);
        },
        undefined,
        function (error) {
            console.error('Error loading model:', error);
        }
    );

    return model;
}
