import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import ProfilePage from './page/profile';
import Connexion from './page/connexion';

import LoadingPage from './page/loadingpage';

import BottomTab from './page/bottomtab';

import {primaryColor} from './style';





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
        <Stack.Navigator initialRouteName={routeName}   screenOptions={{ contentStyle: { backgroundColor: primaryColor }}}>
          <Stack.Screen name="Tabs" component={BottomTab} options={{ headerShown: false , animation: 'fade' }}/>
          <Stack.Screen name="Connexion" component={Connexion} options={{headerShown: false , animation: 'fade'  }} />
          <Stack.Screen name="ProfilePage" component={ProfilePage}  options={{ animation: 'fade' }}/>
        </Stack.Navigator>
      </NavigationContainer>
      </>
    );
  }
}

