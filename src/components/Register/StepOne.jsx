import React from 'react'
import Input from '../../components/Inputs';
import { CiUser } from "react-icons/ci";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineLockPerson } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Button from '../../components/Button';
import {Link} from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import Auth from '../../services/Auth';
import { toast } from 'react-toastify';
import LoadingModal from '../../Loader/LoadingModal';
import { errorToast, successToast } from '../../utils/Helper';
import { axiosClient } from '../../api/axiosClient';

export const CustomValidationError = ({ text='An error occured' }) => (
    <span className='text-xs text-red-700' >{text}</span>
)

const StepOne = ({ next }) => {

    const { errors, handleSubmit, touched, getFieldProps } = useFormik({
        initialValues:{
            full_name:'',
            email:'',
            phone_number:'',
            password:'',
            password_confirmation:'',
        },
        validationSchema: Yup.object().shape({
            full_name: Yup.string().required(),
            email: Yup.string().email().required(),
            phone_number: Yup.string().required(),
            password: Yup.string().required().min(4),
            password_confirmation: Yup.string().required('This field is required').oneOf([Yup.ref('password')],'Passwords mismatch'),

        }),
        onSubmit:values => {
            mutate(values);
        }
    })

    const { mutate, isLoading  } = useMutation(Auth.Register, {
        onSuccess: res => {
            successToast(res.data.message);
            localStorage.setItem('referrer-user', JSON.stringify(res.data.user));
            axiosClient().defaults.headers["Authorization"] = "Bearer " + res.data.user.token;

            next();
        },
        onError: e => {
            const firstError = Object.entries(e.errors)[0][1];
            errorToast(firstError);
        }
    })

  return (
    <>
        <form onSubmit={handleSubmit} className="">
            <div className='mt-12' >
                <h4 className='font-semibold text-xl' >Create your account</h4>
                <p className='text- text-text_color' >Boost your earnings by 20% with our referral tracking system.</p>
            </div>
            <div className="mt-10">
                <Input label={'Full Name'} placeholder={'John Doe'} {...getFieldProps('full_name')} icon={<CiUser size={24} />}/>
                {
                    touched.full_name && errors.full_name && <CustomValidationError text={errors.full_name} />
                }
            </div>
            <div className="mt-5">
                <Input label={'Email Address'} placeholder={'support@lifebridge.com'} {...getFieldProps('email')} type={'email'} icon={<MdOutlineMarkEmailUnread size={22} />}/>
                {
                    touched.email && errors.email && <CustomValidationError text={errors.email} />
                }
            </div>
            <div className="mt-5">
                <Input label={'Phone Number'} type={'input'} {...getFieldProps('phone_number')} placeholder={'+234 907 234 3434 343'} icon={<FiPhoneCall size={22} />}/>
                {
                    touched.phone_number && errors.phone_number && <CustomValidationError text={errors.phone_number} />
                }
            </div>
            <div className="mt-5">
                <Input label={'Create Password'} type={'password'} {...getFieldProps('password')} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                <p className='text-xs text-text_color' >Password must contain at least one lowercase letters, uppercase letters, numbers and special symbols</p>
            </div>
            <div className="mt-5" >
                <Input label={'Confirm Password'} type={'password'} {...getFieldProps('password_confirmation')} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                {
                    touched.password_confirmation && errors.password_confirmation && <CustomValidationError text={errors.password_confirmation} />
                }
            </div>
            <div className='mt-10' >
                <Button type='submit' title='Create Account' />
                {/* <div className="flex items-center gap-2 my-7">
                    <hr className='flex-1' />
                    <span className='font-semibold text-sm' >OR</span>
                    <hr className='flex-1' />
                </div>
                <button className='w-full font-medium justify-center flex items-center gap-2 py-3 border bg-white rounded-[30px]' > 
                <span><FcGoogle size={26} /></span>
                Signup With Google </button> */}
            </div>
            <div className="mt-14">
                <p className='text-center text-sm' >
                    Already have an account? <Link to={'/login'} className='text-primary font-semibold' >Log in</Link>
                </p>
            </div>
        </form>
        {
            isLoading ? <LoadingModal /> : null
        }
    </>
  )
}

export default StepOne
