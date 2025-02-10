import express from "express";
import mongoose from "mongoose";
import UserModel from "./model/user.model.js";
import { fetchGames } from "../client/src/utils/fetchGames.js";

const app = express();
const PORT = 3005;

app.use(express.json());

mongoose
  .connect("mongodb+srv://dadigecse:admin@wishlist-project.tmtyf.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/api/user/:id", async (req, res, next) => {
  try{
    const id = req.params.id
    const user = await UserModel.find({_id: id});
    res.json(user);
  } catch(err) {
    next(err);
  }
});

app.post("/api/user", async (req, res, next) => {
  try {
    const user = req.body;
    const savedUser = await UserModel.create(user);
    res.json(savedUser);
  } catch (err) {
    next(err);
  }
});

app.patch("/api/user/:id", async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/user/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const deletedUser = await user.deleteOne({_id: user._id});
    res.json(deletedUser);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});


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
