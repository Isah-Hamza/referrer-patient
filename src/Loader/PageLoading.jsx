import React from 'react'
import { ImSpinner2 } from 'react-icons/im'

const PageLoading = () => {
  return (
    <div className='w-full h-[calc(100vh-150px)] text-center text-sm grid place-content-center'>
      <div className="flex items-center gap-2">
        <ImSpinner2 className='animate-spin' />
        <span>Loading Page Data</span>
      </div>
      <p>Please Wait..</p>
    </div>
  )
}

export default PageLoading
