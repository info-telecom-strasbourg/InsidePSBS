import React from 'react';
import 'react-native-gesture-handler';
import {Text,Image, StatusBar, StyleSheet, View, TouchableOpacity} from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import AgendaTPS from './page/agenda';
import Annonce from './page/annonce';
import Fouaille from './page/fouaille';
import ProfilePage from './page/profile';

//définit la barre en haut de l'écran (en dessous de la status bar)
function HeadBar() {
  // const navigation = useNavigation();
  var testcount=0;

  function handlePress() {
    console.log('profile Pressed!');

    // navigation.navigate('ProfilePage');
  }
  return (
    <View style={{alignItems:'stretch',flexDirection:'row',height:50,backgroundColor:'white' }}>
    <Text style={{alignSelf:'center',marginStart:20}}>InsidePSBS</Text>
    <View style={{flex:1}}></View>
    <TouchableOpacity onPress={() => handlePress()} style={{alignSelf:'center',alignItems: 'flex-end' }}>
    <Image 
      style={{alignSelf:'center', width: 40, height: 40,marginEnd:20}}
      source={require('./assets/favicon.png')}
    />
    </TouchableOpacity>  
    </View>
    
  );
}


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
      headerShown: false  

    })}

  >
    
    <Tab.Screen name="Agenda" component={AgendaTPS}
    options={{  }}
     />
    <Tab.Screen name="Annonce" component={Annonce} options={{ tabBarBadge: 1, }} />    
    <Tab.Screen name="Fouaille" component={Fouaille}
            options={{  }}
             />
    {/* <Tab.Screen name="ProfilePage" component={ProfilePage} options={{ tabBarBadge: 1, header: () => headBar() }} /> */}
    </Tab.Navigator>
  );
}
//pour l'option de badge  voir avec content context
export default function App() {
  return (
    <>
    
    <HeadBar/>
    <StatusBar barStyle="light-content" backgroundColor='white' />

    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  }
});


