import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { schoolWebsites } from "../data/portfolioData";

export default function SchoolWebsitesCarousel() {
  const [projects, setProjects] = useState(schoolWebsites);

  const handleNext = () => {
    setProjects((prev) => {
      const updated = [...prev];
      const first = updated.shift();
      updated.push(first);
      return updated;
    });
  };

  const handlePrev = () => {
    setProjects((prev) => {
      const updated = [...prev];
      const last = updated.pop();
      updated.unshift(last);
      return updated;
    });
  };

  return (
    <div className="mt-16">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-white md:text-3xl">
          Websites I Designed for School
        </h3>

        <div className="flex gap-3">
          <button onClick={handlePrev} className="hover:cursor-pointer">
            <ArrowLeft size={22} />
          </button>
          <button onClick={handleNext} className="hover:cursor-pointer">
            <ArrowRight size={22} />
          </button>
        </div>
      </div>

      <div className="project-scroll-react">

        {projects.slice(0, 3).map((project, index) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className={`scroll-image pos-${index}`}
          >
            <img src={project.image} alt={project.title} />
            <p className="title text-center">{project.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
}