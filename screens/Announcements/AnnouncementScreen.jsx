import axios from "axios";
import { Constants } from "expo-camera";
import React, { useEffect, useState } from "react";
import { RefreshControl, View } from "react-native";

import Publication from "./Publication";
import { Loader, ScrollScreenContainer, Topbar } from "../../components";
import PlusButton from "../../components/touchableicon/PlusButton";
import { API, ROUTES, TEXT } from "../../constants";
import announcements from "../../constants/text/announcements";
import { useLocalStorage } from "../../contexts/localStorageContext";
import { useFetch } from "../../hooks";
const AnnouncementScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [announcement, setAnnouncement] = useState([]);

  const { data } = useLocalStorage();

  const { res, isLoading, error } = useFetch(`${API.url}/api/post`, {
    ...API.headers,
    Authorization: `Bearer ${data.token}`,
  });
  useEffect(() => {
    if (res?.data) {
      setAnnouncement(res.data);
    }
  }, [res]);

  const handleRefresh = async () => {
    console.log("refreshing");
    setRefreshing(true);
    // a implémenter avec le fetch
    try {
      const res = await axios.get(`${API.url}/api/post`, {
        headers: {
          ...API.headers,
          Authorization: `Bearer ${data.token}`,
        },
      });
      setAnnouncement(res.data.data);
    } catch (e) {
      console.log(e);
    }
    setRefreshing(false);
  };

  return (
    <>
      <ScrollScreenContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
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
      <PlusButton url={ROUTES.announcements} />
    </>
  );
};

export default AnnouncementScreen;
