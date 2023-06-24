import React, { useEffect } from "react";
import { ScrollScreenContainer, Topbar } from "../../components";
import { TEXT } from "../../constants";
import { getMenuIllkirch } from "./CrousApi";
import { useState } from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../contexts";
import { text_styles } from "../../styles";

const CrousBotScreen = () => {
  const { theme } = useTheme();
  const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState('null');
  useEffect(() => {
  getMenuIllkirch().then((res) => {
    console.log(res);
    setData(res);
    setisLoading(false);
  }, []);}, []);
  console.log(data);

  return (
    <ScrollScreenContainer>
      <Topbar>{TEXT.crousbot.page_name}</Topbar>
      <View style={{ paddingHorizontal: 11 }}>
          <View style={{ paddingVertical: 30 }}>
            <Text style={text_styles.title3(theme)}>
              {isLoading ? ("Chargement"):(data)}
            </Text>
           
          </View>
        </View>

    </ScrollScreenContainer>
  );
};

export default CrousBotScreen;
