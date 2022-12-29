import React from 'react';
import { View, Text, Image, Button } from 'react-native';

const ProfilePage = ({ navigation }) => {
  return (
    <View>
      <Image
        source={{ uri: 'https://picsum.photos/200' }}
        style={{ width: 200, height: 200 }}
      />
      <Text>Username: JohnDoe</Text>
      {/* <Button title="Disconnect" onPress={() => navigation.navigate('Home')} /> */}
    </View>
  );
};

export default ProfilePage;
