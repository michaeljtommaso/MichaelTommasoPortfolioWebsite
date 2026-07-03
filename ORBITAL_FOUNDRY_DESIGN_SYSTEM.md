# Orbital Foundry Design System + Asset Component Plan

## Direction lock

- **Chosen direction:** Orbital Foundry Scroll Cinema.
- **Preserve:** four approved videos, slow scroll-cinema, bridge/orbit/foundry feeling, readable project captions.
- **Avoid:** underexposed video, static poster behavior, cyber UI pasted on top, mismatched light Fluid Systems Atlas assets, generic black dashboard tail.
- **Primary emotion:** slow awe, controlled traversal, serious builder documentary.
- **Primary action:** understand Michael's current systems work quickly, then click Resume/GitHub/LinkedIn or inspect proof.

## Design tokens

| Token | Value | Role |
|---|---|---|
| `--cinema-bg` | `#030406` | page/background base |
| `--cinema-ink` | `#f6f2e8` | warm white title text |
| `--cinema-muted` | `rgba(246,242,232,.68)` | body/caption text |
| `--cinema-faint` | `rgba(246,242,232,.42)` | metadata and tertiary text |
| `--cinema-line` | `rgba(246,242,232,.18)` | hairlines and artifact borders |
| `--cinema-amber` | `#d8b56b` | foundry warmth/accent |
| `--cinema-blue` | `#91c8ff` | orbital/bridge accent |
| `--cinema-glow` | `rgba(145,200,255,.16)` | atmospheric glow |

## Motion rules

| Element | Rule |
|---|---|
| Video scrub | Full clip duration maps to full scene scroll distance. No motion clamping. |
| Scroll distance | 8s clip gets ~520–600vh scene scroll; movement is slow because the runway is long. |
| Scene structure | Each scene owns a tall sticky runway; no stacked pinning that causes two videos to scrub at once. |
| Scrub smoothing | Use GSAP `scrub: 0.45` so every scroll movement affects video, but not twitchily. |
| Media scale | Subtle `1.0 → 1.035`, not zoom-heavy. |
| Overlay reveal | Caption can reveal late, but the media must be moving continuously underneath. |
| Mobile/reduced motion | Use bright poster stills; no video download/scrub. |

## Asset inventory

| Asset id | File target | Purpose | Source/prompt summary | Owning component | Ratio/crop | Motion behavior |
|---|---|---|---|---|---|---|
| `scene-00-video` | `public/cinematic/orbital-foundry/scene-00.mp4` | cold open cinematic environment | approved video | `VideoScrubScene` | 16:9 object-cover | scroll scrub full duration |
| `scene-01-video` | `public/cinematic/orbital-foundry/scene-01.mp4` | bridge / approach vector | approved video | `VideoScrubScene` | 16:9 object-cover | scroll scrub full duration |
| `scene-02-video` | `public/cinematic/orbital-foundry/scene-02.mp4` | McCallos dock/stronghold | approved video | `VideoScrubScene` | 16:9 object-cover | scroll scrub full duration |
| `scene-03-video` | `public/cinematic/orbital-foundry/scene-03.mp4` | Mimir / agent core assembly | approved video | `VideoScrubScene` | 16:9 object-cover | scroll scrub full duration |
| `scene-*-poster-bright` | `public/cinematic/orbital-foundry/scene-*-poster-bright.webp` | mobile/reduced-motion fallback and first paint | curated frame from current videos, graded brighter | `VideoScrubScene` | 16:9 | static fallback |
| `orbital-tail-field` | CSS gradients/tokens | tail continuity | generated through CSS, not mismatched imagery | `TailSections` | responsive | static, minimal hover |

## Component + asset architecture

| Component / section | Data source | Assets consumed | Code change | Responsive crop/behavior | Fallback |
|---|---|---|---|---|---|
| `VideoScrubScene` | `orbitalScenes[]` | scene video + bright poster | full-duration scrub, video grade, lighter overlays | desktop video; mobile poster | poster image |
| `orbitalScenes[]` | static scene metadata | `video`, `poster`, `scrubVh`, `scrubSmoothing`, `mediaScale` | encode scene-level scroll runway, smoothness, media scale, and poster target | same data drives all scenes | static image when motion disabled |
| `TailSections` | `portfolioData` arrays | no old bright thumbnails in this pass | dark field-note artifact cards | grid collapses to stack | text-only proof cards |

## Verification checklist

- [x] Generated/curated poster assets exist.
- [x] Video luma is lifted in CSS without blowing out highlights.
- [x] Each video reaches the end at scene end.
- [x] Scrolling any amount moves the active video.
- [x] Build/lint pass.
- [x] Desktop browser: no console errors, readable overlays, video visible.
- [x] Mobile browser: poster fallback readable, no horizontal overflow.
