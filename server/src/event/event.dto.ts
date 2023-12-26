import { IsNotEmpty, IsString, IsObject, Validate } from 'class-validator';
import { EventType } from './event.interface';
import { EventSchemaValidationExists } from '../event-schema/validators/event-schema-exists-validator';
import { EventPropertiesValidation } from './validator/event-properties-validator';

export class EventCreationDto implements EventType {

  @IsString() 
  @IsNotEmpty()
  @Validate(EventSchemaValidationExists)
  eventSchemaId: string;

  @IsObject() 
  @IsNotEmpty()
  @Validate(EventPropertiesValidation)
  properties: { [key: string]: object };
}
