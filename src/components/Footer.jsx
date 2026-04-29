export default function Footer() {
  return (
    <footer className="mt-auto bg-coffee-700 text-cream-100">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Corner Club Cafe"
              className="h-12 w-12 rounded-full object-cover ring-2 ring-cream-100/30"
            />
            <span className="font-display text-xl font-semibold text-cream-50">
              Corner Club Cafe
            </span>
          </div>
          <p className="mt-4 text-sm text-cream-100/80">
            A bright, cozy neighborhood café in Cliffside Park serving handcrafted
            coffee, fresh food, and warm moments.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-cream-50">Visit</h4>
          <p className="mt-4 text-sm leading-relaxed text-cream-100/80">
            646 Anderson Ave
            <br />
            Cliffside Park, NJ 07010
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-cream-50">Hours</h4>
          <p className="mt-4 text-sm leading-relaxed text-cream-100/80">
            Mon – Sun
            <br />
            7:00 AM – 9:00 PM
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-cream-50">Follow</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href="https://www.instagram.com/cornerclub_cafe"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-cream-100/85 transition hover:text-accent"
              >
                <i className="fa-brands fa-instagram" aria-hidden="true" /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@corner.club5"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-cream-100/85 transition hover:text-accent"
              >
                <i className="fa-brands fa-tiktok" aria-hidden="true" /> TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream-100/10 py-5">
        <p className="container-x text-center text-xs uppercase tracking-widest text-cream-100/60">
          © 2026 Corner Club Cafe — Cliffside Park, NJ
        </p>
      </div>
    </footer>
  );
}
