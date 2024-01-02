import { PlusButton } from "components/Button";
import { ScrollScreenContainer } from "components/Containers";
import { Loader } from "components/Loader";
import Text from "components/Text";
import { Topbar } from "components/Topbar";
import ROUTES from "constants/routes";
import TEXT from "constants/text";
import { useRouter } from "expo-router";
import { RefreshControl, View } from "react-native";
import useSwr from "swr";
import { env } from "utils/env";

import Publication from "./Publication";

const fetcher = async (url: string, args = {}) => {
  const response = await fetch(url, args);
  const data = await response.json();
  return data;
};

const AnnouncementScreen = () => {
  const router = useRouter();
  const {
    data: announcement,
    error,
    isLoading,
    mutate,
  } = useSwr(
    `${env.API_URL}/api/post`,

    (url) => fetcher(url, {}),
  );

  const refetchData = () => {
    mutate(`${env.API_URL}/api/post`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  return (
    <>
      <ScrollScreenContainer
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetchData} />
        }>
        <Topbar>{TEXT.announcements.title}</Topbar>
        {isLoading ? (
          <Loader />
        ) : (
          <View style={{ padding: 15 }}>
            {announcement?.map((data, index) => (
              <Publication key={index} data={data} />
            ))}
          </View>
        )}
      </ScrollScreenContainer>
      {/* TODO: Add the page to create a new announcement */}
      <PlusButton onPress={() => router.push(ROUTES.announcements)} />
    </>
  );
};

export default AnnouncementScreen;
