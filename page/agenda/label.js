import React from 'react';

// ici on importe les couleurs des groupes
const BDE ={key: 'bde', color: 'slateblue' };
const PSI = {key: 'psi', color: 'powderblue'};
const Gala = {key: 'gala', color: 'lightblue'};
const ITS = {key: 'its', color: 'blue'};
const Cine = {key: 'cine', color: 'blueviolet'};
const BDH = {key: 'bdh', color: 'greenyellow'};
const BDS = {key: 'bds', color: 'orangered'};
const RTS = {key: 'rts', color: 'purple'};
const Velo = {key: 'velo', color: 'teal'};
const Pompom = {key: 'pompom', color: 'violet',};
const Montagne = {key: 'montagne', color: 'seagreen'};
const Rock = {key: 'rock', color: 'thistle'};
const BDM   = {key: 'BDM', color: 'silver'};
const Baby = {key: 'baby', color: 'navy'};
const Cuisine = {key: 'cuisine', color: 'navajowhite'};
const Ultra = {key: 'ultra', color: 'mediumspringgreen'};
const BDA = {key: 'BDA', color: 'mistyrose'};
const Meteor = {key: 'Meteor', color: 'green'};
const Hercule = {key: 'Hercule', color: 'mediumvioletred'};
const Fatness = {key: 'Fatness', color: 'blue'};
const Liste1 = {key: 'Liste1', color: 'green'};
const Liste2 = {key: 'Liste2', color: 'red'};
const Liste3 = {key: 'Liste3', color: 'blue'};
const Liste4 = {key: 'Liste4', color: 'yellow'};



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