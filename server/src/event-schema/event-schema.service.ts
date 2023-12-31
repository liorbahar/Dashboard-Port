import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventSchemaModel } from '../database/schemas/event-schema.model';
import { EventSchema } from './event-schema.interface';

@Injectable()
export class EventSchemaService {
    constructor(@InjectModel(EventSchemaModel.name) private EventSchemaModel: Model<EventSchemaModel>) {}

    async addEventSchema(eventSchema: EventSchema): Promise<EventSchemaModel> {
        const eventSchemaDocument = new this.EventSchemaModel({ jsonschema: eventSchema.jsonschema });
        return await eventSchemaDocument.save();
    }
    
    async findAllEventSchemas(): Promise<EventSchemaModel[]> {
        return await this.EventSchemaModel.find();
    }

    async deleteEventSchema(eventSchemaId: string): Promise<void> {
        await this.EventSchemaModel.deleteOne({ _id: eventSchemaId });
    }

    async findEventSchema(eventSchemaId: string): Promise<EventSchemaModel> {
        return await this.EventSchemaModel.findById(eventSchemaId);
    }

    async findEventSchemaByName(eventName: string): Promise<EventSchemaModel> {
        return await this.EventSchemaModel.findOne({ 'jsonschema.title': eventName });
    }
}
