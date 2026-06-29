import SectionHeading from "../components/SectionHeading";
import ArtifactChapter from "../components/ArtifactChapter";
import { systems } from "../data/portfolioData";

export default function Chapters() {
  return (
    <section id="chapters" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Cinematic artifact chapters"
          title="Imagery drives the story."
          description="Each flagship system is a scene — full-bleed imagery, foreground labels, and capabilities that reveal as you travel the map."
        />

        <div className="grid gap-20 md:gap-28">
          {systems.map((system, i) => (
            <ArtifactChapter key={system.id} system={system} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
