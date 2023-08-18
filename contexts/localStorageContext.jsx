import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { loadFonts } from "../utils";

const LocalStorageContext = createContext(null);

export const useLocalStorage = () => {
  return useContext(LocalStorageContext);
};

SplashScreen.preventAutoHideAsync().catch((e) => console.error(e));

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

  const fontsLoaded = loadFonts();

  const onLayoutRootView = useCallback(async () => {
    if (!loadingData && fontsLoaded) await SplashScreen.hideAsync();
  }, [loadingData, fontsLoaded]);

  if (loadingData || !fontsLoaded) return null;

  return (
    <LocalStorageContext.Provider
      value={{ data, pushData, removeData }}
      onLayout={onLayoutRootView}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
