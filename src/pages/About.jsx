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
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="eyebrow">Cliffside Park · NJ</span>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              A neighborhood café
              <br className="hidden sm:block" /> built on warmth.
            </h2>
            <div className="mt-7 space-y-5 leading-relaxed text-coffee-500">
              <p>
                Corner Club Cafe is a cozy neighborhood coffee shop in Cliffside
                Park, New Jersey. We built a warm, welcoming space where guests
                can enjoy handcrafted drinks, fresh food, and slow café moments.
              </p>
              <p>
                From espresso and cappuccino to Turkish tea, breakfast plates,
                pastries, sandwiches, and desserts — the menu is built around
                comfort, freshness, and everyday quality.
              </p>
              <p>
                Stop in for your morning coffee, meet friends, or settle in
                with dessert in the afternoon. We're designed to feel like
                your local favorite spot.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-coffee-100 pt-8">
              <Stat value="2024" label="Established" />
              <Stat value="7 days" label="Open weekly" />
              <Stat value="100%" label="Made fresh" />
            </div>
          </div>

          <div className="lg:col-span-6">
            <img
              src="/images/restaurant.jpg"
              alt="Corner Club Cafe interior"
              className="aspect-[4/5] w-full rounded-md object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section bg-coffee-50">
        <div className="container-x">
          <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <span className="eyebrow">What we offer</span>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
                More than coffee.
              </h2>
            </div>
            <p className="text-coffee-400 lg:col-span-5 lg:max-w-sm">
              A full café experience built around quality, comfort, and
              community — from your first sip to your last bite.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((h) => (
              <article
                key={h.title}
                className="card group relative overflow-hidden"
              >
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-md bg-coffee-50 text-coffee-700 transition group-hover:bg-coffee-700 group-hover:text-cream-50">
                  <i className={`fa-solid ${h.icon} text-lg`} aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {h.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-coffee-400">
                  {h.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="font-display text-2xl font-semibold tracking-tight text-coffee-700 sm:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-coffee-400">
        {label}
      </p>
    </div>
  );
}
