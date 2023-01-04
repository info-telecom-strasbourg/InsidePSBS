import { View, Image, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import {Avatar, } from 'react-native-paper';

export function DisplayLogo(asso_club) {
    
    // Image=<Image style={styles.Imagecentrale} source={{ uri: 'https://i.ibb.co/QnbX89q/triste.png' }} resizeMode='cover'         />
    path='https://app.its-tps.fr/logo/'+asso_club+'.png'
    return (
        // <Avatar.Text label={asso_club} />
        <Avatar.Image  style={{backgroundColor:'transparent'}} size={50} source={{uri : 'https://app.its-tps.fr/logo/'+asso_club+'.png' }} />
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

