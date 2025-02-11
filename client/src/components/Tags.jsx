function Tags({ game }) {
  return (
    <ul>
      Tags:
      {game.tags.slice(0, 5).map((tag, index) => (
        <li key={index}>{tag.name}</li>
      ))}
    </ul>
  );
}

export default Tags;
