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
  //  example start with capitalize and end with period
  const capitalizeAndPeriod = (example) => {
    const trimmedExample = example?.trim();
  const lastCharacter = trimmedExample?.charAt(trimmedExample?.length - 1);
  if (lastCharacter === '.') {
    // Example already ends with a period
    return trimmedExample;
  }
  const words = trimmedExample?.split(' ');
  if (words.length === 0) return trimmedExample;
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };
   const handleFavorite = (item) => {
      const newFavorite = {
        partOfSpeech: item?.partOfSpeech,
        definition:item.definitions.slice(0,2).map((item,index)=>{
          return {
            definition:item.definition,
            example:item?.example&&capitalizeAndPeriod(item?.example)
          }
        }
          
        ),
        word:wordData[0]?.word
        // Add other properties you want to store
      };
      // Fetch existing favorites from local storage
      const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const isDuplicate = existingFavorites.some(
        (favorite) => favorite.word === newFavorite.word && favorite.partOfSpeech === newFavorite.partOfSpeech
      );
      if (!isDuplicate) {
        // Append the new favorite to the array
        const updatedFavorites = [...existingFavorites, newFavorite];
        // Store the updated array back into local storage
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      }
  };
  return (
    <div>
      <div className='p-5 flex flex-row items-center'>
      <input
        type="text"
        value={searchTerm}
        placeholder='Search Dictionary'
        onChange={(e) => setSearchTerm(e.target.value)}
        className=" bg-transparent px-3 py-2 rounded-md border border-black focus:outline-none"
      />
      <button className='px-3 py-2 bg-black rounded-md text-white ml-2' onClick={handleSearch}>Search</button>
      </div>
      <div className=''>
        {
          loading?
          <div>
           <p className='font-serif text-lg font-bold'>Loading...</p>
          </div>:
          <div>
            {
              error?(
                <div className='flex-1 items-center justify-center'>
                <p className=''>{error.response?.data?.message||error?.message}</p>
                </div>
              ):(
                <div>
                {wordData && wordData.length > 0 ?(
                  <div>
                    {wordData.map((wordItem, index) => (
                      <div  key={index}>
                        {wordItem.meanings && (
                          <div className='flex  flex-wrap flex-row' >
                            {wordItem.meanings.map((meaning, meaningIndex) => (
                              <div className='bg-white shadow w-[30%] rounded-md relative  items-start m-2 px-2 py-6' key={meaningIndex}>
                                <h4 className='text-left'>Type:{meaning.partOfSpeech}</h4>
                                {/* show the first 2 defination */}
                                {meaning.definitions.slice(0, 2).map((definition, defIndex) => (
                              <div key={defIndex}>
                                <p className='text-left'>Definition: {definition.definition}</p>
                                {
                                  definition.example&&
                                  <p className='text-left'>Example: {definition.example}</p>
                                }
                              </div>
                            ))}
                          <button className='absolute top-1 right-1 bg-black text-white p-1 rounded-md hover:scale-[1.01]' onClick={() => handleFavorite(meaning)}>Favorite</button>
    
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                
                )
                
                :(
                  <p className='text-center'>No search has been performed</p>
                )}
                </div>
              )
            }
          
      </div>
        }
      
      </div>
    </div>
  )
}

export default SearchDictionary