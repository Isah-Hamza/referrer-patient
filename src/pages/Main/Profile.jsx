import React, { useState } from 'react'
import { BiCopy, BiPhoneIncoming, BiSolidUserDetail, BiTrashAlt, BiUser } from "react-icons/bi";
import { CgClose } from 'react-icons/cg';
import { CiLocationOn, CiUser } from 'react-icons/ci';
import { MdOutlineLockPerson, MdOutlineMarkEmailUnread, MdTitle } from 'react-icons/md';
import { PiTestTubeFill } from "react-icons/pi";
import Select from '../../components/Inputs/Select';
import { BsCaretRight, BsFillTrashFill } from 'react-icons/bs';
import Button from '../../components/Button'
import success from '../../assets/images/success.svg';
import { IoIosArrowForward } from "react-icons/io";
import Input from '../../components/Inputs';
import { RiBankCardLine } from 'react-icons/ri';
import { GrSettingsOption } from 'react-icons/gr';
import avatar from '../../assets/images/avatar.svg'
import { FaLocationPin } from 'react-icons/fa6';
import { RiBankCard2Line } from "react-icons/ri";
import { MdOutlineAccountTree } from "react-icons/md";
import deleteIcon from '../../assets/images/delete.svg';

const Profile = ({  }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [successful, setSuccessful] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const toggleSuccessful = () => setSuccessful(!successful);
  const toggleDeleteAccount = () => setDeleteAccount(!deleteAccount);

  const tabs = [
    {
      title:'Profile Details',
      icon:<BiSolidUserDetail size={20} />,
      onClick:() => { document.querySelector('#patient').scrollIntoView() },
    },
    {
      title:'Payout Settings',
      icon:<RiBankCardLine size={20} />,
      onClick:() => {
        console.log('clicked')
        document.querySelector('#test').scrollIntoView()},
    },
    {
      title:'Account & Security',
      icon:<GrSettingsOption size={20} />,
      onClick:() => {
        console.log('clicked')
        document.querySelector('#test').scrollIntoView()},
    },
  ]


  const close = () => {
    toggleSuccessful();
  }


  return (
     <div className='w-full bg-white rounded-xl flex' >
      { !successful ? 
      <>
        <div className="w-[350px] border-r h-[calc(100vh-120px)] p-5 pt-7">
        <p className='font-semibold pl-7' >Settings</p> 
        <div className="mt-7 grid gap-7 max-w-[250px]">
          {
            tabs.map((item,idx) => (
              <div onClick={() =>{ setActiveTab(idx); item.onClick()}} key={idx} 
                    className={`hover:font-medium hover:opacity-90 cursor-pointer text-sm flex items-center gap-2 rounded-3xl p-3 px-6 opacity-60 ${idx == activeTab && '!opacity-100 bg-[#f9f9f9] !font-medium'}`} >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </div>
            ))
          }
        </div>
        </div>
        { activeTab == 0 ? 
        <div className="flex-1 p-10 pt-7  h-[calc(100vh-120px)] overflow-y-auto">
          <div className="flex justify-between">
              <div id='patient' className="">
                <p className='font-semibold mb-1' >Profile Details</p>
                <p className='text-sm' >Manage your profile.</p>
              </div>
          </div>
          <div className="mt-10 flex gap-5 items-center">
            <img className='w-24' src={avatar} alt="user" />
            <div className="grid gap-1">
              <p className='font-medium' >Profile Picture</p>
              <p className='text-text_color text-sm' >PNG, JPG, GIF max size of 5MB</p>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 max-w-[600px]">
            <div className="">
                <Input label={'First Name'} placeholder={'John Doe'} icon={<CiUser size={24} />}/>
            </div>
            <div className="">
                <Input label={'Last Name'} placeholder={'Doe'} icon={<CiUser size={24} />}/>
            </div>
            <div className=" col-span-2">
                <Input label={'Email Address'} placeholder={'support@lifebridge.com'} type={'email'} icon={<MdOutlineMarkEmailUnread size={22} />}/>
            </div>
            <div className=" col-span-2">
                <Input label={'Phone Number'} placeholder={'Phone Number'} icon={<BiPhoneIncoming size={24} />}/>
            </div>
            <div className=" col-span-2">
                <Input label={'Hospital Name'} placeholder={'Lifebridge Medical Diagnostic'} icon={<CiUser size={24} />}/>
            </div>
            <div className="">
                <Input label={'Location'} placeholder={'Wuye, Abuja'} icon={<CiLocationOn size={24} />}/>
            </div>
            <div className="">
                <Select label={'Professional Title'} options={[{label:'Gyneacology',value:0,}]} icon={<MdTitle size={24} />}/>
            </div>
          </div>
          <div className='w-fit mt-10' >
            <Button className={'px-14'} title={'Update'} />
          </div>
        </div>
        : activeTab == 1 ? 
        <div className="flex-1 p-10 pt-7  h-[calc(100vh-120px)] overflow-y-auto">
        <div className="flex justify-between">
            <div id='patient' className="">
              <p className='font-semibold mb-1' >Payout Settings</p>
              <p className='text-sm' >Manage your bank information.</p>
            </div>
        </div>

        <div className="mt-5 grid gap-5 max-w-[600px]">
        <div className="mt-5">
                <Select label={'Bank Name'} options={[]} icon={<RiBankCard2Line size={22} />}/>
            </div>
            <div className="">
                <Input label={'Account Number'}  placeholder={'0232322951'} icon={<MdOutlineAccountTree size={22} />}/>
            </div>
            <div className="">
                <Input label={'Account Name'}  placeholder={'Isah Hamza Onipe'} icon={<BiUser size={22} />}/>
            </div>
        </div>
        <div className='w-fit mt-10' >
          <Button className={'px-14'} title={'Update'} />
        </div>
      </div>
        : activeTab == 2 ?
        <div className="flex-1 p-10 pt-7  h-[calc(100vh-120px)] overflow-y-auto">
        <div className="flex justify-between">
            <div id='patient' className="">
              <p className='font-semibold mb-1' >Account & Security</p>
              <p className='text-sm' >Update your old password.</p>
            </div>
        </div>

        <div className="mt-10 grid gap-5 max-w-[600px]">
            <div className="">
                <Input label={'Old Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
            </div>
            <div className="">
                <Input label={'New Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                <p className='text-xs text-text_color' >Password must contain at least one lowercase letters, uppercase letters, numbers and special symbols</p>
            </div>
            <div className="">
                <Input label={'Confirm New Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
            </div>
          </div>
        <div className='w-fit mt-10' >
          <Button className={'px-14'} title={'Update Password'} />
        </div>
        <hr className='w-full my-3 mt-14' />
        <button onClick={toggleDeleteAccount} className={'text-red-700 font-semibold'}>Delete Account</button>
        </div>
        : null
      }
      </>:
       <div className='p-10 h-[calc(100vh-130px)] flex flex-col justify-center items-center w-full' >
            <img className='-mt-5 w-[120px]' src={success} alt="success" />
            <div className="max-w-[600px] grid justify-center text-center">
              <p className='font-semibold' >You have successfuly referred Emmanuella Bami</p>
              <p className='text-sm max-w-[450px] text-center mx-auto ' >Get ready for a surprise! When your patients make a payment, your rebate will be sent to your wallet within 24 hours. </p>
                <p className='mt-6' >Copy your referral link below:</p>
                <div className="flex justify-between items-center gap-10 mt-3 bg-[#f9f9f9] text-light_blue rounded-3xl border px-1 pl-3 py-1">
                  <p className='underline ' >https://www.patients.lifebridge.com?ref=UYBFJK</p>
                  <button className='rounded-3xl text-black font-semibold bg-light_blue px-5 py-2 flex items-center gap-1' >
                    <BiCopy />
                    Copy
                  </button> 
                </div>
                <p className='mt-10' >Or Copy Your Invite Code</p>
                  <div className='mx-auto font-semibold text-light_blue px-5 py-2 flex items-center gap-1' >
                    UYBFJK
                    <BiCopy />
                  </div>
                  <div className="mt-10 justify-center flex items-center gap-7">
                    <button className='rounded-3xl text-white font-semibold bg-primary px-10 py-3 flex items-center gap-1' >
                      Share Link
                      <IoIosArrowForward />
                    </button> 
                    <button onClick={close} className='font-semibold' >Cancel</button>
                  </div>
            </div>
        </div>  
        }
      {
        deleteAccount ? 
        <div className='bg-black/50 fixed inset-0 grid place-content-center' >
          <div className="bg-white w-[350px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
            <img className='w-12 m-auto' src={deleteIcon} alt="delete" />
            <p className='text-base font-semibold' >Delete Your Account</p>
            <p className='text-sm' >Are you sure you want to delete your account? This action is irreversible.</p>
            <div className="mt-10 flex items-center gap-5 ">
            <Button onClick={toggleDeleteAccount} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
            <Button onClick={toggleDeleteAccount} className={'!px-5 bg-red-600'} title={'Yes Proceed'} />
            </div>
          </div>
        </div> : null
      }
    </div>
  )
}

export default Profile
