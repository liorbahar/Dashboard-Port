import axios from 'axios'
import Config from '../Config'

export function addEvent(event: object): Promise<string[]> {  
  return axios.post(`${Config.url}/event`, event).then(res => res.data);
}