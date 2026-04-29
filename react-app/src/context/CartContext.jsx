import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const STORAGE_KEY = "ccc_cart_v2";
const TAX_RATE = 0.0625;

const CartContext = createContext(null);

function readInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const { id, name, price } = action.item;
      const existing = state.find((i) => i.id === id);
      if (existing) {
        return state.map((i) =>
          i.id === id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { id, name, price, qty: 1 }];
    }
    case "increase":
      return state.map((i) =>
        i.id === action.id ? { ...i, qty: i.qty + 1 } : i
      );
    case "decrease":
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
    case "remove":
      return state.filter((i) => i.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, readInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota errors */
    }
  }, [items]);

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    return {
      items,
      itemCount,
      subtotal,
      tax,
      total,
      taxRate: TAX_RATE,
      addItem: (item) => dispatch({ type: "add", item }),
      increase: (id) => dispatch({ type: "increase", id }),
      decrease: (id) => dispatch({ type: "decrease", id }),
      remove: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}
