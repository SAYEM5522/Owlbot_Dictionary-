import React, { useState, useEffect } from 'react';
import useViewFavorites from './useViewFavorites';

const ViewFavorites = () => {
  const [favorites, updateFavorites] = useViewFavorites();
  const [filteredType, setFilteredType] = useState(''); // Default: Show all types

  const handleRemoveFavorite = (word,partOfSpeech) => {
    console.log(partOfSpeech)
    // Remove the word from favorites
    const updatedFavorites = favorites.filter(
      (favorite) => !(favorite.word === word && favorite.partOfSpeech === partOfSpeech)
    );
    updateFavorites(updatedFavorites);
  };

  const handleFilterChange = (event) => {
    setFilteredType(event.target.value);
  };

  const filteredFavorites = favorites.filter(
    (favorite) => !filteredType || favorite.partOfSpeech === filteredType
  );
  console.log(filteredFavorites)

  return (
    <div className='flex flex-col items-start'>
      <div className='px-3'>
      <select id="typeFilter" value={filteredType} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="noun">Noun</option>
        <option value="verb">Verb</option>
        <option value="adjective">Adjective</option>
        <option value="adverb">Adverb</option>
        <option value="interjection">Interjection</option>


        {/* Add more options for other types as needed */}
      </select>
      </div>
      <div>
      {filteredFavorites.length > 0 ? (
        <ul className='flex flex-row flex-wrap'>
          {filteredFavorites.map((favorite, index) => (
            <li className='w-[250px] bg-white relative shadow rounded-md px-3 py-6 m-2' key={index}>
              <h3 className='text-left capitalize'>Word: {favorite.word}</h3>
              {
                favorite?.definition?.map((item,i)=>(
                  <div key={i}>
                    <p className='text-left'>Definition: {item.definition}</p>
                    {
                      item.example&&
                    <p className='text-left'>Example: {item.example}</p>

                    }
                  </div>
                ))
              }
              <button className='absolute top-1 right-1 bg-black text-white p-1 rounded-md hover:scale-[1.01]' onClick={() => handleRemoveFavorite(favorite?.word,favorite?.partOfSpeech)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className='p-5'>No favorite items found.</p>
      )}
      </div>
      
    </div>
  );
};

export default ViewFavorites;
