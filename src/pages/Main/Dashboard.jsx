import React, { useState } from 'react'
import logo from '../../assets/images/logo.svg';
import { AiOutlineHome } from "react-icons/ai";
import avatar from '../../assets/images/avatar.svg';
import { IoLogOut } from "react-icons/io5";
import { FaEye } from 'react-icons/fa6';
import { BsArrowRight } from 'react-icons/bs';
import { PiEyeClosedBold, PiEyeSlashBold, PiEyeSlashLight } from "react-icons/pi";
import note from '../../assets/images/note.svg';
import BarChart from '../../components/Chart/BarChart';
import stat1 from '../../assets/images/stat1.svg';
import stat2 from '../../assets/images/stat2.svg';
import stat3 from '../../assets/images/stat3.svg';

import bank from '../../assets/images/Bank.svg';
import test from '../../assets/images/Test.svg';
import earn from '../../assets/images/Earn.svg';

import refer from '../../assets/images/refer_and_earn3.svg';
import { useNavigate } from 'react-router-dom';
import { ConvertToNaira } from '../../utils/Helper';
import { useQuery } from 'react-query';
import DashboardService from '../../services/Dashboard';
import RebateBarChart from '../../components/Chart/RebateBarChart';
import PageLaoding from '../../Loader/PageLoading'
import PageLoading from '../../Loader/PageLoading';
import moment from 'moment';

const Dashboard = () => {

    const navigate = useNavigate('');
    const user_id = JSON.parse(localStorage.getItem('referrer-data'))?.doctor_id;
    const [showDetails, setShowDetails] = useState(false);

    const toggleShowDetails = () => setShowDetails(!showDetails);

    const { isLoading:loadingDetails, data:dashboardDetails  } = useQuery('user-data', ()=> DashboardService.GetDashboardDetails(user_id))
    const { isLoading:loadingActivities, data:notifications  } = useQuery('activities', ()=> DashboardService.GetActivities(user_id))


    const analysis = [
        {
            title:'Total Referrals',
            icon:stat1,
            value:dashboardDetails?.data?.total_referrals,
        },
        {
            title:'Pending Referrals',
            icon:stat2,
            value:dashboardDetails?.data?.pending_referrals,
        },
        {
            title:'Completed Referrals',
            icon:stat3,
            value:dashboardDetails?.data?.completed_referrals,

        },
    ]


    if(loadingActivities || loadingDetails){
        return <PageLoading />
    }

  return (
    <div className='grid sm:flex gap-5 sm:gap-0 '>
        <div className="w-full sm:w-1/2 md:w-2/6 md:max-h-[calc(100vh-115px)] overflow-y-auto">
            <div className="p-4 rounded-lg border border-custom_gray bg-white">
                <p className='text-text_color'>Good Afternoon ☀️</p>
                <p className='text-xl font-semibold mt-2' >{dashboardDetails?.data?.name}</p>
                <div className="mt-16 sm:mt-32">
                    <div className="flex items-center gap-1">
                        <span className='text-xs text-text_color' >Your wallet balance</span>
                        <button onClick={toggleShowDetails} className='text-primary' >
                            {
                               showDetails ?  <PiEyeClosedBold size={16} /> :  <PiEyeSlashLight size={16} />
                            }
                            </button>
                    </div>
                    {/* <p className='my-1' > <span className='font-bold text-2xl ' >₦</span> <span>****</span> </p> */}
                    <p className='my-1' > 
                        {
                           showDetails ? <span className='font-bold text-2xl ' >{ ConvertToNaira(dashboardDetails?.data?.balance)}.00</span> :
                            <span className='font-bold text-2xl ' >****</span>

                        }
                    </p>
                    <button onClick={() =>navigate('payments')} className="font-semibold flex items-center gap-1 text-primary">
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
                    <div className="mt-5 -ml-16 sm:-ml-10 min-w-[400px] h-[300px]">
                        <RebateBarChart />
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-4/6 md:max-h-[calc(100vh-115px)] overflow-y-auto">
            <div className="top flex flex-col md:flex-row gap-3">
                <div className="w-full md:w-2/5 flex flex-col gap-3">
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
                <div className="right w-full md:w-3/5 flex-1 border border-custom_gray rounded-lg bg-white">
                <div className="flex items-center justify-between p-3 border-b">
                    <p className='font-semibold' >Your Activities</p>
                   <img src={note} alt="note" />
                </div>
                <div className="p-5">
                    {
                        notifications?.data?.notifications?.length ?
                        <div className="grid gap-7">
                    {
                        notifications?.data?.notifications?.map((item,idx) => (
                            <div key={idx} className='flex items-center gap-4' >
                                <img src={item.type == 'withdraw' ? earn : test} alt="image" />
                                <div className="text-sm">
                                    <p className='font-medium' >{item.subject}</p>
                                    <p className='my-1' >{item.data}</p>
                                    <p className='text-text_color text-xs' >{moment().format('ll')}</p>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                    : 
                    <div className='text-sm grid place-content-center text-center h-full mt-20'>
                        <p className='font-semibold'>NO DATA FOUND!</p>
                        <p>Please check back later..</p>
                    </div>    
                }
                </div>
            </div>
            </div>
            <div className="bottom rounded-2xl border bg-white items-center border-custom_gray grid md:grid-cols-2 gap-9 mt-5 ">
                <img className='cursor-pointer' onClick={() => navigate('referrals?open=true')} src={refer} alt="refer" />
                <div className="p-5">
                    <p className='font-semibold text-xl  ' >Earn Rebates by Referring <br /> Patients!</p>
                    <p className='text-text_color mt-2'>Unlock additional income with our referral program! When your patients make a payment, 
                        you'll receive a rebate in your wallet within 24 hours. Start referring your patients today and watch your earnings grow.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
