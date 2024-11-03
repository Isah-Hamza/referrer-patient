import React, { useEffect, useState } from 'react'
import logo from '../../../assets/images/logo.svg';
import Button from '../../../components/Button'
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
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
// import logo from '../../../assets/images/logo.svg';
import { useMutation, useQuery } from 'react-query';
import PatientService from '../../../services/Patient';
import { ConvertToNaira, errorToast, successToast } from '../../../utils/Helper';
import LoadingModal from '../../../Loader/LoadingModal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SiConcourse } from 'react-icons/si';
import { CustomValidationError } from '../../../components/Register/StepOne';
import moment from 'moment';
import ReactSelect from 'react-select';

// ZINAUN -> sample refcode

const Patient = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(useLocation().search.split('ref=')[1] ||'');
    const [activeTab, setActiveTab] = useState(0);
    const [process, setProcess] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [selectedTime,setSelectedTime] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [refCode, setRefCode] = useState( "");
    
    const [paymentAccessCode, setPaymentAccessCode] = useState('');
    const [patient, setPatient] = useState(null);
    const [paymentSuccessful, setPaymentSuccessful] = useState(useLocation().search.split('paid=')[1] == 'true'  ? true : false);

    const [categories, setCategories] = useState([]);
    const [tests, setTests] = useState([]);
    const [successful, setSuccessful] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState(null);
    const [selectedTest, setSelectedTest] = useState(null);
    const [selectedTests, setSelectedTests] = useState([]);
    const [level,setLevel] = useState('confirm');



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
        retry:1,
        onSuccess: res => {
            successToast(res.data.message);
            setPatient(res.data.referral);
            setProcess('ref');
            if(activeTab == 0) nextStep(); 
           
        },
        onError: e => errorToast(e.message),
    })
    
    const { isLoading:loadingAllPatientDetails, data:allPatientDetails, refetch:refetchAllPatientDetails , isFetching:fetchingAllDetails } = useQuery(['patient-all-details',otp], () => PatientService.GetAllPatientDetails(otp), {
        enabled:false,
        retry:1,
        onSuccess: res => {
            successToast(res.data.message);
            setPatient(res.data.referral);
        }
    })
    
    const { isLoading:loadingCategories } = useQuery('test-categories', PatientService.GetTestCategories, {
        onSuccess: res => {
        setCategories(res.data.categories.map(item => ({ label:item.name, value:item.cat_id })));
        }
    })

    const { isLoading:confirmingDetails, mutate:confirmDetails } = useMutation(PatientService.ConfirmDetails, {
        onSuccess: res => {
            successToast(res.data.message);
            setConfirmed(true);
        },
        onError: e => errorToast(e.message),
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
         onError:e => {
            errorToast(e?.errors?.selected_tests ?? e.message ?? e.errors );
        },
    })

    const { isLoading:bookAppointmentLoading , data:appointmentData,  mutate:bookAppointmentMutate } = useMutation(PatientService.BookAppointment, {
        onSuccess:res => { 
            successToast(res.data.message);
            setLevel('book');
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


    const booking = [
        {
            title:'Date',
            value:moment(date).format('ll'),
        },
        {
            title:'Time',
            value:selectedTime,
        },
    ]

    const bookingWithNumber = [
        {
            title:'Date',
            value:moment(appointmentData?.data?.referral?.appointment_date).format('ll'),
        },
        {
            title:'Time',
            value:appointmentData?.data?.referral?.appointment_time,
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
            phone_number:Yup.string().required('This field is required').length(11,'Phone number must be 11 digits'),
            gender:Yup.string().required('This field is required'),

        }),
        onSubmit:values => {
            console.log(values);
            toggleConfirmed();
        }
    })

    const { getFieldProps:getFieldPropsPatient, handleSubmit:handleSubmitPatient,values:valuesPatient  } = useFormik({
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
            phone_number:Yup.string().required('This field is required').length(11,'Phone number should be 11 digits'),
            gender:Yup.string().required('This field is required'),

        }),
        onSubmit:values => {
            console.log(values);

            const payload = {
                full_name:values.full_name,
                phone_number:values.phone_number,
                patient_id: patientDetails?.data?.referral?.patient?.patient_id,
            }

            confirmDetails(payload);
            
        }
    })

    const personal = [
        {
            title:'Name',
            value: process =='manual' ? values.full_name : valuesPatient.full_name,
        },
        {
            title:'Email Address',
            value:process =='manual' ? values.email : valuesPatient.email,
        },
        {
            title:'Phone Number',
            value:process =='manual' ? values.phone_number : valuesPatient.phone_number,
        },
        {
            title:'Referred By',
            value:process =='manual' ? '_' : patient?.referred_by,
        },
    ]

    const addTest = () => {
        if(!selectedTest || !selectedCategoryName){
            return;
        }
        const matchedTest = rawTests?.data?.tests.find(item => item.test_id == selectedTest);

        const test = {
        price: matchedTest.price,
        test: matchedTest.name,
        category: selectedCategoryName,
        test_id: matchedTest.test_id,
        }

        setSelectedTests(prev => [test,...prev])
        setSelectedTest(null);
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

    const bookAppointmentByRef = () => {
        nextStep()
    }

    const bookAppointment = () => {

        const payload = {
            referral_code: process == 'manual' ? refCode : patient?.referral_code,
            date: moment(date).format('YYYY-MM-DD'),
            time: selectedTime,
        };

        bookAppointmentMutate(payload);
    }

    const initializePayment = () => {
        const payload = { ref_code: process == 'manual' ?  refCode : patient?.referral_code }
        initPayment(payload);
    }

    const verify = () => {
        setConfirmed(false);
        refetchPatientDetails()
    }

    const paymentTnx = [
        {
            title:"Amount",
            value:'₦208,000',
        },
        {
            title:"Payment Date",
            value:'19th Sept, 2024',
        },
        {
            title:"Transaction Number",
            value:'1234567890',
            span:2,
        },
    ]

    const paymentBooking = [
        {
            title:'Date',
            value:'19th Sept, 2024',
        },
        {
            title:'Time',
            value:'11:30AM',
        },
        {
            title:'Booking Number',
            value:'14',
        },
        {
            title:'Referred By',
            value:'Emmanuella Igwe',
        },
    ]

  useEffect(() => {
    if(selectedCategory) getTests(selectedCategory)
  }, [selectedCategory])
  
  useEffect(() => {
    if(date && activeTab == 2) refetchTimeSlots();
  }, [date])

  useEffect(() => {
    if(activeTab == 1 && confirmed ) refetchAllPatientDetails();
  }, [activeTab,confirmed])
  

  

  return (
    <>
        <div className='flex gap-7 md:gap-0 flex-col md:flex-row p-3 md:h-screen' >
            <div className="w-full md:w-[350px] lg:w-[500px] bg-[#c9e6ff] rounded-2xl h-full py-8 px-3 lg:px-8">
                <div className="text-sm lg:text-base">
                    <img onClick={() => navigate('/')} className='w-40 cursor-pointer' src={logo} alt="logo" />
                    <div className="mt-8 md:mt-14 grid gap-8">
                        {
                            tabs.map((tab,idx) => (
                                <div onClick={() => {
                                    if(idx < activeTab ) setActiveTab(idx);
                                }} key={idx} className={`cursor-pointer flex gap-5 md:max-w-[400px] ${activeTab !== idx && 'hidden md:flex'}`} >
                                    <div className={`rounded-full out border-2  hidden md:grid place-content-center !min-w-10 !h-10 
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
                { 
                activeTab == 0 ? 
                <div className="w-full h-full grid place-content-center mb-7 md:mb-0">
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
                                    onClick={() => {setConfirmed(false); setProcess('manual'); nextStep()}} 
                                    className='w-full font-medium justify-center flex items-center gap-2 py-2.5 border bg-white rounded-[30px]' > 
                                Book Appointment </button>
                        </div>
                        </div>
                    </div>
                </div> 
                : activeTab == 1 ?
                <>
                {process == 'manual' ?
                    <div className='max-w-[600px] ml-0 md:ml-20 py-14' >
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
                                    <button type='button' onClick={() => {previousStep(); setConfirmed(false)}} className='underline' >Back</button>
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
                                    {/* <div className="mt-6">
                                        <Select
                                        onChange={e => {setSelectedCategory(e.target.value)}}
                                        label={'Test Category'} options={categories}  icon={<PiTestTubeFill size={22} />}/>
                                    </div>
                                    <div className="mt-4">
                                        <Select label={'Test Type'}  onChange={e => setSelectedTest(e.target.value)} options={tests}  icon={<PiTestTubeFill size={22} />}/>
                                    </div> */}
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
                                    <button onClick={addTest} type='button' className="bg-light_blue px-7 py-2 text-white rounded-3xl mt-4 flex ml-auto items-center gap-1 text-sm font-semibold">
                                    <BsPlus /> Add Test
                                    </button>
                                    <div className="mt-7 flex items-center gap-2">
                                        <p className='font-semibold mb-1' >Selected Tests</p>
                                        <hr className='flex-1 bg-[gainsboro] text-[gainsboro]' />
                                    </div>
                                    <div className="mt-7 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
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
                                            <button onClick={() => {previousStep(); setConfirmed(false)}} className='underline' >Back</button>
                                            <Button onClick={bookManualAppoointment} className={'!w-fit !px-12 !py-2.5 !text-sm'} title={'Proceed To Appointment'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        }
                    </div>
                    :     
                    <div className='max-w-[550px] ml-0 md:ml-20 py-14' >
                    { !confirmed ? <>
                            <div id='' className="">
                                <p className='font-semibold mb-1' >Patient Details</p>
                                <p className='text-sm' >Please kindly edit and confirm your information below.</p>
                            </div>
                            <form onSubmit={handleSubmitPatient} className="grid gap-5 mt-7">
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
                                    <button onClick={() => {previousStep(); setConfirmed(false)}} className='underline' >Back</button>
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
                                            patient?.selected_tests?.map((item,idx) => (
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
                                            <button onClick={() => {previousStep(); setConfirmed(false)}} className='underline' >Back</button>
                                            <Button onClick={bookAppointmentByRef} className={'!w-fit !px-12 !py-2.5 !text-sm'} title={'Proceed To Appointment'} />
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
                    <div className='max-w-[650px] ml-0 md:ml-20 py-10' >
                        <div id='' className="">
                            <p className='font-semibold mb-1' >Book Appointment</p>
                            <p className='text-sm' >When do you want to come?</p>
                        </div>
                        <div className="mt-10 ">
                            <Calendar minDate={new Date()} className={'min-w-[1000px'} onChange={setDate}  />
                        </div>
                        <div className="mt-10 max-w-[600px]">
                            {
                            date ?  <>
                                    <p className='font-semibold text-center md:text-left' >Available Time Slots ({JSON.stringify(moment(date).format('ll'))})</p>
                                    {slots?.data?.available_slots?.length ?<div className="mt-5 grid grid-cols-3 md:grid-cols-4 gap-5">
                                        {
                                            slots?.data?.available_slots?.map((time,idx) => (
                                                <button onClick={() => setSelectedTime(time)} key={idx} 
                                                className={`border rounded-2xl px-4 sm:px-7 py-2 text-sm ${time == selectedTime && 'text-white font-medium bg-light_blue'}`} >{time}</button>
                                            ))
                                        }
                                    </div> : 
                                    <div className='my-12 text- text-center' >
                                        <p>There are no available time slots for the selected date.</p>
                                        <p>Please choose another day.</p>
                                    </div>
                                    }
                                </> : null
                            }
                            <div className="mt-16 flex items-center justify-between">
                                    <button onClick={() => {previousStep();selectedTime('')}} className='underline' >Back</button>
                                    <Button disabled={!selectedTime} onClick={nextStep} className={'!w-fit !px-12 !py-2.5 !text-sm'} title={'Review Appointment'} />
                            </div>
                        </div>
                    </div>
                </div> 
                : activeTab == 3 && level=='confirm' ? 
                    <div className='max-w-[600px] ml-0 md:ml-20 py-10 grid' >
                        <div className="grid">
                            <p className='font-semibold mb-1' >Review Your Appointment</p>
                            <p className='text-sm' >Check if the details below are accurate:</p>
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
                            <div className="grid sm:grid-cols-2 gap-10 mt-10 text-center">
                                {
                                   process == 'manual' ? selectedTests?.map((item,idx) => (
                                        <div key={idx} className="text-sm">
                                            <div className="mb-2 font-semibold flex gap-2  items-center">
                                                <p className='' >{idx + 1}.</p>
                                                <p className='' >{item.test}</p>
                                            </div>
                                            <div className="flex items-center  gap-2">
                                                <p className='' >{item.category}</p>
                                                &bull;
                                                <p className='' >{ConvertToNaira(item.price)}</p>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    patient?.selected_tests?.map((item,idx) => (
                                        <div key={idx} className="text-sm">
                                            <div className="mb-2 font-semibold flex gap-2  items-center">
                                                <p className='' >{idx + 1}.</p>
                                                <p className='' >{item.name}</p>
                                            </div>
                                            <div className="flex items-center  gap-2">
                                                <p className='' >{item.category}</p>
                                                &bull;
                                                <p className='' >{ConvertToNaira(item.price)}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="font-medium border-b mt-14 pb-2 text-sm">BOOKING DETAILS</div>
                            <div className="grid grid-cols-2 gap-10 mt-10 place-content-center">
                                    {
                                        booking.map((item,idx) => (
                                            <div key={idx} className={`text-sm ${item.span && 'col-span-2 mt-2'}`}>
                                                <p className=' mb-2' >{item.title}</p>
                                                <p className=' font-semibold' >{item.value}</p>
                                            </div>
                                        ))
                                    }
                            </div>
                            <div className="mt-14">
                                <div className="flex items-center justify-between gap-5">
                                    <button onClick={previousStep} className='font-medium text-sm'>Back</button>
                                    <Button className={'!w-fit !px-6 !py-2.5'} onClick={bookAppointment} title={'Confirm Booking'} />
                                </div>
                                
                            </div>
                        </div>
                    </div> 
                : activeTab == 3 && level == 'book' ? 
                    <div className='max-w-[600px] ml-0 md:ml-20 py-10 grid place-content-center' >
                        <div className="grid text-center">
                            <img className='w-28 mx-auto' src={success} alt="success" />
                            <p className='font-semibold mb-1' >Your Appointment has been booked successfully</p>
                            <p className='text-sm' >Dear {appointmentData?.data?.referral?.patient?.name}, you'll soon receive your booking confirmation via email address ({appointmentData?.data?.referral?.patient?.email}) within 5 minutes. Kindly review your booking details below:</p>
                            {/* <div className="font-medium border-b mt-14 pb-2 text-sm">PERSONAL DETAILS</div>
                            <div className="grid grid-cols-2 gap-10 mt-10">
                                {
                                    personal.map((item,idx) => (
                                        <div key={idx} className="text-sm">
                                            <p className=' mb-2' >{item.title}</p>
                                            <p className=' font-semibold' >{item.value}</p>
                                        </div>
                                    ))
                                }
                            </div> */}
                            <div className="font-medium border-b mt-14 pb-2 text-sm">TEST DETAILS</div>
                            <div className="grid sm:grid-cols-2 gap-10 mt-10 sm:text-center">
                                {
                                    appointmentData?.data?.referral?.selected_tests?.map((item,idx) => (
                                        <div key={idx} className="text-sm text-center">
                                            <div className="mb-2 font-semibold flex gap-2 justify-center items-center">
                                                <p className='' >{idx + 1}.</p>
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
                                        bookingWithNumber.map((item,idx) => (
                                            <div key={idx} className={`text-sm ${item.span && 'col-span-2 mt-2'}`}>
                                                <p className=' mb-2' >{item.title}</p>
                                                <p className=' font-semibold' >{item.value}</p>
                                            </div>
                                        ))
                                    }
                            </div>
                            <div className="mt-10">
                                <div className="">
                                    <p className='text-sm font-semibold'>Would You like to make payment now ?</p>
                                <p className='mt-1 text-center text-sm'>
                                Note that,  While payment is optional, we suggest making payment in advance<br />  to ensure prompt service upon your arrival.
                                </p>
                                </div>
                                <div className="mt-6 flex flex-col md:flex-row gap-5 justify-between">
                                <Button className={'!w-fits !px-6 !py-2.5'} onClick={initializePayment} title={'Pay ' + ConvertToNaira(appointmentData?.data?.referral?.total_test_amount)} />
                                <button onClick={() => setActiveTab(0)} className='block md:hidden text-center text-sm font-medium' >Go Home</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                : null
                }

            </div>
        </div>
        {
         paymentSuccessful ?<div className="">
            <div className='fixed inset-0 w-screen h-screen bg-white py-10 pb-5 grid place-content-center overflow-y-auto' >
                <div className="grid text-center w-full sm:min-w-[600px] md:min-w-[750px]">
                    <div className="mx-auto">
                    <img className='mb-20 w-52' src={logo} alt="logo" />
                    </div>
                    <img className='w-24 mx-auto' src={success} alt="success" />
                    <p className='font-semibold mb-1' >Payment successful</p>
                    <p className='text-sm sm:max-w-[500px] mx-auto' >Thank you for your payment. Your appointment has been successfully booked. We look forward to seeing you soon!</p>
                    {/* <div className="font-medium border-b mt-8 pb-2 text-sm">TRANSACTION DETAILS</div>
                    <div className="grid grid-cols-2 gap-10 mt-6 text-center">
                        {
                            paymentTnx?.map((item,idx) => (
                                <div key={idx} className={`text-sm ${item.span && 'col-span-2 mt-2'}`}>
                                    <p className=' mb-2' >{item.title}</p>
                                    <p className=' font-semibold' >{item.value}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="font-medium border-b mt-14 pb-2 text-sm">BOOKING DETAILS</div>
                    <div className="grid grid-cols-2 gap-10 mt-6 text-center place-content-center">
                            {
                                paymentBooking.map((item,idx) => (
                                    <div key={idx} className={`text-sm ${item.span && 'col-span-2 mt-2'}`}>
                                        <p className=' mb-2' >{item.title}</p>
                                        <p className=' font-semibold' >{item.value}</p>
                                    </div>
                                ))
                            }
                    </div> */}
                    <div className="mt-10">
                        <Button className={'!w-fit bg-white !font-semibold !text-light_blue px-3 py-2'} onClick={() => {
                            setPaymentSuccessful(false);
                            setActiveTab(0);
                            navigate('/');
                        }
                         } title={'Go Back Home'} />
                    </div>
                </div>
            </div> 
        </div> : null 
        }
        {
            (bookingLoading || loadingSlots || bookAppointmentLoading || initializingPayment || loadingPatientDetails || fetchingDetails || confirmingDetails ) ? <LoadingModal /> : null
        }
    </>
  )
}

export default Patient
