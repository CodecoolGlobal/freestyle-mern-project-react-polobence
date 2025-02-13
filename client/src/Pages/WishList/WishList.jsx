import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import GameCard from "../../components/GameCard/GameCard";

function WishList() {
  const { userID } = useParams();
  const [gameIDs, setGameIDs] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishes() {
      try {
        const data = await fetch(`/api/user/${userID}`).then((res) => res.json());
        setGameIDs(data.wishlist || []);
      } catch (error) {
        console.error(error);
      }
    }

    fetchWishes();
  }, [userID]);

  useEffect(() => {

    async function fetchGamesByIds() {
      try {
        const fetchPromises = gameIDs.map((id) =>
          fetch(`/api/games/solo/${id}`).then((res) => res.json())
        );
        const gamesData = await Promise.all(fetchPromises);
        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    }

    if(gameIDs){
      if(gameIDs.length === 0){
        setLoading(false);
        return;
      }
      fetchGamesByIds();
    }
    
  }, [gameIDs]);

  if (loading) return <Loading />;

  return (
    <div className="wish-list">
      <h1>My Wishlist</h1>
      {games.length > 0 && !loading ? (
        <div className="cards-container">
          {games.map((game, index) => (
            <GameCard key={index} game={game} />
          ))}
        </div>
      ) : (
        <>{loading && games.length !== 0 ? <></> : <p>No games added yet.</p>}</>
      )}
    </div>
  );
}

export default WishList;
