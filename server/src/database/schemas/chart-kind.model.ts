import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ChartKind } from '../../chart-kind/chart-kind.interface';

@Schema({ collection: 'chartskinds', versionKey: false })
export class ChartKindModel extends Document implements ChartKind {

  @Prop({ type: MongooseSchema.Types.String, unique: true })
  type: string;
}

export const ChartKindModelSchema = SchemaFactory.createForClass(ChartKindModel);
  
ChartKindModelSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});