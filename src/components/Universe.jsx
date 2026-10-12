import { css, MONO } from "../lib/css";
import { hero, socials, experiences, education, schoolWebsites } from "../data/portfolioData";
import { PLANETS, CARDS, PROJ } from "../data/orbit";
import moonImg from "../assets/ai/moon.webp";
import earthMap from "../assets/ai/earth-map.webp";
import sunImg from "../assets/ai/sun.webp";
import galaxyImg from "../assets/ai/galaxy.webp";

/* The single #universe scene: Moon (intro) → Earth (McCallos) → Sol (one planet
 * per project) → Milky Way (experience). Every data-fx spec is from the handoff. */

const f4 = (n) => +n.toFixed(4);

/* Card element i fades/rises in from t0 + offset, holds, fades out. */
const OFF = [0, 0.0009, 0.0028, 0.0047, 0.0066];
const fade = (c, i, { y = true, ls = false } = {}) => {
  const s = f4(c.t0 + OFF[i]);
  let fx = `opacity ${s}:0 ${f4(s + 0.0113)}:1 ${c.hold}:1 ${c.out}:0`;
  if (y) fx += `; y ${s}:24px ${f4(s + 0.0132)}:0px`;
  if (ls) fx += `; ls ${f4(s - 0.0018)}:.25 ${f4(s + 0.0142)}:-.02 out`;
  return fx;
};

/* Lit-from-the-sun shading for small planets (rotates with the ring). */
const SHADE = "position:absolute;border-radius:50%;background:radial-gradient(circle at 20% 50%,rgba(255,240,215,.18) 0,transparent 26%,transparent 34%,rgba(7,8,10,.86) 74%)";
const MOON_SHADE = "position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 50% 2%,rgba(255,252,245,.5) 0,rgba(236,232,225,.14) 18%,transparent 42%),radial-gradient(circle at 50% 16%,transparent 40%,rgba(7,8,10,.8) 76%)";
const EARTH_SHADE = "position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 34% 28%,rgba(255,255,255,.16) 0,transparent 30%),radial-gradient(circle at 36% 30%,transparent 44%,rgba(7,8,10,.9) 80%)";

/* Moon disk: the Higgsfield still spinning in-plane under a fixed light. */
export function MoonDisk({ spin = "rot 0:0 1:1080 lin" }) {
  return (
    <>
      <div data-fx={spin} style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundImage: `url(${moonImg})`, backgroundSize: "cover" }} />
      <div style={css(MOON_SHADE)} />
    </>
  );
}

/* Planet surface: a 2:1 equirect map scrolls sideways inside the disk, reading as axial spin.
 * turns = full rotations across the scene; h = disk height in vh (one map tile is 2h wide). */
function PlanetSurface({ map, h, turns }) {
  return (
    <div
      data-fx={`bgx 0:0vh 1:${f4(turns * 2 * h)}vh lin`}
      data-wrap={2 * h}
      style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${4 * h}vh`, backgroundImage: `url(${map})`, backgroundSize: "auto 100%", backgroundRepeat: "repeat-x", willChange: "transform" }}
    />
  );
}

function Planet({ p }) {
  const d = PROJ[p.id];
  const [a0, a1] = p.rot;
  const size = `left:-${p.r}vh;top:-${p.r}vh;width:${2 * p.r}vh;height:${2 * p.r}vh;`;
  return (
    <div data-fx={`rot 0.3639:${a0} 0.8015:${a1} lin`} style={{ ...css("position:absolute;left:0;top:0;width:0;height:0"), transform: `rotate(${a0}deg)` }}>
      <div data-fx={p.ring} style={css(`pointer-events:none;position:absolute;left:-${p.R}vh;top:-${p.R}vh;width:${2 * p.R}vh;height:${2 * p.R}vh;border-radius:50%;border:1px solid rgba(236,232,225,.22);opacity:0`)} />
      <div style={css(`position:absolute;left:${p.R}vh;top:0;width:0;height:0`)}>
        <div data-fx={`rot 0.3639:${-a0} 0.8015:${-a1} lin`} style={{ ...css("position:absolute;left:0;top:0;width:0;height:0"), transform: `rotate(${-a0}deg)` }}>
          <div style={css("position:absolute;left:0;top:0;width:0;height:0;transform:scaleY(2.381)")}>
            <div data-open={p.id} data-fx={p.scale} style={css("pointer-events:auto;cursor:pointer;position:absolute;left:0;top:0;width:0;height:0")}>
              {p.rings && (
                <div style={css(`position:absolute;left:-${f4(p.r * 2.4)}vh;top:-${f4(p.r * 0.55)}vh;width:${f4(p.r * 4.8)}vh;height:${f4(p.r * 1.1)}vh;border-radius:50%;border:.18vh solid rgba(234,209,160,.38);transform:rotate(-16deg)`)} />
              )}
              <div data-body={p.id} style={{ ...css(`position:absolute;${size}border-radius:50%;overflow:hidden`), background: d.base }}>
                <PlanetSurface map={d.map} h={2 * p.r} turns={p.spin / 360} />
              </div>
              <div data-fx={`rot 0.3639:${a0} 0.8015:${a1} lin`} style={css(SHADE + ";" + size)} />
            </div>
            <a href="#universe" data-open={p.id} data-fx={p.label} style={css(`pointer-events:auto;cursor:pointer;position:absolute;left:${p.labelLeft}vh;top:-.7em;white-space:nowrap;${MONO}font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#ece8e1;opacity:0`)}>
              {d.name} ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const CARD_WRAP = "position:absolute;left:min(46vw,calc(100vw - 620px));right:4vw;top:11vh;bottom:9vh;display:flex;flex-direction:column;justify-content:safe center;gap:1.7vh;pointer-events:none";
const KICKER = `margin:0;${MONO}font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#e8a33d;opacity:0`;
const H2 = "margin:0;font-size:clamp(30px,min(4.2vw,8vh),76px);font-weight:700;font-stretch:118%;line-height:.92;letter-spacing:-.02em;opacity:0";
const ENTER = `display:inline-flex;align-items:center;gap:10px;padding:11px 16px;border:1px solid rgba(236,232,225,.3);background:rgba(7,8,10,.4);color:#ece8e1;${MONO}font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer`;
const META = `display:flex;flex-direction:column;gap:10px;padding-top:12px;border-top:1px solid rgba(236,232,225,.14);${MONO}font-size:11px;letter-spacing:.06em;color:#8a877f;opacity:0;pointer-events:auto`;
const BLOCK_LABEL = `${MONO}font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#8a877f;break-after:avoid`;
const BLOCK_TEXT = "font-size:clamp(11.5px,1.6vh,15px);line-height:1.5;color:#b5b1a8;text-wrap:pretty";

function Card({ c }) {
  const d = PROJ[c.id];
  const head = (
    <>
      <p data-fx={fade(c, 0)} style={css(KICKER)}>{d.kicker}</p>
      <h2 data-fx={fade(c, 1, { ls: true })} style={css(H2)}>{d.name}</h2>
      <div data-fx={fade(c, 1, { y: false })} style={css("opacity:0;pointer-events:auto")}>
        <button data-open={c.id} className="btn-ghost" style={css(ENTER)}>Enter orbit ↗</button>
      </div>
    </>
  );

  if (c.id === "earlier") {
    return (
      <div style={css(CARD_WRAP.replace("gap:1.7vh", "gap:2vh"))}>
        {head}
        <div style={css("display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:24px")}>
          {d.builds.map((b, i) => (
            <div key={b.title} data-fx={fade(c, 2 + i)} style={css("display:flex;flex-direction:column;gap:10px;opacity:0;pointer-events:auto")}>
              <span style={css("font-size:clamp(17px,2.4vh,22px);font-weight:600;font-stretch:110%")}>{b.title}</span>
              <a href={b.link} target="_blank" rel="noreferrer" style={css(`${MONO}font-size:11px;color:#e8a33d`)}>{b.linkLabel} ↗</a>
              <span style={css(BLOCK_TEXT)}>{b.description}</span>
              <span style={css(`${MONO}font-size:10px;letter-spacing:.06em;color:#8a877f`)}>{b.stack.join(" / ")}</span>
            </div>
          ))}
        </div>
        <div data-fx={fade(c, 4)} style={css(META.replace("flex-direction:column;gap:10px", "flex-wrap:wrap;align-items:center;gap:18px"))}>
          <span style={css("text-transform:uppercase;letter-spacing:.18em;font-size:10px")}>High school websites</span>
          {schoolWebsites.map((w) => (
            <a key={w.title} href={w.link} target="_blank" rel="noreferrer" style={{ color: "#ece8e1" }}>{w.title}</a>
          ))}
        </div>
      </div>
    );
  }

  const client = d.blocks.length === 0;
  return (
    <div style={css(CARD_WRAP)}>
      {head}
      <p data-fx={fade(c, 2)} style={css(`margin:0;font-size:clamp(14px,min(1.2vw,2.2vh),19px);line-height:${client ? 1.5 : 1.45};text-wrap:pretty;opacity:0`)}>{d.problem}</p>
      {!client && (
        <div data-fx={fade(c, 3)} style={css("columns:2;column-gap:22px;opacity:0")}>
          {d.blocks.map((b) => (
            <div key={b.label} style={css("display:flex;flex-direction:column;gap:8px;margin-bottom:14px;break-inside:avoid")}>
              <span style={css(BLOCK_LABEL)}>{b.label}</span>
              <span style={css(BLOCK_TEXT)}>{b.text}</span>
            </div>
          ))}
        </div>
      )}
      <div data-fx={fade(c, client ? 3 : 4)} style={css(META)}>
        <span>{d.stack.join(" / ")}</span>
        <div style={css("display:flex;flex-wrap:wrap;align-items:center;gap:20px")}>
          {d.status && (
            <span style={css("display:flex;align-items:center;gap:8px;color:#ece8e1")}>
              <span style={css("width:6px;height:6px;border-radius:50%;background:#e8a33d")} />
              {d.status}
            </span>
          )}
          {d.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" style={{ color: "#ece8e1" }}>{l.label} →</a>
          ))}
          {(d.statusNote || d.note) && <span>{d.statusNote || d.note}</span>}
        </div>
        {d.contact && (
          <span>
            {d.contact.label}: <a href={`mailto:${d.contact.email}`} style={{ color: "#ece8e1" }}>{d.contact.email}</a>
          </span>
        )}
      </div>
    </div>
  );
}

const CTA = "padding:14px 22px;border:1px solid rgba(236,232,225,.3)";
const LADDER = [
  { offset: "0.00", fx: "opacity 0:1 0.1711:1 0.1787:.38", a: "Moon", b: "Intro" },
  { offset: "8.25", fx: "opacity 0.1673:.38 0.1749:1 0.3129:1 0.3205:.38", a: "Earth", b: "McCallos" },
  { offset: "13.40", fx: "opacity 0.3091:.38 0.3167:1 0.7486:1 0.7561:.38", a: "Sol", b: "Work & projects" },
  { offset: "28.64", fx: "opacity 0.7448:.38 0.7523:1 0.9962:1 1:.38", a: "Milky Way", b: "Experience" },
];

export default function Universe() {
  return (
    <section id="universe" data-scene="" style={css("height:3591vh;position:relative")}>
      <div style={css("position:sticky;top:0;height:100vh;overflow:hidden;background:#07080a")}>
        {/* Starfield plate */}
        <div data-mouse="-10" data-fx="scale 0:1.25 0.1134:1 0.7523:.9 0.8015:.75 lin; opacity 0.7523:1 0.8109:.35" style={css("position:absolute;inset:-10%;background-image:radial-gradient(circle,rgba(236,232,225,.85) 1px,transparent 1.6px),radial-gradient(circle,rgba(236,232,225,.35) 1px,transparent 1.4px),radial-gradient(circle,rgba(232,163,61,.5) 1px,transparent 1.6px);background-size:211px 173px,97px 113px,389px 331px;background-position:0 0,41px 63px,120px 40px")} />

        {/* Composition: shifts framing left/right; holds the three camera layers */}
        <div data-mouse="8" data-fx="x 0.0945:0vw 0.1276:24vw 0.1749:24vw 0.2174:-24vw 0.7523:-24vw 0.8015:0vw io" style={css("pointer-events:none;position:absolute;left:50%;top:50%;width:0;height:0")}>
          {/* L3: galaxy */}
          <div className="cam" data-fx="x 0.7523:-2375.00vh 0.8015:0vh io; y 0.7523:-791.67vh 0.8015:0vh io; scale 0.7523:79.1667 0.8015:1 0.9669:1.12 io; opacity 0.7486:0 0.7712:1 0.8109:1 0.8393:.5" style={css("position:absolute;left:0;top:0;width:0;height:0;opacity:0")}>
            <div style={css("position:absolute;left:0;top:0;width:0;height:0;transform:scaleY(0.5)")}>
              <div data-fx="rot 0.8015:0 1:-55 lin" style={css("position:absolute;left:-75vh;top:-75vh;width:150vh;height:150vh")}>
                <img src={galaxyImg} alt="" style={css("position:absolute;inset:0;width:100%;height:100%")} />
                <div style={css("position:absolute;left:105vh;top:95vh;width:0;height:0")}>
                  <div data-fx="rot 0.8015:0 1:55 lin" style={css("position:absolute;left:0;top:0;width:0;height:0")}>
                    <div style={css("position:absolute;left:0;top:0;width:0;height:0;transform:scaleY(2)")}>
                      <div style={css("position:absolute;left:-.45vh;top:-.45vh;width:.9vh;height:.9vh;border-radius:50%;background:#e8a33d;box-shadow:0 0 1.2vh #e8a33d")} />
                      <div data-fx="opacity 0.8015:0 0.8109:1 0.8298:1 0.8488:0" style={css(`position:absolute;left:1.6vh;top:-.7em;white-space:nowrap;${MONO}font-size:10px;letter-spacing:.2em;color:#e8a33d;opacity:0`)}>SOL · YOU ARE HERE</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* L2: solar system */}
          <div className="cam" data-fx="x 0.3167:-218.08vh 0.3639:0vh 0.7523:0vh 0.8015:30vh io; y 0.3167:-158.64vh 0.3639:0vh 0.7523:0vh 0.8015:10vh io; scale 0.3167:24.2308 0.3639:0.85 0.7523:.95 0.8015:.012 io; opacity 0.3107:0 0.3167:1 0.7895:1 0.8015:0" style={css("position:absolute;left:0;top:0;width:0;height:0;opacity:0")}>
            <div data-fx="rot 0:0 1:240 lin" style={css("position:absolute;left:-16vh;top:-16vh;width:32vh;height:32vh;border-radius:50%;background:repeating-conic-gradient(rgba(255,214,150,.13) 0deg 3deg,transparent 3deg 13deg);-webkit-mask-image:radial-gradient(circle closest-side,#000 30%,transparent 100%);mask-image:radial-gradient(circle closest-side,#000 30%,transparent 100%)")} />
            <div style={css("position:absolute;left:-14vh;top:-14vh;width:28vh;height:28vh;border-radius:50%;background:radial-gradient(circle,rgba(232,163,61,.42) 0,rgba(232,163,61,.12) 40%,transparent 70%)")} />
            <div style={css("position:absolute;left:-5vh;top:-5vh;width:10vh;height:10vh;border-radius:50%;overflow:hidden;background:#e8a33d;box-shadow:0 0 6vh rgba(232,163,61,.55)")}>
              <div data-fx="rot 0:0 1:-720 lin" style={{ position: "absolute", inset: 0, backgroundImage: `url(${sunImg})`, backgroundSize: "cover" }} />
            </div>
            <div style={css("position:absolute;left:0;top:0;width:0;height:0;transform:scaleY(0.42)")}>
              {PLANETS.map((p) => <Planet key={p.id} p={p} />)}
            </div>
          </div>

          {/* L1: Earth + Moon */}
          <div className="cam" data-fx="x 0:-965.22vh 0.1134:-159.37vh 0.1749:-150.14vh 0.2174:0vh 0.3167:0vh 0.3639:7.65vh io; y 0:999.91vh 0.1134:133.73vh 0.1749:125.99vh 0.2174:0vh 0.3167:0vh 0.3639:5.57vh io; scale 0:45 0.1134:7.43 0.1749:7 0.2174:1.55 0.3167:1.75 0.3639:0.0614 io; opacity 0.3545:1 0.3639:0" style={css("position:absolute;left:0;top:0;width:0;height:0")}>
            <div data-open="mccallos" data-body="mccallos" style={css("pointer-events:auto;cursor:pointer;position:absolute;left:-18vh;top:-18vh;width:36vh;height:36vh;border-radius:50%;overflow:hidden;background:#0b1a2a;box-shadow:0 0 6vh rgba(120,170,220,.22)")}>
              <PlanetSurface map={earthMap} h={36} turns={2.5} />
              <div style={css(EARTH_SHADE)} />
            </div>
            <div data-fx="rot 0.2174:-40 0.3639:-170 lin" style={css("position:absolute;left:0;top:0;width:0;height:0;transform:rotate(-40deg)")}>
              <div data-fx="opacity 0.1891:0 0.2221:1" style={css("position:absolute;left:-28vh;top:-28vh;width:56vh;height:56vh;border-radius:50%;border:1px dashed rgba(236,232,225,.16);opacity:0")} />
              <div style={css("position:absolute;left:28vh;top:0;width:0;height:0")}>
                <div data-fx="rot 0.2174:40 0.3639:170 lin" style={css("position:absolute;left:0;top:0;width:0;height:0;transform:rotate(40deg)")}>
                  <div style={css("position:absolute;left:-3.5vh;top:-3.5vh;width:7vh;height:7vh;border-radius:50%;overflow:hidden;background:#55534e;box-shadow:0 -1vh 10vh rgba(232,163,61,.12)")}>
                    <MoonDisk />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrim behind the card column */}
        <div data-fx="opacity 0.208:0 0.2221:1 0.7486:1 0.7618:0" style={css("position:absolute;top:0;bottom:0;right:0;left:calc(min(46vw,100vw - 620px) - 10vw);background:linear-gradient(90deg,rgba(7,8,10,0),rgba(7,8,10,.92) 10vw);pointer-events:none;opacity:0")} />

        {/* Hero */}
        <p data-fx="opacity 0:0 0.0038:1 0.0331:1 0.0473:0; y 0:12px 0.0076:0px 0.0473:-30px" style={css(`position:absolute;left:0;right:0;top:22vh;margin:0;text-align:center;${MONO}font-size:12px;letter-spacing:.32em;text-transform:uppercase;color:#e8a33d`)}>{hero.kicker}</p>
        <div data-fx="opacity 0:1 0.0113:0" style={css(`position:absolute;left:0;right:0;bottom:7vh;display:flex;flex-direction:column;align-items:center;gap:14px;${MONO}font-size:10px;letter-spacing:.3em;color:#8a877f`)}>
          <span>SCROLL TO BEGIN</span>
          <span style={css("width:1px;height:48px;background:linear-gradient(#8a877f,transparent)")} />
        </div>
        <h2 data-fx="opacity 0.0331:0 0.0567:1 0.0898:1 0.1087:0; ls 0.0331:1.1 0.104:.32 out; blur 0.0331:14 0.0614:0 0.0898:0 0.1087:8" style={css("position:absolute;left:0;right:0;top:50%;margin:-0.6em 0 0;text-align:center;font-size:clamp(28px,5.4vw,96px);font-weight:200;font-stretch:125%;letter-spacing:1.1em;white-space:nowrap;text-transform:uppercase;opacity:0")}>Michael Tommaso</h2>
        <div style={css("position:absolute;left:6vw;top:0;bottom:0;width:min(46vw,860px);display:flex;flex-direction:column;justify-content:center;gap:4vh;pointer-events:none")}>
          <h1 data-fx="opacity 0.1182:0 0.1323:1 0.1654:1 0.1777:0; y 0.1182:6vh 0.1342:0vh 0.1777:-4vh; blur 0.1182:12 0.1323:0" style={css("margin:0;font-size:clamp(40px,min(5.4vw,10vh),100px);font-weight:600;font-stretch:112%;line-height:.94;letter-spacing:-.03em;text-wrap:balance;opacity:0")}>{hero.headline}</h1>
          <p data-fx="opacity 0.1248:0 0.1399:1 0.1654:1 0.1777:0; y 0.1248:3vh 0.1418:0vh 0.1777:-3vh" style={css("margin:0;max-width:600px;font-size:clamp(15px,min(1.15vw,2.2vh),18px);line-height:1.6;color:#b5b1a8;text-wrap:pretty;opacity:0")}>{hero.sub}</p>
          <div data-fx="opacity 0.1304:0 0.1456:1 0.1654:1 0.1777:0; y 0.1304:3vh 0.1475:0vh" style={css(`display:flex;flex-wrap:wrap;gap:12px;${MONO}font-size:12px;letter-spacing:.12em;text-transform:uppercase;opacity:0;pointer-events:auto`)}>
            <a href="#universe" data-cut="" data-offset="8.25" className="btn-solid" style={css("padding:14px 22px;background:#ece8e1;color:#07080a")}>See my work</a>
            <a href={socials.resume} target="_blank" rel="noreferrer" className="btn-ghost" style={css(CTA)}>Résumé</a>
            <a href={`mailto:${socials.email}`} className="btn-ghost" style={css(CTA)}>Email</a>
          </div>
        </div>

        {/* Text cards */}
        {CARDS.map((c) => <Card key={c.id} c={c} />)}

        {/* Milky Way: experience track + education */}
        <div data-fx="opacity 0.7958:0 0.8109:1" style={css("position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-start;padding-top:max(30vh,200px);opacity:0")}>
          <div data-fx="opacity 0.9305:1 0.9471:0" style={css("position:absolute;left:4vw;top:14vh;display:flex;flex-direction:column;gap:12px")}>
            <span style={css(`${MONO}font-size:11px;letter-spacing:.24em;color:#e8a33d`)}>EXPERIENCE</span>
            <h2 data-fx="opacity 0.8015:0 0.818:1; ls 0.8015:.4 0.8246:-.02 out" style={css("margin:0;font-size:clamp(36px,4vw,72px);font-weight:600;font-stretch:118%;letter-spacing:-.02em")}>Where I've worked.</h2>
          </div>
          <div data-fx="x 0.8015:40vw 0.9669:-150vw lin" style={css("display:flex;gap:0;margin-top:0;width:max-content")}>
            {experiences.map((e, i) => (
              <div key={e.role + e.company} style={css("width:30vw;padding-right:4vw;display:flex;flex-direction:column;gap:10px;border-top:1px solid rgba(236,232,225,.16)")}>
                <span style={css(`width:9px;height:9px;border-radius:50%;background:${i === 0 ? "#e8a33d" : "#ece8e1"};margin:-5px 0 28px`)} />
                <span style={css(`${MONO}font-size:11px;letter-spacing:.14em;color:#8a877f`)}>{e.period.toUpperCase()}</span>
                <span style={css("font-size:24px;font-weight:600;font-stretch:110%")}>{e.role}</span>
                <span style={css("font-size:16px;color:#b5b1a8")}>{e.company}</span>
                {e.description && <span style={css("font-size:14px;line-height:1.55;color:#8a877f;max-width:24vw")}>{e.description}</span>}
              </div>
            ))}
            <div id="education" style={css("width:max(64vw,640px);padding:0 4vw 0 2vw;display:grid;grid-template-columns:minmax(240px,1.3fr) minmax(0,1fr) minmax(0,1fr);gap:3vw;align-items:start;border-left:1px solid rgba(236,232,225,.16);font-size:13px;line-height:1.7;color:#b5b1a8")}>
              <div style={css("display:flex;flex-direction:column;gap:8px")}>
                <span style={css(`${MONO}font-size:11px;letter-spacing:.24em;color:#e8a33d;margin-bottom:10px`)}>EDUCATION</span>
                <span style={css("font-size:clamp(24px,min(2.6vw,5vh),36px);font-weight:700;font-stretch:118%;letter-spacing:-.02em;color:#ece8e1")}>{education.school}</span>
                <span style={css("font-size:17px")}>{education.degree}</span>
                <span style={css("font-size:14px;color:#8a877f")}>{education.college} · {education.expected} · GPA {education.gpa}</span>
              </div>
              <div style={css("display:flex;flex-direction:column")}>
                <span style={css(`${MONO}font-size:10px;letter-spacing:.18em;color:#8a877f;margin-bottom:6px`)}>COURSEWORK</span>
                {education.coursework.map((c) => <span key={c}>{c}</span>)}
              </div>
              <div style={css("display:flex;flex-direction:column")}>
                <span style={css(`${MONO}font-size:10px;letter-spacing:.18em;color:#8a877f;margin-bottom:6px`)}>ACTIVITIES</span>
                {education.activities.map((a) => <span key={a}>{a}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* Chapter ladder */}
        <nav data-fx="opacity 0.0189:0 0.0331:1 0.1087:1 0.1172:0 0.1758:0 0.1853:1" style={css(`position:absolute;left:4vw;right:140px;bottom:3vh;opacity:0;display:flex;flex-wrap:wrap;gap:8px 28px;${MONO}font-size:10px;letter-spacing:.18em;text-transform:uppercase`)}>
          {LADDER.map((l) => (
            <a key={l.a} href="#universe" data-cut="" data-offset={l.offset} data-fx={l.fx} style={css("display:flex;align-items:center;gap:10px;opacity:.38")}>
              <span style={css("width:18px;height:1px;background:#e8a33d")} />
              <span style={{ color: "#ece8e1" }}>{l.a}</span>
              <span style={{ color: "#8a877f" }}>{l.b}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
