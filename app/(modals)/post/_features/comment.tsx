import { useAuth } from "@/auth/useAuth";
import { ProfilePicture } from "@/components/primitives/profile-picture";
import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import { CircleMinus, CirclePlus } from "lucide-react-native";
import { Skeleton } from "moti/skeleton";
import { memo, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import { CommentsSchema, type CommentsData } from "./comments.schema";

export const Comment = memo(function Comment({
  comment,
  postId,
  levelFromRoot = 0,
}: {
  comment: CommentsData["data"][0] | undefined;
  postId: string;
  levelFromRoot?: number;
}) {
  const { theme } = useTheme();
  const { token } = useAuth();

  const [childrenComment, setChildrenComment] = useState<
    CommentsData["data"] | null
  >(null);
  const [showChildren, setShowChildren] = useState<boolean>(false);

  const fetchChildrenComments = async (
    postId: string,
    parentCommentId: number,
    page: number
  ) => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post/${postId}/comment?per_page=10&parent_comment_id=${parentCommentId}&page=${page}`;
    try {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      const parsedData = await CommentsSchema.safeParseAsync(data);

      const childrenComment = parsedData.data?.data
        ? parsedData.data.data.flat()
        : [];

      setChildrenComment((prev) =>
        prev ? [...prev, ...childrenComment] : childrenComment
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.map((e) => ({ path: e.path, message: e.message }));
        console.error(error);
      }
      console.error(error);
    }
  };

  if (!comment) return null;
  return (
    <>
      <View className="mb-4 flex-row gap-2">
        <View className="mt-1">
          <ProfilePicture
            avatar={comment?.author.logo_url}
            imageSize={35}
            color={colors[theme].popover}
            isOrganization={comment.author.is_organization}
            name={comment.author.name}
          />
        </View>
        <View className="flex-1">
          <View className="gap-3 overflow-hidden rounded-2xl bg-popover p-3">
            <View className="flex-row flex-wrap items-center justify-between">
              <Typography fontWeight="medium" size="h5">
                {comment?.author.name}
              </Typography>
              <Typography className="text-muted-foreground" size="sm">
                {comment.created_since}
              </Typography>
            </View>
            <Typography size="p">{comment?.body}</Typography>
          </View>
          {comment?.children_count && comment.children_count > 0 ? (
            !childrenComment && showChildren ? (
              <View className="flex-row items-center gap-2">
                <ActivityIndicator
                  size={30}
                  color={colors[theme].mutedForeground}
                />
                <Typography
                  size="h5"
                  fontWeight="medium"
                  className="text-muted-foreground"
                >
                  Chargement...
                </Typography>
              </View>
            ) : (
              <TouchableOpacity
                className="flex-row items-center justify-start gap-2 py-1"
                onPress={() => {
                  setShowChildren(!showChildren);
                  if (!childrenComment) {
                    fetchChildrenComments(postId, comment.id, 1);
                  }
                }}
              >
                {showChildren ? (
                  <CircleMinus
                    color={colors[theme].mutedForeground}
                    size={15}
                  />
                ) : (
                  <CirclePlus color={colors[theme].mutedForeground} size={15} />
                )}
                <Typography size="p" className="text-muted-foreground">
                  {showChildren ? "Masquer" : "Afficher"} les réponses
                </Typography>
              </TouchableOpacity>
            )
          ) : null}
        </View>
      </View>
      <View className={cn(levelFromRoot >= 2 ? "" : "ml-12", "flex-1")}>
        {childrenComment &&
          showChildren &&
          childrenComment.map((c, i) => (
            <Comment
              key={i}
              comment={c}
              postId={postId}
              levelFromRoot={levelFromRoot + 1}
            />
          ))}
      </View>
    </>
  );
});

export const SkeletonComment = () => {
  const { theme } = useTheme();
  return (
    <Skeleton.Group show={true}>
      <View className="flex-row gap-3">
        <Skeleton radius="round" colorMode={theme} width={35} height={35} />
        <View className="flex-1">
          <View className="justify-center gap-2 rounded-2xl bg-popover p-4">
            <Skeleton colorMode={theme} width={150} />
            <Skeleton colorMode={theme} height={50} width={"100%"} />
          </View>
        </View>
      </View>
    </Skeleton.Group>
  );
};