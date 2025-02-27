import { useState, useEffect } from "react";

const fetchGenres = async () => {
  try {
    const res = await fetch("/api/genres");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

const fetchStores = async () => {
  try {
    const res = await fetch("/api/stores");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

const fetchPlatforms = async () => {
  try {
    const res = await fetch("/api/platforms");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export default function FilterControls({ handleSearch }) {
  const [genres, setGenres] = useState(null);
  const [stores, setStores] = useState(null);
  const [platforms, setPlatforms] = useState(null);
  const [genre, setGenre] = useState("default");
  const [store, setStore] = useState("default");
  const [platform, setPlatform] = useState("default");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      setGenres(await fetchGenres());
      setStores(await fetchStores());
      setPlatforms(await fetchPlatforms());
    }

    try {
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
    {genres && stores && platforms &&
    <div className="filterControls">
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="default">Select a genre!</option>
        {genres.map((genre, index) => <option key={index} value={genre}>{genre}</option>)}
      </select>

      <select value={store} onChange={(e) => setStore(e.target.value)}>
        <option value="default">Select a store!</option>
        {stores.map((store, index) => <option key={index} value={store}>{store}</option>)}
      </select>

      <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
        <option value="default">Select a platform!</option>
        {platforms.map((platform, index) => <option key={index} value={platform}>{platform}</option>)}
      </select>

      <input type="text" placeholder="Search by name..." onChange={(e) => setSearch(e.target.value)}/>
      {search ? <button onClick={() => handleSearch(search)}>Search!</button> : <button disabled>Search!</button>}
    </div>
    }
    </>
  );
}
