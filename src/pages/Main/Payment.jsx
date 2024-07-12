import React from 'react'
import logo from '../../assets/images/logo.svg';
import { BsEyeFill } from 'react-icons/bs';
import Button from '../../components/Button';
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { HiInformationCircle } from 'react-icons/hi2';
import rebate_icon from '../../assets/images/rebate_icon.svg';

const Payment = () => {

  const dummy = [
    {
      id:'#0121',
      type:1,
      amount:'₦ 55,000',
      date:'09 Sept., 2024',
    },
    {
      id:'#8801',
      type:2,
      amount:'₦ 3,000',
      date:'21 June, 2023',
    },
    {
      id:'#0121',
      type:1,
      amount:'₦ 55,000',
      date:'09 Sept., 2024',
    },
    {
      id:'#5044',
      type:1,
      amount:'₦ 20,500',
      date:'02 Dec., 2020',
    },
    {
      id:'#8801',
      type:2,
      amount:'₦ 3,000',
      date:'21 June, 2023',
    },
  ]

  const withdraw = (idx) => (
    <div className='flex items-center gap-2' >
      <div className={`p-2 rounded-lg ${idx % 2 == 1 ? 'bg-custom_gray' : 'bg-white'}`}>
        <img src={rebate_icon} alt="icon" />
      </div>
      <span>Funds Withdrawal</span>
    </div>
  )

  const earned = (idx) => (
    <div className='flex items-center gap-2' >
       <div className={`p-2 rounded-lg ${idx % 2 == 1 ? 'bg-custom_gray' : 'bg-white'}`}>
        <img src={rebate_icon} alt="icon" />
      </div>
      <span>Rebate Earned</span>
    </div>
  )

  return (
    <div className='bg-white border overflow-hidden mb-5 w-full rounded-2xl p-8' >
      <div className="mx-auto w-[700px]">
        <div className="custom-bg p-5 pb-3 rounded-3xl w-full border text-center grid  items-center" >
          <div className="flex items-center gap-28">
            <img className='w-32' src={logo} alt="logo" />
            <div className="flex items-center bg-[#f9f9f9] rounded-3xl p-2 text-sm gap-2">
              <span>0232322951</span>
              <span> | </span>
              <span>Access Bank</span>
            </div>
          </div>
          <p className='flex items-center gap-2 mx-auto mt-5'>
            Your Balance 
            <span><BsEyeFill className='text-primary' /> </span>
          </p>
          <p className='font-bold text-4xl text-primary mb-3 mt-2' >₦5,021,230</p>
          <button className='w-fit mx-auto flex items-center gap-2 text-white bg-light_blue px-14 py-2 rounded-3xl' >
            <span>Instant Withdrawal</span>
            <span><TbArrowBigRightLinesFilled /></span>
          </button>
          <div className="mt-2 text-sm flex items-center gap-2 justify-center">
            <HiInformationCircle className='text-primary' size={22} />
            <span>Earnings of the week are automatically sent to your bank account every Friday.</span>
          </div>
        </div>
        <div className="mt-8 text-sm overflow-hidden border rounded-xl">
            <p className='py-3.5 mb-5 border-b font-semibold px-5' >Transaction History</p>
            <div className="header grid grid-cols-5 gap-3 px-5 font-semibold">
                <p className='' >Order ID</p>
                <p className='col-span-2' >Transaction Type</p>
                <p className='' >Amount</p>
                <p className='' >Date</p>
            </div>
            <div className="data  text-text_color mt-3">
                {
                    dummy.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-5  gap-3 px-5 py-5 font-medium`}>
                    <p className='' >{item.id}</p>
                    <p className='col-span-2' >{item.type == 1 ? withdraw(idx) : earned(idx)}</p>
                    <p className='' >{item.amount}</p>
                    <p className='' >{item.date}</p> 
                    </div>
                    )) 
                }

            </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
