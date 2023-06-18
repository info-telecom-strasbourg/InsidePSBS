import { StyleSheet } from "react-native";
import { useTheme } from "../../contexts/themeContext";

const fouailleStyles = () => {
  const { theme } = useTheme();
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      flex: 1,
    },
    wrapper: {
      flex: 1,

      paddingHorizontal: 11,
    },

    card: {
      container: {
        backgroundColor: theme.box,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.box_secondary,
        marginHorizontal: 24,
      },
      wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      },

      title: {
        color: theme.text,
        fontWeight: "700",
        fontSize: 16,
        marginBottom: 5,
      },
      money: {
        color: theme.text,
        fontWeight: "700",
        fontSize: 40,
      },

      name: {
        color: theme.text,
        fontWeight: "700",
        fontSize: 16,
      },
    },
  });
};

export default fouailleStyles;
