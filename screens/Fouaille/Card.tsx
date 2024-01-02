import ROUTES from "constants/routes";
import TEXT from "constants/text";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { NetworkIcon } from "../../assets/icons";
import { useTheme } from "../../contexts/themeContext";

const Card = ({
  money,
  firstname,
  lastname,
}: {
  money: string;
  firstname: string;
  lastname: string;
}) => {
  const { theme } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
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
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log("go to card");
        router.push(ROUTES.vizualisation);
      }}>
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.title}>{TEXT.fouaille.card}</Text>
          <Text style={styles.money}>{money}€</Text>
        </View>
        <NetworkIcon color={theme.text} width={22} height={31} />
      </View>
      <Text style={styles.name}>
        {firstname} {lastname}
      </Text>
    </TouchableOpacity>
  );
};

export default Card;
