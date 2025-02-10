import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3005;

mongoose
  .connect("mongodb+srv://polobence:Pds56ghj@cluster0.23pel.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
