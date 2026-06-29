import { useState } from "react";
import { motion } from "motion/react";
import { socials } from "../data/portfolioData";
import { fadeUp, staggerContainer, inView } from "../utils/motion";

const fieldClass =
  "w-full rounded-2xl border border-ink/15 bg-white/70 px-4 py-3.5 text-ink placeholder:text-muted/70 transition-colors focus:border-blue focus:bg-white";

export default function Contact() {
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(socials.formspree, {
        method: "POST",
        body: new FormData(e.target),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setIsSent(true);
        e.target.reset();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="px-4 py-20 md:py-28">
      <motion.div
        variants={staggerContainer}
        {...inView}
        className="mx-auto max-w-4xl rounded-[36px] border border-ink/10 bg-paper/85 p-7 shadow-[0_28px_90px_rgba(16,32,27,0.12)] backdrop-blur-xl md:p-12"
      >
        <motion.p variants={fadeUp} className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-orange">
          Contact
        </motion.p>
        <motion.h2 variants={fadeUp} className="mt-3 text-[clamp(2.25rem,5vw,3.75rem)] font-[1000] leading-[0.9] tracking-[-0.03em] text-ink">
          Let's build something.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
          Reach out directly, follow my work, or send a note below.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {[
            { label: "LinkedIn", href: socials.linkedin },
            { label: "GitHub", href: socials.github },
            { label: "Download résumé", href: socials.resume },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-ink/15 bg-white/60 px-5 py-2.5 text-center text-sm font-bold text-ink transition-colors hover:bg-white"
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8">
          {!isSent ? (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5">
                  <span className="sr-only">Name</span>
                  <input name="name" placeholder="Name" required className={fieldClass} />
                </label>
                <label className="grid gap-1.5">
                  <span className="sr-only">Email</span>
                  <input name="email" type="email" placeholder="Email" required className={fieldClass} />
                </label>
              </div>
              <label className="grid gap-1.5">
                <span className="sr-only">Message</span>
                <textarea name="message" placeholder="What are you building?" required className={`${fieldClass} h-32 resize-none`} />
              </label>
              {error && (
                <p role="alert" className="text-sm font-medium text-orange">
                  Something went wrong — try again or email me directly.
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-ink px-6 py-3.5 text-sm font-bold text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send message"}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-ink/10 bg-white/60 py-12 text-center">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-mint/15 text-2xl text-mint">✓</div>
              <h3 className="mt-4 text-xl font-extrabold text-ink">Message sent</h3>
              <p className="mt-1 text-muted">I'll get back to you shortly.</p>
              <button
                onClick={() => setIsSent(false)}
                className="mt-5 text-sm font-semibold text-blue underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
