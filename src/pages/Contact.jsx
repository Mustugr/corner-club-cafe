import { useState } from "react";
import PageHero from "../components/PageHero";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", text: "Please fill in every field." });
      return;
    }
    setStatus({
      type: "success",
      text: `Thanks ${form.name.split(" ")[0]}! We'll be in touch shortly.`,
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <PageHero
        kicker="Contact"
        title="Visit or send a message"
        subtitle="We'd love to hear from you. Stop in for a coffee or drop us a note."
      />

      <section className="section bg-cream-50">
        <div className="container-x grid gap-8 lg:grid-cols-5">
          <div className="card lg:col-span-2">
            <span className="eyebrow">Visit</span>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">Stop by, say hi.</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <InfoRow icon="fa-location-dot" label="Address">
                <strong className="block text-coffee-700">Corner Club Cafe</strong>
                646 Anderson Ave
                <br />
                Cliffside Park, NJ 07010
              </InfoRow>
              <InfoRow icon="fa-clock" label="Hours">
                Mon – Sun · 7:00 AM – 9:00 PM
              </InfoRow>
              <InfoRow icon="fa-instagram" brand label="Instagram">
                <a
                  className="text-accent hover:underline"
                  href="https://www.instagram.com/cornerclub_cafe"
                  target="_blank"
                  rel="noreferrer"
                >
                  @cornerclub_cafe
                </a>
              </InfoRow>
            </ul>

            <div className="mt-7 overflow-hidden rounded-md border border-coffee-100">
              <iframe
                title="Corner Club Cafe location"
                src="https://www.google.com/maps?q=Corner+Club,+646+Anderson+Ave,+Cliffside+Park,+NJ+07010&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="card lg:col-span-3">
            <span className="eyebrow">Get in touch</span>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">Send us a message.</h2>
            <p className="mt-3 text-sm text-coffee-400">
              Questions, catering inquiries, or feedback — drop a note and we'll
              get back to you.
            </p>

            <form className="mt-6 space-y-4" onSubmit={submit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    className="input"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="input"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="label" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={6}
                  className="input resize-none"
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Write your message"
                  required
                />
              </div>
              <button type="submit" className="btn-accent w-full sm:w-auto">
                <i className="fa-solid fa-paper-plane" /> Send Message
              </button>

              {status && (
                <p
                  role="status"
                  className={`rounded-sm border px-4 py-3 text-sm ${
                    status.type === "success"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {status.text}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({ icon, brand, label, children }) {
  return (
    <li className="flex items-start gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-coffee-50 text-coffee-700">
        <i className={`${brand ? "fa-brands" : "fa-solid"} ${icon}`} aria-hidden="true" />
      </span>
      <div className="text-coffee-500">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-coffee-400">{label}</p>
        <div className="mt-1.5 leading-relaxed">{children}</div>
      </div>
    </li>
  );
}
