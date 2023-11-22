import React, { useState, useEffect } from 'react';

const ViewFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [filteredType, setFilteredType] = useState(''); // Default: Show all types

  useEffect(() => {
    // Fetch favorites from local storage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (word) => {
    // Remove the word from favorites
    const updatedFavorites = favorites.filter((favorite) => favorite.word !== word);
    setFavorites(updatedFavorites);

    // Update local storage
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleFilterChange = (event) => {
    setFilteredType(event.target.value);
  };

  const filteredFavorites = favorites.filter(
    (favorite) => !filteredType || favorite.type === filteredType
  );
  console.log(favorites)

  return (
    <div>
      <h2>Favorite Words</h2>

      {/* Filter by type dropdown */}
      <label htmlFor="typeFilter">Filter by Type: </label>
      <select id="typeFilter" value={filteredType} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="noun">Noun</option>
        <option value="verb">Verb</option>
        <option value="adjective">Adjective</option>
        {/* Add more options for other types as needed */}
      </select>

      {/* Display favorites or "No items found" message */}
      {filteredFavorites.length > 0 ? (
        <ul>
          {filteredFavorites.map((favorite, index) => (
            <li key={index}>
              <h3>{favorite.word}</h3>
              {
                favorite?.definition?.map((item,i)=>(
                  <div key={i}>
                    <p>Definition: {item.definition}</p>
                    <p>Example: {item.example}</p>
                  </div>
                ))
              }
              <button onClick={() => handleRemoveFavorite(favorite.word)}>
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
};

export default ViewFavorites;
