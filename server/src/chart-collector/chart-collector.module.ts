import { Module } from '@nestjs/common';
import { EventModule } from 'src/event/event.module';
import { ChartCount } from './collector/chart-count.collector';
import { ChartFactory } from './chart.factory';

@Module({
    imports: [EventModule],
    providers: [ChartCount, ChartFactory],
    exports: [ChartCount, ChartFactory]
  })
export class ChartCollectorModule {}
