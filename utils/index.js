import capitalize from "./capitalize";
import {
    checkAlreadyExist,
    checkEmail,
    checkFirstName,
    checkLastName,
    checkPassword,
    checkPasswordConfirmation,
    checkPhone,
    checkPromotionYear,
    checkUsername,
    checkBirthDate,
} from "./checkInputs";
import { getStringDateTime, getStringDate } from "./date/getStringDate";
import getTimeDifference from "./date/getTimeDifference";
import getLayout from "./getLayout";
import hideTextOverflow from "./hideTextOverflow";
import initNotification from "./initNotification";
import loadFonts from "./loadFonts";
import lockScreenOrientation from "./lockScreenOrientation";

export {
  getLayout,
  lockScreenOrientation,
  getTimeDifference,
  getStringDateTime,
  getStringDate,
  capitalize,
  loadFonts,
  hideTextOverflow,
  checkEmail,
  checkPassword,
  checkPasswordConfirmation,
  checkUsername,
  checkPhone,
  checkAlreadyExist,
  checkFirstName,
  checkLastName,
  checkPromotionYear,
  checkBirthDate,
};
