import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAgenda } from 'api/getAgenda.js';
import { parseAgenda } from 'utils/agenda/parseAgenda.js';
export async function UpdateAgenda(){
    let rawAgenda = await getAgenda();
    rawAgenda=rawAgenda.split("\n");
    [_events,_eventsNumber]=parseAgenda(rawAgenda);    
    AsyncStorage.setItem('events', JSON.stringify(_events));
    AsyncStorage.setItem('eventsNumber', JSON.stringify(_eventsNumber));
    return [_events,_eventsNumber];
  }