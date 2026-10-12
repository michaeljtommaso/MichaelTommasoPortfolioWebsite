import { work, projects, clientWork, earlierBuilds } from "./portfolioData";

/* ------------------------------------------------------------------ *
 * Orbit scene config. Copy lives in portfolioData.js; this file only
 * adds what the universe needs: orbit geometry, scroll timings, planet
 * palettes, and per-project stats. Values are from the Claude Design
 * handoff (design-handoff/README.md, "Universe timeline").
 * ------------------------------------------------------------------ */

/* Orbit order, inner to outer. "Next planet" cycles through it. */
export const ORDER = ["mccallos", "empire", "ilcolosseo", "closet", "coursemap", "guitar", "mimir", "earlier"];

/* Solar-system rings. rot = ring angle at p .3639 → .8015; scale/ring/label are data-fx specs. */
export const PLANETS = [
  { id: "mccallos", R: 18, r: 1.3, rot: [60, 287.55], spin: -1400, labelLeft: 4.77,
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

/* Planet palettes (CSS stand-ins until each planet's Higgsfield map lands). McCallos uses the Earth map. */
const LOOK = {
  mccallos: { base: "radial-gradient(circle at 42% 40%,#5f88aa 0,#33597a 40%,#16304a 75%,#0b1a2a 100%)" },
  empire: { base: "radial-gradient(circle at 45% 45%,#d98b45,#9a4f22 60%,#4a2412)", spin: "repeating-linear-gradient(18deg,rgba(255,206,150,.28) 0 6%,transparent 6% 13%,rgba(70,26,8,.4) 13% 18%,transparent 18% 25%)" },
  coursemap: { base: "radial-gradient(circle at 45% 45%,#c9d4d9,#7f939e 55%,#2c3940)", spin: "repeating-linear-gradient(-8deg,rgba(255,255,255,.22) 0 5%,transparent 5% 11%,rgba(30,45,56,.35) 11% 15%,transparent 15% 21%)" },
  guitar: { base: "radial-gradient(circle at 45% 45%,#ead1a0,#b48d52 55%,#4e3a20)", spin: "repeating-linear-gradient(0deg,rgba(255,236,200,.3) 0 4%,transparent 4% 9%,rgba(90,60,30,.35) 9% 12%,transparent 12% 17%)" },
  mimir: { base: "radial-gradient(circle at 45% 45%,#7c7788,#433f4e 55%,#18171e)", spin: "radial-gradient(14% 10% at 62% 58%,rgba(232,163,61,.85),transparent),repeating-linear-gradient(30deg,rgba(220,214,235,.14) 0 5%,transparent 5% 12%)" },
  ilcolosseo: { base: "radial-gradient(circle at 45% 45%,#dba878,#a8663c 55%,#4c2a17)", spin: "repeating-linear-gradient(-24deg,rgba(255,226,190,.22) 0 7%,transparent 7% 14%,rgba(90,40,16,.3) 14% 18%,transparent 18% 26%)" },
  closet: { base: "radial-gradient(circle at 45% 45%,#e8cfc2,#ad8778 55%,#4a3630)", spin: "repeating-linear-gradient(40deg,rgba(255,240,232,.25) 0 5%,transparent 5% 12%)" },
  earlier: { base: "radial-gradient(circle at 45% 45%,#9a968e,#6b6862 55%,#2e2d2a)", spin: "radial-gradient(circle at 30% 30%,rgba(28,28,30,.5) 0,rgba(28,28,30,.3) 8%,transparent 11%),radial-gradient(circle at 64% 58%,rgba(28,28,30,.5) 0,rgba(28,28,30,.3) 12%,transparent 15%),radial-gradient(circle at 40% 76%,rgba(28,28,30,.45) 0,transparent 8%),radial-gradient(circle at 74% 26%,rgba(28,28,30,.45) 0,transparent 6%)" },
};

/* Stats strips: numbers taken from the copy itself. */
const STATS = {
  mccallos: [{ n: "6", l: "City agencies" }, { n: "14", l: "Local laws" }, { n: "17", l: "City open-data feeds" }, { n: "36", l: "Obligations in one calendar" }],
  empire: [{ n: "98/100", l: "Across 25 templates" }, { n: "2.4 min", l: "Per draft" }, { n: "413s → 14s", l: "One query, vision pipeline" }, { n: "3.79M → 53K", l: "Tokens, same query" }],
  ilcolosseo: [{ n: "1,150+", l: "Google reviews" }, { n: "27", l: "Old URLs redirected" }, { n: "+140%", l: "Organic clicks" }, { n: "25.3K", l: "Impressions, up 134%" }],
};

/* Empty screenshot slots per project view (filled with real screenshots later). */
const SLOTS = { guitar: 3, earlier: 0 };

const shot = (image, name, real) => (image ? [{ src: image, alt: real ? `Screenshot of ${name}` : "" }] : []);

const fromWork = (w) => ({
  id: w.id, name: w.name, kicker: w.kicker, problem: w.problem, blocks: w.blocks, stack: w.stack,
  status: w.status, statusNote: w.statusNote, links: w.links, note: w.note, contact: w.contact,
  shots: shot(w.image, w.name, w.real),
});

const fromClient = (c) => ({
  id: c.id, name: c.title, kicker: "Freelance client site", problem: c.description, blocks: [],
  stack: c.stack, links: [{ label: c.linkLabel, href: c.link }], shots: shot(c.image, c.title, true),
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
  all.map((p) => [p.id, { ...p, ...LOOK[p.id], stats: STATS[p.id] || [], slotCount: SLOTS[p.id] ?? 2 }])
);
