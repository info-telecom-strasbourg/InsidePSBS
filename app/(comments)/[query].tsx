import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

const Comments = () => {
  const local = useLocalSearchParams();

  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post/${local?.query}/comment`;

  return (
    <PageContainer>
      <View className="flex-1 items-center justify-center">
        <Typography size="h1" className="text-center">
          Comments for post {local?.query}
        </Typography>
      </View>
    </PageContainer>
  );
};

export default Comments;
