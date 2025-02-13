import { useParams } from "react-router-dom";
import Genres from "../Genres";
import Platforms from "../Platforms";
import Stores from "../Stores";
import Tags from "../Tags";
import "./GameCard.css";
import { useState } from "react";
import Error from "../Error/Error";
import AddedGameMessage from "../AddedGameMessage/AddedGameMessage";

function GameCard({ game, parent = "games", handleDeleteWish }) {
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  const { userId } = useParams();

  async function handleAddWish() {
    setAdded(true);
    const gameId = game.id.toString();
    const updatedUser = await fetch(`/api/user/addGame/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId: gameId }),
    }).then((res) => {
      return res.json();
    });

    if (updatedUser.message) {
      setError(updatedUser.message);
    }
  }

  return (
    <div className="game-card">
      <h2>{game.name}</h2>
      <img src={game.background_image} alt="game background image" />
      <h3>Rating: {game.rating}/5</h3>
      <div>Released: {game.released}</div>
      <Genres game={game} />
      <Stores game={game} />
      <Platforms game={game} />
      <Tags game={game} />
      {error && <Error errorMessage={error} />}
      {added && !error && <AddedGameMessage />}
      {parent === "wishlist" ? (
        <button onClick={() => handleDeleteWish(game)}>Delete game from wishlist</button>
      ) : (
        <button onClick={handleAddWish}>Add game to wishlist</button>
      )}
    </div>
  );
}

export default GameCard;
