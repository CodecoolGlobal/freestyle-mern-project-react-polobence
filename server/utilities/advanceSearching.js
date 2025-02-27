import { API_KEY } from "../config.js";
const API = "https://api.rawg.io/api";

export async function fetchGenres() {
  try {
    const response = await fetch(`${API}/genres?key=${API_KEY}`);
    const apiResponse = await response.json();
    const genres = apiResponse.results.map((genre) => genre.name);
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
    const stores = apiResponse.results.map((store) => store.name);
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
      const names = apiResponse.results.map((onePlatform) => onePlatform.name);
      platforms.push(...names);
    } while (pageUrl);
    return platforms;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchSearchedGames() {
  
}