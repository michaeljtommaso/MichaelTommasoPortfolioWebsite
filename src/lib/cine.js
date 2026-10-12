/* Cine: scroll/cursor keyframe engine, ported from the Claude Design handoff
 * (design-handoff/cine.js). Markup API:
 *   [data-scene]          progress 0→1 while a tall section scrolls past its sticky stage
 *   [data-scene="view"]   progress 0→1 as the element crosses the viewport
 *   [data-fx="prop t:v t:v ease; …"]  keyframes on nearest scene (or data-src="page")
 *       props: x y scale sx rot opacity blur ls bgx   eases: lin io out in expo step
 *   [data-mouse="n"]      cursor parallax in px
 *   a[data-cut]           letterbox shutter "cut" to the href target (data-offset in vh)
 * ponytail: the prototype's live film grain and light leak are gone on purpose:
 * full-screen blend + animated blur was the main lag on integrated GPUs.
 * Grain gets baked into the Higgsfield assets instead; the vignette stays (static). */

const E = {
  lin: (t) => t,
  io: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  out: (t) => 1 - Math.pow(1 - t, 3),
  in: (t) => t * t * t,
  expo: (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  step: (t) => (t >= 1 ? 1 : 0),
};
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export const cineState = { paused: false };

function parse(spec) {
  return spec
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const parts = s.split(/\s+/);
      const prop = parts.shift();
      let e = "io";
      const stops = [];
      for (const p of parts) {
        if (E[p]) { e = p; continue; }
        const i = p.indexOf(":");
        const m = p.slice(i + 1).match(/^(-?[\d.]+)(.*)$/);
        if (m) stops.push({ t: parseFloat(p.slice(0, i)), v: parseFloat(m[1]), u: m[2] || "" });
      }
      stops.sort((a, b) => a.t - b.t);
      return { prop, stops, e: E[e] };
    })
    .filter((t) => t.stops.length);
}

function sample(tr, p) {
  const s = tr.stops, n = s.length;
  if (p <= s[0].t) return s[0];
  if (p >= s[n - 1].t) return s[n - 1];
  for (let i = 0; i < n - 1; i++) {
    const a = s[i], b = s[i + 1];
    if (p >= a.t && p <= b.t) {
      const k = tr.e((p - a.t) / (b.t - a.t || 1));
      return { v: a.v + (b.v - a.v) * k, u: b.u || a.u };
    }
  }
}

function rawP(el) {
  const r = el.getBoundingClientRect(), H = innerHeight;
  if (H <= 0 || H + r.height <= 0) return 0;
  let v;
  if (el.dataset.scene === "view") v = (H - r.top) / (H + r.height);
  else {
    const d = r.height - H;
    v = d <= 0 ? (H - r.top) / (H + r.height) : -r.top / d;
  }
  return Number.isFinite(v) ? clamp(v) : 0;
}

export function mountCine({ vignette = 0.6, shutter = "#07080a", smooth = 0.14 } = {}) {
  const layer = document.createElement("div");
  layer.setAttribute("data-cine-layer", "");
  layer.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9000";
  const add = (st) => {
    const d = document.createElement("div");
    d.style.cssText = "position:absolute;" + st;
    layer.appendChild(d);
    return d;
  };
  if (vignette) add(`inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 50%,rgba(0,0,0,${vignette}) 100%)`);
  const bar = "left:0;right:0;height:50.5vh;transform:scaleY(0);background:" + shutter + ";transition:transform .34s cubic-bezier(.7,0,.3,1);z-index:2";
  const top = add("top:0;transform-origin:50% 0;" + bar);
  const bot = add("bottom:0;transform-origin:50% 100%;" + bar);
  const shut = (closed) => { top.style.transform = bot.style.transform = closed ? "scaleY(1)" : "scaleY(0)"; };
  document.body.appendChild(layer);

  let mx = 0, my = 0, tmx = 0, tmy = 0, raf = 0;
  const onMove = (e) => {
    tmx = (e.clientX / innerWidth) * 2 - 1;
    tmy = (e.clientY / innerHeight) * 2 - 1;
  };
  const onClick = (e) => {
    const a = e.target.closest?.("a[data-cut]");
    if (!a) return;
    const id = (a.getAttribute("href") || "").replace("#", "");
    const t = id === "top" ? document.body : document.getElementById(id);
    if (!t) return;
    e.preventDefault();
    shut(true);
    setTimeout(() => {
      const y = id === "top" ? 0 : t.getBoundingClientRect().top + scrollY + parseFloat(a.dataset.offset || 0) * innerHeight;
      scrollTo({ top: y, behavior: "instant" });
      setTimeout(() => shut(false), 160);
    }, 380);
  };
  addEventListener("pointermove", onMove);
  document.addEventListener("click", onClick, true);

  const parsed = new WeakMap(), smoothed = new WeakMap(), scOf = new WeakMap(), outOf = new WeakMap();
  let scEls = [], fxEls = [], lastKey = "", settle = 0;
  const refresh = () => {
    scEls = [...document.querySelectorAll("[data-scene]")];
    fxEls = [...document.querySelectorAll("[data-fx],[data-mouse]")];
    fxEls.forEach((el) => scOf.set(el, el.closest("[data-scene]")));
    lastKey = "";
  };
  refresh();
  let mt = 0;
  const mo = new MutationObserver(() => { clearTimeout(mt); mt = setTimeout(refresh, 80); });
  mo.observe(document.body, { childList: true, subtree: true });

  function frame() {
    if (cineState.paused) return;
    const dm = Math.abs(tmx - mx) + Math.abs(tmy - my);
    mx += (tmx - mx) * 0.08;
    my += (tmy - my) * 0.08;
    const key = scrollY + "," + innerWidth + "," + innerHeight;
    if (key === lastKey && dm < 0.0004 && settle <= 0) return;
    if (key !== lastKey) settle = 40; else settle--;
    lastKey = key;

    const docH = document.documentElement.scrollHeight - innerHeight;
    const pageP = docH > 0 ? clamp(scrollY / docH) : 0;
    const sceneP = new Map();
    for (const s of scEls) {
      const r = rawP(s);
      let v = smoothed.has(s) ? smoothed.get(s) : r;
      v = Math.abs(r - v) > 0.25 ? r : v + (r - v) * smooth;
      smoothed.set(s, v);
      sceneP.set(s, v);
    }

    for (const el of fxEls) {
      const spec = el.dataset.fx || "";
      let list = parsed.get(el);
      if (!list || list.spec !== spec) { list = parse(spec); list.spec = spec; parsed.set(el, list); }
      let p = pageP;
      if (el.dataset.src !== "page") {
        const sc = scOf.get(el) ?? el.closest("[data-scene]");
        p = sc ? sceneP.get(sc) ?? rawP(sc) : 0;
      }
      let tx = 0, ux = "px", ty = 0, uy = "px", s = 1, sx = 1, rot = 0, tf = false;
      const filt = [];
      for (const tr of list) {
        const { v, u } = sample(tr, p);
        switch (tr.prop) {
          case "x": tx = v; ux = u || "px"; tf = true; break;
          case "y": ty = v; uy = u || "px"; tf = true; break;
          case "scale": s = v; tf = true; break;
          case "sx": sx = v; tf = true; break;
          case "rot": rot = v; tf = true; break;
          case "opacity": el.style.opacity = v; el.style.visibility = v < 0.005 ? "hidden" : "visible"; break;
          case "blur": filt.push(`blur(${v}px)`); break;
          case "ls": el.style.letterSpacing = v + "em"; break;
          case "bgx": {
            // Seamless map scroll on the GPU: the element holds two map tiles (data-wrap = one tile's width)
            // and slides within one tile, so it never repaints (background-position would, every frame).
            const w = parseFloat(el.dataset.wrap);
            const t = `translate3d(${(((v % w) + w) % w) - w}${u || "px"},0,0)`;
            if (outOf.get(el) !== t) { outOf.set(el, t); el.style.transform = t; }
            break;
          }
        }
      }
      if (filt.length) el.style.filter = filt.join(" ");
      const m = parseFloat(el.dataset.mouse || 0);
      if (tf || m) {
        const t = `translate3d(calc(${tx}${ux} + ${(mx * m).toFixed(2)}px),calc(${ty}${uy} + ${(my * m).toFixed(2)}px),0) scale(${s * sx},${s}) rotate(${rot}deg)`;
        if (outOf.get(el) !== t) { outOf.set(el, t); el.style.transform = t; }
      }
    }
  }
  const loop = () => { frame(); raf = requestAnimationFrame(loop); };
  raf = requestAnimationFrame(loop);
  frame();

  return () => {
    mo.disconnect();
    cancelAnimationFrame(raf);
    removeEventListener("pointermove", onMove);
    document.removeEventListener("click", onClick, true);
    layer.remove();
  };
}
