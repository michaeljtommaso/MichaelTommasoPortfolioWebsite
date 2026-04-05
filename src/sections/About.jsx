import { motion } from "motion/react";
import SectionHeading from "../components/SectionHeading";
import { fadeUp, slideInLeft, slideInRight } from "../utils/motion";
import { skills } from "../data/portfolioData";

export default function About() {
  return (
    <section id="about" className="border-b border-white/10 py-24 bg-[linear-gradient(to_right,#0a0612_0%,#000000_40%,#000000_60%,#0a0612_100%)]">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="About"
          title="Engineering, software, and real-world execution."
          description="I’m interested in building practical systems that combine technical depth with clean execution."
        />

        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <p className="text-base leading-8 text-white/70 md:text-lg">
              I am an undeclared engineering student at Cornell University with
              experience in engineering internships, CAD design, operations leadership,
              and independent software projects. I enjoy solving real-world problems
              that require analytical thinking, adaptability, and strong execution.
            </p>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="flex flex-wrap items-start gap-3"
            >
                
            {skills.map((skill, index) => (
                <motion.span
                    key={`${skill}-${index}`}
                    variants={fadeUp}
                    className="inline-flex w-fit self-start whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85"
                >
                    {skill}
                </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}