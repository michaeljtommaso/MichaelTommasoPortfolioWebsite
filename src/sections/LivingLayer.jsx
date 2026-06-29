import { motion } from "motion/react";
import SectionHeading from "../components/SectionHeading";
import { nowBuilding, experiences, accentHex } from "../data/portfolioData";
import { staggerContainer, fadeUp, inView } from "../utils/motion";

export default function LivingLayer() {
  return (
    <section id="now" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Living layer"
          title="Now building."
          description="The map keeps moving. Here's what's active right now and the trajectory that got me here."
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Now building feed */}
          <motion.ul variants={staggerContainer} {...inView} className="grid gap-4">
            {nowBuilding.map((item) => (
              <motion.li
                key={item.title}
                variants={fadeUp}
                className="group flex gap-4 rounded-3xl border border-ink/10 bg-paper/80 p-5 shadow-[0_16px_40px_rgba(16,32,27,0.08)] transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="mt-1.5 flex">
                  <span
                    className="relative h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: accentHex[item.accent],
                      boxShadow: `0 0 0 6px ${accentHex[item.accent]}22`,
                    }}
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-[0.12em]"
                    style={{ color: accentHex[item.accent] }}
                  >
                    {item.tag}
                  </span>
                  <h3 className="mt-1 text-lg font-extrabold tracking-tight text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.note}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          {/* Trajectory */}
          <motion.div variants={staggerContainer} {...inView}>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Trajectory
            </p>
            <ol className="mt-5 border-l border-ink/15 pl-6">
              {experiences.map((exp) => (
                <motion.li key={`${exp.company}-${exp.role}`} variants={fadeUp} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-paper bg-ink" aria-hidden="true" />
                  <p className="font-mono text-xs uppercase tracking-wide text-muted">{exp.period}</p>
                  <h3 className="mt-1 text-base font-extrabold text-ink">
                    {exp.role} · <span className="font-semibold text-muted">{exp.company}</span>
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{exp.description}</p>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
