import React,{useState} from 'react';
import { StyleSheet,Text, View, TextInput,TouchableOpacity, StatusBar } from 'react-native';



const Fouaille = () => {
    const [text, setText] = useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.text}>coucou voilà ton argent au Fouaille</Text>
            <TextInput
            style={styles.text}
            placeholder="met ton nom ici"
            onChangeText={newText => setText(newText)}
            defaultValue={'fnsdflksd'}
      />
        <Text style={{padding: 10, fontSize: 42}}>
        {text.split(' ').map((word) => word && '🍕').join(' ')}
      </Text>
        </View>
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