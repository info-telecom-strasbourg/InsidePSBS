import { View, Image, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import {Avatar, } from 'react-native-paper';

/**
 * fonction qui renvoie l'image du logo de l'association ou du club
 * @param {string} asso_club : nom de l'asso/club à mettre dans le path de app.its-tps.fr/logo pour obtenir le logo en 256*256 px 
 * @returns 
 */
export function DisplayLogo(props) {
    
    // Image=<Image style={styles.Imagecentrale} source={{ uri: 'https://i.ibb.co/QnbX89q/triste.png' }} resizeMode='cover'         />
    path=BackendUrl+'logo/'+props.asso_club+'.png';

    return (
        <Avatar.Image  style={{backgroundColor:'transparent'}} size={50} source={{uri : BackendUrl+'logo/'+props.asso_club+'.png' }} />
    );
}  

// Creating styles
const styles = StyleSheet.create({
    contStyle:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    }
});

