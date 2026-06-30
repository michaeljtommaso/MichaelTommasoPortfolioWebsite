# Norse Scroll-Cinema Portfolio — Design Spec

**Date:** 2026-06-30
**Status:** Approved (design) — pending spec review → implementation plan
**Owner:** Michael Tommaso

---

## 1. Vision

Reinvent the portfolio as a single continuous **scroll-driven cinematic** — a Norse,
God-of-War-leaning campaign where scrolling advances the story like a cutscene. A
helmeted warrior on a battlefield; each story beat (an arrow looses, a well ignites)
**summons a real portfolio artifact** that is then presented clearly and professionally.

The mythology is not a costume — it is already Michael's naming system:
- **Mimir** — Norse god of wisdom/memory → the AI agent intelligence core.
- **Bifrost** — the bridge between realms → Mimir's operating workstation.
- **Huginn & Muninn** (Odin's ravens: thought & memory) → the AI worker fleet.

The drama is the *stage*; every artifact still hits a recruiter with real name, real
description, real link.

## 2. Locked decisions

| Decision | Choice | Rationale |
|---|---|---|
| Scope | **Reinvent the experience** | Full cinematic rebuild, not an in-place upgrade. |
| 3D realization | **Pre-rendered cinematic** (AI frames/clips scrubbed on scroll) | AI tools produce pre-rendered media, not a live 3D engine. This is how the awwwards look is actually achieved; ships in weeks. |
| Metaphor depth | **Atmosphere, literal content** | Epic staging frames the content; project panels stay readable for recruiters. |
| Art direction | **Norse-tech fusion, God-of-War-leaning** | Gritty cinematic realism, ash/embers/god-rays, glowing accents. Matches Mimir/Bifrost naming. |
| Warrior portrayal | **Helmeted / armored, face obscured** | Far easier cross-shot consistency; intentionally cinematic; viewer projects onto the figure. |
| Video model | **Hybrid** — one AI cinematic backbone (front) + modular non-video tail | Front half is the seamless cinematic; content-dense tail stays light and cheap for v1. |
| Build sequencing | **Spike → vertical slice → full build** | De-risk art direction and scroll mechanics before committing AI-generation credits to the full shot list. |

### v1 must-haves & governing principle

- **v1 cinematic backbone (AI video):** battlefield cold open → Bifrost → **McCallos**
  (Stronghold) → **Mimir** (Well). Generate the longest, strongest coherent cinematic we
  can and build the scroll around it.
- **Non-negotiable v1 content:** the **battlefield**, **McCallos**, and **Mimir**.
- **v1 tail (no AI video yet):** Armory / extra projects, Process, Saga, Contact — lighter
  photo + parallax + UI sections; upgradeable to video later.
- **Governing principle — first generation must be excellent because it costs money.**
  Phase 0 nails the battlefield look + prompt/style workflow on cheap test generations
  before spending on the full backbone. Minimize re-rolls via the master keyframe + style
  bible.

## 3. Content lineup

| Tier | Project | Norse staging | Real content |
|---|---|---|---|
| **Flagship I** | **McCallos v2** | The Stronghold | Production multi-tenant property-ops SaaS (React + Vite + Firebase): Cloud Functions, RBAC security hardening, mobile field ops, tenant PWA, analytics, AI assistant. The proof-of-depth piece. |
| **Flagship II** | **Mimir** (the whole agent OS) | Mímir's Well | One realm, not three cards: Hermes core + **Bifrost** (bridge) + **Website Foundry** (forge) + the **Huginn/Muninn** worker fleet — running a real business (The Dock House). |
| **The Armory** | StockBot, Closet Curations, Cornell Degree Planner *(in progress)*, Aquatic Vehicle, early interactive builds | The Armory | Range: ML, polished client craft, current work, hardware/engineering, origins. |

Two flagships carry the weight; the armory shows range. Content remains data-driven
(`src/data/portfolioData.js` lineage).

## 4. Narrative spine (scene-by-scene)

Each scene is a **pinned cinematic beat**: the hero clip or parallax still scrubs as you
scroll; at its climax a story trigger summons the artifact panel.

**Locked cold-open anchor:** `example-images/scene0-coldopen-C-bifrost-beam-vikingfield.png`
— helmeted, caped warrior on a rocky outcrop above a Viking battlefield aftermath (shields,
banners, fallen, fires, mist), god-rays through storm, a vertical **Bifrost light-beam**
descending into a distant ruined city (the gateway to the systems realm). This still is the
art-direction reference for all subsequent generations. (Alternates kept: option B aurora +
hilltop castle; option A rainbow + spire-city — mineable for later beats.)

**Opening beat sequence (on the anchor's geography):** 0 Hold (still C, slow parallax push,
title) → 1 First strike (image→video: warrior leaps from the outcrop into the battlefield,
axe-first, cyan rune shock, cape flares) → 2 Advance (forward travel across the field toward
the city) → 3 The crossing (Bifrost beam at the city = gateway into the flagship realm).
Flagship locations (Stronghold = McCallos, Well = Mimir) use dedicated environment shots.

| # | Scene (myth) | Real content it summons | v1 treatment |
|---|---|---|---|
| 0 | **Cold open** — helmeted warrior on a ridge over a dusk battlefield; ash + god-rays; title resolves | Name + headline; "Begin" rune prompts scroll | **AI video** (backbone) |
| 1 | **The Bifrost** — scroll carries across the glowing bridge; light world → systems realm (light→dark journey) | Short "who I am" intro | **AI video** (backbone) |
| 2 | **The Stronghold** *(Flagship I)* — a fortress holding the line | **McCallos v2** + real screenshots | **AI video** (backbone) |
| 3 | **Mímir's Well** *(Flagship II)* — a glowing well beneath the great tree ignites; ravens circle | **Mimir** agent OS (Hermes + Bifrost + Foundry + worker fleet + The Dock House) | **AI video** (backbone) |
| 4 | **The Armory** | StockBot, Closet Curations, Cornell Degree Planner, Aquatic Vehicle, early builds | Photo + parallax (no AI video v1) |
| 5 | **The Discipline** | Process — Research → Sketch → Build → Verify → Ship as a path of trials | Photo + parallax / UI |
| 6 | **The Saga** | Trajectory + Now building — jobs as campaigns, current work as the active front | UI / parallax |
| 7 | **The Summons** — warrior turns to face viewer; a horn sounds | Contact — "Let's build something" | UI (light cinematic still) |

> Note: McCallos precedes Mimir per Michael's call (most effort → first flagship). Order
> is a tunable; locked for v1.

## 5. Technical architecture

**Stack** (evolve, don't replace):
- Keep **React 19 + Vite + Tailwind v4**.
- Add **GSAP ScrollTrigger** — pinned, scroll-scrubbed scenes (the core engine).
- Re-add **Lenis** — smooth-scroll layer. (Previously removed in cleanup; earns its place back here.)

**Scene unit (repeatable):**
1. Section **pins** to the viewport.
2. Scroll **scrubs** the scene's hero clip frame-by-frame, OR drives a **parallax still**
   (keyframe + depth layers + slow push).
3. At the climax, the **story trigger** fires and the **artifact panel** reveals (real
   content, readable, linked).
4. Section **releases**; cut to next scene.

**Scrub mechanism:** prefer `<video>` element scrubbing for hero clips (lighter than image
sequences); fall back to image sequences only where a browser stutters. Decide per-shot
during the vertical slice.

## 6. AI asset pipeline (consistency-first)

- Generate **one master warrior keyframe** (helmeted) + a **style bible** (palette,
  lighting, grain, lens). Every shot references them — this is the consistency anchor.
- **v1 backbone = the longest coherent cinematic we can produce**, focused only on
  battlefield cold open → Bifrost → McCallos → Mimir. Realistically a small set of short
  clips (~4–8) authored/extended/stitched into one seamless master, NOT the full 10–14.
  Keep the generation set tight to control cost.
- **Higgsfield image→video** for motion shots; anchor every clip to the master reference to
  prevent drift. Helmeted warrior keeps faces out of the consistency problem.
- **First generation must be excellent (cost).** Phase 0 validates the battlefield look on
  cheap test gens and locks the exact prompt + reference workflow before producing the
  backbone. Aim to minimize re-rolls.
- v1 tail scenes use real product **screenshots + depth parallax**, not AI video.

## 7. Performance / mobile / accessibility (non-negotiable)

- **Desktop:** full scroll-cinema.
- **Mobile + `prefers-reduced-motion`:** auto-serve **poster stills** instead of scrubbed
  video — same beats, same content, far lighter. Never a multi-MB phone download.
- Lazy-load scenes; preload only the cold-open. Aggressive WebP/compression (continues
  existing practice).
- Maintain current accessibility wins: skip link, `sr-only` labels, focus-visible,
  decorative media `aria-hidden`, real content never hidden behind animation.

## 8. Phasing plan

- **Phase 0 — Art-direction spike (cost gate):** generate cheap test assets — master
  helmeted-warrior keyframe + one **battlefield** environment + one short motion clip — to
  LOCK the look, the palette/style bible, and the exact Higgsfield prompt + reference
  workflow. Do not proceed to the full backbone until the battlefield reads right.
- **Phase 1 — Engine + vertical slice:** build the scroll-cinema engine (GSAP + Lenis +
  pin/scrub/trigger primitives) and ONE fully-realized run against real assets: Cold open →
  battlefield → **McCallos** reveal. Prove the scrub + content-overlay feel end-to-end and
  measure the byte/scrub budget.
- **Phase 2 — Full v1:** extend the backbone to include **Mimir** (Well), then build the
  modular tail (Armory, Process, Saga, Contact) as photo/parallax/UI — no AI video yet.
- **Phase 3 — Polish:** performance, mobile/reduced-motion poster fallbacks, accessibility
  pass, cross-browser scrub verification. (Later, optional: upgrade tail scenes to video.)

## 9. Risks & open questions

- **Asset weight** — scroll-scrubbed video is heavy; mitigated by per-shot video-vs-still
  decisions, mobile poster fallback, and compression. Validate byte budget in Phase 1.
- **Cross-browser scrub fidelity** — `<video>` scrubbing can stutter; image-sequence
  fallback is the safety net. Verify in Phase 1.
- **AI generation cost/time** — Higgsfield credits; Phase 0 spike caps risk before the
  full shot list.
- **Hosting** — currently GitHub Pages (static). Large assets are fine but watch repo
  size / consider a CDN or `git lfs` if asset weight grows. Decide in Phase 2.
- **Open:** final scene order; exact shot count; which Armory items make v1.

## 10. Success criteria

- A first-load cinematic moment that reads as "awwwards-tier," not template.
- Every flagship + armory item presents real name/description/link a recruiter can grab in
  seconds.
- Fast, usable, non-janky on mobile and under reduced-motion.
- The Norse-tech world feels coherent across all shots (no "AI slop" drift).
