import axios from 'axios'
import Config from '../Config'
import { EventSchema } from './types/EventSchema';

export function createEventSchema(eventSchema: object): Promise<string[]> {
  const body = {
    jsonschema: eventSchema
  }  
  return axios.post(`${Config.url}/eventschema`, body).then(res => res.data);
}

export function getAllEventSchemas(): Promise<EventSchema[]> { 
    return axios.get(`${Config.url}/eventschema`).then(res => res.data);
}