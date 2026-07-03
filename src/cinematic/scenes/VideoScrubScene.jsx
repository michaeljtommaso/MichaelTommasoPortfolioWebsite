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
          className="inline-flex min-h-11 items-center border border-white/20 bg-white px-5 text-sm font-bold text-zinc-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-100 focus-visible:outline-cyan-200"
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
  const [nearViewport, setNearViewport] = useState(Boolean(scene.preload));
  const shouldRenderVideo = desktopMotion && nearViewport;

  useEffect(() => {
    if (scene.preload) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -120px 0px" }
    );

    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, [scene.preload]);

  useLayoutEffect(() => {
    if (!desktopMotion || !shouldRenderVideo || !video.current) return undefined;

    const videoEl = video.current;
    let ctx;

    const setup = () => {
      const duration = videoEl.duration || 1;
      const isHero = scene.tone === "hero";

      ctx = gsap.context(() => {
        gsap.set(overlay.current, isHero ? { autoAlpha: 1, y: 0 } : { autoAlpha: 0, y: 36 });

        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: `+=${scene.scrubLength}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            videoEl.currentTime = Math.min(duration - 0.05, Math.max(0, self.progress * duration));
          },
        });

        gsap.to(mediaWrap.current, {
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: `+=${scene.scrubLength}`,
            scrub: true,
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
              end: `+=${Math.round((1 - scene.revealAt) * 450)}`,
              scrub: true,
            },
          });
        }
      }, root);

      ScrollTrigger.refresh();
    };

    if (videoEl.readyState >= 1) {
      setup();
    } else {
      videoEl.addEventListener("loadedmetadata", setup, { once: true });
      videoEl.load();
    }

    return () => {
      videoEl.removeEventListener("loadedmetadata", setup);
      ctx?.revert();
    };
  }, [desktopMotion, scene.revealAt, scene.scrubLength, scene.tone, shouldRenderVideo]);

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
      className="cinematic-scene relative min-h-[100dvh] overflow-hidden bg-zinc-950 text-white"
      data-scene={scene.tone}
    >
      <div ref={mediaWrap} className="absolute inset-0 will-change-transform">
        {shouldRenderVideo ? (
          <video
            ref={video}
            className="h-full w-full object-cover"
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
            loading={scene.preload ? "eager" : "lazy"}
            fetchPriority={scene.preload ? "high" : "auto"}
            decoding="async"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent_0,rgba(0,0,0,0.2)_34%,rgba(0,0,0,0.86)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/75" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/55" />

      <div
        ref={overlay}
        className={`relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pb-14 pt-24 md:px-10 md:pb-16 lg:px-16 ${alignClass}`}
      >
        <div className={`${panelClass} cinematic-overlay border border-white/14 bg-black/40 p-5 backdrop-blur-md md:p-7`}>
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.24em] text-cyan-200">
            {String(index + 1).padStart(2, "0")} / {scene.stage}
          </p>
          <p className="mt-4 text-sm font-semibold text-white/72">{scene.eyebrow}</p>
          <h2 className="mt-3 text-[clamp(2.5rem,7vw,6.8rem)] font-[1000] leading-[0.88] text-white">
            {scene.title}
          </h2>
          <p className="mt-4 max-w-2xl text-xl font-semibold leading-tight text-cyan-100 md:text-2xl">
            {scene.subtitle}
          </p>
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-white/78 md:text-lg">
            {scene.description}
          </p>

          {scene.stats?.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${scene.title} highlights`}>
              {scene.stats.map((stat) => (
                <li
                  key={stat}
                  className="border border-white/14 bg-white/8 px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-white/82"
                >
                  {stat}
                </li>
              ))}
            </ul>
          )}

          <SceneLinks links={scene.links} />
        </div>
      </div>
    </section>
  );
}
