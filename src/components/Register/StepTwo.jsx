import React, { useState } from 'react'
import Input from '../Inputs';
import { CiUser } from "react-icons/ci";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineLockPerson } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Button from '../Button';
import { PiHospitalLight } from "react-icons/pi";
import Select from '../Inputs/Select';
import { RiBankCard2Line } from "react-icons/ri";
import { MdOutlineAccountTree } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import Bank from '../../services/Bank';
import { errorToast, successToast } from '../../utils/Helper';
import { useFormik } from 'formik';
import LoadingModal from '../../Loader/LoadingModal';
import * as Yup from 'yup';
import { CustomValidationError } from './StepOne';
import Auth from '../../services/Auth';

const StepTwo = ({ next }) => {
    const navigate = useNavigate();
    const user = JSON.parse(window.localStorage.getItem('referrer-user'));

    const { touched, values, errors, handleSubmit, getFieldProps, setFieldValue} = useFormik({
        initialValues:{
            "user_id": user?.user_id,
            "hospital_name": "",
            "professional_title": "",
            "bank_name": "",
            "account_number": "",
            "account_name": "",
            "bank_code": "",
        },
        validationSchema: Yup.object().shape({
            "user_id": Yup.string().required('This field is required'),
            "hospital_name": Yup.string().required('This field is required'),
            "professional_title": Yup.string().required('This field is required'),
            "bank_name": Yup.string().required('This field is required'),
            "account_number": Yup.string().required('This field is required'),
            "account_name": Yup.string().required('This field is required')
        }),
        onSubmit:values => {
            setupProfile(values);
        }
    })

    const [banks, setBanks] = useState([]);

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

    const { isLoading:loadingBanks, data } = useQuery('banks', Bank.AllBanks, {
        onSuccess:res => {
            setBanks(res.data.data.map(bank => ({ label:bank.name, value:bank.name })))
        }
    })

    const { mutate:verifyBankAccount, isLoading:verifying } = useMutation(Bank.VerifyAccount, {
        onSuccess:res => {
            setFieldValue('account_name',res.data.account_name);
            setFieldValue('bank_code', data?.data?.data?.find(item => item.name == values.bank_name)?.code)
            successToast(res.data.message);
        },
        onError:e => {
            errorToast('Invalid or not matching bank details.');
        }
    })

    const { mutate:setupProfile,isLoading:settingUp} = useMutation(Auth.SetupProfile, {
        onSuccess:res => {
            successToast(res.data.message);
            navigate('/login');
        },
        onError: e => {
            const firstError = Object.entries(e.errors)[0][1];
            errorToast(firstError);
        }
    })

    const verifyAccount = () => {
        const payload = {
            account_number:values.account_number,
            bank_code: data?.data?.data?.find(item => item.name == values.bank_name)?.code,
        }

        verifyBankAccount(payload);
    }

  return (
    <>
        <form onSubmit={handleSubmit} className="">
                <div className='mt-12' >
                    <h4 className='font-semibold text-xl' >Setup Profile</h4>
                    <p className='text- text-text_color' >Supply the required information below.</p>
                </div>
                <div className="mt-10">
                    <Input {...getFieldProps('hospital_name')} label={'Hospital Name'} placeholder={'Lifebridge Medical Diagnostic'} icon={<PiHospitalLight size={24} />}/>
                    {
                        touched.hospital_name && errors.hospital_name && <CustomValidationError text={errors.hospital_name} />
                    }
                </div>
                <div className="mt-5">
                    <Select  label={'Professional Title'} options={titleOptions} {...getFieldProps('professional_title')} icon={<CiUser size={22} />}/>
                    {
                        touched.professional_title && errors.professional_title && <CustomValidationError text={errors.professional_title} />
                    }
                </div>
                <div className="mt-5">
                    <Select {...getFieldProps('bank_name')} label={'Bank Name'} options={banks} icon={<RiBankCard2Line size={22} />}/>
                    {
                    touched.bank_name && errors.bank_name && <CustomValidationError text={errors.bank_name} />
                }
                </div>
                <div className="mt-5">
                    <Input label={'Account Number'} {...getFieldProps('account_number')} placeholder={'0232322951'} icon={<MdOutlineAccountTree size={22} />}/>
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
                    <Input label={'Account Name'} {...getFieldProps('account_name')} disabled={true}  placeholder={'Account Name'} icon={<CiUser size={22} />}/>
                    {
                    touched.account_name && errors.account_name && <CustomValidationError text={errors.account_name} />
                }
                </div>
                <div className='mt-10' >
                    <Button type='submit' title='setup Profile' />
                    {/* <div className="flex items-center gap-2 my-7">
                        <hr className='flex-1' />
                        <span className='font-semibold text-sm' >OR</span>
                        <hr className='flex-1' />
                    </div>
                    <button className='w-full font-medium justify-center flex items-center gap-2 py-3 border bg-white rounded-[30px]' > 
                    <span><FcGoogle size={26} /></span>
                    Signup With Google </button> */}
                </div>
                {/* <div className="mt-14">
                    <p className='text-center text-sm' >
                        Already have an account? <button className='text-primary font-semibold' >Log in</button>
                    </p>
                </div> */}
        </form>
        {
            (verifying || settingUp) ? <LoadingModal /> : null
        }
    </>
  )
}

export default StepTwo
