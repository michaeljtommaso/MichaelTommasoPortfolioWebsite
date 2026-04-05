import { motion, useScroll, useTransform } from "motion/react";
import { fadeUp, staggerContainer } from "../utils/motion";

export default function Hero() {
  const { scrollY } = useScroll();

  const bgY = useTransform(scrollY, [0, 800], [0, 180]);
  const contentY = useTransform(scrollY, [0, 800], [0, -80]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0.35]);

  return (
    <section className="relative min-h-screen overflow-hidden border-b border-border flex items-center">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 scale-110"
      >
        <img
          src="/images/parralax-img1.gif"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-background" />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(139,92,246,0.22),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.18),transparent_24%)]" />

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm uppercase tracking-[0.35em] text-white/60"
          >
            Portfolio
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-5xl font-semibold tracking-tight text-white md:text-7xl"
          >
            Michael{" "}
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Tommaso
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-8 text-white/75 md:text-xl"
          >
            Cornell Engineering student, building across
            software, CAD, and data-driven systems.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-2xl bg-gradient-to-r from-accent-primary to-accent-secondary px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent-primary/20 transition hover:scale-[1.03]"
            >
              View Projects
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}