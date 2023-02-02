import { Card } from 'react-native-paper';
import React from 'react';
import { Text, View } from 'react-native';
import { DisplayLogo } from 'components/annonce/displaylogo.js';
import { agendastyle } from 'style/agenda/agendaStyle';
/**
 * affiche le jour de la semaine sous forme de card dans l'agenda
 * permet de faire la séparation entre les jours
 * @returns élément visuel:Card
*/
export function renderDayIndicator(item,daysforWeek){
    //affiche le jour de la semaine seulement si c'est un jour de la semaine
    if(daysforWeek.includes(item.day)){
    return (
        <Card style={agendastyle.eventCard}>
          <Card.Content>
  
            <View style={{flexDirection:'row'}}>
              <View style={{flex:1}}>
              {DisplayLogo(item.group)}
              </View>
              <View style={{flex:2}}>
  
              <Text style={{textAlign:'justify'}}> {item.name}</Text>
              </View>
  
              <View style={{flex:1}}>
              <Text style={agendastyle.heure}>{item.time} - {item.end}</Text>
  
              </View>
  
              {/* <Text>{item.desc}</Text> */}
            </View>
          </Card.Content>
        </Card>
    );
    }
    else {return null;}
  }