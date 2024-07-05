import React, { useEffect, useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { CiUser } from "react-icons/ci";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineLockPerson } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Button from '../../components/Button'; 
import Input from '../../components/Inputs';
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {

const navigate = useNavigate();
  return (
    <AuthLayout>
      <div className="p-10 h-screen overflow-y-auto">
      <div className="max-w-[500px] m-auto">
            <div className='' >
                <h4 className='font-semibold text-xl' >Sign In</h4>
                <p className='text- text-text_color'>Welcome back. We missed you!</p>
            </div>
            <div className="mt-10">
                <Input label={'Email Address'} placeholder={'support@lifebridge.com'} type={'email'} icon={<MdOutlineMarkEmailUnread size={22} />}/>
            </div>
            <div className="mt-5">
                <Input label={'Create Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                <Link to={'/forgot-password'} className='text-sm text-primary font-semibold' >forgot password</Link>
            </div>
            <div className='mt-10' >
                <Button onClick={() => navigate('/dashboard')} title='Sign In' />
                <div className="flex items-center gap-2 my-7">
                    <hr className='flex-1' />
                    <span className='font-semibold text-sm' >OR</span>
                    <hr className='flex-1' />
                </div>
                <button className='w-full font-medium justify-center flex items-center gap-2 py-3 border bg-white rounded-[30px]' > 
                <span><FcGoogle size={26} /></span>
                SignIn With Google </button>
            </div>
            <div className="mt-5">
                <p className='text-center text-sm' >
                    Don't have an account? <Link to={'/register'} className='text-primary font-semibold'>Sign up</Link>
                </p>
            </div>
    </div>
      </div>
    </AuthLayout>
  )
}

export default Login
