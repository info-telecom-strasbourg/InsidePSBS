import { Body3, Title2, Title3 } from "components/Text";
import COLORS from "constants/colors";
import ROUTES from "constants/routes";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { getStringDateTime } from "utils/date/getStringDate";
import hideTextOverflow from "utils/hideTextOverflow";

import styles from "./publication.style";
import ChevronDown from "../../assets/icons/ChevronDown";
import { useTheme } from "../../contexts/themeContext";

const Publication = ({ data }) => {
  const body_length = data.body.length;
  // TODO: implement reactions and comment
  // reaction not implemented in backend
  // var reactions_length = data.reactions.length;
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container(theme)}
      onPress={() => router.push(`${ROUTES.publication}/${data.id}`)}>
      {/* TODO: implement a profile view */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 15,
        }}>
        <Image source={{ uri: data.author.logo_url }} style={styles.image()} />
        <View style={{ width: 10 }} />
        <View>
          <Title3>{data.author.name}</Title3>
          <Body3 style={{ color: theme.text_secondary }}>
            {getStringDateTime(data.date)}
          </Body3>
        </View>
      </TouchableOpacity>
      <Title2>{data.title}</Title2>
      <View style={{ height: 5 }} />
      <Body3>{hideTextOverflow(data.body, 500)}</Body3>
      {body_length >= 500 && (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            marginTop: 3,
          }}
          onPress={() => {
            router.push(`${ROUTES.publication}/${data.id}`);
          }}>
          <Body3 style={{ color: COLORS.primary }}>Voir plus</Body3>
          <View style={{ width: 5 }} />
          <ChevronDown color={COLORS.primary} width={12} height={12} />
        </TouchableOpacity>
      )}
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 20,
        }}>
        {/* <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <HeartBorderIcon color={theme.text} />
          <View style={{ width: 7 }} />
          <Text style={text_styles.body2(theme)}>{reactions_length} likes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <MessagesIcon color={theme.text} />
          <View style={{ width: 7 }} />
          <Text style={text_styles.body2(theme)}>Commenter</Text>
        </TouchableOpacity> */}
      </View>
      {/* <View style={{ height: 30 }} />
      <TouchableOpacity
        onPress={() => router.push(`${ROUTES.publication}/${data.id}`)}
      >
        <Text style={text_styles.body2({ text: COLORS.primary })}>
          Aucun commentaire
        </Text>
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
};

export default Publication;
