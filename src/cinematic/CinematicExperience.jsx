import { useEffect, useState } from "react";
import { useLenis } from "./lib/useLenis";
import VideoScrubScene from "./scenes/VideoScrubScene";
import InstrumentHeader from "./InstrumentHeader";
import AtlasWorld from "./AtlasWorld";
import { orbitalScenes } from "./data/orbitalScenes";

export default function CinematicExperience() {
  const lenisRef = useLenis();

  return (
    <main className="relative bg-black text-white">
      <a
        href="#atlas-world"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-black"
      >
        Skip cinematic
      </a>

      <InstrumentHeader />

      {orbitalScenes.map((scene, index) => (
        <VideoScrubScene key={scene.id} scene={scene} index={index} sceneCount={orbitalScenes.length} />
      ))}

      <ProgressRail lenisRef={lenisRef} />

      <AtlasWorld />
    </main>
  );
}

/* Fixed traversal instrument: where you are in the cinema, and a way to jump.
 * Machined squares, mono readout — hidden on mobile where scenes are posters. */
function ProgressRail({ lenisRef }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const marker = window.scrollY + window.innerHeight * 0.5;
      const sections = orbitalScenes
        .map((s) => document.getElementById(s.id))
        .filter(Boolean);
      if (!sections.length) return;
      let idx = 0;
      sections.forEach((el, i) => {
        if (el.offsetTop <= marker) idx = i;
      });
      setActive(idx);
      const last = sections[sections.length - 1];
      setVisible(window.scrollY < last.offsetTop + last.offsetHeight - window.innerHeight * 0.7);
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

  const jump = (i) => {
    const el = document.getElementById(orbitalScenes[i].id);
    if (!el) return;
    // Land past the entry dip, where the footage is already moving.
    const top = i === 0 ? 0 : el.offsetTop + window.innerHeight * 0.9;
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(top, { duration: 1.8 });
    } else {
      window.scrollTo({ top, behavior: "auto" });
    }
  };

  return (
    <nav
      aria-label="Cinematic scenes"
      className={`fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 transition-opacity duration-500 md:flex lg:right-8 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {orbitalScenes.map((scene, i) => (
        <button
          key={scene.id}
          type="button"
          onClick={() => jump(i)}
          aria-label={`Scene ${String(i + 1).padStart(2, "0")}: ${scene.stage}`}
          aria-current={i === active ? "true" : undefined}
          className={`h-2.5 w-2.5 border transition-colors duration-300 ${
            i === active
              ? "border-[var(--cinema-ink)] bg-[var(--cinema-ink)]"
              : i < active
                ? "border-[rgba(246,242,232,.55)] bg-[rgba(246,242,232,.28)]"
                : "border-[rgba(246,242,232,.35)] bg-transparent hover:border-[rgba(246,242,232,.7)]"
          }`}
        />
      ))}
      <p className="mt-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[rgba(246,242,232,.55)] [writing-mode:vertical-rl]">
        {String(active + 1).padStart(2, "0")} / {String(orbitalScenes.length).padStart(2, "0")}
      </p>
    </nav>
  );
}
