import React from 'react'
import WordDetails from './WordDetails'

const WordResults = ({ wordData, handleFavorite }) => {
  return (
    <div className='h-[100%] overflow-y-auto no-scrollbar'>
    {wordData && wordData.length > 0 ? (
      <div>
        {wordData.map((wordItem, index) => (
          <div className='' key={index}>
            {wordItem.meanings && (
              <div className='flex w-full flex-wrap flex-row'>
                {wordItem.meanings.map((meaning, meaningIndex) => (
                  <div className='bg-white shadow cursor-pointer hover:scale-[1.01] w-[250px] rounded-md relative items-start m-2 px-2 py-6' key={meaningIndex}>
                    <WordDetails meaning={meaning} />
                    <button className='absolute top-1 right-1 bg-black text-white p-1 rounded-md hover:scale-[1.01]' onClick={() => handleFavorite(meaning)}>Favorite</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <p className='text-center'>No search words found. Please search</p>
    )}
  </div>
  )
}

export default WordResults