import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { accentHex } from "../data/portfolioData";

/* Decorative system-map texture layered over the poster gradient. */
function patternStyle(pattern) {
  if (pattern === "grid") {
    return {
      backgroundImage:
        "repeating-linear-gradient(0deg, rgba(255,255,255,0.16) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 40px)",
    };
  }
  if (pattern === "panels") {
    return {
      backgroundImage:
        "linear-gradient(135deg, rgba(255,255,255,0.14) 0 2px, transparent 2px 22px)",
    };
  }
  return {
    backgroundImage:
      "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22) 0 2px, transparent 3px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.18) 0 2px, transparent 3px)",
    backgroundSize: "64px 64px",
  };
}

export default function ArtifactChapter({ system, flip }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const artScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.12, 1]);
  const artY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : ["-6%", "6%"]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`relative grid items-center gap-6 md:grid-cols-2 md:gap-10 ${
        flip ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Cinematic poster */}
      <a
        href={system.link}
        target="_blank"
        rel="noreferrer"
        aria-label={`${system.name} — ${system.kicker}`}
        className="group relative block aspect-[4/3] overflow-hidden rounded-[32px] border border-ink/10 shadow-[0_28px_90px_rgba(16,32,27,0.16)]"
      >
        <motion.div
          className="absolute inset-0"
          style={{ background: system.art, scale: artScale, y: artY }}
        />
        <div className="absolute inset-0" style={patternStyle(system.pattern)} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute left-6 bottom-6 right-6">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-white/80">
            Chapter {system.index}
          </span>
          <h3 className="mt-2 text-4xl font-[1000] leading-none tracking-tight text-white md:text-5xl">
            {system.name}
          </h3>
        </div>
      </a>

      {/* Narrative */}
      <div className="md:px-2">
        <span
          className="font-mono text-xs font-bold uppercase tracking-[0.16em]"
          style={{ color: accentHex[system.accent] }}
        >
          {system.kicker}
        </span>
        <h4 className="mt-3 text-3xl font-[1000] leading-[0.95] tracking-tight text-ink md:text-4xl">
          {system.name}
        </h4>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{system.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {system.capabilities.map((cap) => (
            <li
              key={cap}
              className="rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 font-mono text-xs text-ink"
            >
              {cap}
            </li>
          ))}
        </ul>

        <a
          href={system.link}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-ink transition-colors hover:text-blue"
        >
          Explore the route
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </motion.article>
  );
}
