# Window Drag Issue Report

## Overview
The calculator app cannot be dragged around due to a mix of Electron configuration nuances and a suboptimal approach to dragging. The app relies on a custom React hook (`useWindowDrag`) which fails silently, preventing the drag action.

## The Root Cause: The Preload Script Fails to Load Silently
The app attempts to use a custom React hook `useWindowDrag` inside `src/renderer/App.tsx` that calculates mouse movements and sends IPC messages via `window.electronAPI.dragWindow` to the main Electron process.

However, `window.electronAPI` is entirely `undefined` at runtime because the preload script (`src/preload.ts`) crashes immediately upon loading. Here is why:
1. **The ESM/CJS Conflict:** In `package.json`, `"type": "module"` is defined. 
2. In `vite.config.ts`, Vite is configured to build `src/preload.ts` into `dist-electron/preload.js` utilizing the CommonJS format (`formats: ['cjs']`). This means the output file relies on `require('electron')`.
3. In modern versions of Electron (v28+), if `"type": "module"` is present in the `package.json`, `.js` files are treated strictly as ES Modules. Since ES Modules don't have `require()` defined natively, Electron throws a silent `ReferenceError: require is not defined` when attempting to load the preload script. 
4. Because the preload script crashes, it never attaches `window.electronAPI` to the browser `window`, and the `useWindowDrag` hook throws an exception the moment you try to click and drag.

## Why the Current Drag Approach Is Suboptimal
Even if the preload script loading was fixed (e.g., by telling Vite to output a `.cjs` extension for the preload file or properly configuring the ES format), dragging an Electron window via manual `mousemove` listeners and sending IPC calls is generally considered a bad practice. It causes lag, skipping, and visual stuttering because the IPC channel is asynchronous and naturally decouples from physical mouse movements when updated frame-by-frame. 

## The Ideal Solution (Zero-JavaScript Native Drag)
The best way to make frameless windows draggable in Electron is to use the native CSS property `-webkit-app-region: drag;`. 

Interestingly, the `src/renderer/index.css` file already has the most difficult part done. It flawlessly applies `-webkit-app-region: no-drag;` to all the interactive components (like `.retro-btn`, `.power-btn`, etc.), but forgets to actually apply the `drag` property to the main app wrapper itself!

To perfectly fix the drag issue, the developer only needs to do the following:
1. Open `src/renderer/index.css` and add `-webkit-app-region: drag;` to the `.calc-body` CSS class.
2. Delete the `useWindowDrag` hook entirely and remove its usage from `App.tsx`, as native dragging requires zero JavaScript.
