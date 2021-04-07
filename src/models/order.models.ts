import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Sch } from 'mongoose';
import { Product } from './product.model';
import { User } from './user.model';

export interface Items {
  productId: any;
  quantity: number;
  shipmentId: string;
}

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Sch.Types.ObjectId, ref: User.name })
  userId: User;

  @Prop({
    type: [
      {
        _id: { required: false },
        productId: { type: Sch.Types.ObjectId, ref: Product.name },
        quantity: { type: Number },
        shipmentId: { type: String },
      },
    ],
  })
  items: Items[];
}

export const orderSchema = SchemaFactory.createForClass(Order);
