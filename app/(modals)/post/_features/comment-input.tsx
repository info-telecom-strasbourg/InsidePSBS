import { useAuth } from "@/auth/useAuth";
import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import {
  ArrowUp,
  CircleX,
  CornerUpRight,
  PencilLine,
} from "lucide-react-native";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import type { CommentsData } from "./comments.schema";
import { storeComment } from "./store-comment";

export const CommentInput = ({
  postId,
  commentToAnswer,
  setCommentToAnswer,
}: {
  postId: string;
  commentToAnswer: CommentsData["data"][0] | null;
  setCommentToAnswer: React.Dispatch<
    React.SetStateAction<typeof commentToAnswer>
  >;
}) => {
  const { theme } = useTheme();
  const { token } = useAuth();

  const [commentInput, setCommentInput] = useState<string>("");
  return (
    <View>
      {commentToAnswer ? (
        <View className="flex-row justify-between pt-2">
          <View className="flex-row items-center gap-2">
            <CornerUpRight
              color={colors[theme].mutedForeground}
              size={15}
              strokeWidth={2.5}
            />
            <Typography
              size="p"
              fontWeight="semibold"
              className="text-muted-foreground"
            >
              Réponse à {commentToAnswer.author.name}
            </Typography>
          </View>
          <TouchableOpacity onPress={() => setCommentToAnswer(null)}>
            <CircleX color={colors[theme].mutedForeground} />
          </TouchableOpacity>
        </View>
      ) : null}
      <View className="my-2 flex-row items-center gap-3 rounded-full bg-popover p-2 pl-4">
        <PencilLine
          strokeWidth={1.5}
          color={colors[theme].mutedForeground}
          size={24}
        />
        <TextInput
          value={commentInput}
          onChangeText={(commentInput) => setCommentInput(commentInput)}
          className="flex-1 rounded-2xl p-2 text-foreground"
          placeholder="Écrivez un commentaire"
          placeholderTextColor={colors[theme].mutedForeground}
          style={{ fontFamily: "SpaceGrotesk-medium" }}
        />
        <TouchableOpacity
          className="mr-2 rounded-full bg-primary p-2"
          onPress={() => {
            if (commentToAnswer) {
              storeComment(commentInput, postId, token, commentToAnswer.id);
            } else {
              storeComment(commentInput, postId, token);
            }
            setCommentInput("");
          }}
        >
          <ArrowUp
            strokeWidth={2}
            color={colors[theme].primaryForeground}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
