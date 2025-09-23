const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Resize listener
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// Orbit Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
controls.minDistance = 150;
controls.maxDistance = 600;

// Lighting
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


//Background
const rgbeLoader = new THREE.RGBELoader();
rgbeLoader.load('/static/hdr/qwantani_dusk_2_puresky_4k.hdr', function(texture) {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;

    scene.environment = envMap; // reflections
    scene.background = envMap;  // HDRI as background
    texture.dispose();
    pmremGenerator.dispose();
});

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.2; // tweak 0.5–1.5 to control brightness
renderer.outputEncoding = THREE.sRGBEncoding;


let model = null;

// Load GLTF model
const loader = new THREE.GLTFLoader();
loader.load(
  '/static/models/chess_set.glb',
  function (gltf) {
    model = gltf.scene;

    // Scale model clock
    // model.scale.set(1500, 1500, 1500);
    //
    //   // Scale model sword
    // model.scale.set(15, 15, 15);

    //   // Scale model shirt
    // model.scale.set(0.6, 0.6, 0.6);

          // Scale model chess
    model.scale.set(1000, 1000, 1000);

    // Center model
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    scene.add(model);
    animate();
  },
  undefined,
  function (error) {
    console.error('Error loading model:', error);
  }
);

// Camera position
camera.position.z = 300;

function animate() {
  requestAnimationFrame(animate);

  if (model) {
    // Slow smooth rotation
    model.rotation.y += 0.0005;
  }

  controls.update();
  renderer.render(scene, camera);
}
