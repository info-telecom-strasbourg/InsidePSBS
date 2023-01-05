import React, {useState, useEffect } from 'react';
import { StyleSheet,Text, View, TextInput,RefreshControl,TouchableOpacity, StatusBar, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';


const Fouaille = () => {
    const [refreshing, setRefreshing] = React.useState(false);

    [Username, setUsername] = React.useState('');
    AsyncStorage.getItem('username').then((value) => setUsername(value));  
    
    // définition des dernières commandes de l'utilisateur
    const [UserOrder, setUserOrder] = useState([]);
    const [Loading, setLoading ] = useState(true);
    useEffect(()=>{
      fetch('https://app.its-tps.fr/app-fouaille')
      .then(
        (response) => {
            console.log("response",response);
            response.json();})
      .then((responseJson) => {
        console.log(responseJson);
             })
      .then( responseJson  => {
        setUserOrder(responseJson);
        setLoading(false);
      })
      .catch( error => {
        console.log("erreur");
        console.error(error);
      });
}, []);


    return (
    <ScrollView         
    refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={console.log('refreshing')} />
                    }>
        <View style={styles.container}>
            <Text style={styles.text}>bonjour {Username}, voici ton solde :</Text>
            <Button style={styles.text} title="0€" />
        </View>
    </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    text: {
        textAlign:'center'
    }
});
export default Fouaille;