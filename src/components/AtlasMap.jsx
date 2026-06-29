import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValue,
} from "motion/react";
import { atlasNodes, atlasRoutes, accentHex } from "../data/portfolioData";

const nodeById = Object.fromEntries(atlasNodes.map((n) => [n.id, n]));

/* Cubic bezier between two nodes with a perpendicular bow for character. */
function routePath(from, to, curve) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = (-dy / len) * curve;
  const ny = (dx / len) * curve;
  return `M ${from.x} ${from.y} C ${mx + nx} ${my + ny}, ${mx + nx} ${my + ny}, ${to.x} ${to.y}`;
}

export default function AtlasMap() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Gentle scroll parallax + fade as the hero leaves the viewport.
  const gridShift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const mapY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  // Pointer parallax (desktop, motion-friendly only).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });

  function handlePointer(e) {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set(((e.clientX - rect.left) / rect.width - 0.5) * 18);
    py.set(((e.clientY - rect.top) / rect.height - 0.5) * 14);
  }

  function resetPointer() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointer}
      onPointerLeave={resetPointer}
      className="relative w-full overflow-hidden rounded-[36px] border border-ink/10 bg-paper/70 shadow-[0_38px_110px_rgba(16,32,27,0.14)]"
    >
      {/* Map grid */}
      <motion.div
        className="atlas-grid pointer-events-none absolute inset-0"
        style={{ x: gridShift, y: gridShift }}
        aria-hidden="true"
      />

      <div className="relative aspect-[4/5] w-full sm:aspect-[16/10]">
        {/* Routes */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {atlasRoutes.map((route, i) => {
            const from = nodeById[route.from];
            const to = nodeById[route.to];
            return (
              <motion.path
                key={route.id}
                d={routePath(from, to, route.curve)}
                fill="none"
                stroke={accentHex[route.accent]}
                strokeWidth={2}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ opacity: 0.7 }}
                initial={{ pathLength: 1 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.25 }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        <motion.div className="absolute inset-0" style={{ x: sx, y: sy }}>
          {atlasNodes.map((node, i) => (
            <motion.article
              key={node.id}
              className="group absolute w-[200px] max-w-[64vw] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%`, y: mapY }}
              initial={false}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.15 }}
            >
              <div className="rounded-3xl border border-ink/10 bg-white/75 p-4 shadow-[0_22px_60px_rgba(16,32,27,0.14)] backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1">
                <span
                  className="block h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: accentHex[node.accent],
                    boxShadow: `0 0 0 7px ${accentHex[node.accent]}22`,
                  }}
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink">{node.label}</h3>
                <p className="mt-1 text-sm leading-snug text-muted">{node.blurb}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* Legend */}
      <div className="pointer-events-none absolute bottom-4 left-4 hidden flex-wrap gap-2 sm:flex">
        {["idea → system", "intent → workflow", "agent → artifact"].map((t) => (
          <span
            key={t}
            className="rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
