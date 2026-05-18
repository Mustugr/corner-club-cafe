import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./db.js";
import MenuItem from "./models/MenuItem.js";
import { tableSections, cardSections } from "../src/data/menu.js";

function skuFor(sectionId, name, size) {
  const slug = (s) =>
    s
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  return size
    ? `${sectionId}--${slug(name)}--${slug(size)}`
    : `${sectionId}--${slug(name)}`;
}

function buildDocs() {
  const docs = [];

  for (const section of tableSections) {
    section.rows.forEach((row, rowIdx) => {
      section.sizes.forEach((size, sizeIdx) => {
        const price = row.prices[sizeIdx];
        if (price == null) return;
        docs.push({
          sku: skuFor(section.id, row.name, size),
          name: row.name,
          price,
          categoryId: section.id,
          categoryTitle: section.title,
          categoryIcon: section.icon,
          categoryNote: section.note || null,
          kind: "sized",
          size,
          desc: null,
          sortOrder: rowIdx * 10 + sizeIdx,
          available: true,
        });
      });
    });
  }

  for (const section of cardSections) {
    section.items.forEach((item, idx) => {
      docs.push({
        sku: skuFor(section.id, item.name),
        name: item.name,
        price: item.price,
        categoryId: section.id,
        categoryTitle: section.title,
        categoryIcon: section.icon,
        categoryNote: section.note || null,
        kind: "simple",
        size: null,
        desc: item.desc || null,
        sortOrder: idx,
        available: true,
      });
    });
  }

  return docs;
}

async function run() {
  await connectDB();
  const docs = buildDocs();

  console.log(`Seeding ${docs.length} menu items…`);
  await MenuItem.deleteMany({});
  await MenuItem.insertMany(docs);
  console.log("Done.");

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
