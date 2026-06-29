import { motion } from "motion/react";
import SectionHeading from "../components/SectionHeading";
import { processSteps } from "../data/portfolioData";
import { staggerContainer, fadeUp, inView } from "../utils/motion";

export default function Process() {
  return (
    <section id="process" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Motion grammar"
          title="Research → Sketch → Build → Verify → Ship."
          description="A repeatable loop with rules: scout precedent, draft fast, build with agents, verify in a real browser, then ship and learn."
        />

        <div className="relative">
          {/* Connecting route, drawn with scroll */}
          <svg
            className="absolute left-0 right-0 top-[34px] hidden h-2 w-full md:block"
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.line
              x1="2"
              y1="1"
              x2="98"
              y2="1"
              stroke="url(#routeGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <defs>
              <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="var(--color-orange)" />
                <stop offset="0.5" stopColor="var(--color-blue)" />
                <stop offset="1" stopColor="var(--color-mint)" />
              </linearGradient>
            </defs>
          </svg>

          <motion.ol
            variants={staggerContainer}
            {...inView}
            className="grid gap-4 md:grid-cols-5"
          >
            {processSteps.map((step) => (
              <motion.li
                key={step.step}
                variants={fadeUp}
                className="relative rounded-3xl border border-ink/10 bg-paper/80 p-5 shadow-[0_16px_40px_rgba(16,32,27,0.08)]"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-ink font-mono text-xs font-bold text-paper">
                  {step.step}
                </span>
                <h3 className="mt-5 text-xl font-extrabold tracking-tight text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
