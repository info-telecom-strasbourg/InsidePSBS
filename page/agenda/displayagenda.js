import { Agenda, Calendar, LocaleConfig } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import moment from 'moment';
import React from 'react';
import { Text, View,StyleSheet, Image } from 'react-native';
import { loadItems,getDaysOfWeek  } from './processagenda';
import { nameConfig,getDayOfWeek} from './functionfordisplayagenda';
import { label } from './label.js';

nameConfig(); // set the locale for the calendar
function renderItem(item,daysforWeek){
  if(daysforWeek.includes(item.day)){
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
  else {return null;}
}

;
export function DisplayAgenda(events,eventsNumber){

  var  today = new Date();
  today = today.toISOString().substring(0, 10);
  console.log(today);
  const items=loadItems(events,eventsNumber);
  const marked=label(events,eventsNumber);    

  return (
    <View style={styles.container}>
      <Agenda
        selectedDay={today}
        markedDates={marked}
        markingType={'multi-dot'}
        firstDay={1}
        enableSwipeMonths={false}
        items={items}
        //loadItemsForMonth renvoie un objet avec datetring day,month,year et timestamp
        loadItemsForMonth={(date) => { 
          //permet seulement de trouver les jours qui suivent dans la semaine
          //ne charge rien en soit c'est juste que l'on ne fera pas le rendu dans renderItem
          // attention c'est du bricolage 

          console.log('le jour choisi',date.dateString) 
          daysforWeek=getDaysOfWeek(date.dateString,items);
          this.daysforWeek=daysforWeek;


        }}
        refreshControl={null}
        showClosingKnob={true}
        onRefresh={() => console.log('refreshing...',"daysforWeek",this.daysforWeek)}
        refreshing={false}
        renderItem={ (item) => renderItem(item,daysforWeek) }
        hideExtraDays={true}
        renderDay={(date, item) => { 
              if (date!= undefined) {
                date=moment(date.toISOString().substring(0,10)).add(1,'days').format('YYYY-MM-DD')
                          
                if (this.daysforWeek.includes(date)){

                    return(
                    
                      <View style={{ 
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
                      <Text>{getDayOfWeek(item.day)}
                      {item.day.substring(8,10)}
                      </Text>
                      </View>);
                  }


              else{return(null)}
            }
              else{
                return(<View style={{flex:0.2,flexDirection:'row',borderWidth: 1.5,borderColor:'transparent'}}></View>)
                  }
          }
      }



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
  