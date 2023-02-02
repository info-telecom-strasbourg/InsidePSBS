import React from 'react';
import { StatusBar,View,ActivityIndicator , Text, Image, Button } from 'react-native';
import {styles,primaryColor} from '../../style/style.js';

/**
 * page de chargement de l'agenda   (voué à disparaitre quand agenda sera sauvegardé en local) ( sauf au premier lancement de l'application)
 * @returns élément graphique: page de chargement avec cube qui tourne
 */
export function LoadingAgenda () {

    return (
        //loading page
        <>
        <View style={[styles.background,{ flex: 1, alignItems: 'center', justifyContent: 'center'}]}>
        <Image source={require('../../assets/Logo_sans_fond.png')} style={{resizeMode:'contain',height:200}} />

        {/* <Lottie source={require("../../assets/alt-loading.json")} autoPlay loop /> */}
        </View>
        </>
    );

}
