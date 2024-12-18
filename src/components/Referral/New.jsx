import React, { useEffect, useState } from 'react'
import { BiCopy, BiPhoneIncoming, BiSolidUserDetail, BiTrashAlt } from "react-icons/bi";
import { CgAdd, CgClose } from 'react-icons/cg';
import { CiUser } from 'react-icons/ci';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { PiTestTubeFill } from "react-icons/pi";
import Input from '../Inputs';
import Select from '../Inputs/Select';
import { BsCaretRight, BsFillTrashFill, BsPlus } from 'react-icons/bs';
import Button from '../Button'
import success from '../../assets/images/success.svg';
import { IoIosArrowForward } from "react-icons/io";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Referrals from '../../services/Referrals';
import { useMutation, useQuery } from 'react-query';
import { CustomValidationError } from '../Register/StepOne';
import { ConvertToNaira, copyText, errorToast, successToast } from '../../utils/Helper';
import LoadingModal from '../../Loader/LoadingModal';
import ReactSelect from 'react-select';

const New = ({ toggleNewReferral, refetch }) => {
  const user_id = JSON.parse(localStorage.getItem('referrer-data'))?.doctor_id;

  const [activeTab, setActiveTab] = useState(0);
  const [categories, setCategories] = useState([]);
  const [tests, setTests] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);
  const patient_base_url = `${window.location.origin}/patient`;

  const toggleSuccessful = () => setSuccessful(!successful);

  const { data, isLoading:creatingReferral, mutate:createReferrer } = useMutation(Referrals.CreateReferrer, {
    onSuccess:res => {
      refetch();
      successToast(res.data.message);
      toggleSuccessful();
    },
    onError: e => {
      errorToast(e.message);
    }
  })

  
  const { touched, errors, handleSubmit, getFieldProps, setFieldValue } = useFormik({
    initialValues:{
        "doctor_id": user_id,
        "email": "",
        "full_name": "",
        "phone_number": "",
        "gender": "",
        "selected_tests": [''],
    },
    validationSchema: Yup.object().shape({
        "doctor_id": Yup.string().required(),
        "email": Yup.string().email().required(),
        "full_name": Yup.string().required(),
        "phone_number": Yup.string().required().min(11, 'Should be exactly 11 digits').max(11, 'Should be exactly 11 digits'),
        "gender": Yup.string().required(),
        // "selected_tests": Yup.array().required(),
    }),
    onSubmit:values => {
        if(!selectedTests.length){
          errorToast('Please select at least one test to continue.')
          return
        }
        const tests = selectedTests.map(item => item.test_id);
        values.selected_tests = tests;
        console.log(values);
        createReferrer(values);
    }
})

  const { isLoading:loadingCategories } = useQuery('test-categories', Referrals.GetTestCategories, {
    onSuccess: res => {
      setCategories(res.data.categories.map(item => ({ label:item.name, value:item.cat_id })));
    }
  })

  const { isLoading:loadingTests, mutate:getTests, data:rawTests } = useMutation(Referrals.GetTests, {
    onSuccess: res => {
      setTests(res.data.tests.map(item => ({ label:item.name+' ('+ ConvertToNaira(item.price)+')', value:item.test_id })));
      setSelectedCategoryName(res.data.category);
    },
    enabled:false,
  })


  const tabs = [
    {
      title:'Referrer Information',
      icon:<BiSolidUserDetail size={20} />,
      onClick:() => { document.querySelector('#patient').scrollIntoView() },
    },
    {
      title:'Test Information',
      icon:<PiTestTubeFill size={20} />,
      onClick:() => {
        console.log('clicked')
        document.querySelector('#test').scrollIntoView()},
    },
  ]



  const genderOptions = [
    {
      label:'Male',
      value:'Male'
    },
    {
      label:'Female',
      value:'Female'
    },
  ]

  const emptyOption = [
    {
      label:'Select an option',
      value:0
    }, 
  ]

  const close = () => {
    toggleSuccessful();
    toggleNewReferral();
  }

  const addTest = () => {
    if(!selectedCategoryName || !selectedTest ) return;
    const matchedTest = rawTests?.data?.tests.find(item => item.test_id == selectedTest);

    const test = {
      price: matchedTest.price,
      test: matchedTest.name,
      category: selectedCategoryName,
      test_id: matchedTest.test_id,
    }

    setSelectedTests(prev => [test,...prev]);
    setSelectedTest(null);
  }

  const removeTest = (id) => {
    setSelectedTests(prev => prev.filter(test => test.test_id !== id))
  }

  useEffect(() => {
    console.log(selectedCategory);
    if(selectedCategory) getTests(selectedCategory)
  }, [selectedCategory])
  

  return (
     <div className='w-full bg-white rounded-xl flex' >
      { !successful ? <>
        <div className="hidden sm:block sm:w-[300px] md:w-[350px] border-r h-[calc(100vh-120px)] p-5 pt-7">
          <p className='font-semibold' >Referral Creation Form </p>
          <div className="mt-7 grid gap-3 max-w-[250px]">
            {
              tabs.map((item,idx) => (
                <div onClick={() =>{ setActiveTab(idx); item.onClick()}} key={idx} className={`hover:font-medium hover:opacity-90 cursor-pointer text-sm flex items-center gap-2 rounded-3xl p-3 px-6 opacity-60 ${idx == activeTab && '!opacity-100 bg-[#f9f9f9] !font-medium'}`} >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </div>
              ))
            }
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 px-5 sm:px-10 p-10 pt-7  h-[calc(100vh-120px)] overflow-y-auto">
          <div className="flex gap-10 sm:gap-0 flex-col-reverse sm:flex-row justify-between">
              <div id='patient' className="">
                <p className='font-semibold mb-1' >Patient Details</p>
                <p className='text-sm' >Please kindly enter your patient information below.</p>
              </div>
              <button onClick={toggleNewReferral} className="font-medium flex items-center gap-2">
                  <span>Close</span>
                  <CgClose />
              </button>
          </div>
          <div className="max-w-[650px]">
              <div className="mt-6">
                  <Input {...getFieldProps('email')} label={'Email Address'} placeholder={'support@lifebridge.com'} type={'email'} icon={<MdOutlineMarkEmailUnread size={22} />}/>
                  {
                      touched.email && errors.email && <CustomValidationError text={errors.email} />
                  }
              </div>
              <div className="mt-4">
                  <Input  {...getFieldProps('full_name')} label={'Full Name'} placeholder={'John Doe'} icon={<CiUser size={24} />}/>
                  {
                      touched.full_name && errors.full_name && <CustomValidationError text={errors.full_name} />
                  }
              </div>
              <div className="mt-4">
                  <Input  {...getFieldProps('phone_number')} label={'Phone Number'} placeholder={'Phone Number'} icon={<BiPhoneIncoming size={24} />}/>
                  {
                      touched.phone_number && errors.phone_number && <CustomValidationError text={errors.phone_number} />
                  }
              </div>
              <div className="mt-4">
                <Select  {...getFieldProps('gender')} label={'Gender'} options={genderOptions}  icon={<CiUser size={22} />}/>
                {
                    touched.gender && errors.gender && <CustomValidationError text={errors.gender} />
                }
            </div>
          </div>
          <div className="mt-10 flex justify-between">
              <div id='test' className="">
                <p className='font-semibold mb-1' >Test Details</p>
                <p className='text-sm' >Choose the test below to diagnose the patient with.</p>
              </div>
          </div>
          <div className=" max-w-[650px]">
            <div className="mt-6">
                {/* <Select
                onChange={e => {setSelectedCategory(e.target.value)}}
                label={'Test Category'}  icon={<PiTestTubeFill size={22} />}/> */}
                <p>Test Categories</p>
                <ReactSelect options={categories} onChange={(item) => setSelectedCategory(item.value)} isSearchable />
            </div>
            <div className="mt-4">
                <p>Test Types</p>
                <ReactSelect options={tests} onChange={(item) => setSelectedTest(item.value)} isSearchable />
                {/* <Select label={'Test Type'}  onChange={e => setSelectedTest(e.target.value)} options={tests}  icon={<PiTestTubeFill size={22} />}/> */}
            </div>
            <button onClick={addTest} type='button' className="!px-6 !py-2 rounded-3xl mt-3 bg-light_blue text-white flex ml-auto items-center gap-1 text-sm font-semibold">
              <BsPlus /> Add Test
            </button>
            <div className="mt-7 flex items-center gap-2">
                <p className='font-semibold mb-1' >Selected Tests</p>
                <hr className='flex-1 bg-[gainsboro] text-[gainsboro]' />
            </div>
         {selectedTests.length ? <div className="mt-7 grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {
              selectedTests?.map((item,idx) => (
                <div key={idx} className='relative grid  text-sm bg-[#f9f9f9] border p-3 rounded-lg ' >
                <p className='font-medium mb-1 line-clamp-1' >{ item.test }</p>  
                <p className='uppercase mb-10 line-clamp-1' >{ item.category }</p>  
                <p className='mt-auto text-light_blue text-lg font-semibold' >{ ConvertToNaira(item.price)}</p>
                <button onClick={() => removeTest(item.test_id)} type='button' className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white border grid place-content-center">
                  <BsFillTrashFill size={15} color='red' />
                  </button>  
                </div>
              ))
            }
          </div>:
          <div className="mt-5 mb-32 text-center font-medium text-sm">
            <p>No Test Selected Yet.</p>
          </div>
          }
            <div className="sm:w-fit flex items-start my-5 mt-12">
                    <Button type='submit' title={'Submit'} className={'w-fit !px-16 !py-2.5  !bg-light_blue'} />
                </div>
          </div>
        </form>
      </>:
       <div className='p-10 pt-5 overflow-y-auto h-[calc(100vh-130px)] grid justify-center items-center w-full' >
            <img className=' mx-auto w-[100px]' src={success} alt="success" />
            <div className="">
              <p className='font-semibold text-center mb-3' >You have successfuly referred {data?.data?.patient?.name}</p>
              <div className="bg-[#f9f9f9] max-w-[1100px] mx-auto p-3 roudned-md text-sm grid gap-3">
                <p className="font-medium">You’ve just made a successful referral! To ensure your rebate is processed smoothly, please follow these next steps:</p>
                <p>1. Tell your patient to go to their <b>mailbox</b>  and open the <b>email</b>  that we just sent them.</p>
                <p>2. Encourage them to <b>book an appointment on time.</b> </p>
                <p>3. You'll get your rebate as soon as <b>your patient makes payment.</b> </p>
                <p>You’re all set! Thanks for your referral. You’ll be notified as soon as the payment is processed.</p>
              </div>
              <div className="max-w-[600px] flex flex-col mx-auto text-center justify-center ">
                <div className="flex justify-between items-center gap-10 mt-3 bg-[#f9f9f9] text-light_blue rounded-3xl border px-1 pl-3 py-1">
                  <p className='underline ' >{`${patient_base_url}?ref=${data?.data?.referral_code}`}</p>
                  <button onClick={() => copyText(`${patient_base_url}?ref=${data?.data?.referral_code}`)} className='hidden sm:flex rounded-3xl text-black font-semibold bg-light_blue px-5 py-2 items-center gap-1' >
                    <BiCopy />
                    Copy
                  </button> 
                </div>
                <button onClick={() => copyText(`${patient_base_url}?ref=${data?.data?.referral_code}`)} className='w-fit mx-auto mt-3 rounded-3xl text-black font-semibold bg-light_blue px-5 py-2 flex sm:hidden items-center gap-1' >
                    <BiCopy />
                    Copy
                  </button> 
                <p className='mt-10' >Or Copy Your Invite Code</p>
                  <div onClick={() => copyText(data?.data?.referral_code)} className='cursor-pointer mx-auto font-semibold text-light_blue px-5 py-2 flex items-center gap-1' >
                    {data?.data?.referral_code}
                    <BiCopy />
                  </div>
                  <div className="mt-10 justify-center flex items-center gap-7">
                    <button className='rounded-3xl text-white font-semibold bg-primary px-10 py-3 flex items-center gap-1' >
                      Share Link
                      <IoIosArrowForward />
                    </button> 
                    <button onClick={close} className='font-semibold' >Cancel</button>
                  </div>
              </div>
            </div>
        </div>  
      }
      {
        creatingReferral ? <LoadingModal /> : null
      }
    </div>
  )
}

export default New
