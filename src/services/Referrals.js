"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

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

const CreateReferrer = (data) => {
  return axiosClient()
    .post(`${endpoints.referrals.CREATE_REFERRAL}`, data)
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



export default {
  GetReferral, GetRefferals, CreateReferrer, GetTestCategories, GetTestCategories, GetTests
};

