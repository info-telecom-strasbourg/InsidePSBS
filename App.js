import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
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


import style,{primaryColor} from './style';


//définit la barre en haut de l'écran (en dessous de la status bar)
function HeadBar() {

  const navigation = useNavigation();
  return (
    <View style={{alignItems:'stretch',flexDirection:'row',height:50,backgroundColor:primaryColor,borderBottomColor:'white' }}>
    <Image 
      style={{alignSelf:'center', resizeMode:"contain", width: 55, height: 55,marginStart:30}}
      source={require('./assets/iconInsidePSBS.png')}
    />
    {/* <Text style={{alignSelf:'flex-end',color:'white',fontSize:17,marginStart:5}}>InsidePSBS</Text> */}
    <View style={{flex:1}}></View>
    <TouchableOpacity onPress={() => navigation.navigate("ProfilePage")} style={{alignSelf:'center',alignItems: 'flex-end' }}>
    <Image 
      style={{alignSelf:'center', width: 40, height: 40,marginEnd:20}}
      source={require('./assets/settings.png')}
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
            options={{}}
             />
    </Tab.Navigator>
    </>

  );
}
//pour l'option de badge  voir avec content context
export default function App() {
  const [Loading, setLoading] = React.useState(true);
  const [Logged, setLogged] = React.useState(false);
  //faut-il mettre un useEffect ici?
  useEffect(() => {
  AsyncStorage.getItem('logged').then((value) => {
    setLogged(value);
    // setLoading(false);
  })
}, []);
  
  if (Loading==true){
    return (
      <LoadingPage/>
    )
  }
  else{
    Stack=createStackNavigator();
    if (Logged=="true"){
      routeName="Tabs";}
    else{
      routeName="Connexion";}
    return (
      <>
      <StatusBar barStyle="light-content" backgroundColor={primaryColor} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={routeName}>
          <Stack.Screen name="Tabs" component={MyTabs} options={{ headerShown: false }}/>
          <Stack.Screen name="Connexion" component={Connexion} options={{headerShown: false  }} />
          <Stack.Screen name="ProfilePage" component={ProfilePage}/>
        </Stack.Navigator>
      </NavigationContainer>
      </>
    );
}



}

