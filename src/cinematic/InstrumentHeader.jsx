import { useEffect, useState } from "react";
import { orbitalScenes } from "./data/orbitalScenes";

/* Fixed instrument bar over the whole experience — wordmark, live clock,
 * route readouts, and hard links. Ivory over the dark cinema, ink once the
 * scroll lands in the light atlas world. */
export default function InstrumentHeader() {
  const [clock, setClock] = useState("");
  const [scene, setScene] = useState(0);
  const [inAtlas, setInAtlas] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const zone = now
        .toLocaleTimeString(undefined, { timeZoneName: "short" })
        .split(" ")
        .pop();
      setClock(`${zone} ${hh}:${mm}`);
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const marker = window.scrollY + window.innerHeight * 0.5;
      const sections = orbitalScenes
        .map((s) => document.getElementById(s.id))
        .filter(Boolean);
      let idx = 0;
      sections.forEach((el, i) => {
        if (el.offsetTop <= marker) idx = i;
      });
      setScene(idx);
      const atlas = document.getElementById("atlas-world");
      setInAtlas(Boolean(atlas && window.scrollY + 40 >= atlas.offsetTop + window.innerHeight * 0.35));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const tone = inAtlas
    ? { bar: "text-ink", faint: "text-ink/45", strong: "text-ink", line: "border-ink/15" }
    : {
        bar: "text-[var(--cinema-ink)]",
        faint: "text-[rgba(246,242,232,.5)]",
        strong: "text-[var(--cinema-ink)]",
        line: "border-[var(--cinema-line)]",
      };

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${tone.bar}`}
    >
      <div className="flex items-start justify-between gap-4 px-5 py-4 md:px-10 lg:px-16">
        <a href="#cold-open" className="pointer-events-auto text-sm font-black tracking-tight">
          Michael Tommaso
        </a>

        <p className={`hidden font-mono text-[0.66rem] font-bold uppercase tracking-[0.18em] md:block ${tone.faint}`}>
          {clock}
        </p>

        <div className={`hidden font-mono text-[0.66rem] font-bold uppercase tracking-[0.18em] lg:block ${tone.faint}`}>
          <p>
            Route / <span className={tone.strong}>{inAtlas ? "Systems atlas" : "Orbital foundry"}</span>
          </p>
          <p>
            Stage:{" "}
            <span className={tone.strong}>
              {inAtlas ? "Surface" : orbitalScenes[scene]?.stage ?? "—"}
            </span>
          </p>
        </div>

        <nav className="pointer-events-auto flex flex-col items-end gap-0.5 font-mono text-[0.66rem] font-bold uppercase tracking-[0.18em]">
          <a className="transition-opacity hover:opacity-70" href="/resume.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
          <a
            className="transition-opacity hover:opacity-70"
            href="https://github.com/michaeljtommaso"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a className="transition-opacity hover:opacity-70" href="#contact">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
