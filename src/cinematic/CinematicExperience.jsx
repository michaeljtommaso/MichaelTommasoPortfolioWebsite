import { useLenis } from "./lib/useLenis";
import VideoScrubScene from "./scenes/VideoScrubScene";
import { orbitalScenes } from "./data/orbitalScenes";
import { builds, experiences, processSteps, schoolWebsites, socials } from "../data/portfolioData";

export default function CinematicExperience() {
  useLenis();

  return (
    <main className="relative bg-black text-white">
      <a
        href="#armory"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-black"
      >
        Skip cinematic
      </a>

      {orbitalScenes.map((scene, index) => (
        <VideoScrubScene key={scene.id} scene={scene} index={index} />
      ))}

      <TailSections />
    </main>
  );
}

function TailSections() {
  return (
    <section id="armory" className="relative overflow-hidden bg-[#05070a] px-5 py-20 text-white md:px-10 md:py-28 lg:px-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(91,208,255,0.18),transparent_30rem),radial-gradient(circle_at_12%_36%,rgba(255,255,255,0.08),transparent_24rem)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Continue deeper</p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2.4rem,6vw,5.6rem)] font-[1000] leading-[0.9]">
              The lighter tail keeps the proof fast.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-white/68">
            The front half carries the cinematic backbone. The rest stays quick to scan: smaller builds,
            process, trajectory, and contact without forcing every detail through video.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {builds.map((build) => (
            <a
              key={build.title}
              href={build.link}
              target="_blank"
              rel="noreferrer"
              className="group grid gap-5 border border-white/12 bg-white/6 p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/45 md:grid-cols-[13rem_1fr]"
            >
              <div className="aspect-[16/11] overflow-hidden bg-black">
                <img
                  src={build.image}
                  alt={build.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
              </div>
              <div>
                <h3 className="text-xl font-black leading-tight">{build.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/66">{build.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {build.stack.map((tag) => (
                    <li key={tag} className="border border-white/12 px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white/64">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {schoolWebsites.map((site) => (
            <a
              key={site.title}
              href={site.link}
              target="_blank"
              rel="noreferrer"
              className="group border border-white/12 bg-white/5 p-3 transition duration-300 hover:-translate-y-1 hover:border-white/28"
            >
              <div className="aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={site.image}
                  alt={site.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
              </div>
              <p className="mt-3 text-sm font-bold text-white/78">{site.title}</p>
            </a>
          ))}
        </div>

        <div className="mt-20 grid gap-4 lg:grid-cols-5">
          {processSteps.map((step) => (
            <article key={step.step} className="border border-white/12 bg-black/28 p-5">
              <p className="font-mono text-xs font-bold text-cyan-200">{step.step}</p>
              <h3 className="mt-5 text-xl font-black">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/62">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Saga</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Current trajectory</h2>
            <div className="mt-8 divide-y divide-white/12 border-y border-white/12">
              {experiences.map((item) => (
                <article key={`${item.company}-${item.role}`} className="grid gap-3 py-5 md:grid-cols-[12rem_1fr]">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/46">{item.period}</p>
                  <div>
                    <h3 className="font-bold">
                      {item.role}, {item.company}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/62">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div id="contact" className="border border-cyan-200/24 bg-cyan-200/8 p-6 md:p-8">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Contact</p>
            <h2 className="mt-4 text-4xl font-black leading-none md:text-5xl">Build the next system.</h2>
            <p className="mt-5 text-white/68">Reach out directly, follow the work, or grab the resume.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { label: "LinkedIn", href: socials.linkedin },
                { label: "GitHub", href: socials.github },
                { label: "Resume", href: socials.resume },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-white/18 bg-white px-5 py-3 text-sm font-bold text-zinc-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-100"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
