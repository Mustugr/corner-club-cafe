import { useEffect, useMemo, useState } from "react";
import PageHero from "../components/PageHero";
import { tableSections, cardSections, allCategories } from "../data/menu";
import { useCart, formatPrice } from "../context/CartContext";

export default function Menu() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const handleAdd = (id, name, price) => {
    addItem({ id, name, price });
    setToast(`${name} added to cart`);
  };

  const visibleTableSections = useMemo(() => {
    return tableSections
      .filter((s) => active === "all" || active === s.id)
      .map((s) => ({
        ...s,
        rows: s.rows.filter((r) =>
          query.trim() === ""
            ? true
            : r.name.toLowerCase().includes(query.toLowerCase())
        ),
      }))
      .filter((s) => s.rows.length > 0);
  }, [active, query]);

  const visibleCardSections = useMemo(() => {
    return cardSections
      .filter((s) => active === "all" || active === s.id)
      .map((s) => ({
        ...s,
        items: s.items.filter((it) =>
          query.trim() === ""
            ? true
            : it.name.toLowerCase().includes(query.toLowerCase())
        ),
      }))
      .filter((s) => s.items.length > 0);
  }, [active, query]);

  const isEmpty =
    visibleTableSections.length === 0 && visibleCardSections.length === 0;

  return (
    <>
      <PageHero
        kicker="Our Menu"
        title="Fresh, handcrafted, delicious"
        subtitle="Coffee, tea, breakfast, sandwiches, pastries, and desserts — all made with care."
      />

      <section className="sticky top-[68px] z-30 border-b border-coffee-100/70 bg-cream-50/95 backdrop-blur">
        <div className="container-x flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="relative md:w-72">
            <i className="fa-solid fa-magnifying-glass pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-coffee-300" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the menu…"
              className="input pl-10"
            />
          </div>
          <div className="-mx-2 flex gap-2 overflow-x-auto px-2 no-scrollbar md:mx-0 md:px-0">
            <CategoryChip
              active={active === "all"}
              onClick={() => setActive("all")}
              icon="fa-list"
              label="All"
            />
            {allCategories.map((c) => (
              <CategoryChip
                key={c.id}
                active={active === c.id}
                onClick={() => setActive(c.id)}
                icon={c.icon}
                label={c.title}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream-50">
        <div className="container-x space-y-16">
          {isEmpty && (
            <p className="rounded-2xl bg-white p-8 text-center text-coffee-400 shadow-card">
              Nothing matches that search. Try a different keyword or category.
            </p>
          )}

          {visibleTableSections.map((s) => (
            <TableSection key={s.id} section={s} onAdd={handleAdd} />
          ))}

          {visibleCardSections.map((s) => (
            <CardSection key={s.id} section={s} onAdd={handleAdd} />
          ))}
        </div>
      </section>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-coffee-700 px-5 py-3 text-sm font-medium text-cream-50 shadow-soft"
        >
          <i className="fa-solid fa-check mr-2 text-accent" /> {toast}
        </div>
      )}
    </>
  );
}

function CategoryChip({ active, onClick, icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
        active
          ? "border-coffee-600 bg-coffee-600 text-cream-50"
          : "border-coffee-100 bg-white text-coffee-500 hover:border-coffee-300"
      }`}
    >
      <i className={`fa-solid ${icon}`} aria-hidden="true" />
      {label}
    </button>
  );
}

function SectionHeader({ section }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/10 text-accent">
            <i className={`fa-solid ${section.icon}`} aria-hidden="true" />
          </span>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            {section.title}
          </h2>
        </div>
        {section.note && (
          <p className="mt-2 text-sm text-coffee-400">{section.note}</p>
        )}
      </div>
    </div>
  );
}

function TableSection({ section, onAdd }) {
  return (
    <article id={section.id}>
      <SectionHeader section={section} />
      <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-coffee-100/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-coffee-50 text-xs uppercase tracking-wide text-coffee-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Drink</th>
                {section.sizes.map((sz) => (
                  <th key={sz} className="px-5 py-4 font-semibold">
                    {sz}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-coffee-50">
              {section.rows.map((row) => (
                <tr key={row.name} className="transition hover:bg-cream-50/60">
                  <td className="px-5 py-4 font-medium text-coffee-700">
                    {row.name}
                  </td>
                  {row.prices.map((p, i) => (
                    <td key={i} className="px-5 py-4">
                      {p == null ? (
                        <span className="text-coffee-200">—</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            onAdd(
                              `${section.id}:${row.name}:${section.sizes[i]}`,
                              `${row.name} (${section.sizes[i]})`,
                              p
                            )
                          }
                          className="group inline-flex items-center gap-2 rounded-full border border-coffee-100 bg-cream-50 px-3 py-1.5 text-sm font-semibold text-coffee-700 transition hover:border-accent hover:bg-accent hover:text-white"
                        >
                          <span>{formatPrice(p)}</span>
                          <i className="fa-solid fa-plus text-[11px] opacity-60 transition group-hover:opacity-100" />
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
}

function CardSection({ section, onAdd }) {
  return (
    <article id={section.id}>
      <SectionHeader section={section} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {section.items.map((item) => (
          <div
            key={item.name}
            className="group flex flex-col rounded-2xl bg-white p-5 shadow-card ring-1 ring-coffee-100/60 transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-semibold leading-tight">
                {item.name}
              </h3>
              <span className="shrink-0 rounded-full bg-coffee-50 px-3 py-1 text-sm font-semibold text-coffee-700">
                {formatPrice(item.price)}
              </span>
            </div>
            {item.desc && (
              <p className="mt-2 text-sm leading-relaxed text-coffee-400">
                {item.desc}
              </p>
            )}
            <button
              type="button"
              onClick={() =>
                onAdd(`${section.id}:${item.name}`, item.name, item.price)
              }
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-coffee-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cream-50 transition hover:bg-accent"
            >
              <i className="fa-solid fa-plus" /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </article>
  );
}
