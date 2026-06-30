import waterscooter from "../assets/waterscooter.webp";
import stockbot from "../assets/stockbot.webp";

import mimiragentChapter from "../assets/generated/mimiragent-chapter.webp";
import mccallosChapter from "../assets/generated/mccallos-chapter.webp";
import foundryChapter from "../assets/generated/foundry-chapter.webp";

import schoolSite1 from "../assets/schoolsites/punnet-square.png";
import schoolSite2 from "../assets/schoolsites/chi-square.png";
import schoolSite3 from "../assets/schoolsites/metronome.png";
import schoolSite4 from "../assets/schoolsites/theologyproject.png";

/* ------------------------------------------------------------------ *
 * Source of truth for the Fluid Systems Atlas.
 * Sections render by mapping over these arrays.
 * ------------------------------------------------------------------ */

export const navLinks = [
  { label: "Map", href: "#atlas" },
  { label: "Artifacts", href: "#chapters" },
  { label: "Builds", href: "#builds" },
  { label: "Process", href: "#process" },
  { label: "Now", href: "#now" },
  { label: "Contact", href: "#contact" },
];

/* Nodes plotted on the hero atlas map. Coordinates are percentages of
 * the canvas so the layout scales fluidly. */
export const atlasNodes = [
  {
    id: "agents",
    label: "Agents",
    accent: "orange",
    blurb: "Workers, tools, memory, browser, code execution, and review loops.",
    x: 24,
    y: 32,
  },
  {
    id: "interfaces",
    label: "Interfaces",
    accent: "blue",
    blurb: "Dashboards, command surfaces, and responsive product UI with live state.",
    x: 72,
    y: 26,
  },
  {
    id: "operations",
    label: "Operations",
    accent: "mint",
    blurb: "Multi-tenant property ops, permissions, automation, and field capture.",
    x: 30,
    y: 70,
  },
  {
    id: "creative",
    label: "Creative systems",
    accent: "yellow",
    blurb: "Website Foundry, design directions, generated assets, and prototypes.",
    x: 76,
    y: 72,
  },
];

/* Routes connecting the atlas nodes (percentages). Drawn with scroll. */
export const atlasRoutes = [
  { id: "r1", from: "agents", to: "interfaces", accent: "blue", curve: -14 },
  { id: "r2", from: "agents", to: "operations", accent: "mint", curve: 18 },
  { id: "r3", from: "interfaces", to: "creative", accent: "yellow", curve: 16 },
  { id: "r4", from: "operations", to: "creative", accent: "orange", curve: -12 },
];

/* Flagship systems — the cinematic artifact chapters. */
export const systems = [
  {
    id: "mimiragent",
    index: "01",
    name: "MimirAgent",
    kicker: "Agent orchestration runtime",
    accent: "blue",
    summary:
      "A Hermes-style orchestration layer that turns intent into action — coordinating workers, tools, memory, a real browser, code execution, voice, and schedules.",
    capabilities: ["Tool use", "Persistent memory", "Worker fan-out", "Browser control", "Code execution", "Voice & schedules"],
    link: "https://github.com/michaeljtommaso",
    art: "linear-gradient(135deg, #10201b 0%, rgba(42,127,255,0.92) 58%, rgba(60,174,114,0.9) 100%)",
    image: mimiragentChapter,
    imagePosition: "30% center",
    pattern: "grid",
  },
  {
    id: "mccallos",
    index: "02",
    name: "McCallos",
    kicker: "Property operations platform",
    accent: "mint",
    summary:
      "Real SaaS complexity — multi-tenant property operations with dashboards, granular permissions, mobile field capture, and automation that closes the loop on day-to-day work.",
    capabilities: ["Multi-tenant", "Role permissions", "Operational dashboards", "Mobile capture", "Workflow automation"],
    link: "https://github.com/michaeljtommaso",
    art: "linear-gradient(135deg, #10201b 0%, rgba(60,174,114,0.9) 55%, rgba(230,181,58,0.85) 100%)",
    image: mccallosChapter,
    imagePosition: "center",
    pattern: "panels",
  },
  {
    id: "website-foundry",
    index: "03",
    name: "Website Foundry",
    kicker: "Design-to-deploy pipeline",
    accent: "orange",
    summary:
      "A creative pipeline that scouts precedent, drafts sketches, generates assets, builds with Claude Code, and verifies the result in a real browser before it ships.",
    capabilities: ["Precedent scouting", "Sketch generation", "Asset synthesis", "Agentic build", "Browser verification"],
    link: "https://github.com/michaeljtommaso",
    art: "linear-gradient(135deg, #10201b 0%, rgba(255,91,46,0.9) 55%, rgba(230,181,58,0.85) 100%)",
    image: foundryChapter,
    imagePosition: "70% center",
    pattern: "routes",
  },
];

/* Smaller, real builds shown as map artifacts. */
export const builds = [
  {
    title: "Machine Learning Stock Trading Bot",
    description:
      "A machine-learning trading system in Python using historical and real-time market data, with rolling training windows and evaluation across changing market conditions.",
    stack: ["Python", "SQL", "Machine Learning", "APIs"],
    image: stockbot,
    link: "https://github.com/michaeljtommaso/StockTradingBot",
    accent: "blue",
  },
  {
    title: "Lightweight Aquatic Vehicle",
    description:
      "A lightweight underwater transportation device designed and prototyped with 3D modeling and custom circuitry during an aerospace internship.",
    stack: ["3D Design", "Fusion 360", "Circuit Design", "Engineering"],
    image: waterscooter,
    link: "https://docs.google.com/presentation/d/1p1EfmQt8tndY2haabTL9DNnSiTjWZXvs2xsYkJ1ab5s/edit?usp=sharing",
    accent: "mint",
  },
];

/* Early interactive builds — served as static sites. */
export const schoolWebsites = [
  { title: "Punnett Square Generator", image: schoolSite1, link: "/websites/PunnettSquare/index.html" },
  { title: "Chi-Squared Calculator", image: schoolSite2, link: "/websites/ChiSquare/index.html" },
  { title: "Metronome App", image: schoolSite3, link: "/websites/Metronome/index.html" },
  { title: "Theology Final Project", image: schoolSite4, link: "/websites/TheologyFinalProject/index.html" },
];

/* Motion grammar / build process. */
export const processSteps = [
  { step: "01", title: "Research", description: "Scout precedent, map the problem, and define what good looks like." },
  { step: "02", title: "Sketch", description: "Draft directions fast — layouts, flows, and system diagrams." },
  { step: "03", title: "Build", description: "Implement with agents and code, wiring data to real interfaces." },
  { step: "04", title: "Verify", description: "Drive the product in a browser and confirm behavior, not just builds." },
  { step: "05", title: "Ship", description: "Deploy, watch it run, and fold what I learn back into the system." },
];

/* Living layer — current work / build log. */
export const nowBuilding = [
  {
    tag: "MimirAgent",
    accent: "blue",
    title: "Wiring voice + schedules into the worker loop",
    note: "Long-running agents that wake on a schedule, act through tools, and report back.",
  },
  {
    tag: "McCallos",
    accent: "mint",
    title: "Mobile field capture for inspections",
    note: "Offline-friendly capture that syncs into the operations dashboard and triggers automation.",
  },
  {
    tag: "Website Foundry",
    accent: "orange",
    title: "Precedent → sketch → build automation",
    note: "Compressing the path from reference scouting to a verified, deployed site.",
  },
];

/* Trajectory — real experience. */
export const experiences = [
  {
    company: "Empire Environmental",
    role: "CAD Associate",
    period: "Jun 2025 – Aug 2025",
    description: "Produced CAD layouts and collaborated with engineers to refine technical designs across iterations.",
  },
  {
    company: "GE Aerospace",
    role: "Engineering Intern",
    period: "Aug 2024",
    description: "Selected for a competitive internship exploring aerospace systems, hypersonic technology, and engineering workflows.",
  },
  {
    company: "Bay Ridge Fish Bar",
    role: "Manager",
    period: "Oct 2021 – Oct 2024",
    description: "Ran operations, staff, and customer experience in a fast-paced environment with strong execution and leadership.",
  },
];

export const stack = ["Python", "JavaScript", "React", "SQL", "Node", "Fusion 360", "AutoCAD", "Machine Learning"];

export const socials = {
  github: "https://github.com/michaeljtommaso",
  linkedin: "https://www.linkedin.com/in/michaeltommaso",
  resume: "/resume.pdf",
  formspree: "https://formspree.io/f/xdojndzk",
};

export const accentHex = {
  orange: "#ff5b2e",
  blue: "#2a7fff",
  mint: "#3cae72",
  yellow: "#e6b53a",
};
