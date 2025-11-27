import React from "react";

function SearchBar({ city, onCityChange, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter city name"
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

export default SearchBar;