import { Link } from "react-router-dom";
import Slider from "../components/Slider";

const FEATURES = [
  {
    icon: "fa-mug-hot",
    title: "Specialty Coffee",
    body: "Espresso, cappuccino, mocha, Turkish coffee — handcrafted by people who care about every cup.",
  },
  {
    icon: "fa-utensils",
    title: "Fresh Food",
    body: "Breakfast plates, sandwiches, pastries, cakes, and desserts prepared daily for everyday comfort.",
  },
  {
    icon: "fa-couch",
    title: "Cozy Atmosphere",
    body: "A bright, modern café made for friends, focused work, or slow afternoons with your favorite drink.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Gallery />
      <CallToAction />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-hero-gradient" aria-hidden="true" />

      <div className="container-x py-28 sm:py-36 lg:py-44">
        <div className="max-w-2xl text-cream-50">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Warm coffee. Cozy moments.
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-cream-50 sm:text-5xl lg:text-6xl">
            Welcome to Corner Club Cafe
          </h1>
          <p className="mt-5 max-w-xl text-base text-cream-100/90 sm:text-lg">
            Your neighborhood café in Cliffside Park serving handcrafted coffee,
            fresh breakfast, pastries, tea, smoothies, and desserts in a bright,
            welcoming space.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/menu" className="btn-accent">
              <i className="fa-solid fa-book-open" /> View Menu
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-cream-50/80 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-cream-50 transition hover:bg-cream-50 hover:text-coffee-700"
            >
              <i className="fa-solid fa-location-dot" /> Visit Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="section bg-cream-50">
      <div className="container-x">
        <div className="section-heading">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Why guests love us
          </p>
          <h2>Crafted with care, every day</h2>
          <p>Simple, fresh, and welcoming — the way a neighborhood café should feel.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="card group relative overflow-hidden"
            >
              <span
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <div className="mb-6 grid h-12 w-12 place-items-center rounded-md bg-coffee-50 text-coffee-700 transition group-hover:bg-coffee-700 group-hover:text-cream-50">
                <i className={`fa-solid ${f.icon} text-lg`} aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-coffee-400">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="section bg-coffee-50">
      <div className="container-x">
        <div className="section-heading">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Gallery
          </p>
          <h2>Take a look inside</h2>
          <p>A few moments from Corner Club Cafe.</p>
        </div>
        <Slider />
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="section bg-cream-50">
      <div className="container-x">
        <div className="overflow-hidden rounded-3xl bg-coffee-700 px-8 py-12 shadow-soft sm:px-12 sm:py-16">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-cream-50 sm:text-4xl">
                Start your day at Corner Club Cafe
              </h2>
              <p className="mt-3 text-cream-100/80">
                Coffee, tea, breakfast, pastries, and more — open 7 days a week
                in Cliffside Park.
              </p>
            </div>
            <Link to="/contact" className="btn-accent shrink-0">
              <i className="fa-solid fa-route" /> Get Directions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
