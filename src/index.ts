import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import itineraryRoutes from "./routes/itinerary.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "TravelAI",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/itineraries", itineraryRoutes);

// Fallback to frontend
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`TravelAI server running on http://localhost:${PORT}`);
  console.log(` API docs: POST /api/itineraries  |  GET /api/itineraries`);
});
