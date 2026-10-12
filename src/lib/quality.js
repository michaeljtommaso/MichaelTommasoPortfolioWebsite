/* Graphics quality: "full" or "lite". Stored on <html data-quality> so CSS and the
 * engine both read it. Lite keeps the whole scroll story and art, and drops the
 * continuous GPU work: mouse parallax, surface spin, vignette, header blend, text blur.
 *
 * Order of precedence: ?quality= URL param > the visitor's saved toggle > device hints.
 * The engine also downgrades to lite once per visit if real scrolling runs under ~40 fps
 * (see reportFrames), unless the visitor chose a mode themselves. */

const KEY = "orbit-quality";
const listeners = new Set();

function saved() {
  try { return localStorage.getItem(KEY); } catch { return null; }
}

function deviceHint() {
  const n = navigator;
  const weak = (n.deviceMemory && n.deviceMemory <= 4) || (n.hardwareConcurrency && n.hardwareConcurrency <= 4) || n.connection?.saveData;
  return weak ? "lite" : "full";
}

const forced = new URLSearchParams(location.search).get("quality");
const chosen = forced === "lite" || forced === "full" ? forced : saved();
let mode = chosen || deviceHint();
document.documentElement.dataset.quality = mode;

export const getQuality = () => mode;

export function setQuality(next, { remember = false } = {}) {
  if (remember) { try { localStorage.setItem(KEY, next); } catch { /* private mode: session only */ } }
  if (next === mode) return;
  mode = next;
  document.documentElement.dataset.quality = mode;
  listeners.forEach((fn) => fn(mode));
}

export function onQuality(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/* Auto-downgrade: fed frame intervals (ms) from frames where the scene actually moved.
 * ponytail: one decision per visit from the first ~40 moving frames; no auto-upgrade, so it can't flap. */
let samples = [];
let decided = !!chosen;
export function reportFrame(dt) {
  if (decided || mode === "lite") return;
  samples.push(dt);
  if (samples.length < 40) return;
  decided = true;
  samples.sort((a, b) => a - b);
  if (samples[samples.length >> 1] > 25) setQuality("lite");
  samples = [];
}
