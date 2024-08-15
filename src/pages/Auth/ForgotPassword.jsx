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
import { IoMdArrowBack } from "react-icons/io";
import { useMutation } from 'react-query';
import Auth from '../../services/Auth';
import { errorToast, successToast } from '../../utils/Helper';
import LoadingModal from '../../Loader/LoadingModal';
import { axiosClient } from '../../api/axiosClient';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const { mutate, isLoading  } = useMutation(Auth.ForgotPassword, {
    onSuccess: res => {
        successToast(res.data.message);        
        axiosClient().defaults.headers["Authorization"] = "Bearer " + res.data.token;
        window.localStorage.setItem('referrer-token',res.data.token);

        navigate(`/otp-verification?email=${email}`);
    },
    onError: e => { 
      errorToast(e[0]['email'][0]);
    }
})

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
                  <Input value={email} onChange={e => setEmail(e.target.value)} label={'Email Address'} placeholder={'support@lifebridge.com'} type={'email'} icon={<MdOutlineMarkEmailUnread size={22} />}/>
              </div>
              
              <div className='mt-5' >
                  <Button disabled={!email} onClick={() => mutate({email})} title='Request New Password' />
              </div>
        </div>
      </div>
      {
        (isLoading) ? <LoadingModal /> : null
      }
    </AuthLayout>
  )
}

export default ForgotPassword
