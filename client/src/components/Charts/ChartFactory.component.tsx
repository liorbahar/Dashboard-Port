import React from 'react';
import PieChartEvent from './PieChartEvent.component';
import BarChartEvent from './BarChartEvent.component';

export type ChartData = {
    key: string,
    value: any
}

export type ChartComponentProps = {
    data: ChartData[]
}

export function getChartFactory(chartType: string, data: ChartData[]) {
    switch(chartType){
        case 'pie':
            return <PieChartEvent data={data}/>
        case 'bar':
            return <BarChartEvent data={data}/>
    }
}