import { motion } from "motion/react";
import SectionHeading from "../components/SectionHeading";
import { experiences, education } from "../data/portfolioData";
import { staggerContainer, fadeUp, inView } from "../utils/motion";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Experience" title="Where I've worked." />

        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <motion.ol variants={staggerContainer} {...inView} className="border-l border-ink/15 pl-6">
            {experiences.map((exp) => (
              <motion.li key={`${exp.company}-${exp.role}`} variants={fadeUp} className="relative pb-7 last:pb-0">
                <span
                  className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-paper bg-ink"
                  aria-hidden="true"
                />
                <p className="font-mono text-xs uppercase tracking-wide text-muted">{exp.period}</p>
                <h3 className="mt-1 text-base font-extrabold text-ink">
                  {exp.role} · <span className="font-semibold text-muted">{exp.company}</span>
                </h3>
                {exp.description && <p className="mt-1 text-sm leading-relaxed text-muted">{exp.description}</p>}
              </motion.li>
            ))}
          </motion.ol>

          <motion.div
            id="education"
            variants={fadeUp}
            {...inView}
            className="scroll-mt-28 self-start rounded-[28px] border border-ink/10 bg-paper/85 p-7 shadow-[0_22px_60px_rgba(16,32,27,0.10)] md:p-9"
          >
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-orange">Education</p>
            <h3 className="mt-3 text-2xl font-[1000] tracking-tight text-ink">{education.school}</h3>
            <p className="mt-1 text-base font-semibold text-ink">{education.degree}</p>
            <p className="mt-1 text-sm text-muted">
              {education.college} · {education.expected} · GPA {education.gpa}
            </p>

            <p className="mt-6 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Coursework</p>
            <ul className="mt-2 grid gap-1 text-sm text-ink">
              {education.coursework.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>

            <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Activities</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {education.activities.map((a) => (
                <li key={a} className="rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 text-xs text-ink">
                  {a}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
