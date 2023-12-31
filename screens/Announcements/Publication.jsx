import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import styles from "./publication.style";
import { HeartBorderIcon, MessagesIcon } from "../../assets/icons";
import ChevronDown from "../../assets/icons/ChevronDown";
import { COLORS, ROUTES } from "../../constants";
import { useTheme } from "../../contexts";
import { text_styles } from "../../styles";
import { getStringDateTime, hideTextOverflow } from "../../utils";

const Publication = ({ data }) => {
  var body_length = data.body.length;
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
          <Text style={text_styles.title3(theme)}>{data.author.name}</Text>
          <Text style={text_styles.body3({ text: theme.text_secondary })}>
            {getStringDateTime(data.date)}
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={text_styles.title2(theme)}>{data.title}</Text>
      <View style={{ height: 5 }} />
      <Text style={text_styles.body3(theme)}>
        {hideTextOverflow(data.body, 500)}
      </Text>
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
          <Text style={text_styles.body3({ text: COLORS.primary })}>
            Voir plus
          </Text>
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
