import { useParams } from "react-router-dom";
import Genres from "../Genres";
import Platforms from "../Platforms";
import Stores from "../Stores";
import Tags from "../Tags";
import "./GameCard.css";

function GameCard({ game }) {
  const { userId } = useParams();

  async function handleAddWish() {
    const gameId = game.id.toString();

    const updatedUser = await fetch(`/api/user/${userId}/${gameId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      }
    })

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
      <button onClick={handleAddWish}>Add game to wishlist</button>
    </div>
  );
}

export default GameCard;
