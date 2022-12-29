import moment from 'moment';

//fonction de parsing de date (plus utile ?)
function tranferDate(date) {


    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
  
    return `${year}-${month}-${day}`;


}


export function getDaysOfWeek(date){
  const dayOfWeek = moment(date).day();
  var dates=[];
  for (let i = 0; i < 7; i++)
  {
    dates.push(moment(date).add(i-dayOfWeek+1,'days').format('YYYY-MM-DD'));
  }  
  return dates;

}

export function loadItemsforWeek(date,items){
  var itemsforWeek={};
  var dates=getDaysOfWeek(date);

  itemsforWeek[date]=items[date];
  console.log('itemsforWeek',itemsforWeek);
  return itemsforWeek;


}
export function loadItems(events,eventsNumber){
    var items = {};
    var nbrevent = eventsNumber;
    for (let i = 0; i < nbrevent; i++) 
        {
        const time = tranferDate(events[i]["date"].split('T')[0]);
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