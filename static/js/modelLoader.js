//modelLoader.js
import { scene } from './scene.js';
import { hoverables } from './hover.js';
export function loadChessModel(onLoaded) {
    const loader = new THREE.GLTFLoader();

    loader.load(
        '/static/models/chess_set_v8.glb',
        function (gltf) {
            const model = gltf.scene;
            model.scale.set(1000, 1000, 1000);

            // Center model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);

            const pieces = [];

            // Traverse and group by top-level parent
            model.traverse((child) => {
                if (child.isMesh) {
                    console.log("Found mesh:", child.name, "material:", child.material?.name);

                    // Ignore the board
                    if (!child.material.name.toLowerCase().includes('board')) {
                        // Find top-level parent under model
                        let root = child;
                        while (root.parent && root.parent !== model) {
                            root = root.parent;
                        }

                        if (!pieces.includes(root)) {
                            // Assign hover data to root
                            root.userData.originalY = root.position.y;
                            root.userData.targetY = root.position.y;
                            root.userData.levitateOffset = 0.01;
                            hoverables.push(root);
                            pieces.push(root);

                        }
                    }
                }
            });

            scene.add(model);

            if (onLoaded) onLoaded(model);
        },
        undefined,
        function (error) {
            console.error('Error loading model:', error);
        }
    );
}