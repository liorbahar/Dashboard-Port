import { IsNotEmpty, IsString, IsObject, Validate } from 'class-validator';
import { EventSchema, ProperitesJsonSchema } from './event-schema.interface';
import { DuplicateEventSchemaTitleValidation } from './validators/duplicate-event-schema-title-validator';

export class EventShemaCreationDto implements EventSchema {
  
  @IsString() 
  @IsNotEmpty()
  @Validate(DuplicateEventSchemaTitleValidation)
  title: string;

  @IsString() 
  @IsNotEmpty()
  description: string;

  @IsString() 
  @IsNotEmpty()
  type: string;

  @IsObject() 
  @IsNotEmpty()
  properties: ProperitesJsonSchema;
}
