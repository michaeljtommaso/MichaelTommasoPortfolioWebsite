import { motion } from "motion/react";
import { fadeUp, staggerContainer, inView } from "../utils/motion";

export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <motion.div
      variants={staggerContainer}
      {...inView}
      className={`mb-12 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow ? (
        <motion.p
          variants={fadeUp}
          className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-orange"
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        variants={fadeUp}
        className="mt-3 text-[clamp(2.25rem,5vw,4rem)] font-[1000] leading-[0.9] tracking-[-0.03em] text-ink"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p variants={fadeUp} className="mt-4 text-lg leading-relaxed text-muted">
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
