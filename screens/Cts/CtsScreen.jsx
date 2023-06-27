import React, { useEffect, useState } from "react";
import {
  BackButtonTopbar,
  Loader,
  ScrollScreenContainer,
} from "../../components";
import { ChevronLeftIcon, ChevronRightIcon } from "../../assets/icons";
import { Text, TouchableOpacity, View } from "react-native";
import { fetchApiData } from "./CtsApi";
import { TEXT,COLORS } from "../../constants";
import { useTheme } from "../../contexts";
import { text_styles } from "../../styles";


const CtsScreen = () => {
  const { theme } = useTheme();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchApiData().then((res) => {
      if (res === -1) setData(null);
      else {
        setData(res);
      }
    });
  }, []);



  return (
    <ScrollScreenContainer>
      <BackButtonTopbar>{TEXT.cts.page_name}</BackButtonTopbar>
      
      <View style={{ paddingHorizontal: 11 }}>
        <View style={{ paddingVertical: 30 }}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Text>
                truc ici
              </Text>
            </>)}
        </View>
      </View>
    </ScrollScreenContainer>
  );
};

export default CtsScreen;
