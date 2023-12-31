import { Controller, Post, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { EventCreationDto } from './event.dto';
import { Response } from 'express';
import { EventService } from './event.service';
import { EventModel } from '../database/schemas/event.model';


@Controller('event')
export class EventController {
    constructor(private eventService: EventService) {}

    @Post()
    public async createEvent(@Res() res: Response, @Body() data: EventCreationDto): Promise<void> {
      try {
        const event: EventModel = await this.eventService.addEvent(data);
        res.status(HttpStatus.CREATED).json(event);
      }
      catch(e) {
        throw new HttpException(`Failed to insert event data of event ${data.eventSchemaId} due to ${e}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}

