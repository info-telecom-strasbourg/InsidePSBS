import { Text, View, ActivityIndicator} from 'react-native';
import React from 'react';

export function LoadingAgenda () {

    return (
        //loading page
        <View>
            <ActivityIndicator size="large" />
            <Text>Loading...</Text>
        </View>
    );

}
