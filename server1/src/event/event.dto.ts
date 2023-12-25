import { IsNotEmpty, IsString, IsObject, Validate } from 'class-validator';
import { EventType } from './event.interface';
import { EventSchemaValidationExists } from '../event-schema/validators/event-schema-exists-validator';

export class EventCreationDto implements EventType {

  @IsString() 
  @IsNotEmpty()
  @Validate(EventSchemaValidationExists)
  eventSchemaId: string;

  @IsObject() 
  @IsNotEmpty()
  properties: { [key: string]: object };
}
