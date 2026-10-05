import SectionHeading from "../components/SectionHeading";
import FeatureCard from "../components/FeatureCard";
import { projects } from "../data/portfolioData";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects"
          title="Built for myself."
          description="I started each of these to fix something in my own life, or to see how far an idea could go."
        />
        <div className="grid gap-20 md:gap-28">
          {projects.map((item, i) => (
            <FeatureCard key={item.id} item={item} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
