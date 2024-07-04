import React from 'react'
import logo from '../assets/images/logo.svg';
import mainImg from '../assets/images/auth-image.svg';

import seamless from '../assets/images/seamless-payout.png';
import guarantee from '../assets/images/guarantee.png';
import efficiency from '../assets/images/effective-management.png';

const AuthLayout = ({ children }) => {
  return (
    <div className='flex'>
        <div className="w-[55%]">
            {children}
        </div>
        <div className="w-[45%] p-10 py-5 right-section h-screen flex flex-col">
            <div className="logo flex justify-end">
                <img className='max-w-[150px]' src={logo} alt="logo" />
            </div>
            <div className="grid justify-center items-center flex-1 mt-5 ">
                <h3 className='text-xl text-center font-bold'  >
                    Discovering the Best <br /> Platform for your service! 
                </h3>
                <div className="">
                    <img src={mainImg} alt="main image" />
                    <p className='max-w-[450px] text-center m-auto text-sm' >
                    Catching synchronise point on angel quick hear. Then shelf-ware better canatics create problem. Harvest points bed plane team productive baked hands.
                    </p>
                </div>
                <div className="flex justify-center items-center max-w-92 m-auto mt-5 flex-wrap gap-y-3 gap-x-3">
                    <button className='text-sm flex items-center gap-1 border rounded-3xl border-primary px-4 py-2' >
                        <img src={seamless} alt="seamless" />
                        <span>Seamless Payout</span>
                    </button>
                    <button className='text-sm flex items-center gap-1 border rounded-3xl border-primary px-4 py-2' >
                        <img src={guarantee} alt="seamless" />
                        <span>100% Rebate Guaranteed</span>
                    </button>
                    <button className='text-sm flex items-center gap-1 border rounded-3xl border-primary px-4 py-2' >
                        <img src={efficiency} alt="seamless" />
                        <span>Effective Management</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AuthLayout
