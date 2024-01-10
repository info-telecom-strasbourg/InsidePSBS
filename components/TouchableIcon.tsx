import { ChevronLeftIcon, SettingsIcon } from "assets/icons";
import ROUTES from "constants/routes";
import { useTheme } from "contexts/themeContext";
import { useRouter } from "expo-router";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export const TouchableBackIcon = ({
  onPress,
}: {
  onPress: (event: GestureResponderEvent) => void;
}) => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={onPress || (() => router.back())}>
      <ChevronLeftIcon width={13} height={24} color={theme.text} />
    </TouchableOpacity>
  );
};

export const TouchableSettingsIcon = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={() => router.push(ROUTES.settings)}>
      <SettingsIcon width={31} height={31} color={theme.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
