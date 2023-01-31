
import React from 'react';
import 'react-native-gesture-handler';
import {Text,Image, View, TouchableOpacity } from 'react-native';
import {useNavigation } from '@react-navigation/native';
import style,{primaryColor,lightprimaryColor,headbarparams} from '../style';


/**
définit la barre en haut de l'écran ( juste en dessous de la status bar)
cette barre contient le logo de l'application en haut à gauche et un bouton pour accéder au paramètres
 */
export default function HeadBar() {



    const navigation = useNavigation();
    return (
      <View style={{alignItems:'stretch',flexDirection:'row',height:headbarparams.HeadBarHeight,backgroundColor:primaryColor,borderBottomWidth:1, borderBottomColor:lightprimaryColor }}>
      <Image 
        style={{alignSelf:'flex-end', resizeMode:"contain", width: headbarparams.LIconSize, height: headbarparams.LIconSize, marginStart: headbarparams.LIconMarginLeft}}
        source={require('../assets/iconInsidePSBS.png')}
      />
      {/* <Text style={{alignSelf:'flex-end',color:'white',fontSize:17,marginStart:5}}>InsidePSBS</Text> */}
      <View style={{flex:1}}></View>
      <TouchableOpacity onPress={() => navigation.navigate("ProfilePage")} style={{alignSelf:'center',alignItems: 'flex-end' }}>
      <Image 
        style={{alignSelf:'center', width: headbarparams.RIconSize, height: headbarparams.RIconSize ,marginEnd:headbarparams.RIconMarginRight}}
        source={require('../assets/settings.png')}
      />
      </TouchableOpacity>  
      </View>
      
    );
  }
  