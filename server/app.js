import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import menuRouter from "./routes/menu.js";
import cartRouter from "./routes/cart.js";
import ordersRouter from "./routes/orders.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Ensure DB is connected before any handler runs (cheap once cached).
app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

app.use("/api/menu", menuRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

export default app;
