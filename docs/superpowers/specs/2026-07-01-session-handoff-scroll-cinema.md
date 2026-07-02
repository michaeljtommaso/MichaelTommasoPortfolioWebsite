# Session Handoff — Scroll-Cinema Portfolio

**Date:** 2026-07-01
**Owner:** Michael Tommaso
**Companion:** `2026-06-30-norse-scroll-cinema-portfolio-design.md` (the design spec)
**Purpose:** Everything decided, built, and preferred in this working session so another agent
(e.g. Codex) can continue seamlessly without re-deriving context.

---

## 0. TL;DR — current state

- We are **reinventing the portfolio as a "scroll-cinema"**: one continuous cinematic that
  plays as you scroll; at story beats the camera "arrives" and a real project is summoned.
- The **engine + Beat 0 are built** on branch `feat/norse-scroll-cinema` (pushed to origin).
  **`main` is untouched** (still `b4a673e`) so the live GitHub Pages site is safe.
- **⚠ The visual THEME is in flux.** Michael likes the plan, the mechanic, and the idea, but is
  **no longer sure about the Norse-battlefield world**. He's sampling radically varied
  directions (deep-space, landscapes, cyberpunk, etc.) via a ChatGPT ideation prompt.
- **Locked and theme-agnostic:** the mechanic, the scroll-cinema engine, the beat structure,
  the content lineup, the phasing, and all working preferences. **Open:** the visual world,
  the AI assets, and themed copy.
- **Next:** Michael picks a world → we re-theme Beat 0 (swap asset + copy, engine unchanged) →
  Phase 0 look-lock → build Beat 1.

---

## 1. The concept (theme-agnostic core — this does NOT change)

- The whole page is **one long cinematic "cutscene."** Scrolling drives the camera/journey
  forward. It is **pre-rendered AI imagery/video scrubbed by scroll** — NOT a real-time 3D
  engine. (AI generates pre-rendered media; that's how the awwwards look is actually achieved.)
- At key **story beats** the camera "arrives" somewhere and a **real project is summoned** and
  then presented **clearly and professionally** (real name, description, link/proof).
- **Atmosphere is the stage, not a disguise** — a recruiter must still read each project fast.

## 2. Locked decisions (theme-agnostic)

| Decision | Choice |
|---|---|
| Scope | Full **reinvention** (not an in-place upgrade) |
| Realization | **Pre-rendered cinematic** (AI frames/clips scrubbed on scroll) |
| Metaphor depth | **Atmosphere + literal content** (readable for recruiters) |
| Video model | **Hybrid** — one AI cinematic backbone (front) + modular non-video tail (v1) |
| Build sequencing | **Spike → vertical slice → full build** |
| Governing principle | **First AI generation must be excellent (it costs money)** — validate look cheaply with stills first |

## 3. Theme status — IN FLUX (do not treat Norse as final)

- **Original direction (now a placeholder):** Norse / God-of-War tech-fusion, chosen because
  Michael's real projects are *already Norse-named* — **Mimir** (god of wisdom → agent
  intelligence core), **Bifrost** (rainbow bridge → the agent operating workstation), and
  **Huginn/Muninn** (Odin's ravens: thought & memory → the AI worker fleet). Warrior was
  **helmeted / face-obscured** for cross-shot AI consistency.
- **As of 2026-07-01:** Michael wants to explore other worlds first. He asked for (and received)
  a ChatGPT prompt that generates **10 radically varied world concepts** (space, landscape,
  mythic, cyberpunk, brutalist, surreal, underwater, cartographic, abstract, wildcard), each
  with a cold-open image prompt, ranked by wow / brand-fit / production feasibility.
- **When a world is chosen:** keep a consistency strategy (a consistent POV/character *or*
  "world-forward" with sparse character), keep the beat structure, swap assets + themed copy.
  If a Norse-style recurring figure survives, keep it helmeted/obscured for consistency.

## 4. Content lineup & staging (LOCKED — theme-agnostic; these are Michael's explicit calls)

Ranked from his real body of work (details live in his Obsidian vault; see §8).

- **Flagship I — McCallos v2 (FIRST).** His biggest, most serious build: production
  multi-tenant property-ops SaaS (React + Vite + Firebase; Cloud Functions, RBAC security
  hardening, mobile field ops, tenant PWA, analytics, in-app AI assistant; ~73 documented
  vault pages). It leads because of the sheer depth/effort. *(Norse staging was "the Stronghold".)*
- **Flagship II — Mimir, as ONE umbrella (NOT three separate agent cards).** This was an
  explicit preference: Mimir = the whole agent operating system — **Hermes** core + **Bifrost**
  (operating workstation / bridge) + **Website Foundry** (the design-to-deploy creative
  pipeline) + the **Huginn/Muninn worker fleet** — and it *runs a real business* (The Dock
  House, TikTok/Etsy). Website Foundry and Bifrost are **components of Mimir**, not peers.
  *(Norse staging was "Mímir's Well".)*
- **The Armory (supporting tier):** StockBot (ML stock-trading bot, has a real repo),
  Closet Curations Co. (polished React 19 client site — entry choreography, parallax, video
  door intro), Cornell Degree Planner (**in progress** — stage as a "currently building"
  teaser; optional for v1), Aquatic Vehicle (3D/hardware, aerospace internship), early
  interactive school builds (Punnett Square, Chi-Square, Metronome, Theology project).
- **Then:** Process (Research → Sketch → Build → Verify → Ship), the "Saga" (trajectory +
  now-building: GE Aerospace intern, Empire Environmental CAD, Bay Ridge Fish Bar manager),
  and Contact.
- **Scene order:** McCallos **before** Mimir, per Michael. (Tunable — Mimir is the more visually
  spectacular beat, so leading with it is a valid alternative if a future theme favors it.)
- Content stays **data-driven** (continue the `src/data/portfolioData.js` pattern).

## 5. v1 scope & phasing

- **v1 cinematic backbone (AI video):** opening establishing world → journey → **McCallos** →
  **Mimir**. Non-negotiable v1 content: the opening world, McCallos, Mimir.
- **v1 tail (NO AI video yet):** Armory, Process, Saga, Contact = real screenshots + parallax
  + UI. Upgradeable to video later.
- **Phases:** Phase 0 = cheap-stills look-lock (cost gate). Phase 1 = engine + vertical slice
  (cold open → first flagship). Phase 2 = add Mimir + build the tail. Phase 3 = perf /
  mobile+reduced-motion poster fallbacks / a11y / cross-browser scrub verification.

## 6. AI asset & production learnings (important reframes)

- **AI video = short clips (~5–10s), not one long coherent shot.** You *deliver* "one long
  video" by generating short clips and **editing them into one seamless master** (cuts/
  transitions hide the seams, like any film/game cutscene). Consistency = a **master keyframe +
  a style bible** every clip references.
- **Photos vs video:** the AI world = **video** for motion beats; **parallax stills** where no
  motion is needed; **real product screenshots** (McCallos dashboard, Closet, StockBot charts)
  live in the **content panels layered on top** — those are photos, not AI cinema.
- **Image-first:** lock the look with cheap stills before spending on video.
- **Higgsfield was DOWN** this session, so Michael is generating stills via **ChatGPT** for now.

## 7. What was actually built (branch `feat/norse-scroll-cinema`)

- **Stack added:** `gsap` (ScrollTrigger) + `lenis`. Kept React 19 + Vite + Tailwind v4.
- **Files:**
  - `src/cinematic/lib/gsap.js` — single GSAP + ScrollTrigger registration point.
  - `src/cinematic/lib/useLenis.js` — Lenis smooth-scroll driven on GSAP's ticker (kept in
    lockstep with ScrollTrigger); fully disabled under `prefers-reduced-motion`; sets
    `html scroll-behavior: auto` while active.
  - `src/cinematic/scenes/ColdOpen.jsx` — **Beat 0 "The Hold"**: pinned full-bleed cold-open;
    scroll-scrubbed push-in (image scale 1.06→1.26) + title lift; on-load title entrance +
    animated scroll cue; static visible fallback under reduced motion.
  - `src/cinematic/CinematicExperience.jsx` — mounts `useLenis` + `ColdOpen` + a **Beat 1
    placeholder** section (proves pin-release/hand-off until the first real video exists).
  - `src/App.jsx` — now renders `<CinematicExperience/>`. **The previous portfolio is
    preserved** (Navbar, HeroAtlas, Chapters, SelectedBuilds, Process, LivingLayer, Contact +
    all of `src/components` and `src/sections`) in the repo and on `main` — reuse its content
    and data.
  - `src/assets/cinematic/coldopen.png` — 3 MB PNG **placeholder** hero (current Norse anchor,
    "option C"). **TODO: convert to WebP** — it's the LCP image.
  - `example-images/*.png` — 4 art-direction reference stills (Norse options A / B / C + a
    near-dup). Kept for reference; will be superseded once a world is chosen.
- **Verified in-browser** via Playwright: title resolves → scroll pins + pushes in + title
  lifts → pin releases + hands off to Beat 1. Production build is clean.
- **Known follow-ups (non-blocking):** WebP the hero; the headline copy is a placeholder
  ("A campaign of the systems I build" / kicker "Michael Tommaso" / sub "Scroll to follow the
  route — from battlefield to artifact") — all theme-dependent, retune when the world is set.

## 8. Real project references (Michael's Obsidian vault)

Vault root: `C:\Users\Michael Tommaso\Desktop\Obsidian`. Useful pages for real project copy:
`mccallos-overview` (73-page hub), `hermes-overview` + `hermes-*`, `mimir-token-routing`,
`bifrost-operating-workstation`, `closet-curations-co`, `cornell-degree-planner`,
`summer-os`. StockBot has a public GitHub repo. (Vault is Michael's private KB — read for
accurate descriptions; don't copy verbatim into the site without his voice.)

## 9. Earlier code-review fixes (also on this branch)

From the opening review of the *existing* site, carried onto this branch:
- **Fixed:** AtlasMap route draw (`pathLength` 0→1; the "drawn with scroll" comment was a lie),
  AtlasMap node scale-entrance (was inert with `initial={false}`), removed unused deps
  (`framer-motion`, `lucide-react`; `lenis` was removed then intentionally re-added for the
  cinematic).
- **Open, and the whole reinvention is the fix:** on the old site the three flagship projects
  all linked to a *generic GitHub profile*, not real repos/proof — the #1 credibility problem.
  **Ensure every artifact panel in the new build has a real, specific link or on-page proof.**
- Also flagged on the old site: missing `og:image`; mobile atlas dropped routes. Likely moot
  after reinvention, but re-check OG image + mobile parity in Phase 3.

## 10. Working preferences (how Michael wants us to operate)

- **Git: NEVER push to `main`.** Work on a branch, push the branch only. `main` = the live
  GitHub Pages site and must stay safe. Merge only when he explicitly approves. Local
  working-tree changes are fine.
- **Cost-conscious on AI generation:** the first generation must be excellent; validate cheaply
  with stills before spending on video; keep generation sets tight.
- **Verify in the real browser**, not just a passing build — he values seeing it work.
- **Direct, concise communication; give a recommendation, not an option-dump.**
- **Content must stay recruiter-readable** despite the cinematic wrapper.

## 11. Immediate next steps for the continuing agent

1. **Wait for the chosen visual world** (Michael is sampling concepts via ChatGPT). Then update
   the design spec's art-direction rows + record the new cold-open anchor.
2. **Re-theme Beat 0**: swap `src/assets/cinematic/coldopen.png` + the `ColdOpen.jsx` copy to
   the chosen world. **Engine code is unchanged.**
3. **Phase 0**: lock the cold-open look with cheap stills for the chosen world.
4. **Build the Beat 1 scaffold**: a pinned video-scene component with a placeholder clip,
   ready to drop the real "arrival/first-beat" video in.
5. **Generate flagship environment stills**: McCallos first, then Mimir.
6. **Polish**: WebP the hero; finalize headline/section copy in Michael's voice.
