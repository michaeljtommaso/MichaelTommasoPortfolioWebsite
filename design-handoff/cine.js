/* Cine — tiny scroll/cursor motion engine shared by the portfolio directions.
 * Markup API:
 *   [data-scene]            progress 0→1 while a tall section scrolls past its sticky stage
 *   [data-scene="view"]     progress 0→1 as the element crosses the viewport
 *   [data-fx="prop t:v t:v ease; …"]  keyframes on nearest scene (or data-src="page")
 *       props: x y (any unit) scale sx sy rot opacity blur bright inset insetx iris hole ls num shake
 *       eases: lin io out in expo step
 *   [data-mouse="n"]        cursor parallax in px
 *   [data-timecode]         film timecode of page progress
 *   a[data-cut]             letterbox shutter "cut" to the href target
 */
(function () {
  if (window.Cine) return;
  const E = { lin: t => t, io: t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), out: t => 1 - Math.pow(1 - t, 3), in: t => t * t * t, expo: t => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)), step: t => (t >= 1 ? 1 : 0) };
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const parsed = new WeakMap(), smooth = new WeakMap();
  let forced = null, preview = () => {};
  function parse(spec) {
    return spec.split(';').map(s => s.trim()).filter(Boolean).map(s => {
      const parts = s.split(/\s+/), prop = parts.shift(); let e = 'io'; const stops = [];
      parts.forEach(p => {
        if (E[p]) { e = p; return; }
        const i = p.indexOf(':'); const m = p.slice(i + 1).match(/^(-?[\d.]+)(.*)$/);
        if (m) stops.push({ t: parseFloat(p.slice(0, i)), v: parseFloat(m[1]), u: m[2] || '' });
      });
      stops.sort((a, b) => a.t - b.t);
      return { prop, stops, e: E[e] };
    }).filter(t => t.stops.length);
  }
  function sample(tr, p) {
    if (!Number.isFinite(p)) p = 0;
    const s = tr.stops, n = s.length;
    if (p <= s[0].t) return s[0]; if (p >= s[n - 1].t) return s[n - 1];
    for (let i = 0; i < n - 1; i++) { const a = s[i], b = s[i + 1]; if (p >= a.t && p <= b.t) { const k = tr.e((p - a.t) / ((b.t - a.t) || 1)); return { v: a.v + (b.v - a.v) * k, u: b.u || a.u }; } }
  }
  function rawP(el) {
    const r = el.getBoundingClientRect(), H = innerHeight;
    if (H <= 0 || H + r.height <= 0) return 0;
    let v;
    if (el.dataset.scene === 'view') v = (H - r.top) / (H + r.height);
    else { const d = r.height - H; v = d <= 0 ? (H - r.top) / (H + r.height) : -r.top / d; }
    return Number.isFinite(v) ? clamp(v) : 0;
  }
  const NOISE = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E\")";
  function mount(o = {}) {
    o = Object.assign({ grain: .09, vignette: .55, leak: null, spot: null, flicker: false, shutter: '#000', duration: 180, smooth: .14 }, o);
    const layer = document.createElement('div'); layer.setAttribute('data-cine-layer', '');
    layer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9000';
    const css = document.createElement('style');
    css.textContent = '@keyframes cineGrain{0%{transform:translate(0,0)}20%{transform:translate(-4%,3%)}40%{transform:translate(3%,-5%)}60%{transform:translate(-6%,-2%)}80%{transform:translate(5%,4%)}100%{transform:translate(0,0)}}@keyframes cineLeak{0%{transform:translate(-20vw,10vh) scale(1);opacity:.0}30%{opacity:1}100%{transform:translate(70vw,-20vh) scale(1.6);opacity:.2}}@keyframes cineFlick{0%,100%{opacity:0}50%{opacity:.05}52%{opacity:0}74%{opacity:.03}}';
    layer.appendChild(css);
    const add = (st) => { const d = document.createElement('div'); d.style.cssText = 'position:absolute;' + st; layer.appendChild(d); return d; };
    if (o.vignette) add(`inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 50%,rgba(0,0,0,${o.vignette}) 100%)`);
    if (o.leak) add(`left:-20vw;top:-30vh;width:70vw;height:90vh;border-radius:50%;background:radial-gradient(circle,${o.leak} 0%,transparent 65%);filter:blur(40px);mix-blend-mode:screen;animation:cineLeak 16s ease-in-out infinite alternate`);
    let spot = null; if (o.spot) spot = add(`left:0;top:0;width:70vmax;height:70vmax;margin:-35vmax 0 0 -35vmax;border-radius:50%;background:radial-gradient(circle,${o.spot} 0%,transparent 60%);mix-blend-mode:soft-light`);
    if (o.flicker) add('inset:0;background:#fff;animation:cineFlick .2s steps(2) infinite');
    if (o.grain) add(`inset:-50%;background-image:${NOISE};opacity:${o.grain};mix-blend-mode:overlay;animation:cineGrain .9s steps(5) infinite`);
    const top = add(`left:0;right:0;top:0;height:0;background:${o.shutter};transition:height .34s cubic-bezier(.7,0,.3,1);z-index:2`);
    const bot = add(`left:0;right:0;bottom:0;height:0;background:${o.shutter};transition:height .34s cubic-bezier(.7,0,.3,1);z-index:2`);
    document.body.appendChild(layer);

    let mx = 0, my = 0, tmx = 0, tmy = 0, cx = innerWidth / 2, cy = innerHeight / 2, raf = 0, alive = true;
    const onMove = e => { tmx = e.clientX / innerWidth * 2 - 1; tmy = e.clientY / innerHeight * 2 - 1; cx = e.clientX; cy = e.clientY; };
    const onClick = e => {
      const a = e.target.closest && e.target.closest('a[data-cut]'); if (!a) return;
      const id = (a.getAttribute('href') || '').replace('#', ''); const t = id === 'top' ? document.body : document.getElementById(id); if (!t) return;
      e.preventDefault(); top.style.height = bot.style.height = '50.5vh';
      setTimeout(() => { const y = id === 'top' ? 0 : t.getBoundingClientRect().top + scrollY + (parseFloat(a.dataset.offset || 0) * innerHeight); scrollTo({ top: y, behavior: 'instant' }); setTimeout(() => { top.style.height = bot.style.height = '0'; }, 160); }, 380);
    };
    addEventListener('pointermove', onMove); document.addEventListener('click', onClick, true);

    let last = 0, scEls = [], fxEls = [], tcEls = [], lastKey = '', settle = 0;
    const scOf = new WeakMap(), outOf = new WeakMap();
    const refresh = () => {
      scEls = [...document.querySelectorAll('[data-scene]')]; tcEls = [...document.querySelectorAll('[data-timecode]')];
      fxEls = [...document.querySelectorAll('[data-fx],[data-mouse]')]; fxEls.forEach(el => scOf.set(el, el.closest('[data-scene]')));
      lastKey = '';
    };
    refresh();
    let mt = 0; const mo = new MutationObserver(() => { clearTimeout(mt); mt = setTimeout(refresh, 80); });
    mo.observe(document.body, { childList: true, subtree: true });
    preview = (i, p) => {
      document.querySelectorAll('[data-cine-pinned]').forEach(e => { e.removeAttribute('data-cine-pinned'); e.style.position = e.style.inset = e.style.zIndex = e.style.height = ''; });
      if (i == null) { forced = null; return; }
      const sc = document.querySelectorAll('[data-scene]')[i]; if (!sc) return;
      forced = { i, p }; const st = sc.dataset.scene === 'view' ? sc : sc.firstElementChild;
      st.setAttribute('data-cine-pinned', ''); st.style.position = 'fixed'; st.style.inset = '0'; st.style.zIndex = '50'; if (sc.dataset.scene === 'view') st.style.height = '100vh';
      frame();
    };
    function frame() {
      if (!alive) return; last = performance.now();
      if (window.Cine && window.Cine.paused) return;
      const dm = Math.abs(tmx - mx) + Math.abs(tmy - my);
      mx += (tmx - mx) * .08; my += (tmy - my) * .08;
      if (spot) spot.style.transform = `translate(${cx}px,${cy}px)`;
      const key = scrollY + ',' + innerWidth + ',' + innerHeight + ',' + (forced ? forced.i + ':' + forced.p : '');
      if (key === lastKey && dm < .0004 && settle <= 0) return;
      if (key !== lastKey) settle = 40; else settle--;
      lastKey = key;
      const docH = document.documentElement.scrollHeight - innerHeight; const pageP = docH > 0 ? clamp(scrollY / docH) : 0;
      const sceneP = new Map();
      scEls.forEach((s, i) => {
        if (forced && forced.i === i) { sceneP.set(s, forced.p); return; }
        const r = rawP(s); let v = smooth.has(s) ? smooth.get(s) : r; if (!Number.isFinite(v)) v = r;
        v = Math.abs(r - v) > .25 ? r : v + (r - v) * o.smooth; smooth.set(s, v); sceneP.set(s, v);
      });
      tcEls.forEach(el => {
        const f = Math.floor(pageP * o.duration * 24), ff = f % 24, s = Math.floor(f / 24) % 60, m = Math.floor(f / 1440);
        const pad = n => String(n).padStart(2, '0'); el.textContent = `${el.dataset.timecode || ''}00:${pad(m)}:${pad(s)}:${pad(ff)}`;
      });
      let shaking = false;
      fxEls.forEach(el => {
        let list = parsed.get(el); const spec = el.dataset.fx || '';
        if (!list || list.spec !== spec) { list = parse(spec); list.spec = spec; parsed.set(el, list); }
        let p = 0;
        if (el.dataset.src === 'page') p = pageP; else { const sc = scOf.has(el) ? scOf.get(el) : el.closest('[data-scene]'); p = sc ? (sceneP.get(sc) ?? rawP(sc)) : 0; }
        let tx = 0, ux = 'px', ty = 0, uy = 'px', s = 1, sx = 1, sy = 1, rot = 0, tf = false; const filt = [];
        for (const tr of list) {
          const sm = sample(tr, p); if (!sm) continue; const { v, u } = sm;
          switch (tr.prop) {
            case 'x': tx = v; ux = u || 'px'; tf = true; break;
            case 'y': ty = v; uy = u || 'px'; tf = true; break;
            case 'scale': s = v; tf = true; break;
            case 'sx': sx = v; tf = true; break;
            case 'sy': sy = v; tf = true; break;
            case 'rot': rot = v; tf = true; break;
            case 'shake': if (v > .01) { shaking = true; tx += (Math.random() - .5) * v; ty += (Math.random() - .5) * v; } tf = true; break;
            case 'opacity': el.style.opacity = v; el.style.visibility = v < .005 ? 'hidden' : 'visible'; break;
            case 'blur': filt.push(`blur(${v}px)`); break;
            case 'bright': filt.push(`brightness(${v})`); break;
            case 'inset': el.style.clipPath = `inset(${v}% 0 ${v}% 0)`; break;
            case 'insetx': el.style.clipPath = `inset(0 ${v}% 0 ${v}%)`; break;
            case 'iris': el.style.clipPath = `circle(${v}% at ${el.dataset.at || '50% 50%'})`; break;
            case 'hole': { const g = `radial-gradient(circle at ${el.dataset.at || '50% 50%'}, transparent ${v}${u || 'vmax'}, #000 ${v + .15}${u || 'vmax'})`; el.style.webkitMaskImage = g; el.style.maskImage = g; break; }
            case 'ls': el.style.letterSpacing = v + 'em'; break;
            case 'num': { const d = +(el.dataset.dec || 0); el.textContent = (el.dataset.pre || '') + v.toFixed(d) + (el.dataset.suf || ''); break; }
          }
        }
        if (filt.length) el.style.filter = filt.join(' ');
        const m = parseFloat(el.dataset.mouse || 0);
        if (tf || m) { const t = `translate3d(calc(${tx}${ux} + ${(mx * m).toFixed(2)}px),calc(${ty}${uy} + ${(my * m).toFixed(2)}px),0) scale(${s * sx},${s * sy}) rotate(${rot}deg)`; if (outOf.get(el) !== t) { outOf.set(el, t); el.style.transform = t; } }
      });
      if (shaking) settle = Math.max(settle, 2);
    }
    const loop = () => { frame(); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const iv = setInterval(() => { if (performance.now() - last > 120) frame(); }, 60);
    frame();
    return () => { mo.disconnect(); alive = false; cancelAnimationFrame(raf); clearInterval(iv); removeEventListener('pointermove', onMove); document.removeEventListener('click', onClick, true); layer.remove(); };
  }
  /* Dev/capture helper: Cine.preview(i, p) pins scene i at progress p as a fixed overlay; Cine.preview() clears. */
  window.Cine = { mount, preview: (i, p) => preview(i, p), paused: false };
})();
