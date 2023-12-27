import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChartKindModel, ChartKindModelSchema } from './schemas/chart-kind.model';
import { ChartModel, ChartModelSchema } from './schemas/chart.model';
import Config from 'src/config';

@Module({
    imports: [
        MongooseModule.forRoot(Config.dbConnectionString),
        MongooseModule.forFeature(
            [{ name: ChartModel.name, schema: ChartModelSchema },
            { name: ChartKindModel.name, schema: ChartKindModelSchema }])
        ]
  })
export class DatabaseModule {}
