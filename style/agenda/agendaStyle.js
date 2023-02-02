import { StyleSheet,StatusBar } from 'react-native';
import { primaryColor } from 'style/style.js';
export const agendastyle = StyleSheet.create({
    eventCard: {
      marginLeft: 5,
      marginRight: 10,
      marginTop: 5,
      justifyContent: 'center',
      marginBottom: 5,
      borderWidth: 1,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flex: 0.1,
    },
    emptydata: {
        flex: 1,
        backgroundColor: primaryColor,
        marginTop: 50
    
      },
    container: {
      flex: 1,
      backgroundColor: primaryColor
  
    },
  
    textcentrale: {
      textAlign: 'center',
      color: 'white',
      fontSize: 15,
  
    },
    heure: {
      textAlign: 'right',
      marginRight: 0,
      color: 'gray',
      fontSize: 12,
    },
    Imagecentrale: {
      width: 200,
      height: 200,
      alignSelf: 'center',
    }
  });
    