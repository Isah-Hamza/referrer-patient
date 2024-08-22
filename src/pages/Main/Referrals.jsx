import React, { useEffect, useState } from 'react'
import Input from '../../components/Inputs'
import { BiCopy, BiCopyAlt, BiPhoneIncoming, BiSearch, BiUser } from 'react-icons/bi'
import Select from '../../components/Inputs/Select'
import Button from '../../components/Button'
import { CgClose } from 'react-icons/cg'
import stacey from '../../assets/images/stacey.svg'
import { MdOutlineEmail } from 'react-icons/md'
import completed from '../../assets/images/completed.svg'
import New from '../../components/Referral/New'
import { useLocation } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import ReferralService from '../../services/Referrals'
import PageLoading from '../../Loader/PageLoading'
import EmptyTable from '../../components/Table/EmptyTable'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { ConvertToNaira } from '../../utils/Helper'
import moment from 'moment'

const Referrals = () => {

    const user_id = JSON.parse(localStorage.getItem('referrer-data'))?.doctor_id;
    const query = useLocation().search.split('=')[1];
    const [selectedRef, setSelectedRef] = useState(null);

    const { isLoading:loadingReferrals, data:referrals, refetch:refetchReferrals } = useQuery('referrals', ()=> ReferralService.GetRefferals(user_id))
    const { isLoading:loadingReferral, data:referral, mutate:getReferral } = useMutation(ReferralService.GetReferral);

    
    const [viewDetails, setViewDetails] = useState(false);
    const [newReferral, setNewReferral] = useState(() => query == 'true' ? true : false);

    const toggleViewDetails = () => setViewDetails(!viewDetails);
    const toggleNewReferral = () => setNewReferral(!newReferral);

    const test_stats = [
        {
            title:'Total Tests Assigned',
            value:referral?.data?.statistics?.total_assigned_tests,
        },
        {
            title:'Total Tests Completed',
            value:referral?.data?.statistics?.total_completed_tests,
        },
        {
            title:'Total Rebate Earned',
            value:ConvertToNaira(referral?.data?.statistics?.total_rebate_earned),
        },
    ]

    useEffect(() => {
        if(selectedRef) getReferral(selectedRef);
    }, [selectedRef])
    

    if(loadingReferrals){
        return <PageLoading />
    }

  return (
  <>
   {!newReferral ? 
    <div className='w-full border border-custom_gray rounded-xl bg-white mb-7'>
            <div className="border-b p-3 flex justify-between items-center">
                <p className='font-semibold' >My Referrals</p>
                <div className="flex items-center gap-4">
                    <Input className={'!rounded-3xl !py-2.5 !min-w-[300px]'} placeholder={'Type user name here...'} icon={<BiSearch size={20} className='text-custom_gray' />} />
                    <Select className={'!rounded-3xl !py-2.5 !min-w-[120px]'} options={[ { label:'All Status',value:null }]} />
                    <Button onClick={toggleNewReferral} title={'Refer'} className={'!px-10 !py-2.5 !text-sm  !bg-light_blue'} />
                </div>
            </div>
            {
            referrals.data?.referrals.length ?
                <div className="mt-5 text-sm">
                <div className="header grid grid-cols-9 gap-3 px-5 font-medium">
                    <p className='col-span-2 line-clamp-1' >Full Name</p>
                    <p className='col-span-2 line-clamp-1' >Email Address</p>
                    <p className='' >Phone Number</p>
                    <p className='' >Gender</p>
                    <p className='' >Test Completed</p>
                    <p className='' >Rebate Earned</p>
                    <p className='' >Action</p>
                </div>
                <div className="data  text-text_color mt-3">
                    {
                        referrals?.data?.referrals?.map((item,idx) => (
                        <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-9  gap-3 px-5 py-6 font-medium`}>
                            <p className='col-span-2 line-clamp-1' >{item.patient_name}</p>
                            <p className='col-span-2 line-clamp-1' >{item.patient_email}</p>
                            <p className='' >{item.patient_phone}</p>
                            <p className='' >{item.patient_gender}</p>
                            <p className='' >{item.completed_test}</p>
                            <p className='' >{ConvertToNaira(item.rebate_earned)}</p>
                            <p onClick={() => { 
                                setSelectedRef(item.ref_id); 
                                toggleViewDetails()}
                                }
                             className='font-semibold text-light_blue cursor-pointer' >View Details</p>
                        </div>
                        )) 
                    }

                </div>
                </div>
                :
                <EmptyTable />
            }
        {viewDetails ? <div className="fixed inset-0 bg-black/70 flex justify-end">
                {
                    !loadingReferral ? 
                    <div className="bg-white w-[450px] max-h-screen overflow-y-auto">
                        <div className="flex items-center justify-between p-3 border-b">
                            <p className='font-semibold' >Referral Details</p>
                            <button onClick={toggleViewDetails} className="font-medium flex items-center gap-2">
                                <span>Close</span>
                                <CgClose />
                            </button>
                        </div>
                        <div className="flex flex-col gap-1 border-b p-5">
                            <img className='w-16 mx-auto' src={stacey} alt="stacey" />
                            <p className='text-center font-medium' >{referral?.data?.patient?.name}</p>
                            <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                                <div className="flex flex-col justify-center text-center">
                                    <div className="mx-auto mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                        <MdOutlineEmail />
                                    </div>
                                    <p className='font-semibold' >Email Address</p>
                                    <p className='line-clamp-1 underline text-light_blue' >{referral?.data?.patient?.email}</p>
                                </div>
                                <div className="flex flex-col justify-center items-center text-center">
                                    <div className="mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                        <BiPhoneIncoming />
                                    </div>
                                    <p className='font-semibold' >Phone Number</p>
                                    <p className='line-clamp-1' >{referral?.data?.patient?.phone}</p>
                                </div>
                                <div className="flex flex-col justify-center items-center text-center">
                                    <div className="mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                        <BiUser />
                                    </div>
                                    <p className='font-semibold' >Gender</p>
                                    <p className='line-clamp-1' >{referral?.data?.patient?.gender}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 text-sm">
                            <p className='font-semibold' >Test statistics</p>
                            <div className="mt-3 grid grid-cols-3 gap-2">
                                {
                                    test_stats.map((item,idx) => (
                                        <div key={idx} className='border rounded-lg p-3' >
                                            <p className='font-semibold text-lg'>{item.value}</p>
                                            <p className='text-xs' >{item.title}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        {
                            referral?.data?.referrals.map((item,idx) => (
                                <div key={idx} className="mb-5 p-1 text-sm border rounded-3xl mx-5">
                                    <div className="flex justify-between items-center p-2 px-4 rounded-3xl bg-[#dfdfdf]">
                                        <p className='font-semibold' >{item.assigned_tests} tests assigned</p>
                                        <button className='font-medium text-primary' >Show Details</button>
                                    </div>
                                    <div className="mt-3 grid grid-cols-2 gap-5 pl-5 pb-3">
                                        <div className='' >
                                            <p className='font-medium text-base'>Rebate</p>
                                            <p className='text-sm text-text_color' >10% on each test</p>
                                        </div>
                                        <div className='' >
                                            <p className='font-medium text-base'>Date</p>
                                            <p className='text-sm text-text_color' >{moment(item.created_at).format('ll')}</p>
                                        </div>
                                        <div className='' >
                                            <p className='font-medium text-base'>Total Test Payment</p>
                                            <p className='text-lg text-primary font-semibold' >{ConvertToNaira(item.paid_rebate)}</p>
                                        </div>
                                       {
                                       item.status !== 'completed' ? <div className='' >
                                            <p className='font-medium text-base'>Invite Code</p>
                                            <div className="flex gap-1 items-center font-semibold text-primary">
                                                <p className='' >{item.referral_code}</p>
                                                <BiCopyAlt />
                                            </div>
                                        </div>
                                        :   <img src={completed} alt="completed" />
                                    }

                                    </div>
                                </div>
                            ))
                        }
 
                        <div className="border-t my-5 p-5 mt-14">
                            <Button onClick={toggleNewReferral} title={'Make New Referral'} className={'w-full !px-10 !py-2.5 !text-sm  !bg-light_blue'} />
                        </div>
                     </div>
                :    
                <div className="bg-white w-[450px] h-screen grid place-content-center overflow-y-auto">
                    <PageLoading />
                </div>
            }
            </div> : null}
    </div> :
    <div className='w-full'>
        <New toggleNewReferral={toggleNewReferral} refetch={refetchReferrals}  /> 
    </div>
    }
  </>
  )
}

export default Referrals
