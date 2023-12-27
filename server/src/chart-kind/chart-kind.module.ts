import { Module } from '@nestjs/common';
import { ChartKindController } from './chart-kind.controller';
import { ChartKindService } from './chart-kind.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChartKindModel, ChartKindModelSchema } from '../database/schemas/chart-kind.model';
import { ChartKindExistsValidation } from './validator/chart-kind-exists.validator';

@Module({
  imports: [MongooseModule.forFeature([{ name: ChartKindModel.name, schema: ChartKindModelSchema }])],
  controllers: [ChartKindController],
  providers: [ChartKindService, ChartKindExistsValidation],
  exports: [ChartKindExistsValidation]
})
export class ChartKindModule {}
