import express from "express";
import { v4 } from "uuid";

const app = express();
app.use(express.json());

app.get("/tasks", (req, res) => {
  res.json([]);
});

app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({ error: "Title and description are required" });
  }

  res.json({
    id: v4(),
    title,
    description,
  });
});

export default app;
