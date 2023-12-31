import { StyleSheet } from "react-native";

import { COLORS } from "../../constants";
import { useTheme } from "../../contexts";
import { text_styles } from "../../styles";

const CrousBotstyles = () => {
  const { theme } = useTheme();
  return StyleSheet.create({
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    dateContainer: {
      ...text_styles.title3({ text: COLORS.white }),
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
    bodyContainer: {
      color: theme.text_secondary,
      marginLeft: 20,
      marginRight: 20,
      fontSize: 15,
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
};

export default CrousBotstyles;
