import React from 'react';

// ici on importe les couleurs des groupes
const BDE ={key: 'bde', color: 'cadetblue', selectedDotColor: 'blue'};
const PSI = {key: 'psi', color: 'darkgray', selectedDotColor: 'blue'};
const Gala = {key: 'gala', color: 'aliceblue'};
const ITS = {key: 'its', color: 'aquamarine', selectedDotColor: 'blue'};
const Cine = {key: 'cine', color: 'blue', selectedDotColor: 'blue'};
const BDH = {key: 'bdh', color: 'green'};
const BDS = {key: 'bds', color: 'red', selectedDotColor: 'blue'};
const RTS = {key: 'rts', color: 'blue', selectedDotColor: 'blue'};
const Velo = {key: 'velo', color: 'green'};
const Pompom = {key: 'pompom', color: 'red', selectedDotColor: 'blue'};
const Montagne = {key: 'montagne', color: 'blue', selectedDotColor: 'blue'};
const rock = {key: 'rock', color: 'green'};
const BDM   = {key: 'BDM', color: 'red', selectedDotColor: 'blue'};
const Baby = {key: 'baby', color: 'blue', selectedDotColor: 'blue'};
const Cuisine = {key: 'cuisine', color: 'green'};
const Ultra = {key: 'ultra', color: 'red', selectedDotColor: 'blue'};
const BDA = {key: 'BDA', color: 'blue', selectedDotColor: 'blue'};
const Meteor = {key: 'Meteor', color: 'green'};
const Hercule = {key: 'Hercule', color: 'red', selectedDotColor: 'blue'};
const Fatness = {key: 'Fatness', color: 'blue', selectedDotColor: 'blue'};
const Liste1 = {key: 'Liste1', color: 'green'};
const Liste2 = {key: 'Liste2', color: 'red', selectedDotColor: 'blue'};



export function label(events,eventsNumber){
  var markedDates = {};
  for (i = 0; i < eventsNumber; i++) {
    var date = events[i].date;
    //date au bon format
    date = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8);

    //on vérifie tout d'abord que la couleur du groupe est définie
    if (eval(events[i].group)!=undefined){
     
    if (markedDates[date] == undefined) {
        markedDates[date] = { disabled: false, dots: [eval(events[i].group)], selected: false };
    }
    else{

        //permet de vérifier si il n'y a pas de doublon
        if (markedDates[date].dots.includes(eval(events[i].group)))
        {
          // console.log("il y a un double le ",date,"pour",events[i].group);
        }
        //si il n'y a pas de doublon on ajoute le point
        else{
        markedDates[date].dots.push(eval(events[i].group));}
                }
            }
    else{

        // met un point rouge seulement si le groupe n'a pas était défini (fautes de mise à jour)
        console.log("le groupe de ",events[i],"n'est pas défini");
        if (markedDates[date] == undefined) {
            markedDates[date] = { disabled: false, dots: [{color: 'red'}], selected: false };
        }

    }
  }
    
  return markedDates;
}