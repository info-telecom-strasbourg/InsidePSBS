import React from "react";
import { Text, View } from "react-native";
import { PrimaryButton } from "../../components";
import { Redirect, useRouter, useSearchParams } from "expo-router";

const Exemple = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!searchParams.id) return <Redirect href="exemple/1" />;

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: "black",
      }}
    >
      <Text></Text>
      <PrimaryButton
        text="Next"
        onPress={() => router.push(`exemple/${Number(searchParams.id) + 1}`)}
      />
      <View style={{ height: 20 }} />
      <PrimaryButton
        text="Previous"
        onPress={() => router.push(`exemple/${Number(searchParams.id) - 1}`)}
      />
    </View>
  );
};

export default Exemple;
