import { useTheme } from "contexts/themeContext";
import { ScrollView } from "react-native";

const CGUText = () => {
  const { theme } = useTheme();
  console.log(theme);
  // const { res } = useFetch(`${API.url}/api/cgu`, {
  //   ...API.headers,
  //   Authorization: `Bearer ${data.token}`,
  // });
  return (
    <ScrollView style={{ flex: 1 }}>
      {/* {res?.sections?.map((section, index) => (
        <View key={index}>
          <Title3>
            {section.title}
            {"\n"}
          </Title3>
          <Body3>
            {section.content}
            {"\n"}
          </Body3>
        </View>
      ))} */}
    </ScrollView>
  );
};

export default CGUText;
