import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

/* Smooth-scroll layer for the cinematic experience, driven on GSAP's ticker
 * so Lenis and ScrollTrigger stay in lockstep (no double rAF, no drift).
 * Disabled entirely under prefers-reduced-motion — native scroll takes over. */
export function useLenis() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Native CSS smooth-scroll fights Lenis — hand control to Lenis.
    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const onRaf = (time) => lenis.raf(time * 1000); // gsap ticker is in seconds
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      html.style.scrollBehavior = prevScrollBehavior;
    };
  }, []);
}
