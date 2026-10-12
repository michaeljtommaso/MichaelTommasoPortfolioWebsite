import { work, projects, clientWork, earlierBuilds } from "./portfolioData";
import earthMap from "../assets/ai/earth-map.webp";
import earthSm from "../assets/ai/earth-map-sm.webp";
import empireSm from "../assets/ai/planet-empire-sm.webp";
import empireLg from "../assets/ai/planet-empire.webp";
import coursemapSm from "../assets/ai/planet-coursemap-sm.webp";
import coursemapLg from "../assets/ai/planet-coursemap.webp";
import guitarSm from "../assets/ai/planet-guitar-sm.webp";
import guitarLg from "../assets/ai/planet-guitar.webp";
import mimirSm from "../assets/ai/planet-mimir-sm.webp";
import mimirLg from "../assets/ai/planet-mimir.webp";
import ilcolosseoSm from "../assets/ai/planet-ilcolosseo-sm.webp";
import ilcolosseoLg from "../assets/ai/planet-ilcolosseo.webp";
import closetSm from "../assets/ai/planet-closet-sm.webp";
import closetLg from "../assets/ai/planet-closet.webp";
import earlierSm from "../assets/ai/planet-earlier-sm.webp";
import earlierLg from "../assets/ai/planet-earlier.webp";
import mccallos2 from "../assets/shots/mccallos-2.webp";
import mccallos3 from "../assets/shots/mccallos-3.webp";
import empire2 from "../assets/shots/empire-2.webp";
import coursemap2 from "../assets/shots/coursemap-2.webp";
import coursemap3 from "../assets/shots/coursemap-3.webp";
import guitar2 from "../assets/shots/guitar-2.webp";
import guitar3 from "../assets/shots/guitar-3.webp";
import guitar4 from "../assets/shots/guitar-4.webp";
import mimir2 from "../assets/shots/mimir-2.webp";
import mimir3 from "../assets/shots/mimir-3.webp";
import ilcolosseo2 from "../assets/shots/ilcolosseo-2.webp";
import ilcolosseo3 from "../assets/shots/ilcolosseo-3.webp";
import closet2 from "../assets/shots/closet-2.webp";
import closet3 from "../assets/shots/closet-3.webp";

/* ------------------------------------------------------------------ *
 * Orbit scene config. Copy lives in portfolioData.js; this file only
 * adds what the universe needs: orbit geometry, scroll timings, planet
 * palettes, and per-project stats. Values are from the Claude Design
 * handoff (design-handoff/README.md, "Universe timeline").
 * ------------------------------------------------------------------ */

/* Orbit order, inner to outer. "Next planet" cycles through it. */
export const ORDER = ["mccallos", "empire", "ilcolosseo", "closet", "coursemap", "guitar", "mimir", "earlier"];

/* Solar-system rings. rot = ring angle at p .3639 → .8015; spin = surface rotation (deg) across the scene;
 * scale/ring/label are data-fx specs. */
export const PLANETS = [
  { id: "mccallos", R: 18, r: 1.3, rot: [60, 287.55], spin: 1440, labelLeft: 4.77,
    scale: "scale 0:1", ring: "opacity 0.3489:0 0.3639:.5", label: "opacity 0.3639:0 0.3739:.55" },
  { id: "empire", R: 27, r: 1.7, rot: [67.46, 373.78], spin: -1800, labelLeft: 5.93,
    scale: "scale 0.3607:1 0.3787:2.7 0.4135:2.7 0.4315:1 io",
    ring: "opacity 0.3489:0 0.3699:1 0.4175:1 0.4295:.5",
    label: "opacity 0.3639:0 0.3749:1 0.4175:1 0.4295:.55" },
  { id: "ilcolosseo", R: 32.5, r: 1.5, rot: [48.24, 258.29], spin: 1500, labelLeft: 5.35,
    scale: "scale 0.4155:1 0.4335:2.7 0.4683:2.7 0.4863:1 io",
    ring: "opacity 0.3489:0 0.3639:.5 0.4175:.5 0.4295:1 0.4723:1 0.4843:.5",
    label: "opacity 0.3639:0 0.3739:.55 0.4175:.55 0.4295:1 0.4723:1 0.4843:.55" },
  { id: "closet", R: 37.5, r: 1.4, rot: [24.77, 226.07], spin: -1300, labelLeft: 5.06,
    scale: "scale 0.4703:1 0.4883:2.7 0.5231:2.7 0.5411:1 io",
    ring: "opacity 0.3489:0 0.3639:.5 0.4723:.5 0.4843:1 0.5271:1 0.5391:.5",
    label: "opacity 0.3639:0 0.3739:.55 0.4723:.55 0.4843:1 0.5271:1 0.5391:.55" },
  { id: "coursemap", R: 43, r: 2.4, rot: [5.44, 193.61], spin: 1300, labelLeft: 7.96,
    scale: "scale 0.5251:1 0.5431:2.7 0.578:2.7 0.596:1 io",
    ring: "opacity 0.3489:0 0.3639:.5 0.5271:.5 0.5391:1 0.582:1 0.594:.5",
    label: "opacity 0.3639:0 0.3739:.55 0.5271:.55 0.5391:1 0.582:1 0.594:.55" },
  { id: "guitar", R: 50, r: 2.2, rot: [-5.55, 160.74], spin: -1000, labelLeft: 7.38, rings: true,
    scale: "scale 0.58:1 0.598:2.7 0.6327:2.7 0.6507:1 io",
    ring: "opacity 0.3489:0 0.3639:.5 0.582:.5 0.594:1 0.6367:1 0.6487:.5",
    label: "opacity 0.3639:0 0.3739:.55 0.582:.55 0.594:1 0.6367:1 0.6487:.55" },
  { id: "mimir", R: 57, r: 2.0, rot: [-11.05, 133.36], spin: 900, labelLeft: 6.8,
    scale: "scale 0.6347:1 0.6527:2.7 0.6875:2.7 0.7055:1 io",
    ring: "opacity 0.3489:0 0.3639:.5 0.6367:.5 0.6487:1 0.6915:1 0.7035:.5",
    label: "opacity 0.3639:0 0.3739:.55 0.6367:.55 0.6487:1 0.6915:1 0.7035:.55" },
  { id: "earlier", R: 65, r: 1.8, rot: [-11.08, 111.45], spin: 800, labelLeft: 6.22,
    scale: "scale 0.6895:1 0.7075:2.7 0.7423:2.7 0.7603:1 io",
    ring: "opacity 0.3489:0 0.3639:.5 0.6915:.5 0.7035:1 0.7463:1 0.7583:.5",
    label: "opacity 0.3639:0 0.3739:.55 0.6915:.55 0.7035:1 0.7463:1 0.7583:.55" },
];

/* Text-card windows: elements fade in from t0 (staggered), hold until `hold`, gone by `out`. */
export const CARDS = [
  { id: "mccallos", t0: 0.2212, hold: 0.3053, out: 0.3148 },
  { id: "empire", t0: 0.3724, hold: 0.4121, out: 0.4216 },
  { id: "ilcolosseo", t0: 0.4275, hold: 0.4662, out: 0.4762 },
  { id: "closet", t0: 0.4823, hold: 0.5211, out: 0.5311 },
  { id: "coursemap", t0: 0.5369, hold: 0.5766, out: 0.586 },
  { id: "guitar", t0: 0.5918, hold: 0.6315, out: 0.641 },
  { id: "mimir", t0: 0.6465, hold: 0.6862, out: 0.6957 },
  { id: "earlier", t0: 0.6994, hold: 0.741, out: 0.7504 },
];

/* Planet surfaces: 2:1 equirect maps from Higgsfield. `map` (1024px) is used in orbit, `mapLg` (~3300px)
 * only for the project-view horizon, so the big files load on demand. `base` shows while a map loads. */
const LOOK = {
  mccallos: { map: earthSm, mapLg: earthMap, base: "#16304a" },
  empire: { map: empireSm, mapLg: empireLg, base: "#4a2412" },
  coursemap: { map: coursemapSm, mapLg: coursemapLg, base: "#7f939e" },
  guitar: { map: guitarSm, mapLg: guitarLg, base: "#b48d52" },
  mimir: { map: mimirSm, mapLg: mimirLg, base: "#433f4e" },
  ilcolosseo: { map: ilcolosseoSm, mapLg: ilcolosseoLg, base: "#a8663c" },
  closet: { map: closetSm, mapLg: closetLg, base: "#ad8778" },
  earlier: { map: earlierSm, mapLg: earlierLg, base: "#6b6862" },
};

/* Stats strips: numbers taken from the copy itself. */
const STATS = {
  mccallos: [{ n: "6", l: "City agencies" }, { n: "14", l: "Local laws" }, { n: "23", l: "City open-data feeds" }, { n: "36", l: "Obligations in one calendar" }],
  empire: [{ n: "96/100", l: "Average, 25 templates" }, { n: "2.4 min", l: "Per draft" }, { n: "413s → 14s", l: "One query, vision pipeline" }, { n: "3.79M → 53K", l: "Tokens, same query" }],
  ilcolosseo: [{ n: "1,150+", l: "Google reviews" }, { n: "27", l: "Old URLs redirected" }, { n: "+140%", l: "Organic clicks" }, { n: "25.3K", l: "Impressions, up 134%" }],
};

/* Extra screenshots per project view (captured 2026-10-11 from the live sites / local builds).
 * Bifrost and the document agent show invented demo data only: no personal or client content. */
const EXTRA = {
  mccallos: [
    [mccallos2, "McCallos Pulse dashboard: urgent issues, live feed, open work orders and NYC agency violations"],
    [mccallos3, "McCallos compliance tracker listing Local Law filings with due dates and statuses"],
  ],
  empire: [[empire2, "Document agent template board showing each safety-plan section's draft status (demo project)"]],
  coursemap: [
    [coursemap2, "Coursemap semester map with prerequisite lines between courses; completed semesters marked green"],
    [coursemap3, "Coursemap ranking Cornell majors by how much of each one the plan covers"],
  ],
  guitar: [
    [guitar2, "Guitar Tutor capture setup: camera feed (test pattern) with a live chord hint"],
    [guitar3, "Guitar Tutor lesson panel: target fingering for C major, live hint and latency stats"],
    [guitar4, "Guitar Tutor amp-tone chain with drive, EQ and cabinet controls"],
  ],
  mimir: [
    [mimir2, "Bifrost approvals page: each design waits for a human yes before it publishes (demo data)"],
    [mimir3, "Bifrost projects page with open tasks per project (demo data)"],
  ],
  ilcolosseo: [
    [ilcolosseo2, "Il Colosseo menu page, pasta and risotto section"],
    [ilcolosseo3, "Il Colosseo catering inquiry form"],
  ],
  closet: [
    [closet2, "Closet Curations portfolio section with a before-and-after closet"],
    [closet3, "Closet Curations consultation booking with the embedded Calendly calendar"],
  ],
};
const extra = (id) => (EXTRA[id] || []).map(([src, alt]) => ({ src, alt }));

/* Main image counts as a screenshot only when it's real UI (the generated chapter art isn't). */
const shot = (image, name, real) => (image && real ? [{ src: image, alt: `Screenshot of ${name}` }] : []);

const fromWork = (w) => ({
  id: w.id, name: w.name, kicker: w.kicker, problem: w.problem, blocks: w.blocks, stack: w.stack,
  status: w.status, statusNote: w.statusNote, links: w.links, note: w.note, contact: w.contact,
  shots: [...shot(w.image, w.name, w.real), ...extra(w.id)],
});

const fromClient = (c) => ({
  id: c.id, name: c.title, kicker: "Freelance client site", problem: c.description, blocks: [],
  stack: c.stack, links: [{ label: c.linkLabel, href: c.link }], shots: [...shot(c.image, c.title, true), ...extra(c.id)],
});

const earlier = {
  id: "earlier", name: "Earlier builds", kicker: "Earlier builds", problem: "",
  builds: earlierBuilds,
  blocks: earlierBuilds.map((b) => ({ label: b.title, text: b.description })),
  stack: earlierBuilds.flatMap((b) => b.stack),
  links: earlierBuilds.map((b) => ({ label: b.linkLabel, href: b.link })),
  shots: earlierBuilds.map((b) => ({ src: b.image, alt: b.title })),
};

const all = [...work.map(fromWork), ...projects.map(fromWork), ...clientWork.map(fromClient), earlier];

/* id → everything the card, planet, and project view need. */
export const PROJ = Object.fromEntries(
  all.map((p) => [p.id, { ...p, ...LOOK[p.id], stats: STATS[p.id] || [] }])
);
