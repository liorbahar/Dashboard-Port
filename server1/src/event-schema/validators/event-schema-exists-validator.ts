import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  import { HttpException, Injectable } from '@nestjs/common';
import { EventSchemaService } from 'src/event-schema/event-schema.service';
import { EventSchema } from 'src/event-schema/event-schema.interface';
  
@ValidatorConstraint({ name: 'EventSchemaValidationExists', async: true })
@Injectable()
export class EventSchemaValidationExists implements ValidatorConstraintInterface {
    constructor(private eventSchemaService: EventSchemaService) {}
  
    async validate(value: any, args: ValidationArguments): Promise<boolean> {
      try {
        const eventSchema: EventSchema = await this.eventSchemaService.findEventSchema(value);
        return (eventSchema !== undefined) && (eventSchema !== null);
      }
      catch(e) {
        return false;
      }
    }
  
    defaultMessage(args: ValidationArguments): string {
      throw new HttpException(`Event Schema with id ${args.value} not found`, 404);
    }
  }