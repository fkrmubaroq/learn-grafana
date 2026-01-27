import cors from "cors";
import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  console.log("GET /health");
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/hello", (_req, res) => {
  console.log("GET /api/hello");
  res.json({ message: "Hello World!" });
});

app.get("/api/time", (_req, res) => {
  console.log("GET /api/time");
  res.json({ time: new Date().toISOString() });
});

app.post("/api/logs", (req, res) => {
  console.log("POST /api/logs", req.body);
  res.json({ logs: req.body });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
