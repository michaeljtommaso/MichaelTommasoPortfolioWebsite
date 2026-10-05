# Michael Tommaso: Portfolio

Personal site for Michael Tommaso, Cornell Operations Research & Engineering '29 and CTO of McCallos.

🔗 **Live site:** https://michaeltommaso.com

## Stack

- **React 19** + **Vite**: app framework and build tooling
- **Tailwind CSS v4**: design tokens and styling (`@theme` in `src/index.css`)
- **Motion** (`motion/react`): entrance and scroll motion, with `prefers-reduced-motion` respected
- **Formspree**: contact form delivery

## Page structure

1. **Hero**: who I am, plus real product screenshots linking down to each card.
2. **Work**: McCallos and the Empire Environmental document agent.
3. **Projects**: Coursemap, Guitar Tutor, Mimir + Bifrost.
4. **Client work** and **Earlier builds**.
5. **Experience** and **Education**.
6. **Contact**: email, links, résumé, and a message form.

All content lives in `src/data/portfolioData.js`; sections map over it. Product screenshots live
in `src/assets/real/`. `public/og-image.png` is the link-preview card.

## Development

```bash
npm install      # install dependencies
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Deployment

Pushes to `main` build and deploy to GitHub Pages via `.github/workflows/static.yml`.
