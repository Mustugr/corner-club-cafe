import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  const linkClass = ({ isActive }) =>
    `relative px-1 py-2 text-[11px] font-bold tracking-[0.18em] uppercase transition-colors ${
      isActive
        ? "text-coffee-700 after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-accent"
        : "text-coffee-400 hover:text-coffee-700"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-coffee-100 bg-cream-50/95 backdrop-blur">
      <div className="container-x flex items-center justify-between gap-4 py-4">
        <Link to="/" className="flex items-center gap-3" aria-label="Corner Club Cafe home">
          <img
            src="/images/logo.png"
            alt="Corner Club Cafe"
            className="h-9 w-9 rounded-sm object-cover"
          />
          <span className="font-display text-lg font-semibold tracking-tight text-coffee-700 sm:text-xl">
            Corner Club Cafe
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          <CartButton count={itemCount} />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/cart"
            aria-label="Open cart"
            className="relative grid h-10 w-10 place-items-center rounded-sm bg-coffee-700 text-cream-50"
          >
            <i className="fa-solid fa-cart-shopping text-sm" aria-hidden="true" />
            {itemCount > 0 && <Badge count={itemCount} />}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-sm border border-coffee-200 text-coffee-700 transition hover:bg-coffee-50"
          >
            <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"}`} aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-coffee-100 bg-cream-50 md:hidden">
          <nav className="container-x flex flex-col py-2">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-sm px-3 py-3 text-[11px] font-bold uppercase tracking-[0.18em] ${
                    isActive
                      ? "bg-coffee-700 text-cream-50"
                      : "text-coffee-500 hover:bg-coffee-50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function CartButton({ count }) {
  return (
    <NavLink
      to="/cart"
      className={({ isActive }) =>
        `relative inline-flex items-center gap-2 rounded-sm px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] transition ${
          isActive
            ? "bg-accent text-white"
            : "bg-coffee-700 text-cream-50 hover:bg-accent"
        }`
      }
    >
      <i className="fa-solid fa-cart-shopping" aria-hidden="true" />
      <span>Cart</span>
      {count > 0 && <Badge count={count} />}
    </NavLink>
  );
}

function Badge({ count }) {
  return (
    <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-white ring-2 ring-cream-50">
      {count}
    </span>
  );
}
