import { Injectable, PipeTransform, ArgumentMetadata, NotFoundException } from '@nestjs/common';
import { EventSchemaValidationExists } from './event-schema-exists.validator';

@Injectable()
export class EventSchemaExistsValidationPipe implements PipeTransform<any> {
  constructor(private eventSchemaValidator : EventSchemaValidationExists) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const isEventSchemaExist: boolean = await this.eventSchemaValidator.validate(value, {
      object: {},
      property: metadata.data,
      constraints: [],
      value: value,
      targetName: ''
    });
    
    if (!isEventSchemaExist) {
      throw new NotFoundException(`Event schema with id ${value} not found`);
    }

    return value;
  }
}