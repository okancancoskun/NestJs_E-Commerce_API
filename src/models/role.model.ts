import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


/* export interface Neest {
  first: string;
  second: string;
}

export interface cart {
  items: [{ deneme: string }];
} */

@Schema()
export class Role extends Document {
  @Prop({ type: String }) name: string;
  /* @Prop({
    type: [{ _id: { required: false }, first: String, second: String }],
    default: [],
  })
  nested: Neest[];
  @Prop({ type: { items: { type: [{ deneme: String }] } } })
  cart: cart; */
}
export const roleSchema = SchemaFactory.createForClass(Role);
