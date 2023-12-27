import axios from 'axios'
import Config from '../Config'
import { EventCreationProps } from './types/Event';

export function addEvent(event: EventCreationProps): Promise<string[]> {  
  return axios.post(`${Config.url}/event`, event).then(res => res.data);
}