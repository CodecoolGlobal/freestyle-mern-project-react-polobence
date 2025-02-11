const API_URL = "https://api.rawg.io/api/games";
const API_KEY = "af193b53c9824c3189937fb944659b53";

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
