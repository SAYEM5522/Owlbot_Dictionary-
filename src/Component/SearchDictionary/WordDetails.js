import React from 'react'

const WordDetails = ({meaning}) => {
  return (
    <div>
      <h4 className='text-left capitalize'><strong>Type: </strong>{meaning.partOfSpeech}</h4>
                                {/* show the first 2 defination */}
                                {meaning.definitions.slice(0, 2).map((definition, defIndex) => (
                              <div key={defIndex}>
                                <p className='text-left '><strong>Definition: </strong> {definition.definition}</p>
                                {
                                  definition.example&&
                                  <p className='text-left'><strong>Eample: </strong> {definition.example}</p>
                                }
                              </div>
                            ))}
    </div>
  )
}

export default WordDetails