import { Title4 } from "components/Text";
import COLORS from "constants/colors";
import ROUTES from "constants/routes";
import { useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import hideTextOverflow from "utils/hideTextOverflow";

import { ChevronRightIcon } from "../../assets/icons";
import { useTheme } from "../../contexts/themeContext";

type OrganizationDataType = {
  id: number;
  name: string;
  short_name: string;
  logo_url: string;
};

const OrganizationButton = ({ data }: { data: OrganizationDataType }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const dataTitle = data.short_name || data.name;
  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.box,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 7,
        borderRadius: 20,
        marginBottom: 10,
      }}
      onPress={() => router.push(`${ROUTES.organizations}/${data.id}`)}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.white,
            padding: 2,
            borderRadius: 50,
          }}>
          <Image
            source={{ uri: data.logo_url }}
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
        </View>
        <View style={{ width: 20 }} />
        <Title4>{hideTextOverflow(dataTitle, 18)}</Title4>
      </View>
      <ChevronRightIcon color={theme.text} />
    </TouchableOpacity>
  );
};

export default OrganizationButton;
