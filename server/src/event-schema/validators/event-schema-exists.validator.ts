import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { HttpException, Injectable } from '@nestjs/common';
import { EventSchemaService } from 'src/event-schema/event-schema.service';
import { EventSchemaModel } from '../../database/schemas/event-schema.model';
import {isNull} from 'lodash'
  
@ValidatorConstraint({ name: 'EventSchemaValidationExists', async: true })
@Injectable()
export class EventSchemaValidationExists implements ValidatorConstraintInterface {
    constructor(private eventSchemaService: EventSchemaService) {}
  
    async validate(value: any, args: ValidationArguments): Promise<boolean> {
      try {
        const eventSchema: EventSchemaModel = await this.eventSchemaService.findEventSchema(value);
        return !isNull(eventSchema);
      }
      catch(e) {
        return false;
      }
    }
  
    defaultMessage(args: ValidationArguments): string {
      throw new HttpException(`Event Schema with id ${args.value} not found`, 404);
    }
  }