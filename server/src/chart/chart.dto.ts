import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { EventSchemaValidationExists } from '../event-schema/validators/event-schema-exists-validator';
import { ChartType } from './chart.interface';
import { ChartKindExistsValidation } from 'src/chart-kind/validator/chart-kind-exists.validator';
import { ChartExistsValidation } from './validator/chart-exists.validator';

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
  propertyName: string

  @IsString()
  @IsNotEmpty()
  @Validate(ChartKindExistsValidation)
  chartKind: string
}

export class ChartLocationReplaceDto {

  @IsString() 
  @IsNotEmpty()
  @Validate(ChartExistsValidation)
  sourceChartId: string;

  @IsString() 
  @IsNotEmpty()
  @Validate(ChartExistsValidation)
  destinationChartId: string;
}


