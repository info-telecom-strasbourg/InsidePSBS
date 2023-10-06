import { InsidePsbs } from "@/assets/icons";
import { BackButton } from "@/components/Buttons";
import { Title2 } from "@/components/Text";
import { useRouter } from "expo-router";
import type { PropsWithChildren } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type TopbarProps = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
};

export const Topbar = ({
  children,
  leftIcon,
  rightIcon,
  onPress,
}: PropsWithChildren<TopbarProps>) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 15,
        minHeight: 76,
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
      >
        <View>{leftIcon}</View>
        <Title2>{children}</Title2>
      </TouchableOpacity>
      <View>{rightIcon}</View>
    </View>
  );
};

export const DefaultTopbar = ({
  children,
  rightIcon,
}: PropsWithChildren<TopbarProps>) => {
  return (
    <Topbar
      leftIcon={<InsidePsbs width={55} height={50} />}
      rightIcon={rightIcon}
    >
      {children}
    </Topbar>
  );
};

export const BackButtonTopbar = ({
  children,
  rightIcon,
}: PropsWithChildren<TopbarProps>) => {
  const router = useRouter();

  return (
    <Topbar
      rightIcon={rightIcon}
      leftIcon={<BackButton />}
      onPress={() => router.back()}
    >
      {children}
    </Topbar>
  );
};
