import React from 'react';
import { StyleSheet,Text,Image, View, TouchableOpacity, StatusBar } from 'react-native';
import { Agenda,Calendar,LocaleConfig } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import moment from 'moment';


//fonction de transfert en lisible
const tranfertDate = (date) => {
  var str=date[0]+date[1]+date[2]+date[3]+'-'+date[4]+date[5]+'-'+date[6]+date[7];
  return str;
}
// envoie une requete sur un serveur pour récupérer l'agenda
var request = new XMLHttpRequest();
    request.open(
      "GET",
      "https://bde.its-tps.fr/fusion_agenda.ics",
      true  
    );
    request.send(null);//ne renvoie rien
    request.onreadystatechange = function() { //les états de la requete , quand readystate=4 et status=200 alors c'est que la requète est terminé
      if (request.readyState === 4 && request.status === 200) {
        var type = request.getResponseHeader("Content-Type");// va chercher le contenu du text en string
        if (type.indexOf("text") !== 1) {
          var lines = request.responseText.split("\n");
          var events = {}
          var events_i = 0;
          for (i = 0; i < lines.length; i++) {
            if (lines[i].includes("DTSTART")) {
              var date = lines[i].split(":");
              events[events_i] = {date: date[1]};
            }
            else if (lines[i].includes("DTEND")) {
              var heurefin = lines[i].split(":");
              events[events_i]["fin"] = heurefin[1];
            }
            else if (lines[i].includes("SUMMARY")) {
              var title = lines[i].split(":");
              events[events_i]["title"] = title[1];
            }
            else if (lines[i].includes("DESCRIPTION")) {
              var desc = lines[i].split(":");
              events[events_i]["desc"] = desc[1];
            }
            
            else if (lines[i].includes('END:VEVENT')) {
              events_i++;
            }
          }
          global.events=events;
          global.eventsNumber=events_i;
        }
      }
    };

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
const AgendaTPS = () => {
    const [items, setItems] = React.useState({});
    const ajd=moment().format('YYYY-MM-DD')

    const loadItems = (day) => {
            var nbrevent = global.eventsNumber;
            for (let i=0;i<nbrevent;i++) {
              const time=tranfertDate(global.events[i]["date"].split('T')[0]);
              
              try{
                var tempsdeb = (global.events[i]["date"].split('T')[1][0]).toString()+ (global.events[i]["date"].split('T')[1][1]).toString()+":"+(global.events[i]["date"].split('T')[1][2]).toString()+(global.events[i]["date"].split('T')[1][3]).toString();
              }
              catch {var tempsdeb="toute la journée";}
              
              try{
                var tempsfin = (global.events[i]["fin"].split('T')[1][0]).toString()+ (global.events[i]["fin"].split('T')[1][1]).toString()+":"+(global.events[i]["fin"].split('T')[1][2]).toString()+(global.events[i]["fin"].split('T')[1][3]).toString();
              }
              catch {var tempsfin="";}
              try{var desc=global.events[i]["desc"][1];}
              catch{var desc="il n'y a pas de description";}
              if (!items[time]) {
                items[time] = [];
                items[time].push({
                  name:global.events[i]["title"],
                  time:tempsdeb,
                  end:tempsfin,
                  height: Math.max(10, Math.floor(Math.random() * 150)),
                  
                  day:time
                });
                
            }
          }
            const newItems = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });
            setItems(newItems);

    }
    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.item}>
                <Card>
                    <Card.Content>
                        <View>
                            <Text style={styles.heure}>{item.time}   {item.end}</Text> 
                            <Text>{item.name}</Text> 
                            
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.container}>
            <Agenda
              
                items={items}
                loadItemsForMonth={loadItems}
                selected={ajd}
                refreshControl={null}
                showClosingKnob={false}
                refreshing={false}
                renderItem={renderItem}
                renderEmptyData={() => {
                  return <View style={styles.container}>
                    
                    <Text style={styles.textcentrale}> Il se passe rien à ce moment</Text>
                    <Image style={styles.Imagecentrale} source={{uri:'https://i.ibb.co/QnbX89q/triste.png'} } resizeMode='cover'
      />
                    </View>;
                }}
            />
            <StatusBar />
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
    heure:{
    color:'gray',
    },
    Imagecentrale:{
      width:200,
      height: 200,
      alignSelf: 'center',
    }
});
export default AgendaTPS;