import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import GameCard from "../GameCard/GameCard";
import "./Games.css";
import NavButtons from "../NavButtons/NavButtons";

function Games() {
  const [games, setGames] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(`/api/games/${page}`).then((res) => res.json());
        setGames(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page]);

  function handleNextPage() {
    setPage((prevPage) => prevPage + 1);
  }

  function handlePrevPage() {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
    return;
  }

  if (loading) return <Loading />;
  if (!games) return <p>Error fetching games.</p>;

  return (
    <div className="games">
      <h1>Total games found: {games.count}</h1>

      <NavButtons onStepNext={handleNextPage} onStepPrev={handlePrevPage} page={page} />

      <div className="cards-container">
        {games.results.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <NavButtons onStepNext={handleNextPage} onStepPrev={handlePrevPage} page={page} />
    </div>
  );
}

export default Games;
