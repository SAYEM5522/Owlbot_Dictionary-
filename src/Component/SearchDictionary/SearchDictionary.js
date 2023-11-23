import React, { useState } from 'react'
import useData from './Hooks/useData';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import WordResults from './WordResults';
import useFavoriteHandler from './Hooks/useFavoriteHandler';

const SearchDictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { wordData, loading, error, fetchWordData } = useData();
  const { handleFavoriteItem } = useFavoriteHandler();
  const handleSearch = () => {
    if (searchTerm) {
      fetchWordData(searchTerm);
    }
  };
  const handleSearchTerm=(e)=>{
    setSearchTerm(e.target.value)
  }
   const handleFavorite = (item) => {
    handleFavoriteItem(item,wordData)
  };
  return (
    <div className=''>
      <div className='p-5 flex flex-row items-center'>
      <input
        type="text"
        value={searchTerm}
        placeholder='Search Dictionary'
        onChange={handleSearchTerm}
        className=" bg-transparent px-3 py-2 rounded-md border border-black focus:outline-none"
      />
      <button disabled={loading} className='px-3 py-2 bg-black rounded-md text-white ml-2' onClick={handleSearch}>
      {loading ? 'Searching...' : 'Search'}
      </button>
      </div>
      <div >
        {loading?(
            <LoadingIndicator/>
          )
          :
          <div>
            {error?(
                <ErrorMessage error={error} />
              ):(
                <WordResults wordData={wordData} handleFavorite={handleFavorite} />
              )}
          </div>}
      
      </div>
    </div>
  )
}

export default SearchDictionary