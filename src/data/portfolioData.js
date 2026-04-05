import waterscooter from "../assets/waterscooter.png"
import stockbot from "../assets/stockbot.png"

import schoolSite1 from "../assets/schoolsites/punnet-square.png"
import schoolSite2 from "../assets/schoolsites/chi-square.png"
import schoolSite3 from "../assets/schoolsites/metronome.png"
import schoolSite4 from "../assets/schoolsites/theologyproject.png"

export const projects = [
  {
    title: "Machine Learning Stock Trading Bot",
    description:
      "A machine learning trading system in Python using historical and real-time market data. I implemented rolling training windows and evaluated model performance across changing market conditions.",
    stack: ["Python", "SQL", "Machine Learning", "APIs"],
    image: stockbot,
    link: "https://github.com/michaeljtommaso/StockTradingBot",
  },
  {
    title: "Lightweight Aquatic Vehicle",
    description:
      "I designed and prototyped a lightweight underwater transportation device using 3D modeling and circuit creation during an aerospace internship.",
    stack: ["3D Design", "Engineering", "Fusion 360", "Circuit Design"],
    image: waterscooter,
    link: "https://docs.google.com/presentation/d/1p1EfmQt8tndY2haabTL9DNnSiTjWZXvs2xsYkJ1ab5s/edit?usp=sharing",
  },
];

export const schoolWebsites = [
  {
    title: "Punnett Square Generator",
    image: schoolSite1,
    link: "/websites/PunnettSquare/index.html",
  },
  {
    title: "Chi-Squared Calculator",
    image: schoolSite2,
    link: "/websites/ChiSquare/index.html",
  },
  {
    title: "Metronome App",
    image: schoolSite3,
    link: "/websites/Metronome/index.html",
  },
  {
    title: "Theology Final Project",
    image: schoolSite4,
    link: "/websites/TheologyFinalProject/index.html",
  },
];

export const skills = [
  "Python",
  "JavaScript",
  "HTML/CSS",
  "SQL",
  "Fusion 360",
  "AutoCAD",
  "CAD Design",
  "React",
];

export const experiences = [
  {
    company: "Empire Environmental",
    role: "CAD Associate",
    period: "Jun 2025 – Aug 2025",
    description:
      "Produced CAD layouts and collaborated with engineers to refine technical designs across multiple iterations.",
  },
  {
    company: "GE Aerospace",
    role: "Engineering Intern",
    period: "Aug 2024",
    description:
      "Selected for a competitive internship exploring aerospace systems, hypersonic technology, and engineering workflows.",
  },
  {
    company: "Bay Ridge Fish Bar",
    role: "Manager",
    period: "Oct 2021 – Oct 2024",
    description:
      "Managed operations, staff, and customer experience in a fast-paced environment with strong execution and leadership.",
  },
];