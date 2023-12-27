import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChartModel } from '../database/schemas/chart.model';
import { ChartData, ChartDataCollector, ChartType } from './chart.interface';
import { EventService } from 'src/event/event.service';
import { ChartFactory } from '../chart-collector/chart.factory';
import { ChartKind } from 'src/chart-kind/chart-kind.interface';
import { ChartKindModel } from 'src/database/schemas/chart-kind.model';


@Injectable()
export class ChartService {
    constructor(@InjectModel(ChartModel.name) private chartModel: Model<ChartModel>,
    private chartFactory: ChartFactory) {}

    async addChart(chart: ChartType): Promise<ChartModel> {
        const chartOrder: number = await this.getLatestOrder();
        const chartDocument = new this.chartModel({
            eventSchemaId: chart.eventSchemaId,
            name: chart.name,
            chartKind: chart.chartKind,
            propertyName: chart.propertyName,
            order: chartOrder + 1
        });
    
        return await chartDocument.save();
    }

    private async getLatestOrder(): Promise<number> {
        const charts: ChartModel[] = await this.chartModel.find()
        return charts.length;
    }

    async findAll(): Promise<ChartData[]> {
        const charts: ChartModel[] = await this.chartModel.find().populate('chartKind').exec();
        const chartPropertiesMap: ChartData[] = [];

        for (const chart of charts) {
            const chartKind: ChartKind = chart.chartKind as ChartKind
            const chartCollector: ChartDataCollector = await this.chartFactory.getChartCollector(chartKind.type);
            const chartData: ChartData = await chartCollector.getData(chart);
            chartPropertiesMap.push(chartData);
        }
        
        return chartPropertiesMap
    }

    async replaceChartOrder(sourceChartId: string, destinationChartId: string): Promise<void> {
        const sourceChart: ChartModel = await this.getChart(sourceChartId); 
        const desctinationChart: ChartModel = await this.getChart(destinationChartId);
        
        const desctinationOrder: number = desctinationChart.order;

        desctinationChart.order = sourceChart.order
        sourceChart.order = desctinationOrder

        await sourceChart.save();
        await desctinationChart.save();
    }

    async getChart(chartId: string) : Promise<ChartModel> {
        return await this.chartModel.findById(chartId);
    }
}
