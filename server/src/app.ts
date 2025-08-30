import express from "express";
import boardRoute from "./routes/BoardRoute";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/api/boards", boardRoute);
// Routes

// Global error handler (should be after routes)
export default app;
