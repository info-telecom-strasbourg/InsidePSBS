import React, {useState, useEffect } from 'react';
import { StyleSheet,Text, View, TextInput,RefreshControl,TouchableOpacity, StatusBar, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {LoadingPage} from './loadingpage';
import moment from 'moment';
import sha256 from 'js-sha256';


import {styles,primaryColor,lightprimaryColor,orangeColor,headbarparams} from '../style';

import fromNow from './globalFunc/fromNow';



API_KEY= "(n7m4w'3k+#k'8BA[#&z0H'A+d.4H";

export async function getLastTransac(nom,prenom,hash) {

  try {
    let response = await fetch('https://app.its-tps.fr/api?nom='+nom+'&prenom='+prenom+'&key='+hash);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("error",error);
    console.error(error);
  }
}


const Fouaille = () => {

    const [Logged, setLogged] = React.useState(false);

    const [ShouldRefresh, setShouldRefresh] = React.useState(true);

    const [Prenom, setPrenom] = React.useState('');
    const [Nom, setNom] = React.useState('');
    useEffect(()=>{
    AsyncStorage.getItem('nom').then((value) => setNom(value));  
    AsyncStorage.getItem('prenom').then((value) => setPrenom(value)); 
    },[]);
    // définition des dernières commandes de l'utilisateur
    const [UserOrder, setUserOrder] = useState(null);

    const[Note,SetNote]=useState(0);

    useEffect(()=>{
      if (Nom!='' && Prenom!=''){
        setLogged(true);
      } 
    },[Nom,Prenom]);

    // définition du solde de l'utilisateur
    useEffect(()=>{


      if (ShouldRefresh==true && Logged==true) {
      
        // définition du nom et prénom de l'utilisateur
      
        const hash = sha256(  API_KEY + Nom + Prenom);
        getLastTransac(Nom,Prenom,hash).then((data) => {console.log('data',data); setUserOrder(data);setShouldRefresh(false);});
      }    
    } , [ShouldRefresh,Logged]);    

    useEffect(()=>{
    if (UserOrder!=null){
      if (UserOrder[0]!=undefined){
      SetNote(UserOrder[0].new_note);}
      else{
        SetNote("Erreur: envoie un message à gatien");
      }
    }
    },[UserOrder]);
    

    return (
      <>
    <ScrollView         
    refreshControl={
        <RefreshControl
          refreshing={ShouldRefresh}
          onRefresh={()=>{setShouldRefresh(true)}}
           />
                    }
    style={{maxHeight:170, backgroundColor:primaryColor}}
    >
        <View style={styles.background}>
            <View style={styles.FouailleContainer}>
                <Text style={{fontSize:20, flex:2,marginLeft:30,lineHeight:30}} >
                  Carte fouaille : {"\n"}
                  {Note+"€"}
                </Text>
                <Image source={require('../assets/fouaille/bag.png')} style={{resizeMode:'contain',height:70, flex:1,marginRight:20}} />
            </View>
        </View>


    </ScrollView>

        <FlatList
        style={{flex:1,backgroundColor:primaryColor}}
        data={UserOrder}
        renderItem={({ item }) => Transac(item)} 
        keyExtractor={(item) => item.date_histo}/> 
    </>
    );
}


function Transac( transac ) {
  const time = fromNow(transac.date_histo);
  var color
  transac.delta.includes('-') ? color='red' : color='green';
  return (
    <View style={styles.TransacContainer}>
      <Text style={{color:color,marginLeft:10,alignSelf:'center',fontSize:13}}>{transac.delta}</Text>
      <Text style={{marginRight:10,alignSelf:'center',fontSize:13}}>{time}</Text>
    </View>
  );
}


export default Fouaille;