import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import AgendaTPS from './page/agenda';
import Annonce from './page/annonce';
import Fouaille from './page/fouaille';




const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
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
      tabBarActiveTintColor:'rgb(102, 153, 255)',
      tabBarInactiveTintColor: 'black',

    })}

  >
    
    <Tab.Screen name="Agenda" component={AgendaTPS} />
    <Tab.Screen name="Annonce" component={Annonce} options={{ tabBarBadge: 1 }} />
    
    <Tab.Screen name="Fouaille" component={Fouaille} />
    </Tab.Navigator>
  );
}
//pour l'option de badge  voir avec content context
export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  }
});


