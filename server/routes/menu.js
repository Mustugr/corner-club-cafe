import { Router } from "express";
import MenuItem from "../models/MenuItem.js";

const router = Router();

// GET /api/menu
// Returns: { tableSections, cardSections, allCategories }
// Reshapes the flat MenuItem collection into the section structure the UI uses.
router.get("/", async (_req, res, next) => {
  try {
    const items = await MenuItem.find({ available: true })
      .sort({ categoryId: 1, sortOrder: 1, name: 1 })
      .lean();

    const sectionsById = new Map();
    for (const item of items) {
      if (!sectionsById.has(item.categoryId)) {
        sectionsById.set(item.categoryId, {
          id: item.categoryId,
          title: item.categoryTitle,
          icon: item.categoryIcon || "",
          note: item.categoryNote || undefined,
          kind: item.kind,
          rows: [], // for sized sections
          items: [], // for simple sections
          _sizes: new Set(),
          _rowsByName: new Map(),
        });
      }
      const section = sectionsById.get(item.categoryId);

      if (item.kind === "sized") {
        section._sizes.add(item.size);
        if (!section._rowsByName.has(item.name)) {
          section._rowsByName.set(item.name, {
            name: item.name,
            pricesBySize: new Map(),
          });
        }
        section._rowsByName.get(item.name).pricesBySize.set(item.size, {
          sku: item.sku,
          price: item.price,
        });
      } else {
        section.items.push({
          sku: item.sku,
          name: item.name,
          price: item.price,
          desc: item.desc || undefined,
        });
      }
    }

    const tableSections = [];
    const cardSections = [];

    for (const section of sectionsById.values()) {
      if (section.kind === "sized") {
        const sizes = Array.from(section._sizes);
        const rows = Array.from(section._rowsByName.values()).map((row) => ({
          name: row.name,
          prices: sizes.map((s) => row.pricesBySize.get(s)?.price ?? null),
          skus: sizes.map((s) => row.pricesBySize.get(s)?.sku ?? null),
        }));
        tableSections.push({
          id: section.id,
          title: section.title,
          icon: section.icon,
          note: section.note,
          sizes,
          rows,
        });
      } else {
        cardSections.push({
          id: section.id,
          title: section.title,
          icon: section.icon,
          note: section.note,
          items: section.items,
        });
      }
    }

    const allCategories = [
      ...tableSections.map((s) => ({ id: s.id, title: s.title, icon: s.icon })),
      ...cardSections.map((s) => ({ id: s.id, title: s.title, icon: s.icon })),
    ];

    res.json({ tableSections, cardSections, allCategories });
  } catch (err) {
    next(err);
  }
});

// POST /api/menu  (simple admin endpoint for adding/updating items)
router.post("/", async (req, res, next) => {
  try {
    const created = await MenuItem.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

// PUT /api/menu/:sku
router.put("/:sku", async (req, res, next) => {
  try {
    const updated = await MenuItem.findOneAndUpdate(
      { sku: req.params.sku },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Item not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/menu/:sku
router.delete("/:sku", async (req, res, next) => {
  try {
    const deleted = await MenuItem.findOneAndDelete({ sku: req.params.sku });
    if (!deleted) return res.status(404).json({ error: "Item not found" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
