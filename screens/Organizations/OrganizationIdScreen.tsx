import { ScrollScreenContainer } from "components/Containers";
import { Body1, Title3 } from "components/Text";
import { BackButtonTopbar } from "components/Topbar";
import COLORS from "constants/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, View } from "react-native";
import hideTextOverflow from "utils/hideTextOverflow";

import { useTheme } from "../../contexts/themeContext";

const OrganizationIdScreen = () => {
  const params = useLocalSearchParams();
  //   const { res, isLoading, error } = useFetch(
  //     `https://fouaille.bde-tps.fr/api/organization/${params.id}`,
  //   );
  const { theme } = useTheme();

  const router = useRouter();

  //   const title =
  //     res?.data.short_name?.toUpperCase() ||
  //     res?.data.name ||
  //     TEXT.organizations.title;
  const title = "";

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar>{hideTextOverflow(title, 12)}</BackButtonTopbar>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      <View style={{ alignItems: "center", paddingHorizontal: 11 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.white,
            padding: 6,
            borderRadius: 90,
          }}>
          <Image
            style={{ width: 90, height: 90, borderRadius: 90 }}
            // source={{ uri: res?.data.logo_url }}
            source={{ uri: "" }}
          />
        </View>
        <View style={{ height: 20 }} />
        <Title3>{/* {res?.data.name} */}</Title3>
        <Body1 style={{ color: theme.text_secondary }}>
          {/* {res?.data.short_name?.toUpperCase()} */}
        </Body1>
        <View style={{ height: 20 }} />
        {/* {(res?.data.website_link ||
          res?.data.email ||
          res?.data.facebook_link ||
          res?.data.instagram_link ||
          res?.data.twitter_link ||
          res?.data.discord_link) && ( */}
        <>
          <View
            style={{
              backgroundColor: theme.box,
              borderRadius: 15,
              flexDirection: "row",
              paddingVertical: 25,
              paddingHorizontal: 20,
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "center",
            }}>
            {/* <IconLink
              link={res?.data.website_link}
              icon={<WebIcon color={theme.text} width={40} height={40} />}
              onPress={() => router.replace(res?.data.website_link)}
            />
            <IconLink
              link={res?.data.email}
              icon={<EmailIcon color={theme.text} width={40} height={40} />}
              onPress={() => {}}
            />
            <IconLink
              link={res?.data.facebook_link}
              icon={<FacebookIcon color={theme.text} width={40} height={40} />}
              onPress={() => router.replace(res?.data.facebook_link)}
            />
            <IconLink
              link={res?.data.instagram_link}
              icon={<InstagramIcon color={theme.text} width={40} height={40} />}
              onPress={() => router.replace(res?.data.instagram_link)}
            />
            <IconLink
              link={res?.data.twitter_link}
              icon={<TwitterIcon color={theme.text} width={40} height={40} />}
              onPress={() => router.replace(res?.data.twitter_link)}
            />
            <IconLink
              link={res?.data.discord_link}
              icon={<DiscordIcon color={theme.text} width={40} height={40} />}
              onPress={() => router.replace(res?.data.discord_link)}
            /> */}
          </View>
          <View style={{ height: 20 }} />
        </>
        {/* )} */}
        <Body1>{/* {res?.data.description} */}</Body1>
      </View>
      {/* )} */}
    </ScrollScreenContainer>
  );
};

export default OrganizationIdScreen;
