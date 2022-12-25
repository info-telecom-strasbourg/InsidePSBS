
//fonction de parsing de date (plus utile ?)
function tranferDate(date) {
    console.log("date: ",date);


    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
  
    return `${year}-${month}-${day}`;


}



export function loadItems(events,eventsNumber){
    var items = {};
    var nbrevent = eventsNumber;
    for (let i = 0; i < nbrevent; i++) 
        {
        const time = tranferDate(events[i]["date"].split('T')[0]);
            console.log("time: ",time);
        try {
          var tempsdeb = (events[i]["date"].split('T')[1][0]).toString() + (events[i]["date"].split('T')[1][1]).toString() + ":" + (events[i]["date"].split('T')[1][2]).toString() + (events[i]["date"].split('T')[1][3]).toString();
            }
        catch { var tempsdeb = "toute la journée"; }


        try {
          var tempsfin = (events[i]["fin"].split('T')[1][0]).toString() + (events[i]["fin"].split('T')[1][1]).toString() + ":" + (events[i]["fin"].split('T')[1][2]).toString() + (events[i]["fin"].split('T')[1][3]).toString();
          }
        catch { var tempsfin = ""; }


        try { var desc = events[i]["desc"][1]; }
        catch { var desc = "il n'y a pas de description"; }


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
        });

        }
    return items;
    };