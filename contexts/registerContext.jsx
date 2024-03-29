import axios from "axios";
import { createContext, useContext, useState } from "react";
import { API } from "../constants";
import * as Crypto from "expo-crypto";

const RegisterContext = createContext({});

export const useRegister = () => {
  return useContext(RegisterContext);
};

export const RegisterProvider = ({ children }) => {
  const [entries, setEntries] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
    user_name: "",
    phone: "",
    promotion_year: "",
    birth_date: "",
    sector: 2,
  });

  const updateEntry = (key, value) => {
    if (key === "email") {
      value = value.trim();
    }
    setEntries((entries) => ({ ...entries, [key]: value }));
  };

  const signUp = async (entries) => {
    const { password, password_confirmation, email, birth_date, phone } =
      entries;
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password + email
    );
    const hashedPasswordConfirmation = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password_confirmation + email
    );
    if (phone === "") {
      delete entries.phone;
      console.log("phone deleted", entries);
    }
    if (birth_date === "") {
      delete entries.birth_date;
      console.log("birth_date deleted", entries);
    }

    try {
      console.log("post", entries);

      const res = await axios.post(
        `${API.url}/api/register`,
        {
          ...entries,
          password: hashedPassword,
          password_confirmation: hashedPasswordConfirmation,
        }, // password and password_confirmation replace the one from ...entries
        {
          headers: API.headers,
        }
      );
      console.log(res);
    } catch (e) {
      console.error(e.response.data);

      console.error(e.toJSON());
      throw new Error("Issue during Signup");
    }
  };

  return (
    <RegisterContext.Provider value={{ entries, updateEntry, signUp }}>
      {children}
    </RegisterContext.Provider>
  );
};
