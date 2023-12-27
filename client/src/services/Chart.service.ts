import axios from 'axios'
import Config from '../Config'
import { ChartCreationParams, ChartDetails, ChartKind, ChartReplacmentParams } from './types/Chart';


export function getAllChartsKinds(): Promise<ChartKind[]> { 
    return axios.get(`${Config.url}/chartskinds`).then(res => res.data);
}


export function addChart(data: ChartCreationParams): Promise<ChartKind[]> { 
    return axios.post(`${Config.url}/chart`, data).then(res => res.data);
}

export function getAllCharts(): Promise<ChartDetails[]> { 
    return axios.get(`${Config.url}/chart`).then(res => res.data);
}

export function replaceChartLocations(data: ChartReplacmentParams): Promise<void> { 
    return axios.put(`${Config.url}/chart`, data).then(res => res.data);
}