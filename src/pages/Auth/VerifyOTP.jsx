import React, { useEffect, useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { CiUser } from "react-icons/ci";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineLockPerson } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Button from '../../components/Button'; 
import Input from '../../components/Inputs';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineAccountTree } from "react-icons/md";
import { useMutation } from 'react-query';
import Auth from '../../services/Auth';
import { errorToast, successToast } from '../../utils/Helper';
import LoadingModal from '../../Loader/LoadingModal';
import { axiosClient } from '../../api/axiosClient';


const VerifyOTP = () => {

  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const search = useLocation().search;
  const email = new URLSearchParams(search).get('email');

  const { mutate, isLoading  } = useMutation(Auth.VerifyOTP, {
    onSuccess: res => {
        successToast(res.data.message);   
        window.localStorage.setItem('referrer-user_id',res.data.user_id);
        axiosClient().defaults.headers["Authorization"] = "Bearer " + res.data.token;
        window.localStorage.setItem('referrer-token',res.data.token);

        navigate(`/change-password`);
    },
    onError: e => { 
      errorToast(e.message ?? e.error);
    }
})

useEffect(() => {
  
  if(!email){
    navigate('/forgot-password', { replace:true })
  }
  
}, [email])



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
                  <Input placeholder={'123-456'} value={otp} onChange={e => setOtp(e.target.value)} title={'Enter OTP'}  icon={<MdOutlineAccountTree size={22} />}/>
              </div>
              
              <div className='mt-5' >
                  <Button onClick={() => mutate({ email, otp:otp })} title='Vefify OTP' />
              </div>
        </div>
      </div>
      {
        isLoading ? <LoadingModal /> : null
      }
    </AuthLayout>
  )
}

export default VerifyOTP
