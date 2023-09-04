import React, { useEffect, useState } from "react";
import {
  BackButtonTopbar,
  Loader,
  ScrollScreenContainer,
  Separator,
} from "../../components";
import { ChevronLeftIcon, ChevronRightIcon } from "../../assets/icons";
import { Text, TouchableOpacity, View } from "react-native";
import { getMenuIllkirch, menuFormatter } from "./CrousApi";

import { TEXT } from "../../constants";
import { useTheme } from "../../contexts";
import crousbotStyle from "./crousbot.style";
import { capitalize } from "../../utils";
import { text_styles } from "../../styles";

const CrousBotScreen = () => {
  const styles = crousbotStyle();
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
    return new Date(date.getTime() + 24 * 60 * 60 * 1000);
  };

  const prevDay = (date) => {
    return new Date(date.getTime() - 24 * 60 * 60 * 1000);
  };

  const SeparationBar = () => {
    return <View style={styles.separator} />;
  };

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar>{TEXT.crousbot.page_name}</BackButtonTopbar>
      <View style={{ paddingVertical: 30, paddingHorizontal: 18 }}>
        <View style={styles.dayContainer}>
          <Text style={styles.dateContainer}>
            {capitalize(
              date.toLocaleString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })
            )}
          </Text>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() => setDate(prevDay(date))}
              style={{
                ...styles.dayButton,
                justifyContent: "flex-start",
                marginLeft: 20,
              }}
            >
              <ChevronLeftIcon width={11} height={19} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDate(nextDay(date))}
              style={{
                ...styles.dayButton,
                justifyContent: "flex-end",
                marginRight: 20,
              }}
            >
              <ChevronRightIcon width={11} height={19} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View>
            {isLoading ? (
              <Loader />
            ) : (
              <View style={{ paddingVertical: 30 }}>
                {data ? (
                  <>
                    <Section
                      title={TEXT.crousbot.starter}
                      content={data.starter}
                    />
                    <Section title={TEXT.crousbot.main} content={data.main} />
                    <Section title={TEXT.crousbot.pasta} content={data.pasta} />
                    <Section title={TEXT.crousbot.veg} content={data.veg} />
                    <Section title={TEXT.crousbot.grill} content={data.grill} />
                    <Section
                      title={TEXT.crousbot.dessert}
                      content={data.dessert}
                    />
                  </>
                ) : (
                  <Text style={text_styles.title3(theme)}>
                    {TEXT.crousbot.menu_error}
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollScreenContainer>
  );
};

const Section = ({ title, content }) => {
  const { theme } = useTheme();
  return (
    <View style={{ paddingVertical: 10 }}>
      <Text style={text_styles.title3(theme)}>{title}</Text>
      <Separator vertical size={10} />
      <View
        style={{ backgroundColor: theme.box, borderRadius: 15, padding: 15 }}
      >
        <Text style={text_styles.body3(theme)}>{content}</Text>
      </View>
    </View>
  );
};

export default CrousBotScreen;
