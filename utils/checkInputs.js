import axios from "axios";
import { API } from "../constants";

export const checkEmail = (email) => {
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-zA-Z]{2,4}$/;
  return regexEmail.test(email);
};

export const checkPassword = (password) => {
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  return regexPassword.test(password);
};

export const checkPasswordConfirmation = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const checkFirstName = (firstName) => {
  return firstName.length > 0;
};

export const checkLastName = (lastName) => {
  return lastName.length > 0;
};

export const checkUsername = (username) => {
  const regexUsername = /^[a-zA-Z0-9._-]{3,}$/;
  return regexUsername.test(username);
};

export const checkPhone = (phone) => {
  const regexPhone = /^[0-9]{10}$/;
  return regexPhone.test(phone);
};

export const checkPromotionYear = (promotionYear) => {
  return parseInt(promotionYear) <= 2155;
};

export const checkAlreadyExist = async (entry, value) => {
  try {
    const res = await axios.get(
      `${API.url}/api/register/availability?${entry}=${value}`,
      {
        headers: API.headers,
      }
    );
    return true;
  } catch (error) {
    if (error.response.status === 409) return false;
    console.log(error.response.data);
    return true;
  }
};
