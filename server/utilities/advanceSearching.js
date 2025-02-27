import { API_KEY } from "../config.js";
const API = "https://api.rawg.io/api";

export async function fetchGenres() {
  try {
    const response = await fetch(`${API}/genres?key=${API_KEY}`);
    const apiResponse = await response.json();
    const genres = apiResponse.results.map((genre) => { return {name: genre.name, id: genre.id}});
    return genres;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchStores() {
  try {
    const response = await fetch(`${API}/stores?key=${API_KEY}`);
    const apiResponse = await response.json();
    const stores = apiResponse.results.map((store) => {return {name: store.name, id: store.id}});
    return stores;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchPlatforms() {
  const platforms = [];
  try {
    let pageUrl = `${API}/platforms?key=${API_KEY}`;
    do {
      const response = await fetch(pageUrl);
      const apiResponse = await response.json();
      pageUrl = apiResponse.next;
      const pagePlatforms = apiResponse.results.map((onePlatform) => { return {name: onePlatform.name, id: onePlatform.id}});
      platforms.push(...pagePlatforms);
    } while (pageUrl);
    return platforms;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchSearchedGames(search, page, pageSize) {
  try {
    const response = await fetch(
      `${API}/games?key=${API_KEY}&search=${search}&page=${page}&page_size=${pageSize}`
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
