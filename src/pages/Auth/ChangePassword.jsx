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
import { useFormik } from 'formik';
import { CustomValidationError } from '../../components/Register/StepOne';
import * as Yup from 'yup';
import LoadingModal from '../../Loader/LoadingModal';

const ChangePassword = () => {
const navigate = useNavigate();

const { errors, handleSubmit, touched, getFieldProps } = useFormik({
  initialValues:{
      user_id:window.localStorage.getItem('referrer-user_id'),
      password:'',
      password_confirmation:'',
  },
  validationSchema: Yup.object().shape({
      password: Yup.string().required().min(8),
      password_confirmation: Yup.string().required('This field is required').oneOf([Yup.ref('password')],'Passwords mismatch'),

  }),
  onSubmit:values => {
      // console.log(values);
      mutate(values);
  }
})

const { mutate, isLoading  } = useMutation(Auth.ChangePassword, {
  onSuccess: res => {
      successToast(res.data.message);   
      // window.localStorage.setItem('referrer-user_id',res.data.user_id);

      navigate(`/login`);
  },
  onError: e => { 
    errorToast(e.error);
  }
})

  return (
    <AuthLayout>
      <div className="p-10 h-screen overflow-y-auto flex flex-col">
        <Link to={'/login'} className='flex items-center gap-2 hover:text-primary hover:font-semibold' > <IoMdArrowBack /> Back to signin</Link>
        <form onSubmit={handleSubmit} className="max-w-[450px] m-auto flex flex-col justify-center  flex-1">
              <div className='' >
                  <h4 className='font-semibold text-xl'>Change Password</h4>
                  <p className='text- text-text_color'>Enter your new password below to update your credentials.</p>
              </div>
            <div className="mt-5">
              <Input label={'Create Password'} {...getFieldProps('password')} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                {
                    touched.password && errors.password && <CustomValidationError text={errors.password} />
                }
              <p className='text-xs text-text_color' >Password must contain at least one lowercase letters, uppercase letters, numbers and special symbols</p>
          </div>
            <div className="mt-5">
                <Input label={'Confirm Password'} {...getFieldProps('password_confirmation')} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                {
                    touched.password_confirmation && errors.password_confirmation && <CustomValidationError text={errors.password_confirmation} />
                }
            </div>
            <div to={'/otp-verification'} className='mt-5' >
                <Button type='submit' title='Change Password' />
            </div>
        </form>
      </div>

      {
        isLoading ? <LoadingModal /> : null
      }
    </AuthLayout>
  )
}

export default ChangePassword
