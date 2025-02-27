const API_URL = "https://api.rawg.io/api/games";
import { API_KEY } from "../config.js";

export async function fetchGames(page, pageSize = 10) {
  try {
    const response = await fetch(
      `${API_URL}?key=${API_KEY}&page=${page}&page_size=${pageSize}`
    );
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

export async function fetchGameWithFilters(filters, page, pageSize = 10) {}
