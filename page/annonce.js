import React, {Component, useState, useEffect } from 'react';
import {TouchableHighlight,Linking,Text, StyleSheet, View,FlatList, TextInput,TouchableOpacity, StatusBar } from 'react-native';
import {Card, Button,ActivityIndicator,Avatar , Title ,Paragraph } from 'react-native-paper';
import { WebView } from 'react-native-webview';import moment from 'moment';
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';




const HomeScreen = (props) => {
    return (
      <View style={styles}>
      <FlatList 
        data={props.articles}
        renderItem={({ item }) => <Article article={item} />}
        keyExtractor={(item) => item.id}/>      
      </View>
    );
  }


  
  
  // exemple de data
  // const defaultJSONData = {
  // 	source: {
  // 		id: 'fox-news',
  // 		name: 'Fox News'
  // 	},
  // 	author: null,
  // 	title:
  // 		"Jeff Bezos' investigator believes 'government entity' may have obtained texts: WashPo reporter - Fox News",
  // 	description:
  // 		'A security consultant for Amazon founder and Washington Post owner Jeff Bezos believes the CEO’s lurid intimate photos may have been acquired by a "government entity," a reporter at the paper said Thursday.',
  // 	url:
  // 		'https://www.foxnews.com/tech/jeff-bezos-investigator-believes-government-entity-obtained-texts-wapo-reporter',
  // 	urlToImage:
  // 		'https://media2.foxnews.com/BrightCove/694940094001/2019/02/08/694940094001_5999770984001_5999767526001-vs.jpg',
  // 	publishedAt: '2019-02-08T07:52:57Z',
  // 	content:
  // 		'A security consultant for Amazon founder and Washington Post owner Jeff Bezos believes the CEO’s lurid intimate photos may have been acquired by a "government entity," a reporter at the paper said Thursday. Manuel Roig-Franzia, the reporter, told MSNBC that w… [+1410 chars]'
  // };
  
  class Article extends Component {
    handleClick = () => {
      console.log('click');
      }
  
    render() {
      const {
        titre,
        contenu,
        created_at,
        asso_club,
        fichiers
      } = this.props.article;
  
      const time = moment(created_at || moment.now()).fromNow();

      const LeftContent = props => <Avatar.Text {...props} label={asso_club} />
      const Time = props => <Text style={{fontSize:10}}>{time}</Text> 


      return (
        <Card style={styles.container} onPress={()=>this.handleClick()}>
        <Card.Title style={style.titleContainer} titleStyle={styles.title}
        title={titre} left={LeftContent} right={Time} titleNumberOfLines={3}>
        </Card.Title>

        <Card.Content>
        <Text>
        <WebView
          source={{html:'text ici'}}
        />
        
        
        </Text>
        </Card.Content>  

      {/* <Card.Actions>
        <Button>Action 1</Button>
        <Button>Action 2</Button>
      </Card.Actions> */}
      </Card>

      
      );
    }
  }
const Annonce = () => {
    const URL = 'https://app.its-tps.fr/articles-hidden-json';
    const [articles, setArticles] = useState([]);
    const [loading, setLoading ] = useState(true);
    useEffect(()=>{
      fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {

        return responseJson;
      })
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
      marginBottom: 18,
      backgroundColor: '#eee',
      borderRadius: 24,
      marginHorizontal: 16,
      ...boxShadow,
    },
    imageContainer: {flex: 1},
    image: {
      flex: 1,
      borderRadius: 24,
      height: 300,
    },
    titleContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      height: 5,
      paddingLeft: 16,
      paddingRight: 10,
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
    title:{
      fontSize: 15,
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
      position: 'absolute',
      color: '#eee',
      fontSize: 12,
      fontWeight: '300',
      right: 16,
      bottom: 8,
    },
  });
export default Annonce;
  