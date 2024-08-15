import React from 'react'

const index = ({ className, title, onClick, disabled, type='button'}) => {
  
  return (
    <button type={type} 
    disabled={disabled} 
    onClick={onClick} 
    className={` disabled:bg-opacity-55 font-medium w-full py-3 bg-primary text-white rounded-[30px] ${className}`} >{title}</button>
  )
}

export default index
