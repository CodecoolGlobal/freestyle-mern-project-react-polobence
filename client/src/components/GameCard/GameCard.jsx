import Genres from "../Genres";
import Platforms from "../Platforms";
import Stores from "../Stores";
import Tags from "../Tags";
import "./GameCard.css";

function GameCard({ game }) {
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
      <button>Add game to wishlist</button>
    </div>
  );
}

export default GameCard;
