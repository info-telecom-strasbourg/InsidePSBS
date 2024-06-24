import { Typography } from "@/components/primitives/typography";
import type { AssociationItem } from "@/schemas/assos.schema";
import type { PropsWithChildren } from "react";
import type { ViewProps } from "react-native";
import { Image, View } from "react-native";

export type IdentityProps = PropsWithChildren<
  {
    data: AssociationItem | undefined;
  } & ViewProps
>;

export const Identity = ({ data, ...props }: IdentityProps) => {
  return (
    <View className="flex-row items-center justify-start gap-4">
      <Image
        source={{ uri: `${data?.logo_url}` }}
        className="size-20 rounded-full"
        style={{ resizeMode: "cover" }}
      />
      <View>
        <Typography size="h1" className="text-foreground" fontWeight="semibold">
          {data?.short_name}
        </Typography>
        <Typography size="h5" className="text-muted-foreground">
          {data?.name}
        </Typography>
      </View>
    </View>
  );
};
