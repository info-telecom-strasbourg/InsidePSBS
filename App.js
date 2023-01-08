import React, { useEffect } from 'react';
import {Text,Image, StatusBar, StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AgendaTPS from './page/agenda';
import Annonce from './page/annonce';
import Fouaille from './page/fouaille';
import ProfilePage from './page/profile';
import Connexion from './page/connexion';

import LoadingPage from './page/loadingpage';

import HeadBar from './page/headbar';
import BottomTab from './page/bottomtab';

import style,{primaryColor} from './style';





//pour l'option de badge  voir avec content context
export default function App() {
  const [Loading, setLoading] = React.useState(true);
  const [Logged, setLogged] = React.useState(false);
  useEffect(() => {
    AsyncStorage.getItem('logged').then((value) => {
    setLogged(value);
    setLoading(false);
  })
}, []);
async function clearData(){
  await AsyncStorage.clear();
}
  
  if (Loading==true){
    return (   <LoadingPage/>  )
  }
  else{
    const Stack=createStackNavigator();
    Logged ? routeName="Tabs" : routeName="Connexion";
    return (
      <>
      <StatusBar barStyle="light-content" backgroundColor={primaryColor} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={routeName}   screenOptions={{ contentStyle: { backgroundColor: primaryColor }
    }}>
          <Stack.Screen name="Tabs" component={BottomTab} options={{ headerShown: false , animation: 'fade' }}/>
          <Stack.Screen name="Connexion" component={Connexion} options={{headerShown: false , animation: 'fade'  }} />
          <Stack.Screen name="ProfilePage" component={ProfilePage}  options={{ animation: 'fade' }}/>
        </Stack.Navigator>
      </NavigationContainer>
      </>
    );
  }
}

