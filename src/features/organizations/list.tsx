import { Typography } from "@/components/primitives/typography";
import { routes } from "@/constants/routes";
import type { Association } from "@/schemas/assos.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import type { PropsWithChildren } from "react";
import { Image, TouchableOpacity, View } from "react-native";

export type OrganizationListProps = PropsWithChildren<{
  data: Association;
  param: Association["associations"] | Association["clubs"];
}>;

const OrganizationList = ({ data, param }: OrganizationListProps) => {
  const { theme } = useTheme();
  return (
    <View className="gap-3">
      <Typography
        size="h3"
        className="mt-4 text-foreground"
        fontWeight="semibold"
      >
        Associations
      </Typography>
      {data.param.map((item) => (
        <TouchableOpacity
          onPress={() => router.push(`${routes.organizations}/${item.id}`)}
          key={item.id}
          className="flex-1 flex-row items-center justify-start gap-3 rounded-2xl bg-popover p-3"
        >
          <Image
            source={{ uri: `${item.logo_url}` }}
            resizeMode="contain"
            className="size-16 rounded-2xl"
          />
          <View>
            <Typography
              className="text-foreground"
              size="h4"
              fontWeight="medium"
            >
              {item.short_name}
            </Typography>
            <Typography className="text-muted-foreground" size="p">
              {item.name}
            </Typography>
          </View>
          <View className="absolute right-3">
            <ChevronRight size={25} color={colors[theme].foreground} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OrganizationList;
