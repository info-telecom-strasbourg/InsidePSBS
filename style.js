import { StyleSheet,StatusBar } from 'react-native';


export const headbarparams = {
  HeadBarHeight: 50,
  LIconSize: 50,
  LIconMarginLeft: 30,
  RIconMarginRight: 20,
  RIconSize:30};
export const primaryColor='#081425';
export const lightprimaryColor='#182d53';
export const orangeColor='#f2973c';
export const styles= StyleSheet.create({
    annoncebackground: {
      marginTop: StatusBar.currentHeight+0,
      flex: 1,
      backgroundColor: primaryColor,
    },
    background: {
        backgroundColor: primaryColor,
    },
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20
  }
  




});