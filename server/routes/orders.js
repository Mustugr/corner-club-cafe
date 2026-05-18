import { Router } from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import MenuItem from "../models/MenuItem.js";

const router = Router();

const TAX_RATE = 0.0625;

// POST /api/orders
// Body: { sessionId, items?: [{sku, qty}], customer?: { name, email, phone, note } }
// If items is omitted, the server uses the persisted cart for sessionId.
router.post("/", async (req, res, next) => {
  try {
    const { sessionId, customer = {} } = req.body || {};
    let lines = req.body?.items;

    if (!Array.isArray(lines) || lines.length === 0) {
      if (!sessionId) {
        return res
          .status(400)
          .json({ error: "Provide items or a sessionId with a saved cart." });
      }
      const cart = await Cart.findOne({ sessionId });
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ error: "Cart is empty." });
      }
      lines = cart.items.map((i) => ({ sku: i.sku, qty: i.qty }));
    }

    const skus = [...new Set(lines.map((l) => l.sku))];
    const priced = await MenuItem.find({ sku: { $in: skus } }).lean();
    const bySku = new Map(priced.map((p) => [p.sku, p]));

    const items = lines
      .map((line) => {
        const match = bySku.get(line.sku);
        if (!match) return null;
        const qty = Math.max(1, parseInt(line.qty, 10) || 1);
        return {
          sku: match.sku,
          name: match.size ? `${match.name} (${match.size})` : match.name,
          price: match.price,
          qty,
        };
      })
      .filter(Boolean);

    if (items.length === 0) {
      return res.status(400).json({ error: "No valid items in order." });
    }

    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const tax = +(subtotal * TAX_RATE).toFixed(2);
    const total = +(subtotal + tax).toFixed(2);

    const order = await Order.create({
      sessionId,
      customer,
      items,
      subtotal: +subtotal.toFixed(2),
      tax,
      total,
      taxRate: TAX_RATE,
      status: "pending",
    });

    // Clear the cart once the order is placed.
    if (sessionId) {
      await Cart.findOneAndUpdate(
        { sessionId },
        { items: [] },
        { upsert: true }
      );
    }

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders  — list (newest first)
router.get("/", async (_req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(100).lean();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/:id
router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).lean();
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/orders/:id  — update status
router.patch("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body?.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

export default router;
