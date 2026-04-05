export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="text-sm uppercase tracking-[0.25em] text-white/45">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-white/65 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}