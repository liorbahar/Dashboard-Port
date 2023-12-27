import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EventSchemaService } from 'src/event-schema/event-schema.service';
import Ajv from 'ajv';
import { EventSchemaModel } from 'src/database/schemas/event-schema.model';
import { EventCreationDto } from '../event.dto';
  
@ValidatorConstraint({ name: 'EventPropertiesValidation', async: true })
@Injectable()
export class EventPropertiesValidation implements ValidatorConstraintInterface {
  private ajv: Ajv;  

  constructor(private eventSchemaService: EventSchemaService) {
      this.ajv = new Ajv({ allErrors: true });  
    }
  
    async validate(value: any, args: ValidationArguments): Promise<boolean> {
      try {
        const event: EventCreationDto = args.object as EventCreationDto;
        const eventSchema: EventSchemaModel = await this.eventSchemaService.findEventSchema(event.eventSchemaId);
        const validate = this.ajv.compile(eventSchema.jsonschema.toJSON());
        return validate(value); 
      }
      catch(e) {
        return false;
      }
    }
  
    defaultMessage(args: ValidationArguments): string {
      const eventRequest: EventCreationDto = args.object as EventCreationDto;
      throw new BadRequestException(`Event properties failed again event schema ${eventRequest.eventSchemaId}`);
    }
  }