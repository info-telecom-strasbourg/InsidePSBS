import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useLocalStorage } from "../../contexts/localStorageContext";

import {
  BackButtonTopbar,
  Loader,
  ScrollScreenContainer,
  Separator,
} from "../../components";
import { ChevronLeftIcon, ChevronRightIcon } from "../../assets/icons";
import { Text, TouchableOpacity, View } from "react-native";
import { Picker as NativePicker } from "@react-native-picker/picker";
import { getDate, getMenu, menuFormatter } from "./CrousApi";

import { COLORS, TEXT, FONTS } from "../../constants";
import { useTheme } from "../../contexts";
import crousbotStyle from "./crousbot.style";
import { capitalize } from "../../utils";
import { text_styles } from "../../styles";

const input_styles = StyleSheet.create({
  textInputLabel: ({ text } = useTheme().theme) => ({
    color: text,
    fontSize: 18,
    fontFamily: FONTS.OpenSans.semiBold,
  }),
  textInputEntry: ({ text, box } = useTheme().theme) => ({
    backgroundColor: box,
    color: text,
    minHeight: 54,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 20,
  }),
});

const CrousBotScreen = () => {
  const styles = crousbotStyle();
  const { theme } = useTheme();
  const { data, pushData, removeData } = useLocalStorage();
  const [sector, setSector] = useState(data.sector);
  const [menu, setMenu] = useState(null);
  const [date, setDate] = useState(new Date());

  const [isLoading, setIsLoading] = useState(false);
  const sectors = [
    { id: 1, name: "cronenbourg", short_name: "Cronenbourg" },
    { id: 2, name: "illkirch", short_name: "Illkirch" },
    { id: 3, name: "paul-appell", short_name: "Paul-appell" },
    { id: 4, name: "esplanade", short_name: "Esplanade" },
    { id: 5, name: "gallia", short_name: "Gallia" },
  ];
  useEffect(() => {
    const fetchMenu = async () => {
      const res = await getMenu("illkirch");
      if (res === -1) {
        setMenu(null);
      } else {
        dish = menuFormatter(res);
        setMenu(dish);
      }
    };

    fetchMenu();
  }, []);

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
    <>
      <ScrollScreenContainer>
        <BackButtonTopbar rightIcon={<></>}>
          {TEXT.crousbot.page_name}
        </BackButtonTopbar>

        <View style={{ paddingHorizontal: 18, flex: 1, height: "100%" }}>
          <SeparationBar />
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
                <ChevronLeftIcon width={11} height={19} color={COLORS.white} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDate(nextDay(date))}
                style={{
                  ...styles.dayButton,
                  justifyContent: "flex-end",
                  marginRight: 20,
                }}
              >
                <ChevronRightIcon width={11} height={19} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View>
              {isLoading ? (
                <Loader />
              ) : (
                <View style={{ paddingVertical: 30 }}>
                  {menu[date.toISOString().substring(0, 10)] ? (
                    <>
                      <Section
                        title={TEXT.crousbot.starter}
                        content={menu[date.toISOString().substring(0, 10)].starter}
                      />
                      <Section title={TEXT.crousbot.main} content={menu[date.toISOString().substring(0, 10)].main} />
                      <Section
                        title={TEXT.crousbot.pasta}
                        content={menu[date.toISOString().substring(0, 10)].pasta}
                      />
                      <Section title={TEXT.crousbot.veg} content={menu[date.toISOString().substring(0, 10)].veg} />
                      <Section
                        title={TEXT.crousbot.grill}
                        content={menu[date.toISOString().substring(0, 10)].grill}
                      />
                      <Section
                        title={TEXT.crousbot.dessert}
                        content={menu[date.toISOString().substring(0, 10)].dessert}
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
      <View
        style={{
          width: 180,
          height: 80,
          borderRadius: 150,
          position: "absolute",
          bottom: 21,
          right: 11,
        }}
      >
        <NativePicker
          selectedValue={sector}
          itemStyle={{
            color: theme.text,
            fontFamily: FONTS.OpenSans.semiBold,
          }}
          dropdownIconColor={theme.text}
          dropdownIconRippleColor="none"
          onValueChange={(val) => {
            setSector(val);
            pushData("sector", val);
            console.log(data.sector);
          }}
          style={input_styles.textInputEntry(theme)}
        >
          {sectors?.map((item, index) => (
            <NativePicker.Item
              key={index}
              label={item.short_name}
              value={item.id}
            />
          ))}
        </NativePicker>
      </View>
    </>
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
