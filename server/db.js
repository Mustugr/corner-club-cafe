import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    "MONGODB_URI is not set. Add it to your .env file (see .env.example)."
  );
}

// Cache the connection across serverless invocations on Vercel.
let cached = global.__mongoose;
if (!cached) cached = global.__mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { serverSelectionTimeoutMS: 10000 })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
