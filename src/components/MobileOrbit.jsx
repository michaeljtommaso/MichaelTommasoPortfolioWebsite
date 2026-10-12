import { useEffect, useRef, useState } from "react";
import { css, MONO } from "../lib/css";
import { hero, socials, experiences, education, schoolWebsites } from "../data/portfolioData";
import { ORDER, PLANETS, PROJ } from "../data/orbit";
import moonImg from "../assets/ai/moon-sm.webp";
import sunImg from "../assets/ai/sun.webp";
import galaxyImg from "../assets/ai/galaxy-sm.webp";

/* Orbit Lite: the phone version. Same universe, art and copy as the desktop scene,
 * told as a vertical story with native scroll (no scroll-scrubbed camera, which
 * fights mobile address bars and momentum scrolling). Motion is GPU-only: planets
 * turn via a CSS map slide, sections fade in once. Project pages are the shared
 * ProjectView, opened by any [data-open] element. */

const KICK = `margin:0;${MONO}font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#e8a33d`;
const LABEL = `${MONO}font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#8a877f`;
const BODY = "margin:0;font-size:15px;line-height:1.55;color:#b5b1a8;text-wrap:pretty";
const BTN = `display:inline-flex;align-items:center;gap:10px;padding:13px 18px;border:1px solid rgba(236,232,225,.3);background:rgba(7,8,10,.4);color:#ece8e1;${MONO}font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer`;
const SECTION = "position:relative;padding:14vh 6vw 8vh;content-visibility:auto;contain-intrinsic-size:auto 900px";

const spinOf = Object.fromEntries(PLANETS.map((p) => [p.id, p.spin]));

/* A planet disk whose surface map slides on the GPU (two tiles, one tile per turn). */
function PlanetDisk({ id, size }) {
  const d = PROJ[id];
  const spin = spinOf[id];
  return (
    // Tapping the planet opens the project too; the "Enter orbit" button is the accessible control.
    <div data-open={id} aria-hidden="true" style={css(`position:relative;width:${size};aspect-ratio:1;margin:0 auto;cursor:pointer`)}>
      {id === "guitar" && <div style={css("position:absolute;left:-28%;top:38%;width:156%;height:24%;border-radius:50%;border:2px solid rgba(234,209,160,.38);transform:rotate(-16deg)")} />}
      <div style={{ ...css("position:absolute;inset:0;border-radius:50%;overflow:hidden;box-shadow:0 0 8vw rgba(232,163,61,.12)"), background: d.base }}>
        <div
          className="m-surface"
          style={{ backgroundImage: `url(${d.map})`, animationDuration: `${Math.round(86400 / Math.abs(spin))}s`, animationDirection: spin < 0 ? "reverse" : "normal" }}
        />
        <div style={css("position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 34% 28%,rgba(255,255,255,.16) 0,transparent 30%),radial-gradient(circle at 36% 30%,transparent 44%,rgba(7,8,10,.9) 80%)")} />
      </div>
    </div>
  );
}

function Stop({ id, chapter }) {
  const d = PROJ[id];
  const builds = id === "earlier" ? d.builds : null;
  return (
    <section id={id === "mccallos" ? "work" : undefined} style={css(SECTION)}>
      {chapter && <p data-rv="" style={css(`${LABEL};text-align:center;margin:0 0 6vh`)}>{chapter}</p>}
      <div data-rv="">
        <PlanetDisk id={id} size={id === "mccallos" ? "min(72vw,320px)" : "min(56vw,250px)"} />
      </div>
      <div data-rv="" style={css("display:flex;flex-direction:column;gap:16px;margin-top:6vh")}>
        <p style={css(KICK)}>{d.kicker}</p>
        <h2 style={css("margin:0;font-size:clamp(34px,10vw,48px);font-weight:700;font-stretch:112%;line-height:.95;letter-spacing:-.02em;overflow-wrap:anywhere")}>{d.name}</h2>
        {d.problem && <p style={css("margin:0;font-size:17px;line-height:1.5;color:#ece8e1;text-wrap:pretty")}>{d.problem}</p>}
        {!builds &&
          d.blocks.map((b) => (
            <div key={b.label} style={css("display:flex;flex-direction:column;gap:6px")}>
              <span style={css(LABEL)}>{b.label}</span>
              <p style={css(BODY)}>{b.text}</p>
            </div>
          ))}
        {builds &&
          builds.map((b) => (
            <div key={b.title} style={css("display:flex;flex-direction:column;gap:6px")}>
              <span style={css("font-size:19px;font-weight:600;font-stretch:110%")}>{b.title}</span>
              <a href={b.link} target="_blank" rel="noreferrer" style={css(`${MONO}font-size:11px;color:#e8a33d`)}>{b.linkLabel} ↗</a>
              <p style={css(BODY)}>{b.description}</p>
            </div>
          ))}
        <div style={css(`display:flex;flex-direction:column;gap:10px;padding-top:14px;border-top:1px solid rgba(236,232,225,.14);${MONO}font-size:11px;letter-spacing:.06em;color:#8a877f`)}>
          <span>{d.stack.join(" / ")}</span>
          {d.status && (
            <span style={css("display:flex;align-items:center;gap:8px;color:#ece8e1")}>
              <span style={css("width:6px;height:6px;border-radius:50%;background:#e8a33d")} />
              {d.status}
            </span>
          )}
          {(d.statusNote || d.note) && <span>{d.statusNote || d.note}</span>}
          {!builds && d.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer" style={{ color: "#ece8e1" }}>{l.label} →</a>)}
          {builds && (
            <span style={css("display:flex;flex-wrap:wrap;gap:8px 16px")}>
              <span style={{ color: "#8a877f" }}>High school websites:</span>
              {schoolWebsites.map((w) => <a key={w.title} href={w.link} target="_blank" rel="noreferrer" style={{ color: "#ece8e1" }}>{w.title}</a>)}
            </span>
          )}
          {d.contact && <span>{d.contact.label}: <a href={`mailto:${d.contact.email}`} style={{ color: "#ece8e1" }}>{d.contact.email}</a></span>}
        </div>
        <div><button data-open={id} className="btn-ghost" style={css(BTN)}>Enter orbit ↗</button></div>
      </div>
    </section>
  );
}

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function MobileHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header style={css(`position:fixed;top:0;left:0;right:0;z-index:100;${MONO}font-size:11px;letter-spacing:.16em;text-transform:uppercase;background:linear-gradient(#07080a 55%,rgba(7,8,10,0))`)}>
      <div style={css("display:flex;align-items:center;justify-content:space-between;padding:18px 6vw")}>
        <a href="#top" onClick={() => setOpen(false)} style={{ fontWeight: 500 }}>Michael Tommaso</a>
        <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="m-menu" style={css("padding:8px 0;border:0;background:none;color:#ece8e1;font:inherit;letter-spacing:inherit;text-transform:inherit;cursor:pointer")}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="m-menu" style={css("display:flex;flex-direction:column;gap:22px;padding:8px 6vw 28px;background:#07080a;border-bottom:1px solid rgba(236,232,225,.14)")}>
          {LINKS.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
          <a href={socials.resume} target="_blank" rel="noreferrer">Résumé ↗</a>
        </nav>
      )}
    </header>
  );
}

/* Fade each [data-rv] in the first time it enters the viewport. */
function useReveal(ref) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("rv-in"); io.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    ref.current.querySelectorAll("[data-rv]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ref]);
}

export default function MobileOrbit({ children }) {
  const root = useRef();
  useReveal(root);
  return (
    <div ref={root} className="m-orbit">
      <MobileHeader />
      <main>
        {/* Moon intro */}
        <section style={css("position:relative;min-height:100svh;overflow:hidden;display:flex;flex-direction:column;justify-content:center;gap:22px;padding:18vh 6vw 46vw")}>
          <div aria-hidden="true" style={css("position:absolute;left:50%;bottom:-90vw;width:150vw;aspect-ratio:1;margin-left:-75vw;border-radius:50%;overflow:hidden;background:#55534e;box-shadow:0 -2vw 20vw rgba(232,163,61,.14)")}>
            <div className="m-moon" style={{ backgroundImage: `url(${moonImg})` }} />
            <div style={css("position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 50% 2%,rgba(255,252,245,.5) 0,rgba(236,232,225,.14) 18%,transparent 42%),radial-gradient(circle at 50% 16%,transparent 40%,rgba(7,8,10,.8) 76%)")} />
          </div>
          <p style={css(`${KICK};position:relative`)}>{hero.kicker}</p>
          <h1 style={css("position:relative;margin:0;font-size:clamp(38px,11vw,54px);font-weight:600;font-stretch:112%;line-height:.96;letter-spacing:-.03em;text-wrap:balance")}>{hero.headline}</h1>
          <p style={css(`${BODY};position:relative`)}>{hero.sub}</p>
          <div style={css(`position:relative;display:flex;flex-wrap:wrap;gap:10px;${MONO}font-size:12px;letter-spacing:.12em;text-transform:uppercase`)}>
            <a href="#work" className="btn-solid" style={css("padding:14px 20px;background:#ece8e1;color:#07080a")}>See my work</a>
            <a href={socials.resume} target="_blank" rel="noreferrer" className="btn-ghost" style={css("padding:14px 20px;border:1px solid rgba(236,232,225,.3)")}>Résumé</a>
          </div>
        </section>

        {/* Earth, then the sun divider, then the rest of the system in orbit order */}
        <Stop id="mccallos" chapter="Earth · McCallos" />
        <section id="projects" style={css("padding:10vh 6vw 0;text-align:center")}>
          <div data-rv="" style={css("position:relative;width:min(34vw,150px);aspect-ratio:1;margin:0 auto;border-radius:50%;overflow:hidden;box-shadow:0 0 14vw rgba(232,163,61,.45)")}>
            <div className="m-moon" style={{ backgroundImage: `url(${sunImg})`, animationDuration: "160s" }} />
          </div>
          <p data-rv="" style={css(`${LABEL};margin:5vh 0 0`)}>Sol · Work &amp; projects</p>
        </section>
        {ORDER.filter((id) => id !== "mccallos").map((id) => <Stop key={id} id={id} />)}

        {/* Milky Way: experience timeline + education */}
        <section id="experience" style={css(SECTION + ";overflow:hidden;padding-top:8vh")}>
          {/* Squashed to read as tilted; negative margins give back the height the scale removes. */}
          <img data-rv="" src={galaxyImg} alt="" style={css("display:block;width:120vw;max-width:none;margin:-27vw -10vw -20vw;transform:scaleY(.55);opacity:.8")} />
          <p data-rv="" style={css(KICK)}>Experience</p>
          <h2 data-rv="" style={css("margin:12px 0 5vh;font-size:clamp(32px,9vw,44px);font-weight:600;font-stretch:118%;letter-spacing:-.02em")}>Where I've worked.</h2>
          <ol style={css("list-style:none;margin:0;padding:0 0 0 20px;border-left:1px solid rgba(236,232,225,.16);display:flex;flex-direction:column;gap:32px")}>
            {experiences.map((e, i) => (
              <li key={e.role + e.company} data-rv="" style={css("position:relative;display:flex;flex-direction:column;gap:6px")}>
                <span style={css(`position:absolute;left:-25px;top:4px;width:9px;height:9px;border-radius:50%;background:${i === 0 ? "#e8a33d" : "#ece8e1"}`)} />
                <span style={css(`${MONO}font-size:11px;letter-spacing:.14em;color:#8a877f`)}>{e.period.toUpperCase()}</span>
                <span style={css("font-size:20px;font-weight:600;font-stretch:110%")}>{e.role}</span>
                <span style={css("font-size:15px;color:#b5b1a8")}>{e.company}</span>
                {e.description && <span style={css("font-size:14px;line-height:1.55;color:#8a877f")}>{e.description}</span>}
              </li>
            ))}
          </ol>
          <div data-rv="" style={css("display:flex;flex-direction:column;gap:8px;margin-top:8vh;padding-top:28px;border-top:1px solid rgba(236,232,225,.16);font-size:14px;line-height:1.7;color:#b5b1a8")}>
            <span style={css(`${KICK};margin-bottom:8px`)}>Education</span>
            <span style={css("font-size:26px;font-weight:700;font-stretch:118%;letter-spacing:-.02em;color:#ece8e1")}>{education.school}</span>
            <span style={{ fontSize: 16 }}>{education.degree}</span>
            <span style={{ color: "#8a877f" }}>{education.college} · {education.expected} · GPA {education.gpa}</span>
            <span style={css(`${LABEL};margin-top:14px`)}>Coursework</span>
            {education.coursework.map((c) => <span key={c}>{c}</span>)}
            <span style={css(`${LABEL};margin-top:14px`)}>Activities</span>
            {education.activities.map((a) => <span key={a}>{a}</span>)}
          </div>
        </section>

        {children /* shared Contact */}
      </main>
    </div>
  );
}
