import { IsNotEmpty, IsString, IsObject, Validate, IsArray, ValidateNested } from 'class-validator';
import { JsonSchema, ProperitesJsonSchema } from './event-schema.interface';
import { DuplicateEventSchemaTitleValidation } from './validators/duplicate-event-schema-title.validator';
import { Type } from 'class-transformer';

export class JsonSchemaDto implements JsonSchema {
  
  @IsArray()
  required: string[];
  
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

export class EventShemaCreationDto {
  
  @IsObject() 
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => JsonSchemaDto)
  jsonschema : JsonSchemaDto

  
}
