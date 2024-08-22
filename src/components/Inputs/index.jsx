import React, { useState } from 'react'
import { } from 'react-icons/fa'
import { FiEye, FiEyeOff } from 'react-icons/fi';


const Input = ({ disabled, label, id, type, placeholder, className, labelClass, value, defaultValue, onChange,icon, ...rest }) => {

    
    const [show, setShow] = useState(false);
    const toggle = () => setShow(!show);
    

    return (
        <div className='text-sm flex flex-col w-full'>
            <label className={`font-medium mb-0.5 ${labelClass}`} htmlFor="first_name">{label}</label>
            <div className="relative w-full">
                <input
                    type={type != 'password' ? type : show ? 'text' : 'password' }
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
                {type=='password' ? <span className="cursor-pointer absolute top-1/2 right-3 -translate-y-1/2">
                {
                show ?  <FiEyeOff onClick={toggle}  size={18}/> :  <FiEye onClick={toggle}  size={18}/>
                }

        </span> : null}
            </div>
        </div>
    )
}

export default Input
