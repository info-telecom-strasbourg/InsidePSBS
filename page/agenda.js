import React from 'react';
import {Text,  View,} from 'react-native';
import {chargerAgenda,parseAgenda} from './agenda/GetAgenda.js';
import {LoadingAgenda} from './agenda/loadingpage.js';
import {DisplayAgenda} from './agenda/displayagenda.js';


function AgendaTPS (){

  console.log("dans agandatps",null==null);

  const AgendaPromise = new Promise((resolve, reject) => {
    const rawAgenda =chargerAgenda();
    resolve(rawAgenda);
    
  });
  const [isLoading, setIsLoading] = React.useState(true);

  AgendaPromise.then(rawAgenda => {
    rawAgenda=rawAgenda.split("\n");
    [events,eventsNumber]=parseAgenda(rawAgenda);
    console.log(eventsNumber);
    setIsLoading(false);  });
  



  if (isLoading)
    {
    console.log("loading");
    return LoadingAgenda();

    }


  else{return( DisplayAgenda(events,eventsNumber))
        // <View>
    //   <Text>test</Text>
    //   </View>);
      
    }

}






export default AgendaTPS;