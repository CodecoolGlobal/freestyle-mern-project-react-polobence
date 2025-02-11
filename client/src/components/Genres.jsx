function Genres({ game }) {
  return (
    <ul>
      Genres:
      {game.genres.map((genre, index) => (
        <li key={index}>{genre.slug}</li>
      ))}
    </ul>
  );
}

export default Genres;
