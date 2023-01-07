import React from 'react';
import 'react-native-gesture-handler';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Ionicons from 'react-native-vector-icons/Ionicons';

import AgendaTPS from '../page/agenda';
import Annonce from '../page/annonce';
import Fouaille from '../page/fouaille';
import ProfilePage from '../page/profile';
import Connexion from '../page/connexion';

import LoadingPage from '../page/loadingpage';

import HeadBar from '../page/headbar';

import style,{primaryColor} from '../style';


const Tab = createBottomTabNavigator();

export default function BottomTab() {
    return (
      <>
      <HeadBar/>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarStyle: {
            backgroundColor: primaryColor,
          },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
  
          if (route.name === 'Agenda') {
            iconName = focused
              ? 'calendar'
              : 'calendar';
          } else if (route.name === 'Annonce') {
            iconName="albums";
          }else if (route.name === 'Fouaille') {
            iconName="card";        }
  
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor:'white',
        tabBarInactiveTintColor: 'lightslategrey',
        headerShown: false  ,
        contentStyle: { backgroundColor: primaryColor }  ,
        unmountOnBlur: true
      })}
       
    >
      
      <Tab.Screen name="Agenda" component={AgendaTPS}
      options={{animation: 'fade',}}
       />
      <Tab.Screen name="Annonce" component={Annonce} options={{animation: 'fade'}} />    
      <Tab.Screen name="Fouaille" component={Fouaille}
              options={{animation: 'fade'}}
               />
      </Tab.Navigator>
      </>
  
    );
  }