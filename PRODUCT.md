# Product

## Register

brand

## Users

Primarily engineering peers and the builder community — other engineers, AI/systems
practitioners, and designers exploring what Michael builds. They arrive curious, on
desktop or mobile, often from a shared link or GitHub. Recruiters and potential
collaborators are a secondary audience; for them the site must still surface proof
(Resume, GitHub, LinkedIn, project artifacts) without friction. The site is a
showcase more than a pitch.

## Product Purpose

A personal portfolio for Michael Tommaso, who builds AI systems and operational
software (agent orchestration — MimirAgent, multi-tenant SaaS — McCallos, and
design-to-deploy pipelines — Website Foundry). The current direction is the
**Orbital Foundry Scroll Cinema**: a slow, continuous, scroll-driven cinematic
route through the systems he builds. Videos are the environment; text is restrained
captioning; proof appears as dark field notes and artifact panels. Success: a
visitor understands the caliber of Michael's systems work within one scroll-through
and remembers the experience.

## Brand Personality

Cinematic, precise, serious. Slow awe and controlled traversal — a builder
documentary, not a highlight reel. Voice is restrained and confident: captions,
field notes, and artifact labels rather than marketing copy.

## Anti-references

- Underexposed video buried under heavy black overlays; media must stay visible.
- Cyber/sci-fi UI chrome pasted on top of footage (HUD frames, glitch text, neon grids).
- Generic black SaaS dashboard aesthetics in the tail sections.
- Static card-grid portfolios; identical project cards with icon + heading + blurb.
- Mismatched bright imagery (the light Fluid Systems Atlas plates) inside the dark cinema.
- Scroll-jacking that fights the reader; movement must map faithfully to scroll.

## Design Principles

1. **Video is the environment, not decoration** — footage carries the atmosphere;
   UI never competes with it, and overlays stay localized and light.
2. **Earn slowness with runway** — pacing comes from long scroll distance mapped to
   full clip duration, never from clamping or artificial delay.
3. **Proof over pitch** — show real systems, artifacts, and field notes; let the
   work argue for itself in a documentary register.
4. **Restrained captioning** — text is sparse, precise, and readable against motion;
   hierarchy through scale and placement, not boxes and borders.
5. **Every viewer gets the story** — reduced-motion and mobile users get bright
   poster stills and full content, not a degraded experience.

## Accessibility & Inclusion

- `prefers-reduced-motion: reduce` swaps video scrub for bright static posters; no
  scroll-driven media for reduced-motion users.
- Mobile devices receive poster fallbacks instead of video downloads.
- Caption/body text must remain ≥4.5:1 contrast against the darkest video frames
  (localized gradients where needed, never full-frame darkening).
- Native scroll only; no scroll-jacking. Focus states visible (`:focus-visible` outline).
- Target WCAG 2.1 AA.
