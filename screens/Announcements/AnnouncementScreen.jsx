import React, {useState} from "react";
import {ScrollScreenContainer, Topbar} from "../../components";
import {TEXT} from "../../constants";
import {RefreshControl, View} from "react-native";
import Publication from "./Publication";
import {publications} from "../../data";

const AnnouncementScreen = () => {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await new Promise((resolve) => setTimeout(resolve, 1));
        setRefreshing(false);
    };

    return (
        <ScrollScreenContainer
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>}>
            <Topbar>{TEXT.announcements.title}</Topbar>
            <View style={{padding: 15}}>
                <Publication data={publications[0]}/>
                <Publication data={publications[0]}/>
                <Publication data={publications[0]}/>
            </View>
        </ScrollScreenContainer>
    );
};

export default AnnouncementScreen;
