import { motion } from "motion/react";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import SchoolWebsitesCarousel from "../components/SchoolWebsitesCarousel";
import { projects } from "../data/portfolioData";
import { fadeUp, staggerContainer } from "../utils/motion";

export default function Projects() {
  return (
    <section id="projects" className="border-b border-white/10 py-24 bg-[linear-gradient(to_right,#0a0612_0%,#000000_40%,#000000_60%,#0a0612_100%)]">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Projects"
          title="Featured work"
          description="A mix of software, engineering, and technical design projects that reflect how I approach building."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={fadeUp}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <SchoolWebsitesCarousel />
      </div>
    </section>
  );
}