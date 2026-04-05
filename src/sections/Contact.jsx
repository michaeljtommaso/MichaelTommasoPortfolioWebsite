import { useState } from "react";

export default function Contact() {
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const res = await fetch("https://formspree.io/f/xdojndzk", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    setLoading(false);

    if (res.ok) {
      setIsSent(true);
      e.target.reset();
    }
  };

  return (
    <section id="contact" className="border-b border-white/10 py-24 bg-[linear-gradient(to_right,#0a0612_0%,#000000_40%,#000000_60%,#0a0612_100%)]">
      {/* HEADER */}
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="text-sm tracking-widest text-white/40 py-2">CONTACT</p>
        <h1 className="text-5xl font-semibold">Let’s connect</h1>
        <p className="mt-4 text-white/60 py-2">
          Reach out by email or explore my background through LinkedIn.
        </p>
      </div>

      {/* CARD */}
      <div className="mx-auto max-w-6xl px-6 md:px-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        
        {/* BUTTONS */}
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="https://www.linkedin.com/in/michaeltommaso" target="_blank" className="btn w-full text-center sm:w-auto">LinkedIn</a>
          <a href="https://github.com/michaeljtommaso" target="_blank" className="btn w-full text-center sm:w-auto">Github</a>
          <a href="/public/Michael_Tommaso_Resume.docx.pdf" target="_blank" className="btn w-full text-center sm:w-auto">Download My Resume</a>
        </div>

        {/* FORM OR SUCCESS */}
        {!isSent ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              name="name"
              placeholder="Name..."
              required
              className="input"
            />

            <input
              name="email"
              type="email"
              placeholder="Email..."
              required
              className="input"
            />

            <textarea
              name="message"
              placeholder="Write a message..."
              required
              className="input h-32 resize-none"
            />

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-4 text-5xl">✓</div>
            <h3 className="text-xl font-medium">Message sent</h3>
            <p className="text-white/50 mt-2">
              I’ll get back to you shortly.
            </p>

            <button
              onClick={() => setIsSent(false)}
              className="mt-6 text-sm text-white/60 underline"
            >
              Send another message
            </button>
          </div>
        )}
      </div>
    </section>
  );
}