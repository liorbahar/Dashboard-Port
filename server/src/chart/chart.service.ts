import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChartModel } from './chart.model';
import { ChartData, ChartDataCollector, ChartKeyValuePair, ChartType } from './chart.interface';
import { EventService } from 'src/event/event.service';
import { EventType } from 'src/event/event.interface';
import { ChartFactory } from './factory/chart.factory';


@Injectable()
export class ChartService {
    constructor(@InjectModel(ChartModel.name) private chartModel: Model<ChartModel>,
    private eventService: EventService,
    private chartFactory: ChartFactory) {}

    async addChart(chart: ChartType): Promise<ChartModel> {
        const chartDocument = new this.chartModel({
            eventSchemaId: chart.eventSchemaId,
            name: chart.name,
            type: chart.type
        });
    
        return chartDocument.save();
    }

    async findAll(): Promise<ChartData[]> {
        const charts: ChartModel[] = await this.chartModel.find();
        const chartPropertiesMap: ChartData[] = [];

        for (const chart of charts) {
            const chartCollector: ChartDataCollector = await this.chartFactory.getChartCollector(chart);
            const chartData: ChartData = await chartCollector.getData(chart);
            chartPropertiesMap.push(chartData);
        }
        
        return chartPropertiesMap
    }
}
