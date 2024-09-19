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
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { CustomValidationError } from '../../components/Register/StepOne';
import { useMutation } from 'react-query';
import { errorToast, successToast } from '../../utils/Helper';
import Auth from '../../services/Auth';
import LoadingModal from '../../Loader/LoadingModal';
import { axiosClient } from '../../api/axiosClient';

const Login = () => {
  const navigate = useNavigate();

  const { mutate, isLoading  } = useMutation(Auth.Login, {
    onSuccess: res => {
        successToast(res.data.message);
        axiosClient().defaults.headers["Authorization"] = "Bearer " + res.data.token;
        window.localStorage.setItem('referrer-token',res.data.token);
        
        const data = {
          name:res.data.name,
          balance:res.data.balance,
          total_referrals:res.data.total_referrals,
          pending_referrals:res.data.pending_referrals,
          completed_referrals:res.data.completed_referrals,
          doctor_id:res.data.doctor_id,
        }

        window.localStorage.setItem('referrer-data',JSON.stringify(data));

        navigate('/dashboard', {state:{data} });
    },
    onError: e => {
        errorToast(e.message);
    }
})

const { touched, errors, values, getFieldProps, handleSubmit } = useFormik({
  initialValues:{
    email:'',
    password:'',
  },
  validationSchema:Yup.object().shape({
    email:Yup.string().email().required(),
    password:Yup.string().required(),
  }),
  onSubmit:values => {

    mutate(values);
  }
});

  return (
    <AuthLayout>
      <div className="grid place-content-center p-10 h-screen overflow-y-auto">
      <form onSubmit={handleSubmit} className="w-full sm:w-[500px] m-auto">
        <div className='' >
            <h4 className='font-semibold text-xl' >Sign In</h4>
            <p className='text- text-text_color'>Welcome back. We missed you!</p>
        </div>
        <div className="mt-10">
            <Input label={'Email Address'} {...getFieldProps('email')} placeholder={'support@lifebridge.com'} type={'email'} icon={<MdOutlineMarkEmailUnread size={22} />}/>
            {
                touched.email && errors.email && <CustomValidationError text={errors.email} />
            }
        </div>
        <div className="mt-5">
            <Input label={'Enter Password'} type={'password'} placeholder={'************'} {...getFieldProps('password')} icon={<MdOutlineLockPerson size={22} />}/>
            <div className="flex items-center justify-between">
            {
                touched.password && errors.password && <CustomValidationError text={errors.password} />
            }
            <Link to={'/forgot-password'} className='text-sm text-primary font-semibold' >forgot password</Link>
            </div>
        </div>
        <div className='mt-10' >
            <Button type='submit' className={'opacity-90'} title='Sign In' />
            {/* <Button type='button' className={'mt-5 opacity-90'} onClick={() => navigate('/patient')} title='Sign In (Patient)' /> */}
            {/* <div className="flex items-center gap-2 my-7">
                <hr className='flex-1' />
                <span className='font-semibold text-sm' >OR</span>
                <hr className='flex-1' />
            </div>
            <button type='button' className='w-full font-medium justify-center flex items-center gap-2 py-3 border bg-white rounded-[30px]' > 
            <span><FcGoogle size={26} /></span>
            SignIn With Google </button> */}
        </div>
        <div className="mt-5">
            <p className='text-center text-sm' >
                Don't have an account? <Link to={'/register'} className='text-primary font-semibold'>Sign up</Link>
            </p>
        </div>
      </form>
      </div>
      {
        isLoading ? <LoadingModal /> : null
      }
    </AuthLayout>
  )
}

export default Login
