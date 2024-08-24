import { ProfilePicture } from "@/components/primitives/profile-picture";
import { useModalRouter } from "@/hooks/useModalRouter";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import type { ShowOrganizationData } from "@app/(modals)/organizations/_features/organization-profile.schema";
import { FlatList, Pressable, View } from "react-native";

type MembersProps = { data: ShowOrganizationData["members"] | undefined };

export const Members = ({ data }: MembersProps) => {
  const modalRouter = useModalRouter();

  const { theme } = useTheme();
  return (
    <View>
      <View className="flex-row gap-3">
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-3"
          renderItem={({ item }) => (
            <Pressable
              key={item.id}
              onPress={() => modalRouter.open(`/user/${item.id}`)}
            >
              <ProfilePicture
                avatar={item.avatar_url}
                imageSize={60}
                isOrganization={false}
                name={`${item.first_name} ${item.last_name}`}
                color={colors[theme].popover}
              />
            </Pressable>
          )}
          horizontal
        />
      </View>
    </View>
  );
};
