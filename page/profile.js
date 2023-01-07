import React from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { styles, primaryColor } from '../style';

import {version} from '../package.json';


const ProfilePage = ({ }) => {
  const [Nom, setNom] = React.useState('');
  const [Prenom, setPrenom] = React.useState('');

  const navigation = useNavigation();
  AsyncStorage.getItem('nom').then((value) => setNom(value));
  AsyncStorage.getItem('prenom').then((value) => setPrenom(value));

  return (

    <View style={{ flexDirection: "column", backgroundColor: primaryColor, flex: 1, justifyContent: 'space-between', alignContent: 'center' }}>
      <View style={{ flex: 1 }}>
        <Text style={{ marginTop: 30, color: 'white', alignSelf: 'center', lineHeight: 30, fontSize: 20 }}>Nom: {Nom} {"\n"}Prénom: {Prenom}</Text>
      </View>
      <View style={{ flex: 3 }}>
        <TouchableOpacity style={styles.appButtonContainer} onPress={() => AsyncStorage.setItem('logged', 'false').then(navigation.navigate('Connexion'))}>
          <Text style={styles.appButtonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 20, textAlign: 'center', flex: 1, color: 'white', alignSelf: 'center', justifyContent: 'flex-end', flexDirection: 'column' }}>Application développée par {'\n'}Gatien Chenu et Félix Lusseau.{'\n'} Graphismes réalisés par {'\n'}Jeanne König-Wacheux</Text>
      <Text style={{ flex: 1, color: 'white', alignSelf: 'center', justifyContent: 'flex-end', flexDirection: 'column' }}>Version {version}</Text>

      <View style={{ backgroundColor: primaryColor, flex: 1 }}></View>
    </View>

  );
};

export default ProfilePage;
