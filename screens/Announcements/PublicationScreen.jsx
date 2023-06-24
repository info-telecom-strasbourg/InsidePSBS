import React, {useState} from 'react';
import {BackButtonTopbar, ScrollScreenContainer} from "../../components";
import {Image, RefreshControl, Text, TouchableOpacity, View} from "react-native";
import {useSearchParams} from "expo-router";
import {publications} from "../../data";
import styles from "./publication.style";
import {ROUTES} from "../../constants";
import {text_styles} from "../../styles";
import {getStringDate} from "../../utils";
import {HeartBorderIcon, MessagesIcon} from "../../assets/icons";
import {useTheme} from "../../contexts";

const PublicationScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const {id} = useSearchParams();

    const handleRefresh = async () => {
        setRefreshing(true);
        await new Promise((resolve) => setTimeout(resolve, 1));
        setRefreshing(false);
    };

    const data = publications[id - 1];
    const {theme} = useTheme()

    return (
        <ScrollScreenContainer
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>}>
            <BackButtonTopbar>{data.title}</BackButtonTopbar>

            <View style={{padding: 16}}>
                <TouchableOpacity style={{flexDirection: "row", alignItems: "center", marginBottom: 30}}>
                    <Image source={{uri: data.author.logo_url}} style={styles.image()}/>
                    <View style={{width: 10}}/>
                    <View>
                        <Text style={text_styles.title3(theme)}>{data.author.full_name}</Text>
                        <Text style={text_styles.body3({text: theme.text_secondary})}>{getStringDate(data.date)}</Text>
                    </View>
                </TouchableOpacity>

                <Text style={text_styles.title2(theme)}>{data.title}</Text>
                <View style={{height: 5}}/>
                <Text style={text_styles.body3(theme)}>{data.body}</Text>
                <View style={{justifyContent: "space-between", flexDirection: "row", marginTop: 20}}>
                    <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}}>
                        <HeartBorderIcon color={theme.text}/>
                        <View style={{width: 7}}/>
                        <Text style={text_styles.body2(theme)}>{data.reactions.length} likes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}}>
                        <MessagesIcon color={theme.text}/>
                        <View style={{width: 7}}/>
                        <Text style={text_styles.body2(theme)}>Commenter</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height: 20}}/>
                <TouchableOpacity onPress={() => router.push(`${ROUTES.publication}/${data.id}`)}>
                    <Text style={text_styles.body2({text: theme.text_secondary})}>Aucun commentaire</Text>
                </TouchableOpacity>
            </View>
        </ScrollScreenContainer>
    );
};

export default PublicationScreen;