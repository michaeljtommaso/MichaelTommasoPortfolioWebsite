import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import coldOpen from "../../assets/cinematic/coldopen.png";

/* Beat 0 — The Hold.
 * A pinned full-bleed cold-open: the warrior surveys the battlefield while scroll
 * drives a slow cinematic push-in and lifts the title away as the campaign begins. */
export default function ColdOpen() {
  const root = useRef(null);
  const image = useRef(null);
  const title = useRef(null);
  const cue = useRef(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // On-load entrance — title resolves out of the dark.
      gsap.from(".coldopen-rise", {
        y: 32,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.14,
        delay: 0.25,
      });
      gsap.fromTo(
        cue.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.4 }
      );
      gsap.to(cue.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: "sine.inOut",
      });

      // Scroll-driven push-in + title lift (scrubbed).
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: true,
        },
      });
      tl.fromTo(image.current, { scale: 1.06 }, { scale: 1.26, ease: "none" }, 0);
      tl.to(title.current, { opacity: 0, y: -48, ease: "none" }, 0.4);
      tl.to(cue.current, { opacity: 0, ease: "none" }, 0.1);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <img
        ref={image}
        src={coldOpen}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />

      {/* Cinematic scrims — keep the title legible over the battlefield */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/45" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      <div
        ref={title}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
      >
        <p className="coldopen-rise font-mono text-xs font-bold uppercase tracking-[0.4em] text-white/70">
          Michael&nbsp;Tommaso
        </p>
        <h1 className="coldopen-rise mt-6 max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] font-[1000] leading-[0.92] tracking-[-0.03em] drop-shadow-[0_2px_30px_rgba(0,0,0,0.6)]">
          A campaign of the
          <br />
          systems I build.
        </h1>
        <p className="coldopen-rise mt-7 max-w-md text-base leading-relaxed text-white/75 md:text-lg">
          Scroll to follow the route — from battlefield to artifact.
        </p>
      </div>

      {/* Scroll cue */}
      <div
        ref={cue}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white/70"
      >
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]">
          Begin
        </span>
        <div aria-hidden="true" className="mt-2 text-lg leading-none">↓</div>
      </div>
    </section>
  );
}
