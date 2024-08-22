"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const GetPayments = (doctor_id) => {
  return axiosClient()
    .get(`${endpoints.payment.ALL_TRANSACTIONS}?doctor_id=${doctor_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}





export default {
  GetPayments
};

