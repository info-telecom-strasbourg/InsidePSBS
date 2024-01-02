import { InsidePsbs } from "assets/icons";
import { useRouter } from "expo-router";
import { PropsWithChildren, ReactNode } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Title1 } from "./Text";
import { TouchableSettingsIcon, TouchableBackIcon } from "./TouchableIcon";

type TopbarPropsType = PropsWithChildren<{
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}>;

export const Topbar = ({
  children,
  leftIcon,
  rightIcon = <TouchableSettingsIcon />,
  onPress,
}: TopbarPropsType) => {
  return (
    <View style={styles.topbarContainer}>
      <TouchableOpacity
        style={styles.topbarTitleWrapper}
        activeOpacity={1}
        onPress={onPress}>
        <View style={styles.topbarWrapper}>{leftIcon}</View>
        <View style={{ width: 15 }} />
        <View style={styles.topbarWrapper}>
          <Title1>{children}</Title1>
        </View>
      </TouchableOpacity>
      <View style={styles.topbarWrapper}>{rightIcon}</View>
    </View>
  );
};

export const DefaultTopbar = ({ children, rightIcon }: TopbarPropsType) => {
  return (
    <Topbar leftIcon={<InsidePsbs />} rightIcon={rightIcon}>
      {children}
    </Topbar>
  );
};

export const BackButtonTopbar = ({
  children,
  rightIcon,
  onPress,
}: TopbarPropsType) => {
  const router = useRouter();
  return (
    <Topbar
      rightIcon={rightIcon}
      leftIcon={<TouchableBackIcon onPress={onPress} />}
      onPress={onPress ? onPress : () => router.back()}>
      {children}
    </Topbar>
  );
};

const styles = StyleSheet.create({
  topbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    minHeight: 76,
  },
  topbarTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  topbarWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});
