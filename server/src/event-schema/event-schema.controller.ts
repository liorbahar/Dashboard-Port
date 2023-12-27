import { Controller, Post, Get, Body, Delete, Param, HttpException, HttpStatus, NotFoundException, Res, ConflictException } from '@nestjs/common';
import { EventSchemaService } from './event-schema.service';
import { EventShemaCreationDto } from './event-schema.dto';
import { Response } from 'express';
import { EventSchemaModel } from '../database/schemas/event-schema.model';
import { EventSchemaExistsValidationPipe } from './validators/event-schema-exists-pipe';
import { EventSchema } from './event-schema.interface';


@Controller('eventschema')
export class EventSchemaController {
    constructor(private eventSchemaService: EventSchemaService) {}

    @Post()
    public async createEventSchema(@Res() res: Response, @Body() data: EventShemaCreationDto): Promise<void> {
      try {
        const eventSchemaResult: EventSchemaModel = await this.eventSchemaService.addEventSchema(data);
        res.status(201).json(eventSchemaResult)
      }
      catch(e) {
        throw new HttpException(`Failed to insert event schema named ${data.jsonschema.title} due to ${e}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Get()
    public async findAllEventSchemas(@Res() res: Response): Promise<any> {
      const eventSchemas: EventSchemaModel[] = await this.eventSchemaService.findAllEventSchemas();
      res.json(eventSchemas)
    }

    @Get(':eventSchemaId')
    public async findEventSchema(@Res() res: Response, @Param('eventSchemaId', EventSchemaExistsValidationPipe) eventSchemaId: string): Promise<any> {
      const eventSchema: EventSchemaModel = await this.eventSchemaService.findEventSchema(eventSchemaId);
      res.json(eventSchema);
    }

    @Delete(':eventSchemaId')
    public async deleteEventSchema(@Res() res: Response, @Param('eventSchemaId', EventSchemaExistsValidationPipe) eventSchemaId: string): Promise<any> {
      await this.eventSchemaService.deleteEventSchema(eventSchemaId);
      res.json({ message: `Event schema with id ${eventSchemaId} deleted successfully`})
    }
}
