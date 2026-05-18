import { Router } from "express";
import Cart from "../models/Cart.js";
import MenuItem from "../models/MenuItem.js";

const router = Router();

function shape(cart) {
  return {
    sessionId: cart.sessionId,
    items: cart.items.map((i) => ({
      sku: i.sku,
      name: i.name,
      price: i.price,
      qty: i.qty,
    })),
    updatedAt: cart.updatedAt,
  };
}

// GET /api/cart/:sessionId
router.get("/:sessionId", async (req, res, next) => {
  try {
    const cart =
      (await Cart.findOne({ sessionId: req.params.sessionId })) ||
      (await Cart.create({ sessionId: req.params.sessionId, items: [] }));
    res.json(shape(cart));
  } catch (err) {
    next(err);
  }
});

// PUT /api/cart/:sessionId  — replace the cart wholesale
// Body: { items: [{ sku, qty }] }
router.put("/:sessionId", async (req, res, next) => {
  try {
    const incoming = Array.isArray(req.body?.items) ? req.body.items : [];

    // Re-price every line from the DB so the client can't dictate prices.
    const skus = [...new Set(incoming.map((i) => i.sku))];
    const priced = await MenuItem.find({ sku: { $in: skus } }).lean();
    const bySku = new Map(priced.map((p) => [p.sku, p]));

    const items = incoming
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

    const cart = await Cart.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { sessionId: req.params.sessionId, items },
      { new: true, upsert: true }
    );
    res.json(shape(cart));
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart/:sessionId  — empty the cart
router.delete("/:sessionId", async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { items: [] },
      { new: true, upsert: true }
    );
    res.json(shape(cart));
  } catch (err) {
    next(err);
  }
});

export default router;
