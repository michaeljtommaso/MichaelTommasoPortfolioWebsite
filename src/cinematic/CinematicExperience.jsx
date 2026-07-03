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
    <section id="armory" className="relative overflow-hidden bg-[#030406] px-5 py-20 text-white md:px-10 md:py-28 lg:px-16">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.78),transparent_18rem),radial-gradient(circle_at_70%_10%,rgba(255,255,255,0.08),transparent_30rem),radial-gradient(circle_at_12%_36%,rgba(255,255,255,0.05),transparent_24rem)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-white/48">After the orbit</p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2.4rem,6vw,5.6rem)] font-[1000] leading-[0.9]">
              Proof, without breaking the spell.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-white/68">
            The videos stay as the atmosphere. The remaining work reads like field notes and artifacts:
            quieter surfaces, fewer bright system graphics, and a cleaner path to the actual proof.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {builds.map((build, buildIndex) => (
            <a
              key={build.title}
              href={build.link}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/24 md:p-6"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/26 to-transparent" />
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.24em] text-white/38">
                Artifact {String(buildIndex + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-8 max-w-md text-2xl font-black leading-tight">{build.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/62">{build.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {build.stack.map((tag) => (
                  <li key={tag} className="border border-white/10 px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white/52">
                    {tag}
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>

        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {schoolWebsites.map((site, siteIndex) => (
            <a
              key={site.title}
              href={site.link}
              target="_blank"
              rel="noreferrer"
              className="group min-h-36 border border-white/10 bg-white/[0.025] p-4 transition duration-300 hover:-translate-y-1 hover:border-white/24"
            >
              <p className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-white/34">
                Early web {String(siteIndex + 1).padStart(2, "0")}
              </p>
              <p className="mt-10 text-sm font-bold text-white/78">{site.title}</p>
            </a>
          ))}
        </div>

        <div className="mt-20 grid gap-4 lg:grid-cols-5">
          {processSteps.map((step) => (
            <article key={step.step} className="border border-white/10 bg-black/24 p-5">
              <p className="font-mono text-xs font-bold text-white/46">{step.step}</p>
              <h3 className="mt-5 text-xl font-black">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/62">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-white/46">Trajectory</p>
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

          <div id="contact" className="border border-white/14 bg-white/[0.045] p-6 md:p-8">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-white/50">Contact</p>
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
