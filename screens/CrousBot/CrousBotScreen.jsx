import React, { useEffect, useState } from "react";
import {
  BackButtonTopbar,
  Loader,
  ScrollScreenContainer,
} from "../../components";
import { ChevronLeftIcon, ChevronRightIcon } from "../../assets/icons";
import { Text, TouchableOpacity, View } from "react-native";
import { getMenuIllkirch, menuFormatter } from "./CrousApi";

import { TEXT,COLORS } from "../../constants";
import { useTheme } from "../../contexts";
import CrousBotstyles from "./Crousbot.style";
import { text_styles } from "../../styles";


const CrousBotScreen = () => {
  const styles = CrousBotstyles();
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
  const SeparationBar = () => {
    return <View style={styles.separator} />;
  };
  return (
    <ScrollScreenContainer>
      <BackButtonTopbar>{TEXT.crousbot.page_name}</BackButtonTopbar>
      <View style={styles.dayContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setDate(prevDay(date))}
        >
          <ChevronLeftIcon width={13} height={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.dateContainer}>{date.toLocaleString("default", {weekday:'long', day:'numeric', month: "long" })}</Text>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setDate(nextDay(date))}
        >
          <ChevronRightIcon width={13} height={24} color={theme.text} />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 11 }}>
        <View style={{ paddingVertical: 30 }}>
          {isLoading ? (
            <Loader />
          ) : data ? (
            <>
              <Text style={styles.titleContainer}>
                {TEXT.crousbot.starter}
              </Text>
              <SeparationBar />
              <Text style={styles.bodyContainer}>{data.starter}</Text>
              <Text style={styles.titleContainer}>
                {TEXT.crousbot.main}
              </Text>
              <SeparationBar />
              <Text style={styles.bodyContainer}>{data.main}</Text>
              <Text style={styles.titleContainer}>
                {TEXT.crousbot.pasta}
              </Text>
              <SeparationBar />
              <Text style={styles.bodyContainer}>{data.pasta}</Text>
              
              <Text style={styles.titleContainer}>{TEXT.crousbot.veg}</Text>
              <SeparationBar />
              <Text style={styles.bodyContainer}>{data.veg}</Text>
              <Text style={styles.titleContainer}>
                {TEXT.crousbot.grill}
              </Text>
              <SeparationBar />
              <Text style={styles.bodyContainer}>{data.grill}</Text>
              <Text style={styles.titleContainer}>
                {TEXT.crousbot.dessert}
              </Text>
              <SeparationBar />
              <Text style={styles.bodyContainer}>{data.dessert}</Text>
            </>
          ) : (
            <Text style={styles.titleContainer}>
              {TEXT.crousbot.menu_error}
            </Text>
          )}
        </View>
      </View>
    </ScrollScreenContainer>
  );
};

export default CrousBotScreen;
