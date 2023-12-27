import { Module } from '@nestjs/common';
import { EventSchemaModule } from './event-schema/event-schema.module';
import { EventModule } from './event/event.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './errors/error-handling';
import { ChartModule } from './chart/chart.module';
import { ChartKindModule } from './chart-kind/chart-kind.module';
import { DatabaseModule } from './database/database.module';
import { ChartCollectorModule } from './chart-collector/chart-collector.module';

@Module({
  imports: [EventSchemaModule, EventModule, ChartModule, ChartKindModule, DatabaseModule, ChartCollectorModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    }],
})
export class AppModule {}
