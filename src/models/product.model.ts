import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Sch } from 'mongoose';
import { Category } from './category.model';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  image: string;

  @Prop({ type: Sch.Types.ObjectId, ref: Category.name })
  categoryId: Category;
}

export const productSchema = SchemaFactory.createForClass(Product);
