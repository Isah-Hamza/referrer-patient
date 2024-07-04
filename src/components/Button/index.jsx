import React from 'react'

const index = ({ className, title, onClick}) => {
  return (
    <button onClick={onClick} className={`w-full py-3 bg-primary text-white rounded-[30px] ${className}`} >{title}</button>
  )
}

export default index
