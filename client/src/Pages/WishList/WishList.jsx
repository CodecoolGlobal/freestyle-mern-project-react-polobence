import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import GameCard from "../../components/GameCard/GameCard";

function WishList() {
  const userID = localStorage.getItem("userId");
  const [gameIDs, setGameIDs] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  async function handleDeleteWish(game) {
    try {
      const id = game.id.toString();
      const userRes = await fetch(`/api/user/${userID}`);
      const user = await userRes.json();
      user.wishlist = user.wishlist.filter((gameID) => gameID !== id);
      await fetch(`/api/wishlist/${userID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (user.wishlist.length === 0) {
        setGames([]);
      }
      setGameIDs([...user.wishlist]);
    } catch (error) {
      console.error(error);
    }
  }

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
          fetch(`/api/game/${id}`).then((res) => res.json())
        );
        const gamesData = await Promise.all(fetchPromises);
        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    }

    if (gameIDs) {
      if (gameIDs.length === 0) {
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
            <GameCard
              key={index}
              game={game}
              handleDeleteWish={handleDeleteWish}
              parent="wishlist"
            />
          ))}
        </div>
      ) : (
        <>{loading && games.length !== 0 ? <></> : <p>No games added yet.</p>}</>
      )}
    </div>
  );
}

export default WishList;
