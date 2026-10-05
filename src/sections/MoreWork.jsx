import { motion } from "motion/react";
import SectionHeading from "../components/SectionHeading";
import BuildCard from "../components/BuildCard";
import { staggerContainer, inView } from "../utils/motion";
import { clientWork, earlierBuilds, schoolWebsites } from "../data/portfolioData";

export default function MoreWork() {
  return (
    <>
      <section id="clients" className="scroll-mt-20 px-4 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Freelance"
            title="Client work."
            description="Two paid sites I designed and shipped in summer 2026."
          />
          <motion.div variants={staggerContainer} {...inView} className="grid gap-6 md:grid-cols-2">
            {clientWork.map((build) => (
              <BuildCard key={build.title} build={build} />
            ))}
          </motion.div>
        </div>
      </section>

      <section id="earlier" className="scroll-mt-20 px-4 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Earlier" title="Earlier builds." />
          <motion.div variants={staggerContainer} {...inView} className="grid gap-6 md:grid-cols-2">
            {earlierBuilds.map((build) => (
              <BuildCard key={build.title} build={build} />
            ))}
          </motion.div>

          <div className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted">
              High school web projects
            </p>
            {schoolWebsites.map((site) => (
              <a
                key={site.title}
                href={site.link}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:text-blue hover:decoration-blue"
              >
                {site.title}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
