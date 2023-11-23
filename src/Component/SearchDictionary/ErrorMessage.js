import React from 'react'

const ErrorMessage = ({ error }) => {
  return (
    <div className='flex-1 items-center justify-center'>
    <p className=''>{error.response?.data?.message || error?.message}</p>
  </div>
  )
}

export default ErrorMessage