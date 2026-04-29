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

      <div className="container-x flex min-h-[88vh] flex-col justify-end py-24 sm:py-32 lg:min-h-[92vh]">
        <div className="max-w-3xl text-cream-50">
          <span className="eyebrow">Cliffside Park · Est. 2024</span>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-cream-50 sm:text-7xl lg:text-[88px]">
            Coffee, made
            <br />
            for your corner.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-cream-100/85 sm:text-lg">
            Handcrafted espresso, fresh breakfast, pastries, and desserts —
            served daily in a bright, welcoming space.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/menu" className="btn-accent">
              View Menu
            </Link>
            <Link to="/contact" className="btn-ghost-light">
              Visit Us
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-0 hidden translate-x-0 lg:flex">
        <div className="container-x flex justify-end">
          <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-cream-50/70">
            <span className="h-px w-10 bg-cream-50/40" />
            Open daily · 7AM – 9PM
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
        <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="eyebrow">Why guests love us</span>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              Crafted with care,
              <br className="hidden sm:block" /> every single day.
            </h2>
          </div>
          <p className="text-coffee-400 lg:col-span-5 lg:max-w-sm">
            Simple, fresh, and welcoming — the way a neighborhood café should
            feel. We focus on quality you can taste in every cup, every plate.
          </p>
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
        <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">Gallery</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Take a look inside.
            </h2>
          </div>
          <p className="max-w-sm text-coffee-400">
            A few moments from Corner Club Cafe — drinks, light, and the room
            you'll want to settle into.
          </p>
        </div>
        <Slider />
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="bg-coffee-700 text-cream-50">
      <div className="container-x grid items-center gap-10 py-24 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <span className="eyebrow">Visit</span>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-cream-50 sm:text-5xl lg:text-6xl">
            Start your day at
            <br className="hidden sm:block" /> Corner Club Cafe.
          </h2>
          <p className="mt-5 max-w-xl text-cream-100/75">
            Coffee, tea, breakfast, pastries, and more — open seven days a week
            in Cliffside Park.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          <Link to="/contact" className="btn-accent">
            Get Directions
          </Link>
          <Link to="/menu" className="btn-ghost-light">
            View Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
