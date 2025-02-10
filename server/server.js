import express from "express";
import mongoose from "mongoose";
import { fetchGames } from "../client/src/utils/fetchGames.js";

const app = express();
const PORT = 3005;

mongoose
  .connect("mongodb+srv://polobence:Pds56ghj@cluster0.23pel.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/api/games", async (req, res) => {
  try {
    const games = await fetchGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: "Error fetching games", error: error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
