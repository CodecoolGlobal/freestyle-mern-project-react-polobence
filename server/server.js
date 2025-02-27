import express from "express";
import mongoose from "mongoose";
import UserModel from "./model/User.model.js";
import { fetchGameById, fetchGames } from "./utilities/fetchGames.js";
import { checkIfNewGame } from "./utilities/checkIfNewGame.js";
import { MONGO_DB_CLUSTER_PASSWORD, MONGO_DB_USERNAME } from "./config.js";
import {
  fetchGenres,
  fetchStores,
  fetchPlatforms,
  fetchSearchedGames,
} from "./utilities/advanceSearching.js";

const app = express();
const PORT = 3005;

app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_CLUSTER_PASSWORD}@wishlist-project.tmtyf.mongodb.net/`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/api/user/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById({ _id: id });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

app.get("/api/login", async (req, res, next) => {
  try {
    const { username, password } = req.query;
    const user = await UserModel.findOne({
      username: username,
      password: password,
    });
    if (!user) {
      res.status(400).json({ message: "Wrong username or password!" });
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

app.post("/api/user", async (req, res, next) => {
  try {
    const createdUser = req.body;
    const users = await UserModel.find({});
    if (
      users.find(
        (user) =>
          user.username === createdUser.username ||
          user.email === createdUser.email
      )
    ) {
      res.status(400).json({ message: "Username or email already exists!" });
      return;
    }
    const savedUser = await UserModel.create(createdUser);
    res.json(savedUser);
  } catch (err) {
    next(err);
  }
});

app.patch("/api/user/:id", async (req, res, next) => {
  try {
    const users = await UserModel.find({});
    const newUser = req.body;
    if (
      users.find(
        (user) =>
          req.params.id !== user._id.toString() &&
          (user.email === newUser.email || user.username === newUser.username)
      )
    ) {
      res.status(400).json({ message: "Username or email already exists!" });
      return;
    }
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...newUser } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

app.patch("/api/user/addGame/:id", async (req, res) => {
  const userId = req.params.id;
  const gameId = req.body.gameId;

  try {
    const user = await UserModel.findById(userId);
    if (checkIfNewGame(user, gameId)) {
      user.wishlist.push(gameId);
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $set: { wishlist: user.wishlist } },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      res
        .status(400)
        .json({ message: "This game is already on your wishlist" });
    }
  } catch (err) {
    next(err);
  }
});

app.patch("/api/wishlist/:id", async (req, res, next) => {
  try {
    const newUser = req.body;
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...newUser } },
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
    const deletedUser = await user.deleteOne({ _id: user._id });
    res.json(deletedUser);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

app.get("/api/games/:page/:pageSize", async (req, res) => {
  const page = req.params.page;
  const pageSize = req.params.pageSize;
  try {
    const games = await fetchGames(page, pageSize);
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: "Error fetching games", error: error });
  }
});

app.get("/api/games/solo/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const game = await fetchGameById(id);
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: "Error fetching game", error: error });
  }
});

app.get("/api/genres", async (req, res) => {
  try {
    const genres = await fetchGenres();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tags", error: error });
  }
});

app.get("/api/stores", async (req, res) => {
  try {
    const stores = await fetchStores();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stores", error: error });
  }
});

app.get("/api/platforms", async (req, res) => {
  try {
    const platforms = await fetchPlatforms();
    res.json(platforms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching platform", error: error });
  }
});
app.get("/api/search/:searchInput/:page/:page_size", async (req, res) => {
  const search = req.params.searchInput;
  const page=req.params.page;
  const pageSize=req.params.page_size;
  
  try {
    const searchedGames = await fetchSearchedGames(search,page,pageSize);
    res.json(searchedGames);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching searched games", error: error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
