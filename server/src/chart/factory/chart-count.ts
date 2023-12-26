import { Injectable } from "@nestjs/common";
import { ChartData, ChartDataCollector, ChartKeyValuePair } from "../chart.interface";
import { EventService } from "src/event/event.service";
import { EventType } from "src/event/event.interface";
import { ChartModel } from "../chart.model";

@Injectable()
export class ChartCount implements ChartDataCollector {
    constructor(private eventService: EventService) {}

    async getData(chart: ChartModel): Promise<ChartData> {
        const chatData: ChartKeyValuePair[] = await this.getChartData(chart);
        return {chart: chart, data: chatData }
    }

    private async getChartData(chart: ChartModel): Promise<ChartKeyValuePair[]> {
        const events: EventType[] = await this.eventService.getEventsByEventSchemaId(chart.eventSchemaId);
        
        const chartPropertyMap: { [key: string]: number} = {};
        for (const event of events) {

            for (const propertyKey of Object.keys(event.properties)) {
                
                const propertyValue: any = event.properties[propertyKey];
                if (propertyKey === chart.propertyName) {
                    if (!chartPropertyMap[propertyValue]) {
                        chartPropertyMap[propertyValue] = 1;
                    } else {
                        chartPropertyMap[propertyValue] += 1;
                    }
                }
            }
        }

        const chartData: ChartKeyValuePair[] = []
        for (let [key, value] of Object.entries(chartPropertyMap)) {
            chartData.push({ key: key, value: value})
        }
        
        return chartData;
    }
}