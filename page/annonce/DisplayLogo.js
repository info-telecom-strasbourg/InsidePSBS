import { View, Image, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import {Card, Button,ActivityIndicator,Avatar , Title ,Paragraph } from 'react-native-paper';

function DisplayLogo(asso_club) {
    return (
        <Avatar.Text label={asso_club} />
        
        //  <Image source={props.image} style = {{height: 100,width: 100, flex:1, flexWrap:'wrap'}}/>
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

// Exporting DisplayLogo Component
export default DisplayLogo;