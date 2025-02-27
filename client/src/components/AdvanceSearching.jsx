import { useState } from "react";

function AdvanceSearching() {
  const [nameSearch, setNameSearch] = useState("");

  function handleSearch() {
    //later fill seach prop method
  }
  return (
    <div className="advanceSearching">
      <label>
        Name:
        <input
          type="text"
          value={nameSearch}
          onChange={(event) => {
            setNameSearch(event.target.value);
          }}
        />
      </label>
      <select name="genre" value="">
        <option value="" disabled>
          Select Genre
        </option>
      </select>
      <select name="stores" value="">
        <option value="" disabled>
          Select Store
        </option>
      </select>
      <select name="platform" value="">
        <option value="" disabled>
          Select Platform
        </option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default AdvanceSearching;
