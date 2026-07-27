import { Button, Column, Host } from "@expo/ui";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <Host matchContents>
      <Column spacing={8}>
        <Button
          variant="filled"
          label="Log In"
          onPress={() => router.push("/(auth)/log-in")}
        />
        <Button variant="outlined" label="Outlined" onPress={() => {}} />
        <Button
          variant="text"
          label="Log In"
          onPress={() => router.push("/(auth)/log-in")}
        />
        {/* <Button onPress={() => {}}>
          <Row spacing={6} alignment="center">
            <Icon
              name={Icon.select({
                ios: "star.fill",
                android: require("@expo/material-symbols/star.xml"),
              })}
              size={16}
              color="#FFFFFF"
            />
            <Text textStyle={{ color: "#FFFFFF" }}>Favorite</Text>
          </Row>
        </Button> */}
      </Column>
    </Host>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
