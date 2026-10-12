import { useEffect } from "react";
import { mountCine } from "./lib/cine";
import Header from "./components/Header";
import Universe from "./components/Universe";
import Contact from "./components/Contact";
import ProjectView from "./components/ProjectView";

export default function App() {
  useEffect(() => mountCine(), []);

  return (
    <div id="top">
      <Header />
      <main>
        <Universe />
        <Contact />
      </main>
      <ProjectView />
    </div>
  );
}
