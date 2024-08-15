import React, { useState } from 'react'
import logo from '../../assets/images/logo.svg';
import { AiOutlineHome } from "react-icons/ai";
import avatar from '../../assets/images/avatar.svg';
import { IoLogOut } from "react-icons/io5";
import { FaEye } from 'react-icons/fa6';
import { BsArrowRight } from 'react-icons/bs';
import { PiEyeClosedBold } from "react-icons/pi";
import note from '../../assets/images/note.svg';
import BarChart from '../../components/Chart/BarChart';
import stat1 from '../../assets/images/stat1.svg';
import stat2 from '../../assets/images/stat2.svg';
import stat3 from '../../assets/images/stat3.svg';

import bank from '../../assets/images/Bank.svg';
import test from '../../assets/images/Test.svg';
import earn from '../../assets/images/Earn.svg';

import refer from '../../assets/images/refer_and_earn.svg';
import { useNavigate } from 'react-router-dom';
import { ConvertToNaira } from '../../utils/Helper';

const Dashboard = () => {

    const navigate = useNavigate('');

    const page_data =  JSON.parse(localStorage.getItem('referrer-data'));

    const analysis = [
        {
            title:'Total Referrals',
            icon:stat1,
            value:page_data?.total_referrals,
        },
        {
            title:'Pending Referrals',
            icon:stat2,
            value:page_data?.pending_referrals,
        },
        {
            title:'Completed Referrals',
            icon:stat3,
            value:page_data?.completed_referrals,

        },
    ]

    const activities = [
        {
            title:'You have referred Benjamin Wales ',
            desc:'You assigned 2 tests. Waiting for your rebate.',
            time:'5m ago',
            img:test,
        },
        {
            title:'You have referred Samuel Sandra ',
            desc:'You assigned 2 tests. Waiting for your rebate.',
            time:'1m ago',
            img:test,
        },
        {
            title:'You have earned your rebate from Benjamin Wales ',
            desc:'Hurray, ₦23,000 has been added to your wallet.',
            time:'2d ago',
            img:earn,
        },
        {
            title:'You have initiated a withdrawal request.',
            desc:'₦350,000 will be credited into your bank account soon.',
            time:'2d ago',
            img:bank,
        },
        {
            title:'You have earned your rebate from Temites Flyn ',
            desc:'Hurray, ₦23,000 has been added to your wallet.',
            time:'12d ago',
            img:earn,
        },
    ]

  return (
    <>
        <div className="w-2/6 max-h-[calc(100vh-115px)] overflow-y-auto">
            <div className="p-4 rounded-lg border border-custom_gray bg-white">
                <p className='text-text_color'>Good Afternoon ☀️</p>
                <p className='text-xl font-semibold mt-2' >{page_data?.name}</p>
                <div className="mt-32">
                    <div className="flex items-center gap-1">
                        <span className='text-xs text-text_color' >Your wallet balance</span>
                        <span className='text-primary' ><PiEyeClosedBold size={16} /></span>
                    </div>
                    {/* <p className='my-1' > <span className='font-bold text-2xl ' >₦</span> <span>****</span> </p> */}
                    <p className='my-1' > <span className='font-bold text-2xl ' >{ ConvertToNaira(page_data?.balance)}.00</span> </p>
                    <button className="font-semibold flex items-center gap-1 text-primary">
                        <span className='text-sm' >Visit Wallet</span>
                        <BsArrowRight />
                    </button>
                </div>
            </div>
            <div className="rounded-lg border border-custom_gray bg-white mt-5">
                <div className="flex items-center justify-between p-3 border-b">
                    <p className='font-semibold' >Rebate Earning</p>
                   <img src={note} alt="note" />
                </div>
                <div className="p-5">
                    <p className='' >Earning history displayed per week</p>
                    <div className="mt-5 -ml-10 min-w-[400px] h-[300px]">
                        <BarChart />
                    </div>
                </div>
            </div>
        </div>
        <div className="w-4/6 max-h-[calc(100vh-115px)] overflow-y-auto">
            <div className="top flex gap-3">
                <div className="w-2/5 flex flex-col gap-3">
                    {
                        analysis.map((item, idx) =>(
                            <div key={idx} className='border border-custom_gray rounded-lg bg-white p-3' >
                                <img className='ml-auto'  src={note} alt="" />
                                <div className="p-3 py-2">
                                    <img src={item.icon} />
                                    <div className='flex justify-between mt-4' >
                                        <div className="">
                                            <p className='' >{item.title}</p>
                                            <p className='text-2xl font-semibold' >{item.value}</p>
                                        </div>
                                        <div className=""></div>
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>
                <div className="right w-3/5 flex-1 border border-custom_gray rounded-lg bg-white">
                <div className="flex items-center justify-between p-3 border-b">
                    <p className='font-semibold' >Your Activities</p>
                   <img src={note} alt="note" />
                </div>
                <div className="p-5">
                    <div className="grid gap-7">
                    {
                        activities.map((item,idx) => (
                            <div key={idx} className='flex items-center gap-4' >
                                <img src={item.img} alt="image" />
                                <div className="text-sm">
                                    <p className='font-medium' >{item.title}</p>
                                    <p className='my-1' >{item.desc}</p>
                                    <p className='text-text_color text-xs' >{item.time}</p>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
            </div>
            <div className="bottom rounded-2xl border bg-white items-center border-custom_gray grid grid-cols-2 gap-9 mt-5 ">
                <img className='cursor-pointer' onClick={() => navigate('referrals?open=true')} src={refer} alt="refer" />
                <div className="p-5">
                    <p className='font-semibold text-xl  ' >Earn Rebates by Referring <br /> Patients!</p>
                    <p className='text-text_color mt-2'>Unlock additional income with our referral program! When your patients make a payment, 
                        you'll receive a rebate in your wallet within 24 hours. Start referring your patients today and watch your earnings grow.</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard
