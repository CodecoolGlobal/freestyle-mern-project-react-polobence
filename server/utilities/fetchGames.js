const API_URL = "https://api.rawg.io/api/games";
import { API_KEY } from "../config.js";

export async function fetchGames(page) {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}&page=${page}`);
    if (!response.ok) {
      throw new Error("Failed to fetch games");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchGameById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}?key=${API_KEY}`);
    if (!response.ok) {
      throw new Error("Failed to fetch game");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
