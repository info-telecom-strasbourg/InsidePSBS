import React, { useEffect } from "react";
import { TEXT } from "../../constants";
import { useState } from "react";
import { Button, Text, View,TouchableOpacity } from "react-native";
import { useTheme } from "../../contexts";
import { text_styles } from "../../styles";
import {
  BackButtonTopbar,
  Loader,
  ScrollScreenContainer,
} from "../../components";
import { getDate, getMenuIllkirch, menuFormatter } from "./CrousApi";
import { ChevronLeftIcon,ChevronRightIcon } from "../../assets/icons";
import styles from "./touchableicon.style";



const CrousBotScreen = () => {
  const { theme } = useTheme();
  const [isLoading, setisLoading] = useState(true);
  const [isMenu, setisMenu] = useState(false);
  const [data, setData] = useState('null');
  const [day_diff, setDay_diff] = useState(0);
  const [date, setDate] = useState(getDate(day_diff));
  
  useEffect(() => {
    setDate(getDate(day_diff))
    console.log(date)
    getMenuIllkirch(date).then((res) => {
    if (res!=-1){
      res=menuFormatter(res);
      setisMenu(true);
      setData(res);}
    else{setisMenu(false)};
    setisLoading(false);
  }, []);}, [day_diff]);

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar>{TEXT.crousbot.page_name}</BackButtonTopbar>
      <View style={{alignSelf:'center', flexDirection: 'row'}}>
          <TouchableOpacity
          style={styles.iconContainer()}
          onPress={() => setDay_diff(day_diff-1)}    >
          <ChevronLeftIcon width={13} height={24} color={theme.text} />
          </TouchableOpacity>
      <Text style={text_styles.title3(theme)}>{date}</Text>
          <TouchableOpacity
          style={styles.iconContainer()}
          onPress={() => setDay_diff(day_diff+1)}    >
          <ChevronRightIcon width={13} height={24} color={theme.text} />
          </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 11 }}>
        <Text style={text_styles.title3(theme)}>{day_diff}</Text>
          <View style={{ paddingVertical: 30 }}>
          {isLoading ? (
            <Loader />): isMenu ? ( <>
              <Text style={text_styles.title3(theme)}>
              {TEXT.crousbot.starter}
              </Text>
              <Text style={text_styles.body3(theme)}>
              {data.starter}
              </Text>
              <Text style={text_styles.title3(theme)}>
              {TEXT.crousbot.main}
              </Text>
              <Text style={text_styles.body3(theme)}>
             {data.main}
              </Text>
              <Text style={text_styles.title3(theme)}>
              {TEXT.crousbot.pasta}
              </Text>
              <Text style={text_styles.body3(theme)}>
             {data.pasta}
              </Text>
              <Text style={text_styles.title3(theme)}>
              {TEXT.crousbot.veg}
              </Text>
              <Text style={text_styles.body3(theme)}>
              {data.veg}
              </Text>
              <Text style={text_styles.title3(theme)}>
              {TEXT.crousbot.grill}
             </Text>
              <Text style={text_styles.body3(theme)}>
              {data.grill}
              </Text>
              <Text style={text_styles.title3(theme)}>
              {TEXT.crousbot.dessert}
              </Text>
              <Text style={text_styles.body3(theme)}>
             {data.dessert}</Text>
             </>):(<Text style={text_styles.title3(theme)}>{TEXT.crousbot.menu_error}</Text>
             )}
          </View>
        </View>

    </ScrollScreenContainer>
  );
};

export default CrousBotScreen;
