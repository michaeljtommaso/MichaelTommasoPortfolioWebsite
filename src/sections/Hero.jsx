import { motion } from "motion/react";
import { fadeUp, rise, staggerContainer } from "../utils/motion";
import { hero, socials } from "../data/portfolioData";

export default function Hero() {
  return (
    <section id="about" className="relative px-4 pt-28 pb-12 md:pt-40 md:pb-20">
      <div className="mx-auto max-w-6xl">
        <motion.div variants={staggerContainer} initial={false} animate="show" className="max-w-5xl">
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-orange"
          >
            {hero.kicker}
          </motion.p>

          <motion.h1
            variants={rise}
            className="mt-5 text-[clamp(2.75rem,7vw,5.75rem)] font-[1000] leading-[0.9] tracking-[-0.04em] text-ink"
          >
            {hero.headline}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {hero.sub}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-[#fbfcf7] transition-transform hover:-translate-y-0.5"
            >
              See my work
            </a>
            <a
              href={socials.resume}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-ink/15 bg-white/60 px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-white"
            >
              Résumé
            </a>
            <a
              href={`mailto:${socials.email}`}
              className="rounded-full border border-ink/15 bg-white/60 px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-white"
            >
              Email
            </a>
          </motion.div>
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial={false}
          animate="show"
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-16"
        >
          {hero.previews.map((p) => (
            <motion.li key={p.label} variants={fadeUp}>
              <a
                href={p.href}
                className="group block overflow-hidden rounded-2xl border border-ink/10 bg-paper/80 shadow-[0_16px_40px_rgba(16,32,27,0.10)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[1425/900] overflow-hidden">
                  <img
                    src={p.image}
                    alt={`Screenshot of ${p.label}`}
                    decoding="async"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-ink">
                  {p.label}
                  <span aria-hidden="true" className="text-muted transition-transform group-hover:translate-y-0.5">↓</span>
                </p>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
