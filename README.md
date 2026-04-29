# Corner Club Cafe

A responsive single-page website for Corner Club Cafe in Cliffside Park, New Jersey. Originally built as a plain HTML/CSS/JS assignment, this version is a full rebuild using **React**, **Vite**, **Tailwind CSS**, and **React Router**, with a shopping cart that persists in `localStorage`.

**Live site:** https://corner-club-cafe-txvz.vercel.app/

## What this app does

Visitors can:

- browse the cafe menu across multiple categories
- search and filter menu items
- add menu items to a shopping cart
- see a live cart count in the header
- open a dedicated cart page to review items
- increase quantities, remove items, or clear the cart
- view subtotal, New Jersey sales tax at `6.25%`, and final total
- learn about the cafe and contact the business

## Tech stack

- **React 19** — component-based UI with hooks
- **Vite** — dev server and production bundler
- **Tailwind CSS** — utility-first styling with a custom cafe theme
- **React Router** — client-side routing across pages
- **Font Awesome** — iconography
- **Google Fonts** — Playfair Display (headings) + Inter (body)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

To build for production:

```bash
npm run build      # outputs to dist/
npm run preview    # serves the built app on http://localhost:4173
```

## Pages

| Route       | File                       | Description                                                            |
| ----------- | -------------------------- | ---------------------------------------------------------------------- |
| `/`         | `src/pages/Home.jsx`       | Hero with overlay, feature cards, autoplay gallery slider, CTA banner  |
| `/menu`     | `src/pages/Menu.jsx`       | Searchable, filterable menu with table + card layouts and add-to-cart  |
| `/about`    | `src/pages/About.jsx`      | Story and offering cards with imagery                                  |
| `/contact`  | `src/pages/Contact.jsx`    | Contact form, hours, embedded Google Map                               |
| `/cart`     | `src/pages/Cart.jsx`       | Quantity controls, remove items, subtotal, NJ tax, total               |

## Shopping cart

- Items are added directly from the menu page
- Adding the same item again increases its quantity
- The header cart badge updates automatically
- The cart page displays each selected item with name, unit price, quantity controls, and a remove button
- Totals shown: subtotal, `6.25%` NJ tax, final total
- Cart state is persisted in `localStorage` so it survives page reloads

## Project structure

```text
corner-club-cafe/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── images/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Header.jsx
    │   ├── Footer.jsx
    │   ├── Layout.jsx
    │   ├── PageHero.jsx
    │   └── Slider.jsx
    ├── context/
    │   └── CartContext.jsx
    ├── data/
    │   └── menu.js
    └── pages/
        ├── Home.jsx
        ├── Menu.jsx
        ├── About.jsx
        ├── Contact.jsx
        └── Cart.jsx
```
