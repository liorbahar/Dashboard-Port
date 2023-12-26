import { Module } from '@nestjs/common';
import { ChartController } from './chart.controller';
import { ChartService } from './chart.service';
import { ChartModel, ChartModelSchema } from './chart.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: ChartModel.name, schema: ChartModelSchema }])],
  controllers: [ChartController],
  providers: [ChartService]
})
export class ChartModule {}
