import { Typography } from "@/components/primitives/typography";
import { routes } from "@/constants/routes";
import type { ShowOrganizationData } from "@/schemas/organizations/organization-profile.schema";
import type { PostsData } from "@/schemas/post/post.schema";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Members } from "../organizations/members";
import { Socials } from "../organizations/socials";
import { ProfileHero } from "./hero";

type ProfileProps = {
  avatar: string | undefined | null;
  title: string;
  subtitle: string | undefined;
  socials?: ShowOrganizationData["organization"];
  members?: ShowOrganizationData["members"] | undefined;
  posts: (PostsData["data"] | undefined)[] | undefined;
};

export const ProfileHeader = (props: ProfileProps) => {
  const router = useRouter();
  return (
    <View className="mb-4 gap-10">
      <TouchableOpacity onPress={() => router.push(routes.settings as Href)}>
        <ProfileHero
          avatar={props.avatar}
          title={props.title}
          subtitle={props.subtitle}
        />
      </TouchableOpacity>
      {props.socials ? <Socials data={props.socials} /> : null}
      {props.members ? (
        <>
          <Typography size="h2" fontWeight="medium" className="mt-5">
            Membres
          </Typography>
          <Members data={props.members} />
        </>
      ) : null}
      <Typography size="h2" fontWeight="medium">
        Publications
      </Typography>
      {props.posts?.[0]?.length === 0 && (
        <Typography size="h3" className="text-center">
          Cet utilisateur n'a pas de publications
        </Typography>
      )}
    </View>
  );
};
