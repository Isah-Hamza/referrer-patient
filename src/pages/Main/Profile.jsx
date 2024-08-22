import React, { useState } from 'react'
import { BiCopy, BiPhoneIncoming, BiSolidUserDetail, BiTrashAlt, BiUser } from "react-icons/bi";
import { CgClose } from 'react-icons/cg';
import { CiLocationOn, CiUser } from 'react-icons/ci';
import { MdOutlineLockPerson, MdOutlineMarkEmailUnread, MdTitle } from 'react-icons/md';
import { PiTestTubeFill } from "react-icons/pi";
import Select from '../../components/Inputs/Select';
import { BsCaretRight, BsFillTrashFill } from 'react-icons/bs';
import Button from '../../components/Button'
import success from '../../assets/images/success.svg';
import { IoIosArrowForward } from "react-icons/io";
import Input from '../../components/Inputs';
import { RiBankCardLine } from 'react-icons/ri';
import { GrSettingsOption } from 'react-icons/gr';
import avatar from '../../assets/images/avatar.svg'
import { FaLocationPin } from 'react-icons/fa6';
import { RiBankCard2Line } from "react-icons/ri";
import { MdOutlineAccountTree } from "react-icons/md";
import deleteIcon from '../../assets/images/delete.svg';
import { useMutation, useQuery } from 'react-query';
import ProfileService from '../../services/Profile';
import PageLoading from '../../Loader/PageLoading';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoadingModal from '../../Loader/LoadingModal';
import { errorToast, successToast } from '../../utils/Helper';
import Bank from '../../services/Bank';
import { CustomValidationError } from '../../components/Register/StepOne';

const Profile = ({  }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [successful, setSuccessful] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);   
  const user_id = JSON.parse(localStorage.getItem('referrer-data'))?.doctor_id;
  const [banks, setBanks] = useState([]);

  const toggleSuccessful = () => setSuccessful(!successful);
  const toggleDeleteAccount = () => setDeleteAccount(!deleteAccount);

  const { isLoading:loadingProfile, data:profile, refetch:refetchProfile  } = useQuery('profile', ()=>ProfileService.GetProfile(user_id))
  const { isLoading:updatingProfile, mutate:updateProfile  } = useMutation(ProfileService.UpdateProfile, {
    onSuccess:res => {
      successToast(res.data.message);
      refetchProfile();
    },
    onError: e => {
      const firstError = Object.entries(e.errors)[0][1];
      errorToast(firstError);
  }
  })

  const { isLoading:updatingBank, mutate:updateBank  } = useMutation(ProfileService.UpdateBank, {
    onSuccess:res => {
      successToast(res.data.message);
      refetchProfile();
    },
    onError: e => {
      const firstError = Object.entries(e.errors)[0][1];
      errorToast(firstError);
  }
  })

const { touched, values, errors, handleSubmit:handleSubmitBank, getFieldProps:getfieldPropsBank, setFieldValue:setFieldValueBank} = useFormik({
    enableReinitialize:true,
    initialValues:{
        "doctor_id": user_id, 
        "bank_name": profile?.data?.bank_name ,
        "account_number":profile?.data?.account_number ,
        "account_name": profile?.data?.account_name,
    },
    validationSchema: Yup.object().shape({
        "doctor_id": Yup.string().required('This field is required'),
        "bank_name": Yup.string().required('This field is required'),
        "account_number": Yup.string().required('This field is required'),
        "account_name": Yup.string().required('This field is required')
    }),
    onSubmit:values => {
        updateBank(values);
    }
})

  const { isLoading:loadingBanks, data } = useQuery('banks', Bank.AllBanks, {
    onSuccess:res => {
        setBanks(res.data.data.map(bank => ({ label:bank.BankName, value:bank.BankName })))
    }
})

const { mutate:verifyBankAccount, isLoading:verifying } = useMutation(Bank.VerifyAccount, {
    onSuccess:res => {
        setFieldValueBank('account_name',res.data.account_name);
        successToast(res.data.message);
    },
    onError:e => {
        errorToast('Invalid or not matching bank details.');
    }
})

const { mutate:changePassword, isLoading:changingPassword } = useMutation(ProfileService.UpdatePassword, {
    onSuccess:res => {
        resetFormPassword();
        successToast(res.data.message);
        
    },
    onError:e => {
        errorToast(e.message);
    }
})

const verifyAccount = () => {
  const payload = {
      account_number:values.account_number,
      bank_code: data?.data?.data?.find(item => item.BankName == values.bank_name)?.BankCode,
  }

  verifyBankAccount(payload);
}


  const tabs = [
    {
      title:'Profile Details',
      icon:<BiSolidUserDetail size={20} />,
      onClick:() => { document.querySelector('#patient').scrollIntoView() },
    },
    {
      title:'Payout Settings',
      icon:<RiBankCardLine size={20} />,
      onClick:() => {
        console.log('clicked')
        document.querySelector('#test').scrollIntoView()},
    },
    {
      title:'Account & Security',
      icon:<GrSettingsOption size={20} />,
      onClick:() => {
        console.log('clicked')
        document.querySelector('#test').scrollIntoView()},
    },
  ]

  const titleOptions = [
    {
        label:'Doctor',
        value:'doctor',
    },
    {
        label:'Pharmacist',
        value:'pharmacist',
    },
    {
        label:'Oculist',
        value:'oculist',
    },
    {
        label:'Dentist',
        value:'dentist',
    },
]

const { getFieldProps, handleSubmit} = useFormik({
  enableReinitialize:true,
  initialValues:{
    "doctor_id":user_id,
    "full_name": profile?.data?.full_name ,
    "email": profile?.data?.email ,
    "phone_number": profile?.data?.phone_number ,
    "hospital_name":profile?.data?.hospital_name ,
    "professional_title":profile?.data?.professional_title ,
    "bank_name": profile?.data?.bank_name ,
    "account_number": profile?.data?.account_number ,
    "account_name": profile?.data?.account_name ,
  },
  validationSchema: Yup.object().shape({}),
  onSubmit:values => {
      console.log(values);
      updateProfile(values);
    }
})



const { resetForm:resetFormPassword, errors:errorsPassword, handleSubmit:handleSubmitPassword, touched:touchedPassword, getFieldProps:getFieldPropsPassword } = useFormik({
  enableReinitialize:true,
  initialValues:{
      doctor_id:user_id,
      password:'',
      old_password:'',
      password_confirmation:'',
  },
  validationSchema: Yup.object().shape({
    password: Yup.string().required().min(8),
    old_password: Yup.string().required(),
    password_confirmation: Yup.string().required('This field is required').oneOf([Yup.ref('password')],'Passwords mismatch'),

  }),
  onSubmit:values => {
      // console.log(values);
      changePassword(values);
  }
})

  const close = () => {
    toggleSuccessful();
  }

  if(loadingProfile){
    return <PageLoading />
  }

  return (
     <div className='w-full bg-white rounded-xl flex' >
      { !successful ? 
      <>
        <div className="w-[350px] border-r h-[calc(100vh-120px)] p-5 pt-7">
        <p className='font-semibold pl-7' >Settings</p> 
        <div className="mt-7 grid gap-7 max-w-[250px]">
          {
            tabs.map((item,idx) => (
              <div onClick={() =>{ setActiveTab(idx); item.onClick()}} key={idx} 
                    className={`hover:font-medium hover:opacity-90 cursor-pointer text-sm flex items-center gap-2 rounded-3xl p-3 px-6 opacity-60 ${idx == activeTab && '!opacity-100 bg-[#f9f9f9] !font-medium'}`} >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </div>
            ))
          }
        </div>
        </div>
        { activeTab == 0 ? 
        <form onSubmit={handleSubmit} className="flex-1 p-10 pt-7  h-[calc(100vh-120px)] overflow-y-auto">
          <div className="flex justify-between">
              <div id='patient' className="">
                <p className='font-semibold mb-1' >Profile Details</p>
                <p className='text-sm' >Manage your profile.</p>
              </div>
          </div>
          <div className="mt-10 flex gap-5 items-center">
            <img className='w-24' src={avatar} alt="user" />
            <div className="grid gap-1">
              <p className='font-medium' >Profile Picture</p>
              <p className='text-text_color text-sm' >PNG, JPG, GIF max size of 5MB</p>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 max-w-[600px]">
            <div className="col-span-2">
                <Input label={'First Name'} placeholder={'John Doe'} {...getFieldProps('full_name')} icon={<CiUser size={24} />}/>
            </div>
            {/* <div className="">
                <Input label={'Last Name'} placeholder={'Doe'} icon={<CiUser size={24} />}/>
            </div> */}
            <div className=" col-span-2">
                <Input disabled label={'Email Address'} placeholder={'support@lifebridge.com'} type={'email'} {...getFieldProps('email')} icon={<MdOutlineMarkEmailUnread size={22} />}/>
            </div>
            <div className=" col-span-2">
                <Input label={'Phone Number'} placeholder={'Phone Number'} {...getFieldProps('phone_number')} icon={<BiPhoneIncoming size={24} />}/>
            </div>
            <div className=" col-span-2">
                <Input label={'Hospital Name'} placeholder={'Lifebridge Medical Diagnostic'} {...getFieldProps('hospital_name')} icon={<CiUser size={24} />}/>
            </div>
            <div className="">
                <Input label={'Location'} placeholder={'Wuye, Abuja'} icon={<CiLocationOn size={24} />}/>
            </div>
            <div className="">
                <Select label={'Professional Title'} {...getFieldProps('professional_title')} options={titleOptions} icon={<MdTitle size={24} />}/>
            </div>
          </div>
          <div className='w-fit mt-10' >
            <Button type='submit' className={'px-14'} title={'Update'} />
          </div>
        </form>
        : activeTab == 1 ? 
        <form onSubmit={handleSubmitBank} className="flex-1 p-10 pt-7  h-[calc(100vh-120px)] overflow-y-auto">
          <div className="flex justify-between">
              <div id='patient' className="">
                <p className='font-semibold mb-1' >Payout Settings</p>
                <p className='text-sm' >Manage your bank information.</p>
              </div>
          </div>

          <div className="mt-5 grid max-w-[600px]">
          <div className="mt-5">
                      <Select {...getfieldPropsBank('bank_name')} label={'Bank Name'} options={banks} icon={<RiBankCard2Line size={22} />}/>
                      {
                      touched.bank_name && errors.bank_name && <CustomValidationError text={errors.bank_name} />
                  }
                  </div>
                  <div className="mt-5">
                      <Input label={'Account Number'} {...getfieldPropsBank('account_number')} placeholder={'0232322951'} icon={<MdOutlineAccountTree size={22} />}/>
                      <div className="flex items-center justify-between gap-5">
                          <p>
                          {
                              touched.account_number && errors.account_number && <CustomValidationError text={errors.account_number} />
                          }
                          </p>
                          <button type='button' onClick={verifyAccount} className='text-xs font-medium'>Verify Account</button>
                      </div>
                  </div>
                  <div className="mt-5">
                      <Input label={'Account Name'} {...getfieldPropsBank('account_name')} disabled={true}  placeholder={'Account Name'} icon={<CiUser size={22} />}/>
                      {
                      touched.account_name && errors.account_name && <CustomValidationError text={errors.account_name} />
                  }
                  </div>
          </div>
          <div className='w-fit mt-10' >
            <Button type='submit' className={'px-14'} title={'Update'} />
          </div>
        </form>
        : activeTab == 2 ?
        <form onSubmit={handleSubmitPassword} className="flex-1 p-10 pt-7  h-[calc(100vh-120px)] overflow-y-auto">
        <div className="flex justify-between">
            <div id='patient' className="">
              <p className='font-semibold mb-1' >Account & Security</p>
              <p className='text-sm' >Update your old password.</p>
            </div>
        </div>

        <div className="mt-10 grid gap-5 max-w-[600px]">
            <div className="">
                <Input label={'Old Password'} {...getFieldPropsPassword('old_password')} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                {
                    touchedPassword.old_password && errorsPassword.old_password && <CustomValidationError text={errorsPassword.old_password} />
                }
            </div>
            <div className="">
                <Input label={'New Password'} {...getFieldPropsPassword('password')} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                {
                    touchedPassword.password && errorsPassword.password && <CustomValidationError text={errorsPassword.password} />
                }
                <p className='text-xs text-text_color' >Password must contain at least one lowercase letters, uppercase letters, numbers and special symbols</p>
            </div>
            <div className="">
                <Input label={'Confirm New Password'} {...getFieldPropsPassword('password_confirmation')} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                {
                    touchedPassword.password_confirmation && errorsPassword.password_confirmation && <CustomValidationError text={errorsPassword.password_confirmation} />
                }
            </div>
          </div>
        <div className='w-fit mt-10' >
          <Button type='submit' className={'px-14'} title={'Update Password'} />
        </div>
        <hr className='w-full my-3 mt-14' />
        <button type='button' onClick={toggleDeleteAccount} className={'text-red-700 font-semibold'}>Delete Account</button>
        </form>
        : null
      }
      </>:
       <div className='p-10 h-[calc(100vh-130px)] flex flex-col justify-center items-center w-full' >
            <img className='-mt-5 w-[120px]' src={success} alt="success" />
            <div className="max-w-[600px] grid justify-center text-center">
              <p className='font-semibold' >You have successfuly referred Emmanuella Bami</p>
              <p className='text-sm max-w-[450px] text-center mx-auto ' >Get ready for a surprise! When your patients make a payment, your rebate will be sent to your wallet within 24 hours. </p>
                <p className='mt-6' >Copy your referral link below:</p>
                <div className="flex justify-between items-center gap-10 mt-3 bg-[#f9f9f9] text-light_blue rounded-3xl border px-1 pl-3 py-1">
                  <p className='underline ' >https://www.patients.lifebridge.com?ref=UYBFJK</p>
                  <button className='rounded-3xl text-black font-semibold bg-light_blue px-5 py-2 flex items-center gap-1' >
                    <BiCopy />
                    Copy
                  </button> 
                </div>
                <p className='mt-10' >Or Copy Your Invite Code</p>
                  <div className='mx-auto font-semibold text-light_blue px-5 py-2 flex items-center gap-1' >
                    UYBFJK
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
        }
      {
        deleteAccount ? 
        <div className='bg-black/50 fixed inset-0 grid place-content-center' >
          <div className="bg-white w-[350px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
            <img className='w-12 m-auto' src={deleteIcon} alt="delete" />
            <p className='text-base font-semibold' >Delete Your Account</p>
            <p className='text-sm' >Are you sure you want to delete your account? This action is irreversible.</p>
            <div className="mt-10 flex items-center gap-5 ">
            <Button type='button' onClick={toggleDeleteAccount} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
            <Button type='button' onClick={toggleDeleteAccount} className={'!px-5 bg-red-600'} title={'Yes Proceed'} />
            </div>
          </div>
        </div> : null
      }
      {
        (updatingProfile || verifying || updatingBank || changingPassword) ? <LoadingModal /> : null
      }
    </div>
  )
}

export default Profile
