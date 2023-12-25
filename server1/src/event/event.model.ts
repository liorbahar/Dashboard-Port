import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { EventType } from './event.interface';

@Schema({ collection: 'events', timestamps: true, versionKey: false })
export class EventModel extends Document implements EventType {
  
  @Prop({ type: MongooseSchema.Types.String })
  eventSchemaId: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  properties: { [ key:string] : object };
}

export const EventModelSchema = SchemaFactory.createForClass(EventModel);
  
EventModelSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});