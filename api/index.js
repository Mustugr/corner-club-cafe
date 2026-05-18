// Vercel serverless entry. Wraps the Express app so /api/* requests
// hit the same routes used during local dev (npm run server:dev).
import app from "../server/app.js";

export default app;
