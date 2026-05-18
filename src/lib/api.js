// Thin wrapper around fetch for the Corner Cafe API.
// In dev, Vite proxies /api to http://localhost:5174 (see vite.config.js).
// In production on Vercel, /api is served by api/index.js.

const SESSION_KEY = "ccc_session_id";

export function getSessionId() {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id =
      (crypto.randomUUID && crypto.randomUUID()) ||
      Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

async function request(path, options = {}) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getMenu: () => request("/api/menu"),
  getCart: (sessionId) => request(`/api/cart/${sessionId}`),
  putCart: (sessionId, items) =>
    request(`/api/cart/${sessionId}`, {
      method: "PUT",
      body: JSON.stringify({ items }),
    }),
  clearCart: (sessionId) =>
    request(`/api/cart/${sessionId}`, { method: "DELETE" }),
  createOrder: (payload) =>
    request("/api/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
