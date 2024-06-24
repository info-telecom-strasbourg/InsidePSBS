import { Typography } from "@/components/primitives/typography";
import { type AssociationItem } from "@/schemas/assos.schema";
import { View } from "lucide-react-native";
import type { PropsWithChildren } from "react";
import { Image, TouchableOpacity, type ViewProps } from "react-native";

export type MembersProps = PropsWithChildren<
  {
    data: AssociationItem | undefined;
  } & ViewProps
>;

export const Members = ({ data, ...props }: MembersProps) => {
  return (
    <View className="flex-1">
      <Typography
        size="h3"
        fontWeight="semibold"
        className="bg-red text-foreground"
      >
        Membres
      </Typography>
      {data?.members.map((member) => (
        <TouchableOpacity key={member.id}>
          <Image source={{ uri: member.avatar }} />
        </TouchableOpacity>
      ))}
    </View>
  );
};
