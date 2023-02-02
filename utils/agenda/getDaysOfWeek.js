import moment from 'moment';
/**
 * fonction qui retourne une liste de tout les jours de la semaine du jour séléctionné
 * @param {string} Datestring 
 * @returns {Array} Array contenant les dates de la semaine
 */
export function getDaysOfWeek(date){
  const dayOfWeek = moment(date).day();
  var dates=[];
  for (let i = 0; i < 8-dayOfWeek; i++)
  {
    dates.push(moment(date).add(i,'days').format('YYYY-MM-DD'));
  }  
  return dates;

}