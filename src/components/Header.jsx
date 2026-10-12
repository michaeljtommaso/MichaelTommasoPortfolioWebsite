import { css } from "../lib/css";
import { socials } from "../data/portfolioData";

export default function Header() {
  return (
    <header style={css("position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:22px 4vw;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;mix-blend-mode:difference")}>
      <a href="#top" data-cut="" style={{ fontWeight: 500 }}>Michael Tommaso</a>
      <nav style={css("display:flex;gap:32px")}>
        <a href="#universe" data-cut="" data-offset="8.25">Work</a>
        <a href="#universe" data-cut="" data-offset="13.40">Projects</a>
        <a href="#universe" data-cut="" data-offset="28.64">Experience</a>
        <a href="#contact" data-cut="">Contact</a>
        <a href={socials.resume} target="_blank" rel="noreferrer">Résumé</a>
      </nav>
      <div data-src="page" data-fx="sx 0:0 1:1 lin" style={css("position:absolute;left:0;right:0;bottom:0;height:1px;background:#ece8e1;transform-origin:0 50%;transform:scaleX(0)")} />
    </header>
  );
}
