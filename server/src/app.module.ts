import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventSchemaModule } from './event-schema/event-schema.module';
import { EventModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './errors/error-handling';

@Module({
  imports: [EventSchemaModule, EventModule, MongooseModule.forRoot('mongodb://localhost:27017/port')],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },],
})
export class AppModule {}
