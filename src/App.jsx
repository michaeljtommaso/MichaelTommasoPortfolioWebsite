import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import Work from "./sections/Work";
import Projects from "./sections/Projects";
import MoreWork from "./sections/MoreWork";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <div id="top" className="relative min-h-screen text-ink">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-paper"
      >
        Skip to content
      </a>

      <Navbar />
      <main>
        <Hero />
        <Work />
        <Projects />
        <MoreWork />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
