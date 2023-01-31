import moment from 'moment';

/**
 * Fonction qui permet de transformer une date au format YYYYMMDD en YYYY-MM-DD
 * @param {string} date 
 * @returns {string} Datestring au format YYYY-MM-DD
 */
function transferDate(date) {


    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
  
    return `${year}-${month}-${day}`;


}

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
/**
 * séléctionne les items de la semaine du jour séléctionné dans la liste des items
 * @param {string} date 
 * @param {*} items 
 * @returns {Array} items
 */
export function loadItemsforWeek(date,items){
  var itemsforWeek={};
  var dates=getDaysOfWeek(date);

  itemsforWeek[dates]=items[dates];
  return itemsforWeek;
}


/**
 * fonction qui permet de créer l'objet item contenant tout les événement de l'ICS
 *      
 *      
 * @param {*} events
 * @param {*} eventsNumber
 * @returns {Object} 
 *      name: string,
        time: datestring,
        end: datestring,
        desc: string de description,
        day: time,
        height : 80( pas utilisé je crois),
        group: srting  (asso ou club qui host l'événement),
 */
export function loadItems(events,eventsNumber){
    var items = {};
    var nbrevent = eventsNumber;
    for (let i = 0; i < nbrevent; i++) 
        {
        const time = transferDate(events[i]["date"].split('T')[0]);
        try {
          var tempsdeb = (events[i]["date"].split('T')[1][0]).toString() + (events[i]["date"].split('T')[1][1]).toString() + ":" + (events[i]["date"].split('T')[1][2]).toString() + (events[i]["date"].split('T')[1][3]).toString();
            }
        catch { var tempsdeb = "journée"; }


        try {
          var tempsfin = (events[i]["fin"].split('T')[1][0]).toString() + (events[i]["fin"].split('T')[1][1]).toString() + ":" + (events[i]["fin"].split('T')[1][2]).toString() + (events[i]["fin"].split('T')[1][3]).toString();
          }
        catch { var tempsfin = ""; }


        try { var desc = events[i]["desc"][1]; }
        catch { var desc = "il n'y a pas de description"; }


        try { var group = events[i]["group"]; }
        catch { var group = ""; }


        if (!items[time]) {
            items[time] = [];
        }

        items[time].push({
        name: events[i]["title"],
        time: tempsdeb,
        end: tempsfin,
        desc: desc,
        day: time,
        height : 80,
        group: group,
        });

        }
    return items;
    };