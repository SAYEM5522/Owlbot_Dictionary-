import React, { useState } from 'react'
import useData from './useData';

const SearchDictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { wordData, loading, error, fetchWordData } = useData();
  const handleSearch = () => {
    if (searchTerm) {
      fetchWordData(searchTerm);
    }
  };
   
   const handleFavorite = (item) => {
    // if (wordData && wordData.length > 0) {
      const newFavorite = {
        partOfSpeech: item?.partOfSpeech,
        definition:item.definitions.slice(0,2),
        word:wordData[0]?.word
        // Add other properties you want to store
      };
  
      // Fetch existing favorites from local storage
      const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
      // Check if the new favorite already exists in the array
      const isDuplicate = existingFavorites.some((favorite) => favorite.word === newFavorite.word);
      if (!isDuplicate) {
        // Append the new favorite to the array
        const updatedFavorites = [...existingFavorites, newFavorite];
        // Store the updated array back into local storage
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      }
    // }
  };
  
  return (
    <div>
      <div>
      <input
        type="text"
        value={searchTerm}
        placeholder=''
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      </div>
      <div>
      {wordData && wordData.length > 0 && (
        <div>
          {wordData.map((wordItem, index) => (
            <div key={index}>
              {wordItem.meanings && (
                <div className='flex flex-wrap flex-row' >
                  {wordItem.meanings.map((meaning, meaningIndex) => (
                    <div className='bg-red-100 items-start m-2 p-1' key={meaningIndex}>
                      <h4>{meaning.partOfSpeech}</h4>
                      {/* show the first 2 defination */}
                      {meaning.definitions.slice(0, 2).map((definition, defIndex) => (
                    <div key={defIndex}>
                      <p>Definition: {definition.definition}</p>
                      <p>Example: {definition.example}</p>
                    </div>
                  ))}
                    </div>
                  ))}
                </div>
              )}
              <button onClick={() => handleFavorite(wordItem?.meanings[0])}>Favorite</button>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  )
}

export default SearchDictionary