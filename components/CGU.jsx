import React from "react";
import { useTheme } from "../contexts";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { text_styles } from "../styles";
import { API, TEXT } from "../constants";
import { useFetch } from "../hooks";
import { useLocalStorage } from "../contexts/localStorageContext";

const CGUText = () => {
  const { theme } = useTheme();
  console.log(theme);
  const { data } = useLocalStorage();
  const { res, isLoading, error } = useFetch(`${API.url}/api/cgu`, {
    ...API.headers,
    Authorization: `Bearer ${data.token}`,
  });
  return (
    <ScrollView style={{ flex: 1 }}>
      {
        res?.sections?.map((section, index) => (
          <View key={index}>
            <Text style={text_styles.title3(theme)}>{section.title}{"\n"}</Text>
            <Text style={text_styles.body3(theme)}>{section.content}{"\n"}</Text>
          </View>
        ))
      }
    </ScrollView>
  );
};

export default CGUText;
