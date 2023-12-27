export type ChartKind = {
    id: string;
    type: string
}


export type ChartCreationParams = {
    eventSchemaId: string,
    name: string,
    chartKind: string,
    propertyName: string
}


export type ChartType = {
    id?: string,
    eventSchemaId?: string,
    name: string,
    chartKind: ChartKind,
    propertyName: string,
    order: number
}

export type ChartKeyValuePair = {
    key: string;
    value: any
}

export type ChartDetails = {
    chart: ChartType
    data: ChartKeyValuePair[]
}

export type ChartReplacmentParams = {
    sourceChartId: string;
    destinationChartId: string
}
