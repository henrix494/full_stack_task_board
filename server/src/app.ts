import express from "express";
import boardRoute from "./routes/BoardRoute";
const app = express();

app.use(express.json());
app.use("/api/boards", boardRoute);
// Routes

// Global error handler (should be after routes)
export default app;
