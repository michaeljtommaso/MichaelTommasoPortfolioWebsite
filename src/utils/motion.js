/* Shared animation grammar. Eased, slow, cinematic — never bouncy. */

const ease = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1, ease } },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.85, ease } },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.85, ease } },
};

export const scaleReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease } },
};

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

/* Standard in-view trigger for sections. */
export const inView = {
  // Keep content visible before IntersectionObserver fires so full-page screenshots,
  // no-JS/reduced-motion contexts, and offscreen capture do not render blank gaps.
  initial: false,
  whileInView: "show",
  viewport: { once: true, amount: 0.16 },
};
