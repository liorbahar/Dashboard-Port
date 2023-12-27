import { Module } from '@nestjs/common';
import { EventSchemaService } from './event-schema.service';
import { EventSchemaController } from './event-schema.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchemaModel, EventSchemaModelSchema } from '../database/schemas/event-schema.model';
import { EventSchemaValidationExists } from './validators/event-schema-exists-validator';
import { DuplicateEventSchemaTitleValidation } from './validators/duplicate-event-schema-title-validator';
import { EventSchemaExistsValidationPipe } from './validators/event-schema-exists-pipe';


@Module({
  imports: [MongooseModule.forFeature([{ name: EventSchemaModel.name, schema: EventSchemaModelSchema }])],
  providers: [
    EventSchemaService,
    EventSchemaValidationExists,
    DuplicateEventSchemaTitleValidation,
    EventSchemaExistsValidationPipe
  ],
  controllers: [EventSchemaController],
  exports: [EventSchemaService, EventSchemaValidationExists]
})
export class EventSchemaModule {}
