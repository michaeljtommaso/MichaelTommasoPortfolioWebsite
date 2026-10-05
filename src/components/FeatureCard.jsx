import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { accentHex } from "../data/portfolioData";
import FretboardArt from "./FretboardArt";

/* Image panel. Real screenshots render plain (top-anchored, no overlay) so the
 * UI stays legible; generated art keeps the dark scrim and name overlay. */
function Visual({ item }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const artScale = useTransform(scrollYProgress, [0, 1], reduce || item.real ? [1, 1] : [1.12, 1]);
  const artY = useTransform(scrollYProgress, [0, 1], reduce || item.real ? [0, 0] : ["-6%", "6%"]);

  const frame = "relative block aspect-[1425/900] overflow-hidden rounded-[28px] border border-ink/10 bg-paper shadow-[0_28px_90px_rgba(16,32,27,0.16)]";
  const primary = item.links?.[0];
  const Wrapper = primary ? "a" : "div";
  const wrapperProps = primary
    ? { href: primary.href, target: "_blank", rel: "noreferrer", "aria-label": `${item.name}: ${primary.label}` }
    : {};

  return (
    <Wrapper ref={ref} {...wrapperProps} className={`group ${frame}`}>
      {item.image ? (
        <motion.img
          src={item.image}
          alt={item.real ? `Screenshot of ${item.name}` : ""}
          aria-hidden={item.real ? undefined : "true"}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover ${item.real ? "object-top transition-transform duration-700 group-hover:scale-[1.02]" : ""}`}
          style={{ objectPosition: item.real ? "top" : item.imagePosition || "center", scale: artScale, y: artY }}
        />
      ) : (
        <FretboardArt accent={accentHex[item.accent]} />
      )}

      {!item.real && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <h3 className="absolute bottom-6 left-6 right-6 text-4xl font-[1000] leading-none tracking-tight text-white md:text-5xl">
            {item.name}
          </h3>
        </>
      )}
    </Wrapper>
  );
}

export default function FeatureCard({ item, flip }) {
  const accent = accentHex[item.accent];

  return (
    <motion.article
      id={item.id}
      /* Translate-only entrance: stays opaque so captures never show a blank card. */
      initial={{ y: 48 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`scroll-mt-28 grid items-start gap-6 md:grid-cols-2 md:gap-12 ${
        flip ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="md:sticky md:top-28">
        <Visual item={item} />
      </div>

      <div className="md:px-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
            {item.kicker}
          </span>
        </div>
        <h3 className="mt-3 text-3xl font-[1000] leading-[0.95] tracking-tight text-ink md:text-4xl">
          {item.name}
        </h3>

        <p className="mt-5 border-l-2 pl-4 text-lg italic leading-relaxed text-ink/80" style={{ borderColor: accent }}>
          {item.problem}
        </p>

        <dl className="mt-6 grid gap-5">
          {item.blocks.map((block) => (
            <div key={block.label}>
              <dt className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                {block.label}
              </dt>
              <dd className="mt-1.5 text-base leading-relaxed text-muted">{block.text}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 flex flex-wrap gap-2">
          {item.stack.map((tag) => (
            <li key={tag} className="rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 font-mono text-xs text-ink">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold"
            style={{ backgroundColor: `${accent}1f`, color: "var(--color-ink)" }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
            {item.status}
          </span>
          {item.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-bold text-ink transition-colors hover:text-blue"
            >
              {link.label}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          ))}
        </div>
        {item.statusNote && <p className="mt-3 text-sm text-muted">{item.statusNote}</p>}
        {item.note && <p className="mt-3 text-sm text-muted/80">{item.note}</p>}
      </div>
    </motion.article>
  );
}
