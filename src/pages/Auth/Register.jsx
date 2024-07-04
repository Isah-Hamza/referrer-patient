import React from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { IoIosArrowForward } from "react-icons/io";


const Register = () => {
    const tabs = ['Basic Info','Hospital & Payout Info','Access Dashboard'];
  return (
    <AuthLayout>
      <div className="p-10">
        <div className="flex items-center gap-7">
            {
                tabs.map((tab,idx) => (
                    <div className='flex gap-5 items-center'>
                        <div className="flex items-center gap-1">
                            <div className="grid place-content-center w-6 h-6 rounded-full bg-[gainsboro] text-sm">{idx + 1}</div>
                            <p>{tab}</p>
                        </div>
                        { idx+1 != tabs.length ? <IoIosArrowForward /> : null }
                    </div>
                ))
            }
        </div>
        <div className='mt-12' >
            <h4 className='font-semibold text-xl' >Create your account</h4>
            <p className='text- text-text_color' >Boost your earnings by 20% with our referral tracking system.</p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Register
