"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const GetActivities = (doctor_id) => {
  return axiosClient()
    .get(`${endpoints.dashbaord.ACTIVITIES}?doctor_id=${doctor_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetRebateEarnings = (doctor_id) => {
  return axiosClient()
    .get(`${endpoints.dashbaord.REBATE_EARNINGS}?doctor_id=${doctor_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetDashboardDetails = (doctor_id) => {
  return axiosClient()
    .get(`${endpoints.dashbaord.DASHBOARD_DETAILS}?doctor_id=${doctor_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}


export default {
  GetDashboardDetails, GetRebateEarnings, GetActivities
};

