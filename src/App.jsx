import { useEffect, useState } from "react";
import { mountCine } from "./lib/cine";
import Header from "./components/Header";
import Universe from "./components/Universe";
import Contact from "./components/Contact";
import ProjectView from "./components/ProjectView";
import MobileOrbit from "./components/MobileOrbit";

/* Phones (and narrow windows) get Orbit Lite: same universe, native vertical scroll. */
const PHONE = "(max-width: 760px)";

function useIsPhone() {
  const [phone, setPhone] = useState(() => matchMedia(PHONE).matches);
  useEffect(() => {
    const mq = matchMedia(PHONE);
    const on = () => setPhone(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return phone;
}

export default function App() {
  const phone = useIsPhone();
  useEffect(() => (phone ? undefined : mountCine()), [phone]);

  return (
    <div id="top">
      {phone ? (
        <MobileOrbit>
          <Contact />
        </MobileOrbit>
      ) : (
        <>
          <Header />
          <main>
            <Universe />
            <Contact />
          </main>
        </>
      )}
      <ProjectView />
    </div>
  );
}
