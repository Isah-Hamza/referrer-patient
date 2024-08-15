import React, { useEffect, useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { IoIosArrowForward } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";

import StepOne from '../../components/Register/StepOne';
import StepTwo from '../../components/Register/StepTwo';

const Register = () => {
    const tabs = ['Basic Info','Hospital & Payout Info','Access Dashboard'];
    const [activeTab, setActiveTab] = useState(1);

    const next = () =>{
         setActiveTab(prev => prev+1);
        };

  return (
    <AuthLayout>
      <div className="p-10 h-screen overflow-y-auto">
        <div className="flex items-center gap-7">
            {
                tabs.map((tab,idx) => (
                    <div key={idx} className='flex gap-5 items-center'>
                        <div className="flex items-center gap-1">
                            <div className={`${activeTab == idx && 'text-primary font-semibold'} ${activeTab > idx && 'bg-green-500 font-semibold'} grid place-content-center w-6 h-6 rounded-full bg-[gainsboro] text-sm`}>
                              {
                                activeTab > idx ? <IoMdCheckmark size={18} color='white' /> :
                               <span>{idx + 1}</span> 
                               }
                            </div>
                            <p className={`${activeTab == idx && 'text-primary font-semibold'} ${activeTab > idx && 'text-green-500 font-semibold'}`} >{tab}</p>
                        </div>
                        { idx+1 != tabs.length ? <IoIosArrowForward /> : null }
                    </div>
                ))
            }
        </div>
        {
            activeTab == 0 ?
                <StepOne next={next} /> :
            activeTab == 1 ? 
                <StepTwo next={next} /> :
            null
        }
      </div>
    </AuthLayout>
  )
}

export default Register
