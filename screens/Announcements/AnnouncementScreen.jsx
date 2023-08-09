import React, { useState } from "react";
import { Loader, ScrollScreenContainer, Topbar } from "../../components";
import { API, TEXT } from "../../constants";
import { RefreshControl, View } from "react-native";
import Publication from "./Publication";
import PlusButton from "../../components/touchableicon/PlusButton";
import { useFetch } from "../../hooks";
import { useLocalStorage } from "../../contexts/localStorageContext";

const AnnouncementScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1));
    setRefreshing(false);
  };

  const { data } = useLocalStorage();

  const { res, isLoading, error } = useFetch(`${API.url}/api/post`, {
    ...API.headers,
    Authorization: `Bearer ${data.token}`,
  });

  return (
    <>
      <ScrollScreenContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <Topbar>{TEXT.announcements.title}</Topbar>
        {isLoading ? (
          <Loader />
        ) : (
          <View style={{ padding: 15 }}>
            {res?.data.map((data, index) => (
              <Publication key={index} data={data} />
            ))}
          </View>
        )}
      </ScrollScreenContainer>
      {/* TODO: Add the page to create a new announcement 
       <PlusButton /> */}
    </>
  );
};

export default AnnouncementScreen;
