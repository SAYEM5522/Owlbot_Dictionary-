import React from 'react'
import SearchDictionary from './SearchDictionary/SearchDictionary'
import ViewFavorites from './ViewFavorites/ViewFavorites'
const Layout = ({index}) => {
  return(
    <div>
      {
        (index===0)?(
          <div>
            <SearchDictionary/>
          </div>
        ):(
        <div>
          <ViewFavorites/>
        </div>
        )
      }
    </div>
  )
}

export default Layout