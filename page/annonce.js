import React, {Component, useState, useEffect } from 'react';
import {TouchableHighlight,Linking,Text,SafeAreaView, StyleSheet, View,FlatList, TextInput,TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import {Card, Button,ActivityIndicator,Avatar , Title ,Paragraph } from 'react-native-paper';
import {Article} from './annonce/article.js';
import {styles,primaryColor} from '../style.js';
import LoadingPage from './loadingpage.js';


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

