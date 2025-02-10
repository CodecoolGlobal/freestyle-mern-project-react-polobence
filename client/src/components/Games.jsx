import { useEffect, useState } from "react";
import { fetchGames } from "../utils/fetchGames";

function Games() {
  const [games, setGames] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchGames(page);
        setGames(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page]);

  function handlePageMovement() {
    setPage((prevPage) => prevPage + 1);
  }

  if (loading) return <p>Loading games...</p>;
  if (!games) return <p>Error fetching games.</p>;

  return (
    <div>
      <h1>Total games found: {games.count}</h1>
      {games.results.map((game, index) => (
        <div key={index}>{game.name}</div>
      ))}
      <button onClick={() => handlePageMovement(page)}>Next</button>
    </div>
  );
}

export default Games;
