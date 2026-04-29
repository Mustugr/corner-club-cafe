export default function PageHero({ kicker, title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden border-b border-coffee-800/40 bg-coffee-700 text-cream-50">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 15%, rgba(255,255,255,0.6) 0, transparent 35%), radial-gradient(circle at 80% 90%, rgba(201,150,63,0.8) 0, transparent 40%)",
        }}
        aria-hidden="true"
      />
      <div className="container-x relative grid items-end gap-10 py-24 sm:py-32 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {kicker && <span className="eyebrow">{kicker}</span>}
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-cream-50 sm:text-6xl lg:text-7xl">
            {title}
          </h1>
        </div>
        {(subtitle || children) && (
          <div className="lg:col-span-4">
            {subtitle && (
              <p className="max-w-md text-base leading-relaxed text-cream-100/75">
                {subtitle}
              </p>
            )}
            {children && (
              <div className="mt-6 flex flex-wrap gap-3">{children}</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
