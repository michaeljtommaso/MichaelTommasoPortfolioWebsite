import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <div className="relative bg-background text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent-primary/20 blur-[120px]" />
        <div className="absolute top-[40%] right-0 h-[400px] w-[400px] rounded-full bg-accent-secondary/20 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <ScrollProgress />
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}