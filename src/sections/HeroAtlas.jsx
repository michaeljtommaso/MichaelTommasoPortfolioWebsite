import { motion } from "motion/react";
import AtlasMap from "../components/AtlasMap";
import { fadeUp, rise, staggerContainer } from "../utils/motion";
import { socials } from "../data/portfolioData";

export default function HeroAtlas() {
  return (
    <section id="atlas" className="relative px-4 pt-24 pb-10 md:pt-36 md:pb-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial={false}
          animate="show"
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-orange"
          >
            Michael Tommaso / Systems Atlas
          </motion.p>

          <motion.h1
            variants={rise}
            className="mt-5 text-[clamp(3rem,8vw,6.5rem)] font-[1000] leading-[0.86] tracking-[-0.04em] text-ink"
          >
            A living map of <br className="hidden sm:block" />
            systems I build.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            I build AI systems that turn intent into working software — agent
            orchestration, multi-tenant operations platforms, and creative
            pipelines. Scroll to follow each route from idea to artifact.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#chapters"
              className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-[#fbfcf7] transition-transform hover:-translate-y-0.5"
            >
              Follow a route
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-ink/15 bg-white/60 px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-white"
            >
              GitHub
            </a>
          </motion.div>
        </motion.div>

        <div className="mt-8 md:mt-14">
          <AtlasMap />
        </div>
      </div>
    </section>
  );
}
