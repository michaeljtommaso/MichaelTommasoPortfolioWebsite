import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

function useDesktopMotion() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const update = () => setEnabled(!reduceQuery.matches && !mobileQuery.matches);
    update();

    reduceQuery.addEventListener("change", update);
    mobileQuery.addEventListener("change", update);

    return () => {
      reduceQuery.removeEventListener("change", update);
      mobileQuery.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}

function SceneLinks({ links }) {
  if (!links?.length) return null;

  return (
    <div className="mt-7 flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
          className="inline-flex min-h-11 items-center border border-[var(--cinema-line)] bg-[var(--cinema-ink)] px-5 text-sm font-bold text-zinc-950 transition duration-300 hover:-translate-y-0.5 hover:bg-[#dff3ff] focus-visible:outline-cyan-200"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export default function VideoScrubScene({ scene, index }) {
  const root = useRef(null);
  const mediaWrap = useRef(null);
  const video = useRef(null);
  const overlay = useRef(null);
  const desktopMotion = useDesktopMotion();
  const shouldRenderVideo = desktopMotion;

  useLayoutEffect(() => {
    if (!desktopMotion || !shouldRenderVideo || !video.current) return undefined;

    const videoEl = video.current;
    let ctx;

    const setup = () => {
      const duration = videoEl.duration || 1;
      const isHero = scene.tone === "hero";
      const usableDuration = Math.max(0.1, duration - 0.12);
      const scrubSmoothing = scene.scrubSmoothing ?? 0.45;
      const scrollRunway = () => `+=${Math.round(window.innerHeight * (scene.scrubVh ?? 5.6))}`;

      ctx = gsap.context(() => {
        gsap.set(overlay.current, isHero ? { autoAlpha: 1, y: 0 } : { autoAlpha: 0, y: 36 });

        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: scrollRunway,
          scrub: scrubSmoothing,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Full-duration scrub: slowing happens through scroll runway length,
            // not by clamping the clip to the first third.
            videoEl.currentTime = Math.min(
              duration - 0.05,
              Math.max(0, self.progress * usableDuration)
            );
          },
        });

        gsap.to(mediaWrap.current, {
          scale: scene.mediaScale ?? 1.035,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: scrollRunway,
            scrub: scrubSmoothing,
          },
        });

        if (!isHero) {
          gsap.to(overlay.current, {
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root.current,
              start: `${Math.round(scene.revealAt * 100)}% top`,
              end: `+=${Math.round((1 - scene.revealAt) * 520)}`,
              scrub: scrubSmoothing,
            },
          });
        }
      }, root);

      ScrollTrigger.refresh();
    };

    let initialized = false;
    const initWhenReady = () => {
      if (initialized) return;
      if (Number.isFinite(videoEl.duration) && videoEl.duration > 0) {
        initialized = true;
        setup();
        return;
      }
      window.setTimeout(initWhenReady, 100);
    };

    videoEl.addEventListener("loadedmetadata", initWhenReady);
    videoEl.load();
    initWhenReady();

    return () => {
      videoEl.removeEventListener("loadedmetadata", initWhenReady);
      ctx?.revert();
    };
  }, [desktopMotion, scene.mediaScale, scene.revealAt, scene.scrubSmoothing, scene.scrubVh, scene.tone, shouldRenderVideo]);

  const alignClass =
    scene.align === "right"
      ? "items-end text-left"
      : scene.align === "center"
        ? "items-center text-center"
        : "items-start text-left";

  const panelClass =
    scene.align === "center"
      ? "mx-auto max-w-5xl"
      : scene.align === "right"
        ? "ml-auto max-w-xl"
        : "mr-auto max-w-xl";

  return (
    <section
      id={scene.id}
      ref={root}
      className="cinematic-scene relative overflow-visible bg-[var(--cinema-bg)] text-white"
      data-scene={scene.tone}
      style={
        desktopMotion ? { minHeight: `calc(100dvh + ${(scene.scrubVh ?? 5.6) * 100}vh)` } : undefined
      }
    >
      <div className="sticky top-0 min-h-[100dvh] overflow-hidden">
      <div ref={mediaWrap} className="absolute inset-0 will-change-transform">
        {shouldRenderVideo ? (
          <video
            ref={video}
            className="cinematic-video h-full w-full object-cover"
            poster={scene.poster}
            muted
            playsInline
            preload={scene.preload ? "auto" : "metadata"}
            aria-hidden="true"
          >
            <source src={scene.video} type="video/mp4" />
          </video>
        ) : (
          <img
            src={scene.poster}
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority={scene.preload ? "high" : "auto"}
            decoding="async"
            className="cinematic-video h-full w-full object-cover"
          />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,transparent_0,rgba(0,0,0,0.08)_38%,rgba(0,0,0,0.45)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/48 via-black/6 to-black/42" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/62 via-transparent to-black/24" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,var(--cinema-glow),transparent_34rem)]" />

      <div
        ref={overlay}
        className={`relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pb-14 pt-24 md:px-10 md:pb-16 lg:px-16 ${alignClass}`}
      >
        <div className={`${panelClass} cinematic-overlay border-l border-[var(--cinema-line)] bg-black/10 py-2 pl-5 pr-3 backdrop-blur-[1px] md:pl-7`}>
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[var(--cinema-faint)]">
            {String(index + 1).padStart(2, "0")} / {scene.stage}
          </p>
          <p className="mt-4 text-sm font-semibold text-[var(--cinema-muted)]">{scene.eyebrow}</p>
          <h2 className="mt-3 text-[clamp(2.5rem,7vw,6.8rem)] font-[1000] leading-[0.88] text-[var(--cinema-ink)]">
            {scene.title}
          </h2>
          <p className="mt-4 max-w-2xl text-xl font-semibold leading-tight text-[rgba(246,242,232,.88)] md:text-2xl">
            {scene.subtitle}
          </p>
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-[var(--cinema-muted)] md:text-lg">
            {scene.description}
          </p>

          {scene.stats?.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${scene.title} highlights`}>
              {scene.stats.map((stat) => (
                <li
                  key={stat}
                  className="border border-[var(--cinema-line)] bg-black/16 px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--cinema-muted)]"
                >
                  {stat}
                </li>
              ))}
            </ul>
          )}

          <SceneLinks links={scene.links} />
        </div>
      </div>
      </div>
    </section>
  );
}
