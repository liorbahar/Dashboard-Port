import { Injectable } from "@nestjs/common";
import { ChartCollectorFactory, ChartDataCollector } from "../chart.interface";
import { ChartModel } from "../chart.model";
import { ChartCount } from "./chart-count";

@Injectable()
export class ChartFactory implements ChartCollectorFactory {
    constructor(private chartCount: ChartCount) {}

    async getChartCollector(chart: ChartModel): Promise<ChartDataCollector> {
        switch(chart.type) {
            case "bar":
                return this.chartCount;
            case 'pie':
                return this.chartCount;
            default:
                throw new Error(`Not support chart ${chart.name}`)
        }
    }
    
    
}