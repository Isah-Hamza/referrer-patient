import React from 'react'
import spinner from '../assets/images/loading.gif';

const PageLoading = () => {
  return (
    <div className='w-full h-[calc(100vh-150px)] text-center text-sm grid place-content-center'>
      <div className="flex items-center gap-2">
        <img className='w-10' src={spinner} />
      </div>
    </div>
  )
}

export default PageLoading
