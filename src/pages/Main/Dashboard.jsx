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

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            title:'Dashboard',
            icon:AiOutlineHome
        },
        {
            title:'Referrals',
            icon:AiOutlineHome
        },
        {
            title:'Payment',
            icon:AiOutlineHome
        },
        {
            title:'Profile',
            icon:AiOutlineHome
        },
    ]

  return (
    <div className='px-5 h-screen flex flex-col gap-5 w-full bg-[#f8f8f8]'>
      <header className='flex items-center justify-between gap-5 py-4' >
        <img className='w-40' src={logo} alt="logo" />
        <div className="flex gap-5 bg-[#ededed] rounded-3xl">
            {
                tabs.map((item,idx) => (
                    <button key={idx} className={`flex items-center gap-2 px-3
                    ${activeTab == idx && 'text-white bg-primary !px-10 py-3 rounded-3xl'}`} >
                        { activeTab == idx ? <item.icon /> : null}
                        <p>{item.title}</p>
                    </button>
                ))
            }
        </div>
        <div className="flex items-center gap-3 ">
            <button className="w-10 h-10 bg-[#ededed] grid place-content-center rounded-full">
                <IoLogOut size={20} color='red' />
            </button>
            <button>
                <img className='w-10' src={avatar} alt="" />
            </button>
        </div>
      </header>
      <main className='flex-1 flex gap-10 w-full' >
        <div className="w-2/6 h-full">
            <div className="p-4 rounded-lg border border-custom_gray bg-white">
                <p className='text-text_color'>Good Afternoon ☀️</p>
                <p className='text-xl font-semibold mt-2' >Emmanuella</p>
                <div className="mt-32">
                    <div className="flex items-center gap-1">
                        <span className='text-xs text-text_color' >Your wallet balance</span>
                        <span className='text-primary' ><PiEyeClosedBold size={16} /></span>
                    </div>
                    <p className='my-1' > <span className='font-bold text-2xl ' >₦</span> <span>****</span> </p>
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
                    <div className="-ml-10 min-w-[400px] h-[300px]">
                        <BarChart />
                    </div>
                </div>
            </div>
        </div>
        <div className="w-4/6 h-full border border-[green]"></div>

      </main>
    </div>
  )
}

export default Dashboard
