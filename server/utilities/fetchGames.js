const API_URL = "https://api.rawg.io/api/games";
import { API_KEY } from "../config.js";

export async function fetchGames( page, pageSize = 10, filters = null,) {
  let url = `${API_URL}?key=${API_KEY}&page=${page}&page_size=${pageSize}`;
  if (filters.genre) url + `&genre=${filters.genre}`;
  if (filters.platform) url + `&platform=${filters.platform}`;
  if (filters.store) url + `&store=${filters.store}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch games");
    }
    const games = await response.json();
    return games;
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
