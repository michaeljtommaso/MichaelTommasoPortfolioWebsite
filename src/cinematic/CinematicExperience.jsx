import { useLenis } from "./lib/useLenis";
import ColdOpen from "./scenes/ColdOpen";

/* The scroll-cinema shell. Mounts the smooth-scroll layer and sequences the
 * cinematic beats. Beat 0 (Hold) is live; later beats slot in below it. */
export default function CinematicExperience() {
  useLenis();

  return (
    <div className="relative bg-black text-white">
      <ColdOpen />

      {/* Placeholder for Beat 1 — proves pin release + hand-off until the
          first-strike video exists. */}
      <section className="relative flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-center">
        <p className="max-w-md font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
          First strike — the warrior leaps into the battlefield.
          <br />
          <span className="text-zinc-600">(Beat 1 video — next)</span>
        </p>
      </section>
    </div>
  );
}
