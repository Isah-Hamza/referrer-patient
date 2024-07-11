import React, { useState } from 'react'
import Input from '../../components/Inputs'
import { BiCopy, BiCopyAlt, BiPhoneIncoming, BiSearch, BiUser } from 'react-icons/bi'
import Select from '../../components/Inputs/Select'
import Button from '../../components/Button'
import { CgClose } from 'react-icons/cg'
import stacey from '../../assets/images/stacey.svg'
import { MdOutlineEmail } from 'react-icons/md'
import completed from '../../assets/images/completed.svg'
import New from '../../components/Referral/New'

const Referrals = () => {

    const [viewDetails, setViewDetails] = useState(false);
    const [newReferral, setNewReferral] = useState(false);

    const toggleViewDetails = () => setViewDetails(!viewDetails);
    const toggleNewReferral = () => setNewReferral(!newReferral);

    const dummy = [
        {
            name:'Marcia Cronin ',
            email:'gerald37@hotmail.com',
            phone:'601-671-8795',
            gender:'Female',
            test:'-',
            rebate:'-',
        },
        {
            name:'Luke Hudsonlee Jack',
            email:'earnestine_macejkovic89@yahoo.com',
            phone:'528-323-1027',
            gender:'Male',
            test:'3',
            rebate:'₦103,000',
        },
        {
            name:'Anthony Von',
            email:'emily.rolfson@hotmail.com',
            phone:'366-430-1102',
            gender:'Male',
            test:'-',
            rebate:'-',
        },
        {
            name:'Stacey Jacobs Volkswagon',
            email:'mohammad.schimmel@gmail.com',
            phone:'448-970-7550',
            gender:'Female',
            test:'2',
            rebate:'₦21,000',
        },
        {
            name:'Luke Hudson',
            email:'earnestine_macejkovic89@yahoo.com',
            phone:'528-323-1027',
            gender:'Male',
            test:'-',
            rebate:'-',
        },
        {
            name:'Anthony Von',
            email:'emily.rolfson@hotmail.com',
            phone:'366-430-1102',
            gender:'Male',
            test:'1',
            rebate:'₦55,000',
        },
        {
            name:'Stacey Jacobs',
            email:'mohammad.schimmel@gmail.com',
            phone:'448-970-7550',
            gender:'Female',
            test:'2',
            rebate:'₦21,000',
        },
    ]

    const test_stats = [
        {
            title:'Total Tests Assigned',
            value:32,
        },
        {
            title:'Total Tests Completed',
            value:21,
        },
        {
            title:'Total Rebate Earned',
            value:'₦280,000',
        },
    ]

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
                    dummy.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-9  gap-3 px-5 py-6 font-medium`}>
                    <p className='col-span-2 line-clamp-1' >{item.name}</p>
                    <p className='col-span-2 line-clamp-1' >{item.email}</p>
                    <p className='' >{item.phone}</p>
                    <p className='' >{item.gender}</p>
                    <p className='' >{item.test}</p>
                    <p className='' >{item.rebate}</p>
                    <p onClick={toggleViewDetails} className='font-semibold text-light_blue cursor-pointer' >View Details</p>
                    </div>
                    )) 
                }

            </div>
        </div>
       {viewDetails ? <div className="fixed inset-0 bg-black/70 flex justify-end">
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
                    <p className='text-center font-medium' >Stacey Jacobs</p>
                    <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                        <div className="flex flex-col justify-center text-center">
                            <div className="mx-auto mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                <MdOutlineEmail />
                             </div>
                            <p className='font-semibold' >Email Address</p>
                            <p className='line-clamp-1 underline text-light_blue' >earnestine_macejkovic89@yahoo.com</p>
                        </div>
                        <div className="flex flex-col justify-center items-center text-center">
                            <div className="mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                <BiPhoneIncoming />
                             </div>
                            <p className='font-semibold' >Phone Number</p>
                            <p className='line-clamp-1' >299-470-4508</p>
                        </div>
                        <div className="flex flex-col justify-center items-center text-center">
                            <div className="mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                <BiUser />
                             </div>
                            <p className='font-semibold' >Gender</p>
                            <p className='line-clamp-1' >Female</p>
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
                <div className="p-1 text-sm border rounded-3xl mx-5">
                    <div className="flex justify-between items-center p-2 px-4 rounded-3xl bg-[#dfdfdf]">
                        <p className='font-semibold' >4 tests assigned</p>
                        <button className='font-medium text-primary' >Show Details</button>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-5 pl-5 pb-3">
                        <div className='' >
                            <p className='font-medium text-base'>Rebate</p>
                            <p className='text-sm text-text_color' >10% on each test</p>
                        </div>
                        <div className='' >
                            <p className='font-medium text-base'>Date</p>
                            <p className='text-sm text-text_color' >09 September, 2024</p>
                        </div>
                        <div className='' >
                            <p className='font-medium text-base'>Total Test Payment</p>
                            <p className='text-lg text-primary font-semibold' >₦28,000</p>
                        </div>
                        <div className='' >
                            <p className='font-medium text-base'>Invite Code</p>
                            <div className="flex gap-1 items-center font-semibold text-primary">
                                <p className='text-base' >UYBFJK</p>
                                <BiCopyAlt />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 p-1 text-sm border rounded-3xl mx-5">
                    <div className="flex justify-between items-center p-2 px-4 rounded-3xl bg-[#dfdfdf]">
                        <p className='font-semibold' >2 tests assigned</p>
                        <button className='font-medium text-primary' >Show Details</button>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-5 pl-5 pb-3">
                        <div className='' >
                            <p className='font-medium text-base'>Rebate</p>
                            <p className='text-sm text-text_color' >10% on each test</p>
                        </div>
                        <div className='' >
                            <p className='font-medium text-base'>Date</p>
                            <p className='text-sm text-text_color' >17 October, 2024</p>
                        </div>
                        <div className='' >
                            <p className='font-medium text-base'>Total Test Payment</p>
                            <p className='text-lg text-primary font-semibold' >₦12,000</p>
                        </div>
                        <img src={completed} alt="completed" />
                    </div>
                </div>
                <div className="border-t my-5 p-5">
                    <Button title={'Refer'} className={'w-full !px-10 !py-2.5 !text-sm  !bg-light_blue'} />
                </div>
            </div>
        </div> : null}
    </div> :
    <div className='w-full'>
        <New toggleNewReferral={toggleNewReferral} /> 
    </div>
    }
  </>
  )
}

export default Referrals
