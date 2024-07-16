import React, { useState } from 'react'
import logo from '../../../assets/images/logo.svg';
import Button from '../../../components/Button'
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import OTPInput from 'react-otp-input';

const Patient = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [activeTab, setActiveTab] = useState(0);

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
      <div className="flex-1 grid place-content-center text-center">
        <div className="max-w-[400px] text-sm">
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
                    <Button className={'!py-2.5'} onClick={() => navigate('/dashboard')} title='Verify Referral' />
                    <div className="flex items-center gap-2 my-7">
                        <hr className='flex-1' />
                        <span className='font-semibold text-sm' >OR</span>
                        <hr className='flex-1' />
                    </div>
                    <button className='w-full font-medium justify-center flex items-center gap-2 py-2.5 border bg-white rounded-[30px]' > 
                    Book Appointment Manually </button>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Patient
