"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const GetProfile = (doctor_id) => {
  return axiosClient()
    .get(`${endpoints.profile.GET_PROFILE}?doctor_id=${doctor_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const UpdateProfile = (payload) => {
  return axiosClient()
    .put(`${endpoints.profile.UPDATE_PROFILE}`, payload)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const UpdateBank = (payload) => {
  return axiosClient()
    .put(`${endpoints.profile.UPDATE_ACCOUNT}`, payload)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const UpdatePassword = (payload) => {
  return axiosClient()
    .put(`${endpoints.profile.UPDATE_PASSWORD}`, payload)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}





export default {
  UpdateBank,UpdatePassword,UpdateProfile,GetProfile
};

