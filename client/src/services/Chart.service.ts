import axios from 'axios'
import Config from '../Config'
import { ChartKind } from './types/Chart';


export function getAllChartsKinds(): Promise<ChartKind[]> { 
    // return axios.get(`${Config.url}/charts`).then(res => res.data);
    return Promise.resolve([
        {
            id: 'sdfsdfdsfdsfsdfd',
            type: 'bar'
        },
        {
            id: 'sdfsdfdsfdsfsdfd',
            type: 'pie'
        }
    ])
  }