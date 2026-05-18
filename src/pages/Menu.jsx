import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useCart, formatPrice } from "../context/CartContext";
import { api } from "../lib/api";

export default function Menu() {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(null);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState(null);
  const tabsRef = useRef(null);
  const { addItem, itemCount } = useCart();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .getMenu()
      .then((data) => {
        if (cancelled) return;
        setMenu(data);
        setActive(data.allCategories[0]?.id ?? null);
        setError(null);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const isSearching = query.trim() !== "";

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const handleAdd = (sku, name, price) => {
    addItem({ sku, name, price });
    setToast(name);
  };

  const matches = (text) =>
    !isSearching || text.toLowerCase().includes(query.toLowerCase());

  const tableSections = menu?.tableSections ?? [];
  const cardSections = menu?.cardSections ?? [];
  const allCategories = menu?.allCategories ?? [];

  const visibleTableSections = useMemo(() => {
    return tableSections
      .filter((s) => isSearching || s.id === active)
      .map((s) => ({ ...s, rows: s.rows.filter((r) => matches(r.name)) }))
      .filter((s) => s.rows.length > 0);
  }, [tableSections, active, query]);

  const visibleCardSections = useMemo(() => {
    return cardSections
      .filter((s) => isSearching || s.id === active)
      .map((s) => ({ ...s, items: s.items.filter((it) => matches(it.name)) }))
      .filter((s) => s.items.length > 0);
  }, [cardSections, active, query]);

  const isEmpty =
    visibleTableSections.length === 0 && visibleCardSections.length === 0;

  const visibleCount =
    visibleTableSections.reduce((n, s) => n + s.rows.length, 0) +
    visibleCardSections.reduce((n, s) => n + s.items.length, 0);

  const selectCategory = (id) => {
    setActive(id);
    setQuery("");
  };

  return (
    <>
      <PageHero
        kicker="Our Menu"
        title="Fresh, handcrafted, delicious"
        subtitle="Coffee, tea, breakfast, sandwiches, pastries, and desserts — all made with care."
      />

      <section className="sticky top-[68px] z-30 border-b border-coffee-100 bg-cream-50/95 backdrop-blur">
        <div className="container-x py-4">
          <div className="relative w-full">
            <i className="fa-solid fa-magnifying-glass pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-coffee-300" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the menu"
              className="input pl-11 pr-11"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-sm text-coffee-400 transition hover:bg-coffee-50 hover:text-coffee-700"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            )}
          </div>
        </div>

        {!isSearching && allCategories.length > 0 && (
          <div
            ref={tabsRef}
            className="container-x flex gap-7 overflow-x-auto border-t border-coffee-100/70 no-scrollbar"
          >
            {allCategories.map((c) => (
              <CategoryTab
                key={c.id}
                active={active === c.id}
                onClick={() => selectCategory(c.id)}
                label={c.title}
              />
            ))}
          </div>
        )}

        {isSearching && !isEmpty && (
          <div className="container-x flex items-center justify-between gap-3 border-t border-coffee-100 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-coffee-500">
            <span>
              <span className="text-coffee-700">{visibleCount}</span> result
              {visibleCount === 1 ? "" : "s"} for "
              <span className="text-coffee-700">{query}</span>"
            </span>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-accent transition hover:text-accent-dark"
            >
              Clear
            </button>
          </div>
        )}
      </section>

      <section className="section bg-cream-50">
        <div className="container-x space-y-20">
          {loading && <MenuLoading />}

          {error && !loading && (
            <MenuError message={error} onRetry={() => window.location.reload()} />
          )}

          {!loading && !error && isEmpty && (
            <div className="mx-auto max-w-md py-16 text-center">
              <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-sm bg-coffee-50 text-coffee-700">
                <i className="fa-solid fa-magnifying-glass" />
              </div>
              <p className="font-display text-2xl font-semibold tracking-tight">
                No matches found.
              </p>
              <p className="mt-2 text-coffee-400">
                Try a different keyword, or pick a category below.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActive(allCategories[0]?.id ?? null);
                }}
                className="btn-accent mt-7"
              >
                Browse Menu
              </button>
            </div>
          )}

          {!loading && !error && visibleTableSections.map((s) => (
            <TableSection key={s.id} section={s} onAdd={handleAdd} />
          ))}

          {!loading && !error && visibleCardSections.map((s) => (
            <CardSection key={s.id} section={s} onAdd={handleAdd} />
          ))}
        </div>
      </section>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-sm bg-coffee-700 py-3 pl-5 pr-3 text-cream-50 shadow-soft"
        >
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-check text-accent" />
            <span className="text-sm font-medium">
              Added — <span className="text-cream-50">{toast}</span>
            </span>
          </span>
          <Link
            to="/cart"
            className="rounded-sm bg-accent px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-accent-dark"
          >
            View Cart{itemCount > 0 && ` (${itemCount})`}
          </Link>
        </div>
      )}
    </>
  );
}

function MenuLoading() {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-coffee-200 border-t-coffee-700" />
      <p className="text-coffee-500">Loading the menu…</p>
    </div>
  );
}

function MenuError({ message, onRetry }) {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-sm bg-red-50 text-red-500">
        <i className="fa-solid fa-triangle-exclamation" />
      </div>
      <p className="font-display text-2xl font-semibold tracking-tight">
        Couldn't load the menu.
      </p>
      <p className="mt-2 text-coffee-400">{message}</p>
      <button type="button" onClick={onRetry} className="btn-accent mt-7">
        Try again
      </button>
    </div>
  );
}

function CategoryTab({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative shrink-0 py-4 text-[12px] font-bold uppercase tracking-[0.2em] transition-colors ${
        active
          ? "text-coffee-700 after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-coffee-700"
          : "text-coffee-400 hover:text-coffee-700"
      }`}
    >
      {label}
    </button>
  );
}

function SectionHeader({ section }) {
  return (
    <header className="mb-10 max-w-2xl">
      <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        {section.title}
      </h2>
      {section.note && (
        <p className="mt-4 text-coffee-400">{section.note}</p>
      )}
    </header>
  );
}

function TableSection({ section, onAdd }) {
  return (
    <article id={section.id}>
      <SectionHeader section={section} />

      {/* Desktop: clean borderless rows */}
      <ul className="hidden divide-y divide-coffee-100 border-y border-coffee-100 md:block">
        {section.rows.map((row) => (
          <li
            key={row.name}
            className="grid grid-cols-[1fr_auto] items-center gap-6 py-5"
          >
            <p className="font-display text-lg font-semibold tracking-tight text-coffee-700">
              {row.name}
            </p>
            <div className="flex flex-wrap items-center justify-end gap-2">
              {row.prices.map((p, i) =>
                p == null ? null : (
                  <SizePriceButton
                    key={i}
                    size={section.sizes[i]}
                    price={p}
                    onClick={() =>
                      onAdd(
                        row.skus[i],
                        `${row.name} (${section.sizes[i]})`,
                        p
                      )
                    }
                  />
                )
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Mobile: stacked */}
      <ul className="divide-y divide-coffee-100 border-y border-coffee-100 md:hidden">
        {section.rows.map((row) => (
          <li key={row.name} className="py-5">
            <p className="font-display text-base font-semibold tracking-tight text-coffee-700">
              {row.name}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {row.prices.map((p, i) =>
                p == null ? null : (
                  <SizePriceButton
                    key={i}
                    size={section.sizes[i]}
                    price={p}
                    onClick={() =>
                      onAdd(
                        row.skus[i],
                        `${row.name} (${section.sizes[i]})`,
                        p
                      )
                    }
                  />
                )
              )}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SizePriceButton({ size, price, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-2 rounded-sm border border-coffee-200 bg-white px-3 py-1.5 transition hover:border-coffee-700 hover:bg-coffee-700"
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-coffee-400 transition group-hover:text-cream-50/70">
        {size}
      </span>
      <span className="text-sm font-semibold tabular-nums text-coffee-700 transition group-hover:text-cream-50">
        {formatPrice(price)}
      </span>
    </button>
  );
}

function CardSection({ section, onAdd }) {
  return (
    <article id={section.id}>
      <SectionHeader section={section} />
      <ul className="grid divide-y divide-coffee-100 border-y border-coffee-100 sm:grid-cols-2 sm:gap-x-12 sm:divide-y-0">
        {section.items.map((item, i) => (
          <li
            key={item.name}
            className={`flex items-start justify-between gap-6 py-6 ${
              i >= 2 ? "sm:border-t sm:border-coffee-100" : ""
            }`}
          >
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-lg font-semibold leading-tight tracking-tight text-coffee-700">
                {item.name}
              </h3>
              {item.desc && (
                <p className="mt-1.5 text-sm leading-relaxed text-coffee-400">
                  {item.desc}
                </p>
              )}
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <span className="font-display text-xl font-semibold tabular-nums tracking-tight text-coffee-700">
                {formatPrice(item.price)}
              </span>
              <button
                type="button"
                onClick={() => onAdd(item.sku, item.name, item.price)}
                aria-label={`Add ${item.name} to cart`}
                className="inline-flex items-center gap-1.5 rounded-sm bg-coffee-700 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cream-50 transition hover:bg-accent"
              >
                <i className="fa-solid fa-plus text-[10px]" />
                Add
              </button>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
