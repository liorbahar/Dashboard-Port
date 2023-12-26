import { Module } from '@nestjs/common';
import { ChartController } from './chart.controller';
import { ChartService } from './chart.service';
import { ChartModel, ChartModelSchema } from './chart.model';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [EventModule ,MongooseModule.forFeature([{ name: ChartModel.name, schema: ChartModelSchema }])],
  controllers: [ChartController],
  providers: [ChartService]
})
export class ChartModule {}
