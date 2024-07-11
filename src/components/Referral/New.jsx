import React, { useState } from 'react'
import { BiCopy, BiPhoneIncoming, BiSolidUserDetail, BiTrashAlt } from "react-icons/bi";
import { CgClose } from 'react-icons/cg';
import { CiUser } from 'react-icons/ci';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { PiTestTubeFill } from "react-icons/pi";
import Input from '../Inputs';
import Select from '../Inputs/Select';
import { BsCaretRight, BsFillTrashFill } from 'react-icons/bs';
import Button from '../Button'
import success from '../../assets/images/success.svg';
import { IoIosArrowForward } from "react-icons/io";

const New = ({ toggleNewReferral }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [successful, setSuccessful] = useState(false);

  const toggleSuccessful = () => setSuccessful(!successful);

  const tabs = [
    {
      title:'Referrer Information',
      icon:<BiSolidUserDetail size={20} />,
      onClick:() => { document.querySelector('#patient').scrollIntoView() },
    },
    {
      title:'Test Information',
      icon:<PiTestTubeFill size={20} />,
      onClick:() => {
        console.log('clicked')
        document.querySelector('#test').scrollIntoView()},
    },
  ]

  const selectedTests = [
    {
      type:'C.T. Scan - Pelvimetry',
      category:'C.T Test',
      amount:'₦28,000',
    },
    {
      type:'Menstrual Irregularities',
      category:'Endocrinology',
      amount:'₦8,000',
    },
    {
      type:'Fibronology',
      category:'HAEMATOLOGY',
      amount:'₦5,500',
    },
  ]

  const genderOptions = [
    {
      label:'Male',
      value:1
    },
    {
      label:'Female',
      value:2
    },
  ]

  const emptyOption = [
    {
      label:'Select an option',
      value:0
    }, 
  ]

  const close = () => {
    toggleSuccessful();
    toggleNewReferral();
  }


  return (
     <div className='w-full bg-white rounded-xl flex' >
      { !successful ? <>
        <div className="w-[350px] border-r h-[calc(100vh-120px)] p-5 pt-7">
        <p className='font-semibold' >Referral Form Creation</p>
        <div className="mt-7 grid gap-3 max-w-[250px]">
          {
            tabs.map((item,idx) => (
              <div onClick={() =>{ setActiveTab(idx); item.onClick()}} key={idx} 
                    className={`hover:font-medium hover:opacity-90 cursor-pointer text-sm flex items-center gap-2 rounded-3xl p-3 px-6 opacity-60 ${idx == activeTab && 'opacity-100 bg-[#f9f9f9] font-medium'}`} >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </div>
            ))
          }
        </div>
        </div>
        <div className="flex-1 p-10 pt-7  h-[calc(100vh-120px)] overflow-y-auto">
          <div className="flex justify-between">
              <div id='patient' className="">
                <p className='font-semibold mb-1' >Patient Details</p>
                <p className='text-sm' >Please kindly enter your patient information below.</p>
              </div>
              <button onClick={toggleNewReferral} className="font-medium flex items-center gap-2">
                  <span>Close</span>
                  <CgClose />
              </button>
          </div>
          <div className=" max-w-[650px]">
              <div className="mt-6">
                  <Input label={'Email Address'} placeholder={'support@lifebridge.com'} type={'email'} icon={<MdOutlineMarkEmailUnread size={22} />}/>
              </div>
              <div className="mt-4">
                  <Input label={'Full Name'} placeholder={'John Doe'} icon={<CiUser size={24} />}/>
              </div>
              <div className="mt-4">
                  <Input label={'Phone Number'} placeholder={'Phone Number'} icon={<BiPhoneIncoming size={24} />}/>
              </div>
              <div className="mt-4">
                <Select label={'Gender'} options={genderOptions}  icon={<CiUser size={22} />}/>
            </div>
          </div>
          <div className="mt-10 flex justify-between">
              <div id='test' className="">
                <p className='font-semibold mb-1' >Test Details</p>
                <p className='text-sm' >Choose the test below to diagnose the patient with.</p>
              </div>
          </div>
          <div className=" max-w-[650px]">
            <div className="mt-6">
                <Select label={'Test Category'} options={emptyOption}  icon={<PiTestTubeFill size={22} />}/>
            </div>
            <div className="mt-4">
                <Select label={'Test Type'} options={emptyOption}  icon={<PiTestTubeFill size={22} />}/>
            </div>
            <div className="mt-7 flex items-center gap-2">
                <p className='font-semibold mb-1' >Selected Tests</p>
                <hr className='flex-1 bg-[gainsboro] text-[gainsboro]' />
            </div>
            <div className="mt-7 grid grid-cols-4 gap-5">
              {
                selectedTests.map((item,idx) => (
                  <div key={idx} className='relative grid  text-sm bg-[#f9f9f9] border p-3 rounded-lg ' >
                  <p className='font-medium mb-1' >{ item.type }</p>  
                  <p className='uppercase mb-10' >{ item.category }</p>  
                  <p className='mt-auto text-light_blue text-lg font-semibold' >{ item.amount }</p>
                  <button className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white border grid place-content-center">
                    <BsFillTrashFill size={15} color='red' />
                    </button>  
                  </div>
                ))
              }
            </div>
            <div className=" my-5 mt-12">
                    <Button onClick={toggleSuccessful} title={'Submit'} className={'w-fit !px-16 !py-2.5  !bg-light_blue'} />
                </div>
          </div>
        </div>
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
    </div>
  )
}

export default New
