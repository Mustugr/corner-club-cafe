import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useCart, formatPrice } from "../context/CartContext";

export default function Cart() {
  const {
    items,
    itemCount,
    subtotal,
    tax,
    total,
    taxRate,
    increase,
    decrease,
    remove,
    clear,
  } = useCart();

  return (
    <>
      <PageHero
        kicker="Order Builder"
        title="Your Cart"
        subtitle="Review your order, update quantities, or clear it before heading back to the counter."
      >
        <Link to="/menu" className="btn-accent">
          <i className="fa-solid fa-arrow-left" /> Back to Menu
        </Link>
      </PageHero>

      <section className="section bg-cream-50">
        <div className="container-x">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="mb-6 flex items-end justify-between border-b border-coffee-100 pb-5">
                  <div>
                    <span className="eyebrow">Order</span>
                    <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
                      Current Order
                    </h2>
                  </div>
                  <span className="rounded-sm border border-coffee-100 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-coffee-500">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </span>
                </div>

                <ul className="divide-y divide-coffee-100 border-b border-coffee-100">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-semibold leading-tight tracking-tight">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm tabular-nums text-coffee-400">
                          {formatPrice(item.price)} each
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:gap-6">
                        <QtyControl
                          qty={item.qty}
                          onMinus={() => decrease(item.id)}
                          onPlus={() => increase(item.id)}
                        />
                        <span className="w-20 text-right font-semibold tabular-nums text-coffee-700">
                          {formatPrice(item.price * item.qty)}
                        </span>
                        <button
                          type="button"
                          onClick={() => remove(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="grid h-9 w-9 place-items-center rounded-sm text-coffee-400 transition hover:bg-red-50 hover:text-red-500"
                        >
                          <i className="fa-solid fa-trash" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="lg:col-span-1">
                <div className="sticky top-24 rounded-md border border-coffee-100 bg-white p-7">
                  <span className="eyebrow">Summary</span>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                    Order Summary
                  </h3>
                  <dl className="mt-6 space-y-3 text-sm">
                    <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
                    <SummaryRow
                      label={`Tax (${(taxRate * 100).toFixed(2).replace(/\.00$/, "")}%)`}
                      value={formatPrice(tax)}
                    />
                    <div className="my-5 h-px bg-coffee-100" />
                    <div className="flex items-baseline justify-between">
                      <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-coffee-500">Total</dt>
                      <dd className="font-display text-3xl font-semibold tabular-nums tracking-tight text-coffee-700">
                        {formatPrice(total)}
                      </dd>
                    </div>
                  </dl>

                  <button type="button" className="btn-accent mt-7 w-full">
                    Checkout
                  </button>
                  <button
                    type="button"
                    onClick={clear}
                    className="mt-3 w-full rounded-sm border border-coffee-100 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-coffee-500 transition hover:border-red-300 hover:text-red-500"
                  >
                    Clear Cart
                  </button>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function QtyControl({ qty, onMinus, onPlus }) {
  return (
    <div className="inline-flex items-center rounded-sm border border-coffee-100 bg-white">
      <button
        type="button"
        onClick={onMinus}
        aria-label="Decrease quantity"
        className="grid h-9 w-9 place-items-center text-coffee-500 transition hover:bg-coffee-50 hover:text-coffee-700"
      >
        <i className="fa-solid fa-minus text-xs" />
      </button>
      <span className="w-8 text-center text-sm font-semibold tabular-nums text-coffee-700">
        {qty}
      </span>
      <button
        type="button"
        onClick={onPlus}
        aria-label="Increase quantity"
        className="grid h-9 w-9 place-items-center text-coffee-500 transition hover:bg-coffee-50 hover:text-coffee-700"
      >
        <i className="fa-solid fa-plus text-xs" />
      </button>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-coffee-500">
      <dt>{label}</dt>
      <dd className="font-semibold text-coffee-700">{value}</dd>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="mx-auto max-w-xl rounded-md border border-coffee-100 bg-white p-12 text-center">
      <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-sm bg-coffee-50 text-xl text-coffee-700">
        <i className="fa-solid fa-basket-shopping" />
      </div>
      <span className="eyebrow">Empty</span>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
        Your cart is empty.
      </h2>
      <p className="mt-3 text-coffee-400">
        Browse the menu to add drinks, breakfast, sandwiches, and desserts.
      </p>
      <Link to="/menu" className="btn-accent mt-7">
        Browse Menu
      </Link>
    </div>
  );
}
