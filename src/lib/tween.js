/* Frame-by-frame transform tweens on the main thread, for the project-view dive.
 * ponytail: deliberately not WAAPI/CSS animations for the big zooming layers. Chrome rasterizes a
 * compositor-animated layer at the largest scale it will reach, from the first frame, so the ~3700px
 * horizon ball was drawn in full while still a dot, and the tiles visibly filled in as squares. A
 * transform written each frame is rasterized at its on-screen scale, like the scroll camera. */

/* CSS cubic-bezier(x1, y1, x2, y2) as an easing function t -> eased t. */
export function bezier(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const X = (t) => ((ax * t + bx) * t + cx) * t;
  const Y = (t) => ((ay * t + by) * t + cy) * t;
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0, hi = 1, t = x;
    for (let i = 0; i < 40; i++) { // bisection: X is monotonic for valid CSS beziers
      if (X(t) < x) lo = t; else hi = t;
      t = (lo + hi) / 2;
    }
    return Y(t);
  };
}

const jobs = new WeakMap();

/* Tween el.style.transform = fmt(...values) from `from` to `to` (arrays of numbers). */
export function tween(el, fmt, from, to, { duration, delay = 0, easing = (t) => t, onDone } = {}) {
  stopTween(el);
  const start = performance.now() + delay;
  const job = { raf: 0 };
  if (!delay) el.style.transform = fmt(...from);
  const step = (now) => {
    const k = Math.min(1, (now - start) / duration);
    if (k >= 0) {
      const e = easing(k);
      el.style.transform = fmt(...from.map((a, i) => a + (to[i] - a) * e));
    }
    if (k < 1) job.raf = requestAnimationFrame(step);
    else { jobs.delete(el); onDone?.(); }
  };
  job.raf = requestAnimationFrame(step);
  jobs.set(el, job);
}

export function stopTween(el) {
  const job = el && jobs.get(el);
  if (job) { cancelAnimationFrame(job.raf); jobs.delete(el); }
}
