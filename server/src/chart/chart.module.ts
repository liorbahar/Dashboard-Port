import { Module } from '@nestjs/common';
import { ChartController } from './chart.controller';
import { ChartService } from './chart.service';
import { ChartModel, ChartModelSchema } from '../database/schemas/chart.model';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from 'src/event/event.module';
import { ChartFactory } from '../chart-collector/chart.factory';
import { ChartCount } from '../chart-collector/collector/chart-count.collector';
import { ChartCollectorModule } from 'src/chart-collector/chart-collector.module';
import { ChartKindModule } from 'src/chart-kind/chart-kind.module';
import { ChartExistsValidation } from './validator/chart-exists.validator';

@Module({
  imports: [EventModule ,ChartCollectorModule, ChartKindModule, MongooseModule.forFeature([{ name: ChartModel.name, schema: ChartModelSchema }])],
  controllers: [ChartController],
  providers: [ChartService, ChartFactory, ChartCount, ChartExistsValidation]
})
export class ChartModule {}
