import React from 'react'
import { } from 'react-icons/fa'


const Input = ({ disabled, label, id, type, placeholder, className, labelClass, value, defaultValue, onChange,icon, ...rest }) => {

    return (
        <div className='text-sm flex flex-col w-full'>
            <label className={`font-medium mb-0.5 ${labelClass}`} htmlFor="first_name">{label}</label>
            <div className="relative w-full">
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`${icon && '!pl-10'} w-full disabled:text-primary-gray focus-within:border-primary-green rounded-3xl text-sm p-3 py-3.5 border outline-none 
                        ${className}`}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    defaultValue={defaultValue}
                    {...rest}
                />
                {icon ?<span className='absolute left-3 top-1/2 -translate-y-1/2' >{icon}</span> : null}
            </div>
        </div>
    )
}

export default Input
