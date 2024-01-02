import Button, { PrimaryButton } from "components/Button";
import { ScrollScreenContainer } from "components/Containers";
import { Body2, Body3, Title3 } from "components/Text";
import { BackButtonTopbar } from "components/Topbar";
import COLORS from "constants/colors";
import ROUTES from "constants/routes";
import TEXT from "constants/text";
import { useAuth } from "contexts/authContext";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import SettingButton from "./SettingButton";
import styles from "./settings.style";
import { useLocalStorage } from "../../contexts/localStorageContext";
import { useTheme } from "../../contexts/themeContext";

const ProfileScreen = () => {
  const { data, removeData } = useLocalStorage();
  const { theme } = useTheme();
  const { logout } = useAuth();
  const router = useRouter();

  // const { res, isLoading, error } = useFetch(`${API.url}/api/user/me`, {
  //   ...API.headers,
  //   Authorization: `Bearer ${data.token}`,
  // });

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.profile.title}
      </BackButtonTopbar>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {/* <Avatar url={res?.data.avatar_url} pressable /> */}
          <Title3>{/* {res?.data.first_name} {res?.data.last_name} */}</Title3>
          <Body2 style={{ color: theme.text_secondary }}>
            {/* @{res?.data.user_name} */}
          </Body2>
        </View>
        <View style={styles.section}>
          <SettingButton
            text={TEXT.profile.user_name}
            rightIcon={
              <Body3 style={{ color: theme.text_secondary }}>
                {/* @{res?.data.user_name} */}
              </Body3>
            }
            onPress={() => router.push(`${ROUTES.profile}/user_name`)}
          />
          <SettingButton
            text={TEXT.profile.phone}
            rightIcon={
              <Body3 style={{ color: theme.text_secondary }}>
                {/* {res?.data.phone} */}
              </Body3>
            }
            onPress={() => router.push(`${ROUTES.profile}/phone`)}
          />
          <SettingButton
            text={TEXT.profile.sector}
            rightIcon={
              <Text style={{ color: theme.text_secondary }}>
                {/* {res?.data.sector} */}
              </Text>
            }
            onPress={() => router.push(`${ROUTES.profile}/sector`)}
          />
          <SettingButton
            text={TEXT.profile.promotion_year}
            rightIcon={
              <Body3 style={{ color: theme.text_secondary }}>
                {/* {res?.data.promotion_year} */}
              </Body3>
            }
            onPress={() => router.push(`${ROUTES.profile}/promotion_year`)}
          />
          <SettingButton
            text={TEXT.profile.password}
            onPress={() => router.push(`${ROUTES.profile}/password`)}
          />
          <SettingButton
            text={TEXT.profile.unistra}
            rightIcon={
              <Body3 style={{ color: theme.text_secondary }}>
                {/* {res?.data.unistra_id} */}
              </Body3>
            }
            onPress={() => router.push(`${ROUTES.profile}/unistra`)}
          />
        </View>

        <PrimaryButton
          text={TEXT.profile.disconnect}
          textStyle={{ fontSize: 17 }}
          onPress={() => {
            logout();
          }}
        />
        <View style={{ height: 10 }} />
        <Button
          style={{ backgroundColor: COLORS.light_red }}
          textStyle={{ color: COLORS.dark_red, fontSize: 17 }}
          text={TEXT.profile.delete_account}
          onPress={async () => {
            // try {
            //   await removeData("token");
            //   const res = await axios.delete(`${API.url}/api/user`, {
            //     headers: {
            //       ...API.headers,
            //       Authorization: `Bearer ${data.token}`,
            //     },
            //   });
            //   router.replace(ROUTES.auth);
            // } catch (error) {
            //   console.log(error);
            // }
          }}
        />
      </View>
      {/* )} */}
    </ScrollScreenContainer>
  );
};

export default ProfileScreen;
