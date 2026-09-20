# 3D & Interactive Motion Stack Guidelines

## Tech Stack
- **Core**: React 19, Vite 8
- **3D & WebGL**: Three.js, `@react-three/fiber` (R3F), `@react-three/drei`
- **Animations & Smooth Scroll**: `motion` (Framer Motion v13), `lenis`, `react-intersection-observer`

---

## 1. React Three Fiber (R3F) & 3D Rules
- **Canvas Separation**: Keep R3F 3D components strictly inside the `<Canvas>` tree. Never place standard HTML DOM elements inside `<Canvas>` unless wrapped in `@react-three/drei`'s `<Html>` component.
- **Performance in `useFrame`**: 
  - NEVER trigger React state updates (`setState`) inside the `useFrame` loop.
  - Mutate Three.js object properties directly via `ref.current` (e.g., `ref.current.rotation.y += 0.01`).
- **Asset Loading & Suspense**:
  - Always wrap 3D asset loaders inside a `<Suspense>` block with a lightweight fallback loader.
  - Use Drei helpers like `useGLTF` and `useTexture`, and call `.preload()` at the module level for critical models.
- **Memory Management**:
  - Ensure materials and geometries are disposed of when custom 3D components unmount to avoid WebGL context leaks.

---

## 2. Motion & UI Animation Rules
- **Import Syntax**: Use the latest `motion` syntax for Framer Motion v13: `import { motion } from "motion/react"`.
- **GPU Acceleration**: Prioritize animating GPU-accelerated properties (`opacity`, `transform`, `scale`) to avoid layout shifts while WebGL is rendering in the background.
- **Scroll Syncing**: Integrate `react-intersection-observer` with `motion` controls to trigger 3D or UI animations smoothly when components enter the viewport.

---

## 3. Smooth Scroll (`lenis`) Integration
- Initialize `Lenis` in a top-level wrapper component (e.g., `<SmoothScroll>`).
- Ensure Lenis animation loop is cleanly destroyed/cleaned up on unmount.
- When pairing Lenis with R3F canvas scroll events, ensure `pointer-events` on overlay elements do not block 3D scene interactions.

---

## 4. React 19 & Vite Best Practices
- Use React 19 functional component patterns and Hooks.
- Reference static 3D models or textures from the `public/` directory using absolute paths (e.g., `/models/scene.glb`).
- Keep components modular: Separate 2D UI overlay code from 3D Canvas scene code.