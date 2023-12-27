import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
  import { HttpException, Injectable } from '@nestjs/common';
import { EventSchemaService } from 'src/event-schema/event-schema.service';
import { isNull } from 'lodash';
import { EventSchemaModel } from '../../database/schemas/event-schema.model';
  
@ValidatorConstraint({ name: 'DuplicateEventSchemaTitleValidation', async: true })
@Injectable()

export class DuplicateEventSchemaTitleValidation implements ValidatorConstraintInterface {
    constructor(private eventSchemaService: EventSchemaService) {}
  
    async validate(value: any, args: ValidationArguments): Promise<boolean> {
      try {
        const eventSchema: EventSchemaModel = await this.eventSchemaService.findEventSchemaByName(value);
        return isNull(eventSchema)
      }
      catch(e) {
        return false;
      }
    }
  
    defaultMessage(args: ValidationArguments): string {
      throw new HttpException(`Event named ${args.value} already exists in db`, 404);
    }
  }