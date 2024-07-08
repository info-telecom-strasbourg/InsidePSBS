import InfiniteFlashList from "@/components/primitives/infinite-flashlist";
import { Typography } from "@/components/primitives/typography";
import { useModalRouter } from "@/hooks/useModalRouter";
import type { ShowOrganizationData } from "@/schemas/organizations/organization-profile.schema";
import type { PostsData } from "@/schemas/posts/post.schema";
import type { ListRenderItem } from "@shopify/flash-list";
import { RefreshControl, TouchableOpacity, View } from "react-native";
import Members from "../organizations/members";
import { Post } from "../posts/post";
import Hero from "./hero";
import { Socials } from "./socials";

type ProfileProps = {
  posts: (PostsData["data"] | undefined)[] | undefined;
  isRefreshing: boolean;
  handleRefresh: () => void;
  postsAreLoading: boolean;
  postsError?: Error;
  size: number;
  setSize: (size: number) => void;
  avatar: string | undefined;
  title: string;
  subtitle: string;
  socials?: ShowOrganizationData["organization"];
  members?: ShowOrganizationData["members"] | undefined;
};

const Profile = (props: ProfileProps) => {
  const modalRouter = useModalRouter();

  const renderOrganizationPosts: ListRenderItem<
    PostsData["data"] | undefined
  > = ({ item }) => (
    <View className="gap-4">
      {item?.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => modalRouter.open(`/post/${item.id}`)}
        >
          <Post
            item={item}
            isLoading={props.postsAreLoading}
            postId={item.id}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const headerComp = () => (
    <>
      <Hero
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
    </>
  );
  return (
    <InfiniteFlashList<PostsData["data"] | undefined>
      data={props.posts}
      refreshControl={
        <RefreshControl
          refreshing={props.isRefreshing}
          onRefresh={props.handleRefresh}
        />
      }
      renderItem={renderOrganizationPosts}
      ListHeaderComponentStyle={{ gap: 3 }}
      ListHeaderComponent={headerComp}
      size={props.size}
      setSize={props.setSize}
      estimatedItemSize={100}
    />
  );
};

export default Profile;
