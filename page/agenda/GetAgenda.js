

//fonction de récupération de l'agenda
export async function chargerAgenda() {
  var data = await getAgenda();
  return data;
}


export async function getAgenda() {

  try {
    let response = await fetch('https://bde.its-tps.fr/fusion_agenda.ics');
    let data = await response.text();

    return data;
  } catch (error) {
    console.error(error);
  }
}


export function parseAgenda(lines){
  var events = {}
  var events_i = 0;
  
  for (i = 0; i < lines.length; i++) {
    if (lines[i].includes("DTSTART")) {
      var date = lines[i].split(":");
      events[events_i] = { date: date[1] };
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
    else if (lines[i].includes("GROUP")) {
      var group = lines[i].split(":");
      events[events_i]["group"] = group[1];
    }
    else if (lines[i].includes('END:VEVENT')) {
      events_i++; 
    }
  }
  
  return [events,events_i];
}
