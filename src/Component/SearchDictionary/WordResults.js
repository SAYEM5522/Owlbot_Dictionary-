import React from 'react'
import WordDetails from './WordDetails'

const WordResults = ({ wordData, handleFavorite }) => {
  const allMeanings = wordData?.flatMap((item) => item.meanings);
  return (
    <div  className=' overflow-y-auto no-scrollbar'>
      <div className='flex w-full flex-wrap flex-row'>
                {
                  allMeanings?.length>0?(
                    <div className='flex w-full flex-wrap flex-row'>
                       {allMeanings.map((meaning, meaningIndex) => (
                  <div className='bg-white shadow border border-[whitesmoke] cursor-pointer hover:scale-[1.01] w-[250px] rounded-md relative items-start m-2 px-2 py-6' key={meaningIndex}>
                    <WordDetails meaning={meaning} />
                    <button className='absolute top-1 right-1 bg-black text-white p-1 rounded-md hover:scale-[1.01]' onClick={() => handleFavorite(meaning)}>Favorite</button>
                  </div>
                ))}
                    </div>
                  ):
                  <p className='text-center'>No search words found. Please search</p>
                }
               
              </div>
      </div>
  )
}

export default WordResults