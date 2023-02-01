import React from 'react';
import { getAgenda } from 'api/getAgenda.js';
import { parseAgenda } from 'utils/agenda/parseAgenda.js';
import {LoadingAgenda} from './agenda/loadingpage.js';
import {DisplayAgenda} from './agenda/displayagenda.js';

/**
 * fonction qui permet de récupérer l'agenda et de l'afficher en attendant qu'il soit chargé il affiche une page de chargement
 * @returns 
 */
function AgendaTPS (){
  const AgendaPromise = new Promise((resolve, reject) => {
    const rawAgenda =getAgenda();
    resolve(rawAgenda);
    
  });
  const [isLoading, setIsLoading] = React.useState(true);

  AgendaPromise.then(
      rawAgenda => {
      rawAgenda=rawAgenda.split("\n");
      [events,eventsNumber]=parseAgenda(rawAgenda);
      setIsLoading(false);  
      });

  if (isLoading)
    {    return LoadingAgenda();    }
  else{return( DisplayAgenda(events,eventsNumber)) 
    }
}

export default AgendaTPS;