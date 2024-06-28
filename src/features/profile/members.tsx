import { Typography } from "@/components/primitives/typography";
import type { ShowOrganizationItemData } from "@/schemas/assos.schema";
import { Image, View } from "react-native";

type MembersProps = { data: ShowOrganizationItemData["members"] };

const Members = ({ data }: MembersProps) => {
  return (
    <View>
      <Typography>Membres</Typography>
      <View className="flex-row gap-3">
        {data.map((member, id) => (
          <Image
            key={id}
            source={{ uri: `${member.avatar_url}` || undefined }}
            resizeMode="contain"
            className="size-16 rounded-full"
          />
        ))}
      </View>
    </View>
  );
};

export default Members;
