---
name: Orbital Foundry Scroll Cinema
description: A slow, scroll-driven cinematic portfolio — video as environment, machined captions as instrumentation.
colors:
  cinema-bg: "#030406"
  cinema-ink: "#f6f2e8"
  cinema-muted: "#f6f2e8ad"
  cinema-faint: "#f6f2e86b"
  cinema-line: "#f6f2e82e"
  cinema-amber: "#d8b56b"
  cinema-blue: "#91c8ff"
  cinema-glow: "#91c8ff29"
typography:
  display:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 6.8rem)"
    fontWeight: 1000
    lineHeight: 0.88
  headline:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 6vw, 5.6rem)"
    fontWeight: 1000
    lineHeight: 0.9
  title:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 900
    lineHeight: 1.25
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: "0.68rem"
    fontWeight: 700
    letterSpacing: "0.24em"
rounded:
  none: "0px"
spacing:
  gutter-sm: "20px"
  gutter-md: "40px"
  gutter-lg: "64px"
  section-y: "80px"
  section-y-lg: "112px"
components:
  button-primary:
    backgroundColor: "{colors.cinema-ink}"
    textColor: "#09090b"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "#dff3ff"
  chip-stat:
    backgroundColor: "#00000029"
    textColor: "{colors.cinema-muted}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  card-artifact:
    backgroundColor: "#ffffff09"
    textColor: "{colors.cinema-ink}"
    rounded: "{rounded.none}"
    padding: "24px"
---

# Design System: Orbital Foundry Scroll Cinema

## 1. Overview

**Creative North Star: "The Orbital Foundry"**

An industrial space fabrication facility, traversed slowly. The four approved
videos are the environment — a cold open, a rail approach, the McCallos dock, the
Mimir agent-core assembly — and everything the UI does is instrumentation laid
over that footage: machined captions, hairline-bordered panels, mono-spaced
readouts. The register is a serious builder documentary; the primary emotion is
slow awe and controlled traversal. Pacing is earned with runway: each scene owns a
tall sticky scroll distance mapped to the full clip duration, never by clamping or
artificial delay.

This system explicitly rejects: underexposed video buried under heavy black
overlays; cyber/sci-fi HUD chrome pasted on top of footage; generic black SaaS
dashboard aesthetics in the tail; static card-grid portfolios; the light Fluid
Systems Atlas plates inside the dark cinema; and any scroll-jacking that breaks
the faithful mapping between scroll and motion.

**Key Characteristics:**
- Video is the environment; UI never competes with the footage.
- Machined and exact: zero border-radius, 1px hairlines, mono labels.
- Warm ivory ink on near-black void; amber and blue as scene-role accents.
- Depth through atmosphere (localized gradients, glow) — not shadow stacks.
- Reduced-motion and mobile users get bright poster stills and full content.

## 2. Colors

A near-black void carries warm ivory text, with two cinematic accents that belong
to the world of the footage rather than to a UI palette.

### Primary
- **Signal Ivory** (`#f6f2e8`, `--cinema-ink`): the voice of the system. All
  titles and primary text, and the fill of primary action buttons. Warm, not
  clinical white — it reads as projected light on the footage.
- **Foundry Amber** (`#d8b56b`, `--cinema-amber`): foundry warmth. Reserved for
  moments tied to fabrication/heat in the scene world. Scarce by design.
- **Bridge Blue** (`#91c8ff`, `--cinema-blue`): orbital/bridge accent, and the
  source of the atmospheric glow (`--cinema-glow`, `#91c8ff` at 16%). Used for
  environmental light, selection, and focus cues — not for buttons.

### Neutral
- **Void** (`#030406`, `--cinema-bg`): page and scene base. Near-black with a
  breath of blue; the body background layers faint radial light over `#020306`.
- **Ivory Muted** (`#f6f2e8` at 68%, `--cinema-muted`): body and caption text.
- **Ivory Faint** (`#f6f2e8` at 42%, `--cinema-faint`): metadata and tertiary
  readouts (scene counters, stage labels).
- **Hairline** (`#f6f2e8` at 18%, `--cinema-line`): 1px borders on chips,
  panels, and artifact cards.

### Named Rules
**The Visible Footage Rule.** Scene overlays are localized gradients only — the
documented radial + edge gradients in `VideoScrubScene`. Full-frame darkening
beyond them is prohibited; if text isn't readable, move or shrink the gradient,
never dim the whole frame. The video luma is already lifted in CSS
(`brightness(1.3)`); do not stack darkness back on top.

**The Two-Accent Rule.** Amber and blue never share a moment. Each accent
belongs to a scene role (foundry warmth vs. orbital light); a surface commits to
one or neither.

## 3. Typography

**Display Font:** DM Sans (with system-ui fallback)
**Body Font:** DM Sans
**Label/Mono Font:** DM Mono (with ui-monospace fallback)

**Character:** One family at violent weight contrast — hairline-tracked mono
whispers next to weight-1000 declarations. The mono layer is the instrumentation;
the sans layer is the voice.

### Hierarchy
- **Display** (1000, `clamp(2.5rem, 7vw, 6.8rem)`, line-height 0.88): scene
  titles inside the cinematic overlay. One per scene.
- **Headline** (1000, `clamp(2.4rem, 6vw, 5.6rem)`, line-height 0.9): tail
  section openers ("Proof, without breaking the spell.").
- **Title** (900, 1.5rem, tight): artifact card and process step titles.
- **Subtitle** (600, 1.25–1.5rem, tight, ivory at 88%): the one-line scene
  subtitle under each display title.
- **Body** (400, 1–1.125rem, 1.625, Ivory Muted): descriptions and field notes.
  Max measure 62ch (`max-w-[62ch]`).
- **Label** (700, 0.68rem, tracking 0.24em, UPPERCASE, DM Mono, Ivory Faint):
  scene counters (`01 / Cold open`), stage eyebrows, chip text, metadata.

### Named Rules
**The Instrument Readout Rule.** Anything mono is metadata: counters, stages,
stacks, periods. Mono never carries a sentence; sentences belong to DM Sans.

## 4. Elevation

Depth is atmospheric, not stacked. Surfaces are flat, separated by hairline
borders and faint white-tint fills (`bg-white/[0.025–0.045]`); the sense of space
comes from the footage itself plus fixed environmental light — two radial glows
and a vertical gradient behind the page, a blue `--cinema-glow` radial inside
each scene, and a screen-blended noise film at 12% opacity. There is no shadow
scale.

### Shadow Vocabulary
- **Overlay ambience** (`box-shadow: -18px 0 58px rgb(0 0 0 / 0.22), 0 24px 80px rgb(0 0 0 / 0.16)`,
  `.cinematic-overlay`): the single sanctioned shadow — it seats the caption
  panel into the footage. Not for cards, chips, or buttons.

### Named Rules
**The One Shadow Rule.** `.cinematic-overlay` owns the only box-shadow in the
system. Everything else is flat: hairline border, tint fill, done.

## 5. Components

Machined and exact — parts fabricated in the foundry. Zero border-radius
everywhere, 1px hairlines, faint tint fills, small lift on hover.

### Buttons
- **Shape:** square-cut (0px radius), machined edges.
- **Primary:** Signal Ivory fill (`--cinema-ink` / `#fff` in the tail), near-black
  text (`#09090b`), bold 0.875rem label, `min-height: 44px`, padding ~12px 20px,
  1px hairline border.
- **Hover / Focus:** lifts `-2px` with a 300ms transition; fill shifts to icy
  cyan (`#dff3ff` / `cyan-100`). Focus uses the global 2px `#a5f3fc` outline at
  3px offset.
- **No secondary button exists.** Lesser actions are plain links or artifact
  cards; don't invent a ghost variant without cause.

### Chips
- **Style:** 1px Hairline border, near-transparent black fill (`bg-black/16`),
  DM Mono 0.7rem uppercase, tracking 0.12em, Ivory Muted text, padding 8px 12px.
- **Role:** stat/stack readouts under scene captions and on artifact cards.
  Never interactive; never used as filters.

### Cards / Containers
- **Corner Style:** square (0px).
- **Background:** faint white tints — `white/[0.035]` artifacts, `white/[0.025]`
  early-web tiles, `black/24` process steps, `white/[0.045]` contact panel.
- **Shadow Strategy:** none (see The One Shadow Rule); a gradient hairline
  (`via-white/26`) across the top edge of artifact cards is the only flourish.
- **Border:** 1px `white/10`, brightening to `white/24` on hover.
- **Internal Padding:** 20–24px (artifacts), 16px (tiles), 24–32px (contact).
- **Hover:** `-4px` lift + border brighten, 300ms.

### Inputs / Fields
None exist in this direction yet. When contact gains a form, follow the machined
grammar: square, hairline border, `white/[0.03]` fill, Bridge Blue focus ring via
the global `:focus-visible` outline.

### Navigation
A single skip link ("Skip cinematic") — visually hidden until focused, then a
fixed white block with black text at the top-left. The cinema itself is the
navigation; no navbar competes with the footage.

### Signature Component: The Caption Overlay
The scene's voice. Anchored to the bottom of each sticky viewport
(`justify-end`), max-width 36rem (5xl centered for the hero), a 1px
`--cinema-line` left hairline with `bg-black/10` and 1px backdrop blur seating it
onto footage. Stacks: mono counter (`01 / Cold open`) → semibold eyebrow →
display title → subtitle → body (62ch) → stat chips → primary links. Non-hero
overlays reveal late (fade + 36px rise, scrubbed) while the footage keeps moving
underneath; the hero overlay is visible from first paint.

## 6. Do's and Don'ts

### Do:
- **Do** map the full clip duration to the full scene scroll runway
  (~520–600vh per 8s clip, `scrub: 0.45`) — every pixel of scroll moves the
  video some amount.
- **Do** keep media scale subtle: `1.0 → 1.035`, never zoom-heavy.
- **Do** serve bright poster stills (`scene-*-poster-bright.webp`) to mobile and
  reduced-motion users, with overlays forced visible.
- **Do** keep text on footage readable via placement and the documented localized
  gradients; body text holds ≥4.5:1 against the darkest frame beneath it.
- **Do** use 0px radius, 1px hairlines, and mono uppercase labels for every new
  surface — machined and exact.

### Don't:
- **Don't** bury the footage: no full-frame dark overlays, no re-stacking black
  gradients on top of the lifted video grade — "underexposed video buried under
  heavy black overlays" is the named failure this branch corrects.
- **Don't** paste cyber/sci-fi UI chrome on the footage — no HUD frames, glitch
  text, or neon grids.
- **Don't** let the tail become a "generic black SaaS dashboard" — proof reads
  as dark field notes and artifact panels.
- **Don't** build "static card-grid portfolios" or identical icon + heading +
  blurb cards; every card is an artifact with a mono readout and a specific job.
- **Don't** import the light Fluid Systems Atlas plates (`--color-mist` /
  `--color-paper` world, bright generated imagery) into the dark cinema.
- **Don't** scroll-jack. Native scroll via Lenis, motion mapped faithfully to
  scroll; `prefers-reduced-motion` always gets a still, complete experience.
- **Don't** clamp video playback to slow a scene down — lengthen the runway
  instead (The Full-Runway Rule; the `motionScale` clamp was the named bad fix).
