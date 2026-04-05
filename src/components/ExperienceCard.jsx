export default function ExperienceCard({ experience }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 md:p-7">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h3 className="text-xl font-semibold text-white">
          {experience.company} — {experience.role}
        </h3>
        <p className="text-sm text-white/45">{experience.period}</p>
      </div>
      <p className="mt-4 text-sm leading-7 text-white/70">{experience.description}</p>
    </div>
  );
}