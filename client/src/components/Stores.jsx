function Stores({ game }) {
  return (
    <ul>
      Stores:
      {game.stores?.map((store, index) => (
        <li key={index}>{store.store.name}</li>
      ))}
    </ul>
  );
}

export default Stores;
