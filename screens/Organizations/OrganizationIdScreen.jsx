import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

import IconLink from "./IconLink";
import styles from "./organizationid.style";
import {
    DiscordIcon,
    EmailIcon,
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    WebIcon,
} from "../../assets/icons";
import {
  BackButtonTopbar,
  Loader,
  ScrollScreenContainer,
} from "../../components";
import { TEXT } from "../../constants";
import { useTheme } from "../../contexts";
import { useFetch } from "../../hooks";
import { text_styles } from "../../styles";
import { hideTextOverflow } from "../../utils";

const OrganizationIdScreen = () => {
    const params = useLocalSearchParams();
    const { res, isLoading, error } = useFetch(
        `https://fouaille.bde-tps.fr/api/organization/${params.id}`,
    );
    const { theme } = useTheme();

    const router = useRouter();

    const title =
    res?.data.short_name?.toUpperCase() ||
    res?.data.name ||
    TEXT.organizations.title;

    return (
        <ScrollScreenContainer>
            <BackButtonTopbar>{hideTextOverflow(title, 12)}</BackButtonTopbar>
            {isLoading ? (
                <Loader />
            ) : (
                <View style={styles.container()}>
                    <View style={styles.imageContainer()}>
                        <Image
                            style={styles.image()}
                            source={{ uri: res?.data.logo_url }}
                        />
                    </View>
                    <View style={{ height: 20 }} />
                    <Text style={text_styles.title3(theme)}>{res?.data.name}</Text>
                    <Text style={text_styles.body1({ text: theme.text_secondary })}>
                        {res?.data.short_name?.toUpperCase()}
                    </Text>
                    <View style={{ height: 20 }} />
                    {(res?.data.website_link ||
            res?.data.email ||
            res?.data.facebook_link ||
            res?.data.instagram_link ||
            res?.data.twitter_link ||
            res?.data.discord_link) && (
                        <>
                            <View style={styles.linkContainer(theme)}>
                                <IconLink
                                    link={res?.data.website_link}
                                    icon={<WebIcon color={theme.text} width={40} height={40} />}
                                    onPress={() => router.replace(res?.data.website_link)}
                                />
                                <IconLink
                                    link={res?.data.email}
                                    icon={<EmailIcon color={theme.text} width={40} height={40} />}
                                    onPress={() => {}}
                                />
                                <IconLink
                                    link={res?.data.facebook_link}
                                    icon={
                                        <FacebookIcon color={theme.text} width={40} height={40} />
                                    }
                                    onPress={() => router.replace(res?.data.facebook_link)}
                                />
                                <IconLink
                                    link={res?.data.instagram_link}
                                    icon={
                                        <InstagramIcon color={theme.text} width={40} height={40} />
                                    }
                                    onPress={() => router.replace(res?.data.instagram_link)}
                                />
                                <IconLink
                                    link={res?.data.twitter_link}
                                    icon={
                                        <TwitterIcon color={theme.text} width={40} height={40} />
                                    }
                                    onPress={() => router.replace(res?.data.twitter_link)}
                                />
                                <IconLink
                                    link={res?.data.discord_link}
                                    icon={
                                        <DiscordIcon color={theme.text} width={40} height={40} />
                                    }
                                    onPress={() => router.replace(res?.data.discord_link)}
                                />
                            </View>
                            <View style={{ height: 20 }} />
                        </>
                    )}
                    <Text style={text_styles.body1(theme)}>{res?.data.description}</Text>
                </View>
            )}
        </ScrollScreenContainer>
    );
};

export default OrganizationIdScreen;
