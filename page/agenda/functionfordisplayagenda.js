import { LocaleConfig } from 'react-native-calendars';
import moment from 'moment';



export function getDayOfWeek(date){
  const dayOfWeek = moment(date).day();
  dayNames= ['Dim.','Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.',];
  return(dayNames[dayOfWeek]) ;
}


  export function nameConfig() {

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
  }
  