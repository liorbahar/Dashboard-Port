import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventType } from './event.interface';
import { EventModel } from './event.model';

@Injectable()
export class EventService {
    constructor(@InjectModel(EventModel.name) private eventModel: Model<EventModel>) {}

    async addEvent(eventSchema: EventType): Promise<EventModel> {
        const eventDocument = new this.eventModel({
            eventSchemaId: eventSchema.eventSchemaId,
            properties: eventSchema.properties
        });
    
        return eventDocument.save();
    }

    async getEventsByEventSchemaId(eventSchemaId: string): Promise<EventModel[]> {
        return await this.eventModel.find({ eventSchemaId: eventSchemaId});
    }
}
