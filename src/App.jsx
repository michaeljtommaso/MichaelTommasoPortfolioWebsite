import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroAtlas from "./sections/HeroAtlas";
import Chapters from "./sections/Chapters";
import SelectedBuilds from "./sections/SelectedBuilds";
import Process from "./sections/Process";
import LivingLayer from "./sections/LivingLayer";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <div id="top" className="relative min-h-screen text-ink">
      <a
        href="#chapters"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-paper"
      >
        Skip to content
      </a>

      <Navbar />
      <main>
        <HeroAtlas />
        <Chapters />
        <SelectedBuilds />
        <Process />
        <LivingLayer />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
