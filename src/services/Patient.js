"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const GetDoctors = () => {
  return axiosClient()
    .get(`${endpoints.patient.ALl_DOCTORS}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetRefferals = (doctor_id) => {
  return axiosClient()
    .get(`${endpoints.referrals.GET_REFERRALS}?doctor_id=${doctor_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetReferral = (ref_id) => {
  return axiosClient()
    .get(`${endpoints.referrals.GET_REFERRAL}?ref_id=${ref_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const ManualBooking = (data) => {
  return axiosClient()
    .post(`${endpoints.patient.MANUAL_BOOKIGN}`, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const BookAppointment = (data) => {
  return axiosClient()
    .post(`${endpoints.patient.BOOK_APPOINTMENT}`, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const InitializePayment = (data) => {
  return axiosClient()
    .post(`${endpoints.patient.INITIATE_PAYMENT}`, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const ConfirmDetails = (data) => {
  return axiosClient()
    .post(`${endpoints.patient.CONFIRM_DETAILS}`, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetTestCategories = () => {
  return axiosClient()
    .get(`${endpoints.referrals.TEST_CATEGORIES}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetTests = (cat_id) => {
  return axiosClient()
    .get(`${endpoints.referrals.CATEGORY_TESTS}/${cat_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetTimeSlots = (date) => {
  return axiosClient()
    .get(`${endpoints.patient.TIME_SLOTS}?date=${date}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}


  const GetPatientDetails = (ref_code) => {
    return axiosClient()
      .get(`${endpoints.patient.PATIENT_DETAILS}/${ref_code}`)
      .then((res) => res)
      .catch((error) => Promise.reject(error));
  }

  const GetAllPatientDetails = (ref_code) => {
    return axiosClient()
      .get(`${endpoints.patient.PATIENT_ALL_DETAILS}/${ref_code}`)
      .then((res) => res)
      .catch((error) => Promise.reject(error));
  }



export default {
  ManualBooking, GetDoctors, GetTimeSlots, BookAppointment, InitializePayment, GetPatientDetails, GetAllPatientDetails,
  ConfirmDetails, GetReferral, GetRefferals, GetTestCategories, GetTestCategories, GetTests
};

