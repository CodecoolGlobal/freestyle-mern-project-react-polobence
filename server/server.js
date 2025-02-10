import express from "express";
import mongoose from "mongoose";
import UserModel from "./model/user.model.js";

const app = express();
const PORT = 3005;

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


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
