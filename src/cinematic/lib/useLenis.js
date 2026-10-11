import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

/* Smooth-scroll layer for the cinematic experience, driven on GSAP's ticker
 * so Lenis and ScrollTrigger stay in lockstep (no double rAF, no drift).
 * Disabled entirely under prefers-reduced-motion — native scroll takes over.
 * Returns a ref holding the Lenis instance (null when disabled) so UI like
 * the progress rail can drive eased scrollTo jumps. */
export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Native CSS smooth-scroll fights Lenis — hand control to Lenis.
    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4), // ease-out-quart: decisive, no tail wobble
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    lenisRef.current = lenis;

    const onRaf = (time) => lenis.raf(time * 1000); // gsap ticker is in seconds
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      lenisRef.current = null;
      html.style.scrollBehavior = prevScrollBehavior;
    };
  }, []);

  return lenisRef;
}
