import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChartModel } from './chart.model';
import { ChartType } from './chart.interface';

@Injectable()
export class ChartService {
    constructor(@InjectModel(ChartModel.name) private chartModel: Model<ChartModel>) {}

    async addChart(chart: ChartType): Promise<ChartModel> {
        const chartDocument = new this.chartModel({
            eventSchemaId: chart.eventSchemaId,
            name: chart.name,
            type: chart.type
        });
    
        return chartDocument.save();
    }

    async findAll(): Promise<ChartModel[]> {
        return await this.chartModel.find() ;
    }
}
