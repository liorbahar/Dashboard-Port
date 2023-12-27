import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChartKindModel } from '../database/schemas/chart-kind.model';

@Injectable()
export class ChartKindService implements OnModuleInit {
    constructor(@InjectModel(ChartKindModel.name) private chartKindModel: Model<ChartKindModel>) {}

    async onModuleInit() {
        await this.insertChartKinds();
    }

    async getChartKinds(): Promise<ChartKindModel[]> {
        return await this.chartKindModel.find();
    }

    async getChartKind(chartKindId: string): Promise<ChartKindModel> {
        return await this.chartKindModel.findById(chartKindId);
    }

    // this function load fake data to db when the program start
    private async insertChartKinds(): Promise<void> {
        try {
            const chart1 = new this.chartKindModel({ type: 'bar' });
            const chart2 = new this.chartKindModel({ type: 'pie' });
            await chart1.save();
            await chart2.save();
        }
        catch(e) {
            console.log(e)
        }
    }
}
