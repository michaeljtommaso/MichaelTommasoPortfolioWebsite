import { motion } from "motion/react";
import { fadeUp } from "../utils/motion";
import { accentHex } from "../data/portfolioData";

export default function BuildCard({ build }) {
  return (
    <motion.a
      variants={fadeUp}
      href={build.link}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col overflow-hidden rounded-[28px] border border-ink/10 bg-paper/80 shadow-[0_22px_60px_rgba(16,32,27,0.10)] transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={build.image}
          alt={build.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className="absolute left-4 top-4 h-2.5 w-2.5 rounded-full"
          style={{
            backgroundColor: accentHex[build.accent],
            boxShadow: `0 0 0 6px ${accentHex[build.accent]}22`,
          }}
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-extrabold tracking-tight text-ink">{build.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{build.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {build.stack.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-ink/10 bg-white/60 px-2.5 py-1 font-mono text-[11px] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.a>
  );
}
