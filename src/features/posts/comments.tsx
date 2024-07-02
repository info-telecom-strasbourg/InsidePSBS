import { Typography } from "@/components/primitives/typography";
import type { CommentsData } from "@/schemas/posts/comments.schema";
import type { ViewProps } from "react-native";
import { Image, View } from "react-native";

export type CommentsProps = {
  data: CommentsData["data"] | undefined;
} & ViewProps;

export const Comments = ({ data }: CommentsProps) => {
  return (
    <View>
      <View className="gap-4">
        {data?.map((comment) => (
          <View key={comment.id} className="flex-row gap-3">
            <View>
              <Image
                source={{ uri: comment.author.logo_url || undefined }}
                className="size-12 rounded-full"
                resizeMode="cover"
              />
            </View>
            <View className="flex-1 rounded-2xl bg-popover p-3">
              <Typography fontWeight="medium" className="">
                {comment.author.name}
              </Typography>
              <Typography size="p">{comment.body}</Typography>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
