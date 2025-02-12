import { Outlet, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Footer from "../components/Footer/Footer.jsx";

const Menu = () => {
  const { userId } = useUser();

  return (
    <>
      <div className="menu">
        <nav>
          <Link to={`/u/games/${userId}`}>
            {userId ? <button>Games</button> : <button disabled>Games</button>}
          </Link>
          <Link to={`/u/wishlist/${userId}`}>
            {userId ? <button>My Wish List</button> : <button disabled>My Wish List</button>}
          </Link>
          <Link to={`/u/account/${userId}`}>
            {userId ? <button>My Account</button> : <button disabled>My Account</button>}
          </Link>
        </nav>
        <div className="main">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Menu;
