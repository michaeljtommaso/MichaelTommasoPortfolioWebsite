import { motion } from "motion/react";
import SectionHeading from "../components/SectionHeading";
import BuildCard from "../components/BuildCard";
import { staggerContainer, fadeUp, inView } from "../utils/motion";
import { builds, schoolWebsites } from "../data/portfolioData";

export default function SelectedBuilds() {
  return (
    <section id="builds" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="More routes"
          title="Selected builds."
          description="Engineering, machine learning, and interactive software — the artifacts behind how I think about systems."
        />

        <motion.div
          variants={staggerContainer}
          {...inView}
          className="grid gap-6 md:grid-cols-2"
        >
          {builds.map((build) => (
            <BuildCard key={build.title} build={build} />
          ))}
        </motion.div>

        {/* Early interactive builds */}
        <div className="mt-16">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Early interactive builds
          </p>
          <motion.div
            variants={staggerContainer}
            {...inView}
            className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4"
          >
            {schoolWebsites.map((site) => (
              <motion.a
                key={site.title}
                variants={fadeUp}
                href={site.link}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-2xl border border-ink/10 bg-paper/80 shadow-[0_16px_40px_rgba(16,32,27,0.08)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[16/11] overflow-hidden">
                  <img
                    src={site.image}
                    alt={site.title}
                    loading="eager"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="px-3 py-3 text-sm font-semibold text-ink">{site.title}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
