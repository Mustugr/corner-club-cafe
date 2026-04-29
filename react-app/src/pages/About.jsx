import PageHero from "../components/PageHero";

const HIGHLIGHTS = [
  {
    icon: "fa-mug-hot",
    title: "Specialty drinks",
    body: "Espresso, cappuccino, mocha, Turkish coffee, premium tea, smoothies, and milkshakes.",
  },
  {
    icon: "fa-utensils",
    title: "Fresh kitchen",
    body: "Breakfast plates, sandwiches, salads, and bowls prepared daily with quality ingredients.",
  },
  {
    icon: "fa-cake-candles",
    title: "Pastries & desserts",
    body: "Croissants, cakes, tiramisu, macarons, waffles, and seasonal desserts to share.",
  },
  {
    icon: "fa-couch",
    title: "Welcoming space",
    body: "Bright, modern, minimalist café made for friends, focused work, and slow afternoons.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        kicker="About"
        title="Our Story"
        subtitle="Get to know the people and the place behind Corner Club Cafe."
      />

      <section className="section bg-cream-50">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Cliffside Park, NJ
            </p>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              A neighborhood café built on warmth
            </h2>
            <div className="mt-6 space-y-5 text-coffee-500">
              <p>
                Corner Club Cafe is a cozy neighborhood coffee shop located in
                Cliffside Park, New Jersey. We created a warm and welcoming
                space where guests can enjoy handcrafted drinks, fresh food,
                and relaxing café moments.
              </p>
              <p>
                From espresso and cappuccino to Turkish tea, breakfast plates,
                pastries, sandwiches, and desserts, our menu is built around
                comfort, freshness, and everyday quality.
              </p>
              <p>
                Whether you're stopping by for your morning coffee, meeting
                friends, or relaxing with dessert in the afternoon, Corner
                Club Cafe is designed to feel like your local favorite spot.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-3xl bg-accent/15" />
            <img
              src="/images/restaurant.jpg"
              alt="Corner Club Cafe interior"
              className="relative h-full w-full rounded-3xl object-cover shadow-soft"
            />
          </div>
        </div>
      </section>

      <section className="section bg-coffee-50">
        <div className="container-x">
          <div className="section-heading">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              What we offer
            </p>
            <h2>More than coffee</h2>
            <p>A full café experience built around quality, comfort, and community.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.title}
                className="card transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-accent">
                  <i className={`fa-solid ${h.icon}`} aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-coffee-400">
                  {h.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
