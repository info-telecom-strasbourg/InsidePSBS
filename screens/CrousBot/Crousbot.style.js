import { StyleSheet } from "react-native";
import { FONTS,COLORS } from "../../constants";
import { useTheme } from "../../contexts";

import { text_styles } from "../../styles";


const CrousBotstyles = () => {
  const { theme } = useTheme();
  return StyleSheet.create({
    iconContainer: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
  dateContainer: {
    ...text_styles.title3(theme),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    marginLeft:25,
    ...text_styles.title3(theme),

  },
  bodyContainer: {
    color:theme.text_secondary,
    marginLeft:20,
    marginRight:20,
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
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor:COLORS.dark_blue,
    borderRadius:20,
    borderColor:COLORS.light_blue,
    borderWidth:1,  
  },

},);
};


export default CrousBotstyles;
