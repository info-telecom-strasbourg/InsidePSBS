import React from 'react';
import { StatusBar,View,ActivityIndicator , Text, Image, Button } from 'react-native';
import Lottie from 'lottie-react-native';
import {styles,primaryColor} from '../../style';

export function LoadingAgenda () {

    return (
        //loading page
        <>
        <View style={[styles.background,{ flex: 1, alignItems: 'center', justifyContent: 'center'}]}>
        <Lottie source={require("../../assets/alt-loading.json")} autoPlay loop />
        </View>
        </>
    );

}
