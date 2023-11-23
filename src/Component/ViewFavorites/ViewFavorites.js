import React, { useState } from 'react';
import useViewFavorites from './Hooks/useViewFavorites';
import FilterType from './FilterType';
import FavoriteListItem from './FavoriteListItem';

const ViewFavorites = () => {
  const [favorites, updateFavorites] = useViewFavorites();
  const [filteredType, setFilteredType] = useState(''); // Default: Show all types

  const handleRemoveFavorite = (word, partOfSpeech, definition) => {
    // Remove the word from favorites based on word, part of speech, and definition
    const updatedFavorites = favorites.filter(
      (favorite) => !(favorite.word === word && favorite.partOfSpeech === partOfSpeech && isEqualDefinition(favorite.definition, definition))
    );
    updateFavorites(updatedFavorites);
  };
  
  // Utility function to check if two definitions are equal
  const isEqualDefinition = (def1, def2) => {
    if (def1.length !== def2.length) {
      return false;
    }
  
    for (let i = 0; i < def1.length; i++) {
      if (def1[i].definition !== def2[i].definition || def1[i].example !== def2[i].example) {
        return false;
      }
    }
  
    return true;
  };
  

  const handleFilterChange = (event) => {
    setFilteredType(event.target.value);
  };

  const filteredFavorites = favorites.filter(
    (favorite) => !filteredType || favorite.partOfSpeech === filteredType
  );

  return (
    <div className='flex flex-col items-start'>
      <FilterType filteredType={filteredType} handleFilterChange={handleFilterChange} />
      <div>
      {filteredFavorites.length > 0 ? (
        <ul className='flex flex-row flex-wrap'>
          {filteredFavorites.map((favorite, index) => (
            <FavoriteListItem
            key={index}
            favorite={favorite}
            handleRemoveFavorite={handleRemoveFavorite}
          />
          ))}
        </ul>
      ) : (
        <p className='p-5'>No favorite words found.</p>
      )}
      </div>
      
    </div>
  );
};

export default ViewFavorites;
