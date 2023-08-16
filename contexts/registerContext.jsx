import axios from "axios";
import { createContext, useContext, useState } from "react";
import { API } from "../constants";

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
    sector: 2,
  });

  const updateEntry = (key, value) => {
    setEntries((entries) => ({ ...entries, [key]: value }));
  };

  const signUp = async (entries) => {
    try {
      console.log(entries);
      const res = await axios.post(`${API.url}/api/register`, entries, {
        headers: API.headers,
      });
    } catch (e) {
      console.log(e.toJSON());
    }
  };

  return (
    <RegisterContext.Provider value={{ entries, updateEntry, signUp }}>
      {children}
    </RegisterContext.Provider>
  );
};
