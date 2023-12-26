import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { EventSchemaValidationExists } from '../event-schema/validators/event-schema-exists-validator';
import { ChartType } from './chart.interface';

export class ChartCreationDto implements ChartType {

  @IsString() 
  @IsNotEmpty()
  @Validate(EventSchemaValidationExists)
  eventSchemaId: string;

  @IsString() 
  @IsNotEmpty()
  name: string;

  @IsString() 
  @IsNotEmpty()
  type: string;
}
