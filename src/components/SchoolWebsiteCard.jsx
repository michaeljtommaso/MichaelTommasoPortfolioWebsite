export default function SchoolWebsiteCard({ project }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="group block w-[320px] overflow-hidden rounded-[28px] border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:bg-elevated"
    >
      <div className="relative h-[220px] overflow-hidden bg-neutral-900">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
      </div>

      <div className="p-5">
        <h3 className="text-base font-medium text-white">{project.title}</h3>
      </div>
    </a>
  );
}