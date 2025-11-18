// // setupBoard.js
// import { scene } from './scene.js';
//
// export const templates = {}; // template meshes
// export const squares = {};   // board squares
// export const pieces = {};    // pieces on board, keyed by square
//
// /**
//  * Load piece templates from the model and hide them
//  * @param {THREE.Group} model - GLB containing templates (template_white_pawn, etc.)
//  */
// export function loadTemplates(model) {
//     model.traverse((child) => {
//         if (child.isMesh && child.name.startsWith("template_")) {
//             let root = child;
//             while (root.parent && root.parent !== model) {
//                 root = root.parent;
//             }
//             templates[root.name] = root;
//             root.visible = false; // keep template off-board
//         }
//     });
// }
//
// /**
//  * Map individual board squares by name (a1…h8)
//  * @param {THREE.Group} boardModel
//  */
// export function mapSquares(boardModel) {
//     boardModel.traverse((child) => {
//         if (child.isMesh && /^[a-h][1-8]$/.test(child.name)) {
//             squares[child.name] = child.position.clone();
//         }
//     });
// }
//
// /**
//  * Convert FEN char to piece type
//  * @param {string} c - 'P', 'r', etc.
//  */
// function pieceTypeFromChar(c) {
//     switch (c.toLowerCase()) {
//         case "p": return "pawn";
//         case "r": return "rook";
//         case "n": return "knight";
//         case "b": return "bishop";
//         case "q": return "queen";
//         case "k": return "king";
//     }
// }
//
// /**
//  * Spawn a piece clone on a square
//  * @param {string} type - pawn/rook/knight/bishop/queen/king
//  * @param {string} color - white/black
//  * @param {string} squareName - a1…h8
//  */
// export function spawnPiece(type, color, squareName) {
//     const key = `template_${color}_${type}`;
//     const template = templates[key];
//     if (!template) return null;
//
//     const clone = template.clone();
//     clone.name = `${color}_${type}_${squareName}`;
//     clone.position.copy(squares[squareName]);
//     scene.add(clone);
//
//     pieces[squareName] = clone;
//     return clone;
// }
//
// /**
//  * Setup board pieces from FEN string
//  * @param {string} fen
//  */
// export function setupBoardFromFEN(fen) {
//     const ranks = fen.split("/"); // ranks top to bottom
//     for (let r = 0; r < 8; r++) {
//         let file = 0;
//         for (const c of ranks[r]) {
//             if (isNaN(c)) {
//                 const squareName = String.fromCharCode(97 + file) + (8 - r); // a8, b8…
//                 let color = c === c.toUpperCase() ? "white" : "black";
//                 const type = pieceTypeFromChar(c);
//
//                 spawnPiece(type, color, squareName);
//                 file++;
//             } else {
//                 file += parseInt(c);
//             }
//         }
//     }
// }
