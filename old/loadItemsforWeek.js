
/**
 * séléctionne les items de la semaine du jour séléctionné dans la liste des items
 * @param {string} date 
 * @param {*} items 
 * @returns {Array} items
 */
export function loadItemsforWeek(date,items){
    console.log('hellooooooooooo',date)
    var itemsforWeek={};
    var dates=getDaysOfWeek(date);
  
    itemsforWeek[dates]=items[dates];
    return itemsforWeek;
  }
  