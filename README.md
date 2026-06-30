# Michael Tommaso — Systems Atlas

A personal portfolio built as a **Fluid Systems Atlas**: a living map where each
scroll reveals another route, artifact, or chapter. Michael builds AI systems and
operational software — agent orchestration, multi-tenant SaaS, and creative
design-to-deploy pipelines — and the site is designed to feel like a cinematic
interface-documentary of that work rather than a static card grid.

🔗 **Live site:** https://michaeltommaso.com

## Stack

- **React 19** + **Vite** — app framework and build tooling
- **Tailwind CSS v4** — design tokens and styling (`@theme` in `src/index.css`)
- **Motion** (`motion/react`) — scroll-linked routes, parallax, and image expansion
- **Formspree** — contact form delivery

## Design

- Light, warm canvas (mist / ivory / paper) with graphite ink and route accents
  (orange, blue, mint, yellow).
- Cinematic map language: routes, system nodes, artifact panels, expanding imagery.
- Fluid motion on **native scroll** (no scroll-jacking), with
  `prefers-reduced-motion` respected.

## Page structure

1. **Hero atlas** — editorial headline + interactive map of system nodes and routes.
2. **Artifact chapters** — cinematic panels for MimirAgent, McCallos, and Website Foundry.
3. **Selected builds** — engineering, ML, and early interactive projects.
4. **Process** — Research → Sketch → Build → Verify → Ship.
5. **Living layer** — what's being built now, plus career trajectory.
6. **Contact** — links, résumé, and a message form.

Repeated sections are data-driven: see `src/data/portfolioData.js`.

## Development

```bash
npm install      # install dependencies
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Project layout

```
src/
  components/   reusable UI (Navbar, AtlasMap, ArtifactChapter, BuildCard, …)
  sections/     page sections (HeroAtlas, Chapters, SelectedBuilds, Process, …)
  data/         portfolioData.js — single source of truth for content
  utils/        motion.js — shared animation variants
public/         static assets, archived interactive sites, AI-visibility files
```

## Deployment

Pushed to `main`, the site builds and deploys to GitHub Pages via
`.github/workflows/static.yml`.
