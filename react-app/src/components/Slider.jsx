import { useEffect, useRef, useState } from "react";

const SLIDES = [
  "/images/food1.jpg",
  "/images/food2.jpg",
  "/images/food3.jpg",
  "/images/food4.jpg",
  "/images/food5.jpg",
  "/images/food6.jpg",
];

const AUTOPLAY_MS = 4500;

export default function Slider() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const go = (next) => {
    setIndex((i) => (next + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, []);

  const pause = () => clearInterval(timerRef.current);
  const resume = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
  };

  return (
    <div
      className="relative overflow-hidden rounded-3xl shadow-soft"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {SLIDES.map((src, i) => (
          <div
            key={src}
            className="relative h-[55vw] max-h-[520px] min-h-[280px] w-full shrink-0"
          >
            <img
              src={src}
              alt={`Cafe gallery ${i + 1}`}
              className="h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-coffee-700 shadow-soft backdrop-blur transition hover:bg-white"
      >
        <i className="fa-solid fa-chevron-left" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-coffee-700 shadow-soft backdrop-blur transition hover:bg-white"
      >
        <i className="fa-solid fa-chevron-right" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-8 bg-accent" : "w-2.5 bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
