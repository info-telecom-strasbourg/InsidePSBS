import React from 'react';
import 'react-native-gesture-handler';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Ionicons from 'react-native-vector-icons/Ionicons';

import AgendaTPS from 'pages/agenda';
import Annonce from 'pages/annonce';
import Fouaille from 'pages/fouaille';
import TestPage from 'pages/test';

import HeadBar from 'components/headBar';

import {primaryColor} from 'style/style';


const Tab = createBottomTabNavigator();
/**
 * affiche la barre de navigation en bas de l'écran
 *  
 */
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
      <Tab.Screen name="Test" component={TestPage}  options={{ animation: 'fade' }}/>

      </Tab.Navigator>
      </>
  
    );
  }