export function checkIfNewGame(user, gameId) {
  const found = user.wishlist.indexOf(gameId);
  if (found === -1) {
    return true;
  } else {
    return false;
  }
}
