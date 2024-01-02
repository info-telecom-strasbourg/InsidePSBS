import { ScrollScreenContainer } from "components/Containers";
import { Loader } from "components/Loader";
import Separator from "components/Separator";
import { Body3, Title3 } from "components/Text";
import { BackButtonTopbar } from "components/Topbar";
import COLORS from "constants/colors";
import TEXT from "constants/text";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import capitalize from "utils/capitalize";

import { ChevronLeftIcon, ChevronRightIcon } from "../../assets/icons";
import { useTheme } from "../../contexts/themeContext";

const CrousBotScreen = () => {
  const [menu, setMenu] = useState(null);
  const [date, setDate] = useState(new Date());

  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchMenu = async () => {
  //     console.log("fetching menu");
  //     const res = await getMenu("illkirch");
  //     console.log(res);
  //     if (res === -1 || res === null) {
  //       setMenu(null);
  //     } else {
  //       dish = menuFormatter(res);
  //       setMenu(dish);
  //     }
  //   };

  //   fetchMenu();
  // }, []);

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
            <Title3 style={styles.dateContainer}>
              {capitalize(
                date.toLocaleString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                }),
              )}
            </Title3>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                onPress={() => setDate(prevDay(date))}
                style={{
                  ...styles.dayButton,
                  justifyContent: "flex-start",
                  marginLeft: 20,
                }}>
                <ChevronLeftIcon width={11} height={19} color={COLORS.white} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDate(nextDay(date))}
                style={{
                  ...styles.dayButton,
                  justifyContent: "flex-end",
                  marginRight: 20,
                }}>
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
                  {menu && menu[date.toISOString().substring(0, 10)] ? (
                    <>
                      <Section
                        title={TEXT.crousbot.starter}
                        content={
                          menu[date.toISOString().substring(0, 10)].starter
                        }
                      />
                      <Section
                        title={TEXT.crousbot.main}
                        content={menu[date.toISOString().substring(0, 10)].main}
                      />
                      <Section
                        title={TEXT.crousbot.pasta}
                        content={
                          menu[date.toISOString().substring(0, 10)].pasta
                        }
                      />
                      <Section
                        title={TEXT.crousbot.veg}
                        content={menu[date.toISOString().substring(0, 10)].veg}
                      />
                      <Section
                        title={TEXT.crousbot.grill}
                        content={
                          menu[date.toISOString().substring(0, 10)].grill
                        }
                      />
                      <Section
                        title={TEXT.crousbot.dessert}
                        content={
                          menu[date.toISOString().substring(0, 10)].dessert
                        }
                      />
                    </>
                  ) : (
                    <Title3>{TEXT.crousbot.menu_error}</Title3>
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
        }}>
        {/* <NativePicker
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
        </NativePicker> */}
      </View>
    </>
  );
};

const Section = ({ title, content }: { title: string; content: string }) => {
  const { theme } = useTheme();
  return (
    <View style={{ paddingVertical: 10 }}>
      <Title3>{title}</Title3>
      <Separator vertical size={10} />
      <View
        style={{ backgroundColor: theme.box, borderRadius: 15, padding: 15 }}>
        <Body3>{content}</Body3>
      </View>
    </View>
  );
};

export default CrousBotScreen;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  dateContainer: {
    color: COLORS.white,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
    marginHorizontal: 40,
    marginVertical: 15,
  },
  buttonWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  separator: {
    marginTop: 10,
    marginLeft: 25,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark_blue,
    width: "20%",
    opacity: 0.5,
  },
  dayContainer: {
    alignItems: "center",
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
    borderRadius: 30,
  },
  dayButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
});
