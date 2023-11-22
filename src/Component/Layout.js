import React from 'react'
const Layout = ({index}) => {
  return(
    <div>
      {
        (index===0)?(
          <div>9</div>
        ):(
        <div>0</div>
        )
      }
    </div>
  )
}

export default Layout