import { useEffect, useRef, useState } from "react";
import { css, MONO } from "../lib/css";
import { cineState } from "../lib/cine";
import { PROJ, ORDER } from "../data/orbit";

/* Click a planet / label / "Enter orbit": the camera dives into it and the
 * project opens over its horizon. Timings are the handoff's ("Project view"). */

const EASE = "cubic-bezier(.76,0,.18,1)";
const stage = () => document.querySelector("#universe > div");
const horizon = () => {
  const W = innerWidth, H = innerHeight, d = Math.max(W * 2.6, H * 2.4);
  return { cx: W / 2, cy: H * 0.76 + d / 2, d };
};
/* The ball is rendered at its largest on-screen size (the horizon or full cover) and only ever scaled
 * down. The handoff used a 100px ball scaled ~37x; Chrome then re-rasterizes ~14M px whenever the
 * surface moves (about 1 fps here) or only partly draws it (hard cut lines). */
const ballSize = () => Math.max(horizon().d, Math.hypot(innerWidth, innerHeight) * 1.25);
const tf = (cx, cy, d) => {
  const B = ballSize();
  return `translate(${cx - B / 2}px,${cy - B / 2}px) scale(${d / B})`;
};
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

export default function ProjectView() {
  const [open, setOpen] = useState(null);
  const R = useRef({}); // mutable bag: busy, pending, zoom, stageAnim, io, open (read only in handlers/effects)
  const ov = useRef(), iris = useRef(), ball = useRef(), ballWrap = useRef(), spin = useRef(), content = useRef();

  function arrive(from, withZoom) {
    const r = R.current;
    const o = ov.current, ir = iris.current, b = ball.current, ct = content.current;
    o.querySelectorAll("img[data-src]").forEach((im) => { if (im.getAttribute("src") !== im.dataset.src) im.src = im.dataset.src; });
    o.scrollTop = 0;
    ballWrap.current.style.opacity = 1;
    const W = innerWidth, H = innerHeight, cover = Math.hypot(W, H) * 1.25, hz = horizon();
    ir.style.clipPath = "none";
    const B = ballSize();
    b.style.width = b.style.height = B + "px";
    b.style.boxShadow = `0 ${-B / 100}px ${B / 10}px rgba(232,163,61,.35)`;
    b.getAnimations().forEach((x) => x.cancel());
    ir.getAnimations().forEach((x) => x.cancel());
    let t0;
    if (withZoom) {
      const st = stage(), S = Math.min(90, cover / Math.max(from.d, 4)), org = `${from.cx}px ${from.cy}px`;
      r.zoom = { org, end: `translate(${W / 2 - from.cx}px,${H / 2 - from.cy}px) scale(${S})` };
      uiEls().forEach((el) => el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, easing: "ease-in", fill: "forwards" }));
      if (st) r.stageAnim = st.animate([{ transform: "translate(0px,0px) scale(1)", transformOrigin: org }, { transform: r.zoom.end, transformOrigin: org }], { duration: 1500, easing: "cubic-bezier(.62,0,.88,.45)", fill: "forwards" });
      ir.style.opacity = 0;
      b.style.opacity = 0;
      ir.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, delay: 1300, fill: "forwards" });
      b.animate([{ opacity: 0 }, { opacity: 1, offset: 0.12 }, { opacity: 1 }], { duration: 1800, delay: 1300, fill: "forwards", composite: "add" });
      b.animate([{ transform: tf(W / 2, H / 2, cover) }, { transform: tf(hz.cx, hz.cy, hz.d) }], { duration: 1800, delay: 1300, easing: "cubic-bezier(.3,.6,.15,1)", fill: "both" });
      setTimeout(() => { cineState.paused = true; }, 1600);
      t0 = 2000;
    } else {
      ir.style.opacity = 1;
      b.style.opacity = 1;
      b.animate([{ transform: tf(W / 2, H * 1.6, H * 0.5) }, { transform: tf(hz.cx, hz.cy, hz.d) }], { duration: 1300, easing: EASE, fill: "forwards" });
      t0 = 700;
    }
    const sp = spin.current;
    sp.getAnimations().forEach((x) => x.cancel());
    // The horizon turns on its axis: two map tiles (each 2B wide) slide one tile on the GPU.
    sp.style.width = 4 * B + "px";
    sp.animate([{ transform: `translateX(${-2 * B}px)` }, { transform: "translateX(0)" }], { duration: 90000, iterations: Infinity });
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
    const o = ov.current, ir = iris.current, b = ball.current, ct = content.current;
    const W = innerWidth, H = innerHeight, cover = Math.hypot(W, H) * 1.25, hz = horizon();
    o.querySelectorAll("[data-back]").forEach((el) => el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: "forwards" }));
    ct.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 350, fill: "forwards" });
    ballWrap.current.style.opacity = 1;
    b.getAnimations().forEach((x) => x.cancel());
    b.style.opacity = 1;
    b.animate([{ transform: tf(hz.cx, hz.cy, hz.d) }, { transform: tf(W / 2, H / 2, cover) }], { duration: 1000, delay: 150, easing: "cubic-bezier(.6,0,.4,1)", fill: "forwards" });
    setTimeout(() => {
      cineState.paused = false;
      ir.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
      b.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
      const st = stage();
      if (st && r.zoom) {
        r.stageAnim?.cancel();
        r.stageAnim = st.animate([{ transform: r.zoom.end, transformOrigin: r.zoom.org }, { transform: "translate(0px,0px) scale(1)", transformOrigin: r.zoom.org }], { duration: 1500, easing: "cubic-bezier(.12,.6,.3,1)", fill: "forwards" });
      }
      uiEls().forEach((el) => {
        el.getAnimations().forEach((x) => x.cancel());
        el.animate([{ opacity: 0 }, { opacity: 0, offset: 0.5 }, { opacity: 1 }], { duration: 1300, fill: "forwards" });
      });
    }, 1150);
    setTimeout(() => {
      r.stageAnim?.cancel();
      r.stageAnim = null;
      uiEls().forEach((el) => el.getAnimations().forEach((x) => x.cancel()));
      document.documentElement.style.overflow = "";
      r.io?.disconnect();
      setOpen(null);
      r.busy = false;
    }, 2700);
  }

  function next() {
    const r = R.current;
    if (r.busy || !r.open) return;
    r.busy = true;
    const b = ball.current, hz = horizon();
    const nid = ORDER[(ORDER.indexOf(r.open) + 1) % ORDER.length];
    content.current.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
    b.getAnimations().forEach((a) => a.cancel());
    b.style.opacity = 1;
    const a = b.animate([{ transform: tf(hz.cx, hz.cy, hz.d) }, { transform: tf(hz.cx, hz.cy + innerHeight, hz.d) }], { duration: 600, easing: "cubic-bezier(.7,0,.8,.4)", fill: "forwards" });
    a.onfinish = () => { r.pending = { from: null, zoom: false }; setOpen(nid); };
  }

  // Run the arrival once the overlay for the new project has rendered.
  useEffect(() => {
    const r = R.current;
    r.open = open;
    if (!open || !r.pending) return;
    const p = r.pending;
    r.pending = null;
    requestAnimationFrame(() => arrive(p.from, p.zoom));
  }, [open]);

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
      r.io?.disconnect();
    };
  }, []);

  if (!open) return null;
  const d = PROJ[open];
  const nextName = PROJ[ORDER[(ORDER.indexOf(open) + 1) % ORDER.length]].name;
  const slots = Array.from({ length: d.slotCount }, (_, i) => `${open}-shot-${i + 2}`);

  return (
    <div ref={ov} role="dialog" aria-modal="true" aria-label={d.name} onScroll={(e) => { ballWrap.current.style.opacity = String(Math.max(0.25, 1 - (e.currentTarget.scrollTop / innerHeight) * 0.75)); }} style={css("position:fixed;inset:0;z-index:8990;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain")}>
      <div ref={iris} style={css("position:fixed;inset:0;background:#07080a;clip-path:circle(0px at 50% 50%)")} />
      <div ref={ballWrap} style={css("position:fixed;inset:0;pointer-events:none")}>
        <div ref={ball} style={{ ...css("position:absolute;left:0;top:0;width:100px;height:100px;border-radius:50%;overflow:hidden;transform:scale(0)"), background: d.base }}>
          <div ref={spin} style={{ position: "absolute", left: 0, top: 0, height: "100%", backgroundImage: `url(${d.mapLg})`, backgroundSize: "auto 100%", backgroundRepeat: "repeat-x" }} />
          <div style={css("position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 50% 0%,rgba(255,250,240,.4) 0,transparent 26%),radial-gradient(circle at 50% 18%,transparent 42%,rgba(7,8,10,.86) 78%)")} />
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

          {(d.shots.length > 0 || slots.length > 0) && (
            <section style={css("padding:8vh 6vw;background:#07080a;display:flex;flex-direction:column;gap:3vh")}>
              <div style={css("max-width:1400px;width:100%;margin:0 auto;display:flex;flex-direction:column;gap:3vh")}>
                <span data-reveal="" style={css(`${MONO}font-size:11px;letter-spacing:.24em;color:#e8a33d;opacity:0`)}>SCREENSHOTS</span>
                {d.shots.map((sh) => (
                  <div key={sh.src} data-reveal="" style={css("position:relative;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(236,232,225,.14);opacity:0")}>
                    <img data-kb="" data-src={sh.src} alt={sh.alt} style={css("display:block;width:100%;height:auto")} />
                  </div>
                ))}
                {slots.length > 0 && (
                  <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:2vw")}>
                    {/* ponytail: dev placeholders until real screenshots are dropped into src/assets/real */}
                    {slots.map((id) => (
                      <div key={id} data-reveal="" style={css(`aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;border:1px dashed rgba(236,232,225,.22);${MONO}font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#8a877f;opacity:0`)}>
                        Screenshot slot · {id}
                      </div>
                    ))}
                  </div>
                )}
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
