import { Typography } from "@/components/primitives/typography";
import type { ItsMeUserData } from "@/schemas/user.schema";
import { Image, View } from "react-native";

type ProfileProps = {
  profile: "me" | "user" | "organization";
  data: ItsMeUserData;
};

type FetcherProps = {
  url: string;
  token: string | null;
  profile: ProfileProps;
};

const Profile = ({ profile = "me", data }: ProfileProps) => {
  let members = false;
  if (profile === "me") {
    members = true;
  }
  return (
    <View>
      <View className="flex-row items-center gap-4">
        <Image
          source={{ uri: data.data.avatar_url || undefined }}
          className="size-24"
        />
        <View className="justify-center gap-1">
          <Typography size="h2" fontWeight="semibold">
            {`${data.data.first_name} ${data.data.last_name}`}
          </Typography>
          <Typography size="h3" className="text-muted-foreground">
            {data.data.user_name}
          </Typography>
        </View>
      </View>
    </View>
  );
};

export default Profile;
