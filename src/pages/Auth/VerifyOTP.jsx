import React, { useEffect, useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { CiUser } from "react-icons/ci";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineLockPerson } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Button from '../../components/Button'; 
import Input from '../../components/Inputs';
import {Link} from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineAccountTree } from "react-icons/md";


const VerifyOTP = () => {


  return (
    <AuthLayout>
      <div className="p-10 h-screen overflow-y-auto flex flex-col">
        <Link to={'/forgot-password'} className='flex items-center gap-2 hover:text-primary hover:font-semibold' > <IoMdArrowBack /> Change Email</Link>
        <div className="max-w-[450px] m-auto flex flex-col justify-center  flex-1">
              <div className='' >
                  <h4 className='font-semibold text-xl'>OTP Verification</h4>
                  <p className='text- text-text_color'>A 6-digit code has been sent to your email address. Please enter the code below to proceed.</p>
              </div>
              <div className="mt-10">
                  <Input placeholder={'123-456'} title={'Enter OTP'}  icon={<MdOutlineAccountTree size={22} />}/>
              </div>
              
              <Link to={'/change-password'} className='mt-5' >
                  <Button onClick={null} title='Vefify OTP' />
              </Link>
        </div>
      </div>
    </AuthLayout>
  )
}

export default VerifyOTP
