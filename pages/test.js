import React,{useState,useRef,useEffect} from 'react';
import { View, Text, Image, Button, TouchableOpacity, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { DisplayLogo } from '../components/annonce/displaylogo';

import { styles, primaryColor } from '../style/style';

import {version} from '../package.json';
import Example from '../components/notificationScheduler';
import { Avatar } from 'react-native-paper';

/**
 * fonction qui affiche la page de test pour tester les composants
 * @returns {View} élément graphique: page de tests
 */
const TestPage = ({ }) => {
  const [Nom, setNom] = React.useState('');
  const [Prenom, setPrenom] = React.useState('');

  const navigation = useNavigation();
  AsyncStorage.getItem('nom').then((value) => setNom(value));
  AsyncStorage.getItem('prenom').then((value) => setPrenom(value));
  var club='ITS';
  
  return (
    <View style={styles.background}>
        <View style={{flex:1, flexDirection: "column", borderColor: primaryColor , backgroundColor: primaryColor, alignContent: 'center' }}>

        <Example/>
        <Button
            title="Press to schedule a notification"
            onPress={async () => {
            // await schedulePushNotification();
            }}
        />
        <View style={{borderRadius:20 ,borderColor:'red',borderWidth:20,marginHorizontal:15 }}>
            <DisplayLogo asso_club={club} />
            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Nom: {Nom}</Text>

        </View>
        






        </View>
    </View>
  );
};
export default TestPage;
