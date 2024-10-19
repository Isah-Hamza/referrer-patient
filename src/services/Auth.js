"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const Login = (data) => {
  return axiosClient()
    .post(endpoints.auth.LOGIN, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};

const Register = (data) => {
  return axiosClient()
    .post(endpoints.auth.REGISTER, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};

const SetupProfile = (data) => {
  return axiosClient()
    .post(endpoints.auth.SETUP_PROFILE, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};

const ForgotPassword = (data) => {
  return axiosClient()
    .post(endpoints.auth.FORGOT_PASSWORD, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};

const VerifyOTP = (data) => {
  return axiosClient()
    .post(endpoints.auth.VERIFY_OTP, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};

const ChangePassword = (data) => {
  return axiosClient()
    .post(endpoints.auth.CHANGE_PASSWORD, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};

const ProfessionalTitles = () => {
  return axiosClient()
    .get(endpoints.auth.PROFESSIONAL_TITLES)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};


export default {
  Login, Register, SetupProfile, ForgotPassword, VerifyOTP, ChangePassword,
  ProfessionalTitles,
};
