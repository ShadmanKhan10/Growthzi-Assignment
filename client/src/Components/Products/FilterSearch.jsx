import React, { useContext } from "react";
import searchLight from "../../assets/Images/search-light.png";
import searchDark from "../../assets/Images/search-dark.png";
import { ModeContext } from "../../Context/ModeContext";

export default function FilterSearch({
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  const { isDarkModeEnabled } = useContext(ModeContext);

  return (
    <div className="product-filter-search-container">
      <div
        className="left-search-container"
        style={{ border: isDarkModeEnabled ? "0.5px solid white" : "" }}
      >
        <div className="input-container">
          <input
            style={{ color: isDarkModeEnabled ? "white" : "black" }}
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="search-input"
            placeholder="Search"
          />
          <div className="search-img-container">
            <img
              src={isDarkModeEnabled ? searchDark : searchLight}
              alt="search"
              className="search-img"
            />
          </div>
        </div>
      </div>

      <div className="category-filter-container">
        <select
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            backgroundColor: isDarkModeEnabled ? "black" : "white",
            color: isDarkModeEnabled ? "white" : "black",
          }}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
