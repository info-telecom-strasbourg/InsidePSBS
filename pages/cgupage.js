import React from 'react';
import { ScrollView, View, Text, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet,StatusBar } from 'react-native';
import {CGU_URL} from 'react-native-dotenv'


import { styles, primaryColor } from '../style/style';

/**
 * fonction asynchrone qui permet d'aller chercher le texte des CGUs
 * sur le serveur puis le retourne une fois qu'il est chargé
 * @returns {string} string contenant l'ICS
 */
export async function getCGU() {

  try {
    console.log("envoie de la requête pour chargement des CGUs");
    let response = await fetch("https://lipsum.com/");
    let data = await response.text();
    console.log("réponse reçue pour chargement des CGUs");

    return data;
  } catch (error) {
    console.error(error);
  }
  return data;
}

/**
 * fonction qui affiche la page d'acceptation des CGUs
 * @returns {View} élément graphique: page d'acceptation des CGUs
 */
const CGUPage = ({ }) => {
  const navigation = useNavigation();
  const CGU_Content=await getCGU();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ backgroundColor: primaryColor }}>
            <Text style={localstyles.content}>CGU ici</Text>
            <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}></View>
            <View style={styles.appButtonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Connexion')}><Text style={localstyles.content}>Accepter</Text></TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
        </ScrollView>
        
      </View>
    </SafeAreaView>
  );
};

const localstyles=StyleSheet.create({
  content: {
    color: 'white',
  },
});

export default CGUPage;
