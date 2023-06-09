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
    transactions: {
      container: {
        borderRadius: 20,
        overflow: "hidden",
      },
      title: {
        color: theme.text,
        fontWeight: "600",
        fontSize: 20,
        marginBottom: 15,
        marginHorizontal: 10,
        marginTop: 50,
      },
      transaction: {
        backgroundColor: theme.box,
        paddingVertical: 10,
        paddingHorizontal: 13,
        marginBottom: 2,
        flexDirection: "row",
        alignItems: "center",
      },
      label: {
        color: theme.text,
        marginLeft: 10,
        fontSize: 15,
      },
    },
  });
};

export default fouailleStyles;
