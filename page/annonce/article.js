import React, {Component, useState, useEffect } from 'react';
import {TouchableHighlight,Image,Linking,Text, StyleSheet, View,FlatList, TextInput,TouchableOpacity, StatusBar } from 'react-native';
import {Card} from 'react-native-paper';
import moment from 'moment';
import HtmlText from 'react-native-html-to-text';
import { DisplayLogo } from './displaylogo.js';
import { ProcessImagePath } from './processimagepath.js';

export class Article extends Component {
    handleClick = () => {
      this.toggle=!this.toggle;
      this.forceUpdate();
      }
  
    render() {

      const {
        titre,
        contenu,
        created_at,
        asso_club,
        fichiers
      } = this.props.article;


      //définition du temps depuis lequel la publication a été postée
      const time = moment(created_at || moment.now()).fromNow();
      const Time = props => <Text style={{fontSize:10}}>{time}</Text>

      //défini le logo visible à gauche de la "card"
      const LeftContent =()=> DisplayLogo(asso_club);
      const Images=ProcessImagePath(fichiers);

      if (Images!= undefined){
        console.log(Images[0]);
        const url="app.its-tps.fr"+Images[0];
      };

      if (this.toggle){
        return (
          <Card style={styles.container} onPress={()=>this.handleClick()}>
          <Card.Title style={styles.titleContainer} titleStyle={styles.title} leftStyle={styles.avatar} rightStyle={styles.timestamp}
          title={titre} left={LeftContent} right={Time} titleNumberOfLines={3}>
          </Card.Title> 
          <Card.Content>
            <HtmlText style={{lineHeight:20, marginBottom:-10,textAlign:'justify'}} html={contenu}></HtmlText>
          </Card.Content>  
        </Card>  
        
        
        );
      }
      else {
        return (
          <Card style={styles.container} onPress={()=>this.handleClick()}>
          <Card.Title style={styles.titleContainer} titleStyle={styles.title} leftStyle={styles.avatar} rightStyle={styles.timestamp}
          title={titre} left={LeftContent} right={Time} titleNumberOfLines={2}>
          </Card.Title>
        </Card>
  
        
        );
      }

    }
  }

  const boxShadow = Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.4,
      shadowRadius: 4,
    },
    android: {elevation: 6},
  });
  








  const styles= StyleSheet.create({
    container: {
      flex:1,
      marginBottom: 10,
      backgroundColor: '#eee',
      borderRadius: 24,
      marginHorizontal: 10,
      
      ...boxShadow,
    },
    imageContainer: {flex: 1},
    image: {
      flex: 1,
      borderRadius: 24,
      height: 300,
    },
    titleContainer: {
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
    title:{
      top:8,
      fontSize: 13,
      fontWeight: '600',
      color:'rgb(102, 153, 255)',
      
    },
    text: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 24,
      color: '#fff',
      paddingBottom: 24,
    },
    timestamp: {
      // position: 'bottom',
      color: '#eee',
      fontSize: 12,
      fontWeight: '300',
      top:8,
      right: 10,
    },
    avatar: {
      top:8,

    },
  });

  