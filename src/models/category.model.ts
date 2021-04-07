import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;
}
export const categorySchema = SchemaFactory.createForClass(Category);
