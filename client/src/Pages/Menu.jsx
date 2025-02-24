import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer/Footer.jsx";

const Menu = () => {
  const userId = localStorage.getItem("userId");

  return (
    <>
      <div className="menu">
        <nav>
          <Link className="logo" to="/">
            <h1>Gamer's Wish Vault </h1>
          </Link>
          <div className="nav-buttons">
            <Link to={`/u/games`}>
              {userId ? <button>Games</button> : <button disabled>Games</button>}
            </Link>
            <Link to={`/u/wishlist`}>
              {userId ? <button>My Wish List</button> : <button disabled>My Wish List</button>}
            </Link>
            <Link to={`/u/account`}>
              {userId ? <button>My Account</button> : <button disabled>My Account</button>}
            </Link>
          </div>
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
