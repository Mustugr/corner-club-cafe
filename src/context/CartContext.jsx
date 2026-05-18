import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { api, getSessionId } from "../lib/api";

const TAX_RATE = 0.0625;

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "hydrate":
      return action.items;
    case "add": {
      const { sku, name, price } = action.item;
      const existing = state.find((i) => i.sku === sku);
      if (existing) {
        return state.map((i) =>
          i.sku === sku ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { sku, name, price, qty: 1 }];
    }
    case "increase":
      return state.map((i) =>
        i.sku === action.sku ? { ...i, qty: i.qty + 1 } : i
      );
    case "decrease":
      return state
        .map((i) => (i.sku === action.sku ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
    case "remove":
      return state.filter((i) => i.sku !== action.sku);
    case "clear":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);
  const sessionIdRef = useRef(null);
  const hydratedRef = useRef(false);
  const syncTimer = useRef(null);

  // Hydrate from the server on mount.
  useEffect(() => {
    sessionIdRef.current = getSessionId();
    let cancelled = false;
    api
      .getCart(sessionIdRef.current)
      .then((cart) => {
        if (cancelled) return;
        const serverItems = (cart?.items ?? []).map((i) => ({
          sku: i.sku,
          name: i.name,
          price: i.price,
          qty: i.qty,
        }));
        dispatch({ type: "hydrate", items: serverItems });
      })
      .catch((err) => {
        console.warn("Cart hydrate failed:", err.message);
      })
      .finally(() => {
        hydratedRef.current = true;
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist to the server (debounced) after any local change post-hydration.
  useEffect(() => {
    if (!hydratedRef.current || !sessionIdRef.current) return;
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      api
        .putCart(
          sessionIdRef.current,
          items.map((i) => ({ sku: i.sku, qty: i.qty }))
        )
        .catch((err) => console.warn("Cart sync failed:", err.message));
    }, 250);
    return () => clearTimeout(syncTimer.current);
  }, [items]);

  const placeOrder = useCallback(
    async (customer = {}) => {
      const order = await api.createOrder({
        sessionId: sessionIdRef.current,
        items: items.map((i) => ({ sku: i.sku, qty: i.qty })),
        customer,
      });
      dispatch({ type: "clear" });
      return order;
    },
    [items]
  );

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
      increase: (sku) => dispatch({ type: "increase", sku }),
      decrease: (sku) => dispatch({ type: "decrease", sku }),
      remove: (sku) => dispatch({ type: "remove", sku }),
      clear: () => dispatch({ type: "clear" }),
      placeOrder,
    };
  }, [items, placeOrder]);

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
