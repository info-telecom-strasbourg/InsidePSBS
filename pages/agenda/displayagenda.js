import { Agenda, CalendarProvider, LocaleConfig } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import moment from 'moment';
import React from 'react';
import { Text, View,StyleSheet, Image } from 'react-native';
import { loadItems } from 'utils/agenda/loadItems';
import { getDaysOfWeek } from 'utils/agenda/getDaysOfWeek';
import { getDayName } from 'utils/agenda/getDayName';
import { localeNameConfig } from 'utils/agenda/localeNameConfig';
import { dateLabel } from 'utils/agenda/dateLabel.js';
import { primaryColor,orangeColor,lightprimaryColor } from 'style/style.js';
import { DisplayLogo } from 'components/annonce/displaylogo.js';
import { agendastyle } from 'style/agenda/agendaStyle.js';
import { renderDayIndicator } from 'components/agenda/renderDayIndicator.js';
import { UpdateAgenda } from '../../utils/agenda/UpdateAgenda';

localeNameConfig(); // set the locale for the calendar
/**
 * fonction qui permet l'affichage de la page de l'agenda
 * @param {*} events 
 * @param {*} eventsNumber 
 * @returns élément graphique:Agenda 
 */
export function DisplayAgenda(events,eventsNumber,UpdateValue){

  var  today = new Date();
  today = today.toISOString().substring(0, 10);
  console.log(today);
  const items=loadItems(events,eventsNumber);
  const marked=dateLabel(events,eventsNumber);    
  var daysforWeek=getDaysOfWeek(today,items);
  this.daysforWeek=daysforWeek;
  return (
    <View style={agendastyle.container}>
      <CalendarProvider date={today}>
      <Agenda
        selected={today}
        markedDates={marked}
        markingType={'multi-dot'}
        firstDay={1}
        enableSwipeMonths={false}
        items={items}
        //loadItemsForMonth renvoie un objet avec datetring day,month,year et timestamp
        loadItemsForMonth={(date) => { 
          //permet seulement de trouver les jours qui suivent dans la semaine
          //ne charge rien en soit c'est juste que l'on ne fera pas le rendu dans renderDayIndicator
          // attention c'est du bricolage 

          console.log('le jour choisi',date.dateString) 
          daysforWeek=getDaysOfWeek(date.dateString,items);
          this.daysforWeek=daysforWeek;


        }}
        refreshControl={null}
        showClosingKnob={true}
        onRefresh={() => {console.log('refreshing...',"daysforWeek",this.daysforWeek)
                          console.log("on va cherche sur internet");
                          UpdateValue();
                          console.log('value updated')
                    }}
        refreshing={false}
        renderItem={ (item) => renderDayIndicator(item,daysforWeek) }
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
                      <Text>{getDayName(item.day)}
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
          return <View style={agendastyle.container}>

            <Text style={agendastyle.textcentrale}> Il ne se passe rien ce jour là</Text>
            <Image style={agendastyle.Imagecentrale} source={{ uri: 'https://i.ibb.co/QnbX89q/triste.png' }} resizeMode='cover'
            />
          </View>;
        }}
        theme={{
          backgroundColor: primaryColor,
          calendarBackground: primaryColor,
          dayTextColor: 'white',
          agendaKnobColor: orangeColor,
          todayBackgroundColor: primaryColor,
          selectedDayBackgroundColor: orangeColor, // calendar sel date
          monthTextColor: 'white', // name in calendar
          agendaTodayColor: 'white', // today in list
          textInactiveColor : primaryColor, // date in calendar
          textDisabledColor: primaryColor, // date in calendar
          contentStyle: {backgroundColor: primaryColor},
          'stylesheet.agenda.main': {
            knobContainer: {
            flex: 1,
            position: 'absolute',
            left: 0,
            right: 0,
            height: 24,
            bottom: 0,
            alignItems: 'center',
            backgroundColor: lightprimaryColor,
            borderRadius: 25,
          },
          reservations: {

          flex: 1,
          marginTop: 114,
          backgroundColor: primaryColor
          }
        },

        }

        }

      />
      </CalendarProvider>

    </View>
  );

}

