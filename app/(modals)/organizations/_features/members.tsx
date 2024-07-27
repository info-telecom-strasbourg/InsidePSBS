import { useModalRouter } from "@/hooks/useModalRouter";
import type { ShowOrganizationData } from "@app/(modals)/organizations/_features/organization-profile.schema";
import { FlatList, Image, Pressable, View } from "react-native";

type MembersProps = { data: ShowOrganizationData["members"] | undefined };

export const Members = ({ data }: MembersProps) => {
  const modalRouter = useModalRouter();
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
              <Image
                source={{ uri: `${item.avatar_url}` || undefined }}
                resizeMode="contain"
                className="size-16 rounded-full"
              />
            </Pressable>
          )}
          horizontal
        />
      </View>
    </View>
  );
};
