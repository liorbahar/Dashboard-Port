import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChartKindModel, ChartKindModelSchema } from './schemas/chart-kind.model';
import { ChartModel, ChartModelSchema } from './schemas/chart.model';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost:27017/port'), MongooseModule.forFeature([{ name: ChartModel.name, schema: ChartModelSchema },
    { name: ChartKindModel.name, schema: ChartKindModelSchema }])]
  })
export class DatabaseModule {}
