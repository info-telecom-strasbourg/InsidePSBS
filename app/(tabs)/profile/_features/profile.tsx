import { Typography } from "@/components/primitives/typography";
import { Members } from "@app/(modals)/organizations/_features/members";
import type { ShowOrganizationData } from "@app/(modals)/organizations/_features/organization-profile.schema";
import { Socials } from "@app/(modals)/organizations/_features/socials";
import type { PostsData } from "@app/(tabs)/posts/_features/post.schema";
import { RenderPosts } from "@app/(tabs)/posts/_features/render-posts";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, View } from "react-native";
import { ProfileHero } from "./hero";

type ProfileProps = {
  posts: (PostsData["data"] | undefined)[] | undefined;
  isRefreshing: boolean;
  handleRefresh: () => void;
  postsAreLoading: boolean;
  postsError?: Error;
  size: number;
  setSize: (size: number) => void;
  avatar: string | undefined;
  title: string | undefined;
  subtitle: string | undefined;
  socials?: ShowOrganizationData["organization"];
  members?: ShowOrganizationData["members"] | undefined;
};

export const Profile = (props: ProfileProps) => {
  const items = props.posts ? props.posts.flat() : [];

  const loadMore = () => {
    props.setSize(props.size + 1);
  };

  return (
    <FlashList<PostsData["data"][0] | undefined>
      data={items}
      ListHeaderComponent={<HeaderComp {...props} />}
      onEndReached={loadMore}
      onEndReachedThreshold={5}
      renderItem={({ item }) => (
        <RenderPosts item={item} postsAreLoading={props.postsAreLoading} />
      )}
      showsVerticalScrollIndicator={false}
      estimatedItemSize={100}
      refreshControl={
        <RefreshControl
          refreshing={props.isRefreshing}
          onRefresh={props.handleRefresh}
        />
      }
    />
  );
};

const HeaderComp = (props: ProfileProps) => {
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
