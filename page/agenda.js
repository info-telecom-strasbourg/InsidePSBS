import React from 'react';
import {chargerAgenda,parseAgenda} from './agenda/GetAgenda.js';
import {LoadingAgenda} from './agenda/loadingpage.js';
import {DisplayAgenda} from './agenda/displayagenda.js';


function AgendaTPS (){


  const AgendaPromise = new Promise((resolve, reject) => {
    const rawAgenda =chargerAgenda();
    resolve(rawAgenda);
    
  });
  const [isLoading, setIsLoading] = React.useState(true);

  AgendaPromise.then(rawAgenda => {
    rawAgenda=rawAgenda.split("\n");
    [events,eventsNumber]=parseAgenda(rawAgenda);
    setIsLoading(false);  });
  

  if (isLoading)
    {
    return LoadingAgenda();

    }
  else{return( DisplayAgenda(events,eventsNumber))
 
      
    }

}



export default AgendaTPS;