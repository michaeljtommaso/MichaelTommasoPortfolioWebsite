# Handoff: "Orbit" cinematic portfolio (Direction 1g)

## Overview
This is a redesign of Michael Tommaso's portfolio, built for the existing repo `michaeljtommaso/MichaelTommasoPortfolioWebsite` (React + Vite). The whole home page is one long scroll-scrubbed "powers of ten" camera move:

**Moon (intro) → Earth (McCallos) → Solar system (one planet per project) → Milky Way (experience/education) → Contact (moonrise).**

Bodies spin as you scroll, and the solar-system orbits rotate as you scroll. Each planet swings to the front, grows, and shows its text card. Clicking a planet (or its label, or "Enter orbit ↗") flies the camera into it and opens a full-screen project view. All copy comes word for word from `src/data/portfolioData.js`.

## About the design files
The files in this bundle are **design references built in HTML**: a working prototype that shows the intended look, motion, and behavior. They are not production code to paste in. Recreate them in the repo's React + Vite setup using its patterns. For the scroll scrubbing, either port `cine.js` as a small hook, or use a scroll library (GSAP ScrollTrigger, or Motion's `useScroll`/`useTransform`) with the same keyframe values.

`Direction G - Orbit.dc.html` opens straight in a browser. It needs `support.js` (a prototype runtime only, not to be shipped), `cine.js`, `image-slot.js` and `src/assets/` next to it. The markup sits between `<x-dc>` tags. The logic class (project data, open/close animations) is in the `<script data-dc-script>` block at the bottom.

## Fidelity
**High fidelity.** The colors, type, layout, timeline and easing are final intent. Planets, moon, sun and galaxy are CSS gradients standing in for AI art (see "AI image slots").

---

## The motion system (`cine.js`)
A small rAF engine. Port it as a hook or replace it with an equivalent.
- `[data-scene]`: a tall section with a `position:sticky` 100vh stage as its first child. Scene progress `p` runs 0→1 across `(sectionHeight − 100vh)`, smoothed with a factor of .14 per frame and snapping when the jump is over .25. `data-scene="view"` instead means progress as the element crosses the viewport.
- `data-fx="prop t:v t:v ease; …"`: keyframes against the nearest scene's `p`.
  - Props: `x`, `y` (with units), `scale`, `sx`, `sy`, `rot` (deg), `opacity` (opacity 0 also sets `visibility:hidden`), `blur`, `bright`, `inset`, `insetx`, `iris`, `hole`, `ls` (letter-spacing in em), `num` (count-up), `shake`.
  - Eases: `lin`, `io` (cubic in-out), `out` (cubic out), `in`, `expo`, `step`.
  - Values clamp to the first and last stop.
- `data-mouse="n"`: cursor parallax of n px, smoothed by .08.
- `data-src="page"`: progress across the whole page (used by the header progress hairline).
- `a[data-cut]` + `data-offset` (in viewport heights): letterbox "shutter cut" navigation. Two #07080a bars close to 50.5vh each in 340ms `cubic-bezier(.7,0,.3,1)`, the page jumps instantly, then the bars reopen.
- Ambient overlay at z 9000, click-through:
  - film grain (SVG fractal noise, opacity .1, `mix-blend-mode:overlay`, 0.9s 5-step jitter);
  - vignette (radial, transparent 50% → rgba(0,0,0,.6));
  - amber light leak (rgba(232,163,61,.2), blurred, 16s alternate drift).
- Performance: element lists are cached and refreshed by a MutationObserver. The engine idles when scroll and mouse are still, skips identical style writes, and stops entirely while `window.Cine.paused` is true (used while a project view is open).

## Universe timeline (the single `#universe` scene, height 3591vh)
Progress values are as shipped in the file. The camera is three nested "layers", each a 0×0 element at screen centre, inside a composition wrapper whose `x` shifts the framing in vw.
- **Comp x:** 0 → +24vw over .1→.135 (moon to the right of the hero copy). Then → −24vw over .185→.23 (bodies on the left, cards on the right). Then → 0 over .7523→.8015.
- **L1 (Earth + Moon).** Earth is 36vh across. The Moon is 7vh across, on an orbit of radius 28vh, held at −40° and rotating from −40° to −170° over .23→.3639 (counter-rotated, so its shading stays fixed).
  - Camera stops (scale, x, y in vh): 0 → s 45, (−965.3, 1000), so the moon's limb fills the bottom of the screen; .12 → s 7.43 (full moon 52vh); .185 → s 7; .23 → s 1.55 (Earth centred); .3355 → s 1.75; .3639 → s .0614, ending on Earth's position in L2.
  - Opacity drops to 0 at .3639.
- **L2 (solar system).** The orbital plane is squashed `scaleY(.42)`; planets are counter-rotated and un-squashed so they stay round. The Sun is 10vh across, with a 28vh glow and rotating conic rays.
  - Camera: .3167 → s 24.23, centred on Earth; .3639 → s .85; .7523 → s .95; .8015 → s .012, translating to the galaxy's "Sol" point (30vh, 10vh).
  - L2 fades in over .311→.3167 and out over .79→.8015.
  - The Earth→L2 handoff is matched exactly: both layers interpolate linearly with the same easing and timing.
- **Orbits (radius in vh, planet radius in vh, angular speed in deg per unit p).** Each ring holds still until .3639. Its angle is θ(p) = 90° + ω(p − f), where f is the planet's dwell midpoint, so the planet passes the front (90°) during its dwell.

  | # | Planet | Orbit R | Planet r | ω | Dwell (p) |
  |---|---|---|---|---|---|
  | 1 | McCallos (Earth) | 18 | 1.3 | 520 | held at 60° until .3639 (shown in the Earth chapter, .23–.3355) |
  | 2 | AI Document Agent | 27 | 1.7 | 700 | .3687–.4235 |
  | 3 | Il Colosseo | 32.5 | 1.5 | 480 | .4235–.4783 |
  | 4 | Closet Curations | 37.5 | 1.4 | 460 | .4783–.5331 |
  | 5 | Coursemap | 43 | 2.4 | 430 | .5331–.588 |
  | 6 | Guitar Tutor (rings) | 50 | 2.2 | 380 | .588–.6427 |
  | 7 | Mimir + Bifrost | 57 | 2.0 | 330 | .6427–.6975 |
  | 8 | Earlier builds | 65 | 1.8 | 280 | .6975–.7523 |

  - During its dwell the focused planet scales 1 → 2.7 (`io`, over ±.008–.01 around the dwell edges). Its orbit line goes from opacity .5 to 1, and its label from .55 to 1.
  - Each planet has a surface layer that spins with p, plus a shading layer that rotates with the ring so its lit side always faces the Sun.
- **L3 (galaxy).** 150vh across, squashed `scaleY(.5)`. Built from about 760 box-shadow stars on two log-spiral arms, haze blobs, and a warm core. Rotates 0 → −55° over .8015→1. Camera: s 79.17 → 1 over .7523→.8015, then → 1.12 by .965.
  - The "SOL · YOU ARE HERE" marker shows briefly after the handoff.
  - L3 dims to .5 once the experience track starts.
- **Hero copy:**
  - Eyebrow "Cornell Operations Research & Engineering '29" from 0 to .05.
  - "MICHAEL TOMMASO" over .035→.115: tracking 1.1em → .32em, with a blur in and out.
  - Headline, paragraph and CTAs over .125→.188.
- **Text cards** (right column, `left:min(46vw, 100vw − 620px)`, `right:4vw`, `top:11vh`, `bottom:9vh`, `justify-content:safe center`):
  - Each element fades and rises 24px in over about .012 (staggered by .002 each), holds, then fades out about .01 before the dwell ends. The h2 tracks from .25em to −.02em.
  - A dark scrim gradient behind the column is visible from .22 to the end of the solar system.
  - There are no images on cards (text only).
- **Experience track** (.79→.965 after remap): copied from Direction A. A horizontal track runs from x 40vw to −150vw. Each column is 30vw wide with a hairline top rule and a 9px dot. Education sits at the end as a three-column block (degree info, coursework, activities).
- **Chapter ladder:** a bottom-left row "Moon · Intro / Earth · McCallos / Sol · Work & projects / Milky Way · Experience". The active chapter is at opacity 1, the rest at .38. The row is hidden while the hero copy shows, and each item jumps to its chapter with a shutter cut.

## Project view (click a planet / label / "Enter orbit ↗")
Planets: McCallos, AI Document Agent, Il Colosseo, Closet Curations, Coursemap, Guitar Tutor, Mimir + Bifrost, Earlier builds.

**Opening sequence** (WAAPI in the prototype; use the same values):
1. Lock page scroll. The header, cards and ladder fade out (450ms ease-in).
2. **Camera push.** The sticky stage gets `transform-origin` at the clicked planet's centre and animates `translate(W/2 − cx, H/2 − cy) scale(S)`, where S = min(90, 1.25·diag ÷ planet diameter). This takes 1500ms `cubic-bezier(.62,0,.88,.45)` (accelerating), and the real scene keeps spinning during the push.
3. At 1300ms a fixed overlay (z 8990, below the grain) fades in:
   - a #07080a backdrop;
   - a 100px "ball" with the planet's gradients, starting at full cover (1.25·diag, centred);
   - the ball then settles to a horizon: diameter max(2.6W, 2.4H), its top edge at 76% of viewport height. This takes 1800ms `cubic-bezier(.3,.6,.15,1)`, while the ball's surface rotates (90s loop).
   - `Cine.paused = true` at 1600ms.
4. Content fades in at about 1800ms. The hero kicker, h2 and problem each animate opacity 0→1, translateY 40px→0 and blur 10px→0 over 1100ms `cubic-bezier(.2,.7,.2,1)`, staggered by 110ms; the h2 also tracks .2em→−.03em.
5. "← Back to orbit" (top-left) and "ESC TO CLOSE" fade in.
6. Lower sections reveal on scroll (IntersectionObserver at threshold .12): opacity plus 50px rise, 1000ms. As the overlay scrolls, the ball dims to as low as .25.

**Sections:**
- **Hero:** kicker, title, problem, scroll cue.
- **Stats strip:** only for McCallos, AI Document Agent and Il Colosseo, using numbers from the copy.
- **Screenshots:** a full-width image with a slow 1.08→1 Ken Burns push over 14s, plus empty user-fillable screenshot slots (2 per project, 3 for Guitar Tutor, 0 for Earlier builds).
- **Write-up blocks.**
- **Meta:** stack chips, status (hidden when empty), link buttons, note, McCallos inquiries email.
- **"Next planet"** (cycles in orbit order) and "Back to orbit".

**Closing (Esc or Back):**
1. Content fades out (350ms). The ball rises from the horizon back to full cover (1000ms `cubic-bezier(.6,0,.4,1)`).
2. Cine unpauses. The overlay fades out (300ms).
3. The stage reverses its zoom (1500ms `cubic-bezier(.12,.6,.3,1)`) and the UI fades back in.
4. At 2.7s all transforms and animations are cleared and page scroll is unlocked.

**Next planet:** content fades out, the ball drops off the bottom (600ms), the project swaps, and the new ball rises into the horizon (1300ms).

## Design tokens
- Colors:
  - Background #07080a; ink #ece8e1; amber accent #e8a33d.
  - Muted text #8a877f, secondary #b5b1a8, tertiary #d8d4cb.
  - Hairlines rgba(236,232,225,.14–.22); scrim rgba(7,8,10,.92).
- Planet palettes are in the logic class (`PROJ[*].base` / `.spin`) and in the L2 markup.
- Type:
  - **Archivo** (variable width) for display and body. Headings use weight 600–700 at `font-stretch` 112–125%; the name reveal uses weight 200 at 125%.
  - **JetBrains Mono** for labels, uppercase, letter-spacing .12–.32em, 10–12px.
  - Card h2 is `clamp(30px, min(4.2vw, 8vh), 76px)`; body is `clamp(11.5px, 1.6vh, 15px)`/1.5.
  - Project-view title is `clamp(52px, min(10vw, 18vh), 190px)` at line-height .86.
- Radii: none (square UI). Bodies are circles.
- Buttons:
  - Primary: #ece8e1 fill with #07080a text, 14px 22px padding, mono uppercase.
  - Secondary: 1px rgba(236,232,225,.3) border.
  - Hover: invert to #ece8e1 fill with #07080a text.

## AI image slots
Every `data-ai-slot` element is a placeholder for Higgsfield art; see `Higgsfield Shot List.md` for the id, type, aspect and prompt seed of each. Keep the motion: swap the CSS gradient for an `<img>`/`<video>` inside the same element. In the prototype, the "Show AI image slots" tweak outlines them.

## Assets
`src/assets/real/` (mccallos, coursemap, ilcolosseo, closet screenshots), `src/assets/generated/` (Empire and Mimir art), `src/assets/waterscooter.webp`, `src/assets/stockbot.webp`. All are from the repo.

## Contact
The contact section is the same as Direction A, over a rising moon: a form with name, email and message; "Message sent" state; "Send another message". Wire the form to the existing Formspree endpoint `https://formspree.io/f/xdojndzk`.

## Files
- `Direction G - Orbit.dc.html`: the full prototype (markup, plus the logic class at the bottom).
- `cine.js`: the scroll/cursor keyframe engine.
- `image-slot.js`: a prototype-only drag-and-drop image placeholder.
- `support.js`: the prototype runtime (not for production).
- `Higgsfield Shot List.md`: the AI art plan.
- `src/assets/`: images.
