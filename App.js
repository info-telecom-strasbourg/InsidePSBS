import React from 'react';
import 'react-native-gesture-handler';
import {Text,Image, StatusBar, StyleSheet, View, TouchableOpacity, } from 'react-native';
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


//définit la barre en haut de l'écran (en dessous de la status bar)
function HeadBar() {

  const navigation = useNavigation();
  return (
    <View style={{alignItems:'stretch',flexDirection:'row',height:50,backgroundColor:'white' }}>
    <Text style={{alignSelf:'center',marginStart:20}}>InsidePSBS</Text>
    <View style={{flex:1}}></View>
    <TouchableOpacity onPress={() => navigation.navigate("ProfilePage")} style={{alignSelf:'center',alignItems: 'flex-end' }}>
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
    <>
    <HeadBar/>
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
    <Tab.Screen name="Annonce" component={Annonce} options={{   Badge: 1, }} />    
    <Tab.Screen name="Fouaille" component={Fouaille}
            options={{  }}
             />
    </Tab.Navigator>
    </>

  );
}
//pour l'option de badge  voir avec content context
export default function App() {
  const [Loading, setLoading] = React.useState(true);
  const [Logged, setLogged] = React.useState(false);
  AsyncStorage.getItem('logged').then((value) => {
    console.log("value",value);
    setLogged(value);
    setLoading(false);
  })

  if (Loading==true){
    console.log("loading true");
    return (
      <>
      <StatusBar barStyle="light-content" backgroundColor='white' />
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>Loading...</Text>
      </View>
      </>
    )
  }
  else{
    Stack=createStackNavigator();
    if (Logged=="true"){
      routeName="Tabs";}
    else{
      routeName="Connexion";}
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={routeName}>
          <Stack.Screen name="Tabs" component={MyTabs} options={{ headerShown: false }}/>
          <Stack.Screen name="Connexion" component={Connexion} />
          <Stack.Screen name="ProfilePage" component={ProfilePage}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  }
});


