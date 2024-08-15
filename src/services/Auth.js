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


export default {
  Login, Register, SetupProfile, 
};
