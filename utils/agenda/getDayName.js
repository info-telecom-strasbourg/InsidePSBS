import moment from 'moment';


/**
 * retourne le nom du jour la semaine en français
 * @param {string} date 
 * @returns 
 */
export function getDayName(date){
  const dayOfWeek = moment(date).day();
  dayNames= ['Dim.','Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.',];
  return(dayNames[dayOfWeek]) ;
}
