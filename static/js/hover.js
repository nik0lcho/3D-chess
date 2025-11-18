// // hover.js
// import {camera} from "./camera.js";
// import {renderer} from "./renderer.js";
//
// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();
// export let hoverables = []
// let hovered = null;
//
// // Mouse move event
// export function onPointerMove(event) {
//     const rect = renderer.domElement.getBoundingClientRect();
//     mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//     mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
// }
//
// window.addEventListener('pointermove', onPointerMove);
//
// // Called inside animate()
// export function updateHover() {
//     if (!hoverables || hoverables.length === 0) return;
//
//     raycaster.setFromCamera(mouse, camera);
//     const intersects = raycaster.intersectObjects(hoverables, false);
//     let newHovered = intersects.length > 0 ? intersects[0].object : null;
//
//     if (newHovered !== hovered) {
//         if (hovered) hovered.userData.targetY = hovered.userData.originalY;
//         if (newHovered) {
//             newHovered.userData.targetY =
//                 newHovered.userData.originalY + newHovered.userData.levitateOffset;
//         }
//         hovered = newHovered;
//     }
//
//     // Animate levitation
//     hoverables.forEach((m) => {
//         m.position.y = THREE.MathUtils.lerp(m.position.y, m.userData.targetY, 0.12);
//
//         // Scale feedback
//         const targetScale = m === hovered ? 1.05 : 1.0;
//         m.scale.x = THREE.MathUtils.lerp(m.scale.x, targetScale, 0.12);
//         m.scale.y = THREE.MathUtils.lerp(m.scale.y, targetScale, 0.12);
//         m.scale.z = THREE.MathUtils.lerp(m.scale.z, targetScale, 0.12);
//     });
// }
//
// window.updateHover = updateHover; // make available in main.js

import { camera } from "./camera.js";
import { renderer } from "./renderer.js";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
export let hoverables = [];
let hovered = null;

// Pointer tracking
export function onPointerMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

window.addEventListener("pointermove", onPointerMove);

// Called in animation loop
export function updateHover() {
    if (!hoverables || hoverables.length === 0) return;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(hoverables, true); // check children

    // Get top-level hoverable
    let newHovered = intersects.length > 0 ? intersects[0].object : null;
    while (newHovered && !hoverables.includes(newHovered)) {
        newHovered = newHovered.parent;
    }

    if (newHovered !== hovered) {
        if (hovered) hovered.userData.targetY = hovered.userData.originalY;
        if (newHovered) newHovered.userData.targetY =
            newHovered.userData.originalY + (newHovered.userData.levitateOffset || 0); // make offset larger
        hovered = newHovered;
    }

    // Animate levitation & scale
    hoverables.forEach((m) => {
        // Smooth position
        m.position.y = THREE.MathUtils.lerp(m.position.y, m.userData.targetY, 0.15);

        // Smooth scale
        const targetScale = m === hovered ? 1.05 : 1.0;
        m.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
    });
}

window.updateHover = updateHover;
