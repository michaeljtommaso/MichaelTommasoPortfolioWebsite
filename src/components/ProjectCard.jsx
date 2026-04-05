import { motion } from "motion/react";

export default function ProjectCard({ project }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="group overflow-hidden rounded-[28px] border border-border bg-surface"
    >
      <div className="relative h-56 border-b border-border bg-neutral-900">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/70">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
            >
              {item}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          target="_blank"
          className="mt-6 inline-block text-sm font-medium text-white underline underline-offset-4"
        >
          View project
        </a>
      </div>
    </motion.article>
  );
}