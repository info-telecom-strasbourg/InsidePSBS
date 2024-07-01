import type { ShowOrganizationData } from "@/schemas/organizations/organization-profile.schema";
import { Image, View } from "react-native";

type MembersProps = { data: ShowOrganizationData["members"] };

const Members = ({ data }: MembersProps) => {
  return (
    <View>
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
