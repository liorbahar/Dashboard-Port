import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { EventSchema, ProperitesJsonSchema } from './event-schema.interface';

@Schema({ collection: 'eventschemas', timestamps: true, versionKey: false })
export class EventSchemaModel extends Document implements EventSchema {
  
  @Prop({ type: MongooseSchema.Types.String })
  title: string;

  @Prop({ type: MongooseSchema.Types.String })
  description: string;

  @Prop({ type: MongooseSchema.Types.String })
  type: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  properties: ProperitesJsonSchema;
}

export const EventSchemaModelSchema = SchemaFactory.createForClass(EventSchemaModel);
  
EventSchemaModelSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});