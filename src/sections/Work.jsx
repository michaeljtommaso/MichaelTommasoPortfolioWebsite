import SectionHeading from "../components/SectionHeading";
import FeatureCard from "../components/FeatureCard";
import { work } from "../data/portfolioData";

export default function Work() {
  return (
    <section id="work" className="route-texture scroll-mt-20 px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="2026"
          title="Work."
          description="The startup I build for, and the agent I built for an environmental contractor this summer."
        />
        <div className="grid gap-20 md:gap-28">
          {work.map((item, i) => (
            <FeatureCard key={item.id} item={item} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
