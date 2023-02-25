import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfilePage from './pages/profile';
import Connexion from './pages/connexion';
import LoadingPage from './pages/loadingpage';
import BottomTab from './pages/bottomtab';

import {primaryColor} from './style/style';
import { useNotifications } from './utils/UseNotifications';

import * as Notifications from 'expo-notifications';



/**
 * Main App component
 */
export default function App() {

  const [Loading, setLoading] = React.useState(true);
  const [Logged, setLogged] = React.useState(false);
  useEffect(() => {
    AsyncStorage.getItem('logged').then((value) => {
    setLogged(value);
    setLoading(false);
  })
}, []);

  const {registerForPushNotificationsAsync, handleNotificationResponse} = useNotifications() ;
  useEffect(() => {
    var tocken;
    tocken=registerForPushNotificationsAsync();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
    const responseListener = Notifications.addNotificationResponseReceivedListener( handleNotificationResponse );
    return () => {
      if (responseListener) {
        Notifications.removeNotificationSubscription(responseListener);
      };
    };
  }, []);
  
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

