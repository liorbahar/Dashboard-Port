import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ChartType } from './chart.interface';

@Schema({ collection: 'charts', versionKey: false })
export class ChartModel extends Document implements ChartType {
  
  @Prop({ type: MongooseSchema.Types.String })
  eventSchemaId: string;

  @Prop({ type: MongooseSchema.Types.String })
  name: string;

  @Prop({ type: MongooseSchema.Types.String })
  type: string;
}

export const ChartModelSchema = SchemaFactory.createForClass(ChartModel);
  
ChartModelSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});