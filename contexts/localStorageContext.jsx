import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LocalStorageContext = createContext(null);

export const useLocalStorage = () => {
  return useContext(LocalStorageContext);
};

export const LocalStorageProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loadingData, setLoadingData] = useState(false);

  const loadData = async () => {
    setLoadingData(true);
    const jsonValue = await AsyncStorage.getItem("data");
    if (jsonValue != null) setData(JSON.parse(jsonValue));
    setLoadingData(false);
  };

  const storeData = async (value) => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("data", jsonValue);
  };

  const removeData = (entry) => {
    const newData = { ...data };
    delete newData[entry];
    setData(newData);
  };

  const pushData = (value) => {
    setData({ ...data, ...value });
  };

  useEffect(() => {
    loadData().catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    storeData(data).catch((e) => console.error(e));
  }, [data]);

  if (loadingData) return null;

  return (
    <LocalStorageContext.Provider value={{ data, pushData, removeData }}>
      {children}
    </LocalStorageContext.Provider>
  );
};
