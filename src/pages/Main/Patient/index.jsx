import React, { useState } from 'react'
import logo from '../../../assets/images/logo.svg';
import Button from '../../../components/Button'
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import OTPInput from 'react-otp-input';
import Input from '../../../components/Inputs';
import { CiUser } from 'react-icons/ci';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { BiPhoneIncoming } from 'react-icons/bi';
import avatar from '../../../assets/images/stacey.svg';

const Patient = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const [process, setProcess] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    const toggleConfirmed = () => setConfirmed(!confirmed);

    const nextStep = () => setActiveTab(activeTab + 1);
    const previousStep = () => {
        toggleConfirmed();
        setActiveTab(activeTab - 1)
    };

    const tabs = [
        {
            title:'Redeem Referral / Start Appointment',
            desc:'Begin the process by entering your referral code or proceed without one.',
        },
        {
            title:'Confirm Information / Input Test Details',
            desc:'Verify your personal information and provide details about the test you need.',
        },
        {
            title:'Book Appointment',
            desc:'Choose a convenient date and time for your appointment from the available slots.',
        },
        {
            title:'Appointment Summary',
            desc:'Your appointment is now scheduled. You will receive a confirmation and further instructions.',
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

  return (
    <div className='flex p-3 h-screen' >
      <div className="w-[500px] bg-[#c9e6ff] rounded-2xl h-full p-8">
        <div className="">
            <img className='w-40' src={logo} alt="logo" />
            <div className="mt-14 grid gap-8">
                {
                    tabs.map((tab,idx) => (
                        <div className='flex gap-5 max-w-[400px]' >
                            <div className={`rounded-full out border-2  grid place-content-center w-10 h-10 ${activeTab == idx ? 'border-light_blue' : ''} `}>
                                <div className={`rounded-full mid border-2 border-white grid place-content-center w-9 h-9 bg-primary ${activeTab == idx ? 'border-light_blue' : 'bg-white border-gray-400'}`}>
                                    <div className={`rounded-full in grid place-content-center w-3 h-3 ${activeTab == idx ? ' bg-[#c9e6ff]' : 'bg-gray-400'}`}>
                                    </div>
                                </div>
                            </div>
                            <div className="text-text_color text-sm">
                                <p className='text-base font-medium' >{tab.title}</p>
                                <p className=''>{tab.desc}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
       { activeTab == 0 ? <div className="w-full h-full grid place-content-center">
            <div className="max-w-[400px] text-sm text-center">
                <p className='font-bold text-base mb-2'>Redeem Referral Code</p>
                <p>Enter your referral code below to schedule your test and book an appointment.</p>
                <div className="">
                    <div className="mt-14 grid place-content-center">
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        shouldAutoFocus={true}
                        numInputs={6}
                        placeholder={'J4UT9P'}
                        containerStyle={{ display:'flex', gap:'10px' }}
                        inputStyle={{ borderBottom:'2px solid #dcdcdc', fontSize:30, width:'1.3em', height:'2em', outline:'none', color:'#dcdcdc', fontWeight:700 }}
                        renderSeparator={<span> </span>}
                        renderInput={(props) => <input {...props} />}
                        />
                    </div>
                <div className='mt-20 ' >
                        <Button className={'!py-2.5'} onClick={nextStep} title='Verify Referral' />
                        <div className="flex items-center gap-2 my-7">
                            <hr className='flex-1' />
                            <span className='font-semibold text-sm' >OR</span>
                            <hr className='flex-1' />
                        </div>
                        <button 
                            onClick={() => {setProcess('manual'); nextStep()}} 
                            className='w-full font-medium justify-center flex items-center gap-2 py-2.5 border bg-white rounded-[30px]' > 
                        Book Appointment Manually </button>
                </div>
                </div>
            </div>
        </div> : activeTab == 1 ?
        <div className='max-w-[550px] ml-20 py-14' >
           { !confirmed ? <>
                <div id='' className="">
                    <p className='font-semibold mb-1' >Patient Details</p>
                    <p className='text-sm' >Please kindly edit and confirm your information below.</p>
                </div>
                <div className="grid gap-5 mt-7">
                    <div className="">
                        <Input label={'Email Address'} placeholder={'support@lifebridge.com'} type={'email'} icon={<MdOutlineMarkEmailUnread size={22} />}/>
                    </div>
                    <div className="">
                        <Input label={'First Name'} placeholder={'John Doe'} icon={<CiUser size={24} />}/>
                    </div>
                    <div className="">
                        <Input label={'Last Name'} placeholder={'Emmanuella'} icon={<CiUser size={24} />}/>
                    </div>
                    <div className="">
                        <Input label={'Phone Number'} placeholder={'Phone Number'} icon={<BiPhoneIncoming size={24} />}/>
                    </div>
                    <div className="">
                        <p className='font-medium mb-1 text-sm' >Invited By</p>
                        <div className='rounded-full p-1.5 text-sm w-fit bg-custom_gray flex gap-2 px-2 pr-5' >
                            <img className='w-10' src={avatar} alt="avatar" />
                            <div>
                                <p className='font-semibold' >Emmanuel Igwe</p>
                                <p>Code Invite: <span className='font-semibold' >JUPQR</span> </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex items-center justify-between">
                        <button onClick={previousStep} className='underline' >back</button>
                        <Button onClick={toggleConfirmed} className={'!w-fit !px-12 !py-2.5 !text-sm'} title={'Confirm Details'} />
                    </div>
                </div>
            </>
            :
            <>
                <div id='' className="">
                    <div className="mb-7 flex items-center justify-between">
                        <p className='font-semibold mb-1' >Patient Details</p>
                        <button onClick={toggleConfirmed} className='underline text-sm' >Edit Details</button>
                    </div>
                    <div className="grid gap-3 text-sm pb-16 border-b">
                        <p className='text-sm' >Emmanuella Bami</p>
                        <p className='text-sm' >emma.nuella2024@gmail.com</p>
                        <p>(234) 123-4567-890</p>
                        <p>Refered by: Emmanuella Igwe</p>
                    </div>
                    <div className="mt-10">
                        <div id='' className="">
                            <p className='font-semibold mb-1' >Assigned Tests Details</p>
                            <p className='text-sm' >Review and proceed to book appointment.</p>
                        </div>
                        <div className="mt-7 grid grid-cols-2 gap-3">
                            {
                                selectedTests.map((item,idx) => (
                                <div key={idx} className='relative grid  text-sm bg-[#f9f9f9] border p-3 rounded-lg ' >
                                <p className='font-medium mb-1' >{ item.type }</p>  
                                <p className='uppercase mb-7' >{ item.category }</p>  
                                <p className='mt-auto text-light_blue text-lg font-semibold' >{ item.amount }</p>
                                {/* <button className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white border grid place-content-center">
                                    <BsFillTrashFill size={15} color='red' />
                                    </button>   */}
                                </div>
                                ))
                            }
                        </div>
                        <div className="mt-4">
                            <p className='text-sm'>Total Test Amount: <span className='font-semibold'>₦54,500</span></p>
                            <div className="mt-16 flex items-center justify-between">
                                <button onClick={previousStep} className='underline' >back</button>
                                <Button onClick={nextStep} className={'!w-fit !px-12 !py-2.5 !text-sm'} title={'Proceed To Appointment'} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
            }
        </div> : null
        }

      </div>
    </div>
  )
}

export default Patient
