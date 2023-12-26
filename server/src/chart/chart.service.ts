import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChartModel } from './chart.model';
import { ChartType } from './chart.interface';
import { EventService } from 'src/event/event.service';
import { EventType } from 'src/event/event.interface';

@Injectable()
export class ChartService {
    constructor(@InjectModel(ChartModel.name) private chartModel: Model<ChartModel>,
    private eventService: EventService) {}

    async addChart(chart: ChartType): Promise<ChartModel> {
        const chartDocument = new this.chartModel({
            eventSchemaId: chart.eventSchemaId,
            name: chart.name,
            type: chart.type
        });
    
        return chartDocument.save();
    }

    async findAll(): Promise<any> {
        const charts: ChartModel[] = await this.chartModel.find();
        const chartPropertiesMap: any[] = [];

        for (const chart of charts) {
            const chartPropertyMap: { [key: string]: number} = await this.calc(chart);
            chartPropertiesMap.push({
                chart: chart,
                properties: chartPropertyMap
            })
        }
        
        return chartPropertiesMap
       
    }

    private async calc(chart: ChartModel): Promise<{ [key: string]: number}> {
        const chartPropertyMap: { [key: string]: number} = {};

        const events: EventType[] = await this.eventService.getEventsByEventSchemaId(chart.eventSchemaId);
        
        for (const event of events) {

            for (const propertyKey of Object.keys(event.properties)) {
                const propertyValue: any = event.properties[propertyKey];
                
                if (!chartPropertyMap[propertyValue]) {
                    chartPropertyMap[propertyValue] = 1;
                } else {
                    chartPropertyMap[propertyValue] += 1;
                }
            }
        }
        
        return chartPropertyMap;
    }
}
