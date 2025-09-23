// environment.js
import { scene } from './scene.js';
import { renderer } from './renderer.js';

export function addEnvironment() {
    const rgbeLoader = new THREE.RGBELoader();
    rgbeLoader.load('/static/hdr/qwantani_dusk_2_puresky_4k.hdr', function(texture) {
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;

        scene.environment = envMap;
        scene.background = envMap;

        texture.dispose();
        pmremGenerator.dispose();
    });
}
