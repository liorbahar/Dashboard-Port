import { ChartModel } from "../database/schemas/chart.model";
import { ChartKind } from "src/chart-kind/chart-kind.interface";

export type ChartType = {
    id?: string,
    eventSchemaId?: string,
    name: string,
    chartKind: string | ChartKind,
    propertyName: string
}

export type ChartKeyValuePair = {
    key: string;
    value: any
}

export type ChartData = {
    chart: ChartType
    data: ChartKeyValuePair[]
}

export interface ChartDataCollector {
    getData(chart: ChartModel): Promise<ChartData>
}


export interface ChartCollectorFactory {
    getChartCollector(chartType: string): Promise<ChartDataCollector>
}