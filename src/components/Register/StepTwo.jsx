import React from 'react'
import Input from '../Inputs';
import { CiUser } from "react-icons/ci";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineLockPerson } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Button from '../Button';
import { PiHospitalLight } from "react-icons/pi";
import Select from '../Inputs/Select';
import { RiBankCard2Line } from "react-icons/ri";
import { MdOutlineAccountTree } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const StepTwo = ({ next }) => {
    const navigate = useNavigate()
  return (
    <div className="">
            <div className='mt-12' >
                <h4 className='font-semibold text-xl' >Setup Profile</h4>
                <p className='text- text-text_color' >Supply the required information below.</p>
            </div>
            <div className="mt-10">
                <Input label={'Hospital Name'} placeholder={'Lifebridge Medical Diagnostic'} icon={<PiHospitalLight size={24} />}/>
            </div>
            <div className="mt-5">
                <Select label={'Professional Title'} options={[]}  icon={<CiUser size={22} />}/>
            </div>
            <div className="mt-5">
                <Select label={'Bank Name'} options={[]} icon={<RiBankCard2Line size={22} />}/>
            </div>
            <div className="mt-5">
                <Input label={'Account Number'}  placeholder={'0232322951'} icon={<MdOutlineAccountTree size={22} />}/>
            </div>
            <div className="mt-5">
                <Input label={'Account Name'}  placeholder={'Isah Hamza'} icon={<CiUser size={22} />}/>
            </div>
            <div className='mt-10' >
                <Button onClick={() => navigate('/dashboard')} title='setup Profile' />
                {/* <div className="flex items-center gap-2 my-7">
                    <hr className='flex-1' />
                    <span className='font-semibold text-sm' >OR</span>
                    <hr className='flex-1' />
                </div>
                <button className='w-full font-medium justify-center flex items-center gap-2 py-3 border bg-white rounded-[30px]' > 
                <span><FcGoogle size={26} /></span>
                Signup With Google </button> */}
            </div>
            {/* <div className="mt-14">
                <p className='text-center text-sm' >
                    Already have an account? <button className='text-primary font-semibold' >Log in</button>
                </p>
            </div> */}
    </div>
  )
}

export default StepTwo
