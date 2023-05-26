import React from 'react';
import { ScrollView, View, Text, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet,StatusBar } from 'react-native';
import {CGU_URL} from 'react-native-dotenv'


import { styles, primaryColor } from '../style/style';
import WebView from 'react-native-webview';



/**
 * fonction qui affiche la page d'acceptation des CGUs
 * @returns {View} élément graphique: page d'acceptation des CGUs
 */
const CGUPage = ({ }) => {
  const navigation = useNavigation();
  const CGU_Content= 'test';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <WebView source={{ uri: CGU_URL }} />
      </View>
      <View style={{alignContent:"center"}}>
        <TouchableOpacity><Text>Accepter</Text></TouchableOpacity>
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
