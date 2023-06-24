import React from "react";
import {BackButtonTopbar, Loader, ScrollScreenContainer,} from "../../components";
import {TEXT} from "../../constants";
import {useFetch} from "../../hooks";
import {Text, View} from "react-native";
import {useTheme} from "../../contexts";
import OrganizationButton from "./OrganizationButton";
import {text_styles} from "../../styles";

const OrganizationsScreen = () => {
    const url = "https://fouaille.bde-tps.fr/api/organization";

    const {res, isLoading, error} = useFetch(url);
    const {theme} = useTheme();
    

    return (
        <ScrollScreenContainer>
            <BackButtonTopbar>{TEXT.organizations.title}</BackButtonTopbar>
            {isLoading ? (
                <Loader/>
            ) : (
                <View style={{paddingHorizontal: 11}}>
                    <View style={{paddingVertical: 30}}>
                        <Text style={text_styles.title3(theme)}>
                            {TEXT.organizations.associations}
                        </Text>
                        <View style={{height: 20}}/>
                        {res?.data.associations.map((association, index) => (
                            <OrganizationButton key={index} data={association}/>
                        ))}
                    </View>
                    <View style={{paddingVertical: 30}}>
                        <Text style={text_styles.title3(theme)}>
                            {TEXT.organizations.clubs}
                        </Text>
                        <View style={{height: 20}}/>
                        {res?.data.clubs.map((association, index) => (
                            <OrganizationButton key={index} data={association}/>
                        ))}
                    </View>
                </View>
            )}
        </ScrollScreenContainer>
    );
};

export default OrganizationsScreen;
