import React, {Component, useState, useEffect } from 'react';
import {TouchableHighlight,Linking,Text,SafeAreaView, StyleSheet, View,FlatList, TextInput,TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import {Card, Button,ActivityIndicator,Avatar , Title ,Paragraph } from 'react-native-paper';
import {Article} from '../components/annonce/article.js';
import {styles,primaryColor} from '../style/style.js';
import LoadingPage from './loadingpage.js';

/**
 * fonction appelé une fois les annonces chargées.
 * elle les affichent. 
 * @param {*} props props de navigation 
 * 
 */
const HomeScreen = (props) => {
    return (
      <>
        <SafeAreaView style={{backgroundColor:primaryColor,paddingTop:20}}>
          <FlatList 
            data={props.articles}
            renderItem={({ item }) => <Article article={item} />}
            keyExtractor={(item) => item.id}/> 
        </SafeAreaView>
        <View style={{ backgroundColor:primaryColor,height:50, flex:1}}/>
      </>
    );
  };

/**
 * fonction qui charge les annonces depuis le serveur
 * affiche la page de chargement en attendant le chargement
 * sinon affiche les annonces .
 *  
 */
const Annonce = () => {
    const URL = 'https://app.its-tps.fr/articles-hidden-json';
    const [articles, setArticles] = useState([]);
    const [loading, setLoading ] = useState(true);
    useEffect(()=>{
      fetch(URL)
      .then((response) => response.json())
      .then( responseJson  => {
        setArticles(responseJson);
        setLoading(false);
      })
      .catch( error => {
        console.log("erreur");
        console.error(error);
      });
  
    } , []);
    if (loading) {
      return <LoadingPage/>;
    }
    else{
      return <HomeScreen articles = { articles }/>;
    }
  };


  export default Annonce;

