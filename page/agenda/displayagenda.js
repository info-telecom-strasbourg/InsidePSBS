import { Agenda, Calendar, LocaleConfig } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import moment from 'moment';

import React from 'react';
import { Text, View,StyleSheet, Image } from 'react-native';
import { loadItems } from './processagenda';
import { getDaysOfWeek,nameConfig } from './functionfordisplayagenda';
import { label } from './label.js';

nameConfig(); // set the locale for the calendar

export function DisplayAgenda(events,eventsNumber){

  var  today = new Date();
  today = today.toISOString().substring(0, 10);
  getDaysOfWeek(today);
  console.log(today);
  items=loadItems(events,eventsNumber);
  // const [items, setItems] = React.useState({});  
  //   const newItems = {}; 
  //   Object.keys(items).forEach(key => {newItems[key] = items[key];});
  //   setItems(newItems);
  marked=label(events,eventsNumber);
  const renderItem = (item) => {

      return (
          <Card style={styles.eventCard}>
            <Card.Content>

              <View style={{flexDirection:'row'}}>

                <View style={{flex:2}}>

                <Text>{item.group} : {item.name}</Text>
                </View>

                <View style={{flex:1}}>
                <Text style={styles.heure}>{item.time} - {item.end}</Text>

                </View>

                {/* <Text>{item.desc}</Text> */}
              </View>
            </Card.Content>
          </Card>
      );
    }
  
  ;
    
    
  return (
    <View style={styles.container}>
      <Agenda
        selected={today}
        // {'2022-12-17': {selected: false, marked: true, selectedColor: 'blue'}}
        markedDates={marked}
        markingType={'multi-dot'}
        firstDay={1}
        enableSwipeMonths={false}
        items={items}
        //loadItemsForMonth renvoie un objet avec datetring day,month,year et timestamp
        loadItemsForMonth={(date,items) => { console.log('trigger items loading',date.dateString) }}
        refreshControl={null}
        showClosingKnob={true}
        onRefresh={() => console.log('refreshing...')}
        refreshing={false}
        renderItem={renderItem}
        hideExtraDays={true}
        renderDay={(date, item) => { 
          // console.log('render day', date, item);
          if (date!= undefined) {
          return(<View style={{ 
              borderColor: 'rgb(102, 153, 255)',
              borderEndColor: 'gray',
              borderWidth: 1.5,
              backgroundColor: 'white',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              height: 30,
              flex:0.2,flexDirection:'row',alignSelf: 'center',borderWidth: 1.5,
              
            
            }}>
              <Text>{getDaysOfWeek(item.day)}

              
             {item.day.substring(8,10)}</Text></View>);

        
        }
        else{
          return(<View style={{flex:0.2,flexDirection:'row',borderWidth: 1.5,borderColor:'transparent'}}></View>);
        }}}
        renderEmptyData={() => {
          return <View style={styles.container}>

            <Text style={styles.textcentrale}> Il ne se passe rien ce jour là</Text>
            <Image style={styles.Imagecentrale} source={{ uri: 'https://i.ibb.co/QnbX89q/triste.png' }} resizeMode='cover'
            />
          </View>;
        }}
        theme={{

          agendaKnobColor: 'orange'
        }}
        style={{ backgroundColor: 'white' , }}

      />


    </View>
  );

}


const styles = StyleSheet.create({
  eventCard: {
    
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
  container: {
    flex: 1,
  },

  textcentrale: {
    textAlign: 'center',

  },
  heure: {
    textAlign: 'right',
    marginRight: 0,
    color: 'gray',
  },
  Imagecentrale: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  }
});
  