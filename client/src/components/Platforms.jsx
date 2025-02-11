function Platforms({ game }) {
  return (
    <ul>
      Platforms:
      {game.platforms.map((platform, index) => (
        <li key={index}>{platform.platform.name}</li>
      ))}
    </ul>
  );
}

export default Platforms;
