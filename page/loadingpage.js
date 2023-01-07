import React from 'react';
import { StatusBar,View,ActivityIndicator , Text, Image, Button } from 'react-native';
import {styles,primaryColor} from '../style';

function LoadingPage(){
  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor={primaryColor} />
    <View style={[styles.background,{ flex: 1, alignItems: 'center', justifyContent: 'center'}]}>
      <Image source={require('../assets/Logo_sans_fond.png')} style={{resizeMode:'contain',height:200}} />
    {/* <Lottie source={require("../assets/loading.json")} autoPlay loop /> */}
    </View>
    </>
  );
};

export default LoadingPage;
