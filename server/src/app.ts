import express from "express";
import boardRoute from "./routes/BoardRoute";
import tasksRouter from "./routes/TaskRoute";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api/boards", boardRoute);
app.use("/api/tasks", tasksRouter);
// Routes

// Global error handler (should be after routes)
export default app;
