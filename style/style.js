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
  FouailleContainer: {
    flex: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius:50,
    marginTop:30,
    margin:20,
    height: 120,
    flexDirection:'row',
    justifyContent:'space-between'

  },
  TextinFouailleContainer: {
    fontSize:20,
    flex:1
  },
  TransacContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius:50,
    
    margin:20,
    height: 40,
    flexDirection:'row',
    justifyContent:'space-between'

  },
  appButtonContainer: {
    height: 50,
    width: 200,
    alignSelf:'center',
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }





});