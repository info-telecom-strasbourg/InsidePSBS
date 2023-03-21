import React from 'react';
import { getAgenda } from 'api/getAgenda.js';
import { parseAgenda } from 'utils/agenda/parseAgenda.js';
import {LoadingAgenda} from './agenda/loadingpage.js';
import {DisplayAgenda} from './agenda/displayagenda.js';
import { UpdateAgenda } from 'utils/agenda/UpdateAgenda.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
/**
 * fonction qui permet de récupérer l'agenda et de l'afficher en attendant qu'il soit chargé il affiche une page de chargement
 * @returns 
 */
function AgendaTPS (){
  const [isLoading, setIsLoading] = React.useState(true);
  const [events, setEvents] = React.useState([]);
  const [eventsNumber, setEventsNumber] = React.useState(0);
  useEffect( () => {
    try {
      console.log("on essaie de mettre à jour les données au début");
      UpdateAgenda();
    }
    catch (error) {
      console.log("il n'y a pas de connexion/problème serveur, mise à jour impossible");
    }
  }, []);
  async function UpdateValue(){
    console.log("UpdatingValue");
    [_events,_eventsNumber]= await UpdateAgenda();
    setIsLoading(true);
    setEvents(_events);
    setEventsNumber(_eventsNumber);
    console.log("eventsNumber",eventsNumber);
  };

  useEffect( () => {
    console.log("useEffect");

    async function getData() {

      var LocalEventsNumber = await AsyncStorage.getItem("eventsNumber");
      console.log("getitem",LocalEventsNumber);

      if (LocalEventsNumber==null){
        console.log("on va cherche sur internet");
        UpdateValue();
        setIsLoading(false);
      }
      else {
        console.log("on va cherche les données en local (normalement elle viennent juste d'être sauvegardé");
        _jsonevents = await AsyncStorage.getItem("events");
        setEventsNumber(LocalEventsNumber);
        setEvents(JSON.parse(_jsonevents));
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  
  if (isLoading)
    {    return LoadingAgenda();    }
  else{return( DisplayAgenda(events,eventsNumber,UpdateValue)) 
    }
}

export default AgendaTPS;