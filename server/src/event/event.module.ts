import { Module } from '@nestjs/common';
import { EventModel, EventModelSchema } from '../database/schemas/event.model';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventSchemaModule } from 'src/event-schema/event-schema.module';
import { EventSchemaValidationExists } from '../event-schema/validators/event-schema-exists.validator';
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
    controllers: [EventController],
    exports: [EventService]
})
export class EventModule {}
