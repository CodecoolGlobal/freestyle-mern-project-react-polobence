import { useState, useEffect } from "react";
import "./FilterControls.css";

export default function FilterControls({ handleSearch, handleFilters, genres, stores, platforms }) {
  const [genre, setGenre] = useState("default");
  const [store, setStore] = useState("default");
  const [platform, setPlatform] = useState("default");
  const [search, setSearch] = useState("");

  function onSearch() {
    setGenre("default");
    setPlatform("default");
    setStore("default");
    handleSearch(search);
  }

  useEffect(() => {
    const filters = {
      genre: genre === "default" ? null : genre,
      store: store === "default" ? null : store,
      platform: platform === "default" ? null : platform,
    };
    setSearch("");
    handleFilters(filters);
  }, [genre, store, platform]);

  return (
    <>
      {genres && stores && platforms && (
        <div className="filterControls">
          <div className="selectDiv">
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="default">Select a genre!</option>
              {genres.map((genre, index) => (
                <option key={index} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>

            <select value={store} onChange={(e) => setStore(e.target.value)}>
              <option value="default">Select a store!</option>
              {stores.map((store, index) => (
                <option key={index} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>

            <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
              <option value="default">Select a platform!</option>
              {platforms.map((platform, index) => (
                <option key={index} value={platform.id}>
                  {platform.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            value={search}
            placeholder="Search by name..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={onSearch}>Search!</button>

          <p>Note: Searching and filtering works seperately</p>
        </div>
      )}
    </>
  );
}
