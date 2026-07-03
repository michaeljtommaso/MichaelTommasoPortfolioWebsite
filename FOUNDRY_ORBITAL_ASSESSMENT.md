# Foundry Assessment — Orbital Foundry Scroll Cinema

Date: 2026-07-03
Branch: `feat/orbital-foundry-scroll-cinema`

## Workflow state

This branch is still early in the Website Foundry workflow. It has a working scroll-cinema engine and the four selected videos, but it skipped the full Foundry gates around design-system definition, video/asset audit, and asset/component architecture before polish.

| Gate | Status | Assessment |
|---|---|---|
| Repo/current-state gate | Done | Branch is pulled, build/lint pass. |
| Direction gate | Done | Direction is not the issue: Orbital Foundry / bridge/cinematic route is approved. |
| Context gate | Done | Prior session confirms: scroll-cinema mechanic, cinematic backbone, recruiter-readable overlays, McCallos + Mimir as flagships. |
| Design-system gate | Missing before this pass | Need a specific cinematic design system; current overlays are ad hoc. |
| Asset/video audit gate | Missing before this pass | Videos were not tested for luma, scrub duration, or play-through behavior. |
| Asset/component architecture gate | Partial | `orbitalScenes` exists, but lacks explicit brightness/scrub semantics and fallback poster strategy. |
| Implementation gate | Needs correction | Previous patch made movement too limited and videos never play through. |
| Verification gate | Done for this pass | Build/lint pass; desktop scrub verified across all 4 clips; mobile poster fallback verified. |

## Main findings

### 1. The videos are genuinely dark

Measured luma means from 1s/4s/7s frames:

| Scene | 1s | 4s | 7s | Finding |
|---|---:|---:|---:|---|
| `scene-00` | 43.7 | 55.9 | 44.4 | too dark for heavy black overlays |
| `scene-01` | 67.8 | 78.7 | 83.1 | too dark for heavy black overlays |
| `scene-02` | 55.4 | 73.2 | 107.3 | too dark for heavy black overlays |
| `scene-03` | 56.8 | 75.1 | 60.6 | too dark for heavy black overlays |

The implementation added multiple dark overlays on top of already-dark media:

- radial overlay ending at `rgba(0,0,0,0.86)`
- left/right black gradient up to `black/80`
- bottom/top black gradient from `black`

This made the videos feel underexposed and swallowed the cinematic detail.

### 2. The videos do not play all the way through

The current scrub code intentionally clamps playback to roughly 30–34% of each clip with `motionScale`. That was a bad fix. It slowed movement by preventing the video from finishing instead of giving the full clip more scroll distance.

Correct behavior:

- each scene should traverse the full 8-second clip
- the scroll distance should be longer
- every pixel of scroll should move the video some amount
- use smooth scrub, not artificial under-playback
- use a tall sticky section for each scene so ScrollTrigger timelines do not overlap between videos

### 3. The design assets were fighting the video

The old generated systems-atlas assets are from the lighter Fluid Systems Atlas direction. They do not belong directly inside the dark Orbital Foundry cinema unless re-graded and reframed. The tail should become a quieter dark artifact system, while actual screenshots/proof can come later as framed evidence.

## Corrective direction

Keep the approved direction, but define it properly:

> **Orbital Foundry Scroll Cinema** — a slow, continuous, scroll-driven cinematic route through the systems Michael builds. Videos are the environment; text is restrained captioning; proof appears as dark field notes and artifact panels, not bright unrelated design plates.

## Immediate correction plan

1. Design-systemize the visuals: tokens, overlay strengths, typography, spacing, asset roles.
2. Generate/curate supporting assets from the existing videos: brighter poster/fallback frames.
3. Patch scrub math: full clip playback over longer scroll, with smooth continuous scrub.
4. Patch visual grade: lift video brightness, reduce black overlay density, keep text readable with localized gradients only.
5. Keep tail assets quiet for now; do not use mismatched Fluid Systems Atlas imagery in the Orbital cinema branch.
6. Verify desktop/mobile, console, build, lint, and video timing.
