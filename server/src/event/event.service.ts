import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventType } from './event.interface';
import { EventModel } from './event.model';
import { EventSchemaService } from 'src/event-schema/event-schema.service';
import Ajv from 'ajv';

@Injectable()
export class EventService {
    private ajv: Ajv;

    constructor(@InjectModel(EventModel.name) private eventModel: Model<EventModel>,
                private eventSchemaService: EventSchemaService) {
                    this.ajv = new Ajv({ allErrors: true });
                }

    async addEvent(eventSchema: EventType): Promise<EventModel> {
        // valildate the json properties with the event schema 
        const eventDocument = new this.eventModel({
            eventSchemaId: eventSchema.eventSchemaId,
            properties: eventSchema.properties
        });
    
        return eventDocument.save();
    }

    private validateProperties(properties: object) {
        
    }
}
