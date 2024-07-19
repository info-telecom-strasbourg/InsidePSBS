import { Typography } from "@/components/primitives/typography";
import { Members } from "@/features/organizations/members";

import type { ShowOrganizationData } from "@/schemas/GET/organizations/organization-profile.schema";
import type { PostsData } from "@/schemas/GET/posts/post.schema";
import { Socials } from "@app/(tabs)/profile/_features/socials";
import { View } from "react-native";
import { ProfileHero } from "./hero";

type ProfileProps = {
  avatar: string | undefined;
  title: string | undefined;
  subtitle: string | undefined;
  socials?: ShowOrganizationData["organization"];
  members?: ShowOrganizationData["members"] | undefined;
  posts: (PostsData["data"] | undefined)[] | undefined;
};

export const ProfileHeader = (props: ProfileProps) => {
  return (
    <View className="mb-4 gap-4">
      <ProfileHero
        avatar={props.avatar}
        title={props.title}
        subtitle={props.subtitle}
      />
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
