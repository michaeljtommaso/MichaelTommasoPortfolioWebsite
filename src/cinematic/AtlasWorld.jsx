import { useLayoutEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap, ScrollTrigger } from "./lib/gsap";
import { useDesktopMotion } from "./lib/useDesktopMotion";
import ArtifactChapter from "../components/ArtifactChapter";
import SectionHeading from "../components/SectionHeading";
import { fadeUp, staggerContainer, inView } from "../utils/motion";
import {
  accentHex,
  builds,
  experiences,
  nowBuilding,
  processSteps,
  schoolWebsites,
  socials,
  systems,
} from "../data/portfolioData";

/* The world flip: the cinema dips to black, then dawns onto the paper atlas.
 * Everything below is the old Fluid Systems Atlas language — warm canvas,
 * graphite ink, route accents — carrying the proof in daylight. */
export default function AtlasWorld() {
  return (
    <div id="atlas-world" className="relative bg-paper text-ink">
      <Landing />
      <Chapters />
      <SpecimenGallery />
      <ProcessColumns />
      <NowAndTrajectory />
      <Contact />
      <DarkCoda />
    </div>
  );
}

function Landing() {
  return (
    <section className="route-texture relative overflow-hidden">
      {/* Dawn: the black of the last scene bleeds into mist, then paper. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[46vh] bg-[linear-gradient(180deg,#030406_0%,#0d1a15_18%,rgba(237,244,240,0)_100%)]"
      />
      <div aria-hidden="true" className="atlas-grid absolute inset-0 opacity-70" />

      <motion.div
        variants={staggerContainer}
        {...inView}
        className="relative mx-auto max-w-7xl px-5 pb-24 pt-[52vh] md:px-10 md:pb-32 lg:px-16"
      >
        <motion.p
          variants={fadeUp}
          className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-orange"
        >
          Touchdown — Systems Atlas
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mt-4 max-w-4xl text-[clamp(2.75rem,7vw,5.75rem)] font-[1000] leading-[0.9] tracking-[-0.03em] [text-wrap:balance]"
        >
          Out of the orbit, onto the map.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          The cinema sets the world; the atlas holds the proof. Flagship systems, real builds,
          and route notes — surveyed in daylight.
        </motion.p>
      </motion.div>
    </section>
  );
}

function Chapters() {
  return (
    <section id="chapters" className="relative mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28 lg:px-16">
      <SectionHeading
        eyebrow="Artifact chapters"
        title="Three systems, three routes."
        description="The flagships from the cinema, opened as surveyed plates — what they are, what they can do, and where to inspect them."
      />
      <div className="flex flex-col gap-20 md:gap-28">
        {systems.map((system, i) => (
          <ArtifactChapter key={system.id} system={system} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

/* Axiom-style pinned horizontal traverse: observed builds as specimen cards.
 * Desktop scrubs the track sideways; mobile and reduced motion stack it. */
function SpecimenGallery() {
  const wrap = useRef(null);
  const track = useRef(null);
  const desktopMotion = useDesktopMotion();

  useLayoutEffect(() => {
    if (!desktopMotion || !wrap.current || !track.current) return undefined;

    const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth);
    const ctx = gsap.context(() => {
      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.35,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [desktopMotion]);

  const specimens = [
    ...builds.map((b, i) => ({
      tag: `Build-${String(i + 1).padStart(2, "0")}`,
      accent: b.accent,
      title: b.title,
      body: b.description,
      meta: b.stack,
      image: b.image,
      link: b.link,
    })),
    ...schoolWebsites.map((s, i) => ({
      tag: `Web-${String(i + 1).padStart(2, "0")}`,
      accent: "yellow",
      title: s.title,
      body: null,
      meta: ["Early interactive", "Static site"],
      image: s.image,
      link: s.link,
    })),
  ];

  return (
    <section id="builds" ref={wrap} className="relative overflow-hidden bg-mist">
      <div
        ref={track}
        className={`flex flex-col gap-6 px-5 py-20 md:min-h-screen md:w-max md:flex-row md:items-center md:gap-8 md:px-16 md:py-0 ${
          desktopMotion ? "will-change-transform" : ""
        }`}
      >
        <div className="md:w-[34rem] md:shrink-0 md:pr-8">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-blue">
            Observed builds
          </p>
          <h2 className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-[1000] leading-[0.9] tracking-[-0.03em]">
            Specimens from the field.
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
            Smaller systems and early experiments, pinned like survey samples — each one real,
            linked, and inspectable.
          </p>
          <p
            aria-hidden="true"
            className="mt-8 hidden font-mono text-xs font-bold uppercase tracking-[0.24em] text-ink/40 md:block"
          >
            Scroll to traverse →
          </p>
        </div>

        {specimens.map((sp) => (
          <a
            key={sp.tag}
            href={sp.link}
            target="_blank"
            rel="noreferrer"
            className="group relative block shrink-0 border border-ink/10 bg-white/80 shadow-[0_18px_60px_rgba(16,32,27,0.08)] transition duration-300 hover:-translate-y-1 hover:border-ink/25 md:w-[24rem]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={sp.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute left-3 top-3 border border-ink/10 bg-paper px-2 py-1 font-mono text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink">
                {sp.tag}
              </span>
            </div>
            <div className="p-5">
              <span className="flex items-center gap-2 font-mono text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink/45">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: accentHex[sp.accent] }}
                />
                Field specimen
              </span>
              <h3 className="mt-3 text-xl font-black leading-tight">{sp.title}</h3>
              {sp.body && <p className="mt-3 text-sm leading-relaxed text-muted">{sp.body}</p>}
              <ul className="mt-4 flex flex-wrap gap-2">
                {sp.meta.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-ink/10 bg-white/70 px-2.5 py-1 font-mono text-[0.66rem] text-ink"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function ProcessColumns() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28 lg:px-16">
      <SectionHeading
        eyebrow="How it gets built"
        title="One route, five stations."
      />
      <motion.ol
        variants={staggerContainer}
        {...inView}
        className="grid gap-10 md:grid-cols-5 md:gap-0 md:divide-x md:divide-ink/10 md:border-x md:border-ink/10"
      >
        {processSteps.map((step) => (
          <motion.li key={step.step} variants={fadeUp} className="md:px-6">
            <p className="font-mono text-xs font-bold text-ink/40">{step.step}</p>
            <h3 className="mt-4 text-2xl font-black">{step.title}</h3>
            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-muted">{step.description}</p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}

function NowAndTrajectory() {
  return (
    <section id="now" className="route-texture relative bg-mist">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28 lg:px-16">
        <SectionHeading
          eyebrow="Living layer"
          title="Building now."
        />
        <motion.div variants={staggerContainer} {...inView} className="grid gap-6 md:grid-cols-3">
          {nowBuilding.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className="border-t-2 pt-5"
              style={{ borderColor: accentHex[item.accent] }}
            >
              <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink/45">
                {item.tag}
              </p>
              <h3 className="mt-3 text-xl font-black leading-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.note}</p>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-24 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="Trajectory" title="Where the route has run." />
          <motion.div variants={staggerContainer} {...inView} className="divide-y divide-ink/10 border-y border-ink/10">
            {experiences.map((item) => (
              <motion.article
                key={`${item.company}-${item.role}`}
                variants={fadeUp}
                className="grid gap-3 py-6 md:grid-cols-[11rem_1fr]"
              >
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink/45">{item.period}</p>
                <div>
                  <h3 className="font-bold">
                    {item.role}, {item.company}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28 lg:px-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Build the next system."
            description="Reach out directly, follow the work, or grab the resume."
          />
          <div className="flex flex-wrap gap-3">
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
                className="border border-ink/15 bg-ink px-5 py-3 text-sm font-bold text-paper transition duration-300 hover:-translate-y-0.5 hover:bg-blue"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <form
          action={socials.formspree}
          method="POST"
          className="border border-ink/10 bg-white/70 p-6 shadow-[0_18px_60px_rgba(16,32,27,0.08)] md:p-8"
        >
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink/45">
            Send a message
          </p>
          <div className="mt-6 grid gap-5">
            <label className="grid gap-2 text-sm font-bold">
              Name
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                className="border border-ink/15 bg-white px-4 py-3 font-normal text-ink placeholder:text-ink/60 focus:outline-none focus-visible:outline-2 focus-visible:outline-blue"
                placeholder="Your name"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Email
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                className="border border-ink/15 bg-white px-4 py-3 font-normal text-ink placeholder:text-ink/60 focus:outline-none focus-visible:outline-2 focus-visible:outline-blue"
                placeholder="you@example.com"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Message
              <textarea
                name="message"
                required
                rows={5}
                className="resize-y border border-ink/15 bg-white px-4 py-3 font-normal text-ink placeholder:text-ink/60 focus:outline-none focus-visible:outline-2 focus-visible:outline-blue"
                placeholder="What should we build?"
              />
            </label>
            <button
              type="submit"
              className="justify-self-start border border-ink/15 bg-ink px-6 py-3 text-sm font-bold text-paper transition duration-300 hover:-translate-y-0.5 hover:bg-blue"
            >
              Send it
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

/* Thin dark strip bookending the cinema — the route ends where it began. */
function DarkCoda() {
  return (
    <footer className="bg-[var(--cinema-bg)] px-5 py-10 text-white md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.24em] text-[rgba(246,242,232,.5)]">
          End of route — Orbital Foundry → Systems Atlas
        </p>
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[rgba(246,242,232,.4)]">
          © {new Date().getFullYear()} Michael Tommaso
        </p>
      </div>
    </footer>
  );
}
