import { navLinks, socials } from "../data/portfolioData";

export default function Footer() {
  return (
    <footer className="px-4 pb-10 pt-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-extrabold tracking-tight text-ink">Michael Tommaso</p>
          <p className="mt-1 text-sm text-muted">A living map of systems I build.</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.08em] text-muted">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
          <a href={socials.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
            GitHub
          </a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
            LinkedIn
          </a>
        </nav>
      </div>

      <p className="mx-auto mt-6 max-w-6xl text-xs text-muted/80">
        © {new Date().getFullYear()} Michael Tommaso · Built with React, Tailwind, and Motion.
      </p>
    </footer>
  );
}
