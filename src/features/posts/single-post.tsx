import type { typographyVariants } from "@/components/primitives/typography";
import { Typography } from "@/components/primitives/typography";
import type { SinglePostData } from "@/schemas/post.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import type { VariantProps } from "class-variance-authority";
import { Heart, MessageCircle } from "lucide-react-native";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import type { ViewProps } from "react-native";
import { Image, TouchableOpacity, View } from "react-native";

export type SinglePostProps = PropsWithChildren<
  {
    item: SinglePostData["data"];
    interactions?: boolean;
    className?: string;
    authorNameSize?: VariantProps<typeof typographyVariants>["size"];
    dateSize?: VariantProps<typeof typographyVariants>["size"];
    bodySize?: VariantProps<typeof typographyVariants>["size"];
  } & ViewProps
>;

const SinglePost = ({
  item,
  interactions,
  className,
  authorNameSize = "h4",
  dateSize = "h5",
  bodySize = "h5",
}: SinglePostProps) => {
  const [heartClicked, setHeartClicked] = useState(false);
  const { theme } = useTheme();
  return (
    <View
      className={cn("justify-between rounded-2xl bg-popover p-4", className)}
    >
      <View className="flex-row items-center justify-start">
        <Image
          source={{ uri: item.author.logo_url || undefined }}
          className="size-20"
        />
        <View className="ml-2 flex-col">
          <Typography size={authorNameSize} fontWeight="semibold">
            {item.author.name}
          </Typography>
          <Typography
            size={dateSize}
            fontWeight="medium"
            className="text-muted-foreground"
          >
            {item.date}
          </Typography>
        </View>
      </View>
      <Typography size={bodySize}>{item.body}</Typography>
      {interactions && (
        <View className="mt-3 flex-row items-center gap-4">
          <TouchableOpacity
            className="p-1"
            onPress={() => {
              setHeartClicked(!heartClicked);
            }}
          >
            <Heart
              strokeWidth={1.5}
              color={heartClicked ? colors.red : colors[theme].foreground}
              size={24}
              fill={heartClicked ? colors.red : colors[theme].popover}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MessageCircle
              strokeWidth={1.5}
              color={colors[theme].foreground}
              size={24}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SinglePost;
