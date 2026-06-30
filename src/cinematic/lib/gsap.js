/* Single registration point for GSAP + ScrollTrigger.
 * Import gsap/ScrollTrigger from here everywhere so the plugin is registered once. */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
