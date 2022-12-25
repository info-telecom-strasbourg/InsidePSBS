import { Agenda, Calendar, LocaleConfig } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import React from 'react';
import { Text, View,StyleSheet, Image } from 'react-native';
import { loadItems } from './processagenda';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';


export function DisplayAgenda(events,eventsNumber){

  var  today = new Date();
  today = today.toISOString().substring(0, 10);

  console.log(today);
  items=loadItems(events,eventsNumber);
  console.log("items+++++++++++++++++++++++++++++++++++++++++++++=",items);
  // const [items, setItems] = React.useState({});  
  //   const newItems = {};
  //   Object.keys(items).forEach(key => {newItems[key] = items[key];});
  //   setItems(newItems);
    

    const renderItem = (item) => {
      return (
          <Card>
            <Card.Content>
              <View>
                <Text style={styles.heure}>{item.time}   {item.end}</Text>
                <Text>{item.name}</Text>

              </View>
            </Card.Content>
          </Card>
      );
    }
  
  ;


 
  return (
    <View style={styles.container}>
      <Agenda
        firstDay={1}
        enableSwipeMonths={false}
        items={items}
        loadItemsForMonth={(month) => { console.log('trigger items loading',month) }}
        selected={today}
        refreshControl={null}
        showClosingKnob={true}
        onRefresh={() => console.log('refreshing...')}
        refreshing={false}
        renderItem={renderItem}
        renderEmptyData={() => {
          return <View style={styles.container}>

            <Text style={styles.textcentrale}> Il ne se passe rien à ce moment</Text>
            <Image style={styles.Imagecentrale} source={{ uri: 'https://i.ibb.co/QnbX89q/triste.png' }} resizeMode='cover'
            />
          </View>;
        }}
      />
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
  textcentrale: {
    textAlign: 'center',

  },
  heure: {
    color: 'gray',
  },
  Imagecentrale: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  }
});
  