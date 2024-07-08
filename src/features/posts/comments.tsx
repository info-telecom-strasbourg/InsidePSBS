import InfiniteFlashList from "@/components/primitives/infinite-flashlist";
import { Typography } from "@/components/primitives/typography";
import type { CommentsData } from "@/schemas/posts/comments.schema";
import type { ListRenderItem } from "@shopify/flash-list";
import type { ViewProps } from "react-native";
import { Image, View } from "react-native";

type CommentsProps = {
  data: (CommentsData["data"] | undefined | null)[] | undefined;
  size: number;
  setSize: (size: number) => void;
} & ViewProps;

export const Comments = ({ data, size, setSize }: CommentsProps) => {
  const renderComments: ListRenderItem<CommentsData["data"] | undefined> = ({
    item,
  }) => (
    <View className="gap-4">
      {item?.map((item) => (
        <View key={item.id} className="flex-row gap-3">
          <View>
            <Image
              source={{ uri: item.author.logo_url || undefined }}
              className="size-12 rounded-full"
              resizeMode="cover"
            />
          </View>
          <View className="flex-1 rounded-2xl bg-popover p-3">
            <Typography fontWeight="medium" className="">
              {item.author.name}
            </Typography>
            <Typography size="p">{item.body}</Typography>
          </View>
        </View>
      ))}
    </View>
  );
  return (
    <InfiniteFlashList<CommentsData["data"] | undefined>
      data={data?.filter((item) => item !== null) || []}
      renderItem={renderComments}
      size={size}
      setSize={setSize}
    />
  );
};
