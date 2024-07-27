import { useModalRouter } from "@/hooks/useModalRouter";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import type { ShowOrganizationData } from "@app/(modals)/organizations/_features/organization-profile.schema";
import { Facebook, Globe, Instagram, Mail } from "lucide-react-native";
import type { PropsWithChildren } from "react";
import type { ViewProps } from "react-native";
import { TouchableOpacity, View } from "react-native";

export type SocialsProps = PropsWithChildren<
  {
    data: ShowOrganizationData["organization"] | undefined;
  } & ViewProps
>;

export const Socials = ({ data, ...props }: SocialsProps) => {
  const { theme } = useTheme();
  const modalRouter = useModalRouter();
  return (
    <View className="flex-row items-center gap-4">
      {data?.website_link ? (
        <TouchableOpacity
          onPress={() => modalRouter.open(`${data?.website_link}`)}
        >
          <Globe size={26} color={colors[theme].foreground} />
        </TouchableOpacity>
      ) : null}
      {data?.instagram_link ? (
        <TouchableOpacity
          onPress={() => modalRouter.open(`${data?.instagram_link}`)}
        >
          <Instagram size={26} color={colors[theme].foreground} />
        </TouchableOpacity>
      ) : null}
      {data?.facebook_link ? (
        <TouchableOpacity
          className="-ml-1"
          onPress={() => modalRouter.open(`${data?.facebook_link}`)}
        >
          <Facebook size={26} color={colors[theme].foreground} />
        </TouchableOpacity>
      ) : null}
      {data?.email ? (
        <TouchableOpacity
          className="-ml-1"
          onPress={() => modalRouter.open(`${data?.email}`)}
        >
          <Mail size={27} color={colors[theme].foreground} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
