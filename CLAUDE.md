# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page React site for the Faculty of Informatics Engineering (كلية الهندسة المعلوماتية), Tishreen University (جامعة اللاذقية). Arabic-only, RTL layout, no backend — all content is static JS data files rendered client-side. Heavy use of 3D (`@react-three/fiber`) and motion (`framer-motion`) for an interactive, animated feel.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run lint` — ESLint (flat config); **must be run and pass clean before considering any task done**
- `npm run preview` — preview a production build locally

There is no test runner configured in this repo.

## Stack constraints (from `.cursor/rules` / `.kiro/rules`)

- **JavaScript only** — do not introduce `.ts`/`.tsx` unless explicitly asked; `@types/*` packages exist purely for editor intellisense.
- React 19 + Vite 8 (beta), pinned versions — do not auto-upgrade.
- Deploy target is GitHub Pages via `gh-pages`; keep asset paths relative and check `vite.config.js`'s `base` before adding routes/assets.
- Functional components + hooks only, no class components.
- Co-locate a component's styles/subcomponents inside its own folder under `src/components/`.
- Extract logic into `src/hooks/` once a component's state logic grows past simple UI state.
- No inline styles except one-off dynamic values (e.g. accent colors computed per department) — otherwise use CSS files.
- Mobile-first, non-negotiable: verify every UI change at ~375px, ~768px, and ~1280px. No horizontal scroll unless explicitly intended (e.g. a carousel). Touch targets ≥ 44px.
- Prefer `clamp()`/flex/grid over fixed pixel widths.

### Animation rules

- Shared motion variants (easing, durations, stagger, spring configs) live **only** in `src/lib/animations.js` — reuse them, don't hand-roll new easing/duration values per component.
- Stack: `motion` (Framer Motion v13, imported as `import { motion } from 'motion/react'`), `lenis` for smooth scroll, `react-intersection-observer` for scroll reveals (trigger once per element, no re-animation on scroll-up unless asked).
- Always respect `prefers-reduced-motion` (see `usePrefersReducedMotion` hook / `reducedMotionVariants` in `animations.js`) — never ship motion that ignores it.
- Entrance animations: 200–400ms; never delay interactivity of form inputs or primary nav with animation.

### React Three Fiber (3D) rules

- Keep R3F components strictly inside `<Canvas>`; never place plain DOM elements inside `<Canvas>` unless wrapped in drei's `<Html>`.
- Never call `setState` inside a `useFrame` loop — mutate Three.js object properties directly via refs (e.g. `ref.current.rotation.y += 0.01`).
- Wrap 3D asset loading in `<Suspense>` with a lightweight fallback; use drei's `useGLTF`/`useTexture` and call `.preload()` at module scope for critical assets.
- Dispose materials/geometries on unmount to avoid WebGL context leaks.
- Reference static 3D assets from `public/` with absolute paths.

## Architecture

### Render tree

`main.jsx` → `App.jsx` (mounts `useLenis()` smooth-scroll globally, renders `ScrollProgress` + `AcademicApp`) → `pages/AcademicApp.jsx`.

`AcademicApp` is the entire app shell: it holds `activeTab` state (`'home' | 'basics' | 'software' | 'networks' | 'ai' | 'contest'`) and a `theme` state (via `useTheme`), and does manual tab-switching (no router) — `renderTab()` in that file is the single dispatch point mapping tab id → page component. `SiteHeader`/`SiteFooter` wrap every tab and receive `activeTab`/`onTabChange`.

Note: `src/App.jsx`/`src/main.jsx` (repo root level) is the real live entry; `src/SoftwareEngApp.jsx` and `src/Myfirstcomponont.jsx` are legacy/scaffold leftovers (`SoftwareEngApp.jsx` just re-exports `SpecialtyPage`) — check before assuming they're part of the active flow.

### Department theming

`src/lib/departments.js` is the single source of truth for the three engineering tracks (`software`, `networks`, `ai`) plus `home`/`basics`/`contest`, each with an `accent`/`accentSecondary`/`heroFrom`/`heroTo`/`sceneVariant`. `getDepartment(id)` is how any component resolves a department's colors — a `SpecialtyPage` is generic and driven entirely by `departmentId` plus this theme data, not per-department components. Global chrome (header/shell) colors instead come from `SITE_THEME`, which reads CSS custom properties defined in `src/index.css` (`--shell-bg`, `--card-bg`, `--text-primary`, etc.) so they respond to the `data-theme` attribute set by `useTheme`.

### Content vs. presentation split

Copy lives entirely in `src/data/*.js` (`shellContent.js` for home/basics, `specialtyContent.js` for the three specialty tracks, `contestContent.js` for the contest page), separate from the components that render it. `SpecialtyPage.jsx` is a single generic template shared by `software`/`networks`/`ai` — to change a specialty's content, edit `specialtyContent.js`, not the page component; to change layout/behavior shared across all three specialties, edit `SpecialtyPage.jsx`.

### Components vs. hooks vs. lib

- `src/components/` — presentational, reusable pieces (cards, reveals, magnetic buttons, the 3D hero scenes, quiz steps, etc.), each in its own folder.
- `src/hooks/` — cross-cutting stateful logic: `useLenis` (smooth scroll), `useTheme` (light/dark + persistence), `usePrefersReducedMotion`, `useUiSound` (see `src/lib/uiSound.js` + `src/assets/sound/*.mp3` for the small sound-effect system used on quiz/interaction feedback).
- `src/lib/` — pure, non-React logic/config: `animations.js` (motion variants), `departments.js` (theme/data lookup), `uiSound.js`.

### RTL / language

Every page is rendered with `dir="rtl" lang="ar"` at the top level (`AcademicApp`); assume RTL-aware styling (e.g. `pe-`/`ps-` logical Tailwind properties, flipped icons/chevrons) rather than LTR-first `left`/`right`.
