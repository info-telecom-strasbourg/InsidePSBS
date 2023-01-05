import React, {Component, useState, useEffect } from 'react';
import {TouchableHighlight,Linking,Text, StyleSheet, View,FlatList, TextInput,TouchableOpacity, StatusBar } from 'react-native';
import {Card, Button,ActivityIndicator,Avatar , Title ,Paragraph } from 'react-native-paper';
import {Article} from './annonce/article.js';



const HomeScreen = (props) => {
    return (
      <View >
      <FlatList 
        data={props.articles}
        renderItem={({ item }) => <Article article={item} />}
        keyExtractor={(item) => item.id}/>      
      </View>
    );
  }


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
  
    if (loading){
        return (
            <View>
            <ActivityIndicator animating={true} color={'rgb(102, 153, 255)'} />
            </View>);
      } else {
        return <HomeScreen articles = { articles }/>
    }
  };


  export default Annonce;

