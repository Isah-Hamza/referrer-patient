import React from 'react'
import Input from '../../components/Inputs';
import { CiUser } from "react-icons/ci";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineLockPerson } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Button from '../../components/Button';

const StepOne = ({ next }) => {
  return (
    <div className="">
            <div className='mt-12' >
                <h4 className='font-semibold text-xl' >Create your account</h4>
                <p className='text- text-text_color' >Boost your earnings by 20% with our referral tracking system.</p>
            </div>
            <div className="mt-10">
                <Input label={'Full Name'} placeholder={'John Doe'} icon={<CiUser size={24} />}/>
            </div>
            <div className="mt-5">
                <Input label={'Email Address'} placeholder={'support@lifebridge.com'} type={'email'} icon={<MdOutlineMarkEmailUnread size={22} />}/>
            </div>
            <div className="mt-5">
                <Input label={'Phone Number'} type={'input'} placeholder={'+234 907 234 3434 343'} icon={<FiPhoneCall size={22} />}/>
            </div>
            <div className="mt-5">
                <Input label={'Create Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                <p className='text-xs text-text_color' >Password must contain at least one lowercase letters, uppercase letters, numbers and special symbols</p>
            </div>
            <div className="mt-5">
                <Input label={'Confirm Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
            </div>
            <div className='mt-10' >
                <Button onClick={next} title='Create Account' />
                <div className="flex items-center gap-2 my-7">
                    <hr className='flex-1' />
                    <span className='font-semibold text-sm' >OR</span>
                    <hr className='flex-1' />
                </div>
                <button className='w-full font-medium justify-center flex items-center gap-2 py-3 border bg-white rounded-[30px]' > 
                <span><FcGoogle size={26} /></span>
                Signup With Google </button>
            </div>
            <div className="mt-14">
                <p className='text-center text-sm' >
                    Already have an account? <button className='text-primary font-semibold' >Log in</button>
                </p>
            </div>
    </div>
  )
}

export default StepOne
