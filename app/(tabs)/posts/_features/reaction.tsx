import { useAuth } from "@/auth/useAuth";
import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { postQuery } from "@/utils/post-query";
import type { AddReactionOnPostData } from "@app/(modals)/post/_features/add-reaction.schema";
import {
  AddReactionOnPostSchema,
  type ReactionTypeData,
} from "@app/(modals)/post/_features/add-reaction.schema";
import { Heart } from "lucide-react-native";
import type React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const storeReaction = async (
  reactionTypeId: number,
  postId: number | undefined,
  setReaction: React.Dispatch<
    React.SetStateAction<{ id: number; icon: string } | null | undefined>
  >,
  setReactionCount: React.Dispatch<
    React.SetStateAction<number | null | undefined>
  >,
  token: string | null,
  postCommentId?: number
) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post/${postId}/reaction`;
  const response = await postQuery<AddReactionOnPostData>(
    url,
    token,
    postCommentId
      ? { reaction_type_id: reactionTypeId, post_comment_id: postCommentId }
      : { reaction_type_id: reactionTypeId },
    AddReactionOnPostSchema
  );
  setReaction(response.data.reaction);
  setReactionCount(response.data.reaction_count);
};

export const Reaction = ({
  allReactions,
  reactionsVisible,
  setReactionsVisible,
  reaction,
  setReaction,
  reactionCount,
  setReactionCount,
  postId,
  postCommentId,
}: {
  allReactions: ReactionTypeData["data"] | undefined;
  reactionsVisible: boolean;
  setReactionsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  reaction: { id: number; icon: string } | null | undefined;
  setReaction: React.Dispatch<React.SetStateAction<typeof reaction>>;
  reactionCount: number | null | undefined;
  setReactionCount: React.Dispatch<React.SetStateAction<typeof reactionCount>>;
  postId: number | undefined;
  postCommentId?: number;
}) => {
  const { theme } = useTheme();
  const { token } = useAuth();

  return (
    <>
      {reactionsVisible ? (
        <View className="absolute -left-3 -top-20 flex-row items-center justify-between gap-4 rounded-2xl bg-popover p-3">
          {allReactions?.map((r, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  storeReaction(
                    r.id,
                    postId,
                    setReaction,
                    setReactionCount,
                    token
                  );
                  setReactionsVisible(false);
                }}
              >
                <Typography size="h2">{r.icon}</Typography>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
      <TouchableOpacity
        onPress={
          () =>
            reaction
              ? storeReaction(
                  reaction.id,
                  postId,
                  setReaction,
                  setReactionCount,
                  token
                )
              : storeReaction(1, postId, setReaction, setReactionCount, token) // 1 is the ID for the heart reaction, the default one
        }
        onLongPress={() => setReactionsVisible(true)}
        delayLongPress={200}
      >
        <View className="flex-row items-center">
          <View style={{ width: 30, height: 30 }}>
            <>
              {reaction ? (
                <Text
                  style={{
                    fontSize: 23.5,
                    transform: [{ translateY: -3 }],
                    textAlign: "center",
                  }}
                >
                  {reaction.icon}
                </Text>
              ) : (
                <Heart
                  strokeWidth={1.5}
                  color={colors[theme].foreground}
                  size={30}
                />
              )}
            </>
          </View>
          <View style={{ width: 30 }}>
            <Typography size="p" className="text-center">
              {reactionCount}
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
