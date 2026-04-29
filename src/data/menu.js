// Menu data for Corner Club Cafe.
// Tabular sections (coffee/espresso/tea/iced) expose multiple sizes per row.
// Card sections expose simple items with optional descriptions.

export const tableSections = [
  {
    id: "coffee",
    title: "Coffee",
    icon: "fa-mug-hot",
    sizes: ["Regular", "Medium", "Large"],
    rows: [
      { name: "Fresh Coffee", prices: [2.49, 3.49, 4.29] },
      { name: "Americano", prices: [3.49, 4.29, 4.69] },
      { name: "Cafe Latte", prices: [4.69, 5.49, 6.29] },
      { name: "Cappuccino", prices: [4.69, 5.69, 6.49] },
      { name: "Mocha", prices: [5.29, 6.29, 6.69] },
      { name: "Chai Latte", prices: [4.29, 4.69, 5.29] },
      { name: "Matcha Tea Latte", prices: [4.69, 5.29, 5.69] },
      { name: "Hot Chocolate", prices: [4.49, 4.99, 5.49] },
      { name: "Cortado", prices: [4.49, null, null] },
    ],
  },
  {
    id: "espresso",
    title: "Espresso",
    icon: "fa-mug-saucer",
    sizes: ["Single", "Double"],
    rows: [
      { name: "Espresso", prices: [3.99, 4.99] },
      { name: "Macchiato", prices: [3.99, 4.99] },
      { name: "Turkish Coffee", prices: [3.99, 4.99] },
      { name: "Turkish Coffee Latte", prices: [4.99, 5.49] },
    ],
  },
  {
    id: "tea",
    title: "Tea",
    icon: "fa-leaf",
    sizes: ["Regular", "Large"],
    rows: [
      { name: "Ahmad Tea", prices: [3.49, null] },
      { name: "Harney & Sons Tea", prices: [4.49, null] },
      { name: "London Fog", prices: [4.49, 5.49] },
      { name: "Turkish Tea", prices: [2.99, 4.99] },
      { name: "Fresh Ginger Lemon Tea", prices: [4.99, 5.99] },
    ],
  },
  {
    id: "iced",
    title: "Iced Drinks",
    icon: "fa-snowflake",
    sizes: ["Regular", "Large"],
    rows: [
      { name: "Iced Americano", prices: [4.49, 5.29] },
      { name: "Iced Cappuccino", prices: [5.79, 6.49] },
      { name: "Iced Chai Latte", prices: [5.29, 5.99] },
      { name: "Iced Chocolate", prices: [5.29, 5.99] },
      { name: "Iced Coffee", prices: [3.49, 4.29] },
      { name: "Iced Harney & Sons", prices: [4.79, 5.29] },
      { name: "Iced Latte", prices: [5.79, 6.29] },
      { name: "Iced Matcha", prices: [5.29, 5.99] },
      { name: "Iced Mocha", prices: [5.99, 6.79] },
      { name: "Iced Tea", prices: [4.49, 5.29] },
    ],
  },
];

export const cardSections = [
  {
    id: "cold",
    title: "Cold Drinks",
    icon: "fa-bottle-water",
    items: [
      { name: "Acqua Panna", price: 2.49 },
      { name: "Fiji Water", price: 2.99 },
      { name: "Poland Spring Water", price: 1.99 },
      { name: "Sanpellegrino Sparkling Water", price: 3.29 },
      { name: "Naked Juice", price: 2.99 },
      { name: "Sanpellegrino", price: 2.99 },
      { name: "Sanpellegrino Italian Sparkling Drinks", price: 2.99 },
      { name: "Snapple", price: 2.99 },
      { name: "Coke", price: 2.0 },
      { name: "Diet Coke", price: 2.0 },
      { name: "Tamek Peach", price: 2.99 },
      { name: "Tamek Pineapple", price: 2.99 },
      { name: "Tamek Cherry", price: 2.99 },
      { name: "Uludag Gazoz", price: 2.99 },
      { name: "Uludag Orange", price: 2.99 },
      { name: "Red Bull 8oz", price: 3.49 },
    ],
  },
  {
    id: "smoothies",
    title: "Smoothies",
    icon: "fa-blender",
    note: "16oz $7.99 · 20oz $9.99",
    items: [
      {
        name: "Mrs. Purple",
        price: 7.99,
        desc: "Strawberry, blueberry, raspberry, flaxseed, organic protein powder, milk",
      },
      {
        name: "5 o'clock Somewhere",
        price: 7.99,
        desc: "Coffee, flaxseed, organic protein powder, milk",
      },
      {
        name: "Keto Green",
        price: 7.99,
        desc: "Spinach, kiwi, avocado, flaxseed, milk",
      },
      {
        name: "Hello Gorgeous",
        price: 7.99,
        desc: "Raspberry, banana, strawberry, honey, peanut powder, milk",
      },
    ],
  },
  {
    id: "milkshakes",
    title: "Milkshakes",
    icon: "fa-ice-cream",
    note: "16oz $5.99 · 20oz $7.99",
    items: [
      {
        name: "Create Your Milkshake",
        price: 5.99,
        desc: "Vanilla, strawberry, mango, chocolate, or pistachio",
      },
    ],
  },
  {
    id: "breakfast",
    title: "Breakfast",
    icon: "fa-egg",
    items: [
      { name: "Bagel & Cream Cheese", price: 4.29, desc: "Everything bagel with cream cheese" },
      { name: "Simit & Cream Cheese", price: 5.99, desc: "Turkish bagel with cream cheese" },
      {
        name: "Cheese Toast",
        price: 6.29,
        desc: "Double mozzarella, fresh Jersey tomato, Texas toast",
      },
      {
        name: "Simit Plate",
        price: 12.99,
        desc: "Tomato, cucumber, cheese, olives, smoked turkey, butter, Turkish bagel",
      },
      {
        name: "Breakfast Plate",
        price: 12.99,
        desc: "Tomato, cucumber, bell pepper, olives, honey, butter, cheese, smoked turkey, boiled egg, dry fruits",
      },
    ],
  },
  {
    id: "salads",
    title: "Salads & Bowls",
    icon: "fa-bowl-food",
    items: [
      {
        name: "Granola Bowl",
        price: 9.99,
        desc: "Pecan granola, organic yogurt, fresh seasonal fruits, dry berries",
      },
      {
        name: "Healthy Bomb Salad",
        price: 11.99,
        desc: "Spring mix, tomato, cucumber, dry cranberry, dry fig, dry apricot, bell pepper, walnuts, lemon mustard dressing",
      },
    ],
  },
  {
    id: "sandwiches",
    title: "Sandwiches",
    icon: "fa-burger",
    note: "Served with house salad or potato chips",
    items: [
      {
        name: "Avocado Sandwich",
        price: 9.99,
        desc: "Avocado, tomato, cheddar, arugula, flaxseed, black seed, chipotle aioli, baguette",
      },
      {
        name: "Mozzarella Sandwich",
        price: 9.99,
        desc: "Greens, mozzarella, tomato, basil sauce, ciabatta",
      },
      {
        name: "Corner Sandwich",
        price: 9.99,
        desc: "Smoked turkey, tomato, cheddar, greens, pickles, hummus, Texas toast",
      },
      {
        name: "Tuna Salad Sandwich",
        price: 9.99,
        desc: "Tuna salad, lettuce, tomato, Texas toast",
      },
      {
        name: "Tuna Melt Sandwich",
        price: 9.99,
        desc: "Tuna salad, cheddar cheese, Texas toast",
      },
    ],
  },
  {
    id: "pastry",
    title: "Pastry",
    icon: "fa-cookie",
    items: [
      { name: "Butter Croissant", price: 3.79 },
      { name: "Chocolate Croissant", price: 4.29 },
      { name: "Simit", price: 2.99 },
      { name: "Cheese Borek", price: 6.99 },
    ],
  },
  {
    id: "cakes",
    title: "Cakes",
    icon: "fa-cake-candles",
    items: [
      { name: "Mixed Berry Cake", price: 8.49 },
      { name: "Ricotta & Pistachio Cake", price: 8.49 },
      { name: "Ricotta & Chocolate", price: 8.49 },
      { name: "Carrot Cake (GF)", price: 8.99 },
      { name: "Tiramisu (GF)", price: 8.99 },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    icon: "fa-ice-cream",
    items: [
      { name: "Creme Brulee & Berries", price: 8.99 },
      { name: "French Macarons", price: 2.29 },
      { name: "Profiterole Glass", price: 8.49 },
      { name: "Tiramisu Glass", price: 8.49 },
      { name: "Waffle", price: 6.29 },
      { name: "Waffle with Ice Cream", price: 8.29 },
    ],
  },
  {
    id: "icecream",
    title: "Ice Cream",
    icon: "fa-ice-cream",
    note: "Chocolate · Vanilla · Pistachio · Strawberry · Mango",
    items: [
      { name: "1 Scoop", price: 3.49 },
      { name: "2 Scoops", price: 6.49 },
      { name: "3 Scoops", price: 9.99 },
      { name: "4 Scoops", price: 12.99 },
    ],
  },
];

export const allCategories = [
  ...tableSections.map((s) => ({ id: s.id, title: s.title, icon: s.icon })),
  ...cardSections.map((s) => ({ id: s.id, title: s.title, icon: s.icon })),
];
