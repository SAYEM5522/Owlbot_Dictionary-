import React from 'react'

const FilterType = ({ filteredType, handleFilterChange }) => {
  return (
    <div className='px-3 py-2'>
    <select className='border w-full' id="typeFilter" value={filteredType} onChange={handleFilterChange}>
      <option value="">All</option>
      <option value="noun">Noun</option>
      <option value="verb">Verb</option>
      <option value="adjective">Adjective</option>
      <option value="adverb">Adverb</option>
      <option value="interjection">Interjection</option>
      {/* Add more options for other types as needed */}
    </select>
  </div>
  )
}

export default FilterType