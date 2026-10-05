import mccallosShot from "../assets/real/mccallos.webp";
import coursemapShot from "../assets/real/coursemap.webp";
import ilcolosseoShot from "../assets/real/ilcolosseo.webp";
import closetShot from "../assets/real/closet.webp";

/* Generated art for work with no public UI: drawings + plans for Empire,
 * the systems panel for Mimir. */
import empireArt from "../assets/generated/mccallos-chapter.webp";
import mimirArt from "../assets/generated/mimiragent-chapter.webp";

import waterscooter from "../assets/waterscooter.webp";
import stockbot from "../assets/stockbot.webp";

/* ------------------------------------------------------------------ *
 * Single source of truth for site content. Sections map over these.
 * Every claim traces to the resume, Cornell/docs/DECISIONS.md, or a
 * verified project factsheet (docs/2026-10-05-portfolio-audit.md).
 * ------------------------------------------------------------------ */

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const socials = {
  email: "michaeljtommaso@gmail.com",
  github: "https://github.com/michaeljtommaso",
  linkedin: "https://www.linkedin.com/in/michaeltommaso",
  resume: "/resume.pdf",
  formspree: "https://formspree.io/f/xdojndzk",
};

export const hero = {
  kicker: "Cornell Operations Research & Engineering '29",
  headline: "I build software for problems I've run into.",
  sub: "I study Operations Research at Cornell. I'm also the CTO and only engineer at McCallos, a three-person startup building compliance software for NYC property managers. I started my two favorite projects to fix problems in my own life, and I'm looking for a Summer 2027 internship.",
  /* Real product screenshots under the hero, each linking to its card. */
  previews: [
    { label: "McCallos", href: "#mccallos", image: mccallosShot },
    { label: "Coursemap", href: "#coursemap", image: coursemapShot },
    { label: "Il Colosseo", href: "#ilcolosseo", image: ilcolosseoShot },
  ],
};

/* Work: the two chapter-layout entries. */
export const work = [
  {
    id: "mccallos",
    name: "McCallos",
    kicker: "Chief Technology Officer · May 2026 to present",
    accent: "mint",
    problem:
      "NYC property managers must meet obligations from six city agencies under 14 local laws. Fines run from $25 a day for a housing violation to $268 per ton of excess emissions.",
    blocks: [
      {
        label: "What I build",
        text: "I'm the only engineer at a three-person startup. I build the React/TypeScript web app and the Capacitor iOS and Android apps on Firebase, with separate screens for doormen, superintendents, and managers.",
      },
      {
        label: "The hard part",
        text: "I pulled 17 city open-data feeds into one compliance calendar of 36 obligations. Then I built work orders: a manager assigns each obligation or repair to a vendor, approves the job from photos, and keeps a log of each step.",
      },
    ],
    stack: ["React", "TypeScript", "Firebase", "Cloud Functions", "Capacitor"],
    status: "Pilot planned",
    links: [{ label: "mccallos.com", href: "https://mccallos.com" }],
    note: "Code is private.",
    contact: { label: "McCallos inquiries", email: "michael@mccallos.com" },
    image: mccallosShot,
    real: true,
  },
  {
    id: "empire",
    name: "AI Document Agent",
    kicker: "Empire Environmental · AI Engineer · Summer 2026",
    accent: "orange",
    problem:
      "Empire Environmental's documentation specialist is retiring after 30 years of drafting the firm's DDC Site Safety Plans. Each plan starts from a bid set of specifications and scanned drawings; one live contract's set runs 294 pages.",
    blocks: [
      {
        label: "What I built",
        text: "An agent on Hermes that drafts the plan from the bid set. It keeps a three-tier retrieval memory and cites its sources. A scoring harness I built grades each draft against the firm's approved filings.",
      },
      {
        label: "Result",
        text: "Drafts score 98/100 across 25 templates, none below 83, at 2.4 minutes each. When I moved the scanned drawings from text extraction to a vision pipeline, one query dropped from 413 seconds and 3.79M tokens to 14 seconds and 53K.",
      },
    ],
    stack: ["Python", "Hermes", "Retrieval", "Vision pipeline", "Evaluation harness"],
    status: "Installing at the firm this fall",
    links: [],
    note: "Client code, private.",
    image: empireArt,
    real: false,
  },
];

/* Projects: "Built for myself." */
export const projects = [
  {
    id: "coursemap",
    name: "Coursemap",
    kicker: "Cornell degree planner",
    accent: "blue",
    problem:
      "I'm a Cornell engineering student, and I couldn't figure out which classes to take or what to major in.",
    blocks: [
      {
        label: "What it does",
        text: "Coursemap gathers what students check before picking a class: professor ratings, prerequisites and co-requisites, and the terms a course usually runs. You place the courses you like on a semester map, and it draws the prerequisite chains between them. A course turns green once you've covered what it needs and red when you haven't, and the map flags any course you've put in a term Cornell doesn't usually offer it. It also ranks 15 Cornell majors by how much of each one your courses cover.",
      },
      {
        label: "The hard part",
        text: "Cornell writes prerequisites as sentences. Coursemap parses them into requirement trees and holds the shaky parses for manual review. The ranking uses bipartite matching, so one course can't count toward two requirements.",
      },
    ],
    stack: ["React", "TypeScript", "Vite", "Zustand", "Firebase", "Vitest"],
    status: "Work in progress",
    statusNote: "I plan to finish it before we pick spring classes in late November.",
    links: [{ label: "Try the beta", href: "https://degree-planner-app.web.app" }],
    image: coursemapShot,
    real: true,
  },
  {
    id: "guitar",
    name: "Guitar Tutor",
    kicker: "Webcam and mic guitar trainer",
    accent: "yellow",
    problem:
      "I wanted to learn guitar. I wished I could see the notes I had to press on the neck, and have the computer listen and show me where I went wrong.",
    blocks: [
      {
        label: "What it does",
        text: "The app watches your fretting hand through a webcam and puts chord targets on your real fretboard. It listens through the mic and tells you which chord you played. I added an amp-tone chain because I always wanted the sound of real amps.",
      },
      {
        label: "The hard part",
        text: "When you shift the guitar, the overlay has to follow the neck. Frets follow a fixed spacing ratio, so the app can use the fretboard as its own ruler to correct drift. I'm still building this part.",
      },
    ],
    stack: ["TypeScript", "React", "MediaPipe", "OpenCV.js", "Web Audio", "FastAPI"],
    status: "Work in progress",
    links: [{ label: "GitHub", href: "https://github.com/michaeljtommaso/guitar-training-software" }],
    image: null,
  },
  {
    id: "mimir",
    name: "Mimir + Bifrost",
    kicker: "Personal AI agent system",
    accent: "orange",
    problem:
      "I wanted to see how far I could take an AI assistant, so I handed it real parts of my life.",
    blocks: [
      {
        label: "What it does",
        text: "Mimir is a Hermes agent that runs on my server around the clock, and I talk to it on Telegram. I had it run an Etsy shop, and helper agents handle my research, errands, and calendar. Bifrost is the FastAPI and React app where I queue its work, watch a shared live browser, and approve anything that spends money or publishes before Mimir does it.",
      },
      {
        label: "What I learned",
        text: "Keep it simple. I merged my two dashboards into one, and I kept chat on Telegram instead of building a chat screen of my own.",
      },
    ],
    stack: ["Python", "FastAPI", "React", "TypeScript", "Hermes", "PWA"],
    status: "Live, private",
    links: [],
    note: "Runs on the same Hermes stack as the Empire agent.",
    image: mimirArt,
    imagePosition: "30% center",
  },
];

/* Freelance client sites. */
export const clientWork = [
  {
    id: "ilcolosseo",
    title: "Il Colosseo Ristorante",
    linkLabel: "ilcolosseoristorante.com",
    link: "https://ilcolosseoristorante.com",
    description:
      "A two-location Italian restaurant with 1,150+ Google reviews and a defunct website. I built a new site, merged a split domain that had diverted 77% of its traffic, and redirected 27 old URLs to keep their rankings. Organic clicks rose 140% and impressions rose 134% to 25.3K. Customers can now send catering inquiries online through an email pipeline I built on Firebase Cloud Functions.",
    stack: ["React", "TypeScript", "Firebase"],
    image: ilcolosseoShot,
    accent: "orange",
  },
  {
    id: "closet",
    title: "Closet Curations Co.",
    linkLabel: "closetcurationco.com",
    link: "https://closetcurationco.com",
    description:
      "A personal styling studio. I built the site with Calendly booking and an animated portfolio, then carried its design system into business cards and print.",
    stack: ["React", "TypeScript"],
    image: closetShot,
    accent: "yellow",
  },
];

/* Earlier builds. */
export const earlierBuilds = [
  {
    title: "Handheld underwater propulsion device",
    linkLabel: "GE Aerospace, 2024 · slides",
    link: "https://docs.google.com/presentation/d/1p1EfmQt8tndY2haabTL9DNnSiTjWZXvs2xsYkJ1ab5s/edit?usp=sharing",
    description:
      "I modeled every part in Fusion 360 and OnShape, 3D-printed them, and wired a 24V dual-battery circuit to drive the motor. After rounds on waterproofing, motor fit, and propeller safety, I handed program leads an 18 lb working prototype.",
    stack: ["Fusion 360", "OnShape", "3D printing", "Circuits"],
    image: waterscooter,
    accent: "mint",
  },
  {
    title: "LSTM stock price model",
    linkLabel: "GitHub · StockTradingBot",
    link: "https://github.com/michaeljtommaso/StockTradingBot",
    description:
      "A PyTorch model that predicts the next day's closing price, trained on 12 years of daily closes I pulled from yFinance into SQLite.",
    stack: ["Python", "PyTorch", "SQLite"],
    image: stockbot,
    accent: "blue",
  },
];

/* High school web projects, shown as one link row. */
export const schoolWebsites = [
  { title: "Punnett Square", link: "/websites/PunnettSquare/index.html" },
  { title: "Chi-Square", link: "/websites/ChiSquare/index.html" },
  { title: "Metronome", link: "/websites/Metronome/index.html" },
  { title: "Theology project", link: "/websites/TheologyFinalProject/index.html" },
];

/* Experience timeline, from the resume. */
export const experiences = [
  { company: "McCallos", role: "Chief Technology Officer", period: "May 2026 – Present" },
  { company: "Empire Environmental", role: "AI Engineer", period: "Jun 2026 – Aug 2026" },
  { company: "Freelance", role: "Web Developer, two client sites", period: "May 2026 – Aug 2026" },
  { company: "Empire Environmental", role: "CAD & Design Associate", period: "Jun 2025 – Aug 2025" },
  { company: "GE Aerospace", role: "Engineering Intern", period: "Aug 2024" },
  {
    company: "Bay Ridge Fish Bar",
    role: "Manager",
    period: "Oct 2021 – Oct 2024",
    description: "I built an Excel inventory system that cut food waste 30% and raised margins 5%.",
  },
];

export const education = {
  school: "Cornell University",
  college: "Duffield College of Engineering",
  degree: "B.S. Operations Research & Engineering",
  expected: "Expected May 2029",
  gpa: "3.82",
  coursework: ["CS 2110 Data Structures & OOP", "ENGRD 2700 Probability & Statistics", "MATH 2940 Linear Algebra"],
  activities: ["Kappa Theta Pi (VP of Committees)", "Cornell Blockchain", "Cornell Maker Club"],
};

export const accentHex = {
  orange: "#ff5b2e",
  blue: "#2a7fff",
  mint: "#3cae72",
  yellow: "#e6b53a",
};
