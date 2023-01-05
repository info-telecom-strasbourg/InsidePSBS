import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const ProfilePage = ({  }) => {
  [Username, setUsername] = React.useState('');
  const navigation = useNavigation();
  AsyncStorage.getItem('username').then((value) => setUsername(value));
  return (
    <View>
      <Image
        source={{ uri: 'https://picsum.photos/200' }}
        style={{ width: 200, height: 200 }}
      />
      <Text>Username: {Username}</Text>
      <Button title="Disconnect" onPress={() => AsyncStorage.setItem('logged','false').then(navigation.navigate('Tabs'))} />
    </View>
  );
};

export default ProfilePage;
