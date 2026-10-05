import { motion } from "motion/react";
import { fadeUp } from "../utils/motion";
import { accentHex } from "../data/portfolioData";

/* Card for client sites and earlier builds. Renders as a link only when the
 * build has one. */
export default function BuildCard({ build }) {
  const linked = Boolean(build.link);
  const Tag = linked ? motion.a : motion.div;
  const linkProps = linked ? { href: build.link, target: "_blank", rel: "noreferrer" } : {};

  return (
    <Tag
      id={build.id}
      variants={fadeUp}
      {...linkProps}
      className={`group scroll-mt-28 flex flex-col overflow-hidden rounded-[28px] border border-ink/10 bg-paper/80 shadow-[0_22px_60px_rgba(16,32,27,0.10)] ${
        linked ? "transition-transform duration-300 hover:-translate-y-1" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${build.id ? "aspect-[16/10]" : "aspect-[2/1]"}`}>
        <img
          src={build.image}
          alt={`Screenshot of ${build.title}`}
          loading="lazy"
          decoding="async"
          className={`h-full w-full ${build.id ? "object-cover object-top" : "bg-white object-contain"} ${linked ? "transition-transform duration-500 group-hover:scale-105" : ""}`}
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
        {build.linkLabel && (
          <p className="mt-1 font-mono text-xs text-muted">
            {build.linkLabel}
            {linked && <span aria-hidden="true"> ↗</span>}
          </p>
        )}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{build.description}</p>
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
    </Tag>
  );
}
