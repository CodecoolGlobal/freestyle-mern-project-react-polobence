import React from "react";

function Menu({}) {
  function handleGames() {
    //Fill out with appropriate action
  }

  function handleWishList() {
    //Fill out with appropriate action
  }

  function handleAccount() {
    //Fill out with appropriate action
  }
  return (
    <div className="menu">
      <button onClick={handleGames}>Games</button>
      <button onClick={handleWishList}>My Wish List</button>
      <button onClick={handleAccount}>My Account</button>
    </div>
  );
}

export default Menu;
