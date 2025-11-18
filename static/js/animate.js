// animate.js
import { renderer } from './renderer.js';
import { camera } from './camera.js';
import { controls } from './controls.js';
import { scene } from "./scene.js";
import { updateHover } from "./hover.js"

export function startAnimation(model) {
    function animate() {
        requestAnimationFrame(animate);

        // if (model) model.rotation.y += 0.0005;

        updateHover()
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}
