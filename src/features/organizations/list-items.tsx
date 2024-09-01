import { ProfilePicture } from "@/components/primitives/profile-picture";
import { Typography } from "@/components/primitives/typography";
import { routes } from "@/constants/routes";
import type { OrganizationData } from "@/schemas/organizations/organizations.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useRouter, type Href } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import type { PropsWithChildren } from "react";
import type { TouchableOpacityProps } from "react-native";
import { TouchableOpacity, View } from "react-native";

export type ListItemsProps = PropsWithChildren<{
  item:
    | OrganizationData["data"]["associations"][0]
    | OrganizationData["data"]["clubs"][0];
}> &
  TouchableOpacityProps;

export const ListItems = ({ item }: ListItemsProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`${routes.organizations}/${item.id}` as Href)}
      key={item.id}
      className="flex-1 flex-row items-center justify-start gap-3 rounded-2xl bg-popover p-3"
    >
      <ProfilePicture
        avatar={item.logo_url}
        imageSize={50}
        isOrganization
        name={item.name}
        color={colors[theme].background}
      />
      <View>
        {item.short_name ? (
          <>
            <Typography
              className="text-foreground"
              size="h4"
              fontWeight="medium"
            >
              {item.short_name}
            </Typography>
            <Typography
              className="text-muted-foreground"
              size="p"
              fontWeight="medium"
            >
              {item.name}
            </Typography>
          </>
        ) : (
          <Typography className="text-foreground" size="h4" fontWeight="medium">
            {item.name}
          </Typography>
        )}
      </View>

      <View className="absolute right-3">
        <ChevronRight size={25} color={colors[theme].foreground} />
      </View>
    </TouchableOpacity>
  );
};
