import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { navLinks, socials } from "../data/portfolioData";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-3">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border border-ink/10 bg-paper/70 px-3 py-2 shadow-[0_22px_70px_rgba(16,32,27,0.12)] backdrop-blur-xl md:px-4"
      >
        <a href="#top" className="flex items-center gap-3 pl-1" aria-label="Michael Tommaso — home">
          <span
            className="h-8 w-8 rounded-xl border border-ink/15 shadow-[inset_0_0_0_5px_var(--color-paper)]"
            style={{
              background: `conic-gradient(from ${progress}turn, var(--color-orange), var(--color-blue), var(--color-mint), var(--color-yellow), var(--color-orange))`,
            }}
            aria-hidden="true"
          />
          <span className="text-sm font-extrabold tracking-tight text-ink">
            Michael Tommaso
          </span>
        </a>

        <div className="hidden items-center gap-6 font-mono text-xs uppercase tracking-[0.08em] text-muted md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={socials.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-ink/15 bg-white/60 px-4 py-2 font-mono text-xs font-bold text-ink transition-colors hover:bg-white sm:inline-block"
          >
            Resume
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-white/60 text-ink md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-0.5 w-4 bg-ink transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-4 bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-4 bg-ink transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Scroll progress hairline */}
      <div className="mx-auto mt-2 h-0.5 w-full max-w-5xl overflow-hidden rounded-full">
        <motion.div
          className="h-full origin-left rounded-full bg-gradient-to-r from-orange via-blue to-mint"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 w-full max-w-5xl rounded-3xl border border-ink/10 bg-paper/90 p-4 shadow-xl backdrop-blur-xl md:hidden"
        >
          <div className="grid gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 font-mono text-sm uppercase tracking-[0.08em] text-muted transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
