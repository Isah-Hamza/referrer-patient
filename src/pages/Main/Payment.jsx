import React, { useState } from 'react'
import logo from '../../assets/images/logo.svg';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import Button from '../../components/Button';
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { HiInformationCircle } from 'react-icons/hi2';
import rebate_icon from '../../assets/images/rebate_icon.svg';
import { CgClose } from 'react-icons/cg';
import { BiEdit } from 'react-icons/bi';
import successIcon from '../../assets/images/withdrawal_progress.svg';
import PaymentService from '../../services/Payment';
import { useQuery } from 'react-query';
import { ConvertToNaira } from '../../utils/Helper';
import EmptyTable from '../../components/Table/EmptyTable';
import PageLoading from '../../Loader/PageLoading';
import moment from 'moment';

const Payment = () => {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDetails, setShowDetails] = useState(false);


  const toggleShowDetails = () => setShowDetails(!showDetails);
  const toggleShowWithdraw = () => setShowWithdraw(!showWithdraw);
  const toggleShowSummary = () => setShowSummary(!showSummary);
  const toggleShowSuccess = () => setShowSuccess(!showSuccess);
  const user_id = JSON.parse(localStorage.getItem('referrer-data'))?.doctor_id;

  const { isLoading:loadingTnx, data:tnx  } = useQuery('transactions', ()=> PaymentService.GetPayments(user_id))


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

  if(loadingTnx){
   return <PageLoading />
  }

  return (
    <div className='bg-white border overflow-hidden mb-5 w-full rounded-2xl px-3 sm:px-8 py-8' >
      <div className="mx-auto w-full md:w-[700px]">
        <div className="custom-bg p-5 pb-3 rounded-3xl w-full border text-center grid  items-center" >
          <div className="flex items-center gap-28">
            <img className='hidden md:block w-32' src={logo} alt="logo" />
            <div className="flex items-center bg-[#f9f9f9] rounded-3xl p-2 text-sm gap-2 mx-auto md:mx-[unset]">
              <span>{tnx?.data?.account_number ?? 'Account Number Not Set'}</span>
              <span> | </span>
              <span className='line-clamp-1' >{tnx?.data?.bank ?? 'Bank Not Set'}</span>
            </div>
          </div>
          <p className='flex items-center gap-2 mx-auto mt-5'>
            Your Balance 
            {/* <span><BsEyeFill className='text-primary' /> </span> */}

            <button onClick={toggleShowDetails} className='text-primary' >
              {
                  showDetails ?  <BsEyeFill size={16} /> :  <BsEyeSlashFill size={16} />
              }
            </button>

          </p>
          {
            showDetails?
              <p className='font-bold text-4xl text-primary mb-3 mt-2' >{ConvertToNaira(tnx?.data?.balance)}</p> : <p className='py-3.5 font-bold text-2xl ' >****</p>

          }
          {/* <button onClick={toggleShowWithdraw} className='w-fit mx-auto flex items-center gap-2 text-white bg-light_blue px-14 py-2 rounded-3xl' >
            <span>Instant Withdrawal</span>
            <span><TbArrowBigRightLinesFilled /></span>
          </button> */}
          <div className="mt-2 text-sm flex items-center gap-2 justify-center">
            <HiInformationCircle className='!min-w-4 text-primary' size={22} />
            <span>Earnings of the week are automatically sent to your bank account every Friday.</span>
          </div>
        </div>
        <div className="mt-8 text-sm overflow-hidden border rounded-xl">
            <p className='py-3.5 mb-5 border-b font-semibold px-5' >Transaction History</p>
            <div className="hidden sm:grid header grid-cols-5 gap-3 px-5 font-semibold">
                <p className='' >Order ID</p>
                <p className='col-span-2' >Transaction Type</p>
                <p className='' >Amount</p>
                <p className='' >Date</p>
            </div>
            { tnx?.data?.transactions.length ? 
            <>
              <div className="hidden sm:block data  text-text_color mt-3">
                  {
                      tnx?.data?.transactions.map((item,idx) => (
                      <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-5  gap-3 px-5 py-5 font-medium`}>
                      <p className='' >{item.order_id}</p>
                      <p className='col-span-2' >{item.type !== 'CREDIT' ? withdraw(idx) : earned(idx)}</p>
                      <p className='' >{ConvertToNaira(item.amount)}</p>
                      <p className='' >{moment(item.date).format('ll')}</p> 
                      </div>
                      )) 
                  }

              </div>
              <div className="block sm:hidden">
                {
                  tnx?.data?.transactions.map((item,idx) => (
                    <div className="flex justify-between px-2 mb-3">
                      <div className="">
                        <p className='ml-10 text-xs'>#{item.order_id}</p>
                        <p className='col-span-2' >{item.type !== 'CREDIT' ? withdraw(idx) : earned(idx)}</p>
                      </div>
                      <div className="text-right">
                        <p className='font-medium ' >{ConvertToNaira(item.amount)}</p>
                        <p className='text-sm' >{moment(item.date).format('ll')}</p> 
                      </div>
                    </div>
                  ))
                }
              </div>
            </>
          : 
          <div className='my-20'>
            <EmptyTable />  
          </div>
          }
        </div>
      </div>
      {
        showWithdraw ? 
        <div className='fixed inset-0 bg-black/60 grid place-content-center'>
          <div className="bg-white rounded-md w-[450px] p-5 relative text-sm">
            <button onClick={toggleShowWithdraw} > <CgClose size={20} className='absolute top-3 right-3' /></button>
            <p className='text-center text-base font-semibold mt-3' >Input the amount you want to withdraw</p>
            <div className="mt-7 grid">
              <input placeholder='₦0' type="text" className='max-w-[250px] mx-auto border-b-2 text-gray-500 font-bold outline-none text-center w-full py-1 text-3xl' />
              <p className='text-center mt-2' >Minimum Amount: ₦ 5,000.</p>
            </div>
            <div className="mt-6 w-full rounded-2xl p-2 pb-3 flex justify-center flex-col bg-[#f9f9f9]">
              <div className="mx-auto flex items-center gap-4 text-base">
                <span className='font-medium' >{tnx?.data?.account_name}</span>
                <div className="flex items-center gap-1 text-light_blue text-sm font-medium cursor-pointer">
                  <BiEdit /> <span>Change</span>
                </div>
              </div>
              <div className="mx-auto font-medium mt-2 flex items-center bg-[#DCDCDC] rounded-3xl p-2 text-sm gap-2">
              <span>{tnx?.data?.account_number}</span>
              <span> | </span>
              <span>{tnx?.data?.bank}</span>
            </div>
            </div>
            <div className="mt-12">
              <Button onClick={() => { toggleShowSummary(); toggleShowWithdraw(); }} title={'Continue'} className={'!bg-light_blue'}  />
            </div>
          </div>
        </div> : null
      }
      {
        showSummary ? 
        <div className='fixed inset-0 bg-black/60 grid place-content-center'>
          <div className="bg-white rounded-md w-[450px] p-5 relative text-sm">
            <button onClick={toggleShowSummary} > <CgClose size={20} className='absolute top-3 right-3' /></button>
            <p className='text-center text-base font-semibold mb-7' >Withdrawal Summary</p>
            <div className="flex items-center justify-between mt-5">
              <span>Withdrawal Amount</span>
              <span>₦ 320,000</span>
            </div>
            <div className="border-b pb-5 flex items-center justify-between mt-5">
              <span>Service Charge</span>
              <span>-₦150</span>
            </div>
            <div className="flex font-medium text-base items-center justify-between mt-5">
              <span>Total Withdrawal Amount</span>
              <span>₦ 350,000</span>
            </div>
            <div className="mt-12 flex items-center gap-5">
              <Button onClick={() => { toggleShowSummary(); toggleShowWithdraw(); }} title={'Back'} className={'font-medium !border border-black !bg-white !text-black'}  />
              <Button onClick={() => { toggleShowSummary(); toggleShowSuccess() }} title={'Request Fund'} className={'font-medium'}  />
            </div>
          </div>
        </div> : null
      }
       {
        showSuccess ? 
        <div className='bg-black/50 fixed inset-0 grid place-content-center' >
          <div className=" bg-white w-[400px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
            <img className='w-16 m-auto' src={successIcon} alt="delete" />
            <p className='text-lg font-semibold' >Withdrawal In Progress</p>
            <p className='text-sm' >Your withdrawal request has been initiated successful and you will be credited in the account provided within 24 hours.</p>
            <div className="mt-8 flex items-center gap-5 ">
              <Button onClick={toggleShowSuccess} className={'!px-5 !bg-white !text-text_color border border-text_color font-medium '} title={'Cancel'} />
            </div>
          </div>
        </div> : null
      }
    </div>
  )
}

export default Payment
