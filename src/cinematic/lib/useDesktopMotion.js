import { useEffect, useState } from "react";

/* Desktop-with-motion gate shared by the cinematic pieces: scroll-driven
 * media and pinned choreography run only here. Mobile and reduced-motion
 * users get static, fully-visible equivalents. */
export function useDesktopMotion() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const update = () => setEnabled(!reduceQuery.matches && !mobileQuery.matches);
    update();

    reduceQuery.addEventListener("change", update);
    mobileQuery.addEventListener("change", update);

    return () => {
      reduceQuery.removeEventListener("change", update);
      mobileQuery.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}
