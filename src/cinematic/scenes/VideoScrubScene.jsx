import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { useDesktopMotion } from "../lib/useDesktopMotion";

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

export default function VideoScrubScene({ scene, index, sceneCount }) {
  const root = useRef(null);
  const mediaWrap = useRef(null);
  const video = useRef(null);
  const overlay = useRef(null);
  const veil = useRef(null);
  const desktopMotion = useDesktopMotion();
  const shouldRenderVideo = desktopMotion;
  const isFirst = index === 0;
  const isLast = index === sceneCount - 1;

  /* Bring the full clip into the buffer once the scene is within a viewport
   * of entering — scrubbing needs every frame available, not just metadata. */
  useEffect(() => {
    if (!shouldRenderVideo || !root.current || scene.preload) return undefined;

    const el = root.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && video.current) {
          // Bump the buffering hint only — load() would abort in-flight seeks.
          video.current.preload = "auto";
          io.disconnect();
        }
      },
      { rootMargin: "120% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldRenderVideo, scene.preload]);

  useLayoutEffect(() => {
    if (!desktopMotion || !shouldRenderVideo || !video.current) return undefined;

    const videoEl = video.current;
    let ctx;
    let removeSeekListeners;

    const setup = () => {
      const duration = videoEl.duration || 1;
      const isHero = scene.tone === "hero";
      const usableDuration = Math.max(0.1, duration - 0.12);
      const scrubSmoothing = scene.scrubSmoothing ?? 0.45;
      const scrollRunway = () => `+=${Math.round(window.innerHeight * (scene.scrubVh ?? 3.8))}`;

      /* Seek gate: only one in-flight seek at a time. Firing currentTime on
       * every scroll tick outruns the decoder and stutters; instead we chase
       * the latest target each time the previous seek lands. */
      let targetTime = 0;
      let seekBusy = false;
      let seekIssuedAt = 0;
      const applySeek = () => {
        // A seek can be silently dropped (source reload, slow range fetch);
        // treat a >250ms stall as lost and re-issue rather than jamming.
        if (seekBusy && performance.now() - seekIssuedAt < 250) return;
        if (Math.abs(videoEl.currentTime - targetTime) < 1 / 60) return;
        seekBusy = true;
        seekIssuedAt = performance.now();
        videoEl.currentTime = targetTime;
      };
      const onSeeked = () => {
        seekBusy = false;
        applySeek();
      };
      videoEl.addEventListener("seeked", onSeeked);
      removeSeekListeners = () => videoEl.removeEventListener("seeked", onSeeked);

      /* Dip-to-black handoffs, without a black tunnel: the exiting scene dips
       * over its last stretch of runway, while the entering scene fades in
       * during the approach — so darkness is a beat, not a dead viewport. */
      const exitVeilFor = (p) => Math.min(1, Math.max(0, (p - (isLast ? 0.95 : 0.93)) / 0.07));

      ctx = gsap.context(() => {
        gsap.set(overlay.current, isHero ? { autoAlpha: 1, y: 0 } : { autoAlpha: 0, y: 36 });
        gsap.set(veil.current, { opacity: isFirst ? 0 : 1 });

        if (!isFirst) {
          gsap.fromTo(
            veil.current,
            { opacity: 1 },
            {
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top 80%",
                end: "top top",
                scrub: true,
              },
            }
          );
        }

        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: scrollRunway,
          scrub: scrubSmoothing,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            targetTime = Math.min(duration - 0.05, Math.max(0, self.progress * usableDuration));
            applySeek();
            const exitOpacity = exitVeilFor(self.progress);
            if (exitOpacity > 0 || self.progress > 0.5) {
              gsap.set(veil.current, { opacity: exitOpacity });
            }
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
              end: `+=${Math.round(window.innerHeight * 0.45)}`,
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
      removeSeekListeners?.();
      ctx?.revert();
    };
  }, [desktopMotion, isFirst, isLast, scene.mediaScale, scene.revealAt, scene.scrubSmoothing, scene.scrubVh, scene.tone, shouldRenderVideo]);

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
        desktopMotion ? { minHeight: `calc(100dvh + ${(scene.scrubVh ?? 3.8) * 100}vh)` } : undefined
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

        {/* Localized readability gradients only — the footage stays visible. */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,transparent_0,rgba(0,0,0,0.05)_44%,rgba(0,0,0,0.34)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/18" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,var(--cinema-glow),transparent_34rem)]" />

        <div
          ref={overlay}
          className={`relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pb-16 pt-24 md:px-10 md:pb-20 lg:px-16 ${alignClass}`}
        >
          <div className={`${panelClass} cinematic-overlay border-l border-[var(--cinema-line)] bg-black/25 py-4 pl-5 pr-4 backdrop-blur-[2px] md:pl-7 md:pr-6`}>
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[rgba(246,242,232,.6)]">
              {String(index + 1).padStart(2, "0")} / {scene.stage}
            </p>
            <p className="mt-4 text-sm font-semibold text-[var(--cinema-muted)]">{scene.eyebrow}</p>
            <h2 className="mt-3 text-[clamp(2.5rem,7vw,6rem)] font-[1000] leading-[0.9] text-[var(--cinema-ink)] [text-shadow:0_2px_28px_rgba(0,0,0,0.55)] [text-wrap:balance]">
              {scene.title}
            </h2>
            <p className="mt-4 max-w-2xl text-xl font-semibold leading-tight text-[rgba(246,242,232,.9)] md:text-2xl">
              {scene.subtitle}
            </p>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-[rgba(246,242,232,.8)] md:text-lg">
              {scene.description}
            </p>

            {scene.stats?.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${scene.title} highlights`}>
                {scene.stats.map((stat) => (
                  <li
                    key={stat}
                    className="border border-[var(--cinema-line)] bg-black/30 px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[rgba(246,242,232,.78)]"
                  >
                    {stat}
                  </li>
                ))}
              </ul>
            )}

            <SceneLinks links={scene.links} />
          </div>
        </div>

        {/* Scene handoff veil — driven by scroll progress, dips through black. */}
        <div ref={veil} className="pointer-events-none absolute inset-0 z-20 bg-black opacity-0" />
      </div>
    </section>
  );
}
