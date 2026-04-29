export default function Footer() {
  return (
    <footer className="mt-auto bg-coffee-700 text-cream-100">
      <div className="container-x py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="font-display text-3xl font-semibold tracking-tight text-cream-50 sm:text-4xl">
              Corner Club Cafe
            </span>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream-100/70">
              A bright, cozy neighborhood café in Cliffside Park serving
              handcrafted coffee, fresh food, and warm moments — every day.
            </p>
          </div>

          <FooterCol title="Visit" className="md:col-span-3">
            <p className="leading-relaxed">
              646 Anderson Ave
              <br />
              Cliffside Park, NJ 07010
            </p>
          </FooterCol>

          <FooterCol title="Hours" className="md:col-span-2">
            <p className="leading-relaxed">
              Mon – Sun
              <br />
              7:00 AM – 9:00 PM
            </p>
          </FooterCol>

          <FooterCol title="Follow" className="md:col-span-2">
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.instagram.com/cornerclub_cafe"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-accent"
                >
                  <i className="fa-brands fa-instagram" aria-hidden="true" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@corner.club5"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-accent"
                >
                  <i className="fa-brands fa-tiktok" aria-hidden="true" /> TikTok
                </a>
              </li>
            </ul>
          </FooterCol>
        </div>
      </div>
      <div className="border-t border-cream-100/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-[11px] uppercase tracking-[0.2em] text-cream-100/50 sm:flex-row">
          <p>© 2026 Corner Club Cafe</p>
          <p>Cliffside Park · New Jersey</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, className = "", children }) {
  return (
    <div className={className}>
      <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-cream-50">
        {title}
      </h4>
      <div className="mt-5 text-sm text-cream-100/70">{children}</div>
    </div>
  );
}
