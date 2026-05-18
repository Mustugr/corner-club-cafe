import mongoose from "mongoose";

// One flat collection for every menu item.
// `kind: "sized"` items belong to a tabular section and carry a `size`.
// `kind: "simple"` items belong to a card section and stand alone.
const MenuItemSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    categoryId: { type: String, required: true, index: true },
    categoryTitle: { type: String, required: true },
    categoryIcon: { type: String },
    categoryNote: { type: String },
    kind: { type: String, enum: ["sized", "simple"], required: true },
    size: { type: String, default: null },
    desc: { type: String, default: null },
    sortOrder: { type: Number, default: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.MenuItem ||
  mongoose.model("MenuItem", MenuItemSchema);
