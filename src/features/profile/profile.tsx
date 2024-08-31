import { Typography } from "@/components/primitives/typography";
import { useModalRouter } from "@/hooks/useModalRouter";
import type { ShowOrganizationData } from "@/schemas/organizations/organization-profile.schema";
import type { PostsData } from "@/schemas/post/post.schema";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, TouchableOpacity, View } from "react-native";
import { Members } from "../organizations/members";
import { Socials } from "../organizations/socials";
import { Post } from "../post/post";
import { ProfileHero } from "./hero";

type ProfileProps = {
  posts: (PostsData["data"] | undefined)[] | undefined;
  isRefreshing: boolean;
  handleRefresh: () => void;
  postsAreLoading: boolean;
  postsError?: Error;
  size: number;
  setSize: (size: number) => void;
  avatar: string | null;
  title: string;
  subtitle: string | undefined;
  socials?: ShowOrganizationData["organization"];
  members?: ShowOrganizationData["members"] | undefined;
  hasMore: number | boolean;
  description?: string | null;
};

export const Profile = (props: ProfileProps) => {
  const items = props.posts ? props.posts.flat() : [];

  const loadMore = () => {
    if (props.hasMore) {
      props.setSize(props.size + 1);
    }
  };

  const modalRouter = useModalRouter();

  return (
    <FlashList<PostsData["data"][0] | undefined>
      data={items}
      ListHeaderComponent={<HeaderComp {...props} />}
      onEndReached={loadMore}
      onEndReachedThreshold={5}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => modalRouter.open(`/post/${item?.id}`)}
          className="mb-4"
        >
          <Post item={item} postId={item?.id} />
        </TouchableOpacity>
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
      {props.description ? (
        <Typography size="p">{props.description}</Typography>
      ) : null}
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
