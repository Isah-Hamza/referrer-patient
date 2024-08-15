"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const AllBanks = () => {
  return axiosClient()
    .get(endpoints.bank.ALL_BANKS)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};

const VerifyAccount = (data) => {
  return axiosClient()
    .post(endpoints.bank.VERIFY_ACCOUNT, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};

export default {
  AllBanks, VerifyAccount
};
