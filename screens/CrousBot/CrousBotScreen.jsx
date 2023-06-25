import React, { useEffect, useState } from "react";
import { TEXT } from "../../constants";
import { useTheme } from "../../contexts";
import {
  BackButtonTopbar,
  Loader,
  ScrollScreenContainer,
} from "../../components";
import { ChevronLeftIcon, ChevronRightIcon } from "../../assets/icons";
import { Text, TouchableOpacity, View } from "react-native";
import { text_styles } from "../../styles";
import styles from "./touchableicon.style";
import { getMenuIllkirch, menuFormatter } from "./CrousApi";

const CrousBotScreen = () => {
  const { theme } = useTheme();
  const [data, setData] = useState(null);
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getMenuIllkirch(date).then((res) => {
      if (res === -1) setData(null);
      else {
        res = menuFormatter(res);
        setData(res);
      }
    });
  }, [date]);

  const nextDay = (date) => {
    return new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000);
  };

  const prevDay = (date) => {
    return new Date(date.getTime() - 1 * 24 * 60 * 60 * 1000);
  };

  const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    day = String(day).length === 1 ? "0" + day : day;
    month = String(month).length === 1 ? "0" + month : month;
    return `${day}/${month}`;
  };

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar>{TEXT.crousbot.page_name}</BackButtonTopbar>
      <View style={{ alignSelf: "center", flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.iconContainer()}
          onPress={() => setDate(prevDay(date))}
        >
          <ChevronLeftIcon width={13} height={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={text_styles.title3(theme)}>{formatDate(date)}</Text>
        <TouchableOpacity
          style={styles.iconContainer()}
          onPress={() => setDate(nextDay(date))}
        >
          <ChevronRightIcon width={13} height={24} color={theme.text} />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 11 }}>
        <Text style={text_styles.title3(theme)}>{formatDate(date)}</Text>
        <View style={{ paddingVertical: 30 }}>
          {isLoading ? (
            <Loader />
          ) : data ? (
            <>
              <Text style={text_styles.title3(theme)}>
                {TEXT.crousbot.starter}
              </Text>
              <Text style={text_styles.body3(theme)}>{data.starter}</Text>
              <Text style={text_styles.title3(theme)}>
                {TEXT.crousbot.main}
              </Text>
              <Text style={text_styles.body3(theme)}>{data.main}</Text>
              <Text style={text_styles.title3(theme)}>
                {TEXT.crousbot.pasta}
              </Text>
              <Text style={text_styles.body3(theme)}>{data.pasta}</Text>
              <Text style={text_styles.title3(theme)}>{TEXT.crousbot.veg}</Text>
              <Text style={text_styles.body3(theme)}>{data.veg}</Text>
              <Text style={text_styles.title3(theme)}>
                {TEXT.crousbot.grill}
              </Text>
              <Text style={text_styles.body3(theme)}>{data.grill}</Text>
              <Text style={text_styles.title3(theme)}>
                {TEXT.crousbot.dessert}
              </Text>
              <Text style={text_styles.body3(theme)}>{data.dessert}</Text>
            </>
          ) : (
            <Text style={text_styles.title3(theme)}>
              {TEXT.crousbot.menu_error}
            </Text>
          )}
        </View>
      </View>
    </ScrollScreenContainer>
  );
};

export default CrousBotScreen;
