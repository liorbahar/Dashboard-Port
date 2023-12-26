import { Module } from '@nestjs/common';
import { EventModel, EventModelSchema } from './event.model';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventSchemaModule } from 'src/event-schema/event-schema.module';
import { APP_PIPE } from '@nestjs/core';
import { EventSchemaValidationExists } from '../event-schema/validators/event-schema-exists-validator';
import { EventPropertiesValidation } from './validator/event-properties-validator';

@Module({
    imports: [
        EventSchemaModule,
        MongooseModule.forFeature([{ name: EventModel.name, schema: EventModelSchema }])],
    providers: [
        EventService,
        EventSchemaValidationExists,
        EventPropertiesValidation
    ],
    controllers: [EventController]
})
export class EventModule {}
