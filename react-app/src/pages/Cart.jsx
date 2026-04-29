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
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-display text-2xl font-semibold">
                    Current Order
                  </h2>
                  <span className="rounded-full bg-coffee-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-coffee-500">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </span>
                </div>

                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-coffee-100/60 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-semibold leading-tight">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-coffee-400">
                          {formatPrice(item.price)} each
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:gap-6">
                        <QtyControl
                          qty={item.qty}
                          onMinus={() => decrease(item.id)}
                          onPlus={() => increase(item.id)}
                        />
                        <span className="w-20 text-right font-semibold text-coffee-700">
                          {formatPrice(item.price * item.qty)}
                        </span>
                        <button
                          type="button"
                          onClick={() => remove(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="grid h-9 w-9 place-items-center rounded-full text-coffee-400 transition hover:bg-red-50 hover:text-red-500"
                        >
                          <i className="fa-solid fa-trash" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="lg:col-span-1">
                <div className="card sticky top-24">
                  <h3 className="font-display text-xl font-semibold">
                    Order Summary
                  </h3>
                  <dl className="mt-5 space-y-3 text-sm">
                    <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
                    <SummaryRow
                      label={`Tax (${(taxRate * 100).toFixed(2).replace(/\.00$/, "")}%)`}
                      value={formatPrice(tax)}
                    />
                    <div className="my-4 h-px bg-coffee-100" />
                    <div className="flex items-baseline justify-between">
                      <dt className="font-display text-lg font-semibold">Total</dt>
                      <dd className="font-display text-2xl font-semibold text-coffee-700">
                        {formatPrice(total)}
                      </dd>
                    </div>
                  </dl>

                  <button type="button" className="btn-accent mt-6 w-full">
                    <i className="fa-solid fa-credit-card" /> Checkout
                  </button>
                  <button
                    type="button"
                    onClick={clear}
                    className="mt-3 w-full rounded-full border-2 border-coffee-100 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-coffee-500 transition hover:border-red-300 hover:text-red-500"
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
    <div className="inline-flex items-center rounded-full bg-cream-50 ring-1 ring-coffee-100">
      <button
        type="button"
        onClick={onMinus}
        aria-label="Decrease quantity"
        className="grid h-9 w-9 place-items-center rounded-full text-coffee-500 transition hover:bg-coffee-100"
      >
        <i className="fa-solid fa-minus text-xs" />
      </button>
      <span className="w-8 text-center text-sm font-semibold text-coffee-700">
        {qty}
      </span>
      <button
        type="button"
        onClick={onPlus}
        aria-label="Increase quantity"
        className="grid h-9 w-9 place-items-center rounded-full text-coffee-500 transition hover:bg-coffee-100"
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
    <div className="card mx-auto max-w-xl text-center">
      <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-2xl text-accent">
        <i className="fa-solid fa-basket-shopping" />
      </div>
      <h2 className="font-display text-2xl font-semibold">Your cart is empty</h2>
      <p className="mt-2 text-coffee-400">
        Browse the menu to add drinks, breakfast, sandwiches, and desserts.
      </p>
      <Link to="/menu" className="btn-accent mt-6">
        <i className="fa-solid fa-mug-hot" /> Browse Menu
      </Link>
    </div>
  );
}
