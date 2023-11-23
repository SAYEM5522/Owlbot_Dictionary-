import React from 'react'

const FavoriteListItem = ({ favorite, handleRemoveFavorite }) => {
  return (
    <li className='w-[250px] cursor-pointer hover:scale-[1.01] bg-white relative shadow rounded-md px-3 py-6 m-2'>
    <h3 className='text-left capitalize'><strong>Word: </strong>{favorite.word}</h3>
    {favorite?.definition?.map((item, i) => (
      <div key={i}>
        <p className='text-left'><strong>Definition: </strong>{item.definition}</p>
        {item.example && <p className='text-left'><strong>Example: </strong> {item.example}</p>}
      </div>
    ))}
    <button
      className='absolute top-1 right-1 bg-black text-white p-1 rounded-md hover:scale-[1.01]'
      onClick={() => handleRemoveFavorite(favorite?.word, favorite?.partOfSpeech,favorite?.definition)}
    >
      Remove
    </button>
  </li>
  )
}

export default FavoriteListItem