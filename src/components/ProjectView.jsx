import { useEffect, useRef, useState } from "react";
import { css, MONO } from "../lib/css";
import { cineState } from "../lib/cine";
import { bezier, tween, stopTween } from "../lib/tween";
import { PROJ, ORDER } from "../data/orbit";

/* Click a planet / label / "Enter orbit": the camera dives into it and the
 * project opens over its horizon. Timings are the handoff's ("Project view").
 *
 * Two planet layers, because Chrome draws a WAAPI-animated layer once, at the largest size it reaches:
 *  - the dive ball is exactly cover-sized (~2300px) with a static surface: drawn once while it's a dot,
 *    then only scaled down, so the dive and the return never show tiles filling in;
 *  - the horizon ball (~3700px, with the turning surface) takes over at full cover, where only the
 *    on-screen part needs drawing. Both show the same texture at the same scale, so the swap is invisible.
 * On close the horizon crossfades into the dive ball (pre-drawn at full cover, 1% opacity, while the
 * visitor reads) and that shrinks back onto the planet: no layer has to draw new tiles mid-transition.
 * The scene behind zooms at most 4x via a main-thread tween (lib/tween.js); the handoff zoomed it 90x. */

const DIVE = "cubic-bezier(.62,0,.88,.45)", SETTLE = "cubic-bezier(.3,.6,.15,1)";
const BACK = "cubic-bezier(.12,.6,.3,1)", DROP = "cubic-bezier(.7,0,.8,.4)", UP = "cubic-bezier(.76,0,.18,1)";
const E_DIVE = bezier(0.62, 0, 0.88, 0.45), E_BACK = bezier(0.12, 0.6, 0.3, 1);
const stageTf = (x, y, s) => `translate(${x}px,${y}px) scale(${s})`;
const stage = () => document.querySelector("#universe > div");
const horizon = () => {
  const W = innerWidth, H = innerHeight, d = Math.max(W * 2.6, H * 2.4);
  return { cx: W / 2, cy: H * 0.76 + d / 2, d };
};
const coverSize = () => Math.hypot(innerWidth, innerHeight) * 1.25;
const ballSize = () => Math.max(horizon().d, coverSize());
/* Place a ball drawn at size `size` with its centre at (cx, cy) and on-screen diameter d. */
const place = (size) => (cx, cy, d) => `translate(${cx - size / 2}px,${cy - size / 2}px) scale(${d / size})`;
const uiEls = () => {
  const st = stage();
  const els = st ? [...st.children].filter((c) => !c.hasAttribute("data-mouse")) : [];
  const h = document.querySelector("header");
  if (h) els.push(h);
  return els;
};
/* Largest visible copy of the planet on screen: where the dive starts. */
function bodyRect(id) {
  const W = innerWidth, H = innerHeight;
  let best = null, area = 0;
  document.querySelectorAll(`[data-body="${id}"]`).forEach((el) => {
    if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return;
    const r = el.getBoundingClientRect();
    const a = Math.max(0, Math.min(r.right, W) - Math.max(r.left, 0)) * Math.max(0, Math.min(r.bottom, H) - Math.max(r.top, 0));
    if (a > area) { area = a; best = r; }
  });
  return best ? { cx: best.left + best.width / 2, cy: best.top + best.height / 2, d: Math.max(best.width, 6) } : { cx: W / 2, cy: H / 2, d: 40 };
}
const cancelAll = (el) => el.getAnimations().forEach((x) => x.cancel());
const BALL_SHADE = "position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 50% 0%,rgba(255,250,240,.4) 0,transparent 26%),radial-gradient(circle at 50% 18%,transparent 42%,rgba(7,8,10,.86) 78%)";

export default function ProjectView() {
  const [open, setOpen] = useState(null);
  const R = useRef({}); // mutable bag: busy, pending, zoom, from, io, open (read only in handlers/effects)
  const ov = useRef(), iris = useRef(), ball = useRef(), dive = useRef(), ballWrap = useRef(), spin = useRef(), glow = useRef(), content = useRef();

  /* Size both balls for the current viewport; returns their placement helpers. */
  function sizeBalls() {
    const B = ballSize(), C = coverSize();
    ball.current.style.width = ball.current.style.height = B + "px";
    dive.current.style.width = dive.current.style.height = C + "px";
    spin.current.style.width = 4 * B + "px"; // two map tiles, each 2B wide
    return { B, C, tfB: place(B), tfC: place(C) };
  }

  function arrive(from, withZoom) {
    const r = R.current;
    const o = ov.current, ir = iris.current, b = ball.current, dv = dive.current, ct = content.current, gl = glow.current, sp = spin.current;
    o.querySelectorAll("img[data-src]").forEach((im) => { if (im.getAttribute("src") !== im.dataset.src) im.src = im.dataset.src; });
    o.scrollTop = 0;
    ballWrap.current.style.opacity = 1;
    const W = innerWidth, H = innerHeight, hz = horizon();
    const { B, C, tfB, tfC } = sizeBalls();
    ir.style.clipPath = "none";
    [b, dv, ir, gl, sp].forEach(cancelAll);
    // The horizon surface turns only once the ball has settled (a running animation mid-dive would
    // pin its raster scale while it's still changing size).
    const startSpin = () => sp.animate([{ transform: `translateX(${-2 * B}px)` }, { transform: "translateX(0)" }], { duration: 90000, iterations: Infinity });
    let t0;
    if (withZoom) {
      const st = stage(), S = Math.min(4, C / Math.max(from.d, 4)), org = `${from.cx}px ${from.cy}px`;
      r.zoom = { org, x: W / 2 - from.cx, y: H / 2 - from.cy, s: S };
      r.from = { ...from, id: r.open };
      uiEls().forEach((el) => el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, easing: "ease-in", fill: "forwards" }));
      if (st) {
        st.style.transformOrigin = org;
        tween(st, stageTf, [0, 0, 1], [r.zoom.x, r.zoom.y, S], { duration: 1500, easing: E_DIVE });
      }
      ir.style.opacity = 0;
      ir.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, delay: 1300, fill: "forwards" });
      // Dive ball: appears on the planet and rushes to full cover in step with the zoom.
      dv.animate([{ opacity: 0 }, { opacity: 1, offset: 0.17 }, { opacity: 1 }], { duration: 1300, fill: "forwards" });
      dv.animate([{ transform: tfC(from.cx, from.cy, from.d) }, { transform: tfC(W / 2, H / 2, C) }], { duration: 1300, easing: DIVE, fill: "both" });
      // Horizon ball takes over at full cover (same texture, same scale), then settles.
      b.style.opacity = 0;
      b.animate([{ transform: tfB(W / 2, H / 2, C) }, { transform: tfB(hz.cx, hz.cy, hz.d) }], { duration: 1800, delay: 1300, easing: SETTLE, fill: "both" }).onfinish = () => {
        startSpin();
        // Pre-draw the dive ball for the return trip while the visitor reads: at full cover, 1% opacity,
        // behind the text. The exit then doesn't have to draw it at the same time as everything else.
        dv.style.transform = tfC(W / 2, H / 2, C);
        dv.style.opacity = 0.01;
      };
      setTimeout(() => { b.style.opacity = 1; dv.getAnimations().forEach((x) => x.cancel()); dv.style.opacity = 0; }, 1300);
      gl.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900, delay: 1900, fill: "both" });
      // Once the iris is opaque, stop rendering the zoomed stage behind it (it would starve the tile budget).
      setTimeout(() => {
        cineState.paused = true;
        const s = stage();
        if (s) s.style.contentVisibility = "hidden";
      }, 1600);
      t0 = 2000;
    } else {
      ir.style.opacity = 1;
      dv.style.opacity = 0;
      b.style.opacity = 1;
      b.animate([{ transform: tfB(W / 2, H * 1.6, H * 0.5) }, { transform: tfB(hz.cx, hz.cy, hz.d) }], { duration: 1300, easing: UP, fill: "forwards" }).onfinish = startSpin;
      gl.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 700, delay: 600, fill: "both" });
      t0 = 700;
    }
    ct.getAnimations().forEach((x) => x.cancel());
    ct.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: t0 - 200, fill: "forwards" });
    o.querySelectorAll("[data-stagger]").forEach((el, i) =>
      el.animate(
        [
          { opacity: 0, transform: "translateY(40px)", filter: "blur(10px)", letterSpacing: i === 1 ? ".2em" : "normal" },
          { opacity: 1, transform: "none", filter: "blur(0)", letterSpacing: i === 1 ? "-.03em" : "normal" },
        ],
        { duration: 1100, delay: t0 + i * 110, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards" }
      )
    );
    o.querySelectorAll("[data-back]").forEach((el) => el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: t0 + 300, fill: "forwards" }));
    o.querySelectorAll("[data-kb]").forEach((el) => el.animate([{ transform: "scale(1.08)" }, { transform: "scale(1)" }], { duration: 14000, easing: "ease-out", fill: "forwards" }));
    r.io?.disconnect();
    r.io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.animate([{ opacity: 0, transform: "translateY(50px)" }, { opacity: 1, transform: "none" }], { duration: 1000, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards" });
        r.io.unobserve(e.target);
      }),
      { root: o, threshold: 0.12 }
    );
    o.querySelectorAll("[data-reveal]").forEach((el) => r.io.observe(el));
    setTimeout(() => { r.busy = false; }, t0 + 300);
  }

  function openProject(id) {
    const r = R.current;
    if (r.busy || !PROJ[id]) return;
    r.busy = true;
    r.pending = { from: bodyRect(id), zoom: true };
    document.documentElement.style.overflow = "hidden";
    setOpen(id);
  }

  function close() {
    const r = R.current;
    if (r.busy || !r.open) return;
    r.busy = true;
    const st0 = stage();
    if (st0) st0.style.contentVisibility = ""; // re-raster behind the iris before it's revealed
    const o = ov.current, ir = iris.current, b = ball.current, dv = dive.current, ct = content.current;
    const W = innerWidth, H = innerHeight;
    const { C, tfC } = sizeBalls();
    o.querySelectorAll("[data-back]").forEach((el) => el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: "forwards" }));
    ct.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 350, fill: "forwards" });
    ballWrap.current.style.opacity = 1;
    [spin.current, b, dv].forEach(cancelAll);
    glow.current.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
    const back = r.from && r.from.id === r.open; // after "Next" it's a different planet: just fade
    const T = back ? 600 : 300;
    if (back) {
      // Crossfade horizon -> full-cover dive ball (pre-drawn since the arrival): no new tiles to draw.
      dv.style.transform = tfC(W / 2, H / 2, C);
      dv.animate([{ opacity: 0.01 }, { opacity: 1 }], { duration: 400, delay: 150, fill: "forwards" });
      b.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, delay: 350, fill: "forwards" });
    } else {
      b.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
    }
    setTimeout(() => {
      cineState.paused = false;
      ir.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
      if (back) {
        // Reverse of the dive: the dive ball shrinks back onto the planet with the zoom-out, then hands off.
        dv.animate([{ transform: tfC(W / 2, H / 2, C) }, { transform: tfC(r.from.cx, r.from.cy, r.from.d) }], { duration: 1500, easing: BACK, fill: "forwards" });
        dv.animate([{ opacity: 1 }, { opacity: 1, offset: 0.75 }, { opacity: 0 }], { duration: 1500, fill: "forwards" });
      }
      const st = stage();
      if (st && r.zoom) tween(st, stageTf, [r.zoom.x, r.zoom.y, r.zoom.s], [0, 0, 1], { duration: 1500, easing: E_BACK });
      uiEls().forEach((el) => {
        el.getAnimations().forEach((x) => x.cancel());
        el.animate([{ opacity: 0 }, { opacity: 0, offset: 0.5 }, { opacity: 1 }], { duration: 1300, fill: "forwards" });
      });
    }, T);
    setTimeout(() => {
      const st = stage();
      if (st) { stopTween(st); st.style.transform = st.style.transformOrigin = ""; }
      uiEls().forEach((el) => el.getAnimations().forEach((x) => x.cancel()));
      document.documentElement.style.overflow = "";
      r.io?.disconnect();
      setOpen(null);
      r.busy = false;
    }, T + 1550);
  }

  function next() {
    const r = R.current;
    if (r.busy || !r.open) return;
    r.busy = true;
    const b = ball.current, hz = horizon();
    const { tfB } = sizeBalls();
    const nid = ORDER[(ORDER.indexOf(r.open) + 1) % ORDER.length];
    content.current.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
    [spin.current, b].forEach(cancelAll);
    b.style.opacity = 1;
    b.animate([{ transform: tfB(hz.cx, hz.cy, hz.d) }, { transform: tfB(hz.cx, hz.cy + innerHeight, hz.d) }], { duration: 600, easing: DROP, fill: "forwards" }).onfinish = () => {
      r.pending = { from: null, zoom: false };
      setOpen(nid);
    };
  }

  // Run the arrival once the overlay for the new project has rendered.
  useEffect(() => {
    const r = R.current;
    r.open = open;
    if (!open || !r.pending) return;
    const p = r.pending;
    r.pending = null;
    requestAnimationFrame(() => arrive(p.from, p.zoom));
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps -- arrive() only touches refs

  useEffect(() => {
    const r = R.current;
    const onClick = (e) => {
      if (r.open) return;
      const t = e.target.closest?.("[data-open]");
      if (!t) return;
      e.preventDefault();
      e.stopPropagation();
      openProject(t.dataset.open);
    };
    const onKey = (e) => { if (e.key === "Escape" && r.open) close(); };
    document.addEventListener("click", onClick, true);
    addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick, true);
      removeEventListener("keydown", onKey);
      cineState.paused = false;
      document.documentElement.style.overflow = "";
      const s = stage();
      if (s) { stopTween(s); s.style.contentVisibility = s.style.transform = s.style.transformOrigin = ""; }
      r.io?.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- handlers only touch refs; bind once

  if (!open) return null;
  const d = PROJ[open];
  const nextName = PROJ[ORDER[(ORDER.indexOf(open) + 1) % ORDER.length]].name;

  return (
    <div ref={ov} role="dialog" aria-modal="true" aria-label={d.name} onScroll={(e) => { ballWrap.current.style.opacity = String(Math.max(0.25, 1 - (e.currentTarget.scrollTop / innerHeight) * 0.75)); }} style={css("position:fixed;inset:0;z-index:8990;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain")}>
      <div ref={iris} style={css("position:fixed;inset:0;background:#07080a;clip-path:circle(0px at 50% 50%)")} />
      <div ref={ballWrap} style={css("position:fixed;inset:0;pointer-events:none")}>
        {/* Horizon glow: a plain gradient (a blurred box-shadow on the ~3700px ball was very slow to draw) */}
        <div ref={glow} style={css("position:absolute;inset:0;opacity:0;background:radial-gradient(ellipse 70% 42% at 50% 80%,rgba(232,163,61,.34),rgba(232,163,61,.08) 45%,transparent 72%)")} />
        <div ref={ball} style={{ ...css("position:absolute;left:0;top:0;width:100px;height:100px;border-radius:50%;overflow:hidden;transform:scale(0)"), background: d.base }}>
          <div ref={spin} style={{ position: "absolute", left: 0, top: 0, height: "100%", backgroundImage: `url(${d.mapLg})`, backgroundSize: "auto 100%", backgroundRepeat: "repeat-x" }} />
          <div style={css(BALL_SHADE)} />
        </div>
        {/* Dive ball: cover-sized, static surface (see the note at the top) */}
        <div ref={dive} style={{ ...css("position:absolute;left:0;top:0;width:100px;height:100px;border-radius:50%;overflow:hidden;opacity:0;transform:scale(0)"), background: d.base }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${d.mapLg})`, backgroundSize: "auto 100%", backgroundRepeat: "repeat-x" }} />
          <div style={css(BALL_SHADE)} />
        </div>
      </div>
      <button data-back="" onClick={close} className="btn-ghost" style={css(`position:fixed;left:4vw;top:22px;z-index:3;display:flex;align-items:center;gap:10px;padding:10px 14px;border:1px solid rgba(236,232,225,.25);background:rgba(7,8,10,.88);color:#ece8e1;${MONO}font-size:11px;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;opacity:0`)}>← Back to orbit</button>
      <span data-back="" className="pv-desk" style={css(`position:fixed;right:4vw;top:32px;z-index:3;${MONO}font-size:10px;letter-spacing:.2em;color:#8a877f;opacity:0`)}>ESC TO CLOSE</span>

      <div ref={content} style={css("position:relative;z-index:2;opacity:0")}>
        <div key={open}>
          <section style={css("min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:3vh;padding:14vh 6vw 30vh;text-align:center")}>
            <p data-stagger="" style={css(`margin:0;${MONO}font-size:12px;letter-spacing:.32em;text-transform:uppercase;color:#e8a33d;opacity:0`)}>{d.kicker}</p>
            <h2 data-stagger="" className="pv-title" style={css("margin:0;font-size:clamp(52px,min(10vw,18vh),190px);font-weight:700;font-stretch:125%;line-height:.86;letter-spacing:-.03em;text-wrap:balance;opacity:0")}>{d.name}</h2>
            {d.problem && <p data-stagger="" style={css("margin:0;max-width:820px;font-size:clamp(17px,min(1.6vw,3vh),24px);line-height:1.45;color:#d8d4cb;text-wrap:balance;opacity:0")}>{d.problem}</p>}
            <span data-stagger="" style={css(`margin-top:2vh;${MONO}font-size:10px;letter-spacing:.3em;color:#8a877f;opacity:0`)}>SCROLL ↓</span>
          </section>

          {d.stats.length > 0 && (
            <section style={css("padding:6vh 6vw 10vh;background:linear-gradient(rgba(7,8,10,0),#07080a 30%)")}>
              <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:4vw;max-width:1400px;margin:0 auto")}>
                {d.stats.map((st) => (
                  <div key={st.l} data-reveal="" style={css("display:flex;flex-direction:column;gap:10px;padding-top:18px;border-top:1px solid rgba(236,232,225,.18);opacity:0")}>
                    <span style={css("font-size:clamp(44px,5vw,88px);font-weight:200;font-stretch:125%;line-height:.9;letter-spacing:-.03em")}>{st.n}</span>
                    <span style={css(`${MONO}font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#8a877f`)}>{st.l}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {d.shots.length > 0 && (
            <section style={css("padding:8vh 6vw;background:#07080a;display:flex;flex-direction:column;gap:3vh")}>
              <div style={css("max-width:1400px;width:100%;margin:0 auto;display:flex;flex-direction:column;gap:3vh")}>
                <span data-reveal="" style={css(`${MONO}font-size:11px;letter-spacing:.24em;color:#e8a33d;opacity:0`)}>SCREENSHOTS</span>
                {d.shots.map((sh) => (
                  <div key={sh.src} data-reveal="" style={css("position:relative;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(236,232,225,.14);opacity:0")}>
                    <img data-kb="" data-src={sh.src} alt={sh.alt} style={css("display:block;width:100%;height:auto")} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {d.blocks.length > 0 && (
            <section style={css("padding:8vh 6vw 6vh;background:#07080a")}>
              <div style={css("max-width:1400px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:5vw")}>
                {d.blocks.map((b) => (
                  <div key={b.label} data-reveal="" style={css("display:flex;flex-direction:column;gap:16px;opacity:0")}>
                    <span style={css(`${MONO}font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#e8a33d`)}>{b.label}</span>
                    <p style={css("margin:0;font-size:clamp(17px,1.35vw,21px);line-height:1.6;color:#d8d4cb;text-wrap:pretty")}>{b.text}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section style={css("padding:4vh 6vw 10vh;background:#07080a")}>
            <div data-reveal="" style={css("max-width:1400px;margin:0 auto;display:flex;flex-direction:column;gap:22px;padding-top:28px;border-top:1px solid rgba(236,232,225,.16);opacity:0")}>
              <div style={css("display:flex;flex-wrap:wrap;gap:8px")}>
                {d.stack.map((t) => (
                  <span key={t} style={css(`padding:7px 12px;border:1px solid rgba(236,232,225,.2);${MONO}font-size:11px;letter-spacing:.06em;color:#b5b1a8`)}>{t}</span>
                ))}
              </div>
              <div style={css(`display:flex;flex-wrap:wrap;align-items:center;gap:22px;${MONO}font-size:12px;letter-spacing:.06em;color:#8a877f`)}>
                {d.status && (
                  <span style={css("display:flex;align-items:center;gap:8px;color:#ece8e1")}>
                    <span style={css("width:7px;height:7px;border-radius:50%;background:#e8a33d")} />
                    {d.status}
                  </span>
                )}
                {d.links.map((lk) => (
                  <a key={lk.href} href={lk.href} target="_blank" rel="noreferrer" className="btn-solid" style={css("padding:12px 18px;background:#ece8e1;color:#07080a;letter-spacing:.12em;text-transform:uppercase;font-size:11px")}>{lk.label} ↗</a>
                ))}
                {(d.statusNote || d.note) && <span>{d.statusNote || d.note}</span>}
              </div>
              {d.contact && (
                <span style={css(`${MONO}font-size:12px;color:#8a877f`)}>
                  {d.contact.label}: <a href={`mailto:${d.contact.email}`} style={{ color: "#ece8e1" }}>{d.contact.email}</a>
                </span>
              )}
            </div>
          </section>

          <section style={css("padding:12vh 6vw 16vh;background:#07080a;display:flex;flex-direction:column;align-items:center;gap:22px;text-align:center")}>
            <span style={css(`${MONO}font-size:11px;letter-spacing:.3em;color:#8a877f`)}>NEXT PLANET</span>
            <button onClick={next} className="link-amber" style={css("padding:0;border:0;background:none;color:#ece8e1;font-family:'Archivo',sans-serif;font-size:clamp(40px,7vw,120px);font-weight:700;font-stretch:125%;letter-spacing:-.03em;line-height:.9;cursor:pointer")}>{nextName} →</button>
            <button onClick={close} className="btn-ghost" style={css(`margin-top:2vh;padding:12px 18px;border:1px solid rgba(236,232,225,.25);background:none;color:#ece8e1;${MONO}font-size:11px;letter-spacing:.16em;text-transform:uppercase;cursor:pointer`)}>← Back to orbit</button>
          </section>
        </div>
      </div>
    </div>
  );
}
