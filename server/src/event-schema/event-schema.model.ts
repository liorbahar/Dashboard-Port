import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { JsonSchema, ProperitesJsonSchema } from './event-schema.interface';

@Schema({ collection: 'eventschemas', versionKey: false })
export class JsonSchemaModel extends Document implements JsonSchema {
  
  @Prop({ type: [{ type: String }] })
  required: string[]

  @Prop({ type: MongooseSchema.Types.String })
  title: string;

  @Prop({ type: MongooseSchema.Types.String })
  description: string;

  @Prop({ type: MongooseSchema.Types.String })
  type: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  properties: ProperitesJsonSchema;
}


@Schema({ collection: 'eventschemas', versionKey: false })
export class EventSchemaModel extends Document {
  
  @Prop({ type: JsonSchemaModel, _id: false })
  jsonschema: JsonSchemaModel
}

export const EventSchemaModelSchema = SchemaFactory.createForClass(EventSchemaModel);
  
EventSchemaModelSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});