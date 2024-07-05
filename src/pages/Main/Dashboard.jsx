import React, { useState } from 'react'
import logo from '../../assets/images/logo.svg';
import { AiOutlineHome } from "react-icons/ai";
import avatar from '../../assets/images/avatar.svg';
import { IoLogOut } from "react-icons/io5";

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
    <div className='px-5'>
      <header className='flex items-center justify-between gap-5 py-4' >
        <img className='w-40' src={logo} alt="logo" />
        <div className="flex gap-5 bg-[#ededed] rounded-3xl">
            {
                tabs.map((item,idx) => (
                    <button className={`flex items-center gap-2 px-3
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
    </div>
  )
}

export default Dashboard
