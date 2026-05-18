# Corner Club Cafe

A full-stack single-page application for Corner Club Cafe in Cliffside Park, New Jersey. The frontend is **React + Vite + Tailwind**, and the backend is a **Node.js + Express + MongoDB (Mongoose)** REST API. The menu, cart, and orders all live in MongoDB.

**Live site:** https://corner-club-cafe-txvz.vercel.app/

## What this app does

Visitors can:

- browse the cafe menu (loaded from MongoDB)
- search and filter menu items
- add menu items to a cart that is persisted in MongoDB per browser session
- increase / decrease quantities, remove items, or clear the cart — all changes saved on the server
- place an order, which is written to the `orders` collection
- learn about the cafe and contact the business

## Tech stack

**Frontend**
- React 19, React Router, Vite, Tailwind CSS, Font Awesome

**Backend**
- Node.js, Express, Mongoose (MongoDB ODM), CORS, dotenv
- Same Express app runs locally (`npm run server`) and on Vercel as a serverless function (`api/index.js`)

## REST API

| Method | Path                       | Purpose                                              |
| ------ | -------------------------- | ---------------------------------------------------- |
| GET    | `/api/health`              | Health check                                         |
| GET    | `/api/menu`                | Full menu, grouped into `tableSections` + `cardSections` |
| POST   | `/api/menu`                | Create a menu item                                   |
| PUT    | `/api/menu/:sku`           | Update a menu item                                   |
| DELETE | `/api/menu/:sku`           | Delete a menu item                                   |
| GET    | `/api/cart/:sessionId`     | Read a cart (creates an empty one if absent)         |
| PUT    | `/api/cart/:sessionId`     | Replace cart with `{ items: [{ sku, qty }] }`        |
| DELETE | `/api/cart/:sessionId`     | Empty the cart                                       |
| POST   | `/api/orders`              | Place an order from cart or explicit items           |
| GET    | `/api/orders`              | List the most recent orders                          |
| GET    | `/api/orders/:id`          | Read one order                                       |
| PATCH  | `/api/orders/:id`          | Update order status                                  |

Prices are recomputed on the server from the menu collection on every cart update and order — the client cannot dictate prices.

## Run locally

1. Create a free **MongoDB Atlas** cluster (or run Mongo locally) and grab the connection string.
2. Copy the env template and fill it in:
   ```bash
   cp .env.example .env
   # edit .env and set MONGODB_URI=...
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Seed the menu from `src/data/menu.js` into MongoDB:
   ```bash
   npm run seed
   ```
5. Start the API and the Vite dev server together:
   ```bash
   npm run dev:all
   ```
   - Frontend: http://localhost:5173
   - API:      http://localhost:5174 (Vite proxies `/api` to it automatically)

You can also run them separately with `npm run dev` (frontend) and `npm run server:dev` (API with nodemon).

## Deploying to Vercel

1. Create a MongoDB Atlas cluster, allow access from `0.0.0.0/0` (or Vercel's egress range), and copy the connection string.
2. In the Vercel project settings, add an env var:
   - `MONGODB_URI` = your Atlas connection string
3. Push to the connected git branch. Vercel will:
   - build the React app (`npm run build` → `dist/`)
   - turn `api/index.js` into a serverless function that handles every `/api/*` request via the same Express app
   - serve the SPA for all other routes (see `vercel.json`)
4. Once deployed, run the seed once locally against the production DB (same `MONGODB_URI`):
   ```bash
   npm run seed
   ```

## Data model

**MenuItem** — one document per orderable item (a Coffee in size Medium is one document; an Avocado Sandwich is another).

```
{ sku, name, price, categoryId, categoryTitle, categoryIcon, categoryNote,
  kind: "sized" | "simple", size, desc, sortOrder, available }
```

**Cart** — keyed by a `sessionId` stored in the browser's localStorage (`ccc_session_id`).

```
{ sessionId, items: [{ sku, name, price, qty }] }
```

**Order** — created on checkout; the cart is cleared atomically afterwards.

```
{ sessionId, customer: { name, email, phone, note },
  items: [{ sku, name, price, qty }],
  subtotal, tax, total, taxRate, status }
```

## Project structure

```text
corner-club-cafe/
├── api/
│   └── index.js              # Vercel serverless entry → wraps server/app.js
├── server/
│   ├── app.js                # Express app: middleware + routes
│   ├── index.js              # Local dev entry: app.listen(...)
│   ├── db.js                 # Mongoose connection (cached across invocations)
│   ├── seed.js               # Seeds MenuItem from src/data/menu.js
│   ├── models/
│   │   ├── MenuItem.js
│   │   ├── Cart.js
│   │   └── Order.js
│   └── routes/
│       ├── menu.js
│       ├── cart.js
│       └── orders.js
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── lib/
│   │   └── api.js            # fetch wrapper + sessionId helper
│   ├── context/
│   │   └── CartContext.jsx   # hydrates from /api/cart, syncs on every change
│   ├── data/
│   │   └── menu.js           # source of truth for the seed script only
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Menu.jsx          # fetches /api/menu
│   │   ├── Cart.jsx          # checkout posts /api/orders
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   └── components/ ...
├── vercel.json
├── vite.config.js
├── package.json
└── .env.example
```
