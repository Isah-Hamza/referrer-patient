import React, { useState } from 'react'
import { BiPhoneIncoming, BiSolidUserDetail, BiTrashAlt } from "react-icons/bi";
import { CgClose } from 'react-icons/cg';
import { CiUser } from 'react-icons/ci';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { PiTestTubeFill } from "react-icons/pi";
import Input from '../Inputs';
import Select from '../Inputs/Select';
import { BsFillTrashFill } from 'react-icons/bs';
import Button from '../Button'

const New = ({ toggleNewReferral }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title:'Referrer Information',
      icon:<BiSolidUserDetail size={20} />
    },
    {
      title:'Test Information',
      icon:<PiTestTubeFill size={20} />
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


  return (
     <div className='w-full bg-white rounded-xl flex' >
        <div className="w-[350px] border-r h-[calc(100vh-120px)] p-5 pt-7">
        <p className='font-semibold' >Referral Form Creation</p>
        <div className="mt-7 grid gap-3 max-w-[250px]">
          {
            tabs.map((item,idx) => (
              <div onClick={() => setActiveTab(idx)} key={idx} 
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
              <div className="">
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
              <div className="">
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
                    <Button title={'Submit'} className={'w-fit !px-16 !py-2.5  !bg-light_blue'} />
                </div>
          </div>
        </div>
    </div>
  )
}

export default New
