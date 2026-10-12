/* css("position:absolute;left:0") → React style object.
 * Lets the scene keep the handoff's inline styles verbatim (they are the spec).
 * Values must not contain ";" (none of the scene's gradients do). */
const cache = new Map();

export function css(str) {
  let o = cache.get(str);
  if (o) return o;
  o = {};
  for (const decl of str.split(";")) {
    const i = decl.indexOf(":");
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    const key = prop.startsWith("--") ? prop : prop.replace(/^-(webkit|moz|ms)-/, (_, v) => v + "-").replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^(webkit|moz)/, (v) => v[0].toUpperCase() + v.slice(1));
    o[key] = decl.slice(i + 1).trim();
  }
  cache.set(str, o);
  return o;
}

/* Shared type styles from the handoff tokens. */
export const MONO = "font-family:'JetBrains Mono',monospace;";
