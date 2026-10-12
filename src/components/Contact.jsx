import { useState } from "react";
import { css, MONO } from "../lib/css";
import { socials } from "../data/portfolioData";
import { MoonDisk } from "./Universe";

const FIELD = "background:rgba(236,232,225,.05);border:0;border-bottom:1px solid rgba(236,232,225,.2);padding:16px;color:#ece8e1";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(socials.formspree, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" data-scene="view" className="c-sec" style={css("position:relative;min-height:130vh;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-start;padding:20vh 6vw 0")}>
      {/* Moonrise */}
      <div data-fx="y 0:30vh .8:0vh out" style={css("position:absolute;width:320vh;height:320vh;left:calc(50% - 160vh);top:calc(100% - 26vh)")}>
        <div style={css("position:absolute;inset:0;border-radius:50%;overflow:hidden;background:#55534e;box-shadow:0 -1vh 10vh rgba(232,163,61,.12)")}>
          <MoonDisk />
        </div>
      </div>

      <div className="c-grid" style={css("position:relative;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:6vw;align-items:start")}>
        <div style={css("display:flex;flex-direction:column;gap:28px")}>
          <span style={css(`${MONO}font-size:11px;letter-spacing:.24em;color:#e8a33d`)}>CONTACT</span>
          <h2 data-fx="opacity .1:0 .35:1; ls .1:.25 .45:-.03 out" style={css("margin:0;font-size:clamp(48px,7vw,132px);font-weight:600;font-stretch:118%;line-height:.9;letter-spacing:-.03em")}>Let's build something.</h2>
          <a href={`mailto:${socials.email}`} style={css("font-size:clamp(18px,1.6vw,26px);font-stretch:110%;border-bottom:1px solid rgba(236,232,225,.3);align-self:flex-start;padding-bottom:6px")}>{socials.email}</a>
          <div style={css(`display:flex;flex-wrap:wrap;gap:28px;${MONO}font-size:11px;letter-spacing:.16em;text-transform:uppercase`)}>
            <a href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={socials.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={socials.resume} target="_blank" rel="noreferrer">Download résumé ↗</a>
          </div>
        </div>
        <div style={css("padding-top:44px")}>
          {status === "sent" ? (
            <div style={css("display:flex;flex-direction:column;gap:10px;padding:32px;border:1px solid rgba(236,232,225,.2)")}>
              <span style={css("font-size:24px;font-weight:600;font-stretch:110%")}>Message sent</span>
              <span style={{ color: "#b5b1a8" }}>I'll get back to you shortly.</span>
              <button onClick={() => setStatus("idle")} style={css("align-self:flex-start;margin-top:8px;padding:0;border:0;background:none;color:#e8a33d;cursor:pointer;text-decoration:underline")}>Send another message</button>
            </div>
          ) : (
            <form onSubmit={submit} style={css("display:flex;flex-direction:column;gap:2px")}>
              <div className="c-fields" style={css("display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:2px")}>
                <input name="name" placeholder="Name" aria-label="Name" required style={css(FIELD)} />
                <input name="email" type="email" placeholder="Email" aria-label="Email" required style={css(FIELD)} />
              </div>
              <textarea name="message" placeholder="What are you building?" aria-label="Message" required style={css(FIELD + ";height:130px;resize:none")} />
              <button type="submit" disabled={status === "sending"} className="btn-send" style={css(`margin-top:14px;padding:16px;border:0;background:#ece8e1;color:#07080a;${MONO}font-size:12px;letter-spacing:.16em;text-transform:uppercase;cursor:pointer`)}>
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
              {status === "error" && (
                <span role="alert" style={css(`margin-top:10px;${MONO}font-size:11px;color:#e8a33d`)}>
                  Couldn't send. Email me directly at {socials.email}.
                </span>
              )}
            </form>
          )}
        </div>
      </div>

      <footer style={css(`position:absolute;left:6vw;right:6vw;bottom:5vh;display:flex;justify-content:space-between;${MONO}font-size:10px;letter-spacing:.2em;color:#07080a`)}>
        <span>MICHAEL TOMMASO · 2026</span>
        <a href="#top" data-cut="" style={{ color: "#07080a" }}>BACK TO THE MOON ↑</a>
      </footer>
    </section>
  );
}
