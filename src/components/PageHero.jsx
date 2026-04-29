export default function PageHero({ kicker, title, subtitle, children }) {
  return (
    <section className="bg-coffee-700 text-cream-50">
      <div className="container-x py-16 sm:py-20 text-center">
        {kicker && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {kicker}
          </p>
        )}
        <h1 className="font-display text-4xl font-semibold text-cream-50 sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-cream-100/85">{subtitle}</p>
        )}
        {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    </section>
  );
}
