import { motion } from "motion/react";
import SectionHeading from "../components/SectionHeading";
import ExperienceCard from "../components/ExperienceCard";
import { experiences } from "../data/portfolioData";
import { fadeUp, staggerContainer } from "../utils/motion";

export default function Experience() {
  return (
    <section id="experience" className="border-b border-white/10 py-24 bg-[linear-gradient(to_right,#0a0612_0%,#000000_40%,#000000_60%,#0a0612_100%)]">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Experience"
          title="Where I’ve built and led"
          description="From aerospace to CAD to operations management, each role sharpened a different part of how I work."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-5"
        >
          {experiences.map((experience) => (
            <motion.div key={`${experience.company}-${experience.role}`} variants={fadeUp}>
              <ExperienceCard experience={experience} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}