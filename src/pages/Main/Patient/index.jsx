import React, { useEffect, useState } from 'react'
import logo from '../../../assets/images/logo.svg';
import Button from '../../../components/Button'
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import OTPInput from 'react-otp-input';
import Input from '../../../components/Inputs';
import { CiUser } from 'react-icons/ci';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { BiPhone, BiPhoneIncoming } from 'react-icons/bi';
import avatar from '../../../assets/images/stacey.svg';
import tick from  '../../../assets/images/Tick.svg';
import { PiTestTubeFill } from 'react-icons/pi';
import Select from '../../../components/Inputs/Select';
import { BsFillTrashFill, BsPlus } from 'react-icons/bs';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import success from '../../../assets/images/success.svg';
import { useMutation, useQuery } from 'react-query';
import PatientService from '../../../services/Patient';
import { ConvertToNaira, errorToast, successToast } from '../../../utils/Helper';
import LoadingModal from '../../../Loader/LoadingModal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SiConcourse } from 'react-icons/si';
import { CustomValidationError } from '../../../components/Register/StepOne';
import moment from 'moment';

// ZINAUN -> sample refcode

const Patient = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [activeTab, setActiveTab] = useState(2);
    const [process, setProcess] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [selectedTime,setSelectedTime] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [refCode, setRefCode] = useState("");
    const [paymentAccessCode, setPaymentAccessCode] = useState('');
    const [patient, setPatient] = useState(null);

    const [categories, setCategories] = useState([]);
    const [tests, setTests] = useState([]);
    const [successful, setSuccessful] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState(null);
    const [selectedTest, setSelectedTest] = useState(null);
    const [selectedTests, setSelectedTests] = useState([]);


    const toggleConfirmed = () => setConfirmed(!confirmed);

    const nextStep = () => setActiveTab(activeTab + 1);
    const previousStep = () => {
        toggleConfirmed();
        setActiveTab(activeTab - 1)
    };

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
    
    const { isLoading:loadingPatientDetails, data:patientDetails, refetch:refetchPatientDetails , isFetching:fetchingDetails } = useQuery(['patient-details',otp], () => PatientService.GetPatientDetails(otp), {
        enabled:false,
        onSuccess: res => {
            successToast(res.data.message);
            setPatient(res.data.referral);
            setProcess('ref');
            nextStep(); 
        }
    })
    
    const { isLoading:loadingAllPatientDetails, data:allPatientDetails, refetch:refetchAllPatientDetails , isFetching:fetchingAllDetails } = useQuery(['patient-details',otp], () => PatientService.GetPatientDetails(otp), {
        enabled:false,
        onSuccess: res => {
            successToast(res.data.message);
            setPatient(res.data.referral);
            setProcess('ref');
            nextStep(); 
        }
    })
    
    const { isLoading:loadingCategories } = useQuery('test-categories', PatientService.GetTestCategories, {
        onSuccess: res => {
        setCategories(res.data.categories.map(item => ({ label:item.name, value:item.cat_id })));
        }
    })

    const { isLoading:loadingTests, mutate:getTests, data:rawTests } = useMutation(PatientService.GetTests, {
        onSuccess: res => {
        setTests(res.data.tests.map(item => ({ label:item.name+' ('+ ConvertToNaira(item.price)+')', value:item.test_id })));
        setSelectedCategoryName(res.data.category);
        },
        enabled:false,
    })

    const { isLoading:loadingSlots, data:slots, refetch:refetchTimeSlots } = useQuery(['date', date], () => PatientService.GetTimeSlots(moment(date).format('YYYY-MM-DD')), {
        enabled:false,
        onSuccess:res => {successToast(res.data.message); setSelectedTime(null)},
        onError:e => errorToast(e.message ?? "The Date Must be Today or Later"),
        retry:0,
    })

    const { isLoading:loadingDoctors, data } = useQuery('doctors', PatientService.GetDoctors, {
        onSuccess : res => {
            setDoctors(res.data.referrals.map(item =>({ value:item.doctor_id, label:item.doctor_fullname+' ('+item.doctor_phone+')' })))
        }
    })

    const { isLoading:bookingLoading , mutate:bookManually } = useMutation(PatientService.ManualBooking, {
        onSuccess:res => { 
            successToast(res.data.message);
            setRefCode(res.data.referral_code);
            nextStep();
         },
         onError:e => errorToast(e.message),
    })

    const { isLoading:bookAppointmentLoading , data:appointmentData,  mutate:bookAppointmentMutate } = useMutation(PatientService.BookAppointment, {
        onSuccess:res => { 
            successToast(res.data.message);
            nextStep();
         },
         onError:e => errorToast(e.message),
    })

    const { isLoading:initializingPayment ,  mutate:initPayment } = useMutation(PatientService.InitializePayment, {
        onSuccess:res => { 
            successToast(res.data.message);
            window.open(res.data.redirection_link);
            setPaymentAccessCode(res.data.access_token);
            // nextStep();
         },
         onError:e => errorToast(e.message),
    })
    
    const personal = [
        {
            title:'Name',
            value: appointmentData?.data?.referral?.patient?.name,
        },
        {
            title:'Email Address',
            value:appointmentData?.data?.referral?.patient?.email,
        },
        {
            title:'Phone Number',
            value:appointmentData?.data?.referral?.patient?.phone,
        },
        {
            title:'Referred By',
            value:appointmentData?.data?.referral?.referred_by ?? "_",
        },
    ]

    const booking = [
        {
            title:'Date',
            value:moment(appointmentData?.data?.referral?.date.split(' ')[0]).format('ll'),
        },
        {
            title:'Time',
            value:appointmentData?.data?.referral?.date.split(' ')[1],
        },
        {
            title:'Booking Number',
            value: appointmentData?.data?.referral?.appointment_number,
            span:2,
        }, 
    ]

    const { values, getFieldProps, errors, touched, handleSubmit } = useFormik({
        initialValues:{
            "email": "",
            "full_name": "",
            "phone_number": "",
            "gender": "",
            "doctor_id":"",
            "selected_tests": []
        },
        validationSchema: Yup.object().shape({
            email:Yup.string().email().required('This field is required'),
            full_name:Yup.string().required('This field is required'),
            phone_number:Yup.string().required('This field is required'),
            gender:Yup.string().required('This field is required'),

        }),
        onSubmit:values => {
            console.log(values);
            toggleConfirmed();
        }
    })

    const { getFieldProps:getFieldPropsPatient  } = useFormik({
        enableReinitialize:true,
        initialValues:{
            "email": patientDetails?.data?.referral?.patient?.email,
            "full_name": patientDetails?.data?.referral?.patient?.name,
            "phone_number": patientDetails?.data?.referral?.patient?.phone,
            "gender": patientDetails?.data?.referral?.patient?.gender,
        },
        validationSchema: Yup.object().shape({
            email:Yup.string().email().required('This field is required'),
            full_name:Yup.string().required('This field is required'),
            phone_number:Yup.string().required('This field is required'),
            gender:Yup.string().required('This field is required'),

        }),
        onSubmit:values => {
            console.log(values);
            // toggleConfirmed();
        }
    })

    const addTest = () => {
        const matchedTest = rawTests?.data?.tests.find(item => item.test_id == selectedTest);
        console.log(matchedTest);

        const test = {
        price: matchedTest.price,
        test: matchedTest.name,
        category: selectedCategoryName,
        test_id: matchedTest.test_id,
        }

        setSelectedTests(prev => [test,...prev])
    }

    const removeTest = (id) => {
        setSelectedTests(prev => prev.filter(test => test.test_id !== id))
    }

    const bookManualAppoointment = () => {
        if(!selectedTests.length){
        errorToast('Please select at least one test to continue.')
        return
        }
        const tests = selectedTests.map(item => item.test_id);
        values.selected_tests = tests;

        bookManually(values);
        // toggleSuccessful();
    }

    const bookAppointment = () => {

        const payload = {
            referral_code: refCode || "ZINAUN",
            date: moment(date).format('YYYY-MM-DD'),
            time: selectedTime,
        };

        bookAppointmentMutate(payload);
    }

    const initializePayment = () => {
        const payload = { ref_code: refCode }
        initPayment(payload);
    }

    const verify = () => {
        refetchPatientDetails()
    }

  useEffect(() => {
    if(selectedCategory) getTests(selectedCategory)
  }, [selectedCategory])
  
  useEffect(() => {
    if(date && activeTab == 2) refetchTimeSlots();
  }, [date])

  

  return (
    <>
        <div className='flex p-3 h-screen' >
        <div className="w-[500px] bg-[#c9e6ff] rounded-2xl h-full p-8">
            <div className="">
                <img onClick={() => navigate('/')} className='w-40 cursor-pointer' src={logo} alt="logo" />
                <div className="mt-14 grid gap-8">
                    {
                        tabs.map((tab,idx) => (
                            <div onClick={() => {
                                if(idx < activeTab ) setActiveTab(idx);
                            }} key={idx} className='cursor-pointer flex gap-5 max-w-[400px]' >
                                <div className={`rounded-full out border-2  grid place-content-center !min-w-10 !h-10 
                                    ${activeTab == idx ? 'border-light_blue' : ''} 
                                    ${idx >= activeTab ? '' : '!border-primary'}
                                    `}>
                                    { idx >= activeTab ? <div className={`rounded-full mid border-2 border-white grid place-content-center w-9 h-9 bg-primary ${activeTab == idx ? 'border-light_blue' : 'bg-white border-gray-400'}`}>
                                    <div className={`rounded-full in grid place-content-center w-3 h-3 ${activeTab == idx ? ' bg-[#c9e6ff]' : 'bg-gray-400'}`}>
                                        </div>
                                    </div> : 
                                    <img className='w-[18px]' src={tick} alt='tick' />
                                    }
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
        <div className="flex-1 overflow-y-auto">
        { activeTab == 0 ? <div className="w-full h-full grid place-content-center">
                <div className="max-w-[400px] text-sm text-center">
                    <p className='font-bold text-base mb-2'>Redeem Referral Code</p>
                    <p>Enter your referral code below to schedule your test and book an appointment.</p>
                    <div className="">
                        <div className="otp mt-14 grid place-content-center">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            shouldAutoFocus={true}
                            numInputs={6}
                            placeholder={'J4UT9P'}
                            containerStyle={{ display:'flex', gap:'10px' }}
                            inputStyle={{ borderBottom:'2px solid #dcdcdc', fontSize:30, width:'1.3em', height:'2em', outline:'none', color:'#000', fontWeight:700 }}
                            renderSeparator={<span> </span>}
                            renderInput={(props) => <input {...props} />}
                            />
                        </div>
                    <div className='mt-20 ' >
                            <Button className={'!py-2.5'} onClick={verify} title='Verify Referral' />
                            <div className="flex items-center gap-2 my-7">
                                <hr className='flex-1' />
                                <span className='font-semibold text-sm' >OR</span>
                                <hr className='flex-1' />
                            </div>
                            <button 
                                onClick={() => {setProcess('manual'); nextStep()}} 
                                className='w-full font-medium justify-center flex items-center gap-2 py-2.5 border bg-white rounded-[30px]' > 
                            Book Appointment </button>
                    </div>
                    </div>
                </div>
            </div> : activeTab == 1 ?
            <>
            {process == 'manual' ?
                <div className='max-w-[600px] ml-20 py-14' >
                { !confirmed ? <>
                        <div id='' className="">
                            <p className='font-semibold mb-1' >Patient Details</p>
                            <p className='text-sm' >Please kindly edit and confirm your information below.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="grid gap-5 mt-7">
                            <div className="">
                                <Input {...getFieldProps('email')} label={'Email Address'} placeholder={'support@lifebridge.com'} type={'email'} icon={<MdOutlineMarkEmailUnread size={22} />}/>
                                {
                                    touched.email && errors.email && <CustomValidationError text={errors.email} />
                                }
                            </div>
                            <div className="">
                                <Input {...getFieldProps('full_name')} label={'Full Name'} placeholder={'Emmanuella John'} icon={<CiUser size={24} />}/>
                                {
                                    touched.full_name && errors.full_name && <CustomValidationError text={errors.full_name} />
                                }
                            </div>
                            <div className="">
                                <Input {...getFieldProps('phone_number')} label={'Phone Number'} placeholder={'09017693317'} icon={<BiPhone size={24} />}/>
                                {
                                    touched.phone_number && errors.phone_number && <CustomValidationError text={errors.phone_number} />
                                }
                            </div>
                            <div className="">
                                <Select options={[ { label:"Male",value:"Male" }, {label:"Female", value:"Female" } ]} {...getFieldProps('gender')} label={'Gender'} placeholder={'Gender'} icon={<SiConcourse size={24} />}/>
                                {
                                    touched.gender && errors.gender && <CustomValidationError text={errors.gender} />
                                }
                            </div>
                            <div className="">
                                <Select {...getFieldProps('doctor_id')} options={doctors} label={'Who is Referring You?'} placeholder={'Emmanuella Bami'} icon={<CiUser size={24} />}/>
                            </div>
                        
                            <div className="mt-20 flex items-center justify-between">
                                <button type='button' onClick={() => {previousStep(); setConfirmed(false)}} className='underline' >back</button>
                                <Button type='submit' className={'!w-fit !px-12 !py-2.5 !text-sm'} title={'Confirm Details'} />
                            </div>
                        </form>
                    </>
                    :
                    <>
                        <div id='' className="">
                            <div className="mb-7 flex items-center justify-between">
                                <p className='font-semibold mb-1' >Patient Details</p>
                                <button onClick={toggleConfirmed} className='underline text-sm' >Edit Details</button>
                            </div>
                            <div className="grid gap-3 text-sm pb-10 border-b">
                                <p className='text-sm' >{ values.full_name} ({values.gender})</p>
                                <p className='text-sm' >{values.email}</p>
                                <p>{values.phone_number}</p>
                                <p>Refered by: {doctors.find(item => item.value == values.doctor_id)?.label ??  "N/A"}</p>
                            </div>
                            <div className="mt-6">
                                <div id='' className="">
                                    <p className='font-semibold mb-1' >Assigned Tests Details</p>
                                    <p className='text-sm' >Review and proceed to book appointment.</p>
                                </div>
                                <div className="mt-6">
                                    <Select
                                    onChange={e => {setSelectedCategory(e.target.value)}}
                                    label={'Test Category'} options={categories}  icon={<PiTestTubeFill size={22} />}/>
                                </div>
                                <div className="mt-4">
                                    <Select label={'Test Type'}  onChange={e => setSelectedTest(e.target.value)} options={tests}  icon={<PiTestTubeFill size={22} />}/>
                                </div>
                                <button onClick={addTest} type='button' className=" mt-2 flex ml-auto items-center gap-1 text-sm font-semibold">
                                <BsPlus /> Add Test
                                </button>
                                <div className="mt-7 flex items-center gap-2">
                                    <p className='font-semibold mb-1' >Selected Tests</p>
                                    <hr className='flex-1 bg-[gainsboro] text-[gainsboro]' />
                                </div>
                                <div className="mt-7 grid grid-cols-3 gap-5">
                                    {
                                    selectedTests.map((item,idx) => (
                                        <div key={idx} className='relative grid  text-sm bg-[#f9f9f9] border p-3 rounded-lg ' >
                                        <p className='font-medium mb-1' >{ item.category }</p>  
                                        <p className='uppercase mb-10' >{ item.test }</p>  
                                        <p className='mt-auto text-light_blue text-lg font-semibold' >{ConvertToNaira(item.price) }</p>
                                        <button type='button' onClick={() => removeTest(item.test_id)} className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white border grid place-content-center">
                                        <BsFillTrashFill size={15} color='red' />
                                        </button>  
                                        </div>
                                    ))
                                    }
                                </div>
                                <div className="mt-4">
                                    {
                                        selectedTests.length ? 
                                        <p className='text-sm'>Total Test Amount: <span className='font-semibold'> { ConvertToNaira(selectedTests.reduce((prev, curr) => {return prev += Number(curr.price)}, 0)) }</span></p>
                                        :  <div className="mt-5 mb-32 text-center font-medium text-sm">
                                        <p>No Test Selected Yet.</p>
                                      </div>
                                    }
                                    <div className="mt-16 flex items-center justify-between">
                                        <button onClick={() => {previousStep(); setConfirmed(false)}} className='underline' >back</button>
                                        <Button onClick={bookManualAppoointment} className={'!w-fit !px-12 !py-2.5 !text-sm'} title={'Proceed To Appointment'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    }
                </div>
                :     
                <div className='max-w-[550px] ml-20 py-14' >
                { !confirmed ? <>
                        <div id='' className="">
                            <p className='font-semibold mb-1' >Patient Details</p>
                            <p className='text-sm' >Please kindly edit and confirm your information below.</p>
                        </div>
                        <form className="grid gap-5 mt-7">
                            <div className="">
                                <Input {...getFieldPropsPatient('email')} disabled={true}  label={'Email Address'} placeholder={'support@lifebridge.com'} type={'email'} icon={<MdOutlineMarkEmailUnread size={22} />}/>
                            </div>
                            <div className="">
                                <Input {...getFieldPropsPatient('full_name')} label={'Full Name'} placeholder={'John Doe'} icon={<CiUser size={24} />}/>
                            </div>
                            <div className="">
                                <Input {...getFieldPropsPatient('phone_number')} label={'Phone Number'} placeholder={'Phone Number'} icon={<BiPhoneIncoming size={24} />}/>
                            </div>
                            <div className="">
                                <Select options={[ { label:"Male",value:"Male" }, {label:"Female", value:"Female" } ]} {...getFieldPropsPatient('gender')} label={'Gender'} placeholder={'Gender'} icon={<SiConcourse size={24} />}/>
                                {
                                    touched.gender && errors.gender && <CustomValidationError text={errors.gender} />
                                }
                            </div>
                            <div className="">
                                <p className='font-medium mb-1 text-sm' >Invited By</p>
                                <div className='rounded-full p-1.5 text-sm w-fit bg-custom_gray flex gap-2 px-2 pr-5' >
                                    <img className='w-10' src={avatar} alt="avatar" />
                                    <div>
                                        <p className='font-semibold' >{patientDetails?.data?.referral?.referred_by}</p>
                                        <p>Code Invite: <span className='font-semibold' >{patientDetails?.data?.referral?.referral_code}</span> </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-20 flex items-center justify-between">
                                <button onClick={() => {previousStep(); setConfirmed(false)}} className='underline' >back</button>
                                <Button onClick={toggleConfirmed} className={'!w-fit !px-12 !py-2.5 !text-sm'} title={'Confirm Details'} />
                            </div>
                        </form>
                    </>
                    :
                    <>
                        <div id='' className="">
                            <div className="mb-7 flex items-center justify-between">
                                <p className='font-semibold mb-1' >Patient Details</p>
                                <button onClick={toggleConfirmed} className='underline text-sm' >Edit Details</button>
                            </div>
                            <div className="grid gap-3 text-sm pb-16 border-b">
                                <p className='text-sm' >{patient?.patient?.name}</p>
                                <p className='text-sm' >{patient?.patient?.email}</p>
                                <p>{patient?.patient?.phone}</p>
                                <p>Refered by: {patient?.referred_by}</p>
                            </div>
                            <div className="mt-10">
                                <div id='' className="">
                                    <p className='font-semibold mb-1' >Assigned Tests Details</p>
                                    <p className='text-sm' >Review and proceed to book appointment.</p>
                                </div>
                                <div className="mt-7 grid grid-cols-2 gap-3">
                                    {
                                        patient?.selected_tests.map((item,idx) => (
                                        <div key={idx} className='relative grid  text-sm bg-[#f9f9f9] border p-3 rounded-lg ' >
                                            <p className='font-medium mb-1' >{ item.name }</p>  
                                            <p className='uppercase mb-7' >{ item.category }</p>  
                                            <p className='mt-auto text-light_blue text-lg font-semibold' >{ ConvertToNaira(item.price) }</p>
                                            {/* <button className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white border grid place-content-center">
                                                <BsFillTrashFill size={15} color='red' />
                                                </button>   */}
                                        </div>
                                        ))
                                    }
                                </div>
                                <div className="mt-4">
                                    <p className='text-sm'>Total Test Amount: <span className='font-semibold'>{ConvertToNaira(patient?.total_test_amount)}</span></p>
                                    <div className="mt-16 flex items-center justify-between">
                                        <button onClick={() => {previousStep(); setConfirmed(false)}} className='underline' >back</button>
                                        <Button onClick={nextStep} className={'!w-fit !px-12 !py-2.5 !text-sm'} title={'Proceed To Appointment'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    }
                </div>
            }
            </>
            : activeTab == 2 ? 
            <div>
                <div className='max-w-[650px] ml-20 py-10' >
                    <div id='' className="">
                        <p className='font-semibold mb-1' >Book Appointment</p>
                        <p className='text-sm' >When do you want to come?</p>
                    </div>
                    <div className="mt-10 ">
                        <Calendar className={'min-w-[1000px'} onChange={setDate}  />
                    </div>
                    <div className="mt-10 max-w-[600px]">
                        {
                        date ?  <>
                                <p className='font-semibold' >Available Time Slots ({JSON.stringify(moment(date).format('ll'))})</p>
                                <div className="mt-5 grid grid-cols-4 gap-5">
                                    {
                                        slots?.data?.available_slots?.map((time,idx) => (
                                            <button onClick={() => setSelectedTime(time)} key={idx} 
                                            className={`border rounded-2xl px-7 py-2 text-sm ${time == selectedTime && 'text-white font-medium bg-light_blue'}`} >{time}</button>
                                        ))
                                    }
                                </div>
                            </> : null
                        }
                        <div className="mt-16 flex items-center justify-between">
                                <button onClick={() => {previousStep();selectedTime('')}} className='underline' >back</button>
                                <Button disabled={!selectedTime} onClick={bookAppointment} className={'!w-fit !px-12 !py-2.5 !text-sm'} title={'Book Appointment'} />
                        </div>
                    </div>
                </div>
            </div> 
            : activeTab == 3 ? 
            <div className='max-w-[600px] ml-20 py-10 grid place-content-center' >
                <div className="grid text-center">
                    <img className='w-32 mx-auto' src={success} alt="success" />
                    <p className='font-semibold mb-1' >Your Appointment has been booked successfully</p>
                    <p className='text-sm' >Dear {appointmentData?.data?.referral?.patient?.name}, you'll soon receive your booking confirmation via email within 5 minutes. Kindly review your booking details below:</p>
                    <div className="font-medium border-b mt-14 pb-2 text-sm">PERSONAL DETAILS</div>
                    <div className="grid grid-cols-2 gap-10 mt-10">
                        {
                            personal.map((item,idx) => (
                                <div key={idx} className="text-sm">
                                    <p className=' mb-2' >{item.title}</p>
                                    <p className=' font-semibold' >{item.value}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="font-medium border-b mt-14 pb-2 text-sm">TEST DETAILS</div>
                    <div className="grid grid-cols-2 gap-10 mt-10 text-center">
                        {
                            appointmentData?.data?.referral?.selected_tests?.map((item,idx) => (
                                <div key={idx} className="text-sm text-center">
                                    <div className="mb-2 font-semibold flex gap-2 justify-center items-center">
                                        <p className='' >{item.test_id}.</p>
                                        <p className='' >{item.name}</p>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <p className='' >{item.category}</p>
                                        &bull;
                                        <p className='' >{ConvertToNaira(item.price)}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="font-medium border-b mt-14 pb-2 text-sm">BOOKING DETAILS</div>
                    <div className="grid grid-cols-2 gap-10 mt-10 text-center place-content-center">
                            {
                                booking.map((item,idx) => (
                                    <div key={idx} className={`text-sm ${item.span && 'col-span-2 mt-2'}`}>
                                        <p className=' mb-2' >{item.title}</p>
                                        <p className=' font-semibold' >{item.value}</p>
                                    </div>
                                ))
                            }
                    </div>
                    <div className="mt-10">
                        <Button onClick={initializePayment} title={'Pay Now'} />
                        <p className='mt-4 text-center text-sm'>
                        Note that,  While payment is optional, we suggest making payment in advance<br />  to ensure prompt service upon your arrival.
                        </p>
                    </div>
                </div>
            </div> 
            : null
            }

        </div>
        </div>
        {
            (bookingLoading || loadingSlots || bookAppointmentLoading || initializingPayment || loadingPatientDetails || fetchingDetails ) ? <LoadingModal /> : null
        }
    </>
  )
}

export default Patient
