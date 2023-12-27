import { Injectable } from "@nestjs/common";
import { ChartCollectorFactory, ChartDataCollector } from "../chart/chart.interface";
import { ChartModel } from "../database/schemas/chart.model";
import { ChartCount } from "./collector/chart-count.collector";

@Injectable()
export class ChartFactory implements ChartCollectorFactory {
    constructor(private chartCount: ChartCount) {}

    async getChartCollector(chartType: string): Promise<ChartDataCollector> {
        switch(chartType) {
            case "bar":
                return this.chartCount;
            case 'pie':
                return this.chartCount;
            default:
                throw new Error(`Not support chart ${chartType}`)
        }
    }
    
    
}