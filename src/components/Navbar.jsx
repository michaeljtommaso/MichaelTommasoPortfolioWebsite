export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10 border-0">
        <a href="#" className="flex items-center justify-between gap-4">
          <img
            src="/favicon.png"
            alt="Logo"
            className="h-10 w-auto"
          />
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-white/90">Michael Tommaso</p>
        </a>

        <nav className="hidden gap-6 text-sm text-white/80 md:flex font-navbar tracking-[0.08em]">
          <a href="#about" className="transition hover:text-white">About</a>
          <a href="#projects" className="transition hover:text-white">Projects</a>
          <a href="#experience" className="transition hover:text-white">Experience</a>
          <a href="#contact" className="transition hover:text-white">Contact</a>
        </nav>
      </div>
    </header>
  );
}