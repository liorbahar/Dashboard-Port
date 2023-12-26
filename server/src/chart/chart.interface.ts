import { ChartModel } from "./chart.model";

export type ChartType = {
    id?: string,
    eventSchemaId?: string,
    name: string,
    type: string
}

export type ChartKeyValuePair = {
    key: string;
    value: any
}

export type ChartData = {
    chart: ChartType,
    data: ChartKeyValuePair[]
}

export interface ChartDataCollector {
    getData(chart: ChartModel): Promise<ChartData>
}


export interface ChartCollectorFactory {
    getChartCollector(chart: ChartModel): Promise<ChartDataCollector>
}