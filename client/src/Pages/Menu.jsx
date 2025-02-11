import { Outlet, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Menu = () => {
  const { userId } = useUser();

  return (
    <div className="menu">
      <nav>
        <Link to={`/u/games`}>
          {userId ? <button>Games</button> : <button disabled>Games</button>}
        </Link>
        <Link to={`/u/wishlist/${userId}`}>
          {userId ? <button>My Wish List</button> : <button disabled>My Wish List</button>}
        </Link>
        <Link to={`/u/account/${userId}`}>
          {userId ? <button>My Account</button> : <button disabled>My Account</button>}
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Menu;
