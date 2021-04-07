import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from './role.model';
import { Schema as Sch, Document, HookNextFunction } from 'mongoose';
import { Product } from './product.model';
import { hash } from 'bcrypt';

/* export interface Cart {
  items: { productId: any; quantity: number }[];
} */

export interface cartItems {
  productId: any;
  quantity: number;
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  surname: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, ref: Role.name })
  roleId: Role;

  @Prop({ type: String })
  city: string;

  /*  @Prop({
    type: {
      items: {
        type: [
          {
            _id: { required: false },
            productId: { type: Sch.Types.ObjectId, ref: Product.name },
            quantity: { type: Number },
          },
        ],
      },
    },
  })
  CART: {items: { productId: any; quantity: number }[]}; */
  @Prop({
    type: [
      {
        _id: { required: false },
        productId: { type: Sch.Types.ObjectId, ref: Product.name },
        quantity: { type: Number },
      },
    ],
  })
  cartItems: cartItems[];
}

export const userSchema = SchemaFactory.createForClass(User);

userSchema.pre('save', async function (next: HookNextFunction): Promise<void> {
  (this as User).password = await hash((this as User).password, 8);
  next();
});

userSchema.pre(
  'findOneAndUpdate',
  async function (next: HookNextFunction): Promise<void> {
    if ((this as any)._update.password) {
      (this as any)._update.password = await hash(
        (this as any)._update.password,
        8,
      );
      next();
    } else {
      next();
    }
  },
);
