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

const ForgotPassword = () => {


  return (
    <AuthLayout>
      <div className="p-10 h-screen overflow-y-auto flex flex-col">
        <Link to={'/login'} className='flex items-center gap-2 hover:text-primary hover:font-semibold' > <IoMdArrowBack /> Back to signin</Link>
        <div className="max-w-[450px] m-auto flex flex-col justify-center  flex-1">
              <div className='' >
                  <h4 className='font-semibold text-xl'>Forgot Password</h4>
                  <p className='text- text-text_color'>Oops, sorry to hear that. Enter your email address below, and we’ll help you reset your password!</p>
              </div>
              <div className="mt-10">
                  <Input label={'Email Address'} placeholder={'support@lifebridge.com'} type={'email'} icon={<MdOutlineMarkEmailUnread size={22} />}/>
              </div>
              
              <Link to={'/otp-verification'} className='mt-5' >
                  <Button onClick={null} title='Request New Password' />
              </Link>
        </div>
      </div>
    </AuthLayout>
  )
}

export default ForgotPassword
