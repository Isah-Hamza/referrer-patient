import {toast} from "react-toastify";
import {CustomSuccessToast} from "../components/customtoast";
import customToastComponent from "../components/Toast/customToast";
import moment from "moment";

export const copyText = (text) => {
  const copyText = text; 
  navigator.clipboard.writeText(copyText);
  successToast('Copied Successfully');
}

export const successToast = (msg) => {
  customToastComponent(msg ?? "Operation successful!");
};

export const errorToast = (msg) => {
  customToastComponent(msg ?? "An Error Occured!",true);
  // toast.error(msg ?? "Operation failed. Try again!", {theme: "light"});
};

export const infoToast = (msg) => {
  toast.info(msg ?? "Attention, please!", {theme: "light"});
};

export const SAVE_TO_LOCALSTORAGE = (key, value) => {
  if (typeof window != "undefined") window.localStorage.setItem(key, JSON.stringify(value));
};

export const GET_FROM_LOCALSTORAGE = (key) => {
  if (typeof window != "undefined") window.localStorage.getItem(key);
};

export const GET_STORAGE_ITEM = (key) => {
  if (typeof window != "undefined") return JSON.parse(window.localStorage.getItem(key));
};

export const REMOVE_FROM_LOCALSTORAGE = (key) => {
   window.localStorage.removeItem(key);
};

export const ConvertToNaira = (amount = 0) => {
  typeof(amount) == 'string' ? amount = Number(amount) : null;
  return `₦${amount.toLocaleString()}`;
};

export const GetStartOfDay = () => {
  return moment().utcOffset("-24:00").startOf("day").toISOString();
};

export const GetStartOfMonth = () => {
  return moment().utcOffset("-00:00").startOf("month").toISOString();
};

export const GetCurrentDateTime = () => {
  return moment().add(1, "hours").toISOString();
};

export const ConvertMinutesToHoursAndMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes > 0) {
    return `${hours}hr ${remainingMinutes}mins`;
  } else {
    return `${hours}hr`;
  }
};

export function Abbreviation(number = 0) {
  const abbreviations = [
    {value: 1e9, symbol: "b"},
    {value: 1e6, symbol: "m"},
    {value: 1e3, symbol: "k"},
  ];

  for (let i = 0; i < abbreviations.length; i++) {
    if (number >= abbreviations[i].value) {
      return (number / abbreviations[i].value).toFixed(1).replace(/\.0$/, "") + abbreviations[i].symbol;
    }
  }
  return number.toString();
}
